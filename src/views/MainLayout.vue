<script setup lang="ts">
import { ref, onMounted } from "vue"
import Navbar from "../components/Navbar.vue"
import Breadcrums from "../components/BreadcrumsNew.vue"
import Sidebar from "../components/Sidebar.vue"
import { calculateMainLayout, toggleSidebar } from "@/utils/main"

onMounted(() => {
  calculateMainLayout()
  toggleSidebar()
})

const breadcrumbsList = ref([
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Dashboard",
    path: "/dashboard"
  }
])
</script>

<template>
  <div class="py-7 px-6 bg-[#E9F0F4] min-h-[100vh] flex flex-col items-center">
    <div class="flex flex-wrap w-full h-full gap-6">
      <Sidebar />

      <div id="MainLayout" class="main-layout grow">
        <Navbar />
        <Breadcrums :breadcrumbList="breadcrumbsList" path="/">
          <PageTitle> Dashboard </PageTitle>
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
