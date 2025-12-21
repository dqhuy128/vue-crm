<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RadioGroupItem, RadioGroupRoot } from 'radix-vue'
import { computed, onBeforeUnmount,onMounted, ref } from 'vue'

interface ExplanationItem {
  id: string
  code: string
  name: string
  work_date: string
  reason: string
  image?: string
  origin_image?: string
  manager_status_text: string
  manager_approved: boolean
  human_status_text: string
  human_approved: boolean
  action: string[]
}

interface Props {
  items: ExplanationItem[]
}

  const props = defineProps<Props>()

  defineEmits<{
    (e: 'preview', url: string, originUrl?: string): void
    (e: 'edit', id: string): void
    (e: 'delete', id: string): void
    (e: 'approve-manager', id: string, status: string): void
    (e: 'approve-human', id: string, status: string): void
  }>()

  // --- Data Transformation ---
  const employees = computed(() => {
  const groups: Record<string, { name: string; code: string; logs: ExplanationItem[] }> = {}

  props.items.forEach((item) => {
    // Group by employee code
    const key = item.code
    if (!groups[key]) {
      groups[key] = {
        name: item.name,
        code: item.code,
        logs: [],
      }
    }
    groups[key].logs.push(item)
  })

  return Object.values(groups)
})

// --- Accordion State ---
const openAccordions = ref<Record<string, boolean>>({})

const toggleAccordion = (key: string) => {
  openAccordions.value[key] = !openAccordions.value[key]
}

// --- Dropdown State ---
const activeDropdownManager = ref<string | null>(null)
const activeDropdownHuman = ref<string | null>(null)
const radioStateSingle = ref('0') // Dummy ref for v-model, actual logic handles click

const toggleDropdownManager = (id: string) => {
  activeDropdownManager.value = activeDropdownManager.value === id ? null : id
  activeDropdownHuman.value = null
}

const toggleDropdownHuman = (id: string) => {
  activeDropdownHuman.value = activeDropdownHuman.value === id ? null : id
  activeDropdownManager.value = null
}

const closeDropdowns = () => {
  activeDropdownManager.value = null
  activeDropdownHuman.value = null
}

onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdowns)
})

// Close dropdowns when clicking elsewhere (handled by parent or local logic?)
// For now, simpler to just toggle.
</script>

<template>
  <div class="flex flex-col gap-4 font-inter">
    <template v-if="employees.length > 0">
      <div
        v-for="emp in employees"
        :key="emp.code"
        class="rounded-[12px] border border-[#EDEDF6] bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <!-- Header -->
        <div
          class="group flex cursor-pointer items-center justify-between bg-white p-4 transition-colors select-none hover:bg-gray-50"
          @click="toggleAccordion(emp.code)"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0E7FF] text-sm font-bold text-[#3730A3] shadow-inner"
            >
              {{ emp.name.charAt(0).toUpperCase() }}
            </div>

            <div class="flex flex-col">
              <h3 class="text-[16px] font-bold text-[#464661] transition-colors group-hover:text-[#1b4dea]">
                {{ emp.name }}
              </h3>
              <div class="mt-0.5 flex items-center gap-3 text-[13px] text-gray-500">
                <span class="flex items-center gap-1">
                  <Icon icon="lucide:user" class="h-3.5 w-3.5" />
                  {{ emp.code }}
                </span>
                <span class="h-1 w-1 rounded-full bg-gray-300"></span>
                <span class="flex items-center gap-1">
                  <Icon icon="fluent:document-bullet-list-24-regular" class="h-3.5 w-3.5" />
                  {{ emp.logs.length }} giải trình
                </span>
              </div>
            </div>
          </div>

          <!-- Chevron -->
          <div
            class="transform text-gray-400 transition-transform duration-300 group-hover:text-[#1b4dea]"
            :class="{ 'rotate-180': openAccordions[emp.code] }"
          >
            <Icon icon="radix-icons:chevron-down" class="h-6 w-6" />
          </div>
        </div>

        <!-- Body -->
        <div v-if="openAccordions[emp.code]" class="border-t border-[#EDEDF6] bg-[#FAFAFA]">
          <div class="p-4">
            <div class="rounded-lg border border-[#EDEDF6] bg-white">
              <table class="w-full text-left text-sm">
                <thead class="bg-[#F5F5F7] text-xs text-[#464661] uppercase">
                  <tr>
                    <th class="px-4 py-3 font-semibold">Ngày</th>
                    <th class="px-4 py-3 font-semibold">Lý do</th>
                    <th class="px-4 py-3 font-semibold">Hình ảnh</th>
                    <th class="px-4 py-3 font-semibold">Quản lý duyệt</th>
                    <th class="px-4 py-3 font-semibold">HCNS duyệt</th>
                    <th class="px-4 py-3 text-center font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EDEDF6]">
                  <tr v-for="(it, idx) in emp.logs" :key="idx" class="transition-colors hover:bg-blue-50/30">
                    <td class="px-4 py-3 font-medium text-[#464661]">
                      {{ it.work_date }}
                    </td>
                    <td class="max-w-[200px] px-4 py-3 text-gray-600 truncate" :title="it.reason">
                      {{ it.reason }}
                    </td>
                    <td class="px-4 py-3">
                      <button
                        v-if="it.image"
                        type="button"
                        class="shrink-0 cursor-pointer"
                        @click="$emit('preview', it.image, it.origin_image)"
                      >
                        <img src="@/assets/images/action-edit-1.svg" alt="Preview" />
                      </button>
                    </td>
                    
                    <!-- Manager Approval -->
                    <td class="px-4 py-3">
                      <div class="relative w-full cursor-pointer" @click.stop="toggleDropdownManager(it.id)">
                        <template v-if="it.manager_status_text == 'Đã phê duyệt'">
                          <div class="status status-green status-body block w-full text-[13px]">Đã phê duyệt</div>
                        </template>
                        <template v-else-if="it.manager_status_text == 'Chờ phê duyệt'">
                          <div class="status status-red status-body block w-full text-[13px]">Chờ phê duyệt</div>
                        </template>
                        <template v-else-if="it.manager_status_text == 'Đã từ chối'">
                          <div class="status status-gray status-body block w-full text-[13px]">Không phê duyệt</div>
                        </template>
                        <template v-else>
                           <div class="status status-body block w-full text-[13px]">{{ it.manager_status_text || '---' }}</div>
                        </template>

                        <div
                          class="invisible absolute left-0 right-0 z-[12] w-full opacity-0 transition"
                          :class="{ 'visible opacity-100': activeDropdownManager === it.id }"
                        >
                          <RadioGroupRoot
                            v-model="radioStateSingle"
                            class="flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl"
                          >
                            <template v-if="it.manager_approved">
                              <RadioGroupItem
                                :id="`mgr-r1-${it.id}`"
                                class="block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]"
                                value="1"
                                @click="$emit('approve-manager', it.id, '1')"
                              >
                                <label class="cursor-pointer text-center text-[10px] font-normal text-[#464661]" :for="`mgr-r1-${it.id}`">
                                  Duyệt
                                </label>
                              </RadioGroupItem>
                              <RadioGroupItem
                                :id="`mgr-r2-${it.id}`"
                                class="block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]"
                                value="2"
                                @click="$emit('approve-manager', it.id, '2')"
                              >
                                <label class="cursor-pointer text-center text-[10px] font-normal text-[#464661]" :for="`mgr-r2-${it.id}`">
                                  Không duyệt
                                </label>
                              </RadioGroupItem>
                            </template>
                          </RadioGroupRoot>
                        </div>
                      </div>
                    </td>

                    <!-- Human Approval -->
                    <td class="px-4 py-3">
                      <div class="relative w-full cursor-pointer" @click.stop="toggleDropdownHuman(it.id)">
                        <template v-if="it.human_status_text == 'Đã phê duyệt'">
                          <div class="status status-green status-body block w-full text-[13px]">Đã phê duyệt</div>
                        </template>
                        <template v-else-if="it.human_status_text == 'Chờ phê duyệt'">
                          <div class="status status-red status-body block w-full text-[13px]">Chờ phê duyệt</div>
                        </template>
                        <template v-else-if="it.human_status_text == 'Đã từ chối'">
                          <div class="status status-gray status-body block w-full text-[13px]">Không phê duyệt</div>
                        </template>
                        <template v-else>
                           <div class="status status-body block w-full text-[13px]">{{ it.human_status_text || '---' }}</div>
                        </template>

                        <div
                          class="invisible absolute left-0 right-0 z-[12] w-full opacity-0 transition"
                          :class="{ 'visible opacity-100': activeDropdownHuman === it.id }"
                        >
                          <RadioGroupRoot
                            v-model="radioStateSingle"
                            class="flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl"
                          >
                            <template v-if="it.human_approved">
                              <RadioGroupItem
                                :id="`hr-r1-${it.id}`"
                                class="block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]"
                                value="1"
                                @click="$emit('approve-human', it.id, '1')"
                              >
                                <label class="cursor-pointer text-center text-[10px] font-normal text-[#464661]" :for="`hr-r1-${it.id}`">
                                  Duyệt
                                </label>
                              </RadioGroupItem>
                              <RadioGroupItem
                                :id="`hr-r2-${it.id}`"
                                class="block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]"
                                value="2"
                                @click="$emit('approve-human', it.id, '2')"
                              >
                                <label class="cursor-pointer text-center text-[10px] font-normal text-[#464661]" :for="`hr-r2-${it.id}`">
                                  Không duyệt
                                </label>
                              </RadioGroupItem>
                            </template>
                          </RadioGroupRoot>
                        </div>
                      </div>
                    </td>

                    <!-- Actions -->
                    <td class="px-4 py-3 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <template v-if="it.action.includes('edit')">
                          <button
                            type="button"
                            class="inline-flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-100"
                            @click="$emit('edit', it.id)"
                          >
                            <img src="@/assets/images/action-edit-2.svg" alt="Edit" />
                          </button>
                        </template>
                        <template v-if="it.action.includes('delete')">
                          <button
                            type="button"
                            class="inline-flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-100"
                            @click="$emit('delete', it.id)"
                          >
                            <img src="@/assets/images/action-edit-3.svg" alt="Delete" />
                          </button>
                        </template>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="py-8 text-center text-gray-500">
      Không có dữ liệu hiển thị
    </div>
  </div>
</template>
