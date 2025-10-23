import { computed, ref } from 'vue'

export function useTableLoading() {
  const isLoading = ref(false)
  const loadingPromise = ref<Promise<any> | null>(null)

  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
    loadingPromise.value = null
  }

  const withLoading = async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      startLoading()
      loadingPromise.value = asyncFn()
      const result = await loadingPromise.value
      return result
    } finally {
      stopLoading()
    }
  }

  const isTableLoading = computed(() => isLoading.value)

  return {
    isTableLoading,
    startLoading,
    stopLoading,
    withLoading,
    loadingPromise,
  }
}
