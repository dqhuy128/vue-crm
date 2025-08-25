<template>
  <form @submit.prevent="handleCreateLeave">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="h-[38px] rounded-lg px-4 text-[16px] font-bold"
            :class="
              leaveMode === LeaveTypeOptions.HALF
                ? 'bg-main text-white'
                : 'border border-solid border-[#EDEDF6] bg-white text-[#464661]'
            "
            @click="setLeaveMode(LeaveTypeOptions.HALF)"
          >
            Nửa ngày
          </button>

          <button
            type="button"
            class="h-[38px] rounded-lg px-4 text-[16px] font-bold"
            :class="
              leaveMode === LeaveTypeOptions.FULL || leaveMode === LeaveTypeOptions.REGIME
                ? 'bg-main text-white'
                : 'border border-solid border-[#EDEDF6] bg-white text-[#464661]'
            "
            @click="setLeaveMode(LeaveTypeOptions.FULL)"
          >
            Cả ngày
          </button>

          <div v-if="leaveMode === LeaveTypeOptions.HALF" class="ms-auto flex items-center gap-2">
            <button
              type="button"
              class="h-[38px] rounded-lg px-3 text-[16px] font-bold"
              :class="
                halfDaySession === LeaveTypeOptions.MORNING
                  ? 'bg-main text-white'
                  : 'border border-solid border-[#EDEDF6] bg-white text-[#909090]'
              "
              @click="halfDaySession = LeaveTypeOptions.MORNING"
            >
              Sáng
            </button>
            <button
              type="button"
              class="h-[38px] rounded-lg px-3 text-[16px] font-bold"
              :class="
                halfDaySession === LeaveTypeOptions.AFTERNOON
                  ? 'bg-main text-white'
                  : 'border border-solid border-[#EDEDF6] bg-white text-[#909090]'
              "
              @click="halfDaySession = LeaveTypeOptions.AFTERNOON"
            >
              Chiều
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Chế độ
          </span>
        </div>

        <SelectRoot v-model="paramsLeaveUpdate.regime_id">
          <SelectTrigger
            class="flex w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Ngày nghỉ
          </span>

          <VueDatePicker
            v-model="datepicker"
            class="work-history-datepicker"
            :enable-time-picker="false"
            :range="leaveMode === LeaveTypeOptions.FULL || leaveMode === LeaveTypeOptions.REGIME"
            locale="vi"
            :format-locale="vi"
            cancel-text="Huỷ"
            select-text="Chọn"
            format="dd/MM/yyyy"
            :max-range="leaveMode === LeaveTypeOptions.FULL || leaveMode === LeaveTypeOptions.REGIME ? 1 : undefined"
            @update:model-value="updateDates"
          />

          <div v-if="leaveMode === LeaveTypeOptions.HALF" class="mt-2 text-[14px] text-[#909090] italic">
            {{ halfDayPreview }}
          </div>
          <div v-else-if="leaveMode === LeaveTypeOptions.FULL" class="mt-2 text-[14px] text-[#909090] italic">
            {{ fullDayPreview }}
          </div>
          <div v-else class="mt-2 text-[14px] text-[#909090] italic">
            {{ regimeDayPreview }}
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Lý do
          </span>

          <textarea
            v-model="paramsLeaveUpdate.reason"
            placeholder="Nhập nội dung"
            class="font-inter min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
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
        <div v-else>Lưu</div>
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
  import { computed, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import { apiUri } from '@/constants/apiUri'
  import { LeaveTypeOptions, LeaveTypeOptionsKeys, RegimeOptions } from '@/views/Leave/types'

  const auth = useAuth()

  const emit = defineEmits(['post-request-edit'])

  const props = defineProps<{
    datatype: any
    propFunction: Function
  }>()

  const datepicker = ref<any | null>(null)
  const leaveMode = ref<LeaveTypeOptions>(LeaveTypeOptions.HALF)
  const halfDaySession = ref<LeaveTypeOptions>(LeaveTypeOptions.MORNING)

  const setLeaveMode = (mode: LeaveTypeOptions) => {
    if (leaveMode.value === mode) return
    leaveMode.value = mode
    initDates()
    updateDates()
    updateType()
  }

  const initDates = () => {
    const baseDate = new Date(new Date().setDate(new Date().getDate() + 1))
    if (leaveMode.value === LeaveTypeOptions.FULL || leaveMode.value === LeaveTypeOptions.REGIME) {
      const endDate = new Date(new Date(baseDate).setDate(baseDate.getDate() + 1))
      datepicker.value = [baseDate, endDate]
    } else {
      datepicker.value = baseDate
    }
  }
  const updateDates = () => {
    const value = datepicker.value
    if (!value) return
    if (Array.isArray(value)) {
      if (value.length >= 1 && value[0]) paramsLeaveUpdate.begin_date = format(value[0], 'yyyy/MM/dd')
      if (value.length >= 2 && value[1]) paramsLeaveUpdate.finish_date = format(value[1], 'yyyy/MM/dd')
    } else if (value instanceof Date) {
      const dateStr = format(value, 'yyyy/MM/dd')
      paramsLeaveUpdate.begin_date = dateStr
      paramsLeaveUpdate.finish_date = dateStr
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
    paramsLeaveUpdate.type = nextType
  }
  watch(datepicker, () => {
    if (auth.check()) {
      updateDates()
    }
  })
  watch(leaveMode, () => {
    if (auth.check()) {
      initDates()
      updateDates()

      if (paramsLeaveUpdate.regime_id) {
        paramsLeaveUpdate.type = LeaveTypeOptionsKeys.REGIME
      } else {
        paramsLeaveUpdate.regime_id = ''
        updateType()
      }
    }
  })
  watch(halfDaySession, () => {
    if (auth.check()) {
      if (paramsLeaveUpdate.regime_id) {
        paramsLeaveUpdate.type = LeaveTypeOptionsKeys.REGIME
      } else {
        paramsLeaveUpdate.regime_id = ''
        updateType()
      }
    }
  })

  const paramsLeaveUpdate = reactive<any | null>({
    id: '',
    type: LeaveTypeOptions.MORNING,
    regime_id: '',
    begin_date: '',
    finish_date: '',
    reason: '',
  })

  const halfDayPreview = computed(() => {
    const value = datepicker.value
    if (!value) return ''
    let dateStr = ''
    if (Array.isArray(value)) {
      if (value[0]) dateStr = format(value[0], 'dd/MM/yyyy')
    } else if (value instanceof Date) {
      dateStr = format(value, 'dd/MM/yyyy')
    }
    const label = halfDaySession.value === LeaveTypeOptions.MORNING ? 'Từ 08h00 đến 12h00' : 'Từ 13h30 đến hết 17h30'
    return dateStr ? `Thời gian nghỉ: ${label} ngày ${dateStr}` : ''
  })

  const fullDayPreview = computed(() => {
    const value = datepicker.value
    if (!value) return ''
    if (Array.isArray(value)) {
      const from = value[0] ? format(value[0], 'dd/MM/yyyy') : ''
      const to = value[1] ? format(value[1], 'dd/MM/yyyy') : from
      if (from) return `Thời gian nghỉ: Từ ngày ${from} đến hết ngày ${to}`
    } else if (value instanceof Date) {
      const d = format(value, 'dd/MM/yyyy')
      return `Thời gian nghỉ: Từ ngày ${d} đến hết ngày ${d}`
    }
    return ''
  })

  const regimeDayPreview = computed(() => {
    const value = datepicker.value
    if (!value) return ''
    if (Array.isArray(value)) {
      const from = value[0] ? format(value[0], 'dd/MM/yyyy') : ''
      const to = value[1] ? format(value[1], 'dd/MM/yyyy') : from
      if (from) return `Thời gian nghỉ: Từ ngày ${from} đến hết ngày ${to}`
    } else if (value instanceof Date) {
      const d = format(value, 'dd/MM/yyyy')
      return `Thời gian nghỉ: Từ ngày ${d} đến hết ngày ${d}`
    }
    return ''
  })

  const postRequestEdit = ref<any | null>(null)
  const onSubmitting = ref(false)

  const handleCreateLeave = async () => {
    onSubmitting.value = true
    try {
      const formData = new FormData()
      formData.append('id', paramsLeaveUpdate.id)
      formData.append('begin_date', paramsLeaveUpdate.begin_date)
      formData.append('finish_date', paramsLeaveUpdate.finish_date)
      formData.append('reason', paramsLeaveUpdate.reason)
      formData.append('type', paramsLeaveUpdate.type)
      formData.append('regime_id', paramsLeaveUpdate.regime_id)

      const res = await axios.post(`${apiUri}/leave/update`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      paramsLeaveUpdate.reason = null
      paramsLeaveUpdate.begin_date = null
      paramsLeaveUpdate.finish_date = null
      initDates()
      props.propFunction()
      postRequestEdit.value = res.data
      emit('post-request-edit', postRequestEdit.value)
      // console.log('🚀 ~ postAddLeave ~ res:', postRequest.value)
    } catch (error) {
      console.log('🚀 ~ postAddLeave ~ error:', error)
    } finally {
      onSubmitting.value = false
    }
  }

  watch(
    () => paramsLeaveUpdate.regime_id,
    () => {
      if (auth.check()) {
        if (paramsLeaveUpdate.regime_id) {
          paramsLeaveUpdate.type = LeaveTypeOptionsKeys.REGIME
        } else {
          paramsLeaveUpdate.regime_id = ''
          updateType()
        }

        if (paramsLeaveUpdate.regime_id === 'all') {
          paramsLeaveUpdate.regime_id = ''
        }
      }
    },
    { immediate: true }
  )

  watch(
    () => props.datatype,
    (val) => {
      if (!val) return
      paramsLeaveUpdate.id = val.id
      paramsLeaveUpdate.regime_id = val.regime_id || ''
      paramsLeaveUpdate.type = val.type
      paramsLeaveUpdate.begin_date = val.begin_date
      paramsLeaveUpdate.finish_date = val.finish_date
      paramsLeaveUpdate.reason = val.reason || ''

      switch (val.type) {
        case LeaveTypeOptionsKeys.MORNING:
          leaveMode.value = LeaveTypeOptions.HALF
          halfDaySession.value = LeaveTypeOptions.MORNING
          datepicker.value = new Date(val.begin_date)
          break
        case LeaveTypeOptionsKeys.AFTERNOON:
          leaveMode.value = LeaveTypeOptions.HALF
          halfDaySession.value = LeaveTypeOptions.AFTERNOON
          datepicker.value = new Date(val.begin_date)
          break
        case LeaveTypeOptionsKeys.FULL:
          leaveMode.value = LeaveTypeOptions.FULL
          datepicker.value = [new Date(val.begin_date), new Date(val.finish_date || val.begin_date)]
          break
        case LeaveTypeOptionsKeys.REGIME:
          leaveMode.value = LeaveTypeOptions.REGIME
          datepicker.value = [new Date(val.begin_date), new Date(val.finish_date || val.begin_date)]
          break
        default:
          leaveMode.value = LeaveTypeOptions.FULL
          datepicker.value = [new Date(val.begin_date), new Date(val.finish_date || val.begin_date)]
      }
    },
    { immediate: true, deep: true }
  )

  onMounted(() => {
    if (auth.check()) {
      initDates()
      updateDates()
      updateType()
      if (paramsLeaveUpdate.regime_id) {
        paramsLeaveUpdate.type = LeaveTypeOptionsKeys.REGIME
      }
    }
  })
</script>

<style lang="scss"></style>
