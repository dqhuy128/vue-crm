<template>
  <form @submit.prevent="handleCreateCategory">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Loại danh mục
          </span>

          <SelectRoot v-model="paramsCreate.type">
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
                      v-for="(item, key) in datatype"
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

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Tên danh mục
          </span>

          <input
            v-model="paramsCreate.name"
            type="text"
            name=""
            id=""
            placeholder="Trợ lý"
            class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
          />
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
            v-model="paramsCreate.description"
            name=""
            id=""
            placeholder="Nhập mô tả"
            class="w-full border min-h-[120px] border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div
      class="flex flex-wrap items-stretch justify-center gap-4 text-center mt-9 xl:gap-6"
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
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
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
import { apiClient } from '@/plugins/axios'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'
import { capitalizeFirstLetter, tableMagic } from '@/utils/main'
import { useSystemManager } from '@/composables/system-manager'
import axios from 'axios'

const auth = useAuth()
const token = auth.token()
const session = auth.check()

const emit = defineEmits(['post-request'])

defineProps<{
  datatype: any
}>()

const paramsCreate = reactive({
  type: '',
  name: '',
  description: ''
})

const params = reactive({
  type: '',
  name: ''
})
const paginate = reactive({
  page: 1,
  per_page: 20
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

const postRequest = ref<any | null>(null)
const handleCreateCategory = async () => {
  if (session) {
    const formData = new FormData()
    formData.append('name', paramsCreate.name)
    formData.append('type', paramsCreate.type)
    formData.append('description', paramsCreate.description)

    const res = await axios
      .post(`${apiUri}/categories/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data.errors.input) {
          const { message } = res.data
          const { input } = res.data.errors
          alert(message + '. ' + input)
          return
        }
        paramsCreate.name = ''
        paramsCreate.description = ''
        postRequest.value = res.data
        emit('post-request', postRequest.value)
        fetchDataDocument()
      })
      .catch((err) => {
        console.log('handleCreateCategory ~ err', err)
      })
  }
}

const {
  data,
  // isLoading: isLoadingDocument,
  doFetch,
  // fetchCategoryDocument,
  categories
} = useSystemManager()
</script>

<style lang="scss" scoped></style>
