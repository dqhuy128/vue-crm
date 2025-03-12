<script setup lang="ts">
import Navbar from "../components/Navbar.vue"
import Breadcrums from "../components/Breadcrums.vue"
import Sidebar from "../components/Sidebar.vue"
</script>

<template>
  <div
    class="py-7 px-6 bg-[#E9F0F4] min-h-[100vh] flex flex-col items-center justify-center"
  >
    <div class="flex flex-wrap w-full h-full gap-6">
      <div class="max-w-[240px] flex-[0_0_240px] w-full">
        <Sidebar />
      </div>

      <div class="grow">
        <Navbar />
        <Breadcrums>
          <slot name="breadcrumb" ></slot>
        </Breadcrums>
        <slot />
      </div>
    </div>
  </div>
</template>
