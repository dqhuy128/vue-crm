<template>
  <form @submit.prevent="submitEditLeave">
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
          @update:model-value="updateDates"
        />
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Lý do
          </span>
          <textarea
            id=""
            v-model="paramsLeaveEdit.reason"
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
    reason: '',
  })

  const postRequestEdit = ref<any | null>(null)
  const onSubmitting = ref(false)
  const submitEditLeave = async () => {
    onSubmitting.value = true
    try {
      const formData = new FormData()
      formData.append('id', paramsLeaveEdit.id)
      formData.append('begin_date', paramsLeaveEdit.begin_date)
      formData.append('finish_date', paramsLeaveEdit.finish_date)
      formData.append('reason', paramsLeaveEdit.reason)

      const res = await axios.post(`${apiUri}/leave/update`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
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
    } finally {
      onSubmitting.value = false
    }
  }

  onMounted(() => {
    if (auth.check()) {
      updateDates()
    }
  })
</script>

<style lang="scss"></style>
