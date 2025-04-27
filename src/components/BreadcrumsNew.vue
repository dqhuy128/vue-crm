<template>
  <div class="block mt-5 mb-7">
    <div id="breadcrumbs" class="flex flex-wrap items-center gap-2 mb-2">
      <template v-for="(n, idx) in props.breadcrumbList">
        <router-link
          :to="n.path"
          :class="[
            idx === 0
              ? 'breadcrumbs-nav-first text-[#464661] font-inter text-[16px] font-normal leading-normal'
              : 'text-[#464661] font-inter text-[16px] font-bold leading-normal'
          ]"
        >
          {{ n.name }}
        </router-link>
      </template>
    </div>
    <!-- <PageTitle> <slot></slot></PageTitle> -->
  </div>
</template>

<script setup lang="ts">
import PageTitle from './PageTitle.vue'

interface Breadcrumb {
  name: string
  path: string
}
const props = defineProps<{
  breadcrumbList: Breadcrumb[]
}>()
</script>
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
