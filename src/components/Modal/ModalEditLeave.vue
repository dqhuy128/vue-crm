<template>
  <form @submit.prevent="submitEditLeave">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <span
          class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
        >
          Ngày nghỉ
        </span>
        <!-- multi-calendars -->
        <VueDatePicker
          v-model="datepicker"
          :enable-time-picker="false"
          locale="vi"
          :format-locale="vi"
          cancelText="Huỷ"
          selectText="Chọn"
          range
          format="dd/MM/yyyy"
          :min-date="new Date()"
          @update:model-value="updateDates"
        />
      </div>

      <div class="col-span-12">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Lý do
          </span>
          <textarea
            v-model="paramsLeaveEdit.reason"
            name=""
            id=""
            placeholder="Nhập mô tả"
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
        Lưu
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { vi } from 'date-fns/locale/vi'
import { format } from 'date-fns'

const auth = useAuth()

const emit = defineEmits(['post-request-edit'])

const props = defineProps<{
  datatype: any
  propFunction: Function
}>()

const datepicker = ref<any | null>(null)
const startDate = ref<any | null>(null)
const endDate = ref<any | null>(null)
datepicker.value = [startDate.value, endDate.value]

const updateDates = () => {
  if (datepicker.value) {
    paramsLeaveEdit.begin_date = format(datepicker.value[0], 'yyyy-MM-dd')
    paramsLeaveEdit.finish_date = format(datepicker.value[1], 'yyyy-MM-dd')
    // paramsLeaveEdit.begin_date = startDate
    // paramsLeaveEdit.finish_date = endDate
  }
}
watch(datepicker, () => {
  if (auth.check()) {
    updateDates()
  }
})
watch(
  () => props.datatype,
  (newVal) => {
    const { id } = newVal.data
    const { begin_date } = newVal.data
    const { finish_date } = newVal.data
    const { reason } = newVal.data

    startDate.value = begin_date.toString()
    endDate.value = finish_date.toString()
    datepicker.value = [startDate.value, endDate.value]
    paramsLeaveEdit.id = id.toString()
    paramsLeaveEdit.begin_date = begin_date.toString()
    paramsLeaveEdit.finish_date = finish_date.toString()
    paramsLeaveEdit.reason = reason.toString()
  }
)

const paramsLeaveEdit = reactive<any | null>({
  id: '',
  begin_date: '',
  finish_date: '',
  reason: ''
})

const postRequestEdit = ref<any | null>(null)
const submitEditLeave = async () => {
  try {
    const formData = new FormData()
    formData.append('id', paramsLeaveEdit.id)
    formData.append('begin_date', paramsLeaveEdit.begin_date)
    formData.append('finish_date', paramsLeaveEdit.finish_date)
    formData.append('reason', paramsLeaveEdit.reason)

    const res = await axios.post(`${apiUri}/leave/update`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    datepicker.value = [null, null]
    startDate.value = null
    endDate.value = null
    paramsLeaveEdit.reason = null
    paramsLeaveEdit.begin_date = null
    paramsLeaveEdit.finish_date = null
    props.propFunction()
    postRequestEdit.value = res.data
    emit('post-request-edit', postRequestEdit.value)
    console.log('🚀 ~ postAddLeave ~ res:', postRequestEdit.value)
  } catch (error) {
    console.log('🚀 ~ postAddLeave ~ error:', error)
  }
}

onMounted(() => {
  if (auth.check()) {
    updateDates()
  }
})
</script>

<style lang="scss"></style>
