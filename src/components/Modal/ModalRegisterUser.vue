<template>
  <Modal
    @close="() => emit('toggle-modal')"
    :modalActive="props.modal"
    maxWidth="max-w-[865px]"
  >
    <div class="rounded-[24px] p-1.5 bg-white overflow-hidden">
      <div class="bg-[#fafafa] rounded-[18px_18px_0_0] p-5 pt-8">
        <div class="text-center mb-7">
          <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
            thêm mới người dùng
          </h3>
        </div>

        <div
          class="relative max-w-[112px] max-h-[112px] w-full h-full mx-auto mb-4"
        >
          <div
            class="w-full h-full max-w-full bg-[#E9F0F4] rounded-[24px] overflow-hidden"
          >
            <img
              src="@/assets/images/si_user-fill.svg"
              class="object-cover w-full h-full"
              alt=""
            />
          </div>

          <div class="absolute bottom-0 right-0 z-10">
            <img src="@/assets/images/ic-camera.svg" alt="" />
          </div>
        </div>
      </div>

      <!-- sform register -->
      <form
        class="w-full mx-auto lg:p-[24px_48px] p-[24px_16px]"
        @submit.prevent="handleSubmit()"
      >
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Mã nhân viên
              </span>
              <input
                v-model="paramsUser.code"
                type="text"
                name=""
                id=""
                placeholder="Nhập mã nhân viên"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Họ và tên
              </span>
              <input
                v-model="paramsUser.name"
                type="text"
                name=""
                id=""
                placeholder="Nhập họ tên"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Số điện thoại
              </span>
              <input
                v-model="paramsUser.phone"
                type="text"
                name=""
                id=""
                placeholder="Nhập số điện thoại"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Email
              </span>
              <input
                v-model="paramsUser.email"
                type="text"
                name=""
                id=""
                placeholder="Nhập email"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Ngày tháng năm sinh
              </span>

              <div class="relative">
                <flat-pickr
                  v-model="paramsUser.dob"
                  :config="configFlatpickr"
                  class="form-control w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                  placeholder="Chọn ngày"
                  name="dd/mm/yy"
                />
                <div
                  class="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2"
                >
                  <img
                    src="@/assets/images/cuidaa_calendar-outline.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Nhóm người dùng
              </span>

              <SelectRoot v-model="valueGrPermiss">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectScrollUpButton
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-up" />
                    </SelectScrollUpButton>

                    <SelectViewport>
                      <SelectGroup>
                        <SelectItem
                          v-for="(item, key) in listGrPermiss"
                          :key="key"
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          :value="String(key)"
                        >
                          <SelectItemText>
                            <!-- {{ capitalizeFirstLetter(item) }} -->
                            {{ item.name }}
                          </SelectItemText>
                        </SelectItem>
                      </SelectGroup>
                    </SelectViewport>

                    <SelectScrollDownButton
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-down" />
                    </SelectScrollDownButton>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                CCCD
              </span>

              <input
                v-model="paramsUser.identification"
                type="text"
                name=""
                id=""
                placeholder="Nhập số CCCD"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Ngày cấp
              </span>

              <div class="relative">
                <flat-pickr
                  v-model="paramsUser.date_of_issue"
                  :config="configFlatpickr"
                  class="form-control w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                  placeholder="Chọn ngày"
                  name="dd/mm/yy"
                />
                <div
                  class="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2"
                >
                  <img
                    src="@/assets/images/cuidaa_calendar-outline.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Nơi cấp
              </span>

              <input
                v-model="paramsUser.place_of_issue"
                type="text"
                name=""
                id=""
                placeholder="Nhập nơi cấp"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Quê quán
              </span>

              <input
                v-model="paramsUser.original_place"
                type="text"
                name=""
                id=""
                placeholder="Nhập địa chỉ"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Bộ phận
              </span>

              <MultipleSelect
                :options="optionsGroupUser"
                holder="Chọn bộ phận"
                v-model="valueGroupUser.value2"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Chức vụ
              </span>

              <MultipleSelect
                :options="optionsGroupUser"
                holder="Chọn chức vụ"
                v-model="valueGroupUser.value3"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Địa điểm làm việc
              </span>

              <MultipleSelect
                :options="optionsGroupUser"
                holder="Chọn địa điểm"
                v-model="valueGroupUser.value4"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Quản lý trực tiếp
              </span>

              <MultipleSelect
                :options="optionsGroupUser"
                holder="Chọn quản lý"
                v-model="valueGroupUser.value5"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Địa chỉ thường trú
              </span>

              <input
                v-model="paramsUser.permanent_address"
                type="text"
                name=""
                id=""
                placeholder="Nhập địa chỉ"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Địa chỉ tạm trú
              </span>

              <input
                v-model="paramsUser.residence_address"
                type="text"
                name=""
                id=""
                placeholder="Nhập địa chỉ tạm trú"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Hợp đồng làm việc
              </span>

              <MultipleSelect
                :options="optionsGroupUser"
                holder="Chọn hợp đồng làm việc"
                v-model="valueGroupUser.value6"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Ngày tháng vào làm việc
              </span>

              <div class="relative">
                <flat-pickr
                  v-model="paramsUser.working_day"
                  :config="configFlatpickr"
                  class="form-control w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                  placeholder="Chọn ngày"
                  name="dd/mm/yy"
                />
                <div
                  class="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2"
                >
                  <img
                    src="@/assets/images/cuidaa_calendar-outline.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Số ngày nghỉ còn lại
              </span>
              <input
                v-model="paramsUser.total_days_off"
                type="text"
                name=""
                id=""
                placeholder="Nhập số ngày nghỉ còn lại"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Trạng thái
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex flex-wrap items-stretch justify-center gap-4 mt-10 text-center xl:gap-6"
        >
          <button
            @click="() => emit('toggle-modal')"
            type="button"
            class="max-md:grow inline-block md:min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from '@/components/Modals.vue'
import MultipleSelect from '@/components/MultiSelect.vue'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import 'flatpickr/dist/flatpickr.css'
import { apiClient } from '@/plugins/axios'
import { useAuth } from 'vue-auth3'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue'
import { Icon } from '@iconify/vue'

const auth = useAuth()

const props = defineProps(['modal'])
const emit = defineEmits(['toggle-modal'])

const dateState = ref<Record<string, any>>({
  date1: null,
  date2: null,
  date3: null
})

const configFlatpickr = ref({
  wrap: true, // set wrap to true only when using 'input-group'
  dateFormat: 'd/m/Y',
  locale: Vietnamese // locale for this instance only
})

interface recordSelection {
  [key: string]: any
}

const valueGroupUser = ref<recordSelection>({
  value1: null,
  value2: null,
  value3: null,
  value4: null,
  value5: null,
  value6: null
})
const optionsGroupUser = ref(['Option 1', 'Option 2', 'Option3', 'Option 4'])

const paramsUser = reactive<any>({
  code: '',
  phone: '',
  name: '',
  email: '',
  dob: '',
  per_group_name: '',
  identification: '',
  date_of_issue: '',
  place_of_issue: '',
  original_place: '',
  part_id: '',
  position_id: '',
  region_id: '',
  parent_id: '',
  permanent_address: '',
  residence_address: '',
  work_contract: '',
  working_day: '',
  total_days_off: '',
  status: ''
})

const valueGrPermiss = ref<string>('')
const listGrPermiss = ref<any | null>(null)

const fetchListPermission = async () => {
  try {
    const response = await apiClient.get('/permission/listPermission', {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })

    // refGroupPermission.value = response.data.data

    const { data } = response.data

    console.log('fetchListPermission data:', data)

    const resultObj: any = []
    const listPermission = Object.entries(data).map(([key, value]) => {
      console.log(key, value)
      resultObj.push(value)

      return resultObj
    })
    listGrPermiss.value = resultObj
  } catch (error) {
    console.error('Error fetching permission list:', error)
  }
}

onMounted(() => {
  fetchListPermission()
})

const handleSubmit = async () => {
  const formDataUser = new FormData()
  formDataUser.append('code', paramsUser.code)
  formDataUser.append('phone', paramsUser.phone)
  formDataUser.append('name', paramsUser.name)
  formDataUser.append('email', paramsUser.email)
  formDataUser.append('dob', paramsUser.dob)
  formDataUser.append('per_group_name', paramsUser.per_group_name)
  formDataUser.append('identification', paramsUser.identification)
  formDataUser.append('date_of_issue', paramsUser.date_of_issue)
  formDataUser.append('place_of_issue', paramsUser.place_of_issue)
  formDataUser.append('original_place', paramsUser.original_place)
  formDataUser.append('part_id', paramsUser.part_id)
  formDataUser.append('position_id', paramsUser.position_id)
  formDataUser.append('region_id', paramsUser.region_id)
  formDataUser.append('parent_id', paramsUser.parent_id)
  formDataUser.append('permanent_address', paramsUser.permanent_address)
  formDataUser.append('residence_address', paramsUser.residence_address)
  formDataUser.append('work_contract', paramsUser.work_contract)
  formDataUser.append('working_day', paramsUser.working_day)
  formDataUser.append('total_days_off', paramsUser.total_days_off)
  formDataUser.append('status', paramsUser.status)

  await apiClient.post('/users/create', formDataUser, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth.token()}`
    }
  })
}
</script>

<style lang="scss" scoped></style>
