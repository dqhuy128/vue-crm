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
        @submit.prevent="handleSubmit(onSubmit)"
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
                  v-model="dateState.date1"
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

              <MultipleSelect
                :options="optionsGroupUser"
                holder="Chọn nhóm người dùng"
                v-model="valueGroupUser.value1"
              />
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
                  v-model="dateState.date2"
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
                type="text"
                name=""
                id=""
                placeholder="Nhập địa chỉ tạm trú"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
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

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Ngày tháng vào làm việc
              </span>

              <div class="relative">
                <flat-pickr
                  v-model="dateState.date3"
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
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Số ngày nghỉ còn lại
              </span>
              <input
                type="text"
                name=""
                id=""
                placeholder="Nhập số ngày nghỉ còn lại"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
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
import { ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import 'flatpickr/dist/flatpickr.css'

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
</script>

<style lang="scss" scoped></style>
