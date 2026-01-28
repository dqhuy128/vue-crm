<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { computed, ref } from 'vue'

  import { usePermissionStore } from '@/store/permission'

  // Define types
  interface ContractItem {
    id: number
    code?: string
    name?: string
    contract_name_text?: string
    contract_type_text?: string
    contract_term_text?: string
    begin_date?: string
    finish_date?: string
    termination_date?: string
    status?: string
    can_renew?: boolean
    [key: string]: any
  }

  interface Props {
    items: any // Accepting any to handle the specific structure from API
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'edit', id: number): void
    (e: 'delete', id: number): void
    (e: 'terminate', id: number): void
    (e: 'renew', id: number): void
  }>()

  const { checkPermission } = usePermissionStore()

  const employees = computed(() => {
    if (!props.items) return []

    // Helper to normalize any value to a flat array of ContractItem
    const normalizeToArray = (value: any): ContractItem[] => {
      if (Array.isArray(value)) {
        // Flatten nested arrays if needed
        return value.flatMap((item) => normalizeToArray(item))
      } else if (typeof value === 'object' && value !== null) {
        // If it's an object with keys (like {"0": {...}, "1": {...}}), extract values
        // Check if it looks like a ContractItem (has 'id' property) or is a keyed object
        if ('id' in value) {
          return [value as ContractItem]
        } else {
          // It's a keyed object, extract values
          return Object.values(value).flatMap((v) => normalizeToArray(v))
        }
      }
      return []
    }

    // Helper function to process each group
    const processGroup = (groupItems: any, idKey: string) => {
      // Normalize to flat array
      const contracts = normalizeToArray(groupItems)
      const canRenew = contracts.some((contract: ContractItem) => contract.can_renew)
      const canTerminate = contracts.some((contract: ContractItem) => contract.can_terminate)

      return {
        uniqueId: idKey,
        contracts: contracts,
        totalContracts: contracts.length,
        canRenew: canRenew,
        canTerminate: canTerminate,
      }
    }

    // 1. Handle if it's already an array of groups (Array<Array<ContractItem>>)
    if (Array.isArray(props.items)) {
      // Check if the first item is an array to determine if it's already grouped
      const isGrouped = props.items.length > 0 && Array.isArray(props.items[0])

      if (isGrouped) {
        // Case: [[Contract, Contract], [Contract]]
        return (props.items as any[][]).map((groupItems, idx) => {
          return processGroup(groupItems, `emp-${idx}`)
        })
      } else {
        // Case: [Contract, Contract] (Flat array)
        // Group by user 'code' manually
        const groupedData: Record<string, ContractItem[]> = {}

        ;(props.items as ContractItem[]).forEach((item) => {
          const userKey = item.code || item.name || 'unknown'
          if (!groupedData[userKey]) {
            groupedData[userKey] = []
          }
          groupedData[userKey].push(item)
        })

        return Object.values(groupedData).map((groupItems, idx) => {
          return processGroup(groupItems, `emp-${idx}`)
        })
      }
    }

    // 2. Handle Object of Arrays (Record<string, ContractItem[]>)
    if (typeof props.items === 'object') {
      return Object.entries(props.items).map(([key, value]) => {
        const groupItems = Array.isArray(value) ? value : [value]
        return processGroup(groupItems, `emp-${key}`)
      })
    }

    return []
  })
  console.log('🚀 ~ employees:', employees.value)

  // --- Accordion State ---
  const openAccordions = ref<Record<string, boolean>>({})

  const toggleAccordion = (id: string) => {
    openAccordions.value[id] = !openAccordions.value[id]
  }
</script>

<template>
  <div class="font-inter flex flex-col gap-4">
    <template v-if="employees.length > 0">
      <div
        v-for="emp in employees"
        :key="emp.uniqueId"
        class="rounded-[12px] border border-[#EDEDF6] bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <!-- Header (Always Visible) -->
        <div
          class="group flex cursor-pointer items-center justify-between bg-white p-4 transition-colors select-none hover:bg-gray-50"
          @click="toggleAccordion(emp.uniqueId)"
        >
          <div class="flex items-center gap-4">
            <!-- Avatar Placeholder / Initial -->
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0E7FF] text-sm font-bold text-[#3730A3] shadow-inner"
            >
              {{ emp.contracts[0]?.name?.charAt(0)?.toUpperCase() }}
            </div>

            <div class="flex flex-col">
              <h3 class="text-[16px] font-bold text-[#464661] transition-colors group-hover:text-[#1b4dea]">
                {{ emp.contracts[0]?.name }}
              </h3>
              <div class="mt-0.5 flex items-center gap-3 text-[13px] text-gray-500">
                <span class="flex items-center gap-1">
                  <Icon icon="lucide:user" class="h-3.5 w-3.5" />
                  {{ emp.contracts[0]?.code }}
                </span>
                <span class="h-1 w-1 rounded-full bg-gray-300"></span>
                <span class="flex items-center gap-1">
                  <Icon icon="fluent:document-text-24-regular" class="h-3.5 w-3.5" />
                  {{ emp.totalContracts }} hợp đồng
                </span>
                <template v-if="emp.canRenew">
                  <span class="rounded-full bg-red-100 px-2 py-1 text-xs text-red-500"> Hợp đồng sắp hết hạn </span>
                </template>
              </div>
            </div>
          </div>

          <!-- Chevron Icon -->
          <div
            class="transform text-gray-400 transition-transform duration-300 group-hover:text-[#1b4dea]"
            :class="{ 'rotate-180': openAccordions[emp.uniqueId] }"
          >
            <Icon icon="radix-icons:chevron-down" class="h-6 w-6" />
          </div>
        </div>

        <!-- Body (Collapsible) -->
        <div v-if="openAccordions[emp.uniqueId]" class="border-t border-[#EDEDF6] bg-[#FAFAFA]">
          <div class="p-4">
            <div class="overflow-x-auto rounded-lg border border-[#EDEDF6] bg-white">
              <table class="w-full min-w-[800px] text-left text-sm">
                <thead class="bg-[#F5F5F7] text-xs text-[#464661] uppercase">
                  <tr>
                    <th class="w-[50px] px-4 py-3 font-semibold">STT</th>
                    <th class="px-4 py-3 font-semibold">Tên HĐ</th>
                    <th class="px-4 py-3 font-semibold">Loại HĐ</th>
                    <th class="px-4 py-3 font-semibold">Thời hạn</th>
                    <th class="px-4 py-3 font-semibold">Ngày bắt đầu</th>
                    <th class="px-4 py-3 font-semibold">Ngày kết thúc</th>
                    <th class="px-4 py-3 font-semibold">Ngày thanh lý</th>
                    <th class="px-4 py-3 font-semibold">Trạng thái</th>
                    <template v-if="checkPermission('Contract', 'Update') || checkPermission('Contract', 'Delete')">
                      <th class="px-4 py-3 text-right font-semibold">Thao tác</th>
                    </template>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EDEDF6]">
                  <tr v-for="(item, idx) in emp.contracts" :key="item.id" class="transition-colors hover:bg-blue-50/30">
                    <td class="px-4 py-3 font-medium text-[#464661]">
                      {{ idx + 1 }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.contract_name_text || '---' }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.contract_type_text || '---' }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.contract_term_text || '---' }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.begin_date || '---' }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.finish_date || '---' }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.termination_date || '---' }}
                    </td>
                    <td class="px-4 py-3 text-gray-600">
                      {{ item.status_text || '---' }}
                    </td>
                    <template v-if="checkPermission('Contract', 'Update') || checkPermission('Contract', 'Delete')">
                      <td class="px-4 py-3 text-right">
                        <div class="flex items-center justify-end gap-2">
                          <!-- Renew Button -->
                          <template v-if="item.can_renew">
                            <button
                              type="button"
                              class="cursor-pointer transition-transform hover:scale-105"
                              title="Gia hạn"
                              @click="$emit('renew', item.id)"
                            >
                              <span
                                class="rounded-xl bg-green-600 px-2 py-1.5 text-[10px] font-bold text-white shadow-sm"
                              >
                                Gia hạn
                              </span>
                            </button>
                          </template>

                          <!-- Terminate Button -->
                          <template v-if="item.can_terminate">
                            <button
                              type="button"
                              class="cursor-pointer transition-transform hover:scale-105"
                              title="Thanh lý"
                              @click="$emit('terminate', item.id)"
                            >
                              <span
                                class="rounded-xl bg-[#e61b1b] px-2 py-1.5 text-[10px] font-bold text-white shadow-sm"
                              >
                                Thanh lý
                              </span>
                            </button>
                          </template>

                          <!-- Edit Button -->
                          <template v-if="checkPermission('Contract', 'Update') && item.can_terminate">
                            <button
                              type="button"
                              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                              title="Chỉnh sửa"
                              @click="$emit('edit', item.id)"
                            >
                              <img src="@/assets/images/action-edit-2.svg" alt="Edit" class="h-4 w-4" />
                            </button>
                          </template>

                          <!-- Delete Button -->
                          <template v-if="checkPermission('Contract', 'Delete') && item.can_terminate">
                            <button
                              type="button"
                              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-100"
                              title="Xóa"
                              @click="$emit('delete', item.id)"
                            >
                              <img src="@/assets/images/action-edit-3.svg" alt="Delete" class="h-4 w-4" />
                            </button>
                          </template>
                        </div>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="py-8 text-center text-gray-500">Không có dữ liệu hiển thị</div>
  </div>
</template>
