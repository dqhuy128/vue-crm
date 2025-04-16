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
          <multiselect
            v-model="FormSubmit.docCate"
            :options="categoryDocument.data"
            :searchable="false"
            :close-on-select="false"
            :show-labels="false"
            placeholder="Pick a value"
            aria-label="pick a value"
            track-by="name" label="name"
          ></multiselect>
        </div>
        <pre class="language-json"><code>{{ FormSubmit.docCate }}</code></pre>
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
          :multiple="true"
          :accept="[
            'application/vnd.ms-excel',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ]"
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
import { apiUri } from '@/constants/apiUri'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useAuth } from 'vue-auth3'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import FileUpload from '../FileUpload.vue'
type previewFiles = {
  name: string
  path: string
  file: File
}
const fileUploadPreview = ref<previewFiles[]>([])
const FormSubmit = ref({
  name: null,
  docCate: {
    id: null,
    name: null
  }
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
const categoryDocument = reactive<{ data: any[] }>({ data: [] })

const fetchCategoryDocument = async () => {
  const response = await axios.get(`${apiUri}/categories/list?type=document`, {
    headers: {
      Authorization: `Bearer ${auth.token()}`
    }
  })
  const { data } = response.data
  // console.log(data.items, 'category document')
  // categoryDocument.value = data.items
  data.items.map((item: any) => {
    item.map((subItem: any) => {
      categoryDocument.data.push({
        id: subItem.id,
        name: subItem.name
      })
    })
  })
}

const submit = async () => {
  if (FormSubmit.value.name === null) {
    alert('Vui lòng nhập tên tài liệu')
    return
  }
  const form = new FormData()
  form.append('name', FormSubmit.value.name || '')
  FormSubmit.value.docCate && form.append('type_id', FormSubmit.value.docCate.id || '')
  if (fileUploadPreview.value.length > 0) {
    fileUploadPreview.value.forEach((item) => {
      form.append('files[]', item.file)
    })
  }

  const response = await axios.post(`${apiUri}/document/create`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth.token()}`
    }
  })

  const { message } = response.data
  console.log(message, 'form message')
}

onMounted(() => {
  fetchCategoryDocument()
})
</script>

<style lang="scss" scoped>
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
