import axios from 'axios'
import { ref } from 'vue'
import { useAuth } from 'vue-auth3'

import { apiUri } from '@/constants/apiUri'

interface DocumentType {
  items: any[]
  pagination: {
    total: string
    per_page: string
    current_page: string
    last_page: string
  }
}
const data = ref<DocumentType | null>(null)
const categories = ref<Record<string, string>[]>([])
const dataCategories = ref<any | null>(null)

export function useSystemUser() {
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
      console.log('🚀 ~ .then ~ data.value:', data.value)
      return data.value
    } catch (err: any) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        error.value = err
      }
    } finally {
      if (!options.signal?.aborted) {
        isLoading.value = false
      }
    }
  }

  const fetchCategoryDocument = async () => {
    const response = await axios.get(`${apiUri}/categories/list?type=document`, {
      headers: {
        Authorization: `Bearer ${auth.token()}`,
      },
    })
    const { data } = response.data
    data.items.map((item: any) => {
      item.map((subItem: any) => {
        categories.value.push({
          id: subItem.id,
          name: subItem.name,
        })
      })
    })
  }

  return {
    fetchingSelected,
    dataCategories,
    data,
    error,
    loadingPromise,
    isLoading,
    doFetch,
    fetchCategoryDocument,
    categories,
  }
}
