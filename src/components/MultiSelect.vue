<template>
  <multiselect
    v-model="internalValue"
    :searchable="false"
    :close-on-select="true"
    :show-labels="false"
    :placeholder="props.holder"
    :options="props.options"
  ></multiselect>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import Multiselect from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.min.css"

const props = defineProps<{
  modelValue: []
  options: []
  holder: string
}>()

const emit = defineEmits(["update:modelValue"])

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    // Khi giá trị thay đổi, emit event để báo cho component cha
    emit("update:modelValue", val)
  }
})
</script>

<style lang="scss">
.multiselect__placeholder {
  color: #000;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  font-family: "Inter";
  margin-bottom: 0;
  padding-top: 0;
  opacity: 0.45;
}

.multiselect__tags {
  min-height: 46px;
  display: block;
  padding: 12px 10px 10px;
  border-radius: 8px;
  border: 1px solid #ededf6;
  background: #fff;
}

.multiselect__select {
  height: 100%;
}
</style>
