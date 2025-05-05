<script setup lang="ts">
import Buttons from '@/components/Buttons.vue'
import MainLayout from '@/views/MainLayout.vue'
import Ticket from '@/components/Ticket.vue'
import iconTicket1 from '@/assets/images/ticket-icon-1.png'
import iconTicket2 from '@/assets/images/ticket-icon-2.png'
import iconTicket3 from '@/assets/images/ticket-icon-3.png'
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
  }
]
</script>

<template>
  <MainLayout>
    <Breadcrums name="Dashboard" path="/dashboard/personal" />

    <Buttons :title="`active`" />

    <div class="mt-3"></div>
    <div class="grid grid-cols-12 gap-6">
      <div
        class="col-span-12 xl:col-span-4"
        v-for="(item, id) in ticket"
        :key="id"
      >
        <Ticket :ticketProps="[item.icon, item.title, item.ticketList]" />
      </div>
    </div>
  </MainLayout>
</template>
