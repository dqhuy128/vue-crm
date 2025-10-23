<template>
  <MainLayout>
    <Breadcrums name="Lịch sử chấm công" path="/timekeeping/history" />

    <template v-if="toggleBoxFilters">
      <div class="mb-5 rounded-[24px] bg-white p-2.5">
        <form class="flex flex-wrap gap-4" @submit.prevent="handleSearchWorkHistory">
          <div class="xxl:gap-4 flex grow flex-wrap items-stretch gap-2">
            <div
              class="flex-[0_0_calc((100%-16px)/2)] max-lg:w-[calc(50%-4px)] max-lg:flex-[0_0_calc(50%-4px)] max-md:w-[calc(100%)] max-md:flex-[0_0_calc(100%)]"
            >
              <!-- <div class="relative">
                <input
                  v-model="paramsWorkHistory.name"
                  type="text"
                  name=""
                  id=""
                  placeholder="Nhập tên"
                  class="block w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[6px_12px] text-[#000] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal focus:outline-none"
                />

                <button
                  v-if="paramsWorkHistory.name"
                  type="button"
                  class="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2"
                  @click="() => (paramsWorkHistory.name = '')"
                >
                  <Icon icon="radix-icons:cross-1" class="w-3.5 h-3.5" />
                </button>
              </div> -->

              <SearchableSelect
                v-model="paramsWorkHistory.id"
                :options="userOptions"
                placeholder="Tất cả nhân viên"
                search-placeholder="Tìm kiếm nhân viên..."
                :show-default-option="true"
              />
            </div>

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
                range
                format="dd/MM/yyyy"
                :max-date="new Date()"
                placeholder="Chọn khoảng thời gian"
                @update:model-value="updateDates"
              />
            </div>
          </div>

          <button
            type="submit"
            class="hover:shadow-hoverinset inline-flex cursor-pointer items-center justify-center gap-2 rounded-[24px] bg-[#013878] p-[8px_16px] transition max-md:flex-[100%]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <span class="font-inter text-[15px] leading-normal font-bold text-white"> Tìm kiếm </span>
          </button>
        </form>
      </div>
    </template>

    <div class="mb-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="inline-block h-9 w-9 rounded-md bg-white md:hidden"
        @click="toggleBoxFilters = !toggleBoxFilters"
      >
        <Icon icon="lsicon:filter-outline" class="h-full w-full p-1.5" />
      </button>
      <div
        class="font-inter hidden flex-[1] text-[20px] leading-normal font-bold text-[#464661] max-md:text-[16px] md:block"
      >
        Thông tin chấm công
      </div>
    </div>

    <div class="mb-6 flex flex-wrap items-center gap-4">
      <!-- Bộ lọc cột -->
      <div class="column-filter-container relative">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-[24px] border border-[#EDEDF6] bg-white px-4 py-1.5 text-[#464661] shadow-sm transition-colors hover:bg-gray-50"
          @click="showColumnFilter = !showColumnFilter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 7H21M7 12H17M10 17H14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="font-inter text-[15px] font-medium">Bộ lọc</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Dropdown bộ lọc -->
        <div
          v-if="showColumnFilter"
          class="absolute top-full left-0 z-[99] mt-2 w-80 rounded-[12px] border border-[#EDEDF6] bg-white shadow-lg"
          @click.stop
        >
          <div class="p-4">
            <h3 class="mb-3 text-base font-semibold text-[#464661]">Cài đặt hiển thị</h3>

            <!-- Search input -->
            <div class="relative mb-4">
              <input
                v-model="columnSearchText"
                type="text"
                placeholder="Tìm kiếm"
                class="w-full rounded-[8px] border border-[#EDEDF6] px-3 py-2 pr-8 text-[14px] focus:border-transparent focus:ring-2 focus:ring-[#1b4dea] focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                class="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
              >
                <path
                  d="M21 21L16.7 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <!-- Danh sách cột với checkbox -->
            <div class="max-h-60 space-y-2 overflow-y-auto">
              <div
                v-for="(column, index) in filteredColumns"
                :key="index"
                class="mb-0 flex items-center gap-3 rounded-[6px] p-2 transition-colors hover:bg-gray-50"
              >
                <input
                  :id="`column-${index}`"
                  type="checkbox"
                  :checked="column.visible"
                  class="h-4 w-4 rounded border-[#EDEDF6] bg-white text-[#1b4dea] focus:ring-2 focus:ring-[#1b4dea]"
                  @change="toggleColumnVisibility(index)"
                />
                <label :for="`column-${index}`" class="font-inter flex-1 cursor-pointer text-[14px] text-[#464661]">
                  {{ column.title }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-if="checkPermission('Work', 'List')">
      <div class="flex h-full flex-col">
        <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
          <div class="table-container relative">
            <!-- Example column -->
            <div id="tableRowHeader" class="header table-row justify-between !ps-5">
              <div v-for="(column, index) in tbhead" v-show="column.visible" :key="index" class="cell">
                {{ column.title }}

                <div v-if="column.hasSort" class="tb-sort">
                  <button
                    type="button"
                    class="cursor-pointer"
                    :class="{
                      'sort-asc': column.title === 'Mã NV' && paramsWorkHistory.sort === 'code|asc',
                      'sort-desc': column.title === 'Mã NV' && paramsWorkHistory.sort === 'code|desc',
                    }"
                    @click="handleSort(column.title)"
                  >
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>

              <div class="cell pinned !px-2 !py-4.5">Giải trình</div>
            </div>

            <!-- Skeleton Loading -->
            <SkeletonTable v-if="isLoading" :columns="tbhead.filter((col) => col.visible).length + 1" :rows="10" />

            <!-- Table Data -->
            <template v-else-if="dataWorkHistoryList">
              <div id="tableRowBody" class="body table-row">
                <template v-for="(item, index) in dataWorkHistoryList" :key="index">
                  <div v-for="(it, itIndex) in item.values" :key="itIndex" class="table-item justify-between !ps-5">
                    <div v-show="tbhead[0].visible" class="cell">
                      {{ it?.id }}
                    </div>

                    <div v-show="tbhead[1].visible" class="cell">
                      {{ it?.user_code }}
                    </div>

                    <div v-show="tbhead[2].visible" class="cell">
                      {{ it?.name }}
                    </div>

                    <div v-show="tbhead[3].visible" class="cell">
                      {{ it?.work_date }}
                    </div>

                    <div v-show="tbhead[4].visible" class="cell">
                      {{ it?.check_in }}
                    </div>

                    <div v-show="tbhead[5].visible" class="cell">
                      {{ it?.check_out }}
                    </div>

                    <div v-show="tbhead[6].visible" class="cell">
                      {{ it?.status }}
                    </div>

                    <div v-show="tbhead[7].visible" class="cell">
                      {{ it?.total }}
                    </div>

                    <div class="cell pinned pinned-body justify-center !pe-2.5">
                      <template v-if="it?.explanation">
                        <button
                          type="button"
                          class="cell-btn-edit shrink-0 cursor-pointer"
                          @click="handleUserExplain(it?.user_id || '', it?.work_date || '')"
                        >
                          <img src="@/assets/images/action-edit-2.svg" alt="" />
                        </button>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>

        <!-- PAGINATION -->
        <div class="tb-pagination flex flex-wrap items-center gap-2 max-md:justify-center md:gap-4">
          <div class="relative">
            <select
              id="selectPerPage"
              v-model="paginate.per_page"
              name=""
              class="cursor-pointer appearance-none rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[14px] font-normal text-[#464661] focus:outline-none md:min-w-[264px]"
            >
              <option value="10" :selected="paginate.per_page === 10">10 bản ghi / trang</option>
              <option value="20">20 bản ghi / trang</option>
              <option value="30">30 bản ghi / trang</option>
              <option value="40">40 bản ghi / trang</option>
            </select>

            <div class="pointer-events-none absolute top-[50%] right-3 -translate-y-[50%] max-md:hidden">
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.964013 1.1641C1.04759 1.08049 1.14682 1.01417 1.25603 0.968927C1.36524 0.92368 1.4823 0.900391 1.60051 0.900391C1.71873 0.900391 1.83578 0.92368 1.945 0.968927C2.05421 1.01417 2.15344 1.08049 2.23701 1.1641L4.00001 2.9271L5.76401 1.1641C5.9339 1.00121 6.16083 0.911356 6.39617 0.913785C6.63152 0.916214 6.85654 1.01073 7.02303 1.17709C7.18952 1.34345 7.28422 1.5684 7.28683 1.80374C7.28944 2.03908 7.19976 2.26609 7.03701 2.4361L4.63701 4.8361C4.55344 4.9197 4.45421 4.98602 4.345 5.03127C4.23578 5.07652 4.11873 5.09981 4.00051 5.09981C3.8823 5.09981 3.76524 5.07652 3.65603 5.03127C3.54682 4.98602 3.44759 4.9197 3.36401 4.8361L0.964013 2.4361C0.795473 2.26735 0.700806 2.0386 0.700806 1.8001C0.700806 1.5616 0.795473 1.33285 0.964013 1.1641Z"
                  fill="#363636"
                />
              </svg>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2 md:ms-auto">
            <div class="text-[14px] font-normal text-[#464661]">
              <template v-if="paginationRange.total > 0">
                {{ paginationRange.start }} - {{ paginationRange.end }} trong {{ paginationRange.total }} kết quả
              </template>
              <template v-else> 0 kết quả </template>
            </div>

            <div class="tb-navigation flex flex-wrap items-center md:gap-2">
              <button :class="{ disabled: paginate.page === 1 }" @click="handlePageChange(paginate.page - 1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14.69 17.29C14.7827 17.1975 14.8562 17.0876 14.9064 16.9666C14.9566 16.8456 14.9824 16.7159 14.9824 16.585C14.9824 16.454 14.9566 16.3243 14.9064 16.2034C14.8562 16.0824 14.7827 15.9725 14.69 15.88L10.81 12L14.69 8.11998C14.877 7.933 14.982 7.67941 14.982 7.41498C14.982 7.15055 14.877 6.89695 14.69 6.70998C14.503 6.523 14.2494 6.41796 13.985 6.41796C13.7206 6.41796 13.467 6.523 13.28 6.70998L8.68998 11.3C8.59727 11.3925 8.52373 11.5024 8.47355 11.6234C8.42336 11.7443 8.39753 11.874 8.39753 12.005C8.39753 12.1359 8.42336 12.2656 8.47355 12.3866C8.52373 12.5076 8.59727 12.6175 8.68998 12.71L13.28 17.3C13.66 17.68 14.3 17.68 14.69 17.29Z"
                    fill="#363636"
                  />
                </svg>
              </button>

              <input
                id=""
                type="text"
                name=""
                :value="paginate.page"
                class="inline-flex h-[32px] w-[32px] flex-col items-center justify-center rounded-[8px] border border-solid border-[#909090] bg-white text-center text-[16px] font-bold text-[#464661]"
                readonly
              />

              <button
                :class="{
                  disabled: Number(paginate.page) >= dataTotalPages,
                }"
                @click="handlePageChange(paginate.page + 1)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
    </template>

    <Modal
      :modal-active="modalActive.modalAddWorkHistory"
      max-width="max-w-[670px]"
      @close="toggleModal('modalAddWorkHistory')"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">Lý do</h3>
        </div>

        <ModalAddWorkHistory
          :datatype="dataUserExplain"
          :prop-function="fetchDataWorkHistory"
          @post-request="getPostRequest"
        >
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
            @click="toggleModal('modalAddWorkHistory')"
          >
            Hủy
          </button>
        </ModalAddWorkHistory>
      </div>
    </Modal>

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastA"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]],
          'bg-[#c4ffd0]': dataPostRequest?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataPostRequest?.message }}
        </ToastTitle>
        <ToastDescription
          v-if="dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]]"
          class="text-[11px] font-normal"
        >
          {{ dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]] }}
        </ToastDescription>
        <!-- <ToastClose aria-label="Close"><span aria-hidden>×</span></ToastClose> -->
      </ToastRoot>
      <ToastViewport
        class="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </ToastProvider>
  </MainLayout>
</template>

<script lang="ts" setup>
  import '@vuepic/vue-datepicker/dist/main.css'

  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { endOfDay, format, startOfMonth } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
  import { storeToRefs } from 'pinia'
  import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
  import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import ModalAddWorkHistory from '@/components/Modal/ModalAddWorkHistory.vue'
  import Modal from '@/components/Modals.vue'
  import SearchableSelect from '@/components/SearchableSelect.vue'
  import SkeletonTable from '@/components/SkeletonTable.vue'
  import { useWork } from '@/composables/work'
  import { apiUri } from '@/constants/apiUri'
  import router from '@/router'
  import { usePermissionStore } from '@/store/permission'
  import { tableMagic } from '@/utils/main'
  import MainLayout from '@/views/MainLayout.vue'

  const auth = useAuth()
  const permissionData = usePermissionStore()
  const { userData } = storeToRefs(permissionData)

  const toast = reactive({
    toastA: false,
  })

  const toggleBoxFilters = ref(false)
  const screenWidth = ref(window.innerWidth)
  const isInputActive = ref(false)
  let resizeTimer: any

  // Chỉ cập nhật toggleBoxFilters khi không có input đang focus
  const updateLayout = () => {
    screenWidth.value = window.innerWidth
    if (!isInputActive.value) {
      toggleBoxFilters.value = screenWidth.value >= 768
    }
  }
  // Xử lý sự kiện khi input được focus/blur
  const trackInputState = (event: any) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      isInputActive.value = event.type === 'focus'
    }
  }
  // Add event listener for window resize
  onMounted(() => {
    // Khởi tạo giá trị ban đầu
    updateLayout()

    // Theo dõi resize với debounce
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateLayout, 100)
    })

    // Sử dụng event capturing để theo dõi tất cả input
    document.addEventListener('focus', trackInputState, true)
    document.addEventListener('blur', trackInputState, true)

    // Đóng dropdown khi click bên ngoài
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!target.closest('.column-filter-container')) {
        showColumnFilter.value = false
      }
    })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('focus', trackInputState, true)
    document.removeEventListener('blur', trackInputState, true)
    window.removeEventListener('resize', updateLayout)
    clearTimeout(resizeTimer)
  })
  // Watch for screenWidth changes
  watch(screenWidth, () => {
    updateLayout()
  })

  interface recordModal {
    [key: string]: boolean
  }
  const modalActive = ref<recordModal>({
    modalStatusAddLeave: false,
    modalStatusEditLeave: false,
    modalStatusConfirm: false,
    modalAddWorkHistory: false,
  })

  const toggleModal = (modalStateName: any) => {
    modalActive.value[modalStateName] = !modalActive.value[modalStateName]
  }

  const tbhead = reactive([
    {
      title: 'STT',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Mã NV',
      hasSort: true,
      visible: true,
    },
    {
      title: 'Họ và tên',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Ngày làm việc',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Giờ vào',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Giờ ra',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Trạng thái',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Công ngày',
      hasSort: false,
      visible: true,
    },
  ])

  // State cho bộ lọc dropdown
  const showColumnFilter = ref(false)
  const columnSearchText = ref('')

  // Computed để lọc các cột dựa trên search text
  const filteredColumns = computed(() => {
    if (!columnSearchText.value) return tbhead
    return tbhead.filter((column) => column.title.toLowerCase().includes(columnSearchText.value.toLowerCase()))
  })

  // Function để toggle hiển thị cột
  const toggleColumnVisibility = (columnIndex: number) => {
    // Tìm index thực tế trong tbhead dựa trên filteredColumns
    const originalIndex = tbhead.findIndex((col) => col.title === filteredColumns.value[columnIndex].title)
    if (originalIndex !== -1) {
      tbhead[originalIndex].visible = !tbhead[originalIndex].visible
    }
  }

  type SortType = 'code|asc' | 'code|desc'
  interface typeParamsWorkHistory {
    begin_date: string
    finish_date: string
    name: string
    id: string
    sort: SortType
  }
  const paramsWorkHistory = reactive<typeParamsWorkHistory>({
    begin_date: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    finish_date: format(endOfDay(new Date()), 'yyyy-MM-dd'),
    name: '',
    id: '',
    sort: 'code|asc' as SortType,
  })

  const datepicker = ref<any | null>([startOfMonth(new Date()), endOfDay(new Date())])
  const updateDates = () => {
    if (datepicker.value && datepicker.value[0] && datepicker.value[1]) {
      paramsWorkHistory.begin_date = format(datepicker.value[0], 'yyyy-MM-dd')
      paramsWorkHistory.finish_date = format(datepicker.value[1], 'yyyy-MM-dd')
    } else {
      paramsWorkHistory.begin_date = ''
      paramsWorkHistory.finish_date = ''
    }
  }
  watch(datepicker, () => {
    if (auth.check()) {
      updateDates()
    }
  })

  const paginate = reactive({
    page: 1,
    per_page: 20,
  })

  const debounceTime = ref<{
    timeOut: number | null
    counter: number
  }>({
    timeOut: null,
    counter: 0,
  })

  const fetchDataWorkHistory = () => {
    if (debounceTime.value.timeOut !== null) {
      clearTimeout(debounceTime.value.timeOut)
    }

    debounceTime.value.timeOut = setTimeout(() => {
      const res = {
        ...paramsWorkHistory,
        page: paginate.page,
        per_page: paginate.per_page,
      }

      doFetch(
        `${apiUri}/work/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
        auth.token() as string
      ).then(() => {
        // console.log('🚀 ~ fetchDataWorkHistory ~ res:', res)
        tableMagic()
      })
    }, 300)
  }

  const dataTotalPages = computed(() =>
    Math.ceil(Number(dataWorkHistory.doc?.pagination?.total) / Number(paginate.per_page))
  )

  // Computed property để tính toán range hiển thị pagination
  const paginationRange = computed(() => {
    const currentPage = Number(paginate.page)
    const perPage = Number(paginate.per_page)
    const total = Number(dataWorkHistory.doc?.pagination?.total || 0)

    const start = (currentPage - 1) * perPage + 1
    const end = Math.min(currentPage * perPage, total)

    return { start, end, total }
  })

  // Computed property to transform user data for SearchableSelect
  const userOptions = computed(() => {
    if (!dataUserMCC.originalItems) return null

    const options: Record<string, any[]> = {
      employees: [],
    }

    // Transform the originalItems object into array of objects with id and name
    for (const [id, name] of Object.entries(dataUserMCC.originalItems)) {
      options.employees.push({
        id: id,
        name: name as string,
      })
    }

    return options
  })

  const handlePageChange = (pageNum: number) => {
    // console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
    paginate.page = pageNum
    fetchDataWorkHistory()
  }

  const dataUserMCC = reactive({
    items: [],
    originalItems: {} as Record<string, string>,
  })
  const fetchDataUserMCC = async () => {
    const res = await axios.get(`${apiUri}/work/usermcc`, {
      headers: {
        Authorization: `Bearer ${auth.token()}`,
        'Content-Type': 'application/json',
      },
    })
    const { items } = res.data.data
    // Store both the original items object and the names array
    dataUserMCC.items = Object.values(items)
    dataUserMCC.originalItems = items // Keep the original object with key-value pairs
  }

  const handleSearchWorkHistory = async () => {
    try {
      // Reset về trang 1 khi filter
      paginate.page = 1

      const formData = new FormData()
      formData.append('begin_date', paramsWorkHistory.begin_date)
      formData.append('finish_date', paramsWorkHistory.finish_date)
      formData.append('name', paramsWorkHistory.name)
      formData.append('id', paramsWorkHistory.id)

      const res = await axios.post(`${apiUri}/work/list`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      fetchDataWorkHistory()
      console.log('🚀 ~ handleSearchWorkHistory ~ res:', res)
    } catch (error) {
      console.log('🚀 ~ handleSearchWorkHistory ~ error:', error)
    }
  }

  const handleSort = (columnTitle: string) => {
    if (columnTitle === 'Mã NV') {
      // Toggle giữa 'code|asc' và 'code|desc'
      paramsWorkHistory.sort = paramsWorkHistory.sort === 'code|asc' ? 'code|desc' : 'code|asc'
      // Reset về trang 1 khi sort
      paginate.page = 1
      // Fetch data với sort mới
      fetchDataWorkHistory()
    }
  }

  const dataUserExplain = ref<any | null>(null)
  const handleUserExplain = async (id: string, date: string) => {
    try {
      dataUserExplain.value = await dataWorkHistory.doc?.items?.[Number(id)]?.[date]
      console.log('🚀 ~ handleUserExplain ~ dataUserExplain.value:', dataUserExplain.value)
      toggleModal('modalAddWorkHistory')
    } catch (error) {
      console.log('🚀 ~ handleUserExplain ~ error:', error)
    }
  }

  const { data, doFetch, isLoading } = useWork()

  const dataWorkHistory = reactive({
    doc: data,
  })

  interface WorkHistoryItem {
    id?: string
    user_id?: string
    name?: string
    user_code?: string
    work_date?: string
    check_in?: string | null
    check_out?: string | null
    total?: string
    status?: null | string
    explanation?: boolean
  }

  const dataWorkHistoryList = computed(() => {
    if (!dataWorkHistory.doc?.items) return []

    return Object.entries(dataWorkHistory.doc.items).map(([key, values]) => ({
      values: Object.values(values) as WorkHistoryItem[],
    }))
  })

  console.log('🚀 ~ dataWorkHistoryList:', dataWorkHistoryList)

  const dataPostRequest = ref<any | null>(null)
  const getPostRequest = (data: any) => {
    dataPostRequest.value = data
    if (dataPostRequest.value) toast.toastA = true
    if (dataPostRequest.value.status == 1) toggleModal('modalAddWorkHistory')
  }

  const permissionStore = usePermissionStore()
  const { permissionList } = storeToRefs(permissionStore)
  const { checkPermission } = permissionStore

  watch(permissionList, () => {
    console.log('🚀 ~ //onMounted ~ permissionList:', permissionList)
    if (auth.check()) {
      if (!permissionList.value.includes('Work')) {
        alert('Bạn không có quyền truy cập vào trang này')
        router.push({ name: 'NotFound404' })
      } else {
        fetchDataWorkHistory()
        console.log(dataWorkHistory, 'dataWorkHistory')
      }
    }
  })

  watch(
    paginate,
    () => {
      fetchDataWorkHistory()
    },
    {
      // must pass deep option to watch for changes on object properties
      deep: true,
    }
  )

  onMounted(() => {
    if (auth.check()) {
      fetchDataWorkHistory()
      fetchDataUserMCC()
    }
  })
</script>

<style lang="scss">
  .work-history-datepicker {
    .dp__input {
      border-radius: 24px;
    }
  }

  .tb-sort {
    button {
      transition: transform 0.2s ease;

      &.sort-asc {
        img {
          transform: rotate(0deg);
        }
      }

      &.sort-desc {
        img {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
