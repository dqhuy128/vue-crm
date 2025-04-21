<template>
  <form action="" @submit.prevent="submit">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Loại tài liệu *
          </span>
          <select
            v-model="FormSubmit.docCate"
            class="border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal w-full"
          >
            <template
              v-for="(item, index) in categoryDocument.data"
              :key="index"
            >
              <option :value="item.id">
                {{ item.name }}
              </option>
            </template>
          </select>
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
            v-model="FormSubmit.name"
          />
        </div>
      </div>
      <div class="col-span-12">
        <FileUpload
          @change="onFileChange"
          :multiple="false"
          :accept="[
            'application/vnd.ms-excel',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ]"
        >
          <div>
            <div class="file-upload">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2183 17.7371C6.36563 18.6532 3.5 22.1174 3.5 26.25C3.5 31.0826 7.41738 35 12.25 35C13.0786 35 13.881 34.8845 14.6414 34.6693M31.5481 17.7371C35.4008 18.6532 38.2655 22.1174 38.2655 26.25C38.2655 31.0826 34.3481 35 29.5155 35C28.6869 35 27.8845 34.8845 27.125 34.6693M31.5 17.5C31.5 11.7014 26.7986 7 21 7C15.2014 7 10.5 11.7014 10.5 17.5M14.9319 24.3959L21 18.3085L27.2405 24.5M21 33.25V21.4042"
                  stroke="#013878"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="file-upload-txt">Kéo thả tệp vào đây</span>
              <i>hoặc</i>
              <span class="file-upload-link">Chọn tệp tại đây</span>
            </div>

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
            v-model="FormSubmit.description"
            placeholder="Nhập mô tả"
            class="w-full border min-h-[120px] border-solid border-[#161616] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div
      class="flex flex-wrap items-stretch justify-center gap-4 text-center mt-9 xl:gap-6"
    >
      <slot></slot>
      <button
        type="submit"
        class="max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
      >
        Lưu
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useDocument } from '@/composables/document'
import { apiUri } from '@/constants/apiUri'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useAuth } from 'vue-auth3'
// import 'vue-multiselect/dist/vue-multiselect.min.css'
import { tableMagic } from '@/utils/main'
import FileUpload from '../FileUpload.vue'
const props = defineProps<{
  closeModal: () => void
}>()

type previewFiles = {
  name: string
  path: string
  file: File
}
const fileUploadPreview = ref<previewFiles[]>([])
const FormSubmit = ref({
  name: null,
  description: '',
  docCate: null
})
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
const auth = useAuth()

const { doFetch, fetchCategoryDocument, categories } = useDocument()

const categoryDocument = reactive({
  data: categories.value || undefined
})

const submit = async () => {
  if (FormSubmit.value.name === null) {
    alert('Vui lòng nhập tên tài liệu')
    return
  }
  const formData = new FormData()
  formData.append('name', FormSubmit.value.name || '')

  formData.append('type_id', FormSubmit.value.docCate || '')
  formData.append('description', FormSubmit.value.description)
  if (fileUploadPreview.value.length > 0) {
    fileUploadPreview.value.forEach((item) => {
      formData.append('files', item.file)
    })
  }
  console.log(FormSubmit.value, 'formData')
  // return ;
  const response = await axios
    .post(`${apiUri}/document/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token()}`
      }
    })
    .then(function (res) {
      // successful response flow
      FormSubmit.value.docCate = null
      fileUploadPreview.value = []
      props.closeModal()
      doFetch(
        `${apiUri}/document/list?page=1&per_page=10`,
        auth.token() as string
      ).then(() => {
        tableMagic()
      })
    })
    .catch(function (error) {
      alert('Tạo tài liệu thất bại')
    })

  console.log('🚀 ~ submit ~ response:', response)
}

onMounted(() => {
  auth.load().then(() => {
    if (auth.check() && categories.value.length === 0) {
      fetchCategoryDocument()
    }
  })
})
</script>

<style lang="scss" scoped>
.file-upload {
  width: 100%;
  min-width: 100%;
  min-height: 240px;
  border: 1px dashed #464661;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fbfbfb;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #464661;
  gap: 12px;
}
.file-upload-txt {
  font-weight: 600;
}
.file-upload-link {
  color : #1B4DEA ;
  text-decoration: underline;
}
</style>
