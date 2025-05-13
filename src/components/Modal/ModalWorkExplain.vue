<template>
  <form @submit.prevent="">
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
            v-model="paramsUser.name"
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
            class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Lý do
          </span>
          <textarea
            v-model="paramsUser.reason"
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
      <button
        type="button"
        @click="handlePostApprove(2)"
        class="relative max-md:grow inline-block md:min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
        :class="{ 'opacity-75 pointer-events-none': onSubmitting }"
      >
        <div
          class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          v-if="onSubmitting"
        >
          <Icon
            icon="eos-icons:three-dots-loading"
            class="w-12 h-full aspect-square"
          />
        </div>
        <div v-else>Không duyệt</div>
      </button>
      <button
        type="button"
        @click="handlePostApprove(1)"
        class="relative max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
        :class="{ 'opacity-75 pointer-events-none': onSubmitting }"
      >
        <div
          class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          v-if="onSubmitting"
        >
          <Icon
            icon="eos-icons:three-dots-loading"
            class="w-12 h-full aspect-square"
          />
        </div>
        <div v-else>Duyệt</div>
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
import { Icon } from '@iconify/vue'

const auth = useAuth()
const token = auth.token()
const session = auth.check()

const emit = defineEmits(['post-request'])

const props = defineProps<{
  datatype: any
  propFunction: Function
}>()

interface typeParamsPostExplain {
  id: string
  status: string
}
interface typeParamsUser {
  work_date: string
  name: string
  reason: string
}

const paramsPostExplain = reactive<typeParamsPostExplain>({
  id: props.datatype?.id || '',
  status: ''
})
const paramsUser = reactive<typeParamsUser>({
  work_date: props.datatype?.work_date || '',
  name: props.datatype?.name || '',
  reason: props.datatype?.reason || ''
})
watch(
  () => props.datatype,
  (newVal) => {
    if (newVal) {
      paramsPostExplain.id = newVal.id || ''
      paramsUser.work_date = newVal.work_date || ''
      dateUserExplain.value = newVal.work_date || ''
      paramsUser.name = newVal.name || ''
      paramsUser.reason = newVal.reason || ''
    }
  }
)

const dateUserExplain = ref<any | null>(new Date())
const updateDates = () => {
  if (dateUserExplain.value) {
    paramsUser.work_date = format(dateUserExplain.value, 'yyyy-MM-dd')
  }
}
watch(dateUserExplain, () => {
  if (auth.check()) {
    updateDates()
  }
})

const onSubmitting = ref(false)

const handlePostApprove = async (id: number) => {
  try {
    onSubmitting.value = true
    const formData = new FormData()
    formData.append('id', paramsPostExplain.id)
    formData.append('status', id.toString())

    const res = await axios.post(`${apiUri}/work/status`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('res', res.data)
    if (res.data?.errors) return
    props.propFunction()
    emit('post-request', res.data)
  } catch (error) {
    console.log('handlePostApprove ~ error', error)
  } finally {
    onSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped></style>
