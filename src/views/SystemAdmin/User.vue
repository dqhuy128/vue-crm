<template>
  <MainLayout>
    <div class="bg-white rounded-[24px] p-2.5">
      <form
        class="flex flex-wrap gap-4 items-stretch"
        @submit.prevent="handleSearchUser"
      >
        <div class="flex flex-wrap gap-4 grow">
          <div class="flex-[0_0_calc(25%-12px)] max-lg:flex-[100%]">
            <SelectRoot v-model="params.phone">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Tên, số điện thoại"
                />
                <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
              </SelectTrigger>

              <SelectPortal>
                <SelectContent
                  class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                  position="popper"
                  :side-offset="5"
                >
                  <SelectViewport>
                    <SelectGroup>
                      <template
                        v-for="(items, index) in dataDocument?.doc?.items"
                      >
                        <SelectItem
                          v-for="(item, _) in items"
                          :key="index"
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.phone)"
                        >
                          <SelectItemText>
                            {{ item.phone }}
                          </SelectItemText>
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>

          <div class="flex-[0_0_calc(25%-12px)] max-lg:flex-[100%]">
            <SelectRoot v-model="params.per_group_name">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn nhóm người dùng"
                />
                <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
              </SelectTrigger>

              <SelectPortal>
                <SelectContent
                  class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                  position="popper"
                  :side-offset="5"
                >
                  <SelectViewport>
                    <SelectGroup>
                      <template
                        v-for="(items, index) in dataDocument?.doc?.items"
                      >
                        <SelectItem
                          v-for="(item, _) in items"
                          :key="index"
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.per_group_name)"
                        >
                          <SelectItemText>
                            {{ item.per_group_name }}
                          </SelectItemText>
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>

          <div class="flex-[0_0_calc(25%-12px)] max-lg:flex-[100%]">
            <SelectRoot v-model="params.part_id">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn bộ phận"
                />
                <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
              </SelectTrigger>

              <SelectPortal>
                <SelectContent
                  class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                  position="popper"
                  :side-offset="5"
                >
                  <SelectViewport>
                    <SelectGroup>
                      <template
                        v-for="(items, index) in dataDocument?.doc?.items"
                      >
                        <SelectItem
                          v-for="(item, _) in items"
                          :key="index"
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.part_id)"
                        >
                          <SelectItemText>
                            {{ item.part_id }}
                          </SelectItemText>
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>

          <div class="flex-[0_0_calc(25%-12px)] max-lg:flex-[100%]">
            <SelectRoot v-model="params.position_id">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn chức vụ"
                />
                <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
              </SelectTrigger>

              <SelectPortal>
                <SelectContent
                  class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                  position="popper"
                  :side-offset="5"
                >
                  <SelectViewport>
                    <SelectGroup>
                      <template
                        v-for="(items, index) in dataDocument?.doc?.items"
                      >
                        <SelectItem
                          v-for="(item, _) in items"
                          :key="index"
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.position_id)"
                        >
                          <SelectItemText>
                            {{ item.position_id }}
                          </SelectItemText>
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
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

    <div class="flex flex-wrap gap-2 items-center mt-5 mb-3">
      <div
        class="flex-[1] max-md:text-[16px] text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Danh sách người dùng
      </div>

      <div class="inline-flex flex-wrap gap-4 items-center ms-auto">
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

    <div class="flex flex-col h-full">
      <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
        <div class="relative table-container">
          <!-- Example column -->
          <div id="tableRowHeader" class="table-row justify-between header">
            <div class="cell" v-for="(column, index) in tbhead" :key="index">
              {{ column.title }}

              <div class="tb-sort" v-if="column.hasSort">
                <button type="button">
                  <img src="@/assets/images/tb-sort.svg" alt="" />
                </button>
              </div>
            </div>
            <div class="cell pinned">
              <div class="cell status">Trạng thái</div>
              <div class="cell edit">Edit</div>
            </div>
          </div>

          <!-- Example row -->
          <div id="tableRowBody" class="table-row body">
            <template
              v-for="(items, index) in dataDocument?.doc?.items"
              :key="index"
            >
              <div
                class="justify-between table-item"
                v-for="(item, _) in items"
                :key="index"
              >
                <!-- bg-blue , bg-green , bg-red , bg-purple , :class="{ 'bg-blue': id === 1 }"-->

                <div class="cell">
                  <template v-if="index < 9"> 0{{ index + 1 }} </template>
                  <template v-else>{{ index + 1 }}</template>
                </div>

                <div class="cell">
                  {{ item?.code || 'Chưa có mã NV' }}
                </div>

                <div class="cell">
                  {{ item?.name || 'Chưa có tên' }}
                </div>

                <div class="cell">
                  {{ item?.phone || 'Chưa có số điện thoại' }}
                </div>

                <div class="cell">
                  {{ item?.email || 'Chưa có email' }}
                </div>

                <div class="cell">
                  {{ item?.position_id || 'Chưa có chức vụ' }}
                </div>

                <div class="cell">
                  {{ item?.part_id || 'Chưa có bộ phận' }}
                </div>

                <div class="cell">
                  {{ item?.permanent_address || 'Chưa có địa điểm' }}
                </div>

                <div class="cell pinned pinned-body">
                  <template v-if="Number(item?.status) === 1">
                    <div class="cell status status-green status-body">
                      Đang hoạt động
                    </div>
                  </template>

                  <template v-if="Number(item?.status) === 0">
                    <div class="cell status status-red status-body">
                      Dừng hoạt động
                    </div>
                  </template>

                  <div class="cell edit edit-body">
                    <button
                      type="button"
                      class="cursor-pointer cell-btn-edit shrink-0"
                    >
                      <img src="@/assets/images/action-edit-2.svg" alt="" />
                    </button>
                    <button
                      type="button"
                      class="cursor-pointer cell-btn-delete shrink-0"
                    >
                      <img src="@/assets/images/action-edit-3.svg" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div
        class="flex flex-wrap gap-2 items-center mt-auto tb-pagination max-md:justify-center md:gap-4"
      >
        <div class="relative">
          <select
            v-model="paginate.per_page"
            name=""
            id="selectPerPage"
            class="appearance-none cursor-pointer p-[8px_12px] bg-white rounded-[24px] md:min-w-[264px] text-[#464661] text-[14px] font-normal border border-solid border-[#EDEDF6] focus:outline-none"
          >
            <option value="10" :selected="paginate.per_page === 10">
              10 bản ghi / trang
            </option>
            <option value="20">20 bản ghi / trang</option>
            <option value="30">30 bản ghi / trang</option>
            <option value="40">40 bản ghi / trang</option>
          </select>

          <div
            class="max-md:hidden pointer-events-none absolute right-3 top-[50%] -translate-y-[50%]"
          >
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.964013 1.1641C1.04759 1.08049 1.14682 1.01417 1.25603 0.968927C1.36524 0.92368 1.4823 0.900391 1.60051 0.900391C1.71873 0.900391 1.83578 0.92368 1.945 0.968927C2.05421 1.01417 2.15344 1.08049 2.23701 1.1641L4.00001 2.9271L5.76401 1.1641C5.9339 1.00121 6.16083 0.911356 6.39617 0.913785C6.63152 0.916214 6.85654 1.01073 7.02303 1.17709C7.18952 1.34345 7.28422 1.5684 7.28683 1.80374C7.28944 2.03908 7.19976 2.26609 7.03701 2.4361L4.63701 4.8361C4.55344 4.9197 4.45421 4.98602 4.345 5.03127C4.23578 5.07652 4.11873 5.09981 4.00051 5.09981C3.8823 5.09981 3.76524 5.07652 3.65603 5.03127C3.54682 4.98602 3.44759 4.9197 3.36401 4.8361L0.964013 2.4361C0.795473 2.26735 0.700806 2.0386 0.700806 1.8001C0.700806 1.5616 0.795473 1.33285 0.964013 1.1641Z"
                fill="#363636"
              />
            </svg>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 items-center md:ms-auto">
          <div class="text-[#464661] text-[14px] font-normal">
            <template
              v-if="
                dataDocument.doc?.pagination?.total &&
                Number(dataDocument.doc?.pagination.total) > paginate.per_page
              "
            >
              1 - {{ paginate.per_page }} trong
              {{ dataDocument.doc?.pagination?.total || 0 }} kết quả
            </template>
            <template v-else>
              {{ dataDocument.doc?.pagination?.total || 0 }} kết quả
            </template>
          </div>

          <div class="flex flex-wrap items-center tb-navigation md:gap-2">
            <button
              type="button"
              :class="{ disabled: paginate.page === 1 }"
              @click="handlePageChange(paginate.page - 1)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.69 17.29C14.7827 17.1975 14.8562 17.0876 14.9064 16.9666C14.9566 16.8456 14.9824 16.7159 14.9824 16.585C14.9824 16.454 14.9566 16.3243 14.9064 16.2034C14.8562 16.0824 14.7827 15.9725 14.69 15.88L10.81 12L14.69 8.11998C14.877 7.933 14.982 7.67941 14.982 7.41498C14.982 7.15055 14.877 6.89695 14.69 6.70998C14.503 6.523 14.2494 6.41796 13.985 6.41796C13.7206 6.41796 13.467 6.523 13.28 6.70998L8.68998 11.3C8.59727 11.3925 8.52373 11.5024 8.47355 11.6234C8.42336 11.7443 8.39753 11.874 8.39753 12.005C8.39753 12.1359 8.42336 12.2656 8.47355 12.3866C8.52373 12.5076 8.59727 12.6175 8.68998 12.71L13.28 17.3C13.66 17.68 14.3 17.68 14.69 17.29Z"
                  fill="#363636"
                />
              </svg>
            </button>

            <input
              type="text"
              name=""
              :value="paginate.page"
              id=""
              class="rounded-[8px] bg-white w-[32px] h-[32px] inline-flex flex-col items-center justify-center text-center text-[#464661] text-[16px] font-bold border border-solid border-[#909090]"
              readonly
            />

            <button
              type="button"
              :class="{
                disabled: Number(paginate.page) >= dataTotalPages
              }"
              @click="handlePageChange(paginate.page + 1)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.31002 6.71002C9.21732 6.80254 9.14377 6.91242 9.09359 7.0334C9.04341 7.15437 9.01758 7.28405 9.01758 7.41502C9.01758 7.54599 9.04341 7.67567 9.09359 7.79665C9.14377 7.91762 9.21732 8.02751 9.31002 8.12002L13.19 12L9.31002 15.88C9.12304 16.067 9.018 16.3206 9.018 16.585C9.018 16.8494 9.12304 17.103 9.31002 17.29C9.497 17.477 9.7506 17.582 10.015 17.582C10.2794 17.582 10.533 17.477 10.72 17.29L15.31 12.7C15.4027 12.6075 15.4763 12.4976 15.5265 12.3766C15.5766 12.2557 15.6025 12.126 15.6025 11.995C15.6025 11.8641 15.5766 11.7344 15.5265 11.6134C15.4763 11.4924 15.4027 11.3825 15.31 11.29L10.72 6.70002C10.34 6.32002 9.70002 6.32002 9.31002 6.71002Z"
                  fill="#363636"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

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

        <div class="flex flex-wrap gap-6 items-stretch">
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
import { computed, onMounted, watch, reactive, ref } from 'vue'
import MainLayout from '../MainLayout.vue'
import Modal from '@/components/Modals.vue'
import ModalRegisterUser from '@/components/Modal/ModalRegisterUser.vue'
import { tableMagic } from '@/utils/main'
import { useSystemUser } from '@/composables/system-user'
import { apiUri } from '@/constants/apiUri'
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

const auth = useAuth()

const params = reactive({
  part_id: '',
  position_id: '',
  per_group_name: '',
  phone: ''
})
const paginate = reactive({
  page: 1,
  per_page: 10
})
const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataDocument = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...params,
      page: paginate.page,
      per_page: paginate.per_page
    }

    doFetch(
      `${apiUri}/user/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
      auth.token() as string
    ).then(() => {
      // console.log('🚀 ~ fetchDataDocument ~ res:', res)
      tableMagic()
    })
  }, 300)
}

const handlePageChange = (pageNum: number) => {
  // console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
  paginate.page = pageNum
  // fetchDataDocument();
}

const handleSearchUser = async () => {
  paginate.page = 1
  paginate.per_page = 10
  fetchDataDocument()
}

const {
  data,
  // isLoading: isLoadingDocument,
  doFetch,
  // fetchCategoryDocument,
  categories
} = useSystemUser()

const dataDocument = reactive<any>({
  doc: data
})

watch(
  () => params.position_id,
  (newVal) => {
    console.log('🚀 ~ watch ~ value:', newVal)
  },
  { deep: true }
)

const dataTotalPages = computed(() =>
  Math.ceil(
    Number(dataDocument.doc?.pagination?.total) / Number(paginate.per_page)
  )
)

onMounted(() => {
  if (auth.check()) {
    fetchDataDocument()
  }

  tableMagic()
})
</script>

<style lang="scss" scoped>
@import '../../styles/table.module.scss';

.status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #464661;

  font-style: normal;
  font-weight: 400;
  line-height: 1;
  padding: 6px 10px !important;
  border-radius: 24px;

  @media (max-width: 767px) {
    padding: 6px !important;
    font-size: 10px !important;
    padding-left: 0 !important;
  }

  &-body {
    @media (max-width: 767px) {
      padding: 6px !important;
      font-size: 7px !important;
    }
  }
}

.status-green {
  border: 1px solid #12f13e;
  background: #c4ffd0;
}

.status-red {
  border: 1px solid #ff0000;
  background: #ff00003d;
}

.status-gray {
  border: 1px solid #9c9c9c;
  background: #9c9c9c73;
}

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
