<template>
  <template v-if="currentStep === 1">
    <ResetGetMail @handleStep="increStep" />
  </template>

  <template v-else-if="currentStep === 2">
    <ResetGetOtp />
  </template>

  <template v-else>
    <ResetGetPass />
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ResetGetMail from './ResetGetMail.vue'
import ResetGetOtp from './ResetGetOtp.vue'
import ResetGetPass from './ResetGetPass.vue'

// Set current steps cho từng bước
const currentStep = ref<number>(1)

const increStep = () => {
  return currentStep.value++
}
</script>

<style></style>
