import { apiUri } from '@/constants/apiUri'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuth } from 'vue-auth3'

interface PermissionType {
  // name: string
  // description: string
  // permission: {
  //   [key: string]: string[]
  // }
  [key: string]: string[]
}
interface UserInfoProps {
  id: string
  username: string
  email: string
  name: string
  status: string
  avatar?: string
  phone: string
  per_group_name: string
}
export const usePermissionStore = defineStore('permission', () => {
  const permision = ref<PermissionType | null>(null)
  const permissionList = ref<String[]>([])
  const userData = ref<UserInfoProps | null>(null)
  async function fetchPermission(token: string) {
    if (permision.value) return
    try {
      const response = await axios.get(`/api/user/permission`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const dataPermit = response.data.data
      permision.value = dataPermit
      permissionList.value = Object.keys(dataPermit)
    } catch (error) {
      console.error('Error fetching permision:', error)
    }
  }

  function checkPermission(permission: string, actions: string){
    if (!permision.value) return false
    const rolePermission = permision.value[permission]
    if (!rolePermission) return false
    if (rolePermission.length === 0) return false
    if (rolePermission.includes(actions)) return true
    // const rolePermission = checkRole.permission[permission]
  }
  const fetchUserData = async (token: string) => {
    const auth = useAuth()
    if (!auth.check()) return
    if (permision.value) return
    console.log('call trong store')
    try {
      const response = await auth.fetch({
        method: 'get',
        url: `${apiUri}/user/info`,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { data } = response.data
      userData.value = data
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Logout user
        await auth
          .logout({
            makeRequest: false,
            redirect: '/login'
          })
          .then(() => {
            userData.value = null
          })

        // console.clear()
      }
    }
  }
  const setUserPermission = (permission: string) => {
    if(!userData.value) return
    if (userData.value) {
      userData.value.per_group_name = permission
    }
  }
  const getPermission = computed(() => {
    return permision
  })
  const getPermissionList = computed(() => {
    return permissionList
  })
  const getUserPermission = computed(() => {
    return userData
  })
  function $reset() {
    permision.value = null
    permissionList.value = []
    userData.value = null
  }

  return {
    permision,
    fetchPermission,
    getPermission,
    getPermissionList,
    getUserPermission,
    checkPermission,
    setUserPermission,
    $reset,
    fetchUserData,
    permissionList,
    userData
  }
})
