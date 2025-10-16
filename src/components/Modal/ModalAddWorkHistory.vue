<template>
  <form @submit.prevent="handlePostExplain">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"
            >Mã nhân viên
          </span>

          <input
            id=""
            v-model="paramsUserExplain.user_code"
            type="text"
            name=""
            placeholder="Nhập mã nhân viên"
            class="font-inter focus:border-main pointer-events-none w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
            readonly
          />
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Họ và tên </span>

          <input
            id=""
            v-model="paramsUserExplain.name"
            type="text"
            name=""
            placeholder="Nhập họ và tên"
            class="font-inter focus:border-main pointer-events-none w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
            readonly
          />
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Ngày giải trình
          </span>

          <VueDatePicker
            v-model="dateUserExplain"
            :enable-time-picker="false"
            locale="vi"
            :format-locale="vi"
            cancel-text="Huỷ"
            select-text="Chọn"
            format="dd/MM/yyyy"
            input-class-name="font-inter focus:border-main pointer-events-none w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
            :max-date="new Date()"
            class="pointer-events-none"
            @update:model-value="updateDates"
          />
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Hình ảnh kèm theo
          </span>

          <div class="flex items-center gap-3">
            <div class="relative grow">
              <input
                type="text"
                :value="fileInputText"
                placeholder="Đính kèm hình ảnh"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
                readonly
              />
              <button
                type="button"
                class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                @click="triggerFileInput"
              >
                <Icon icon="material-symbols:upload" class="h-5.5 w-5.5 text-[#464661]" />
              </button>
              <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
            </div>

            <button
              type="button"
              class="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[8px] bg-[#1B4DEA]"
              :class="{ 'pointer-events-none opacity-60': !previewUrl }"
              @click="openPreview"
            >
              <Icon icon="iconamoon:eye-bold" class="h-5 w-5 text-white" />
            </button>
          </div>
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

  <Modal :modal-active="modalPreviewActive" max-width="max-w-[1024px]" @close="modalPreviewActive = false">
    <div class="overflow-hidden rounded-[24px] bg-white p-4">
      <img v-if="previewUrl" :src="previewUrl" alt="preview" class="mx-auto max-h-[80vh] w-auto object-contain" />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import '@vuepic/vue-datepicker/dist/main.css'

  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
  import { computed, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Modal from '@/components/Modals.vue'
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
    id: string
    timekeeping_id: string
    user_id: string
    user_code: string
    name: string
    work_date: string
    check_in: string
    check_out: string
    total_hours: string
    reason: string
  }
  const paramsUserExplain = reactive<typeParamsUserExplain>({
    id: props.datatype?.id || '',
    timekeeping_id: props.datatype?.id || '',
    user_id: props.datatype?.user_id || '',
    user_code: props.datatype?.user_code || '',
    name: props.datatype?.name || '',
    work_date: props.datatype?.work_date || '',
    check_in: props.datatype?.check_in || '',
    check_out: props.datatype?.check_out || '',
    total_hours: props.datatype?.total_hours || '',
    reason: props.datatype?.reason || '',
  })
  watch(
    () => props.datatype,
    (newVal) => {
      console.log('🚀 ~ ModalAddWorkHistory.vue ~ newVal:', newVal)
      if (newVal) {
        paramsUserExplain.id = newVal.id || ''
        paramsUserExplain.timekeeping_id = newVal.id || ''
        paramsUserExplain.user_id = newVal.user_id || ''
        paramsUserExplain.user_code = newVal.user_code || ''
        paramsUserExplain.name = newVal.name || ''
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

  // Image upload/preview
  const fileInputRef = ref<HTMLInputElement | null>(null)
  const selectedFile = ref<File | null>(null)
  const previewUrl = ref<string>('')
  const modalPreviewActive = ref(false)

  const triggerFileInput = () => fileInputRef.value?.click()
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files && target.files[0]
    selectedFile.value = file || null
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = file ? URL.createObjectURL(file) : ''
  }
  const openPreview = () => {
    if (previewUrl.value) modalPreviewActive.value = true
  }
  const fileInputText = computed(() => selectedFile.value?.name || '')

  const handlePostExplain = async () => {
    try {
      onSubmitting.value = true
      const formData = new FormData()
      formData.append('timekeeping_id', paramsUserExplain.timekeeping_id)
      formData.append('reason', paramsUserExplain.reason)
      formData.append('work_date', paramsUserExplain.work_date)
      const fileToUpload = selectedFile.value
      if (fileToUpload) {
        formData.append('file', fileToUpload)
      }

      const res = await axios.post(`${apiUri}/work/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
