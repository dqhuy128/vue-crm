<template>
  <div class="block my-4">
    <div id="breadcrumbs" class="flex flex-wrap items-center gap-2">
      <template v-for="(n, idx) in breadcrumbsList">
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
    <PageTitle><slot /></PageTitle>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from './PageTitle.vue'

const breadcrumbsList = ref([
  {
    name: 'Home',
    path: '/dashboard/personal'
  }
])

const props = defineProps<{
  name: string
  path: string
}>()

breadcrumbsList.value.push({
  name: props.name,
  path: props.path
})
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
