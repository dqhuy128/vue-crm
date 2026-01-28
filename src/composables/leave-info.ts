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

export function useLeaveInfo() {
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

  const doFetch = async (url: string, token: string, options: any = {}) => {
    isLoading.value = true
    try {
      const response = await auth.fetch({
        method: 'get',
        url: url,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...options,
      })
      data.value = response.data.data
      return data.value
    } catch (err: any) {
      // Explicitly ignore cancel errors
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        error.value = err
      }
    } finally {
      // Only set loading to false if not aborted (optional, but good practice)
      // However, if we don't have access to the controller here easily, we rely on the caller or just set it false.
      // But if aborted, the catch block runs.
      // Ideally check signal, but options.signal might be generic.
      if (!options.signal?.aborted) {
        isLoading.value = false
      }
    }
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
