<template>
  <form @submit.prevent="postAddLeave">
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
            v-model="paramsLeave.reason"
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
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'
import { tableMagic } from '@/utils/main'
import axios from 'axios'
import { useLeaveInfo } from '@/composables/leave-info'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { vi } from 'date-fns/locale/vi'
import { format } from 'date-fns'

const auth = useAuth()

const emit = defineEmits(['post-request'])

defineProps<{
  datatype: any
}>()

const datepicker = ref<any | null>(null)
const initDates = () => {
  const startDate = new Date(new Date().setDate(new Date().getDate() + 1))
  const endDate = new Date(new Date().setDate(startDate.getDate() + 1))
  datepicker.value = [startDate, endDate]
}
const updateDates = () => {
  if (
    datepicker.value &&
    Array.isArray(datepicker.value) &&
    datepicker.value.length === 2
  ) {
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
  reason: null
})

const paginate = reactive({
  page: 1,
  per_page: 20
})
const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataLeave = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...paramsLeave,
      page: paginate.page,
      per_page: paginate.per_page
    }

    doFetch(
      `${apiUri}/leave/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
      auth.token() as string
    ).then(() => {
      // console.log('🚀 ~ fetchDataLeave ~ res:', res)
      tableMagic()
    })
  }, 300)
}

const postRequest = ref<any | null>(null)
const postAddLeave = async () => {
  try {
    const formData = new FormData()
    formData.append('begin_date', paramsLeave.begin_date)
    formData.append('finish_date', paramsLeave.finish_date)
    formData.append('reason', paramsLeave.reason)

    const res = await axios.post(`${apiUri}/leave/create`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    paramsLeave.reason = null
    paramsLeave.begin_date = null
    paramsLeave.finish_date = null
    initDates()
    fetchDataLeave()
    postRequest.value = res.data
    emit('post-request', postRequest.value)
    // console.log('🚀 ~ postAddLeave ~ res:', postRequest.value)
  } catch (error) {
    console.log('🚀 ~ postAddLeave ~ error:', error)
  }
}

const { data, doFetch, categories } = useLeaveInfo()

onMounted(() => {
  if (auth.check()) {
    initDates()
    updateDates()
  }
})
</script>

<style lang="scss"></style>
