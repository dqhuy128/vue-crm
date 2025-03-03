<script lang="ts" setup>
import { useRoute } from "vue-router"

type ticketProps = [icon: any, title: string, ticketList: Array<any>]
// Define props for the component
const propsTicketProps = defineProps<{ ticketProps: ticketProps }>()
// Destructuring the array (ticketProps is a tuple, so we access it by index)
const [icon, title, ticketList] = propsTicketProps.ticketProps
const route = useRoute().path
</script>

<template>
  <div class="ticket-box bg-white rounded-[24px] flex flex-col h-full">
    <div
      class="flex flex-wrap items-center py-2.5 px-6 border-b border-solid border-[#909090]"
    >
      <div class="inline-flex items-center gap-2">
        <img :src="icon" alt="" />
        <h3
          class="text-[#464661] font-inter text-[16px] font-bold leading-normal"
        >
          {{ title }}
        </h3>
      </div>

      <div class="ms-auto">
        <router-link
          to=""
          class="inline-block text-[#909090] font-inter text-[14px] italic font-normal underline hover:text-main transition"
        >
          Xem chi tiết
        </router-link>
      </div>
    </div>

    <div
      class="pt-3.5 px-6 pb-6 flex flex-col h-full"
      :class="[route == '/dashboard/report' ? 'justify-center' : '']"
    >
      <div
        class="last-border-t flex flex-wrap items-center gap-3 border-b border-solid border-[#EDEDF6] pb-3.5 mb-4"
        v-for="(item, id) in ticketList"
        :key="id"
      >
        <div
          class="w-2.5 h-2.5 bg-[#464661] rounded-[50%]"
          :class="item.status"
        ></div>
        <div
          class="grow text-[#464661] font-inter text-[16px] font-normal leading-normal"
        >
          {{ item.title }}
        </div>
        <div
          class="text-[#464661] font-inter text-[20px] font-bold leading-normal ms-auto"
        >
          {{ item?.count }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.normal {
  background: #464661;
}

.pending {
  background: #e61b1b;
}

.waiting {
  background: #ffae00;
}

.done {
  background: #12f13e;
}

.reject {
  background: #e61b1b;
}
</style>
