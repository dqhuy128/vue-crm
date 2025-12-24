<template>
  <form @submit.prevent="handleUpdateCategory">
    <div class="grid grid-cols-12 gap-6 gap-x-4">
      <div class="col-span-12 xl:col-span-4">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Loại danh mục
          </span>

          <SelectRoot v-model="paramsUpdate.type">
            <SelectTrigger
              class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] data-[placeholder]:text-[#909090]"
              aria-label="Customise options"
            >
              <SelectValue
                class="font-inter grow text-start text-[16px] leading-normal font-normal"
                placeholder="Chọn loại danh mục"
              />
              <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                      v-for="(item, key) in categoriesType"
                      :key="key"
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="String(key)"
                    >
                      <SelectItemText>
                        {{ capitalizeFirstLetter(item) }}
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

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Tên danh mục
          </span>

          <input
            id=""
            v-model="paramsUpdate.name"
            type="text"
            name=""
            placeholder="Trợ lý"
            class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
          />

          <!-- <div class="mt-1 text-xs text-red-500" v-if="checkValidate">
            {{ checkValidate }}
          </div> -->
        </div>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-4">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Trạng thái
          </span>

          <SelectRoot v-model="paramsUpdate.status">
            <SelectTrigger
              class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
              aria-label="Customise options"
            >
              <SelectValue
                class="font-inter w-[90%] grow text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                placeholder="Chọn trạng thái"
              />
              <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
                position="popper"
                :side-offset="5"
              >
                <SelectViewport>
                  <SelectGroup>
                    <SelectItem
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                      :value="String(1)"
                    >
                      <SelectItemText>
                        <!-- {{ capitalizeFirstLetter(item) }} -->
                        Đang hoạt động
                      </SelectItemText>
                    </SelectItem>

                    <SelectItem
                      class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
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
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Mô tả </span>
          <textarea
            id=""
            v-model="paramsUpdate.description"
            name=""
            placeholder="Nhập mô tả"
            class="font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <slot />
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
  import { onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import { apiUri } from '@/constants/apiUri'
  import { capitalizeFirstLetter } from '@/utils/main'

  const auth = useAuth()
  const token = auth.token()
  const session = auth.check()

  const emit = defineEmits(['post-request-edit'])

  const props = defineProps<{
    datatype: any
    propFunction: Function
  }>()

  const paramsUpdate = reactive({
    id: '',
    type: '',
    name: '',
    description: '',
    status: '',
  })

  const categoriesType = ref<any | null>(null)
  const getCategoriesType = async () => {
    try {
      const response = await axios.get(`${apiUri}/categories/type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      categoriesType.value = response.data.data
      // console.log('🚀 ~ getCategoriesType ~ response:', categoriesType.value)
    } catch (error) {
      console.log('🚀 ~ getCategoriesType ~ error:', error)
    }
  }

  const postRequestEdit = ref<any | null>(null)
  const onSubmitting = ref(false)
  const handleUpdateCategory = async () => {
    onSubmitting.value = true
    try {
      const formData = new FormData()
      if (paramsUpdate.id) formData.append('id', paramsUpdate.id)
      if (paramsUpdate.type) formData.append('type', paramsUpdate.type)
      if (paramsUpdate.name) formData.append('name', paramsUpdate.name)
      if (paramsUpdate.description) formData.append('description', paramsUpdate.description)
      if (paramsUpdate.status) formData.append('status', paramsUpdate.status)

      const response = await axios.post(`${apiUri}/categories/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      // props.closeModal()
      postRequestEdit.value = response.data
      emit('post-request-edit', postRequestEdit.value)
      props.propFunction()
      console.log('🚀 ~ handleUpdateCategory ~ response:', response)
    } catch (error) {
      console.log('🚀 ~ handleUpdateCategory ~ error:', error)
    } finally {
      onSubmitting.value = false
    }
  }

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

      if (newVal.data.status === null) return (paramsUpdate.status = '0')
      paramsUpdate.status = newVal.data.status
    }
  )
</script>

<style lang="scss" scoped></style>
