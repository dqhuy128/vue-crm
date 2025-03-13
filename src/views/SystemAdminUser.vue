<template>
  <MainLayout>
    <div class="bg-white rounded-[24px] p-2.5">
      <form action="" class="flex flex-wrap items-stretch gap-4">
        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
          </select>
        </div>

        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Chọn nhóm người dùng</option>
            <option value="">Chọn nhóm người dùng</option>
            <option value="">Chọn nhóm người dùng</option>
          </select>
        </div>

        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Chọn bộ phận</option>
            <option value="">Chọn bộ phận</option>
            <option value="">Chọn bộ phận</option>
          </select>
        </div>

        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
          </select>
        </div>

        <button
          type="submit"
          class="inline-flex items-center gap-2 bg-[#013878] rounded-[24px] p-[8px_16px] transition hover:shadow-hoverinset cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.0002 21L16.7002 16.7"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            class="text-white font-inter text=[16px] font-bold leading-normal"
          >
            Tìm kiếm
          </span>
        </button>
      </form>
    </div>

    <div class="flex flex-wrap items-center mb-3 mt-5">
      <div
        class="text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Danh sách người dùng
      </div>

      <div class="ms-auto inline-flex flex-wrap items-center gap-4">
        <button
          type="button"
          id="tableImport"
          class="inline-flex items-end gap-2 rounded-[24px] border border-solid border-[#EDEDF6] p-[7px_24px] bg-white cursor-pointer transition hover:shadow-hoverinset"
        >
          <img src="@/assets/images/bx_import.svg" alt="" />
          <span class="text-[#909090] text-[16px] font-bold leading-normal">
            Import</span
          >
        </button>

        <button
          type="button"
          id="tableExport"
          class="inline-flex items-end gap-2 rounded-[24px] border border-solid border-[#EDEDF6] p-[7px_24px] bg-white cursor-pointer transition hover:shadow-hoverinset"
        >
          <img src="@/assets/images/bx_export.svg" alt="" />
          <span class="text-[#909090] text-[16px] font-bold leading-normal"
            >Export</span
          >
        </button>

        <button
          type="button"
          id="tableAdding"
          class="rounded-[24px] bg-[#1b4dea] inline-flex items-end gap-2 p-[7px_12px] cursor-pointer transition hover:shadow-hoverinset"
          @click="toggleModal('modalNewUser')"
        >
          <img src="@/assets/images/si_add-fill.svg" alt="" />
          <span
            class="text-white font-inter text-[16px] font-bold leading-normal"
          >
            Thêm mới
          </span>
        </button>
      </div>
    </div>

    <Modal
      @close="toggleModal('modalNewUser')"
      :modalActive="true"
      maxWidth="max-w-[865px]"
    >
      <div class="modal-content">
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
                  class="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <div class="absolute right-0 bottom-0 z-10">
                <img src="@/assets/images/ic-camera.svg" alt="" />
              </div>
            </div>
          </div>

          <form action="" class="w-full mx-auto p-[24px_48px]">
            <div class="grid grid-cols-12 gap-6">
              <div class="xl:col-span-4 md:col-span-6 col-span-12">
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

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
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

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
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

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
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

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
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
                      class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    >
                      <img
                        src="@/assets/images/cuidaa_calendar-outline.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                  >
                    Nhóm người dùng
                  </span>
                </div>
              </div>

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
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

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                  >
                    Ngày cấp
                  </span>
                </div>
              </div>

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
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

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
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

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                  >
                    Bộ phận
                  </span>
                </div>
              </div>

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                  >
                    Chức vụ
                  </span>
                </div>
              </div>

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                  >
                    Địa điểm làm việc
                  </span>
                </div>
              </div>

              <div class="xl:col-span-3 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                  >
                    Quản lý trực tiếp
                  </span>
                </div>
              </div>

              <div class="xl:col-span-6 col-span-12">
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

              <div class="xl:col-span-6 col-span-12">
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

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                  >
                    Hợp đồng làm việc
                  </span>
                </div>
              </div>

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
                <div class="block">
                  <span
                    class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                  >
                    Ngày tháng vào làm việc
                  </span>
                </div>
              </div>

              <div class="xl:col-span-4 md:col-span-6 col-span-12">
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
              class="flex items-stretch justify-center gap-6 text-center mt-10"
            >
              <button
                type="submit"
                class="inline-block min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
              >
                Hủy
              </button>
              <button
                type="submit"
                class="inline-block min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </MainLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import MainLayout from "./MainLayout.vue"
import Modal from "@/components/Modals.vue"
import flatPickr from "vue-flatpickr-component"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"
import "flatpickr/dist/flatpickr.css"

const dateState = ref<Record<string, any>>({
  date1: null
})
const configFlatpickr = ref({
  wrap: true, // set wrap to true only when using 'input-group'
  dateFormat: "d/m/Y",
  locale: Vietnamese // locale for this instance only
})

const modalActive = ref<Record<string, boolean>>({
  modalNewUser: false
})

const toggleModal = (modalStateName: any) => {
  modalActive.value[modalStateName] = !modalActive.value[modalStateName]
}
</script>

<style lang="scss" scoped>
.select-block {
  position: relative;

  &::after {
    content: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.96389 10.164C9.04747 10.0804 9.1467 10.0141 9.25591 9.96881C9.36512 9.92356 9.48218 9.90027 9.60039 9.90027C9.71861 9.90027 9.83566 9.92356 9.94487 9.96881C10.0541 10.0141 10.1533 10.0804 10.2369 10.164L11.9999 11.927L13.7639 10.164C13.9338 10.0011 14.1607 9.91123 14.3961 9.91366C14.6314 9.91609 14.8564 10.0106 15.0229 10.177C15.1894 10.3433 15.2841 10.5683 15.2867 10.8036C15.2893 11.039 15.1996 11.266 15.0369 11.436L12.6369 13.836C12.5533 13.9196 12.4541 13.9859 12.3449 14.0311C12.2357 14.0764 12.1186 14.0997 12.0004 14.0997C11.8822 14.0997 11.7651 14.0764 11.6559 14.0311C11.5467 13.9859 11.4475 13.9196 11.3639 13.836L8.96389 11.436C8.79535 11.2672 8.70068 11.0385 8.70068 10.8C8.70068 10.5615 8.79535 10.3327 8.96389 10.164Z" fill="%23464661"/></svg>');
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-40%);
    z-index: 1;
    pointer-events: none;
  }

  select {
    appearance: none;
    width: 100%;
  }
}
</style>

<style lang="scss">
#aTableUserList {
  .ant-pagination {
    justify-content: inherit;

    &-options {
      order: -1 !important;
      margin-left: 0 !important;
    }

    &-prev {
      margin-left: auto;
    }
  }

  .ant-table {
    background: transparent;

    &-thead {
      & > tr:first-child > *:first-child {
        border-start-start-radius: 24px;
      }

      & > tr:first-child > *:last-child {
        border-start-end-radius: 24px;
      }

      .ant-table-cell {
        background: white;

        &::before {
          content: none;
        }
      }
    }

    &-tbody {
      .ant-table-cell {
        background: white;
        border-top: 5px solid #e9f0f4;
        padding-block: 10px;

        &:first-child {
          border-radius: 8px 0 0 8px;
        }

        &:last-child {
          border-radius: 0 8px 8px 0;
        }
      }
    }
  }
}
</style>
