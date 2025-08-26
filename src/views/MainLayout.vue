<script setup lang="ts">
  import { onMounted } from 'vue'

  import { calculateMainLayout, toggleSidebar } from '@/utils/main'

  import Navbar from '../components/Navbar.vue'
  import Sidebar from '../components/Sidebar.vue'

  onMounted(() => {
    calculateMainLayout()
    toggleSidebar()
  })
</script>

<template>
  <div class="flex min-h-[100vh] flex-col bg-[#E9F0F4]">
    <Sidebar />

    <div id="MainLayout" class="main-layout block px-6 py-7">
      <!-- lg:h-[calc(100vh-75px)] -->
      <div class="flex flex-col">
        <Navbar />
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
