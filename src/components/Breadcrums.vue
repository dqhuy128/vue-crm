<script setup lang="ts">
  import { useRoute } from 'vue-router'

  import { splitPath, uppercasedFirstWord } from '../utils/main'

  const route = useRoute()
  const currentPath = splitPath(route.path)
</script>

<template>
  <div class="mt-5 mb-7 block">
    <div id="breadcrumbs" class="mb-2 flex flex-wrap items-center gap-2">
      <router-link to="" class="breadcrumbs-nav-first font-inter text-[16px] leading-normal font-normal text-[#464661]">
        Home
      </router-link>
      <router-link to="" class="font-inter text-[16px] leading-normal font-bold text-[#464661]">
        {{ uppercasedFirstWord(currentPath) }}
      </router-link>
    </div>

    <!-- <div id="titlePage">
      <h1
        class="block text-[#464661] font-inter text-[20px] font-bold leading-normal m-0"
      >
        {{ uppercasedFirstWord(currentPath) }}
      </h1>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
  .breadcrumbs-nav-first {
    position: relative;

    &::after {
      content: '>';
      display: inline-block;
      margin-left: 4px;
    }
  }
</style>
