<template>
  <MainLayout>
    <Breadcrums name="Giải trình chấm công" path="/timekeeping/explain" />

    <template v-if="toggleBoxFilters">
      <div class="bg-white rounded-[24px] mb-5 p-2.5">
        <form
          class="flex flex-wrap gap-4"
          @submit.prevent="handleSearchWorkExplain"
        >
          <div class="flex flex-wrap items-stretch gap-2 grow">
            <div
              class="flex-[0_0_calc((100%-8px)/2)] lg:flex-[0_0_calc((100%-16px)/3)] lg:w-[calc((100%-16px)/3)]"
            >
              <div class="relative">
                <input
                  v-model="paramsWorkExplain.name"
                  type="text"
                  name=""
                  id=""
                  placeholder="Nhập tên"
                  class="block w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[6px_12px] text-[#000] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal focus:outline-none"
                />

                <button
                  v-if="paramsWorkExplain.name"
                  type="button"
                  class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-3"
                  @click="() => (paramsWorkExplain.name = '')"
                >
                  <Icon icon="radix-icons:cross-1" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div
              class="flex-[0_0_calc((100%-8px)/2)] lg:flex-[0_0_calc((100%-16px)/3)] lg:w-[calc((100%-16px)/3)]"
            >
              <SelectRoot v-model="paramsWorkExplain.status">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[6px_12px] h-full focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[15px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn trạng thái"
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
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          value="all"
                        >
                          <SelectItemText> Tất cả trạng thái </SelectItemText>
                        </SelectItem>

                        <template v-for="item in 3" :key="item">
                          <SelectItem
                            class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                            :value="String(item - 1)"
                          >
                            <SelectItemText v-if="item === 1">
                              Chờ phê duyệt
                            </SelectItemText>
                            <SelectItemText v-if="item === 2">
                              Đã phê duyệt
                            </SelectItemText>
                            <SelectItemText v-if="item === 3">
                              Không phê duyệt
                            </SelectItemText>
                          </SelectItem>
                        </template>
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

            <div
              class="flex-[0_0_calc(100%)] lg:flex-[0_0_calc((100%-16px)/3)] lg:w-[calc((100%-16px)/3)]"
            >
              <VueDatePicker
                class="work-history-datepicker"
                v-model="datepicker"
                :enable-time-picker="false"
                locale="vi"
                :format-locale="vi"
                cancelText="Huỷ"
                selectText="Chọn"
                range
                format="dd/MM/yyyy"
                :max-date="new Date()"
                @update:model-value="updateDates"
              />
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
              class="text-white font-inter text-[15px] font-bold leading-normal"
            >
              Tìm kiếm
            </span>
          </button>
        </form>
      </div>
    </template>

    <div class="flex flex-wrap items-center gap-2 mb-3">
      <button
        @click="toggleBoxFilters = !toggleBoxFilters"
        type="button"
        class="inline-block bg-white rounded-md w-9 h-9 md:hidden"
      >
        <Icon icon="lsicon:filter-outline" class="w-full h-full p-1.5" />
      </button>
      <div
        class="hidden md:block flex-[1] max-md:text-[16px] text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Thông tin chấm công
      </div>
    </div>

    <template v-if="checkPermission('Work', 'Explanation')">
      <div class="flex flex-col h-full overflow-hidden">
        <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
          <div class="relative table-container">
            <!-- Example column -->
            <div
              id="tableRowHeader"
              class="justify-between table-row !px-5 !py-2 header"
            >
              <div class="cell" v-for="(column, index) in tbhead" :key="index">
                {{ column.title }}

                <div class="tb-sort" v-if="column.hasSort">
                  <button type="button">
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>

              <!-- <template v-if="checkPermission('Work', 'Create')">
                <div class="cell">Thao tác</div>
              </template> -->
            </div>

            <template v-if="dataWorkExplain.doc?.items">
              <div id="tableRowBody" class="table-row body">
                <div
                  class="justify-between table-item !px-5 !py-1"
                  v-for="(it, index) in dataWorkExplain.doc.items"
                  :key="index"
                >
                  <div class="cell">
                    <template v-if="index < 9"> 0{{ index + 1 }} </template>
                    <template v-else>{{ index + 1 }}</template>
                  </div>

                  <div class="cell">
                    {{ it.name }}
                  </div>

                  <div class="cell">
                    {{ it.work_date }}
                  </div>

                  <div class="cell">
                    {{ it.check_in }}
                  </div>

                  <div class="cell">
                    {{ it.check_out }}
                  </div>

                  <div class="relative" @click.stop="toggleDropdown(it.id)">
                    <template v-if="it.status === 'Đã phê duyệt'">
                      <div
                        class="cell text-[10px] status status-green status-body"
                      >
                        Đã phê duyệt
                      </div>
                    </template>

                    <template
                      v-if="it.status === 'Chờ phê duyệt' || it.status === null"
                    >
                      <div
                        class="cell text-[10px] status status-red status-body"
                      >
                        Chờ phê duyệt
                      </div>
                    </template>

                    <template v-if="it.status === 'Đã từ chối'">
                      <div
                        class="cell text-[10px] status status-gray status-body"
                      >
                        Không phê duyệt
                      </div>
                    </template>

                    <template v-if="checkPermission('Work', 'Status')">
                      <div
                        class="absolute left-0 right-0 w-full z-[1] opacity-0 invisible transition"
                        :class="{
                          'opacity-100 visible': activeDropdownId === it.id
                        }"
                      >
                        <RadioGroupRoot
                          v-model="radioStateSingle"
                          class="flex flex-col overflow-hidden bg-white rounded-xl shadow-2xl border border-solid border-[#EDEDF6]"
                          default-value="0"
                        >
                          <RadioGroupItem
                            @click="handlePostApprove(it.id)"
                            :id="`r1-${it.id}`"
                            class="block outline-none cursor-pointer p-1.5 hover:bg-[#C4FFD0] border-b border-solid border-[#EDEDF6] text-center"
                            value="1"
                          >
                            <label
                              class="text-center text-[#464661] text-[10px] font-normal cursor-pointer"
                              :for="`r1-${it.id}`"
                            >
                              Duyệt
                            </label>
                          </RadioGroupItem>
                          <RadioGroupItem
                            @click="handlePostApprove(it.id)"
                            :id="`r2-${it.id}`"
                            class="block outline-none cursor-pointer p-1.5 hover:bg-[#FFC4C4] text-center"
                            value="2"
                          >
                            <label
                              class="text-center text-[#464661] text-[10px] font-normal cursor-pointer"
                              :for="`r2-${it.id}`"
                            >
                              Không duyệt
                            </label>
                          </RadioGroupItem>
                        </RadioGroupRoot>
                      </div>
                    </template>
                  </div>

                  <div class="cell">
                    {{ it.reason }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div
          class="flex flex-wrap items-center gap-2 tb-pagination max-md:justify-center md:gap-4"
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

          <div class="flex flex-wrap items-center gap-2 md:ms-auto">
            <div class="text-[#464661] text-[14px] font-normal">
              <template
                v-if="
                  dataWorkExplain.doc?.pagination?.total &&
                  Number(dataWorkExplain.doc?.pagination.total) >
                    paginate.per_page
                "
              >
                1 - {{ paginate.per_page }} trong
                {{ dataWorkExplain.doc?.pagination?.total || 0 }} kết quả
              </template>
              <template v-else>
                {{ dataWorkExplain.doc?.pagination?.total || 0 }} kết quả
              </template>
            </div>

            <div class="flex flex-wrap items-center tb-navigation md:gap-2">
              <button
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
    </template>

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastA"
        :duration="5000"
        class="flex flex-col gap-1.5 bg-white rounded-md shadow-2xl p-3"
      >
        <ToastTitle class="font-medium text-[13px]">
          {{ dataPostRequest?.message }}
        </ToastTitle>
        <ToastDescription
          class="font-normal text-[11px]"
          v-if="dataPostRequest?.errors"
        >
          {{ dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]] }}
        </ToastDescription>
        <!-- <ToastClose aria-label="Close"><span aria-hidden>×</span></ToastClose> -->
      </ToastRoot>
      <ToastViewport
        class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
      />
    </ToastProvider>
  </MainLayout>
</template>

<script lang="ts" setup>
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
  SelectViewport
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import MainLayout from '@/views/MainLayout.vue'
import Breadcrums from '@/components/BreadcrumsNew.vue'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import Modal from '@/components/Modals.vue'
import { useAuth } from 'vue-auth3'
import axios from 'axios'
import { apiUri } from '@/constants/apiUri'
import { tableMagic } from '@/utils/main'
import ModalEditLeave from '@/components/Modal/ModalEditLeave.vue'
import ModalWorkExplain from '@/components/Modal/ModalWorkExplain.vue'
import { usePermissionStore } from '@/store/permission'
import { storeToRefs } from 'pinia'
import router from '@/router'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { vi } from 'date-fns/locale/vi'
import { format } from 'date-fns'
import { useWork } from '@/composables/work'
import { RadioGroupItem, RadioGroupRoot } from 'radix-vue'
import {
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport
} from 'radix-vue'

const toast = reactive({
  toastA: false
})

const auth = useAuth()

const toggleBoxFilters = ref(false)
const screenWidth = ref(window.innerWidth)
// Check if screen width is at least 768px and set toggleBoxFilters
const checkScreenWidth = () => {
  toggleBoxFilters.value = screenWidth.value >= 768
}
// Initial check
checkScreenWidth()
// Add event listener for window resize
onMounted(() => {
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
    checkScreenWidth()
  })
})
// Remove event listener when component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    screenWidth.value = window.innerWidth
    checkScreenWidth()
  })
})
// Watch for screenWidth changes
watch(screenWidth, () => {
  checkScreenWidth()
})

interface recordModal {
  [key: string]: boolean
}
const modalActive = ref<recordModal>({
  modalStatusAddLeave: false,
  modalStatusEditLeave: false,
  modalStatusConfirm: false,
  modalWorkExplain: false
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
    title: 'Họ và tên',
    hasSort: false
  },
  {
    title: 'Ngày làm việc',
    hasSort: false
  },
  {
    title: 'Giờ vào',
    hasSort: false
  },
  {
    title: 'Giờ ra',
    hasSort: false
  },
  // {
  //   title: 'Loại vi phạm',
  //   hasSort: false
  // },
  {
    title: 'Trang thái',
    hasSort: false
  },
  {
    title: 'Lý do',
    hasSort: false
  }
])

interface typeparamsWorkExplain {
  begin_date: string
  finish_date: string
  name: string
  status: string
}
const paramsWorkExplain = reactive<typeparamsWorkExplain>({
  begin_date: '',
  finish_date: '',
  name: '',
  status: ''
})

const datepicker = ref<any | null>(null)
const startDate = new Date(new Date().setDate(new Date().getDate() - 30))
const endDate = new Date()
datepicker.value = [startDate, endDate]
paramsWorkExplain.begin_date = format(startDate, 'yyyy-MM-dd')
paramsWorkExplain.finish_date = format(endDate, 'yyyy-MM-dd')
const updateDates = () => {
  if (datepicker.value) {
    paramsWorkExplain.begin_date = format(datepicker.value[0], 'yyyy-MM-dd')
    paramsWorkExplain.finish_date = format(datepicker.value[1], 'yyyy-MM-dd')
  }
}
watch(datepicker, () => {
  if (auth.check()) {
    updateDates()
  }
})

watch(
  () => paramsWorkExplain.status,
  () => {
    if (paramsWorkExplain.status === 'all') paramsWorkExplain.status = ''
  }
)

const paginate = reactive({
  page: 1,
  per_page: 20
})
const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataWorkExplain = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...paramsWorkExplain,
      page: paginate.page,
      per_page: paginate.per_page
    }

    doFetch(
      `${apiUri}/work/explanation?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
      auth.token() as string
    ).then(() => {
      // console.log('🚀 ~ fetchDataWorkExplain ~ res:', res)
      tableMagic()
    })
  }, 300)
}

const handlePageChange = (pageNum: number) => {
  // console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
  paginate.page = pageNum
  fetchDataWorkExplain()
}

const handleSearchWorkExplain = async () => {
  try {
    const formData = new FormData()
    formData.append('begin_date', paramsWorkExplain.begin_date)
    formData.append('finish_date', paramsWorkExplain.finish_date)
    formData.append('name', paramsWorkExplain.name)
    formData.append('status', paramsWorkExplain.status)

    const res = await axios.post(`${apiUri}/work/explanation`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    fetchDataWorkExplain()
    console.log('🚀 ~ handleSearchWorkExplain ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ handleSearchWorkExplain ~ error:', error)
  }
}

const dataUserExplain = ref<any | null>(null)
const handleUserExplain = async (id: string) => {
  try {
    dataUserExplain.value = dataWorkExplain.doc?.items?.find(
      (item) => item.id === id
    )
    console.log(
      '🚀 ~ handleUserExplain ~ dataUserExplain.value:',
      dataUserExplain.value
    )
    toggleModal('modalWorkExplain')
  } catch (error) {
    console.log('🚀 ~ handleUserExplain ~ error:', error)
  }
}

const explainItem = ref<any | null>(null)
const radioStateSingle = ref('0')
const handlePostApprove = async (id: number) => {
  if (!radioStateSingle.value) return

  try {
    await radioStateSingle.value
    const formData = new FormData()
    formData.append('id', id.toString())
    formData.append('status', radioStateSingle.value)

    const response = await axios
      .post(`${apiUri}/work/status`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`
        }
      })
      .then((res) => {
        if (dataWorkExplain.doc && dataWorkExplain.doc.items) {
          explainItem.value = dataWorkExplain.doc.items.find(
            (item) => item.id === id
          )
          if (!explainItem.value) return

          explainItem.value.status =
            radioStateSingle.value === '1'
              ? 'Đã phê duyệt'
              : radioStateSingle.value === '2'
                ? 'Đã từ chối'
                : 'Chờ phê duyệt'
        }

        console.log('🚀 ~ handlePostApprove ~ res:', res.data.message)
      })
      .then(() => {
        tableMagic()
      })
  } catch (error) {
    console.log('🚀 ~ handlePostApprove ~ error:', error)
  }
}

const { data, doFetch } = useWork()

const dataWorkExplain = reactive({
  doc: data
})

const dataTotalPages = computed(() =>
  Math.ceil(
    Number(dataWorkExplain.doc?.pagination?.total) / Number(paginate.per_page)
  )
)

const dataPostRequest = ref<any | null>(null)
const getPostRequest = (data: any) => {
  dataPostRequest.value = data
  if (dataPostRequest.value) toast.toastA = true
  if (dataPostRequest.value.status === 1) toggleModal('modalWorkExplain')
}

const activeDropdownId = ref(null)
const toggleDropdown = (id: any) => {
  if (activeDropdownId.value === id) {
    activeDropdownId.value = null
  } else {
    activeDropdownId.value = id
  }
}
onMounted(() => {
  document.addEventListener('click', () => {
    activeDropdownId.value = null
  })
})
onUnmounted(() => {
  document.removeEventListener('click', () => {
    activeDropdownId.value = null
  })
})

const permissionStore = usePermissionStore()
const { permissionList } = storeToRefs(permissionStore)
const { checkPermission } = permissionStore

watch(permissionList, () => {
  console.log('🚀 ~ //onMounted ~ permissionList:', permissionList)
  if (auth.check()) {
    if (!permissionList.value.includes('Document')) {
      alert('Bạn không có quyền truy cập vào trang này')
      router.push({ name: 'NotFound404' })
    } else {
      fetchDataWorkExplain()
      console.log(dataWorkExplain, 'dataWorkExplain')
    }
  }
})

watch(
  paginate,
  async () => {
    fetchDataWorkExplain()
  },
  {
    // must pass deep option to watch for changes on object properties
    deep: true,
    // can also pass immediate to handle that first request AND when queries change
    immediate: true
  }
)

onMounted(() => {
  if (auth.check()) {
    fetchDataWorkExplain()
  }
})
</script>

<style lang="scss">
.work-history-datepicker {
  .dp__input {
    border-radius: 24px;
  }
}
</style>
