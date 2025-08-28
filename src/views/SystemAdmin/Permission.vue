<template>
  <MainLayout>
    <Breadcrums name="Quản lý phân quyền" path="/system/permission" />

    <template v-if="toggleBoxFilters">
      <div class="mb-5 max-w-[552px] rounded-[24px] bg-white p-2.5">
        <form class="flex flex-wrap gap-4" @submit.prevent="handleSearchPermission">
          <div class="flex grow flex-wrap items-stretch gap-4">
            <div class="flex-[100%]">
              <div class="relative">
                <input
                  id=""
                  v-model="params.name"
                  type="text"
                  name=""
                  placeholder="Nhập chức vụ"
                  class="font-inter block w-full rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] focus:outline-none max-md:text-[14px]"
                />

                <button
                  v-if="params.name"
                  type="button"
                  class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  @click="() => (params.name = '')"
                >
                  <Icon icon="radix-icons:cross-1" class="h-3.5 w-3.5" />
                </button>
              </div>
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
        Danh sách phân quyền
      </div>
    </div>

    <template v-if="checkPermission('Permission', 'List')">
      <div class="flex h-full flex-col">
        <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
          <div class="table-container relative">
            <!-- Example column -->
            <div id="tableRowHeader" class="header table-row justify-between">
              <div v-for="(column, index) in tbhead" :key="index" class="cell">
                {{ column.title }}

                <div v-if="column.hasSort" class="tb-sort">
                  <button type="button">
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="cell pinned !pr-2">
                <div class="cell edit">Thao tác</div>
              </div>
            </div>

            <!-- Example row -->
            <div id="tableRowBody" class="body table-row">
              <template v-if="dataPermission.doc">
                <div v-for="(it, index) in dataPermission.doc" :key="index" class="table-item justify-between">
                  <!-- bg-blue , bg-green , bg-red , bg-purple , :class="{ 'bg-blue': id === 1 }"-->
                  <div class="cell">
                    <template v-if="Number(index) < 9"> 0{{ Number(index) + 1 }} </template>
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
                    <div class="cell edit edit-body justify-center">
                      <template v-if="checkPermission('Permission', 'Update')">
                        <button
                          type="button"
                          class="cell-btn-edit shrink-0 cursor-pointer"
                          @click="handleEditPermission(it.name)"
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
      :modal-active="modalActive.modalEditPermission"
      max-width="max-w-[670px]"
      @close="toggleModal('modalEditPermission')"
    >
      <div class="relative overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">chỉnh sửa nhóm quyền</h3>
        </div>

        <ModalEditPermission
          :datatype="dataEditPermission"
          :user-permission="permissionListData"
          :prop-function="fetchDataPermission"
          @post-request="getPostRequest"
        >
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
            @click="toggleModal('modalEditPermission')"
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
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]],
          'bg-[#c4ffd0]': dataPostRequest?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataPostRequest?.message }}
        </ToastTitle>
        <ToastDescription v-if="dataPostRequest?.errors" class="text-[11px] font-normal">
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
  import { Icon } from '@iconify/vue'
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
  import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import ModalEditPermission from '@/components/Modal/ModalEditPermission.vue'
  import Modal from '@/components/Modals.vue'
  import { usePermission } from '@/composables/permission'
  import { apiUri } from '@/constants/apiUri'
  import router from '@/router'
  import { usePermissionStore } from '@/store/permission'
  import { tableMagic } from '@/utils/main'

  import MainLayout from '../MainLayout.vue'

  const toast = reactive({
    toastCreate: false,
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
    modalStatusEditPermission: false,
  })

  const toggleModal = (modalStateName: any) => {
    modalActive.value[modalStateName] = !modalActive.value[modalStateName]
  }

  const tbhead = reactive([
    {
      title: 'STT',
      hasSort: false,
    },
    {
      title: 'Chức vụ',
      hasSort: false,
    },
    {
      title: 'Mô tả',
      hasSort: false,
    },
    // {
    //   title: 'Ngày cập nhật',
    //   hasSort: true
    // }
  ])

  const params = reactive<any | null>({
    name: '',
  })

  const debounceTime = ref<{
    timeOut: number | null
    counter: number
  }>({
    timeOut: null,
    counter: 0,
  })

  const fetchDataPermission = () => {
    if (debounceTime.value.timeOut !== null) {
      clearTimeout(debounceTime.value.timeOut)
    }

    debounceTime.value.timeOut = setTimeout(() => {
      const res = {
        ...params,
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
          Authorization: `Bearer ${auth.token()}`,
        },
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
          'Content-Type': 'multipart/form-data',
        },
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
    doc: data,
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
