<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import { calculateMainLayout, toggleSidebar } from '@/utils/main'

onMounted(() => {
  calculateMainLayout()
  toggleSidebar()
})
</script>

<template>
  <div class="bg-[#E9F0F4] min-h-[100vh] flex flex-col">
    <Sidebar />

    <div id="MainLayout" class="block px-6 main-layout py-7">
      <div class="flex flex-col lg:h-[calc(100vh-75px)]">
        <Navbar />
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
