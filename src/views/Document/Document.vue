<template>
  <MainLayout>
    <div class="bg-white rounded-[24px] p-2.5">
      <form action="" class="flex flex-wrap items-stretch gap-4">
        <div class="grow max-lg:flex-[100%]">
          <input
            name=""
            placeholder="Nhập tên tài liệu"
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal w-full"
          />
        </div>

        <div class="select-block grow max-lg:flex-[100%]">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal"
          >
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
            <option value="">Chọn trạng thái</option>
          </select>
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

    <div class="flex flex-wrap items-center gap-2 mt-5 mb-3">
      <div
        class="flex-[1] max-md:text-[16px] text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Danh sách tài liệu
      </div>

      <div class="inline-flex flex-wrap items-center gap-4 ms-auto">
        <button
          type="button"
          id="tableAdding"
          class="max-md:flex-auto rounded-[24px] bg-[#1b4dea] inline-flex items-end justify-center max-md:items-center max-md:gap-1 gap-2 p-[7px_12px] cursor-pointer transition hover:shadow-hoverinset"
          @click="toggleModal('modalAddDocument')"
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

    <Table
      :tbhead="tbhead"
      :tbbody="tbbody"
      justify="justify-between"
      :status="false"
      :params="params"
      :handlePageChange="handlePageChange"
    >
      <button type="button" class="cursor-pointer cell-btn-view shrink-0">
        <img src="@/assets/images/action-edit-1.svg" alt="" />
      </button>
      <button type="button" class="cursor-pointer cell-btn-edit shrink-0">
        <img src="@/assets/images/action-edit-2.svg" alt="" />
      </button>
      <button type="button" class="cursor-pointer cell-btn-delete shrink-0">
        <img src="@/assets/images/action-edit-3.svg" alt="" />
      </button>
    </Table>

    <Modal
      @close="toggleModal('modalAddDocument')"
      :modalActive="modalActive.modalAddDocument"
      maxWidth="max-w-[670px]"
    >
      <div class="rounded-[24px] p-[52px_24px_36px] bg-white overflow-hidden">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
            thêm mới tài liệu
          </h3>
        </div>

        <form action="">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-6">
              <div class="block">
                <span
                  class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                >
                  Loại tài liệu *
                </span>

                <MultipleSelect
                  :options="optionsGroupUser"
                  holder="Danh mục loại ticket"
                  v-model="valueGroupUser.value1"
                />
              </div>
            </div>

            <div class="col-span-12 md:col-span-6">
              <div class="block">
                <span
                  class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                >
                  Tên tài liệu *
                </span>

                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Trợ lý"
                  class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                />
              </div>
            </div>
            <div class="col-span-12">
              <FileUpload
                @change="onFileChange"
                :multiple="true"
                :accept="['application/vnd.ms-excel']"
              >
                <div>
                  <div class="file-upload">Drop files o day</div>

                  <template v-if="fileUploadPreview">
                    <ul>
                      <li v-for="(list, index) in fileUploadPreview">
                        <p>
                          {{ list.name }}
                        </p>
                        <p>
                          {{ list.path }}
                        </p>
                      </li>
                    </ul>
                  </template>
                </div>
              </FileUpload>
            </div>
            <div class="col-span-12">
              <div class="block">
                <span
                  class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                >
                  Mô tả
                </span>
                <textarea
                  name=""
                  id=""
                  placeholder="Nhập mô tả"
                  class="w-full border min-h-[120px] border-solid border-[#161616] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
                ></textarea>
              </div>
            </div>
          </div>

          <div
            class="flex flex-wrap items-stretch justify-center gap-4 text-center mt-9 xl:gap-6"
          >
            <button
              @click="toggleModal('modalAddDocument')"
              type="button"
              class="max-md:grow inline-block md:min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </MainLayout>
</template>

<script lang="ts" setup>
import FileUpload from '@/components/FileUpload.vue'
import Modal from '@/components/Modals.vue'
import MultipleSelect from '@/components/MultiSelect.vue'
import 'flatpickr/dist/flatpickr.css'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import { reactive, ref, onMounted, watch,  } from 'vue'
import axios from 'axios'
import MainLayout from '../MainLayout.vue'
import Table from '@/components/Table.vue'
import { useAuth, useUser } from 'vue-auth3'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
const { currentRoute, push } = useRouter();
const auth = useAuth()
const isUser = reactive<{
  isAuthen: boolean
  token?: string
}>({
  isAuthen: false,
  token: null
})
const dateState = ref<Record<string, any>>({
  date1: null,
  date2: null,
  date3: null
})

const configFlatpickr = ref({
  wrap: true, // set wrap to true only when using 'input-group'
  dateFormat: 'd/m/Y',
  locale: Vietnamese // locale for this instance only
})

interface recordModal {
  [key: string]: boolean
}

const modalActive = ref<recordModal>({
  modalAddDocument: false
})

const toggleModal = (modalStateName: any) => {
  modalActive.value[modalStateName] = !modalActive.value[modalStateName]
}

interface recordSelection {
  [key: string]: any
}

const valueGroupUser = ref<recordSelection>({
  value1: null,
  value2: null,
  value3: null,
  value4: null,
  value5: null,
  value6: null
})
const optionsGroupUser = ref(['Option 1', 'Option 2', 'Option3', 'Option 4'])

const tbhead = reactive([
  {
    title: 'STT',
    hasSort: false
  },
  {
    title: 'Loại tài liệu',
    hasSort: false
  },
  {
    title: 'Tên tài liệu',
    hasSort: false
  },
  {
    title: 'Mô tả',
    hasSort: false
  },
  {
    title: 'Ngày tạo',
    hasSort: false
  }
])

const tbbody = reactive([
  {
    data: [
      { title: '01' },
      { title: 'Quy định chung' },
      { title: 'Quy định họp' },
      { title: 'Áp dụng cho QLC' },
      { title: '21/08/2024' }
    ]
  }
])

// dragable and upload file
type previewFiles = {
  name: string
  path: string
  file: File
}
const fileUploadPreview = ref<previewFiles[]>([])

const reader = new FileReader()

function setUrlFromFiles(files: FileList | File) {
  if (files instanceof File) {
    fileUploadPreview.value.push({
      file: files,
      name: files.name,
      path: reader.result as string
    })
  } else {
    const list = Array.from(files)
    list.forEach((item) => {
      const reader = new FileReader()
      fileUploadPreview.value.push({
        file: item,
        name: item.name,
        path: reader.result as string
      })
    })
  }
}

function onFileChange(files: FileList | File) {
  console.log(files)
  setUrlFromFiles(files)
}
const documents = ref([])
// const currentPage = reactive<Number>(1)
// const perPage = ref<Number>(10)
const params = reactive({
  currentPage: 1,
  perPage: 10,
  type_id: '',
  name: ''
})
const totalPage = ref(0)

const handlePageChange = (pageNum: number) => {
  console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
  params.currentPage = pageNum
  updateQueryState('page', pageNum.toString())
}

const fetchDocuments = async (token, paginate) => {
  // if (!token) return
  console.log(token, 'token')
  try {
    const response = await auth.fetch({
      method: 'get',
      url: `https://api.skygroupvn.com.vn/api/document/list?per_page=${params.perPage}&page=${params.currentPage}&type_id=${params.type_id}`,
      headers: {
        Authorization: `Bearer ${token}`
        // 'Access-Control-Allow-Credentials': 'true'
      }
    })
    documents.value = response.data.data.items
    params.currentPage = Number(response.data.data.pagination.current_page)
    params.perPage = Number(response.data.data.pagination.per_page)
    totalPage.value = Number(response.data.data.pagination.total)
  } catch (error) {
    console.error('Error fetching documents:', error)
  }
}

onMounted(() => {
  auth.load().then(() => {
    if (auth.check()) {
      // fetch some data
      const token = auth.token()
      isUser.isAuthen = true
      // fetchDocuments(token , paginate)
      isUser.token = token
      fetchDocuments(isUser.token, params)
    } else {
      isUser.isAuthen = false
      isAuthen.token = null
    }
  })
})

// watch(paginate, (newValue, oldValue) => {
//   console.log(newValue ,'paginate Newvalue');
//   console.log(oldValue ,'paginate oldValue');
//   // if (newValue.currentPage === oldValue.currentPage) return
//   fetchDocuments(isUser.token, paginate)
// })


const updateQueryState = (parameter: string, value: string) => {
  push({
    query: {
      ...currentRoute.value.query,
     [parameter]: value,
    },
  });
}
onBeforeRouteUpdate(async (to, from) => {
  // detech if params change
  fetchDocuments(isUser.token, params)
})
</script>

<style lang="scss" scoped>
@import '../../styles/table.module.scss';
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lightblue;
}
.file-upload {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: gray;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}
</style>
