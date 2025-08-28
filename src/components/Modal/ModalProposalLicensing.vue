<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"
            >Chế độ cấp phát</span
          >
        </div>

        <SelectRoot v-model="params.regime_id">
          <SelectTrigger
            :class="[
              'flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]',
              { 'is-error': errors.regime_id },
            ]"
            aria-label="Customise options"
          >
            <SelectValue
              class="font-inter grow text-start text-[15px] leading-normal font-normal max-md:text-[14px]"
              placeholder="Chọn chế độ"
            />
            <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
          </SelectTrigger>

          <SelectPortal>
            <SelectContent
              class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
              position="popper"
              :side-offset="5"
            >
              <SelectScrollUpButton
                class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white"
              >
                <Icon icon="radix-icons:chevron-up" />
              </SelectScrollUpButton>

              <SelectViewport>
                <SelectGroup>
                  <SelectItem
                    class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                    value="all"
                  >
                    <SelectItemText> Tất cả chế độ </SelectItemText>
                  </SelectItem>

                  <template v-for="item in Object.keys(RegimeOptions)" :key="item">
                    <SelectItem
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="item"
                    >
                      <SelectItemText> {{ RegimeOptions[item] }} </SelectItemText>
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectViewport>

              <SelectScrollDownButton
                class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white"
              >
                <Icon icon="radix-icons:chevron-down" />
              </SelectScrollDownButton>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
        <p v-if="errors.regime_id" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.regime_id }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"
            >Ngày bắt đầu sử dụng</span
          >

          <VueDatePicker
            v-model="datepicker"
            :class="['work-history-datepicker', { 'is-error': errors.begin_date }]"
            :enable-time-picker="false"
            locale="vi"
            :format-locale="vi"
            cancel-text="Huỷ"
            select-text="Chọn"
            format="dd/MM/yyyy"
            @update:model-value="updateDates"
          />
          <p v-if="errors.begin_date" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
            {{ errors.begin_date }}
          </p>
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"
            >Hình ảnh chứng minh</span
          >

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
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"
            >Lý do</span
          >

          <textarea
            v-model="params.reason"
            placeholder="Nhập nội dung"
            class="font-inter min-h-[40px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
            :class="{ 'is-error': errors.reason }"
          ></textarea>
          <p v-if="errors.reason" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
            {{ errors.reason }}
          </p>
        </div>
      </div>

      <!-- <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">Thời lượng</span>

          <input
            v-model="params.duration"
            type="text"
            placeholder=""
            class="font-inter w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
          />
        </div>
      </div> -->
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <slot />
      <button
        type="submit"
        class="border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-60': !isFormReady }"
      >
        <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>Gửi</div>
      </button>
    </div>

    <Modal :modal-active="modalPreviewActive" max-width="max-w-[1024px]" @close="modalPreviewActive = false">
      <div class="overflow-hidden rounded-[24px] bg-white p-4">
        <img v-if="previewUrl" :src="previewUrl" alt="preview" class="mx-auto max-h-[80vh] w-auto object-contain" />
      </div>
    </Modal>
  </form>
</template>

<script setup lang="ts">
  import '@vuepic/vue-datepicker/dist/main.css'

  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
  import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport,
  } from 'radix-vue'
  import { computed, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Modal from '@/components/Modals.vue'
  import { apiUri } from '@/constants/apiUri'
  import { LeaveTypeOptions, LeaveTypeOptionsKeys, RegimeOptions } from '@/views/Leave/types'

  const auth = useAuth()

  const emit = defineEmits(['post-request-proposal-licensing', 'cancel'])

  const props = defineProps<{
    datatype?: any
    propFunction?: Function
  }>()

  const datepicker = ref<any | null>(null)
  const leaveMode = ref<LeaveTypeOptions>(LeaveTypeOptions.FULL)
  const halfDaySession = ref<LeaveTypeOptions>(LeaveTypeOptions.MORNING)

  const params = reactive<any>({
    reason: '',
    regime_id: '',
    begin_date: '',
    finish_date: '',
    type: LeaveTypeOptions.REGIME,
    duration: '',
  })

  const errors = reactive<Record<string, string>>({})

  const initDates = () => {
    const baseDate = new Date(new Date().setDate(new Date().getDate() + 1))
    datepicker.value = baseDate
  }
  const updateDates = () => {
    const value = datepicker.value
    if (!value) return
    if (value instanceof Date) {
      const dateStr = format(value, 'yyyy/MM/dd')
      params.begin_date = dateStr
      params.finish_date = dateStr
    }
  }
  const updateType = () => {
    let nextType: LeaveTypeOptionsKeys
    switch (leaveMode.value) {
      case LeaveTypeOptions.HALF:
        nextType =
          halfDaySession.value === LeaveTypeOptions.AFTERNOON
            ? LeaveTypeOptionsKeys.AFTERNOON
            : LeaveTypeOptionsKeys.MORNING
        break
      case LeaveTypeOptions.FULL:
        nextType = LeaveTypeOptionsKeys.FULL
        break
      case LeaveTypeOptions.REGIME:
        nextType = LeaveTypeOptionsKeys.REGIME
        break
      default:
        nextType = LeaveTypeOptionsKeys.FULL
    }
    params.type = nextType
  }

  watch(datepicker, () => {
    if (auth.check()) updateDates()
  })
  watch(leaveMode, () => {
    if (!auth.check()) return
    initDates()
    updateDates()
    // Only clear regime when switching away from REGIME and a regime is currently selected
    if (leaveMode.value !== LeaveTypeOptions.REGIME && params.regime_id) {
      params.regime_id = ''
    }
    updateType()
  })

  watch(
    () => params.regime_id,
    (newVal) => {
      if (!auth.check()) return
      // Map special value 'all' to empty once, then exit
      if (newVal === 'all') {
        params.regime_id = ''
        return
      }
      if (newVal) {
        params.type = LeaveTypeOptionsKeys.REGIME
        if (leaveMode.value !== LeaveTypeOptions.REGIME) {
          leaveMode.value = LeaveTypeOptions.REGIME
        }
      } else {
        updateType()
      }
    },
    { flush: 'post' }
  )

  // Image upload/preview (cloned)
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

  const onCancel = () => {
    emit('cancel')
    props?.propFunction && props.propFunction()
  }

  // Non-mutating readiness check for render
  const isFormReady = computed(() => {
    return Boolean(params.regime_id && params.begin_date && String(params.reason || '').trim())
  })

  // Mutating validation only used on submit to populate error messages
  const validateAndSetErrors = (): boolean => {
    Object.keys(errors).forEach((k) => delete (errors as any)[k])
    if (!params.regime_id) errors.regime_id = 'Vui lòng chọn chế độ cấp phát'
    if (!params.begin_date) errors.begin_date = 'Vui lòng chọn ngày bắt đầu sử dụng'
    if (!params.reason?.trim()) errors.reason = 'Vui lòng nhập lý do'
    return Object.keys(errors).length === 0
  }

  const postRequestProposalLicensing = ref<any | null>(null)
  const onSubmitting = ref(false)
  const handleSubmit = async () => {
    if (!validateAndSetErrors()) return
    onSubmitting.value = true
    try {
      const formData = new FormData()
      formData.append('begin_date', params.begin_date)
      formData.append('finish_date', params.finish_date)
      formData.append('reason', params.reason)
      formData.append('type', params.type)
      formData.append('regime_id', params.regime_id)
      formData.append('file', selectedFile.value || '')

      const res = await axios.post(`${apiUri}/leave/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      params.reason = ''
      params.begin_date = ''
      params.finish_date = ''
      params.regime_id = ''
      params.type = LeaveTypeOptions.REGIME
      params.duration = ''
      selectedFile.value = null
      previewUrl.value = ''
      initDates()
      props?.propFunction && props.propFunction()
      postRequestProposalLicensing.value = res.data
      emit('post-request-proposal-licensing', postRequestProposalLicensing.value)
      // console.log('🚀 ~ postAddLeave ~ res:', postRequest.value)
    } catch (error) {
      console.log('🚀 ~ postAddLeave ~ error:', error)
    } finally {
      onSubmitting.value = false
    }
  }

  if (auth.check()) {
    initDates()
    updateDates()
    updateType()
  }
</script>

<style scoped lang="scss">
  .work-history-datepicker {
    display: block;
    width: 100%;

    :deep(.dp__input) {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ededf6;
      background: #fff;
      color: #000;
      font-size: 16px;
      font-weight: 400;
      line-height: normal;
      padding-block: 10px 10px;
      padding-right: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :deep(.dp__input::placeholder) {
      font-style: italic;
    }
  }

  /* Optional error helper in case parent toggles .is-error */
  .is-error {
    border-color: #e61b1b !important;
  }
  .work-history-datepicker.is-error :deep(.dp__input) {
    border-color: #e61b1b !important;
  }
</style>
