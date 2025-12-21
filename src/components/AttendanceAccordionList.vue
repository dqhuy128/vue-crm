<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { computed, ref } from 'vue'

  // Define types based on usage in History.vue and the prompt description
  interface WorkHistoryItem {
    id?: string
    user_id?: string
    name?: string
    user_code?: string
    work_date?: string
    check_in?: string | null
    check_out?: string | null
    total?: string
    status?: null | string
    explanation?: boolean
  }

  // Input prop matches the structure of dataWorkHistory.doc.items
  interface Props {
    items: Record<string, Record<string, WorkHistoryItem>> | WorkHistoryItem[]
  }

  const props = defineProps<Props>()

  defineEmits<{
    (e: 'explain', userId: string, date: string): void
  }>()

  // --- Data Transformation ---
  const employees = computed(() => {
    if (!props.items) return []

    // Handle nested object structure
    if (!Array.isArray(props.items)) {
      return Object.entries(props.items).map(([userId, dateRecords]) => {
        // Convert date records object to array and sort by date
        const logs = Object.values(dateRecords).sort((a, b) => {
          return a.work_date && b.work_date ? a.work_date.localeCompare(b.work_date) : 0
        })

        // Get basic info from the first record found
        const firstRecord = logs[0] || {}

        // Calculate summary stats
        // Example: Total working days recorded
        const totalDays = logs.length

        return {
          userId,
          name: firstRecord.name || 'Unknown',
          code: firstRecord.user_code || 'N/A',
          logs,
          totalDays,
        }
      })
    }

    // Handle flat array structure - group by user_id, then by work_date
    const groupedData: Record<string, Record<string, WorkHistoryItem>> = {}

    props.items.forEach((item: any) => {
      const userId = item.user_id || item.id
      const workDate = item.work_date

      if (userId && workDate) {
        if (!groupedData[userId]) {
          groupedData[userId] = {}
        }
        groupedData[userId][workDate] = item
      }
    })

    return Object.entries(groupedData).map(([userId, dateRecords]) => {
      // Convert date records object to array and sort by date
      const logs = Object.values(dateRecords).sort((a, b) => {
        return a.work_date && b.work_date ? a.work_date.localeCompare(b.work_date) : 0
      })

      // Get basic info from the first record found
      const firstRecord = logs[0] || {}

      // Calculate summary stats
      // Example: Total working days recorded
      const totalDays = logs.length

      return {
        userId,
        name: firstRecord.name || 'Unknown',
        code: firstRecord.user_code || 'N/A',
        logs,
        totalDays,
      }
    })
  })

  // --- Accordion State ---
  const openAccordions = ref<Record<string, boolean>>({})

  const toggleAccordion = (userId: string) => {
    openAccordions.value[userId] = !openAccordions.value[userId]
  }

  // --- Styling Logic ---
  const getStatusClasses = (status: string | null | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-500'

    const s = status.toUpperCase()
    if (s === 'QCC') {
      return 'bg-orange-100 text-orange-600 border border-orange-200'
    }
    if (s === 'M2') {
      return 'bg-yellow-100 text-yellow-700 border border-yellow-200'
    }

    // Default for other statuses
    return 'bg-blue-50 text-blue-600 border border-blue-100'
  }
</script>

<template>
  <div class="font-inter flex flex-col gap-4">
    <template v-if="employees.length > 0">
      <div
        v-for="emp in employees"
        :key="emp.userId"
        class="rounded-[12px] border border-[#EDEDF6] bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <!-- Header (Always Visible) -->
        <div
          class="group flex cursor-pointer items-center justify-between bg-white p-4 transition-colors select-none hover:bg-gray-50"
          @click="toggleAccordion(emp.userId)"
        >
          <div class="flex items-center gap-4">
            <!-- Avatar Placeholder / Initial -->
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
                  <Icon icon="fluent:calendar-checkmark-24-regular" class="h-3.5 w-3.5" />
                  {{ emp.totalDays }} ngày công
                </span>
              </div>
            </div>
          </div>

          <!-- Chevron Icon -->
          <div
            class="transform text-gray-400 transition-transform duration-300 group-hover:text-[#1b4dea]"
            :class="{ 'rotate-180': openAccordions[emp.userId] }"
          >
            <Icon icon="radix-icons:chevron-down" class="h-6 w-6" />
          </div>
        </div>

        <!-- Body (Collapsible) -->
        <div v-if="openAccordions[emp.userId]" class="border-t border-[#EDEDF6] bg-[#FAFAFA]">
          <div class="p-4">
            <div class="rounded-lg border border-[#EDEDF6] bg-white">
              <table class="w-full text-left text-sm">
                <thead class="bg-[#F5F5F7] text-xs text-[#464661] uppercase">
                  <tr>
                    <th class="px-4 py-3 font-semibold">Ngày</th>
                    <th class="px-4 py-3 font-semibold">Check-in</th>
                    <th class="px-4 py-3 font-semibold">Check-out</th>
                    <th class="px-4 py-3 text-right font-semibold">Trạng thái</th>
                    <th class="px-4 py-3 text-center font-semibold">Giải trình</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EDEDF6]">
                  <tr v-for="(log, idx) in emp.logs" :key="idx" class="transition-colors hover:bg-blue-50/30">
                    <td class="px-4 py-3 font-medium text-[#464661]">
                      {{ log.work_date }}
                    </td>
                    <td class="px-4 py-3 font-mono text-[13px] text-gray-600">
                      {{ log.check_in || '--:--' }}
                    </td>
                    <td class="px-4 py-3 font-mono text-[13px] text-gray-600">
                      {{ log.check_out || '--:--' }}
                    </td>
                    <td class="px-4 py-3 text-right">
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        :class="getStatusClasses(log.status)"
                      >
                        {{ log.status || '---' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <template v-if="log.explanation">
                        <button
                          type="button"
                          class="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-100"
                          @click="$emit('explain', emp.userId, log.work_date || '')"
                        >
                          <img src="@/assets/images/action-edit-2.svg" alt="Giải trình" />
                        </button>
                      </template>
                    </td>
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
