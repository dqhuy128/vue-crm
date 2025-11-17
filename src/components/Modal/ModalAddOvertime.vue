<script lang="ts" setup>
  import '@vuepic/vue-datepicker/dist/main.css'

  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
  import { computed, reactive, ref, watch } from 'vue'
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

  const postRequest = ref<any | null>(null)
  const onSubmitting = ref(false)

  const paramsOvertime = reactive({
    date: '',
    begin_time: '',
    finish_time: '',
    name: '',
    type: '',
    reason: '',
  })
  const datepicker = ref<any | null>(null)
  const startDate = new Date(new Date())
  datepicker.value = startDate
  paramsOvertime.date = format(startDate, 'yyyy-MM-dd')
  const updateDates = () => {
    const value = datepicker.value
    if (!value) return
    if (Array.isArray(value)) {
      const first = value[0]
      if (first) paramsOvertime.date = format(first, 'yyyy-MM-dd')
    } else if (value instanceof Date) {
      paramsOvertime.date = format(value, 'yyyy-MM-dd')
    }
  }
  watch(datepicker, () => {
    if (auth.check()) {
      updateDates()
    }
  })

  // Helpers to support min/max-time and validation for time-only pickers
  type TimeObj = { hours: number; minutes: number; seconds?: number }

  const parseTimeStringToObj = (value?: string | null): TimeObj | undefined => {
    if (!value) return undefined
    const [h, m] = value.split(':').map((v) => Number(v))
    if (Number.isNaN(h) || Number.isNaN(m)) return undefined
    return { hours: h, minutes: m }
  }

  const timeStringToMinutes = (value?: string | null): number | undefined => {
    const obj = parseTimeStringToObj(value)
    if (!obj) return undefined
    return obj.hours * 60 + obj.minutes
  }

  const beginTimeObj = computed<TimeObj | undefined>(() => parseTimeStringToObj(paramsOvertime.begin_time))
  const finishTimeObj = computed<TimeObj | undefined>(() => parseTimeStringToObj(paramsOvertime.finish_time))

  // Keep finish_time >= begin_time
  watch(
    () => [paramsOvertime.begin_time, paramsOvertime.finish_time] as const,
    ([begin, finish]) => {
      const b = timeStringToMinutes(begin)
      const f = timeStringToMinutes(finish)
      if (b !== undefined && f !== undefined && f < b) {
        paramsOvertime.finish_time = begin
      }
    }
  )

  const handleCreateOvertime = async () => {
    onSubmitting.value = true
    if (session) {
      const formData = new FormData()
      formData.append('reason', paramsOvertime.reason)
      formData.append('date', paramsOvertime.date)
      formData.append('begin_time', paramsOvertime.begin_time)
      formData.append('finish_time', paramsOvertime.finish_time)

      const res = await axios
        .post(`${apiUri}/orvertime/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.errors.input) {
            const { message } = res.data
            const { input } = res.data.errors
            alert(message + '. ' + input)
            return
          }

          paramsOvertime.reason = ''
          paramsOvertime.begin_time = ''
          paramsOvertime.finish_time = ''
          postRequest.value = res.data
          emit('post-request', postRequest.value)
          props.propFunction()
        })
        .catch((err) => {
          console.log('handleCreateCategory ~ err', err)
        })
        .finally(() => {
          onSubmitting.value = false
        })
    }
  }
</script>

<template>
  <form @submit.prevent="handleCreateOvertime">
    <div class="grid grid-cols-12 gap-6">
      <!-- <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Mã nhân viên
          </span>

          <SelectRoot v-model="paramsOvertime.type">
            <SelectTrigger
              class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] data-[placeholder]:text-[#909090]"
              aria-label="Customise options"
            >
              <SelectValue
                class="font-inter grow text-start text-[16px] leading-normal font-normal"
                placeholder="Chọn mã nhân viên"
              />
              <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                      v-for="(item, key) in datatype"
                      :key="key"
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="item.code"
                    >
                      <SelectItemText>
                        {{ item.code }}
                      </SelectItemText>
                    </SelectItem>
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
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Họ và tên
          </span>

          <input
            id=""
            v-model="paramsOvertime.name"
            type="text"
            name=""
            placeholder="Nhập họ và tên"
            class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
          />
        </div>
      </div> -->

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Ngày
          </span>

          <div
            class="flex-[0_0_calc((100%-16px)/2)] max-lg:w-[calc(50%-4px)] max-lg:flex-[0_0_calc(50%-4px)] max-md:w-[calc(100%)] max-md:flex-[0_0_calc(100%)]"
          >
            <VueDatePicker
              v-model="datepicker"
              class="work-history-datepicker"
              :enable-time-picker="false"
              locale="vi"
              :format-locale="vi"
              cancel-text="Huỷ"
              select-text="Chọn"
              format="dd/MM/yyyy"
              @update:model-value="updateDates"
            />
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Thời gian
          </span>

          <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6">
              <VueDatePicker
                v-model="paramsOvertime.begin_time"
                class="work-history-datepicker timepicker-sm"
                time-picker
                model-type="HH:mm"
                :is-24="true"
                :enable-seconds="false"
                :minutes-increment="5"
                placeholder="Từ"
                auto-apply
                :action-row="{ showNow: false, showPreview: false }"
                :config="{ modeHeight: 160, keepActionRow: false }"
                :max-time="finishTimeObj || undefined"
              />
            </div>
            <div class="col-span-6">
              <!-- :min-time="beginTimeObj || undefined" -->
              <!-- :text-input="true" -->
              <VueDatePicker
                v-model="paramsOvertime.finish_time"
                class="work-history-datepicker timepicker-sm"
                time-picker
                model-type="HH:mm"
                :is-24="true"
                :enable-seconds="false"
                :minutes-increment="5"
                placeholder="Đến"
                auto-apply
                :action-row="{ showNow: false, showPreview: false }"
                :config="{ modeHeight: 160, keepActionRow: false }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Lý do
          </span>

          <textarea
            id=""
            v-model="paramsOvertime.reason"
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
        class="border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase hover:transition max-md:grow md:min-w-[175px]"
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

<style lang="scss" scoped>
  .timepicker-sm {
    --dp-font-size: 14px;
    --dp-input-padding: 6px 10px;
    --dp-menu-min-width: 100px;
    --dp-action-buttons-padding: 6px 8px;
    --dp-cell-padding: 0;
  }

  /* tighten the time columns */
  .timepicker-sm :deep(.dp__time_display) {
    font-size: 13px;
  }
  .timepicker-sm :deep(.dp__time_col) {
    width: 25px;
    padding: 0 !important;
    margin: 0 !important;
    font-size: 18px;
  }

  .timepicker-sm :deep(.dp__overlay) {
    border-radius: 10px;
    height: 100% !important;
  }

  .timepicker-sm :deep(.dp--menu--inner-stretched) {
    padding: 0;
  }
  .timepicker-sm :deep(.dp__menu) {
    padding: 0;
  }
  .timepicker-sm :deep(.dp__selection_preview) {
    display: none;
  }
</style>
