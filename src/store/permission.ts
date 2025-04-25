import { apiClient } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface PermissionType {
  // name: string
  // description: string
  // permission: {
  //   [key: string]: string[]
  // }
  [key: string]: string[]
}
export const usePermissionStore = defineStore('permission', () => {
  const permision = ref<PermissionType | null>(null)
  const permissionList = ref<String[]>([])
  const userPermission = ref<string | null>(null)
  async function fetchPermission(token: string) {
    try {
      const response = await apiClient.get(`/user/permission`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const { data } = response.data
      permision.value = data
      permissionList.value = Object.keys(data)
    } catch (error) {
      console.error('Error fetching permision:', error)
    }
  }

  const checkPermission = (permission: string, actions: string) => {
    if (!permision.value) return false
    const rolePermission = permision.value[permission]
    if (!rolePermission) return false
    if (rolePermission.length === 0) return false
    if (rolePermission.includes(actions)) return true
    // const rolePermission = checkRole.permission[permission]
  }
  const setUserPermission = (permission: string) => {
    userPermission.value = permission
  }
  const getPermission = computed(() => {
    return permision
  })
  const getPermissionList = computed(() => {
    return permissionList
  })
  const getUserPermission = computed(() => {
    return userPermission
  })
  return {
    permision,
    fetchPermission,
    getPermission,
    getPermissionList,
    getUserPermission,
    checkPermission,
    setUserPermission,
    permissionList,
    userPermission
  }
})
