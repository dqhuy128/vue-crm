<script setup lang="ts">
import Buttons from '@/components/Buttons.vue'
import MainLayout from '@/views/MainLayout.vue'
import Ticket from '@/components/Ticket.vue'
import iconTicket1 from '@/assets/images/ticket-icon-1.png'
import iconTicket2 from '@/assets/images/ticket-icon-2.png'
import iconTicket3 from '@/assets/images/ticket-icon-3.png'
import iconTicket4 from '@/assets/images/ticket-icon-4.png'
import { useRoute } from 'vue-router'
import SeachBox from '@/components/SeachBox.vue'
import { ref, reactive, onMounted, computed } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import Breadcrums from '@/components/BreadcrumsNew.vue'
import axios from 'axios'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'

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

const date1 = ref(null)
const date2 = ref(null)

const dateConfig: any = reactive({
  locale: Vietnamese,
  dateFormat: 'd / m / Y',
  disableMobile: true
})

const dateRange: any = reactive({
  mode: 'range',
  locale: Vietnamese,
  dateFormat: 'd / m / Y',
  disableMobile: true
})

onMounted(() => {
  fetchReport()
})
</script>

<template>
  <MainLayout>
    <Breadcrums name="Dashboard" path="/dashboard/personal" />

    <Buttons :title="`active`" />

    <div class="mt-3"></div>

    <!-- <div class="mb-3">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-6">
          <SeachBox>
            <div
              class="relative flex items-center grow border border-solid border-[#EDEDF6] rounded-[24px] p-[10px_12px]"
            >
              <flat-pickr
                :config="dateConfig"
                v-model="date1"
                placeholder="Chọn thời gian"
                class="grow text-[#000] font-inter text-[16px] font-normal leading-normal focus:outline-0 focus:border-0"
              />
              <label
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-[50%]"
              >
                <img src="@/assets/images/cuida_calendar-outline.svg" alt="" />
              </label>
            </div>
          </SeachBox>
        </div>

        <div class="col-span-12 lg:col-span-6">
          <SeachBox>
            <div
              class="relative flex items-center grow border border-solid border-[#EDEDF6] rounded-[24px] p-[10px_12px]"
            >
              <flat-pickr
                v-model="date2"
                :config="dateRange"
                placeholder="Chọn thời gian"
                class="grow text-[#000] font-inter text-[16px] font-normal leading-normal focus:outline-0 focus:border-0"
              />
              <label
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-[50%]"
              >
                <img src="@/assets/images/cuida_calendar-outline.svg" alt="" />
              </label>
            </div>
          </SeachBox>
        </div>
      </div>
    </div> -->

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
