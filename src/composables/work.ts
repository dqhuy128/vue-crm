import axios from 'axios'
import { ref } from 'vue'
import { useAuth } from 'vue-auth3'

import { apiUri } from '@/constants/apiUri'

interface LeaveType {
  items: any[]
  pagination: {
    total: string
    per_page: string
    current_page: string
    last_page: string
  }
}
const data = ref<LeaveType | null>(null)
const categories = ref<Record<string, string>[]>([])
const dataCategories = ref<any | null>(null)

export function useWork() {
  const auth = useAuth()

  const error = ref(null)
  const loadingPromise = ref()
  const isLoading = ref(false)

  const fetchingSelected = async () => {
    if (auth.check()) {
      const token = auth.token()

      const response = await axios.get(`${apiUri}/categories/type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { data } = response
      dataCategories.value = data
    }
  }

  const doFetch = async (url: string, token: string) => {
    isLoading.value = true
    const response = await auth
      .fetch({
        method: 'get',
        url: url,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((json) => {
        data.value = json.data
        // console.log('🚀 ~ .then ~ data.value:', data.value)
        return data.value
      })
      .catch((err) => (error.value = err))
      .finally(() => (isLoading.value = false))
  }

  return {
    fetchingSelected,
    dataCategories,
    data,
    error,
    loadingPromise,
    isLoading,
    doFetch,
    categories,
  }
}
