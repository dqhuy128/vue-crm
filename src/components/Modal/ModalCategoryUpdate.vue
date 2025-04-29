<template>
  <form @submit.prevent="handleUpdateCategory">
    <div class="grid grid-cols-12 gap-x-4 gap-6">
      <div class="col-span-12 xl:col-span-4">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Loại danh mục
          </span>

          <SelectRoot v-model="paramsUpdate.type">
            <SelectTrigger
              class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] data-[placeholder]:text-[#909090]"
              aria-label="Customise options"
            >
              <SelectValue
                class="grow text-start font-inter text-[16px] font-normal leading-normal"
                placeholder="Chọn loại danh mục"
              />
              <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                position="popper"
                :side-offset="5"
              >
                <SelectScrollUpButton
                  class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                >
                  <Icon icon="radix-icons:chevron-up" />
                </SelectScrollUpButton>

                <SelectViewport>
                  <SelectGroup>
                    <SelectItem
                      v-for="(item, key) in categoriesType"
                      :key="key"
                      class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                      :value="String(key)"
                    >
                      <SelectItemText>
                        {{ capitalizeFirstLetter(item) }}
                      </SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>

                <SelectScrollDownButton
                  class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                >
                  <Icon icon="radix-icons:chevron-down" />
                </SelectScrollDownButton>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>

      <div class="col-span-12 xl:col-span-4 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Tên danh mục
          </span>

          <input
            v-model="paramsUpdate.name"
            type="text"
            name=""
            id=""
            placeholder="Trợ lý"
            class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
          />

          <!-- <div class="mt-1 text-xs text-red-500" v-if="checkValidate">
            {{ checkValidate }}
          </div> -->
        </div>
      </div>

      <div class="col-span-12 xl:col-span-4 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Trạng thái
          </span>

          <SelectRoot v-model="paramsUpdate.status">
            <SelectTrigger
              class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
              aria-label="Customise options"
            >
              <SelectValue
                class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                placeholder="Chọn trạng thái"
              />
              <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                position="popper"
                :side-offset="5"
              >
                <SelectViewport>
                  <SelectGroup>
                    <SelectItem
                      class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                      :value="String(1)"
                    >
                      <SelectItemText>
                        <!-- {{ capitalizeFirstLetter(item) }} -->
                        Đang hoạt động
                      </SelectItemText>
                    </SelectItem>

                    <SelectItem
                      class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                      :value="String(0)"
                    >
                      <SelectItemText>
                        <!-- {{ capitalizeFirstLetter(item) }} -->
                        Dừng hoạt động
                      </SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span
            class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Mô tả
          </span>
          <textarea
            v-model="paramsUpdate.description"
            name=""
            id=""
            placeholder="Nhập mô tả"
            class="w-full border min-h-[120px] border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div
      class="flex flex-wrap gap-4 justify-center items-stretch mt-9 text-center xl:gap-6"
    >
      <slot />
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
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'
import { capitalizeFirstLetter, tableMagic } from '@/utils/main'
import { useSystemManager } from '@/composables/system-manager'
import axios from 'axios'

const auth = useAuth()
const token = auth.token()
const session = auth.check()

const emit = defineEmits(['post-request-edit'])

const props = defineProps<{
  datatype: any
  // closeModal: () => void
}>()

const paramsUpdate = reactive({
  id: '',
  type: '',
  name: '',
  description: '',
  status: ''
})

const params = reactive({
  type: '',
  name: ''
})
const paginate = reactive({
  page: 1,
  per_page: 10
})
const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataDocument = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...params,
      page: paginate.page,
      per_page: paginate.per_page
    }

    doFetch(
      `${apiUri}/categories/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
      auth.token() as string
    ).then(() => {
      // console.log('🚀 ~ fetchDataDocument ~ res:', res)
      tableMagic()
    })
  }, 300)
}

const categoriesType = ref<any | null>(null)
const getCategoriesType = async () => {
  try {
    const response = await axios.get(`/api/categories/type`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    categoriesType.value = response.data.data
    // console.log('🚀 ~ getCategoriesType ~ response:', categoriesType.value)
  } catch (error) {
    console.log('🚀 ~ getCategoriesType ~ error:', error)
  }
}

const checkValidate = ref('')
const postRequestEdit = ref<any | null>(null)
const handleUpdateCategory = async () => {
  try {
    // checkValidate.value = ''
    // if (
    //   paramsUpdate.name == '' ||
    //   paramsUpdate.name == null
    //   // paramsUpdate.type == '' ||
    //   // paramsUpdate.type == null
    // ) {
    //   checkValidate.value = 'Vui lòng nhập tên danh mục'
    //   return
    // }

    const formData = new FormData()
    if (paramsUpdate.id) formData.append('id', paramsUpdate.id)
    if (paramsUpdate.type) formData.append('type', paramsUpdate.type)
    if (paramsUpdate.name) formData.append('name', paramsUpdate.name)
    if (paramsUpdate.description)
      formData.append('description', paramsUpdate.description)
    if (paramsUpdate.status) formData.append('status', paramsUpdate.status)

    const response = await axios.post(`/api/categories/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    // props.closeModal()
    postRequestEdit.value = response.data
    emit('post-request-edit', postRequestEdit.value)
    fetchDataDocument()
    console.log('🚀 ~ handleUpdateCategory ~ response:', response)
  } catch (error) {
    console.log('🚀 ~ handleUpdateCategory ~ error:', error)
  }
}

const {
  data,
  // isLoading: isLoadingDocument,
  doFetch,
  // fetchCategoryDocument,
  categories
} = useSystemManager()

onMounted(() => {
  getCategoriesType()
})

watch(
  () => props.datatype,
  (newVal) => {
    paramsUpdate.id = newVal.data.id
    paramsUpdate.type = newVal.data.type
    paramsUpdate.name = newVal.data.name
    paramsUpdate.description = newVal.data.description
    paramsUpdate.status = newVal.data.status
  }
)
</script>

<style lang="scss" scoped></style>
