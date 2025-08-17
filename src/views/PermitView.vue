<template>
  <MainLayout>
    <BreadcrumsNew name="Thông tin nghỉ phép"> Thông tin nghỉ phép </BreadcrumsNew>
    <div class="rounded-[24px] bg-white p-2.5">
      <form action="" class="flex flex-wrap items-stretch gap-4">
        <div class="select-block grow">
          <select
            id=""
            name=""
            class="font-inter rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[10px_12px] text-[16px] leading-normal font-normal text-[#909090]"
          >
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
          </select>
        </div>

        <button
          type="submit"
          class="hover:shadow-hoverinset inline-flex cursor-pointer items-center gap-2 rounded-[24px] bg-[#013878] p-[8px_16px] transition"
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
          <span class="font-inter text=[16px] leading-normal font-bold text-white"> Tìm kiếm </span>
        </button>
      </form>
    </div>

    <div class="mt-5 mb-3 flex flex-wrap items-center gap-2">
      <div class="font-inter flex-[1] text-[20px] leading-normal font-bold text-[#464661] max-md:text-[16px]">
        Danh sách nghỉ phép
      </div>

      <div class="ms-auto inline-flex flex-wrap items-center gap-4">
        <button
          id="tableAdding"
          type="button"
          class="hover:shadow-hoverinset inline-flex cursor-pointer items-end gap-2 rounded-[24px] bg-[#1b4dea] p-[7px_12px] transition"
        >
          <img src="@/assets/images/si_add-fill.svg" alt="" />
          <span class="font-inter text-[16px] leading-normal font-bold text-white"> Xin nghỉ </span>
        </button>
      </div>
    </div>

    <a-layout id="aTableUserList" class="!bg-transparent">
      <a-table :columns="columns" :data-source="dataSource">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <div
              :class="
                statusColor[
                  record.status === 'Đã duyệt' ? 'success' : record.status === 'Chưa duyệt' ? 'canceld' : 'pending'
                ] + ' inline-flex items-center rounded-3xl border px-5 py-2'
              "
            >
              {{ record.status }}
            </div>
          </template>

          <template v-if="column.dataIndex === 'actions'">
            <a-space>
              <button
                type="button"
                class="flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center rounded-full bg-[#1B4DEA]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.99996 6C8.53039 6 9.0391 6.21071 9.41417 6.58579C9.78925 6.96086 9.99996 7.46957 9.99996 8C9.99996 8.53043 9.78925 9.03914 9.41417 9.41421C9.0391 9.78929 8.53039 10 7.99996 10C7.46953 10 6.96082 9.78929 6.58575 9.41421C6.21067 9.03914 5.99996 8.53043 5.99996 8C5.99996 7.46957 6.21067 6.96086 6.58575 6.58579C6.96082 6.21071 7.46953 6 7.99996 6ZM7.99996 3C11.3333 3 14.18 5.07333 15.3333 8C14.18 10.9267 11.3333 13 7.99996 13C4.66663 13 1.81996 10.9267 0.666626 8C1.81996 5.07333 4.66663 3 7.99996 3ZM2.11996 8C2.6588 9.1002 3.4955 10.0272 4.53495 10.6755C5.57439 11.3238 6.77489 11.6675 7.99996 11.6675C9.22503 11.6675 10.4255 11.3238 11.465 10.6755C12.5044 10.0272 13.3411 9.1002 13.88 8C13.3411 6.8998 12.5044 5.97283 11.465 5.3245C10.4255 4.67616 9.22503 4.33245 7.99996 4.33245C6.77489 4.33245 5.57439 4.67616 4.53495 5.3245C3.4955 5.97283 2.6588 6.8998 2.11996 8Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center rounded-full bg-[#1BB6EA]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.25 1.74991C12.5152 1.48469 12.8749 1.33569 13.25 1.33569C13.6251 1.33569 13.9848 1.48469 14.25 1.74991C14.5152 2.01512 14.6642 2.37483 14.6642 2.74991C14.6642 3.12498 14.5152 3.48469 14.25 3.74991L8.24136 9.75924C8.08305 9.9174 7.88749 10.0332 7.67269 10.0959L5.75735 10.6559C5.69999 10.6726 5.63918 10.6736 5.58129 10.6588C5.52341 10.644 5.47057 10.6139 5.42832 10.5716C5.38607 10.5294 5.35595 10.4765 5.34112 10.4186C5.32629 10.3607 5.32729 10.2999 5.34402 10.2426L5.90402 8.32724C5.96704 8.11261 6.08304 7.91728 6.24136 7.75924L12.25 1.74991Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center rounded-full bg-[#E61B1B]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.49996 14H4.66663C4.29996 14 3.98618 13.8696 3.72529 13.6087C3.4644 13.3478 3.33374 13.0338 3.33329 12.6667V4H2.66663V2.66667H5.99996V2H9.99996V2.66667H13.3333V4H12.6666V6.86667C12.4777 6.81111 12.2584 6.76378 12.0086 6.72467C11.7588 6.68555 11.5337 6.66622 11.3333 6.66667V4H4.66663V12.6667H6.86663C6.93329 12.9 7.02218 13.1307 7.13329 13.3587C7.2444 13.5867 7.36663 13.8004 7.49996 14ZM5.99996 11.3333H6.66663C6.66663 10.6333 6.77774 10.0582 6.99996 9.608L7.33329 8.93333V5.33333H5.99996V11.3333ZM8.66663 7.5C8.85551 7.37778 9.06951 7.25556 9.30863 7.13333C9.54774 7.01111 9.77818 6.92222 9.99996 6.86667V5.33333H8.66663V7.5Z"
                    fill="white"
                  />
                  <path
                    d="M15.3333 11.6667C15.3333 12.6391 14.947 13.5718 14.2594 14.2594C13.5718 14.947 12.6391 15.3333 11.6667 15.3333C10.6942 15.3333 9.76158 14.947 9.07394 14.2594C8.38631 13.5718 8 12.6391 8 11.6667C8 10.6942 8.38631 9.76158 9.07394 9.07394C9.76158 8.38631 10.6942 8 11.6667 8C12.6391 8 13.5718 8.38631 14.2594 9.07394C14.947 9.76158 15.3333 10.6942 15.3333 11.6667ZM10.5693 10.0973C10.5067 10.0347 10.4219 9.99958 10.3333 9.99958C10.2448 9.99958 10.1599 10.0347 10.0973 10.0973C10.0347 10.1599 9.99958 10.2448 9.99958 10.3333C9.99958 10.4219 10.0347 10.5067 10.0973 10.5693L11.1953 11.6667L10.0973 12.764C10.0347 12.8266 9.99958 12.9115 9.99958 13C9.99958 13.0885 10.0347 13.1734 10.0973 13.236C10.1599 13.2986 10.2448 13.3338 10.3333 13.3338C10.4219 13.3338 10.5067 13.2986 10.5693 13.236L11.6667 12.138L12.764 13.236C12.795 13.267 12.8318 13.2916 12.8723 13.3083C12.9128 13.3251 12.9562 13.3338 13 13.3338C13.0438 13.3338 13.0872 13.3251 13.1277 13.3083C13.1682 13.2916 13.205 13.267 13.236 13.236C13.267 13.205 13.2916 13.1682 13.3083 13.1277C13.3251 13.0872 13.3338 13.0438 13.3338 13C13.3338 12.9562 13.3251 12.9128 13.3083 12.8723C13.2916 12.8318 13.267 12.795 13.236 12.764L12.138 11.6667L13.236 10.5693C13.2986 10.5067 13.3338 10.4219 13.3338 10.3333C13.3338 10.2448 13.2986 10.1599 13.236 10.0973C13.1734 10.0347 13.0885 9.99958 13 9.99958C12.9115 9.99958 12.8266 10.0347 12.764 10.0973L11.6667 11.1953L10.5693 10.0973Z"
                    fill="white"
                  />
                </svg>
              </button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-layout>
  </MainLayout>
</template>

<script lang="ts" setup>
  import type { UnwrapRef } from 'vue'
  import { reactive, ref } from 'vue'

  import BreadcrumsNew from '../components/BreadcrumsNew.vue'
  import MainLayout from './MainLayout.vue'
  interface Breadcrumb {
    name: string
    path: string
  }
  const statusColor = {
    success: 'bg-[#C4FFD0] border-[##12F13E] ',
    canceld: 'border-red-600 bg-red-300',
    pending: 'border-[#F11212] bg-[#FFC4C4]',
  }
  const breadcrumbList = ref<Breadcrumb[]>([
    {
      name: 'Nghỉ phép',
      path: '/',
    },
    {
      name: 'Thông tin nghỉ phép',
      path: '/',
    },
  ])
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
    },
    {
      title: 'Lý do nghỉ',
      dataIndex: 'reason',
    },
    {
      title: 'Buổi',
      dataIndex: 'session',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      width: 130,
    },
  ]
  interface DataItem {
    key: string
    stt: string
    startDate: string
    endDate: string
    reason: string
    session: string
    status: string
    actions: string[]
  }
  const data: DataItem[] = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      stt: `0${i}`,
      startDate: `21/08/2024`,
      endDate: `22/08/2024`,
      reason: `Việc gia đình`,
      session: '01',
      status: `${Math.floor(Math.random() * i * 2) % 3 === 0 ? 'Đã duyệt' : Math.floor(Math.random() * i * 2) % 2 === 0 ? 'Chưa duyệt' : 'Chờ phê duyệt'}`,
      actions: ['edit', 'delete', 'view'],
    })
  }

  const dataSource = ref(data)
  const editableData: UnwrapRef<Record<string, any>> = reactive({})

  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0])
  }
  const save = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
    delete editableData[key]
  }
  const cancel = (key: string) => {
    delete editableData[key]
  }

  function cloneDeep(arg0: {
    key: string
    stt: string
    startDate: string
    endDate: string
    reason: string
    session: string
    status: string
    actions: string[]
  }): any {
    throw new Error('Function not implemented.')
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
