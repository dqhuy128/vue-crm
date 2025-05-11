<script setup lang="ts">
import Buttons from '@/components/Buttons.vue'
import MainLayout from '@/views/MainLayout.vue'
import Ticket from '@/components/Ticket.vue'
import iconTicket1 from '@/assets/images/ticket-icon-1.png'
import iconTicket2 from '@/assets/images/ticket-icon-2.png'
import iconTicket3 from '@/assets/images/ticket-icon-3.png'
import Breadcrums from '@/components/BreadcrumsNew.vue'
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'

const auth = useAuth()

const dataTicket = ref<any>()
const dataLeave = ref<any>()
const dataWork = ref<any>()
const fetchTicket = async () => {
  try {
    const res = await axios.get(`${apiUri}/dashboard/individual`, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    const { data } = res.data
    dataTicket.value = data.ticket
    dataLeave.value = data.leave
    dataWork.value = data.work
  } catch (error) {
    console.log('🚀 ~ fetchTicket ~ error:', error)
  }
}

const ticket: any = [
  {
    icon: iconTicket1,
    title: 'Tổng số ticket',
    sroute: 'SystemCategory',
    ticketList: [
      {
        title: 'Tổng số yêu cầu chưa xử lý',
        status: 'normal',
        count: computed(() => dataTicket.value?.total || '0')
      },
      {
        title: 'Chờ xử lý',
        status: 'pending',
        count: computed(() => dataTicket.value?.pending || '0')
      },
      {
        title: 'Đang xử lý',
        status: 'waiting',
        count: computed(() => dataTicket.value?.processing || '0')
      },
      {
        title: 'Đã xử lý trong ngày',
        status: 'done',
        count: computed(() => dataTicket.value?.done || '0')
      },
      {
        title: 'Đã từ chối trong ngày',
        status: 'reject',
        count: computed(() => dataTicket.value?.deny || '0')
      }
    ]
  },
  {
    icon: iconTicket2,
    title: 'Nghỉ phép',
    sroute: 'Info',
    ticketList: [
      {
        title: 'Tổng số ngày nghỉ',
        status: 'normal',
        count: computed(() => dataLeave.value?.total || '0')
      },
      {
        title: 'Số ngày nghỉ còn lại',
        status: 'normal',
        count: computed(() => String(dataLeave.value?.remain || '0'))
      },
      {
        title: 'Số ngày nghỉ đã sử dụng',
        status: 'normal',
        count: computed(() => dataLeave.value?.used || '0')
      }
    ]
  },
  {
    icon: iconTicket3,
    title: 'Chấm công',
    sroute: 'History',
    ticketList: [
      {
        title: 'Số lỗi chấm công trong tháng',
        status: 'reject',
        count: computed(() => dataWork.value?.total || '0')
      },
      {
        title: 'Đã giải trình',
        status: 'normal',
        count: computed(() => dataWork.value?.accept || '0')
      },
      {
        title: 'Chưa giải trình',
        status: 'reject',
        count: computed(() => dataWork.value?.deny || '0')
      },
      {
        title: 'Chờ phê duyệt',
        status: 'reject',
        count: computed(() => dataWork.value?.pending || '0')
      }
    ]
  }
]

onMounted(() => {
  fetchTicket()
})
</script>

<template>
  <MainLayout>
    <Breadcrums name="Dashboard" />

    <Buttons :title="`active`" />

    <div class="mt-3"></div>
    <div class="grid grid-cols-12 gap-6">
      <div
        class="col-span-12 xl:col-span-4"
        v-for="(item, id) in ticket"
        :key="id"
      >
        <Ticket
          :ticketProps="[item.icon, item.title, item.ticketList, item.sroute]"
        />
      </div>
    </div>
  </MainLayout>
</template>
