<template>
  <form @submit.prevent="handlePostExplain">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Ngày
          </span>

          <VueDatePicker
            v-model="dateUserExplain"
            :enable-time-picker="false"
            locale="vi"
            :format-locale="vi"
            cancelText="Huỷ"
            selectText="Chọn"
            format="dd/MM/yyyy"
            :max-date="new Date()"
            @update:model-value="updateDates"
            class="opacity-50 pointer-events-none"
          />
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Họ và tên
          </span>

          <input
            v-model="paramsUserExplain.user_name"
            type="text"
            name=""
            id=""
            placeholder="Nhập họ và tên"
            class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75 opacity-50 pointer-events-none"
            readonly
          />
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span
            class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Lý do
          </span>
          <textarea
            v-model="paramsUserExplain.reason"
            name=""
            id=""
            placeholder="Nhập lý do"
            class="w-full border min-h-[120px] border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div
      class="flex flex-wrap items-stretch justify-center gap-4 text-center mt-9 xl:gap-6"
    >
      <slot />
      <button
        type="submit"
        class="max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
      >
        xác nhận
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { vi } from 'date-fns/locale/vi'
import { format } from 'date-fns'

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
  reason: props.datatype?.reason || ''
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

const handlePostExplain = async () => {
  try {
    const formData = new FormData()
    formData.append('user_id', paramsUserExplain.user_id)
    formData.append('work_date', paramsUserExplain.work_date)
    formData.append('check_in', paramsUserExplain.check_in)
    formData.append('check_out', paramsUserExplain.check_out)
    formData.append('total_hours', paramsUserExplain.total_hours)
    formData.append('reason', paramsUserExplain.reason)

    const res = await axios.post(`${apiUri}/work/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    emit('post-request', res.data)
    if (res.data.errors) return
    console.log('handlePostExplain ~ res', res.data)
  } catch (error) {
    console.log('handlePostExplain ~ error', error)
  }
}
</script>

<style lang="scss" scoped></style>
