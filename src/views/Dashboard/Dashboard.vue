<template>
  <MainLayout>
    <Breadcrums name="Dashboard" />

    <div class="flex flex-col gap-4">
      <template v-if="userData">
        <div class="max-w-[745px] rounded-3xl bg-white p-2">
          <div class="flex flex-wrap items-center gap-6">
            <div
              class="h-[244px] w-full max-w-[184px] shrink-0 rounded-[14px] bg-contain bg-center bg-no-repeat"
              :style="{ backgroundImage: `url(${profilePhoto})` }"
            ></div>

            <div class="flex-1 pe-6">
              <p class="text-[16px] leading-6 text-[#1b4dea] italic">
                {{ userData?.slogan || 'Yêu tổ quốc, yêu đồng bào, học tập tốt, lao động tốt, giữ vệ sinh thật tốt' }}
              </p>

              <div class="mt-4 grid gap-y-3 border-t border-[#EDEDF6] pt-4 md:grid-cols-2">
                <div class="space-y-3 text-[#464661]">
                  <p class="text-[16px]"><span class="font-bold">Họ và tên:</span> {{ profile.name }}</p>
                  <p class="text-[16px]"><span class="font-bold">Chức danh:</span> {{ profile.position }}</p>
                  <p class="text-[16px]"><span class="font-bold">Phòng/ Khối:</span> {{ profile.department }}</p>
                </div>
                <div class="space-y-3 text-[#464661]">
                  <p class="text-[16px]"><span class="font-bold">Ngày sinh:</span> {{ profile.birthday }}</p>
                  <p class="text-[16px]"><span class="font-bold">SĐT:</span> {{ profile.phone }}</p>
                  <p class="text-[16px]"><span class="font-bold">Ngày gia nhập Cty:</span> {{ profile.joinDate }}</p>
                  <p class="text-[16px]"><span class="font-bold">Ngày kết thúc:</span> {{ profile.endDate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="grid grid-cols-12 gap-6">
        <div v-for="(item, id) in ticket" :key="id" class="col-span-12 xl:col-span-4">
          <Ticket :ticket-props="[item.icon, item.title, item.ticketList]" />
        </div>
      </div>

      <div class="flex h-full flex-col overflow-hidden">
        <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
          <div class="table-container relative">
            <!-- Example column -->
            <div id="tableRowHeader" class="header table-row justify-around !ps-5">
              <div v-for="(column, index) in tbhead" :key="index" class="cell">
                {{ column.title }}

                <div v-if="column.hasSort" class="tb-sort">
                  <button type="button">
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>

            <template v-if="dataWorkHistoryList">
              <div id="tableRowBody" class="body table-row">
                <template v-for="(item, index) in dataWorkHistoryList" :key="index">
                  <div v-for="(it, itIndex) in item.values" :key="itIndex" class="table-item justify-around !ps-5">
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
                      {{ it?.status }}
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
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
            <template
              v-if="
                dataWorkHistory.doc?.pagination?.total &&
                Number(dataWorkHistory.doc?.pagination.total) > paginate.per_page
              "
            >
              1 - {{ paginate.per_page }} trong {{ dataWorkHistory.doc?.pagination?.total || 0 }} kết quả
            </template>
            <template v-else> {{ dataWorkHistory.doc?.pagination?.total || 0 }} kết quả </template>
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
  </MainLayout>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import iconTicket3 from '@/assets/images/ticket-icon-3.png'
  import iconTicket5 from '@/assets/images/ticket-icon-5.png'
  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import Ticket from '@/components/Ticket.vue'
  import { apiUri } from '@/constants/apiUri'
  import { usePermissionStore } from '@/store/permission'
  import MainLayout from '@/views/MainLayout.vue'
  import placeholderImg from '@/assets/images/bg-placeholder.png'
  import { useWork } from '@/composables/work'
  import { tableMagic } from '@/utils/main'

  const auth = useAuth()
  const permissionData = usePermissionStore()
  const { userData } = storeToRefs(permissionData)
  const { checkPermission } = permissionData

  const dataTicket = ref<any>()
  const dataLeave = ref<any>()
  const dataWork = ref<any>()
  const fetchTicket = async () => {
    try {
      const res = await axios.get(`${apiUri}/dashboard/individual`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      const { data } = res.data
      dataTicket.value = data.ticket
      dataLeave.value = data.leave
      dataWork.value = data.work
    } catch (error) {
      console.log('🚀 ~ fetchTicket ~ error:', error)
    }
  }

  const ticket: any = [
    {
      icon: iconTicket5,
      title: 'Đề xuất chờ duyệt',
      sroute: 'SystemCategory',
      // normal , waiting , done , reject
      ticketList: [
        {
          title: 'Giải trình công',
          status: 'reject',
          count: computed(() => dataTicket.value?.deny || null),
        },
        {
          title: 'Nghỉ phép',
          status: 'done',
          count: computed(() => dataTicket.value?.done || null),
        },
        {
          title: 'Kế hoạch tăng ca',
          status: 'waiting',
          count: computed(() => dataTicket.value?.processing || null),
        },
      ],
    },
    {
      icon: iconTicket5,
      title: 'Phê duyệt cần làm',
      sroute: 'Info',
      ticketList: [
        {
          title: 'Giải trình công',
          status: 'reject',
          count: computed(() => dataTicket.value?.deny || null),
        },
        {
          title: 'Nghỉ phép',
          status: 'done',
          count: computed(() => dataTicket.value?.done || null),
        },
        {
          title: 'Kế hoạch tăng ca',
          status: 'waiting',
          count: computed(() => dataTicket.value?.processing || null),
        },
      ],
    },
    {
      icon: iconTicket3,
      title: 'Quá trình làm việc',
      sroute: 'History',
      ticketList: [
        {
          title: 'Thâm niên',
          status: 'normal',
          count: computed(() => dataTicket.value?.deny || null),
        },
        {
          title: 'Nghỉ phép còn lại',
          status: 'done',
          count: computed(() => dataTicket.value?.done || null),
        },
      ],
    },
  ]

  const dataPosition = ref<any | null>(null)
  const fetchPositionList = async () => {
    try {
      const response = await axios.get(`${apiUri}/categories/list?type=position`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      dataPosition.value = response.data.data.items
      console.log('🚀 ~ fetchPosition ~ dataPosition:', dataPosition.value)
    } catch (error) {
      console.log('🚀 ~ fetchPosition ~ error:', error)
    }
  }

  const profile = computed(() => ({
    name: userData.value?.name || userData.value?.username || '—',
    position: userData.value?.per_group_name || '—',
    department: '—',
    birthday: userData.value?.dob || '—',
    phone: userData.value?.phone || '—',
    joinDate: userData.value?.date_of_issue || '—',
    endDate: userData.value?.end_date || '—',
  }))

  const profilePhoto = computed(() => userData.value?.avatar || placeholderImg)

  // TableMagic data (cloned from History.vue, without header pinned "Giải trình")
  const tbhead = reactive([
    {
      title: 'Ngày',
      hasSort: false,
    },
    {
      title: 'Giờ đăng nhập',
      hasSort: false,
    },
    {
      title: 'Giờ đăng xuất',
      hasSort: false,
    },
    {
      title: 'Công ngày',
      hasSort: false,
    },
  ])

  interface typeParamsWorkHistory {
    begin_date: string
    finish_date: string
    name: string
  }
  const paramsWorkHistory = reactive<typeParamsWorkHistory>({
    begin_date: '',
    finish_date: '',
    name: 'all',
  })

  const paginate = reactive({
    page: 1,
    per_page: 20,
  })

  const { data, doFetch } = useWork()
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
    return Object.entries(dataWorkHistory.doc.items).map(([_, values]) => ({
      values: Object.values(values) as WorkHistoryItem[],
    }))
  })

  const handleUserExplain = (_id: string, _date: string) => {}

  const fetchDataWorkHistory = () => {
    const startDate = new Date(new Date().setDate(1))
    const endDate = new Date()
    const res = {
      ...paramsWorkHistory,
      begin_date: startDate.toISOString().slice(0, 10),
      finish_date: endDate.toISOString().slice(0, 10),
      page: paginate.page,
      per_page: paginate.per_page,
    }
    doFetch(
      `${apiUri}/work/list?${new URLSearchParams(
        Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))
      ).toString()}`,
      auth.token() as string
    ).then(() => {
      tableMagic()
    })
  }

  const dataTotalPages = computed(() =>
    Math.ceil(Number(dataWorkHistory.doc?.pagination?.total) / Number(paginate.per_page))
  )

  const handlePageChange = (pageNum: number) => {
    paginate.page = pageNum
    fetchDataWorkHistory()
  }

  watch(
    paginate,
    async () => {
      fetchDataWorkHistory()
    },
    {
      deep: true,
      immediate: true,
    }
  )

  onMounted(() => {
    fetchTicket()
    fetchPositionList()
  })
</script>
