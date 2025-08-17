<template>
  <form @submit.prevent="handlePostExplain">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Ngày </span>

          <VueDatePicker
            v-model="dateUserExplain"
            :enable-time-picker="false"
            locale="vi"
            :format-locale="vi"
            cancel-text="Huỷ"
            select-text="Chọn"
            format="dd/MM/yyyy"
            :max-date="new Date()"
            class="pointer-events-none opacity-50"
            @update:model-value="updateDates"
          />
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Họ và tên </span>

          <input
            id=""
            v-model="paramsUserExplain.user_name"
            type="text"
            name=""
            placeholder="Nhập họ và tên"
            class="font-inter focus:border-main pointer-events-none w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[16px] leading-normal font-normal text-[#000] opacity-50 placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
            readonly
          />
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Lý do </span>
          <textarea
            id=""
            v-model="paramsUserExplain.reason"
            name=""
            placeholder="Nhập lý do"
            class="font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <slot />
      <button
        type="submit"
        class="border-main bg-main hover:shadow-hoverinset inset-sha relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-75': onSubmitting }"
      >
        <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>xác nhận</div>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
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
  const token = auth.token()
  const session = auth.check()

  const emit = defineEmits(['post-request'])

  const props = defineProps<{
    datatype: any
    propFunction: Function
  }>()

  interface typeParamsUserExplain {
    user_id: string
    user_name: string
    work_date: string
    check_in: string
    check_out: string
    total_hours: string
    reason: string
  }
  const paramsUserExplain = reactive<typeParamsUserExplain>({
    user_id: props.datatype?.user_id || '',
    user_name: props.datatype?.user_name || '',
    work_date: props.datatype?.work_date || '',
    check_in: props.datatype?.check_in || '',
    check_out: props.datatype?.check_out || '',
    total_hours: props.datatype?.total_hours || '',
    reason: props.datatype?.reason || '',
  })
  watch(
    () => props.datatype,
    (newVal) => {
      if (newVal) {
        paramsUserExplain.user_id = newVal.user_id || ''
        paramsUserExplain.user_name = newVal.user_name || ''
        paramsUserExplain.work_date = newVal.work_date || ''
        dateUserExplain.value = newVal.work_date || ''
        paramsUserExplain.check_in = newVal.check_in || ''
        paramsUserExplain.check_out = newVal.check_out || ''
        paramsUserExplain.total_hours = newVal.total_hours || ''
        paramsUserExplain.reason = newVal.reason || ''
      }
    },
    { immediate: true, deep: true }
  )

  const dateUserExplain = ref<any | null>(new Date())
  const updateDates = () => {
    if (dateUserExplain.value) {
      paramsUserExplain.work_date = format(dateUserExplain.value, 'yyyy-MM-dd')
    }
  }
  watch(dateUserExplain, () => {
    if (auth.check()) {
      updateDates()
    }
  })

  const onSubmitting = ref(false)

  const handlePostExplain = async () => {
    try {
      onSubmitting.value = true
      const formData = new FormData()
      formData.append('user_id', paramsUserExplain.user_id)
      formData.append('work_date', paramsUserExplain.work_date)
      formData.append('check_in', paramsUserExplain.check_in)
      formData.append('check_out', paramsUserExplain.check_out)
      formData.append('total_hours', paramsUserExplain.total_hours)
      formData.append('reason', paramsUserExplain.reason)

      const res = await axios.post(`${apiUri}/work/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      emit('post-request', res.data)
      if (res.data.errors) return
      console.log('handlePostExplain ~ res', res.data)
    } catch (error) {
      console.log('handlePostExplain ~ error', error)
    } finally {
      onSubmitting.value = false
    }
  }
</script>

<style lang="scss" scoped></style>
