<script lang="ts" setup>
  import { useRoute } from 'vue-router'

  type ticketProps = [icon: any, title: string, ticketList: Array<any>, sroute?: any]
  // Define props for the component
  const propsTicketProps = defineProps<{ ticketProps: ticketProps }>()
  // Destructuring the array (ticketProps is a tuple, so we access it by index)
  const [icon, title, ticketList, sroute] = propsTicketProps.ticketProps
  const route = useRoute().path
</script>

<template>
  <div class="ticket-box flex h-full flex-col rounded-[24px] bg-white">
    <div class="flex flex-wrap items-center border-b border-solid border-[#909090] px-6 py-2.5">
      <div class="inline-flex items-center gap-2">
        <img :src="icon" alt="" />
        <h3 class="font-inter text-[16px] leading-normal font-bold text-[#464661]">
          {{ title }}
        </h3>
      </div>

      <div v-if="sroute" class="ms-auto">
        <router-link
          :to="{ name: sroute }"
          class="font-inter hover:text-main inline-block text-[14px] font-normal text-[#909090] italic underline transition"
        >
          Xem chi tiết
        </router-link>
      </div>
    </div>

    <div class="flex h-full flex-col px-6 pt-3.5 pb-6" :class="[route == '/dashboard/report' ? 'justify-center' : '']">
      <div
        v-for="(item, id) in ticketList"
        :key="id"
        class="last-border-t flex flex-wrap items-center gap-3 border-b border-solid border-[#EDEDF6] pb-3 not-last:mb-3.5"
      >
        <div class="h-2.5 w-2.5 rounded-[50%] bg-[#464661]" :class="item.status"></div>
        <div class="font-inter grow text-[16px] leading-normal font-normal text-[#464661]">
          {{ item.title }}
        </div>
        <div class="font-inter ms-auto text-[20px] leading-normal font-bold text-[#464661]">
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
