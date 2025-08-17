<script setup lang="ts">
  import { useRoute } from 'vue-router'

  import { splitPath } from '../utils/main'

  const route = useRoute()
  // Get the current path
  const currentPath = route.path

  defineProps<{
    title?: string
  }>()
</script>

<template>
  <div id="buttonList" class="inline-flex flex-wrap items-center gap-1 rounded-[8px]">
    <router-link
      :to="`${splitPath(currentPath)}/personal`"
      class="font-inter rounded-[8px] bg-white px-9 py-2.5 text-[16px] leading-normal font-bold text-[#909090] transition hover:bg-[#1b4dea] hover:text-white"
      :class="[currentPath == '/dashboard/personal' ? title : '']"
    >
      Cá nhân
    </router-link>
    <router-link
      :to="`${splitPath(currentPath)}/report`"
      class="font-inter rounded-[8px] bg-white px-9 py-2.5 text-[16px] leading-normal font-bold text-[#909090] transition hover:bg-[#1b4dea] hover:text-white"
      :class="[currentPath == '/dashboard/report' ? title : '']"
    >
      Báo cáo
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .active {
    background: #1b4dea;
    color: white;
  }
</style>
