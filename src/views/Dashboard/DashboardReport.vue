<script setup lang="ts">
import Buttons from '@/components/Buttons.vue'
import MainLayout from '@/views/MainLayout.vue'
import Ticket from '@/components/Ticket.vue'
import iconTicket1 from '@/assets/images/ticket-icon-1.png'
import iconTicket2 from '@/assets/images/ticket-icon-2.png'
import iconTicket3 from '@/assets/images/ticket-icon-3.png'
import iconTicket4 from '@/assets/images/ticket-icon-4.png'
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import 'flatpickr/dist/flatpickr.css'
import Breadcrums from '@/components/BreadcrumsNew.vue'
import axios from 'axios'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { vi } from 'date-fns/locale/vi'
import { format } from 'date-fns'

const auth = useAuth()

const dataReport = ref<any>()
const fetchReport = async () => {
  try {
    const res = await axios.get(`${apiUri}/dashboard/report`, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    const { data } = res.data
    dataReport.value = data
  } catch (error) {
    console.log('🚀 ~ fetchTicket ~ error:', error)
  }
}

const ticket: any = [
  {
    icon: iconTicket4,
    title: 'Nghỉ phép',
    ticketList: [
      {
        title: computed(() => dataReport.value?.total?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.total?.count || '0')
      },
      {
        title: computed(() => dataReport.value?.[1]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[1]?.count || '0')
      },
      {
        title: computed(() => dataReport.value?.[2]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[2]?.count || '0')
      },
      {
        title: computed(() => dataReport.value?.[3]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[3]?.count || '0')
      },
      {
        title: computed(() => dataReport.value?.[4]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[4]?.count || '0')
      },

      {
        title: computed(() => dataReport.value?.[14]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[14]?.count || '0')
      },
      {
        title: computed(() => dataReport.value?.[33]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[33]?.count || '0')
      },
      {
        title: computed(() => dataReport.value?.[34]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[34]?.count || '0')
      },

      {
        title: computed(() => dataReport.value?.[35]?.name),
        status: 'normal',
        count: computed(() => dataReport.value?.[35]?.count || '0')
      }
    ]
  },
  {
    icon: iconTicket4,
    title: 'Số lượng nhân sự nghỉ / Số lượng nhân sự mới',
    ticketList: [
      {
        title: 'Tổng',
        status: 'reject',
        count: computed(() => dataReport.value?.total?.count || '0')
      }
    ]
  }
]

const route = useRoute()

interface typeParamsDashboardReport {
  begin_date: string
  finish_date: string
}
const paramsDashboardReport = reactive<typeParamsDashboardReport>({
  begin_date: '',
  finish_date: ''
})

const datepicker = ref<any | null>(null)
const startDate = new Date(new Date().setDate(new Date().getDate() - 30))
const endDate = new Date()
datepicker.value = [startDate, endDate]
paramsDashboardReport.begin_date = format(startDate, 'yyyy-MM-dd')
paramsDashboardReport.finish_date = format(endDate, 'yyyy-MM-dd')
const updateDates = () => {
  if (datepicker.value) {
    paramsDashboardReport.begin_date = format(datepicker.value[0], 'yyyy-MM-dd')
    paramsDashboardReport.finish_date = format(
      datepicker.value[1],
      'yyyy-MM-dd'
    )
  }
}
watch(datepicker, () => {
  if (auth.check()) {
    updateDates()
  }
})

const handleSearchReport = async () => {
  try {
    const formData = new FormData()
    formData.append('begin_date', paramsDashboardReport.begin_date)
    formData.append('finish_date', paramsDashboardReport.finish_date)

    const res = await axios.post(`${apiUri}/dashboard/report`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    const { data } = res.data
    dataReport.value = data
    // console.log('🚀 ~ handleSearchReport ~ dataReport.value:', dataReport.value)
  } catch (error) {
    console.log('🚀 ~ handleSearchReport ~ error:', error)
  }
}

onMounted(() => {
  fetchReport()
})
</script>

<template>
  <MainLayout>
    <Breadcrums name="Dashboard" path="/dashboard/personal" />

    <Buttons :title="`active`" />

    <div class="mt-3"></div>

    <div class="mb-3">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-6">
          <div class="search-box-cpn bg-white rounded-[24px] p-2.5">
            <form
              @submit.prevent="handleSearchReport"
              class="flex flex-wrap items-stretch gap-2"
            >
              <div class="grow">
                <VueDatePicker
                  class="work-history-datepicker"
                  v-model="datepicker"
                  :enable-time-picker="false"
                  locale="vi"
                  :format-locale="vi"
                  cancelText="Huỷ"
                  selectText="Chọn"
                  range
                  format="dd/MM/yyyy"
                  :max-date="new Date()"
                  @update:model-value="updateDates"
                />
              </div>

              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 max-md:w-full bg-[#013878] rounded-[24px] p-[8px_16px] text-white font-inter text=[16px] max-md:text-[14px] font-bold leading-normal hover:shadow-hoverinset transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.0002 21L16.7002 16.7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div
        class="col-span-12 lg:col-span-6"
        v-for="(item, id) in ticket.slice(-2)"
        :key="id"
      >
        <Ticket
          :ticketProps="[item.icon, item.title, item.ticketList]"
          :class="[
            route.path == '/dashboard/report'
              ? 'ticketbox-dashboard-report'
              : ''
          ]"
        />
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss">
.col-span-12 {
  &:last-child {
    .ticketbox-dashboard-report {
      .last-border-t {
        border-top: 1px solid #ededf6;
        padding-top: 14px;
        margin-bottom: 0 !important;
      }
    }
  }
}
</style>
