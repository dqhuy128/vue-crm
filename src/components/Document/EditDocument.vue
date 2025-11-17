<template>
  <form action="" @submit.prevent="submit">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Loại tài liệu
          </span>

          <SelectRoot v-model="FormSubmitEdit.docCate">
            <SelectTrigger
              class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] data-[placeholder]:text-[#909090]"
              aria-label="Customise options"
            >
              <SelectValue
                class="font-inter grow text-start text-[16px] leading-normal font-normal"
                placeholder="Chọn loại tài liệu"
              />
              <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
                position="popper"
                :side-offset="5"
              >
                <SelectScrollUpButton
                  class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white"
                >
                  <Icon icon="radix-icons:chevron-up" />
                </SelectScrollUpButton>

                <SelectViewport>
                  <SelectGroup>
                    <SelectItem
                      v-for="(item, index) in propData"
                      :key="index"
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="item.id"
                    >
                      <SelectItemText>
                        {{ capitalizeFirstLetter(item.name) }}
                      </SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>

                <SelectScrollDownButton
                  class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white"
                >
                  <Icon icon="radix-icons:chevron-down" />
                </SelectScrollDownButton>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Tên tài liệu
          </span>

          <input
            id=""
            v-model="FormSubmitEdit.name"
            type="text"
            name=""
            placeholder="Trợ lý"
            class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
          />
        </div>
      </div>
      <div class="col-span-12">
        <FileUpload
          :key="'modal-edit'"
          :accept="[
            'application/vnd.ms-excel',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ]"
          @change="onFileUpdate"
        >
          <div>
            <div class="file-upload">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </div>
        </FileUpload>
        <template v-if="FormSubmitEdit.link && fileUploadPreview.length === 0">
          <ul>
            <li class="relative flex items-center pt-3">
              <p>
                {{ getFilenameFromUrl(FormSubmitEdit.link) }}
              </p>

              <button class="ms-2 cursor-pointer rounded-sm bg-red-500" @click="removeFilePreview">
                <svg
                  data-v-d642cc0b=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    data-v-d642cc0b=""
                    d="M11.9998 13.4L7.0998 18.3C6.91647 18.4833 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4833 5.6998 18.3C5.51647 18.1167 5.4248 17.8833 5.4248 17.6C5.4248 17.3167 5.51647 17.0833 5.6998 16.9L10.5998 12L5.6998 7.1C5.51647 6.91667 5.4248 6.68334 5.4248 6.4C5.4248 6.11667 5.51647 5.88334 5.6998 5.7C5.88314 5.51667 6.11647 5.425 6.3998 5.425C6.68314 5.425 6.91647 5.51667 7.0998 5.7L11.9998 10.6L16.8998 5.7C17.0831 5.51667 17.3165 5.425 17.5998 5.425C17.8831 5.425 18.1165 5.51667 18.2998 5.7C18.4831 5.88334 18.5748 6.11667 18.5748 6.4C18.5748 6.68334 18.4831 6.91667 18.2998 7.1L13.3998 12L18.2998 16.9C18.4831 17.0833 18.5748 17.3167 18.5748 17.6C18.5748 17.8833 18.4831 18.1167 18.2998 18.3C18.1165 18.4833 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4833 16.8998 18.3L11.9998 13.4Z"
                    fill="#fff"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </template>
        <template v-if="fileUploadPreview.length > 0">
          <ul>
            <li v-for="(list, index) in fileUploadPreview" class="relative flex items-center pt-3">
              <p>
                {{ list.name }}
              </p>

              <button class="ms-2 cursor-pointer rounded-sm bg-red-500" @click="clearFilePreview">
                <svg
                  data-v-d642cc0b=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    data-v-d642cc0b=""
                    d="M11.9998 13.4L7.0998 18.3C6.91647 18.4833 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4833 5.6998 18.3C5.51647 18.1167 5.4248 17.8833 5.4248 17.6C5.4248 17.3167 5.51647 17.0833 5.6998 16.9L10.5998 12L5.6998 7.1C5.51647 6.91667 5.4248 6.68334 5.4248 6.4C5.4248 6.11667 5.51647 5.88334 5.6998 5.7C5.88314 5.51667 6.11647 5.425 6.3998 5.425C6.68314 5.425 6.91647 5.51667 7.0998 5.7L11.9998 10.6L16.8998 5.7C17.0831 5.51667 17.3165 5.425 17.5998 5.425C17.8831 5.425 18.1165 5.51667 18.2998 5.7C18.4831 5.88334 18.5748 6.11667 18.5748 6.4C18.5748 6.68334 18.4831 6.91667 18.2998 7.1L13.3998 12L18.2998 16.9C18.4831 17.0833 18.5748 17.3167 18.5748 17.6C18.5748 17.8833 18.4831 18.1167 18.2998 18.3C18.1165 18.4833 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4833 16.8998 18.3L11.9998 13.4Z"
                    fill="#fff"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </template>
      </div>
      <div class="col-span-12">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Mô tả </span>
          <textarea
            id=""
            v-model="FormSubmitEdit.description"
            name=""
            placeholder="Nhập mô tả"
            class="font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <button
        type="button"
        class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
        @click="clearAndCloseModal"
      >
        Hủy
      </button>
      <button
        type="submit"
        class="border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]"
        :class="{ 'pointer-events-none opacity-75': onSubmitting }"
      >
        <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
        </div>
        <div v-else>Lưu</div>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue'
  import axios from 'axios'
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
    SelectViewport,
  } from 'radix-vue'
  import { ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import { apiUri } from '@/constants/apiUri'
  // import 'vue-multiselect/dist/vue-multiselect.min.css'
  import { capitalizeFirstLetter } from '@/utils/main'

  import FileUpload from '../FileUpload.vue'

  const props = defineProps<{
    data: any
    propFunction: Function
    closeModal: Function
    propData: any[]
  }>()

  const emit = defineEmits(['post-request-edit'])

  type previewFiles = {
    name: string
    path: string
    file: File
  }
  const fileUploadPreview = ref<previewFiles[]>([])
  const FormSubmitEdit = ref({
    name: props.data?.name || null,
    description: props.data?.description || null,
    docCate: props.data?.type_id || null,
    id: props.data?.id || null,
    link: props.data?.link || null,
  })
  function clearAndCloseModal() {
    props.closeModal()
    setTimeout(() => {
      fileUploadPreview.value = []
      FormSubmitEdit.value.name = null
      FormSubmitEdit.value.description = null
      FormSubmitEdit.value.docCate = null
      FormSubmitEdit.value.id = null
      FormSubmitEdit.value.link = null
    }, 200)
  }
  function removeFilePreview() {
    FormSubmitEdit.value.link = null
  }
  const setUrlFromFiles = async (files: FileList | File) => {
    let file: File

    if (files instanceof File) {
      file = files
    } else {
      const list = Array.from(files)
      if (list.length === 0) return
      file = list[list.length - 1] // get the latest (last) file
    }

    // Clear the existing link to avoid duplication
    FormSubmitEdit.value.link = null

    const path = await readFileAsDataURL(file)

    // Replace previous file, only keep one
    fileUploadPreview.value = [
      {
        file,
        name: file.name,
        path,
      },
    ]
  }
  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  function onFileUpdate(files: FileList | File) {
    // console.log(files, 'onFileUpdate')
    setUrlFromFiles(files)
  }
  function clearFilePreview() {
    fileUploadPreview.value = []
    if (fileUploadPreview.value) {
      fileUploadPreview.value = [] // reset input
    }
  }

  const auth = useAuth()

  const postRequestEdit = ref<any | null>(null)
  const onSubmitting = ref(false)
  const submit = async () => {
    onSubmitting.value = true
    const formData = new FormData()
    formData.append('name', FormSubmitEdit.value.name || '')
    formData.append('id', FormSubmitEdit.value.id || '')
    formData.append('type_id', FormSubmitEdit.value.docCate || '')
    formData.append('description', FormSubmitEdit.value.description)
    if (fileUploadPreview.value.length > 0) {
      fileUploadPreview.value.forEach((item) => {
        formData.append('file', item.file)
      })
    } else {
      formData.append('file', '')
    }

    const response = await axios
      .post(`${apiUri}/document/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      .then(function (res) {
        // successful response flow
        //   fileUploadPreview.value = []
        FormSubmitEdit.value.docCate = ''
        postRequestEdit.value = res.data
        emit('post-request-edit', postRequestEdit.value)
        props.propFunction()
      })
      .catch(function (error) {
        console.log(error, 'error /document/update')
      })
      .finally(() => {
        onSubmitting.value = false
      })
  }

  watch(
    () => props.data,
    () => {
      FormSubmitEdit.value.name = props.data.name
      FormSubmitEdit.value.description = props.data.description
      FormSubmitEdit.value.docCate = props.data.type_id
      FormSubmitEdit.value.id = props.data.id
      FormSubmitEdit.value.link = props.data.link
      // Clear any uploaded files when loading a new document
      fileUploadPreview.value = []
    }
  )

  function getFilenameFromUrl(url: string): string {
    const parts = url.split('/')
    return parts[parts.length - 1]
  }
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
    color: #1b4dea;
    text-decoration: underline;
  }
</style>
