import { apiClient } from '@/plugins/axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface PermissionType {
  name: string
  description: string
  permission: {
    [key: string]: string[]
  }
}
export const usePermissionStore = defineStore('permission', () => {
  const permision = ref<PermissionType | null>(null)

  async function fetchPermission(token: string, role: string,) {
    try {
      const response = await apiClient.get(`/permission/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const { data } = response.data
      const checkRole = data.find((item : any) => item.name === role)
      permision.value = checkRole
    } catch (error) {
      console.error('Error fetching permision:', error)
    }
  }

  const checkPermission = (
    role: string,
    permission: string,
    actions: string
  ) => {
    if (!permision.value) return false;
    if(permision.value.name !== role) {
      return false
    }
    const rolePermission = permision.value.permission[permission]
    if (!rolePermission) return false
    if (rolePermission.length === 0) return false
    if (rolePermission.includes(actions)) return true
    // const rolePermission = checkRole.permission[permission]

  }

  const getPermission = computed(() => {
    return permision
  })
  
  return { permision, fetchPermission, getPermission, checkPermission }
})
