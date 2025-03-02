<script setup lang="ts">
import Dashboard from "./Dashboard.vue"
import Ticket from "../components/Ticket.vue"
import iconTicket1 from "@/assets/images/ticket-icon-1.png"
import iconTicket2 from "@/assets/images/ticket-icon-2.png"
import iconTicket3 from "@/assets/images/ticket-icon-3.png"

const ticket: any = [
  {
    icon: iconTicket1,
    title: "Tổng số ticket",
    ticketList: [
      "Tổng số yêu cầu chưa xử lý",
      "Chờ xử lý",
      "Đang xử lý",
      "Đã xử lý trong ngày",
      "Đã từ chối trong ngày"
    ]
  },
  {
    icon: iconTicket2,
    title: "Nghỉ phép",
    ticketList: [
      "Tổng số ngày nghỉ",
      "Số ngày nghỉ còn lại",
      "Số ngày nghỉ đã sử dụng"
    ]
  },
  {
    icon: iconTicket3,
    title: "Chấm công",
    ticketList: [
      "Số lỗi chấm công trong tháng",
      "Đã giải trình",
      "Chưa giải trình",
      "Chờ phê duyệt"
    ]
  }
]
</script>

<template>
  <Dashboard>
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
  </Dashboard>
</template>
