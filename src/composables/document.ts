import { ref } from 'vue'
import { useAuth } from 'vue-auth3'

interface DocumentType {
  items: any[],
  pagination: any[]
}
export function useDocument(url: string, token: string) {
  const auth = useAuth()
  const data = ref<DocumentType | null>(null)
  const error = ref(null)
  const loadingPromise = ref()
  const isLoading = ref(false)

  const doFetch = async () => {
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
        console.log(json, ' jsonssss')
        data.value = json.data
        return json.data
      })
      .catch((err) => (error.value = err))
      .finally(() => (isLoading.value = false))
    // loadingPromise.value = auth
    //   .fetch({
    //     method: 'get',
    //     url: url,
    //     credentials: 'include',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then((res) => res.data.json())
    //   .then((json) => (data.value = json))
    //   .catch((err) => (error.value = err))
    //   .finally(() => (isLoading.value = false))
  }

  return { data, error, loadingPromise, isLoading, doFetch }
}
