<script lang="ts" setup>
  import { Icon } from '@iconify/vue'
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
  import { RadioGroupItem, RadioGroupRoot } from 'radix-vue'
  import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import ModalAddOvertime from '@/components/Modal/ModalAddOvertime.vue'
  import ModalUpdateOvertime from '@/components/Modal/ModalUpdateOvertime.vue'
  import Modal from '@/components/Modals.vue'
  import SkeletonTable from '@/components/SkeletonTable.vue'
  import { useSystemManager } from '@/composables/system-manager'
  import { apiUri } from '@/constants/apiUri'
  import router from '@/router'
  import { usePermissionStore } from '@/store/permission'
  import { tableMagic } from '@/utils/main'

  import MainLayout from '../MainLayout.vue'

  const toast = reactive({
    toastCreate: false,
    toastUpdate: false,
    toastDelete: false,
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
    modalAddCateManager: false,
    modalEditCateManager: false,
    modalStatusAdd: false,
    modalStatusEdit: false,
    modalStatusConfirm: false,
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
      hasSort: false,
      visible: true,
    },
    {
      title: 'Họ và tên',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Ngày tăng ca',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Thời gian tăng ca',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Lý do nghỉ',
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

  const auth = useAuth()

  const params = reactive({
    type: '',
    name: '',
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

  const fetchDataOvertime = () => {
    if (debounceTime.value.timeOut !== null) {
      clearTimeout(debounceTime.value.timeOut)
    }

    debounceTime.value.timeOut = setTimeout(() => {
      const res = {
        ...params,
        page: paginate.page,
        per_page: paginate.per_page,
      }

      doFetch(
        `${apiUri}/orvertime/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
        auth.token() as string
      ).then(() => {
        console.log('🚀 ~ fetchDataOvertime ~ res:', res)
        tableMagic()
      })
    }, 300)
  }

  const handlePageChange = (pageNum: number) => {
    // console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
    paginate.page = pageNum
    fetchDataOvertime()
  }

  const overtimeToDelete = ref<any | null>(null)
  const confirmDeleteOvertime = (id: number) => {
    toggleModal('modalStatusConfirm')
    overtimeToDelete.value = id.toString()
  }
  const handleDeleteOvertime = async () => {
    if (!overtimeToDelete.value) return

    try {
      const formData = new FormData()
      formData.append('id', overtimeToDelete.value)

      const response = await axios.post(`${apiUri}/orvertime/delete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      toggleModal('modalStatusConfirm')
      fetchDataOvertime()
      dataPostRequestDelete.value = response.data
      toast.toastDelete = true
      // console.log('🚀 ~ handleDeleteCategory ~ response:', response)
    } catch (error) {
      console.log('🚀 ~ handleDeleteOvertime ~ error:', error)
    }
  }

  const dataDetailCategory = ref<any | null>(null)
  const getDetailCategory = async (id: any) => {
    try {
      const response = await axios.get(`${apiUri}/orvertime/detail?id=${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      toggleModal('modalEditCateManager')
      dataDetailCategory.value = response.data

      // console.log('🚀 ~ getDetailCategory ~ response:', response.data)
    } catch (error) {}
  }

  const dataPostRequest = ref<any | null>(null)
  const getPostRequest = (data: any) => {
    dataPostRequest.value = data
    if (dataPostRequest.value) {
      toggleModal('modalAddCateManager')
      toast.toastCreate = true
    }
    // if (dataPostRequest.value.status === 1) toggleModal('modalAddLeave')
  }

  const dataPostRequestEdit = ref<any | null>(null)
  const getPostRequestEdit = (data: any) => {
    dataPostRequestEdit.value = data
    if (dataPostRequestEdit.value) {
      toggleModal('modalEditCateManager')
      toast.toastUpdate = true
    }
    // if (dataPostRequestEdit.value.status === 1) toggleModal('modalEditLeave')
  }

  const dataPostRequestDelete = ref<any | null>(null)

  const handleManagerApprove = async (id: string, status: string) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('status', status)

    const res = await axios
      .post(`${apiUri}/orvertime/managerStatus`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      .then((res) => {
        fetchDataOvertime()
      })
      .catch((err) => {
        console.log('handleManagerApprove ~ err', err)
      })
  }

  const handleHumanApprove = async (id: string, status: string) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('status', status)

    const res = await axios
      .post(`${apiUri}/orvertime/humanStatus`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      .then((res) => {
        fetchDataOvertime()
      })
      .catch((err) => {
        console.log('handleHumanApprove ~ err', err)
      })
  }

  const { data, doFetch, isLoading } = useSystemManager()

  const dataOvertime = reactive({
    doc: data,
  })

  const selectData = computed(() => {
    return dataOvertime.doc?.items || []
  })

  const dataTotalPages = computed(() =>
    Math.ceil(Number(dataOvertime.doc?.pagination?.total) / Number(paginate.per_page))
  )

  // Computed property để tính toán range hiển thị pagination
  const paginationRange = computed(() => {
    const currentPage = Number(paginate.page)
    const perPage = Number(paginate.per_page)
    const total = Number(dataOvertime.doc?.pagination?.total || 0)

    const start = (currentPage - 1) * perPage + 1
    const end = Math.min(currentPage * perPage, total)

    return { start, end, total }
  })

  const activeDropdownManager = ref(null)
  const toggleDropdownManager = (id: any) => {
    if (activeDropdownManager.value === id) {
      activeDropdownManager.value = null
    } else {
      activeDropdownManager.value = id
    }
  }

  const activeDropdownHuman = ref(null)
  const toggleDropdownHuman = (id: any) => {
    if (activeDropdownHuman.value === id) {
      activeDropdownHuman.value = null
    } else {
      activeDropdownHuman.value = id
    }
  }

  const overtimeItem = ref<any | null>(null)
  const radioStateSingle = ref('0')

  const handleApproveLeave = async (id: number) => {
    if (!radioStateSingle.value) return

    try {
      await radioStateSingle.value
      const formData = new FormData()
      formData.append('id', id.toString())
      formData.append('status', radioStateSingle.value)

      const response = await axios
        .post(`${apiUri}/leave/status`, formData, {
          headers: {
            Authorization: `Bearer ${auth.token()}`,
          },
        })
        .then((res) => {
          if (dataOvertime.doc && dataOvertime.doc.items) {
            overtimeItem.value = dataOvertime.doc.items.find((item) => item.id === id)
            if (!overtimeItem.value) return

            overtimeItem.value.status =
              radioStateSingle.value === '1'
                ? 'Đã phê duyệt'
                : radioStateSingle.value === '2'
                  ? 'Đã từ chối'
                  : 'Chờ phê duyệt'
          }

          console.log('🚀 ~ handleApproveLeave ~ res:', res.data.message)
        })
        .then(() => {
          tableMagic()
        })
    } catch (error) {
      console.log('🚀 ~ handleApproveLeave ~ error:', error)
    }
  }

  onMounted(() => {
    if (auth.check()) {
      // fetchingSelected()
      fetchDataOvertime()
    }
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
        fetchDataOvertime()
        console.log(dataOvertime, 'dataOvertime')
      }
    }
  })

  watch(
    paginate,
    async () => {
      fetchDataOvertime()
    },
    {
      // must pass deep option to watch for changes on object properties
      deep: true,
      // can also pass immediate to handle that first request AND when queries change
      immediate: true,
    }
  )
</script>

<template>
  <MainLayout>
    <Breadcrums name="Tăng ca" path="/overtime" />

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
        Danh sách chờ duyệt
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
          class="absolute top-full left-0 z-[100] mt-2 w-80 rounded-[12px] border border-[#EDEDF6] bg-white shadow-lg"
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

      <template v-if="checkPermission('Orvertime', 'Create')">
        <div class="ms-auto inline-flex flex-wrap items-center gap-4">
          <button
            id="tableAdding"
            type="button"
            class="hover:shadow-hoverinset inline-flex cursor-pointer items-end justify-center gap-2 rounded-[24px] bg-[#1b4dea] p-[7px_12px] transition max-md:flex-auto max-md:items-center max-md:gap-1"
            @click="toggleModal('modalAddCateManager')"
          >
            <img src="@/assets/images/si_add-fill.svg" alt="" />
            <span class="font-inter text-[16px] leading-normal font-bold text-white max-md:text-[14px]"> Tăng ca </span>
          </button>
        </div>
      </template>
    </div>

    <template v-if="checkPermission('Orvertime', 'List')">
      <div class="flex h-full flex-col">
        <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
          <div class="table-container relative">
            <!-- Example column -->
            <div id="tableRowHeader" class="header table-row justify-between">
              <div v-for="(column, index) in tbhead" v-show="column.visible" :key="index" class="cell">
                {{ column.title }}

                <div v-if="column.hasSort" class="tb-sort">
                  <button type="button">
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="cell">Quản lý duyệt</div>
              <div class="cell">HCNS duyệt</div>

              <div class="cell pinned !p-0 !shadow-none">
                <div class="cell edit !ps-2">Edit</div>
              </div>
            </div>

            <!-- Skeleton Loading -->
            <SkeletonTable v-if="isLoading" :columns="8" :rows="10" />

            <!-- Table Data -->
            <div v-else id="tableRowBody" class="body table-row">
              <template v-if="dataOvertime.doc">
                <div v-for="(it, index) in dataOvertime.doc.items" :key="index" class="table-item justify-between">
                  <!-- bg-blue , bg-green , bg-red , bg-purple , :class="{ 'bg-blue': id === 1 }"-->
                  <div v-show="tbhead[0].visible" class="cell">
                    <template v-if="index < 9"> 0{{ index + 1 }} </template>
                    <template v-else>{{ index + 1 }}</template>
                  </div>

                  <div v-show="tbhead[1].visible" class="cell">{{ it.code }}</div>

                  <div v-show="tbhead[2].visible" class="cell">{{ it.name }}</div>

                  <div v-show="tbhead[3].visible" class="cell">{{ it.date }}</div>

                  <div v-show="tbhead[4].visible" class="cell">{{ it.begin_time }} - {{ it.finish_time }}</div>

                  <div v-show="tbhead[5].visible" class="cell reason-cell">
                    {{ it.reason }}
                  </div>

                  <div class="cell">
                    <div class="relative w-full" @click.stop="toggleDropdownManager(it.id)">
                      <!-- <template v-if="checkPermission('Overtime', 'Approval')"> -->
                      <template v-if="it.manager_status_text == 'Đã phê duyệt'">
                        <div class="status status-green status-body block w-full text-[13px]">Đã phê duyệt</div>
                      </template>

                      <template v-if="it.manager_status_text == 'Chờ phê duyệt'">
                        <div class="status status-red status-body block w-full text-[13px]">Chờ phê duyệt</div>
                      </template>

                      <template v-if="it.manager_status_text == 'Đã từ chối'">
                        <div class="status status-gray status-body block w-full text-[13px]">Không phê duyệt</div>
                      </template>
                      <!-- </template> -->

                      <div
                        class="invisible absolute right-0 left-0 z-[12] w-full opacity-0 transition"
                        :class="{
                          'visible opacity-100': activeDropdownManager === it.id,
                        }"
                      >
                        <RadioGroupRoot
                          v-model="radioStateSingle"
                          class="flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl"
                          default-value="0"
                        >
                          <template v-if="it.manager_approved">
                            <RadioGroupItem
                              :id="`r1-${it.id}`"
                              class="block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]"
                              value="1"
                              @click="handleManagerApprove(it.id, '1')"
                            >
                              <label
                                class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                                :for="`r1-${it.id}`"
                              >
                                Duyệt
                              </label>
                            </RadioGroupItem>
                            <RadioGroupItem
                              :id="`r2-${it.id}`"
                              class="block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]"
                              value="2"
                              @click="handleManagerApprove(it.id, '2')"
                            >
                              <label
                                class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                                :for="`r2-${it.id}`"
                              >
                                Không duyệt
                              </label>
                            </RadioGroupItem>
                          </template>
                        </RadioGroupRoot>
                      </div>
                    </div>
                  </div>

                  <div class="cell">
                    <div class="relative w-full" @click.stop="toggleDropdownHuman(it.id)">
                      <!-- <template v-if="checkPermission('Overtime', 'Approval')"> -->
                      <template v-if="it.human_status_text == 'Đã phê duyệt'">
                        <div class="status status-green status-body block w-full text-[13px]">Đã phê duyệt</div>
                      </template>

                      <template v-if="it.human_status_text == 'Chờ phê duyệt'">
                        <div class="status status-red status-body block w-full text-[13px]">Chờ phê duyệt</div>
                      </template>

                      <template v-if="it.human_status_text == 'Đã từ chối'">
                        <div class="status status-gray status-body block w-full text-[13px]">Không phê duyệt</div>
                      </template>
                      <!-- </template> -->

                      <div
                        class="invisible absolute right-0 left-0 z-[12] w-full opacity-0 transition"
                        :class="{
                          'visible opacity-100': activeDropdownHuman === it.id,
                        }"
                      >
                        <RadioGroupRoot
                          v-model="radioStateSingle"
                          class="flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl"
                          default-value="0"
                        >
                          <template v-if="it.human_approved">
                            <RadioGroupItem
                              :id="`r1-${it.id}`"
                              class="block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]"
                              value="1"
                              @click="handleHumanApprove(it.id, '1')"
                            >
                              <label
                                class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                                :for="`r1-${it.id}`"
                              >
                                Duyệt
                              </label>
                            </RadioGroupItem>
                            <RadioGroupItem
                              :id="`r2-${it.id}`"
                              class="block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]"
                              value="2"
                              @click="handleHumanApprove(it.id, '2')"
                            >
                              <label
                                class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                                :for="`r2-${it.id}`"
                              >
                                Không duyệt
                              </label>
                            </RadioGroupItem>
                          </template>
                        </RadioGroupRoot>
                      </div>
                    </div>
                  </div>

                  <template v-if="it.action?.length > 0">
                    <div class="cell">
                      <div class="cell edit !bg-transparent !shadow-none">
                        <template v-if="it.action?.[0]?.includes('edit')">
                          <button
                            type="button"
                            class="cell-btn-edit shrink-0 cursor-pointer"
                            @click="getDetailCategory(it.id)"
                          >
                            <img src="@/assets/images/action-edit-2.svg" alt="" />
                          </button>
                        </template>

                        <template v-if="it.action?.[0]?.includes('delete')">
                          <button
                            type="button"
                            class="cell-btn-delete shrink-0 cursor-pointer"
                            @click="confirmDeleteOvertime(it.id)"
                          >
                            <img src="@/assets/images/action-edit-3.svg" alt="" />
                          </button>
                        </template>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="cell"></div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>

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
      :modal-active="modalActive.modalAddCateManager"
      max-width="max-w-[670px]"
      @close="toggleModal('modalAddCateManager')"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">Thêm mới tăng ca</h3>
        </div>

        <ModalAddOvertime :datatype="selectData" :prop-function="fetchDataOvertime" @post-request="getPostRequest">
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
            @click="toggleModal('modalAddCateManager')"
          >
            Hủy
          </button>
        </ModalAddOvertime>
      </div>
    </Modal>

    <Modal
      :modal-active="modalActive.modalEditCateManager"
      max-width="max-w-[670px]"
      @close="toggleModal('modalEditCateManager')"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">Cập nhật tăng ca</h3>
        </div>

        <!-- :closeModal="() => toggleModal('modalEditCateManager')" -->
        <ModalUpdateOvertime
          :datatype="dataDetailCategory"
          :prop-function="fetchDataOvertime"
          @post-request-edit="getPostRequestEdit"
        >
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
            @click="toggleModal('modalEditCateManager')"
          >
            Hủy
          </button>
        </ModalUpdateOvertime>
      </div>
    </Modal>

    <Modal
      :modal-active="modalActive.modalStatusConfirm"
      max-width="max-w-[512px]"
      @close="toggleModal('modalStatusConfirm')"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-[45px_16px]">
        <div class="mb-3 text-center text-[16px] font-bold text-[#464661] uppercase">Thông báo</div>

        <div class="mb-3 text-center">
          <img class="mx-auto" src="@/assets/images/icon-park-outline_attention.svg" alt="" />
        </div>

        <div class="mx-auto mb-6 text-center text-[16px]/[26px] font-semibold text-[#464661] underline">
          Bạn chắc chắn muốn xoá danh mục này ?
        </div>

        <div class="mt-9 flex flex-wrap items-stretch justify-center gap-3 text-center xl:gap-6">
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[130px]"
            @click="toggleModal('modalStatusConfirm')"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[130px]"
            @click="handleDeleteOvertime"
          >
            Xác nhận
          </button>
        </div>
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

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastUpdate"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataPostRequestEdit?.errors[Object.keys(dataPostRequestEdit?.errors)[0]],
          'bg-[#c4ffd0]': dataPostRequestEdit?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataPostRequestEdit?.message }}
        </ToastTitle>
        <ToastDescription v-if="dataPostRequestEdit?.errors" class="text-[11px] font-normal">
          {{ dataPostRequestEdit?.errors[Object.keys(dataPostRequestEdit?.errors)[0]] }}
        </ToastDescription>
        <!-- <ToastClose aria-label="Close"><span aria-hidden>×</span></ToastClose> -->
      </ToastRoot>
      <ToastViewport
        class="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </ToastProvider>

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastDelete"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataPostRequestDelete?.errors[Object.keys(dataPostRequestDelete?.errors)[0]],
          'bg-[#c4ffd0]': dataPostRequestDelete?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataPostRequestDelete?.message }}
        </ToastTitle>
        <template v-if="dataPostRequestDelete.errors">
          <ToastDescription class="text-[11px] font-normal">
            {{ dataPostRequestDelete?.errors[Object.keys(dataPostRequestDelete?.errors)[0]] }}
          </ToastDescription>
        </template>

        <!-- <ToastClose aria-label="Close"><span aria-hidden>×</span></ToastClose> -->
      </ToastRoot>
      <ToastViewport
        class="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </ToastProvider>
  </MainLayout>
</template>

<style lang="scss">
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
      font-size: 10px !important;
      padding: 6px !important;
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

  .SelectContent {
    width: var(--radix-select-trigger-width);
    max-height: var(--radix-select-content-available-height);
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
