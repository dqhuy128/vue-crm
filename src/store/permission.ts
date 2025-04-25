import { apiClient } from '@/plugins/axios'
import axios from 'axios'
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
  async function fetchPermission(token: string) {
    try {
      const response = await axios.get(`/api/user/permission`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const { data } = response.data
      console.log('run trong context', data)
      permision.value = data
      permissionList.value = Object.keys(data)
      console.log(Object.keys(data), permissionList.value)
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

  const getPermission = computed(() => {
    return permision
  })
  const getPermissionList = computed(() => {
    return permissionList
  })
  return {
    permision,
    fetchPermission,
    getPermission,
    getPermissionList,
    checkPermission,
    permissionList
  }
})
