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
import { ref, reactive } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import Breadcrums from '@/components/BreadcrumsNew.vue'

const ticket: any = [
  {
    icon: iconTicket1,
    title: 'Tổng số ticket',
    ticketList: [
      {
        title: 'Tổng số yêu cầu chưa xử lý',
        status: 'normal',
        count: '1'
      },
      {
        title: 'Chờ xử lý',
        status: 'pending',
        count: '12'
      },
      {
        title: 'Đang xử lý',
        status: 'waiting',
        count: '4'
      },
      {
        title: 'Đã xử lý trong ngày',
        status: 'done',
        count: '66'
      },
      {
        title: 'Đã từ chối trong ngày',
        status: 'reject',
        count: '8'
      }
    ]
  },
  {
    icon: iconTicket2,
    title: 'Nghỉ phép',
    ticketList: [
      {
        title: 'Tổng số ngày nghỉ',
        status: 'normal'
      },
      {
        title: 'Số ngày nghỉ còn lại',
        status: 'normal'
      },
      {
        title: 'Số ngày nghỉ đã sử dụng',
        status: 'normal'
      }
    ]
  },
  {
    icon: iconTicket3,
    title: 'Chấm công',
    ticketList: [
      {
        title: 'Số lỗi chấm công trong tháng',
        status: 'reject'
      },
      {
        title: 'Đã giải trình',
        status: 'normal'
      },
      {
        title: 'Chưa giải trình',
        status: 'reject'
      },
      {
        title: 'Chờ phê duyệt',
        status: 'reject'
      }
    ]
  },
  {
    icon: iconTicket4,
    title: 'Nghỉ phép',
    ticketList: [
      {
        title: 'Tổng số nhân viên',
        status: 'normal',
        count: '12'
      },
      {
        title: 'Ban Điều Hành',
        status: 'normal',
        count: '4'
      },
      {
        title: 'Phòng Sale Admin',
        status: 'normal',
        count: '22'
      },
      {
        title: 'Ban Trợ Lý',
        status: 'normal',
        count: '1'
      },
      {
        title: 'Phòng Pháp Chế',
        status: 'normal',
        count: '123'
      },
      {
        title: 'Ban Dự Án',
        status: 'normal',
        count: '12'
      },
      {
        title: 'Phòng HCNS',
        status: 'normal',
        count: '12'
      },
      {
        title: 'Phòng Marketing',
        status: 'normal',
        count: '12'
      },
      {
        title: 'Phòng Tuyển Dụng',
        status: 'normal',
        count: '12'
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
        count: '0/0'
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
</script>

<template>
  <MainLayout>
    <Breadcrums name="Dashboard" path="/dashboard/personal" />

    <Buttons :title="`active`" />

    <div class="mt-3"></div>

    <div class="mb-3">
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
