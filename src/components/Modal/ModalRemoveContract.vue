<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-12 gap-6 py-16">
      <div class="col-span-12 md:col-span-6">
        <div class="form-title required">Ngày nghỉ việc</div>
        <VueDatePicker
          v-model="terminationDatePicker"
          :class="['work-history-datepicker', { 'is-error': errors.day_off }]"
          :enable-time-picker="false"
          locale="vi"
          :format-locale="vi"
          cancel-text="Huỷ"
          select-text="Chọn"
          format="dd/MM/yyyy"
          placeholder="Chọn ngày nghỉ việc"
        />
        <p v-if="errors.day_off" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.day_off }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="form-title required">Lý do nghỉ việc</div>
        <div class="form-holder">
          <input
            v-model="params.reason"
            class="form-input"
            type="text"
            placeholder="Nhập lý do"
            :class="{ 'is-error': errors.reason }"
          />
        </div>
        <p v-if="errors.reason" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.reason }}
        </p>
      </div>
    </div>

    <div class="flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <slot />
      <button
        type="submit"
        class="border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-75': isSubmitting }"
      >
        <div v-if="isSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>xác nhận</div>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import '@vuepic/vue-datepicker/dist/main.css'

  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
  import { reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import { apiUri } from '@/constants/apiUri'

  const auth = useAuth()

  const emit = defineEmits(['post-request-remove'])

  const props = defineProps<{
    datatype: any
    propFunction: Function
  }>()

  interface RemoveContractPayload {
    id?: string
    day_off?: string
    reason?: string
  }

  const params: RemoveContractPayload = reactive({
    id: '',
    day_off: '',
    reason: '',
  })

  const terminationDatePicker = ref<Date | null>(null)

  watch(terminationDatePicker, (val) => {
    if (val instanceof Date) {
      params.day_off = format(val, 'yyyy-MM-dd')
    } else {
      params.day_off = ''
    }
  })

  // Prefill id from datatype
  watch(
    () => props.datatype,
    (newVal) => {
      if (!newVal) return
      const data = newVal.data ?? newVal
      params.id = (data.id ?? '').toString()
      if (data.day_off) {
        terminationDatePicker.value = new Date(data.day_off)
      }
      params.reason = (data.reason ?? '').toString()
    },
    { immediate: true }
  )

  interface FormErrors {
    day_off?: string
    reason?: string
  }
  const errors: FormErrors = reactive({})

  const isSubmitting = ref(false)

  const validate = () => {
    Object.keys(errors).forEach((k) => delete (errors as any)[k])
    if (!params.day_off) errors.day_off = 'Vui lòng chọn ngày nghỉ việc'
    if (!params.reason?.trim()) errors.reason = 'Vui lòng nhập lý do nghỉ việc'
    return Object.keys(errors).length === 0
  }

  watch(
    () => ({ ...params }),
    (val) => {
      if (val.day_off && errors.day_off) delete errors.day_off
      if (val.reason && errors.reason) delete errors.reason
    },
    { deep: true }
  )

  const handleSubmit = async () => {
    if (isSubmitting.value) return
    if (!validate()) return
    try {
      isSubmitting.value = true
      const formData = new FormData()
      if (params.id) formData.append('id', params.id)
      formData.append('day_off', params.day_off || '')
      formData.append('reason', params.reason || '')

      const { data } = await axios.post(`${apiUri}/contract/terminate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      props.propFunction && props.propFunction()
      emit('post-request-remove', data)
    } catch (error) {
      console.error('handleSubmit terminate error:', error)
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped lang="scss">
  .form-title {
    color: #464661;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 8px;

    .required {
      position: relative;

      &::after {
        content: '*';
        display: inline-block;
        color: #e61b1b;
        margin-left: 4px;
      }
    }
  }

  .form-holder {
    & > * {
      display: block;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ededf6;
      background: #fff;
      padding: 10px;
      color: #000;
      font-size: 16px;
      font-weight: 400;
      line-height: normal;

      &::placeholder {
        font-style: italic;
      }
    }
  }

  .work-history-datepicker {
    display: block;
    width: 100%;

    :deep(.dp__input) {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ededf6;
      background: #fff;
      color: #000;
      font-size: 16px;
      font-weight: 400;
      line-height: normal;
      padding-block: 10px 10px;
    }

    :deep(.dp__input::placeholder) {
      font-style: italic;
    }
  }

  .is-error {
    border-color: #e61b1b !important;
  }
  .work-history-datepicker.is-error :deep(.dp__input) {
    border-color: #e61b1b !important;
  }
</style>
