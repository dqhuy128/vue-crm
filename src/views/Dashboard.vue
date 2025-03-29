<script setup lang="ts">
import Buttons from "../components/Buttons.vue"
import MainLayout from "../views/MainLayout.vue"
</script>

<template>
  <MainLayout>
    <Buttons :title="`active`" />
    <slot />
  </MainLayout>
</template>
