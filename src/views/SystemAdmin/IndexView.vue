<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { onMounted, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'
  import { RouterView } from 'vue-router'

  import router from '@/router'
  import { usePermissionStore } from '@/store/permission'

  const permissionStore = usePermissionStore()
  const { permissionList } = storeToRefs(permissionStore)
  const auth = useAuth()
  onMounted(() => {
    if (auth.check()) {
      const res = permissionList.value.includes('User') ? true : false
      if (!res) {
        console.log(' access denied ')
        // router.push('/')
      }
    }
  })

  const checkPermission = ref(false)
  watch(permissionList, () => {
    console.log('🚀 ~ //onMounted ~ permissionList: Leave', permissionList.value.includes('Leave'))
    if (auth.check()) {
      checkPermission.value = permissionList.value.includes('Leave') ? true : false
      if (!checkPermission.value) {
        alert('Bạn không có quyền truy cập vào trang này')
        router.push({ name: 'NotFound404' })
      }
    }
  })
</script>

<style></style>
