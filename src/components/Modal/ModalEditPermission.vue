<template>
  <form @submit.prevent="postAddLeave">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Chức vụ
          </span>
          <input
            v-model="paramsEditPermission.name"
            type="text"
            name=""
            id=""
            placeholder="Nhập chức vụ"
            class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
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
          <input
            v-model="paramsEditPermission.description"
            type="text"
            name=""
            id=""
            placeholder="Nhập mô tả"
            class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
          />
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Chức năng nhóm quyền
          </span>

          <TreeComponent :permission="paramsEditPermission.permission" />
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
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'
import { tableMagic } from '@/utils/main'
import axios from 'axios'
import { useLeaveInfo } from '@/composables/leave-info'
import TreeComponent from '../TreeComponent.vue'
import { storeToRefs } from 'pinia'
import { usePermissionStore } from '@/store/permission'

const auth = useAuth()

const emit = defineEmits(['post-request'])

const props = defineProps<{
  datatype: any
  userPermission: any
}>()

const paramsEditPermission = reactive<any | null>({
  name: null,
  description: null,
  permission: null
})

const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataLeave = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...paramsEditPermission
    }

    doFetch(
      `${apiUri}/leave/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
      auth.token() as string
    ).then(() => {
      // console.log('🚀 ~ fetchDataLeave ~ res:', res)
      tableMagic()
    })
  }, 300)
}

const postRequest = ref<any | null>(null)
const postAddLeave = async () => {
  try {
    const formData = new FormData()
    formData.append('begin_date', paramsEditPermission.begin_date)
    formData.append('finish_date', paramsEditPermission.finish_date)
    formData.append('reason', paramsEditPermission.reason)

    const res = await axios.post(`${apiUri}/leave/create`, formData, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
    })
    paramsEditPermission.reason = null
    paramsEditPermission.begin_date = null
    paramsEditPermission.finish_date = null
    fetchDataLeave()
    postRequest.value = res.data
    emit('post-request', postRequest.value)
    // console.log('🚀 ~ postAddLeave ~ res:', postRequest.value)
  } catch (error) {
    console.log('🚀 ~ postAddLeave ~ error:', error)
  }
}

const { doFetch } = useLeaveInfo()

const permissionStore = usePermissionStore()
const { permissionListData, userData } = storeToRefs(permissionStore)
const { fetchPermissionList, fetchUserData } = permissionStore

// watch(permissionListData, () => {
//   console.log('🚀 ~ permissionListData:', permissionListData)
// })

// watch(userData, () => {
//   console.log('🚀 ~ userData:', userData.value?.per_group_name)
// })

watch(
  () => props.datatype,
  (newVal) => {
    const { name } = newVal[0]
    const { description } = newVal[0]
    const { permission } = newVal[0]

    if (name) paramsEditPermission.name = name
    if (description) paramsEditPermission.description = description
    if (permission) {
      paramsEditPermission.permission = Object.keys(permission)
    } else {
      paramsEditPermission.permission = []
    }
  }
)

onMounted(() => {
  if (auth.check()) {
    if (auth.token()) {
      fetchPermissionList(auth.token() as string)
      fetchUserData(auth.token() as string)
    }
  }
})
</script>

<style lang="scss"></style>
