<template>
  <form @submit.prevent="">
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
            @update:model-value="updateDates"
          />
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Họ và tên </span>

          <input
            id=""
            v-model="paramsUser.name"
            type="text"
            name=""
            placeholder="Nhập họ và tên"
            class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
          />
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Lý do </span>
          <textarea
            id=""
            v-model="paramsUser.reason"
            name=""
            placeholder="Nhập lý do"
            class="font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <button
        type="button"
        class="hover:shadow-hoverinset inset-sha relative inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-75': onSubmitting }"
        @click="handlePostApprove(2)"
      >
        <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>Không duyệt</div>
      </button>
      <button
        type="button"
        class="border-main bg-main hover:shadow-hoverinset inset-sha relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-75': onSubmitting }"
        @click="handlePostApprove(1)"
      >
        <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>Duyệt</div>
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
    status: '',
  })
  const paramsUser = reactive<typeParamsUser>({
    work_date: props.datatype?.work_date || '',
    name: props.datatype?.name || '',
    reason: props.datatype?.reason || '',
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
          Authorization: `Bearer ${token}`,
        },
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
