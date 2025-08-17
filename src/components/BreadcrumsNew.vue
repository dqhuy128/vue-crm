<template>
  <div class="my-4 block">
    <div id="breadcrumbs" class="flex flex-wrap items-center gap-2">
      <template v-for="(n, idx) in breadcrumbsList">
        <router-link
          to=""
          :class="[
            idx === 0
              ? 'breadcrumbs-nav-first font-inter text-[16px] leading-normal font-normal text-[#464661]'
              : 'font-inter text-[16px] leading-normal font-bold text-[#464661]',
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
    },
  ])

  const props = defineProps<{
    name: string
  }>()

  breadcrumbsList.value.push({
    name: props.name,
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
