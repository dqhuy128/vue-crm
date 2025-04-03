<script setup lang="ts">
import { useRoute } from "vue-router"
import { splitPath } from "../utils/main"

const route = useRoute()
// Get the current path
const currentPath = route.path

defineProps<{
  title?: string
}>()
</script>

<template>
  <div
    id="buttonList"
    class="inline-flex flex-wrap items-center gap-1 rounded-[8px]"
  >
    <router-link
      :to="`${splitPath(currentPath)}/personal`"
      class="text-[#909090] font-inter text-[16px] font-bold leading-normal bg-white rounded-[8px] py-2.5 px-9 hover:bg-[#1b4dea] hover:text-white transition"
      :class="[currentPath == '/dashboard/personal' ? title : '']"
    >
      Cá nhân
    </router-link>
    <router-link
      :to="`${splitPath(currentPath)}/report`"
      class="text-[#909090] font-inter text-[16px] font-bold leading-normal bg-white rounded-[8px] py-2.5 px-9 hover:bg-[#1b4dea] hover:text-white transition"
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
