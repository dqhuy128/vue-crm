<template>
  <MainLayout>
    <div class="bg-white rounded-[24px] p-2.5">
      <form action="" class="flex flex-wrap items-stretch gap-4">
        <div class="select-block grow max-lg:flex-[100%]">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal"
          >
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
          </select>
        </div>

        <div class="select-block grow max-lg:flex-[100%]">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal"
          >
            <option value="">Chọn nhóm người dùng</option>
            <option value="">Chọn nhóm người dùng</option>
            <option value="">Chọn nhóm người dùng</option>
          </select>
        </div>

        <div class="select-block grow max-lg:flex-[100%]">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal"
          >
            <option value="">Chọn bộ phận</option>
            <option value="">Chọn bộ phận</option>
            <option value="">Chọn bộ phận</option>
          </select>
        </div>

        <div class="select-block grow max-lg:flex-[100%]">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal"
          >
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
          </select>
        </div>

        <button
          type="submit"
          class="inline-flex items-center justify-center max-md:flex-[100%] gap-2 bg-[#013878] rounded-[24px] p-[8px_16px] transition hover:shadow-hoverinset cursor-pointer"
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

    <div class="flex flex-wrap items-center gap-2 mt-5 mb-3">
      <div
        class="flex-[1] max-md:text-[16px] text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Danh sách người dùng
      </div>

      <div class="inline-flex flex-wrap items-center gap-4 ms-auto">
        <button
          type="button"
          id="tableImport"
          class="max-md:flex-auto inline-flex items-end justify-center max-md:items-center max-md:gap-1 gap-2 rounded-[24px] border border-solid border-[#EDEDF6] p-[7px_24px] max-md:p-[7px_12px] bg-white cursor-pointer transition hover:shadow-hoverinset"
        >
          <img src="@/assets/images/bx_import.svg" alt="" />
          <span
            class="text-[#909090] text-[16px] max-md:text-[14px] font-bold leading-normal"
          >
            Import</span
          >
        </button>

        <button
          type="button"
          id="tableExport"
          class="max-md:flex-auto inline-flex items-end justify-center max-md:items-center max-md:gap-1 gap-2 rounded-[24px] border border-solid border-[#EDEDF6] p-[7px_24px] max-md:p-[7px_12px] bg-white cursor-pointer transition hover:shadow-hoverinset"
          @click="toggleModal('modalExport')"
        >
          <img src="@/assets/images/bx_export.svg" alt="" />
          <span
            class="text-[#909090] text-[16px] max-md:text-[14px] font-bold leading-normal"
            >Export</span
          >
        </button>

        <button
          type="button"
          id="tableAdding"
          class="max-md:flex-auto rounded-[24px] bg-[#1b4dea] inline-flex items-end justify-center max-md:items-center max-md:gap-1 gap-2 p-[7px_12px] cursor-pointer transition hover:shadow-hoverinset"
          @click="toggleModal('modalNewUser')"
        >
          <img src="@/assets/images/si_add-fill.svg" alt="" />
          <span
            class="text-white font-inter text-[16px] max-md:text-[14px] font-bold leading-normal"
          >
            Thêm mới
          </span>
        </button>
      </div>
    </div>

    <!-- <Table
      :tbhead="tbhead"
      :tbbody="tbbody"
      justify="justify-between"
      :status="true"
    >
      <button type="button" class="cursor-pointer cell-btn-view shrink-0">
        <img src="@/assets/images/action-edit-1.svg" alt="" />
      </button>
      <button type="button" class="cursor-pointer cell-btn-edit shrink-0">
        <img src="@/assets/images/action-edit-2.svg" alt="" />
      </button>
      <button type="button" class="cursor-pointer cell-btn-delete shrink-0">
        <img src="@/assets/images/action-edit-3.svg" alt="" />
      </button>
    </Table> -->

    <ModalRegisterUser
      @toggle-modal="toggleModal('modalNewUser')"
      :modal="modalActive.modalNewUser"
    />

    <Modal
      @close="toggleModal('modalExport')"
      :modalActive="modalActive.modalExport"
      maxWidth="max-w-[512px]"
    >
      <div class="rounded-[24px] p-[45px_54px] bg-white overflow-hidden">
        <div
          class="text-center text-[#464661] text-[16px] font-bold uppercase mb-3"
        >
          EXport người dùng
        </div>

        <div class="mb-3 text-center">
          <img
            class="mx-auto"
            src="@/assets/images/icon-park-outline_attention.svg"
            alt=""
          />
        </div>

        <div
          class="text-center max-w-[280px] mx-auto text-[#464661] text-[16px]/[26px] font-semibold underline mb-6"
        >
          Bạn có chắc muốn export danh sách người dùng?
        </div>

        <div class="flex flex-wrap items-stretch gap-6">
          <a
            href=""
            class="inline-flex items-center justify-center flex-auto border border-solid border-[#EDEDF6] rounded-lg bg-white p-1.5 text-[#464661] text-[16px] font-semibold uppercase max-w-[175px] hover:shadow-hoverinset transition"
            >KHÔNG</a
          >
          <a
            href=""
            class="inline-flex items-center justify-center flex-auto border border-solid border-[#013878] rounded-lg bg-[#013878] p-1.5 text-white text-[16px] font-semibold uppercase max-w-[175px] hover:shadow-hoverinset transition"
            >CÓ</a
          >
        </div>
      </div>
    </Modal>

    <Modal
      @close="toggleModal('modalError')"
      :modalActive="modalActive.modalError"
      maxWidth="max-w-[512px]"
    >
      <div class="rounded-[24px] p-[45px_54px] bg-white overflow-hidden">
        <div
          class="text-center text-[#464661] text-[16px] font-bold uppercase mb-3"
        >
          Thông báo lỗi
        </div>

        <div class="mb-3 text-center">
          <img
            class="mx-auto"
            src="@/assets/images/icon-park-outline_attention.svg"
            alt=""
          />
        </div>

        <div
          class="text-center mx-auto text-[#464661] text-[16px]/[26px] font-semibold underline mb-6"
        >
          Export danh sách người dùng gặp lỗi!
        </div>
      </div>
    </Modal>
  </MainLayout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import MainLayout from '../MainLayout.vue'
import Modal from '@/components/Modals.vue'
import ModalRegisterUser from '@/components/Modal/ModalRegisterUser.vue'
import Table from '@/components/Table.vue'

interface recordModal {
  [key: string]: boolean
}

const modalActive = ref<recordModal>({
  modalNewUser: false,
  modalExport: false,
  modalError: false
})

const toggleModal = (modalStateName: any) => {
  modalActive.value[modalStateName] = !modalActive.value[modalStateName]
}

const tbhead = reactive([
  {
    title: 'STT',
    hasSort: false
  },
  {
    title: 'Mã NV',
    hasSort: true
  },
  {
    title: 'Họ và tên',
    hasSort: true
  },
  {
    title: 'Số điện thoại',
    hasSort: false
  },
  {
    title: 'Email',
    hasSort: false
  },
  {
    title: 'Chức vụ',
    hasSort: false
  },
  {
    title: 'Bộ phận',
    hasSort: false
  },
  {
    title: 'Địa điểm',
    hasSort: false
  }
])

const tbbody = reactive([
  {
    data: [
      { title: '01' },
      { title: '00123' },
      { title: 'Nguyễn Đức Hiếu' },
      { title: '0906668888' },
      { title: 'hieund@skygroup.com' },
      { title: 'Nhân viên' },
      { title: 'Phòng Marketing' },
      { title: 'Hà Nội ' }
    ]
  }
])
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

<style lang="scss"></style>
