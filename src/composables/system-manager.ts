import { apiClient } from '@/plugins/axios'
import { useAuth } from 'vue-auth3'
import { ref } from 'vue'

const dataCategories = ref<any | null>(null)

export function useSystemManager() {
  const auth = useAuth()

  const fetchingSelected = async () => {
    if (auth.check()) {
      const token = auth.token()

      const response = await apiClient.get('/categories/type', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { data } = response
      const values = Object.keys(data)
      dataCategories.value = data
      console.log('🚀 ~ dataCategories:', dataCategories.value)
    }
  }

  return {
    fetchingSelected,
    dataCategories
  }
}
