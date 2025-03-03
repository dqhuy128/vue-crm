<script lang="ts" setup></script>

<template>
  <div class="search-box-cpn bg-white rounded-[24px] overflow-hidden p-2.5">
    <form action="" class="flex flex-wrap items-stretch gap-6">
      <slot />

      <button
        type="submit"
        class="inline-flex items-center gap-2 bg-[#013878] rounded-[24px] p-[8px_16px] text-white font-inter text=[16px] font-bold leading-normal hover:shadow-hoverinset transition cursor-pointer"
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
</template>

<style lang="scss" scoped></style>
