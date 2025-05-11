<template>
  <form @submit.prevent="handleCreateCategory">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
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
          />
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Họ và tên
          </span>

          <input
            v-model="paramsUserExplain.name"
            type="text"
            name=""
            id=""
            placeholder="Nhập họ và tên"
            class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
          />
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
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
import { reactive, ref, watch } from 'vue'
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
  work_date: string
  name: string
  reason: string
}
const paramsUserExplain = reactive<typeParamsUserExplain>({
  user_id: '',
  work_date: '',
  name: '',
  reason: ''
})

const dateUserExplain = ref<any | null>(new Date())
paramsUserExplain.work_date = format(dateUserExplain.value, 'yyyy-MM-dd')
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

const paramsCreate = reactive({
  type: '',
  name: '',
  description: ''
})
const postRequest = ref<any | null>(null)
const handleCreateCategory = async () => {
  if (session) {
    const formData = new FormData()
    formData.append('name', paramsCreate.name)
    formData.append('type', paramsCreate.type)
    formData.append('description', paramsCreate.description)

    const res = await axios
      .post(`${apiUri}/categories/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data.errors.input) {
          const { message } = res.data
          const { input } = res.data.errors
          alert(message + '. ' + input)
          return
        }
        paramsCreate.name = ''
        paramsCreate.description = ''
        postRequest.value = res.data
        emit('post-request', postRequest.value)
        props.propFunction()
      })
      .catch((err) => {
        console.log('handleCreateCategory ~ err', err)
      })
  }
}
</script>

<style lang="scss" scoped></style>
