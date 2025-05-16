<template>
  <MainLayout>
    <Breadcrums name="Quản lý phân quyền" path="/system/permission" />

    <template v-if="toggleBoxFilters">
      <div class="bg-white rounded-[24px] p-2.5 max-w-[552px] mb-5">
        <form
          class="flex flex-wrap gap-4"
          @submit.prevent="handleSearchPermission"
        >
          <div class="flex flex-wrap items-stretch gap-4 grow">
            <div class="flex-[100%]">
              <div class="relative">
                <input
                  v-model="params.name"
                  type="text"
                  name=""
                  id=""
                  placeholder="Nhập chức vụ"
                  class="block w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[6px_12px] text-[#000] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal focus:outline-none"
                />

                <button
                  v-if="params.name"
                  type="button"
                  class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-3"
                  @click="() => (params.name = '')"
                >
                  <Icon icon="radix-icons:cross-1" class="w-3.5 h-3.5" />
                </button>
              </div>
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
        Danh sách phân quyền
      </div>
    </div>

    <template v-if="checkPermission('Permission', 'List')">
      <div class="flex flex-col h-full overflow-hidden">
        <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
          <div class="relative table-container">
            <!-- Example column -->
            <div id="tableRowHeader" class="justify-between table-row header">
              <div class="cell" v-for="(column, index) in tbhead" :key="index">
                {{ column.title }}

                <div class="tb-sort" v-if="column.hasSort">
                  <button type="button">
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="!pr-2 cell pinned">
                <div class="cell edit">Thao tác</div>
              </div>
            </div>

            <!-- Example row -->
            <div id="tableRowBody" class="table-row body">
              <template v-if="dataPermission.doc">
                <div
                  class="justify-between table-item"
                  v-for="(it, index) in dataPermission.doc"
                  :key="index"
                >
                  <!-- bg-blue , bg-green , bg-red , bg-purple , :class="{ 'bg-blue': id === 1 }"-->
                  <div class="cell">
                    <template v-if="Number(index) < 9">
                      0{{ Number(index) + 1 }}
                    </template>
                    <template v-else>{{ Number(index) + 1 }}</template>
                  </div>

                  <div class="cell">
                    {{ it.name }}
                  </div>

                  <div class="cell">
                    {{ it.description }}
                  </div>

                  <!-- <div class="cell"></div> -->

                  <div class="cell pinned pinned-body">
                    <div class="justify-center cell edit edit-body">
                      <template v-if="checkPermission('Permission', 'Update')">
                        <button
                          @click="handleEditPermission(it.name)"
                          type="button"
                          class="cursor-pointer cell-btn-edit shrink-0"
                        >
                          <img src="@/assets/images/action-edit-2.svg" alt="" />
                        </button>
                      </template>

                      <!-- <template v-if="checkPermission('Leave', 'Delete')">
                        <button
                          @click="confirmDeleteLeave(it.id)"
                          type="button"
                          class="cursor-pointer cell-btn-delete shrink-0"
                        >
                          <img src="@/assets/images/action-edit-3.svg" alt="" />
                        </button>
                      </template> -->
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>

    <Modal
      @close="toggleModal('modalEditPermission')"
      :modalActive="modalActive.modalEditPermission"
      maxWidth="max-w-[670px]"
    >
      <div
        class="relative rounded-[24px] p-[52px_24px_36px] bg-white overflow-hidden"
      >
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
            chỉnh sửa nhóm quyền
          </h3>
        </div>

        <ModalEditPermission
          :datatype="dataEditPermission"
          :userPermission="permissionListData"
          :propFunction="fetchDataPermission"
          @post-request="getPostRequest"
        >
          <button
            @click="toggleModal('modalEditPermission')"
            type="button"
            class="max-md:grow inline-block md:min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
          >
            Hủy
          </button>
        </ModalEditPermission>
      </div>
    </Modal>

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastCreate"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md shadow-2xl p-3"
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
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  onBeforeUnmount
} from 'vue'
import { Icon } from '@iconify/vue'
import MainLayout from '../MainLayout.vue'
import Modal from '@/components/Modals.vue'
import { useAuth } from 'vue-auth3'
import axios from 'axios'
import { apiUri } from '@/constants/apiUri'
import { tableMagic } from '@/utils/main'
import ModalEditPermission from '@/components/Modal/ModalEditPermission.vue'
import { usePermissionStore } from '@/store/permission'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { usePermission } from '@/composables/permission'
import Breadcrums from '@/components/BreadcrumsNew.vue'
import {
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport
} from 'radix-vue'

const toast = reactive({
  toastCreate: false
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
  modalEditPermission: false,
  modalStatusEditPermission: false
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
    title: 'Chức vụ',
    hasSort: false
  },
  {
    title: 'Mô tả',
    hasSort: false
  }
  // {
  //   title: 'Ngày cập nhật',
  //   hasSort: true
  // }
])

const params = reactive<any | null>({
  name: ''
})

const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataPermission = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...params
    }

    doFetch(
      `${apiUri}/permission/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
      auth.token() as string
    ).then(() => {
      // console.log('🚀 ~ fetchdataPermission ~ res:', res)
      tableMagic()
    })
  }, 300)
}

const dataEditPermission = ref<any | null>(null)
const handleEditPermission = async (name: string) => {
  try {
    const response = await axios.get(`${apiUri}/permission/list?name=${name}`, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })

    const { data } = response.data
    dataEditPermission.value = data

    // console.log(
    //   '🚀 ~ handleEditPermission ~ dataEditPermission:',
    //   dataEditPermission.value
    // )
  } catch (error) {
    console.log('🚀 ~ handleEditPermission ~ error:', error)
  } finally {
    toggleModal('modalEditPermission')
    // fetchDataPermission()
  }
}

const handleSearchPermission = async () => {
  try {
    const formData = new FormData()
    formData.append('name', params.name)

    const response = await axios.post(`${apiUri}/permission/list`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token()}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('🚀 ~ handleSearchPermission ~ response:', response)
  } catch (error) {
    console.log('🚀 ~ handleSearchPermission ~ error:', error)
  } finally {
    fetchDataPermission()
  }
}

const { data, doFetch } = usePermission()

const dataPermission = reactive({
  doc: data
})

const dataPostRequest = ref<any | null>(null)
const getPostRequest = (data: any) => {
  dataPostRequest.value = data
  if (dataPostRequest.value) {
    toggleModal('modalEditPermission')
    toast.toastCreate = true
  }
  // if (dataPostRequest.value.status === 1) toggleModal('modalAddLeave')
}

const permissionStore = usePermissionStore()
const { permissionList, permissionListData } = storeToRefs(permissionStore)
const { checkPermission } = permissionStore

watch(permissionList, () => {
  // console.log('🚀 ~ onMounted ~ permissionList:', permissionList)
  if (auth.check()) {
    if (!permissionList.value.includes('Document')) {
      alert('Bạn không có quyền truy cập vào trang này')
      router.push({ name: 'NotFound404' })
    } else {
      fetchDataPermission()
      // console.log(dataPermission, 'dataPermission')
    }
  }
})

watch(
  () => params.name,
  () => {
    if (params.name == '' || params.name == null) {
      fetchDataPermission()
    }
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  if (auth.check()) {
    fetchDataPermission()
  }
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
