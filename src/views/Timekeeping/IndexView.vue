<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import router from '@/router';
import { usePermissionStore } from '@/store/permission';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { RouterView } from 'vue-router';

const auth = useAuth()
const permissionStore = usePermissionStore();
const { permissionList } = storeToRefs(permissionStore)
const checkPermission = ref(false)
watch(permissionList, () => {
  console.log('🚀 ~ //onMounted ~ permissionList: Work', permissionList.value)
  if (auth.check()) {
    checkPermission.value = permissionList.value.includes('Work')
      ? true
      : false
    if (!checkPermission.value) {
      alert('Bạn không có quyền truy cập vào trang này')
      router.push({ name: 'NotFound404' })
    }
  }
})
</script>

<style lang="scss" scoped></style>
