<template>
  <MainLayout>
    <Breadcrums name="Lịch sử chấm công" path="/timekeeping/history" />

    <template v-if="toggleBoxFilters">
      <div class="bg-white rounded-[24px] mb-5 p-2.5">
        <form
          class="flex flex-wrap gap-4"
          @submit.prevent="handleSearchWorkHistory"
        >
          <div class="flex flex-wrap items-stretch gap-2 xxl:gap-4 grow">
            <div
              class="flex-[0_0_calc((100%-16px)/2)] max-md:flex-[0_0_calc(100%)] max-md:w-[calc(100%)] max-lg:flex-[0_0_calc(50%-4px)] max-lg:w-[calc(50%-4px)]"
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

              <SelectRoot v-model="paramsWorkHistory.name">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[6px_12px] h-full focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[15px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Tên nhân viên"
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
                          <SelectItemText> Tất cả nhân viên </SelectItemText>
                        </SelectItem>

                        <template
                          v-for="(item, index) in dataUserMCC.items"
                          :key="item.user_id"
                        >
                          <SelectItem
                            class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                            :value="String(item)"
                          >
                            <SelectItemText>
                              {{ item }}
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
              class="flex-[0_0_calc((100%-16px)/2)] max-md:flex-[0_0_calc(100%)] max-md:w-[calc(100%)] max-lg:flex-[0_0_calc(50%-4px)] max-lg:w-[calc(50%-4px)]"
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
        <Icon icon="lsicon:filter-outline" class="p-1.5 w-full h-full" />
      </button>
      <div
        class="hidden md:block flex-[1] max-md:text-[16px] text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Thông tin chấm công
      </div>
    </div>

    <template v-if="checkPermission('Work', 'List')">
      <div class="flex flex-col h-full overflow-hidden">
        <div id="tableMagic" class="table-magic styleTableMagic !mb-0">
          <div class="relative table-container">
            <!-- Example column -->
            <div
              id="tableRowHeader"
              class="justify-between table-row !ps-5 header"
            >
              <div class="cell" v-for="(column, index) in tbhead" :key="index">
                {{ column.title }}

                <div class="tb-sort" v-if="column.hasSort">
                  <button type="button">
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>

              <template v-if="checkPermission('Work', 'Create')">
                <div class="cell pinned !py-4.5 !pe-2.5">Giải trình</div>
              </template>
            </div>

            <template v-if="dataWorkHistoryList">
              <div id="tableRowBody" class="table-row body">
                <template
                  v-for="(item, index) in dataWorkHistoryList"
                  :key="index"
                >
                  <div
                    class="justify-between table-item !ps-5"
                    v-for="(it, itIndex) in item.values"
                    :key="itIndex"
                  >
                    <!-- <div class="cell">
                      <template v-if="index < 9"> 0{{ index + 1 }} </template>
                      <template v-else>{{ index + 1 }}</template>
                    </div> -->

                    <div class="cell">{{ index + 1 }}-{{ itIndex + 1 }}</div>

                    <div class="cell">
                      {{ it?.user_name }}
                    </div>

                    <div class="cell">
                      {{ it?.work_date }}
                    </div>

                    <div class="cell">
                      {{ it?.check_in }}
                    </div>

                    <div class="cell">
                      {{ it?.check_out }}
                    </div>

                    <div class="cell">
                      {{ it?.total_hours }}
                    </div>

                    <template v-if="checkPermission('Work', 'Create')">
                      <div
                        class="justify-center cell pinned pinned-body !pe-2.5"
                      >
                        <button
                          @click="handleUserExplain(it.user_id, it.work_date)"
                          type="button"
                          class="cursor-pointer cell-btn-edit shrink-0"
                        >
                          <img src="@/assets/images/action-edit-2.svg" alt="" />
                        </button>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>

    <Modal
      @close="toggleModal('modalAddWorkHistory')"
      :modalActive="modalActive.modalAddWorkHistory"
      maxWidth="max-w-[670px]"
    >
      <div class="rounded-[24px] p-[52px_24px_36px] bg-white overflow-hidden">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
            Lý do
          </h3>
        </div>

        <ModalAddWorkHistory
          :datatype="dataUserExplain"
          :propFunction="fetchDataWorkHistory"
          @post-request="getPostRequest"
        >
          <button
            @click="toggleModal('modalAddWorkHistory')"
            type="button"
            class="max-md:grow inline-block md:min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
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
        class="flex flex-col gap-1.5 p-3 rounded-md shadow-2xl"
        :class="{
          'bg-[#ffd0d0]':
            dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]],
          'bg-[#c4ffd0]': dataPostRequest?.status === 1
        }"
      >
        <ToastTitle class="font-medium text-[13px]">
          {{ dataPostRequest?.message }}
        </ToastTitle>
        <ToastDescription
          class="font-normal text-[11px]"
          v-if="
            dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]]
          "
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
import MainLayout from '@/views/MainLayout.vue'
import Breadcrums from '@/components/BreadcrumsNew.vue'
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  onBeforeUnmount
} from 'vue'
import Modal from '@/components/Modals.vue'
import { Icon } from '@iconify/vue'
import { useAuth } from 'vue-auth3'
import axios from 'axios'
import { apiUri } from '@/constants/apiUri'
import { tableMagic } from '@/utils/main'
import ModalAddWorkHistory from '@/components/Modal/ModalAddWorkHistory.vue'
import { usePermissionStore } from '@/store/permission'
import { storeToRefs } from 'pinia'
import router from '@/router'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { vi } from 'date-fns/locale/vi'
import { format } from 'date-fns'
import { useWork } from '@/composables/work'
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
  modalAddWorkHistory: false
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
  {
    title: 'Giờ làm việc',
    hasSort: false
  }
])

interface typeParamsWorkHistory {
  begin_date: string
  finish_date: string
  name: string
}
const paramsWorkHistory = reactive<typeParamsWorkHistory>({
  begin_date: '',
  finish_date: '',
  name: ''
})

const datepicker = ref<any | null>(null)
const startDate = new Date(new Date().setDate(1))
const endDate = new Date()
datepicker.value = [startDate, endDate]
paramsWorkHistory.begin_date = format(startDate, 'yyyy-MM-dd')
paramsWorkHistory.finish_date = format(endDate, 'yyyy-MM-dd')
const updateDates = () => {
  if (datepicker.value) {
    paramsWorkHistory.begin_date = format(datepicker.value[0], 'yyyy-MM-dd')
    paramsWorkHistory.finish_date = format(datepicker.value[1], 'yyyy-MM-dd')
  }
}
watch(datepicker, () => {
  if (auth.check()) {
    updateDates()
  }
})

const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataWorkHistory = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...paramsWorkHistory
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

const dataUserMCC = reactive({
  items: []
})
const fetchDataUserMCC = async () => {
  const res = await axios.get(`${apiUri}/work/usermcc`, {
    headers: {
      Authorization: `Bearer ${auth.token()}`,
      'Content-Type': 'application/json'
    }
  })
  const { items } = res.data.data
  dataUserMCC.items = Object.values(items)
}

const handleSearchWorkHistory = async () => {
  try {
    const formData = new FormData()
    formData.append('begin_date', paramsWorkHistory.begin_date)
    formData.append('finish_date', paramsWorkHistory.finish_date)
    formData.append('name', paramsWorkHistory.name)

    const res = await axios.post(`${apiUri}/work/list`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    fetchDataWorkHistory()
    console.log('🚀 ~ handleSearchWorkHistory ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ handleSearchWorkHistory ~ error:', error)
  }
}

const dataUserExplain = ref<any | null>(null)
const handleUserExplain = async (id: string, date: string) => {
  try {
    dataUserExplain.value = dataWorkHistory.doc?.items?.[Number(id)]?.[date]
    console.log(
      '🚀 ~ handleUserExplain ~ dataUserExplain.value:',
      dataUserExplain.value
    )
    toggleModal('modalAddWorkHistory')
  } catch (error) {
    console.log('🚀 ~ handleUserExplain ~ error:', error)
  }
}

const { data, doFetch } = useWork()

const dataWorkHistory = reactive({
  doc: data
})

interface WorkHistoryItem {
  user_id: string
  user_name: string
  work_date: string
  check_out: string
  check_in: string
  total_hours: string
  finish_date?: string
  reason?: string
  total_date?: string
  status?: string
  id: string
}

const dataWorkHistoryList = computed(() => {
  if (!dataWorkHistory.doc?.items) return []

  return Object.entries(dataWorkHistory.doc.items).map(([key, values]) => ({
    values: Object.values(values) as WorkHistoryItem[]
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
    if (!permissionList.value.includes('Document')) {
      alert('Bạn không có quyền truy cập vào trang này')
      router.push({ name: 'NotFound404' })
    } else {
      fetchDataWorkHistory()
      console.log(dataWorkHistory, 'dataWorkHistory')
    }
  }
})

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
</style>
