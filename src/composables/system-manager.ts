import { apiClient } from '@/plugins/axios'
import { useAuth } from 'vue-auth3'
import { ref } from 'vue'

const auth = useAuth()
const refCategories = ref<any | null>(null)
const keyCategories = ref<any | null>(null)

export async function useSystemManager() {
  if (auth.check()) {
    const token = auth.token()

    const response = await apiClient.get('/categories/type', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    const values = Object.keys(data)
    keyCategories.value = values
    refCategories.value = data
    console.log('🚀 ~ .then ~ keyCategories.value:', keyCategories.value)
    console.log('🚀 ~ .then ~ refCategories.value:', refCategories.value)
  }
}
