<template>
  <MainLayout>
    <div class="flex h-screen flex-col items-center justify-center">
      <h1 class="text-2xl font-bold text-[#464661]">Page Not Found</h1>
      <p class="text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <router-link to="/" class="mt-4 text-blue-500 hover:underline"> Go back to Home </router-link>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
  import MainLayout from '@/views/MainLayout.vue'
</script>
