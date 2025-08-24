<template>
  <div class="overflow-hidden rounded-[24px] bg-white p-[45px_16px]">
    <div class="mb-3 text-center text-[16px] font-bold text-[#464661] uppercase">Thông báo</div>

    <div class="mb-3 text-center">
      <img class="mx-auto" src="@/assets/images/icon-park-outline_attention.svg" alt="" />
    </div>

    <div class="mx-auto mb-6 text-center text-[16px]/[26px] font-semibold text-[#464661] underline">
      Bạn chắc chắn muốn xoá hợp đồng này ?
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-3 text-center xl:gap-6">
      <button
        type="button"
        class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[130px]"
        @click="$emit('cancel')"
      >
        Hủy
      </button>
      <button
        type="button"
        class="border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[130px]"
        @click="$emit('confirm')"
      >
        Xác nhận
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineEmits(['cancel', 'confirm'])
</script>
