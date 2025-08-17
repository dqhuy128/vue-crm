<template>
  <form @submit.prevent="postAddLeave">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
          Ngày nghỉ
        </span>
        <!-- multi-calendars -->
        <VueDatePicker
          v-model="datepicker"
          :enable-time-picker="false"
          locale="vi"
          :format-locale="vi"
          cancel-text="Huỷ"
          select-text="Chọn"
          range
          format="dd/MM/yyyy"
          :min-date="new Date()"
        />
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Lý do
          </span>
          <textarea
            id=""
            v-model="paramsLeave.reason"
            name=""
            placeholder="Nhập mô tả"
            class="font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <slot />
      <button
        type="submit"
        class="border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-75': onSubmitting }"
      >
        <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>Lưu</div>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import '@vuepic/vue-datepicker/dist/main.css'

  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import { apiUri } from '@/constants/apiUri'

  const auth = useAuth()

  const emit = defineEmits(['post-request'])

  const props = defineProps<{
    datatype: any
    propFunction: Function
  }>()

  const datepicker = ref<any | null>(null)
  const initDates = () => {
    const startDate = new Date(new Date().setDate(new Date().getDate() + 1))
    const endDate = new Date(new Date().setDate(startDate.getDate() + 1))
    datepicker.value = [startDate, endDate]
  }
  const updateDates = () => {
    if (datepicker.value && Array.isArray(datepicker.value) && datepicker.value.length === 2) {
      paramsLeave.begin_date = format(datepicker.value[0], 'yyyy/MM/dd')
      paramsLeave.finish_date = format(datepicker.value[1], 'yyyy/MM/dd')
    }
  }
  watch(datepicker, () => {
    if (auth.check()) {
      updateDates()
    }
  })

  const paramsLeave = reactive<any | null>({
    begin_date: null,
    finish_date: null,
    reason: null,
  })

  const postRequest = ref<any | null>(null)
  const onSubmitting = ref(false)
  const postAddLeave = async () => {
    onSubmitting.value = true
    try {
      const formData = new FormData()
      formData.append('begin_date', paramsLeave.begin_date)
      formData.append('finish_date', paramsLeave.finish_date)
      formData.append('reason', paramsLeave.reason)

      const res = await axios.post(`${apiUri}/leave/create`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      paramsLeave.reason = null
      paramsLeave.begin_date = null
      paramsLeave.finish_date = null
      initDates()
      props.propFunction()
      postRequest.value = res.data
      emit('post-request', postRequest.value)
      // console.log('🚀 ~ postAddLeave ~ res:', postRequest.value)
    } catch (error) {
      console.log('🚀 ~ postAddLeave ~ error:', error)
    } finally {
      onSubmitting.value = false
    }
  }

  onMounted(() => {
    if (auth.check()) {
      initDates()
      updateDates()
    }
  })
</script>

<style lang="scss"></style>
