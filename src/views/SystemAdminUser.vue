<template>
  <MainLayout>
    <div class="bg-white rounded-[24px] p-2.5">
      <form action="" class="flex flex-wrap items-stretch gap-4">
        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
            <option value="">Tên, số điện thoại</option>
          </select>
        </div>

        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Chọn nhóm người dùng</option>
            <option value="">Chọn nhóm người dùng</option>
            <option value="">Chọn nhóm người dùng</option>
          </select>
        </div>

        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Chọn bộ phận</option>
            <option value="">Chọn bộ phận</option>
            <option value="">Chọn bộ phận</option>
          </select>
        </div>

        <div class="select-block grow">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] font-normal leading-normal"
          >
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
          </select>
        </div>

        <button
          type="submit"
          class="inline-flex items-center gap-2 bg-[#013878] rounded-[24px] p-[8px_16px] transition hover:shadow-hoverinset cursor-pointer"
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

    <div class="flex flex-wrap items-center mb-3 mt-5">
      <div
        class="text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Danh sách người dùng
      </div>

      <div class="ms-auto inline-flex flex-wrap items-center gap-4">
        <button
          type="button"
          id="tableImport"
          class="inline-flex items-end gap-2 rounded-[24px] border border-solid border-[#EDEDF6] p-[7px_24px] bg-white cursor-pointer transition hover:shadow-hoverinset"
        >
          <img src="@/assets/images/bx_import.svg" alt="" />
          <span class="text-[#909090] text-[16px] font-bold leading-normal">
            Import</span
          >
        </button>

        <button
          type="button"
          id="tableExport"
          class="inline-flex items-end gap-2 rounded-[24px] border border-solid border-[#EDEDF6] p-[7px_24px] bg-white cursor-pointer transition hover:shadow-hoverinset"
        >
          <img src="@/assets/images/bx_export.svg" alt="" />
          <span class="text-[#909090] text-[16px] font-bold leading-normal"
            >Export</span
          >
        </button>

        <button
          type="button"
          id="tableAdding"
          class="rounded-[24px] bg-[#1b4dea] inline-flex items-end gap-2 p-[7px_12px] cursor-pointer transition hover:shadow-hoverinset"
        >
          <img src="@/assets/images/si_add-fill.svg" alt="" />
          <span
            class="text-white font-inter text-[16px] font-bold leading-normal"
          >
            Thêm mới
          </span>
        </button>
      </div>
    </div>

    <a-layout id="aTableUserList" class="!bg-transparent">
      <a-table :columns="columns" :data-source="dataSource">
        <template #bodyCell="{ column, text, record }">
          <template
            v-if="['name', 'age', 'address'].includes(column.dataIndex)"
          >
            <div>
              <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.key]">
                <a-typography-link @click="save(record.key)"
                  >Save</a-typography-link
                >
                <a-popconfirm
                  title="Sure to cancel?"
                  @confirm="cancel(record.key)"
                >
                  <a>Cancel</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.key)">Edit</a>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </a-layout>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from "./MainLayout.vue"
import { cloneDeep } from "lodash-es"
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"

const columns = [
  {
    title: "STT",
    dataIndex: "stt"
  },
  {
    title: "Mã NV",
    dataIndex: "manv"
  },
  {
    title: "Họ và tên",
    dataIndex: "name"
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Chức vụ",
    dataIndex: "chucvu"
  },
  {
    title: "Bộ phận",
    dataIndex: "bophan"
  },
  {
    title: "Địa điểm",
    dataIndex: "diadiem"
  },
  {
    title: "Trạng thái",
    dataIndex: "status"
  },
  {
    title: "Thao tác",
    dataIndex: "action"
  }
]
interface DataItem {
  key: string
  stt: string
  manv: string
  name: string
  phone: string
  email: string
  chucvu: string
  bophan: string
  diadiem: string
  status?: any
  action?: any
}
const data: DataItem[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    stt: `0${i}`,
    manv: `0012${i}`,
    name: `Name ${i}`,
    phone: "0906668888",
    email: "hieund@skygroup.com",
    chucvu: "Nhân viên",
    bophan: "Phòng Marketing",
    diadiem: "Hà Nội "
  })
}

const dataSource = ref(data)
const editableData: UnwrapRef<Record<string, any>> = reactive({})

const edit = (key: string) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  )
}
const save = (key: string) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  )
  delete editableData[key]
}
const cancel = (key: string) => {
  delete editableData[key]
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
