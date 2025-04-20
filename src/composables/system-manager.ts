import { apiClient } from '@/plugins/axios'
import { useAuth } from 'vue-auth3'
import { ref } from 'vue'
import axios from 'axios'
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

export function useSystemManager() {
  const auth = useAuth()

  const error = ref(null)
  const loadingPromise = ref()
  const isLoading = ref(false)

  const fetchingSelected = async () => {
    if (auth.check()) {
      const token = auth.token()

      const response = await apiClient.get('/categories/type', {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => res.data)
      .then((json) => {
        // console.log('🚀 ~ useSystemManager ~ data:', json)
        data.value = json.data
        return json.data
      })
      .catch((err) => (error.value = err))
      .finally(() => (isLoading.value = false))
  }

  const fetchCategoryDocument = async () => {
    const response = await axios.get(
      `${apiUri}/categories/list?type=document`,
      {
        headers: {
          Authorization: `Bearer ${auth.token()}`
        }
      }
    )
    const { data } = response.data
    data.items.map((item: any) => {
      item.map((subItem: any) => {
        categories.value.push({
          id: subItem.id,
          name: subItem.name
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
    categories
  }
}
