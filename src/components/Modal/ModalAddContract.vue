<template>
  <form action="" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title required">Mã nhân viên</div>

        <SearchableSelect
          v-model="params.user_id"
          :options="userOptions"
          placeholder="Chọn mã nhân viên"
          search-placeholder="Tìm kiếm nhân viên..."
          :class="{ 'is-error': errors.user_id }"
        />

        <p v-if="errors.user_id" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">{{ errors.user_id }}</p>
      </div>

      <!-- <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title required">Họ và tên</div>

        <div class="form-holder">
          <input
            v-model="params.name"
            class="form-input"
            type="text"
            placeholder="Nhập họ và tên"
            :class="{ 'is-error': errors.name }"
          />
        </div>
        <p v-if="errors.name" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">{{ errors.name }}</p>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title">Ngày sinh</div>
        <VueDatePicker
          v-model="birthdayPicker"
          :class="['work-history-datepicker', { 'is-error': errors.birthday }]"
          :enable-time-picker="false"
          locale="vi"
          :format-locale="vi"
          cancel-text="Huỷ"
          select-text="Chọn"
          format="dd/MM/yyyy"
          :max-date="new Date()"
          placeholder="Chọn ngày sinh"
        />
        <p v-if="errors.birthday" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">{{ errors.birthday }}</p>
      </div> -->

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title">Mức lương</div>

        <div class="form-holder">
          <input
            :value="formatNumber(params.salary || '')"
            class="form-input"
            type="text"
            inputmode="numeric"
            placeholder="Nhập mức lương"
            :class="{ 'is-error': errors.salary }"
            @input="onSalaryInput"
          />
        </div>
        <p v-if="errors.salary" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">{{ errors.salary }}</p>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title">Lương thử việc</div>

        <div class="form-holder">
          <input
            :value="formatNumber(params.probationary_salary || '')"
            class="form-input"
            type="text"
            inputmode="numeric"
            placeholder="Nhập lương thử việc"
            :class="{ 'is-error': errors.probationary_salary }"
            @input="onProbationSalaryInput"
          />
        </div>
        <p v-if="errors.probationary_salary" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.probationary_salary }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="form-title">Tỷ lệ thử việc</div>

        <div class="form-holder">
          <input
            v-model="params.probationary_rate"
            class="form-input"
            type="number"
            placeholder="Nhập %"
            :class="{ 'is-error': errors.probationary_rate }"
          />
        </div>
        <p v-if="errors.probationary_rate" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.probationary_rate }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="form-title required">Tên hợp đồng</div>

        <SelectRoot v-model="params.contract_name">
          <SelectTrigger
            class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
            aria-label="Customise options"
            :class="{ 'is-error': errors.contract_name }"
          >
            <SelectValue
              class="font-inter grow text-start text-[15px] leading-normal font-normal max-md:text-[14px]"
              placeholder="Chọn tên hợp đồng"
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
                    <SelectItemText> Tất cả tên hợp đồng </SelectItemText>
                  </SelectItem>

                  <template v-for="item in Object.entries(ContractName)" :key="item">
                    <SelectItem
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="item[0]"
                    >
                      <SelectItemText> {{ item[1] }} </SelectItemText>
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
        <p v-if="errors.contract_name" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.contract_name }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="form-title required">Loại hợp đồng</div>

        <SelectRoot v-model="params.contract_type">
          <SelectTrigger
            class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
            aria-label="Customise options"
            :class="{ 'is-error': errors.contract_type }"
          >
            <SelectValue
              class="font-inter grow text-start text-[15px] leading-normal font-normal max-md:text-[14px]"
              placeholder="Chọn loại hợp đồng"
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
                    <SelectItemText> Tất cả loại hợp đồng </SelectItemText>
                  </SelectItem>

                  <template v-for="item in Object.entries(ContractType)" :key="item">
                    <SelectItem
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="item[0]"
                    >
                      <SelectItemText> {{ item[1] }} </SelectItemText>
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
        <p v-if="errors.contract_type" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.contract_type }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="form-title required">Thời hạn hợp đồng</div>

        <SelectRoot v-model="params.contract_term">
          <SelectTrigger
            class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
            aria-label="Customise options"
            :class="{ 'is-error': errors.contract_term }"
          >
            <SelectValue
              class="font-inter grow text-start text-[15px] leading-normal font-normal max-md:text-[14px]"
              placeholder="Chọn thời hạn hợp đồng"
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
                    <SelectItemText> Tất cả thời hạn hợp đồng </SelectItemText>
                  </SelectItem>

                  <template v-for="item in Object.entries(ContractTerm)" :key="item[0]">
                    <SelectItem
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="item[0]"
                    >
                      <SelectItemText> {{ item[1] }} </SelectItemText>
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
        <p v-if="errors.contract_term" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">
          {{ errors.contract_term }}
        </p>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title">Ngày gia nhập</div>
        <VueDatePicker
          v-model="joinDatepicker"
          :class="['work-history-datepicker', { 'is-error': errors.join_date }]"
          :enable-time-picker="false"
          locale="vi"
          :format-locale="vi"
          cancel-text="Huỷ"
          select-text="Chọn"
          format="dd/MM/yyyy"
          placeholder="Chọn ngày gia nhập"
        />
        <p v-if="errors.join_date" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">{{ errors.join_date }}</p>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title">Ngày bắt đầu ký HĐ</div>
        <VueDatePicker
          v-model="beginDatepicker"
          :class="['work-history-datepicker', { 'is-error': errors.begin_date }]"
          :enable-time-picker="false"
          locale="vi"
          :format-locale="vi"
          cancel-text="Huỷ"
          select-text="Chọn"
          format="dd/MM/yyyy"
          placeholder="Chọn ngày bắt đầu ký HĐ"
        />
        <p v-if="errors.begin_date" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">{{ errors.begin_date }}</p>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="form-title">Ngày kết thúc HĐ</div>
        <VueDatePicker
          v-model="finishDatepicker"
          :class="['work-history-datepicker', { 'is-error': errors.finish_date }]"
          :enable-time-picker="false"
          :min-date="beginDatepicker || undefined"
          locale="vi"
          :format-locale="vi"
          cancel-text="Huỷ"
          select-text="Chọn"
          format="dd/MM/yyyy"
          placeholder="Chọn ngày kết thúc HĐ"
        />
        <p v-if="errors.finish_date" class="mt-1 text-[13px] leading-normal text-[#E61B1B]">{{ errors.finish_date }}</p>
      </div>
    </div>

    <div class="mt-12 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <slot />
      <button
        type="submit"
        class="border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-75': isSubmitting }"
      >
        <div v-if="isSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>xác nhận</div>
      </button>
    </div>
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

  import SearchableSelect from '@/components/SearchableSelect.vue'
  import { apiUri } from '@/constants/apiUri'
  import { ContractName, ContractTerm, ContractType } from '@/types/type'
  import { formatNumber, tableMagic, unformatNumber } from '@/utils/main'

  interface ParamContractPayload {
    user_id: string
    salary?: string
    probationary_salary?: string
    probationary_rate?: string
    contract_name?: string
    contract_type?: string
    contract_term?: string
    name?: string
    birthday?: string
    join_date?: Date | string
    begin_date?: Date | string
    finish_date?: Date | string
  }

  const auth = useAuth()

  const params: ParamContractPayload = reactive({
    user_id: '',
    salary: '',
    probationary_salary: '',
    probationary_rate: '',
    contract_name: '',
    contract_type: '',
    contract_term: '',
    name: '',
    birthday: '',
    join_date: '',
    begin_date: '',
    finish_date: '',
  })

  const emit = defineEmits(['post-request'])
  const props = defineProps<{
    propFunction: () => void
    isOpen?: boolean
    isRefetchList?: () => void
  }>()

  const isSubmitting = ref(false)

  interface FormErrors {
    user_id: string
    name?: string
    birthday?: string
    salary?: string
    probationary_salary?: string
    probationary_rate?: string
    contract_name?: string
    contract_type?: string
    contract_term?: string
    begin_date?: string
    finish_date?: string
    join_date?: string
  }

  const errors: FormErrors = reactive({
    user_id: '',
  })

  const dataUserID = ref<any>({})

  // Convert dataUserID.items to format expected by SearchableSelect
  const userOptions = computed(() => {
    if (!dataUserID.value?.items) return null

    // Flatten the nested arrays and create a single group
    const allUsers = dataUserID.value.items.flat()
    return {
      users: allUsers,
    }
  })

  const fetchUserID = async () => {
    try {
      const { data } = await axios.post(
        `${apiUri}/user/list`,
        {},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token()}`,
          },
        }
      )

      console.warn('fetchUserID data:', data)
      dataUserID.value = data.data
    } catch (error) {
      console.error('fetchUserID error:', error)
    }
  }

  watch(
    () => props.isOpen,
    (val) => {
      if (val) fetchUserID()
    }
  )

  // Datepickers for begin and finish dates
  const beginDatepicker = ref<Date | null>(null)
  const finishDatepicker = ref<Date | null>(null)
  const birthdayPicker = ref<Date | null>(null)
  const joinDatepicker = ref<Date | null>(null)
  // Keep params in sync with pickers
  watch(beginDatepicker, (val) => {
    if (val instanceof Date) {
      params.begin_date = format(val, 'yyyy-MM-dd')
      // If finish is before begin, clear finish
      if (finishDatepicker.value && finishDatepicker.value < val) {
        finishDatepicker.value = val
      }
    } else {
      params.begin_date = ''
    }
  })

  watch(finishDatepicker, (val) => {
    if (val instanceof Date) {
      params.finish_date = format(val, 'yyyy-MM-dd')
    } else {
      params.finish_date = ''
    }
  })

  watch(birthdayPicker, (val) => {
    if (val instanceof Date) {
      params.birthday = format(val, 'yyyy-MM-dd')
    } else {
      params.birthday = ''
    }
  })

  watch(joinDatepicker, (val) => {
    if (val instanceof Date) {
      params.join_date = format(val, 'yyyy-MM-dd')
    } else {
      params.join_date = ''
    }
  })

  // Handlers to keep numeric model while formatting the input display
  const onSalaryInput = (e: Event) => {
    const el = e.target as HTMLInputElement
    const raw = unformatNumber(el.value)
    params.salary = raw
    el.value = formatNumber(raw)
  }

  const onProbationSalaryInput = (e: Event) => {
    const el = e.target as HTMLInputElement
    const raw = unformatNumber(el.value)
    params.probationary_salary = raw
    el.value = formatNumber(raw)
  }

  const isPositiveNumberString = (value: string): boolean => {
    if (value === undefined || value === null) return false
    const trimmed = String(value).trim()
    if (!trimmed) return false
    const num = Number(trimmed.replace(/[,\s]/g, ''))
    return Number.isFinite(num) && num >= 0
  }

  const validate = (): boolean => {
    // Clear previous errors
    errors.user_id = ''
    errors.name = ''
    errors.birthday = ''
    errors.salary = ''
    errors.probationary_salary = ''
    errors.probationary_rate = ''
    errors.contract_name = ''
    errors.contract_type = ''
    errors.contract_term = ''
    errors.begin_date = ''
    errors.finish_date = ''
    errors.join_date = ''

    // Required fields
    if (!params.user_id.trim()) errors.user_id = 'Vui lòng nhập mã nhân viên'
    if (!params.contract_name) errors.contract_name = 'Vui lòng chọn tên hợp đồng'
    if (!params.contract_type) errors.contract_type = 'Vui lòng chọn loại hợp đồng'
    if (!params.contract_term) errors.contract_term = 'Vui lòng chọn thời hạn hợp đồng'
    // if (!params.begin_date) errors.begin_date = 'Vui lòng chọn ngày bắt đầu ký HĐ'
    // if (!params.finish_date) errors.finish_date = 'Vui lòng chọn ngày kết thúc HĐ'

    // // Logical date check
    // if (params.begin_date && params.finish_date) {
    //   const b = new Date(params.begin_date as string)
    //   const f = new Date(params.finish_date as string)
    //   if (f < b) {
    //     errors.finish_date = 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu'
    //   }
    // }

    // Numeric validations (optional fields)
    if (params.salary && !isPositiveNumberString(params.salary)) {
      errors.salary = 'Mức lương phải là số hợp lệ'
    }
    if (params.probationary_salary && !isPositiveNumberString(params.probationary_salary)) {
      errors.probationary_salary = 'Lương thử việc phải là số hợp lệ'
    }
    if (params.probationary_rate) {
      const rate = Number(String(params.probationary_rate).trim())
      if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
        errors.probationary_rate = 'Tỷ lệ thử việc phải là số trong khoảng 0-100'
      }
    }

    return !Object.values(errors).some((error) => error !== '')
  }

  // Clear a field's error when it becomes valid
  watch(
    () => ({ ...params }),
    (val) => {
      if (val.user_id && errors.user_id) errors.user_id = ''
      if (val.contract_name && errors.contract_name) errors.contract_name = ''
      if (val.contract_type && errors.contract_type) errors.contract_type = ''
      if (val.contract_term && errors.contract_term) errors.contract_term = ''
      if (val.begin_date && errors.begin_date) errors.begin_date = ''
      if (val.finish_date && errors.finish_date) errors.finish_date = ''
      if (val.salary && errors.salary && isPositiveNumberString(val.salary)) errors.salary = ''
      if (val.probationary_salary && errors.probationary_salary && isPositiveNumberString(val.probationary_salary))
        errors.probationary_salary = ''
      if (
        val.probationary_rate &&
        errors.probationary_rate &&
        Number.isFinite(Number(val.probationary_rate)) &&
        Number(val.probationary_rate) >= 0 &&
        Number(val.probationary_rate) <= 100
      )
        errors.probationary_rate = ''
    },
    { deep: true }
  )

  const handleSubmit = async () => {
    if (isSubmitting.value) return
    const ok = validate()
    if (!ok) return

    try {
      isSubmitting.value = true
      const formData = new FormData()

      for (const key in params) {
        if (params[key as keyof ParamContractPayload] !== undefined) {
          formData.append(key, params[key as keyof ParamContractPayload] as string)
        }
      }

      const response = await axios.post(`${apiUri}/contract/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      props.propFunction && props.propFunction()
      emit('post-request', response)
      tableMagic()
      props.isRefetchList && props.isRefetchList()
    } catch (error) {
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped lang="scss">
  .form-title {
    color: #464661;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 8px;

    .required {
      position: relative;

      &::after {
        content: '*';
        display: inline-block;
        color: #e61b1b;
        margin-left: 4px;
      }
    }
  }

  .form-holder {
    & > * {
      display: block;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ededf6;
      background: #fff;
      padding: 10px;
      color: #000;
      font-size: 16px;
      font-weight: 400;
      line-height: normal;

      &::placeholder {
        font-style: italic;
      }
    }
  }

  // Match VueDatePicker to input styles above
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

  /* Error styles */
  .is-error {
    border-color: #e61b1b !important;
  }
  .work-history-datepicker.is-error :deep(.dp__input) {
    border-color: #e61b1b !important;
  }
</style>
