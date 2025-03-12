<script setup lang="ts">
import { onMounted } from "vue"
import Navbar from "../components/Navbar.vue"
import Breadcrums from "../components/Breadcrums.vue"
import Sidebar from "../components/Sidebar.vue"
import { calculateMainLayout, toggleSidebar } from "../utils/main.ts"

onMounted(() => {
  calculateMainLayout()
  toggleSidebar()
})
</script>

<template>
  <div class="py-7 px-6 bg-[#E9F0F4] min-h-[100vh] flex flex-col items-center">
    <div class="flex flex-wrap gap-6 w-full h-full">
      <Sidebar />

      <div id="MainLayout" class="main-layout grow">
        <Navbar />
        <Breadcrums>
          <slot name="breadcrumb"></slot>
        </Breadcrums>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  transition: all 0.2s;
}
</style>
