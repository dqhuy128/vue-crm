<script lang="ts" setup>
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import { apiUri } from '@/constants/apiUri'
  import { usePermissionStore } from '@/store/permission'

  import TreeComponent from '../TreeComponent.vue'

  const auth = useAuth()

  const emit = defineEmits(['post-request'])

  const props = defineProps<{
    datatype: any
    userPermission: any
    propFunction: Function
  }>()

  const paramsEditPermission = reactive<any | null>({
    name: null,
    description: null,
    permission: null,
    listPermission: null,
  })

  const postRequest = ref<any | null>(null)
  const submitEditPermission = async () => {
    try {
      const formData = new FormData()
      formData.append('description', paramsEditPermission.description)
      formData.append('name', paramsEditPermission.name)

      const res = await axios.post(`${apiUri}/permission/update`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      props.propFunction()
      postRequest.value = res.data
      emit('post-request', postRequest.value)
      console.log('🚀 ~ postAddLeave ~ res:', postRequest.value)
    } catch (error) {
      console.log('🚀 ~ postAddLeave ~ error:', error)
    }
  }

  const permissionStore = usePermissionStore()
  const { permissionListData, userData } = storeToRefs(permissionStore)
  const { fetchPermissionList, fetchUserData } = permissionStore

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
        paramsEditPermission.listPermission = permission
      } else {
        paramsEditPermission.permission = []
        paramsEditPermission.listPermission = []
      }

      // console.log('🚀 ~ permission:', paramsEditPermission.permission)
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

<template>
  <form @submit.prevent="submitEditPermission">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Nhóm quyền
          </span>
          <input
            id=""
            v-model="paramsEditPermission.name"
            type="text"
            name=""
            placeholder="Nhập chức vụ"
            class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
            readonly
          />
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> Mô tả </span>
          <input
            id=""
            v-model="paramsEditPermission.description"
            type="text"
            name=""
            placeholder="Nhập mô tả"
            class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75"
          />
        </div>
      </div>

      <div class="col-span-12">
        <div class="block">
          <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
            Chức năng nhóm quyền
          </span>

          <TreeComponent :permission="paramsEditPermission" />
        </div>
      </div>
    </div>

    <div class="mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
      <slot />
      <button
        type="submit"
        class="border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]"
      >
        Lưu
      </button>
    </div>
  </form>
</template>

<style lang="scss"></style>
