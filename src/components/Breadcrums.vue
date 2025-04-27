<script setup lang="ts">
import { useRoute } from 'vue-router'
import { uppercasedFirstWord, splitPath } from '../utils/main'

const route = useRoute()
const currentPath = splitPath(route.path)
</script>

<template>
  <div class="block mt-5 mb-7">
    <div id="breadcrumbs" class="flex flex-wrap items-center gap-2 mb-2">
      <router-link
        to=""
        class="breadcrumbs-nav-first text-[#464661] font-inter text-[16px] font-normal leading-normal"
      >
        Home
      </router-link>
      <router-link
        to=""
        class="text-[#464661] font-inter text-[16px] font-bold leading-normal"
      >
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
