<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close', 'submit'])

const file = ref<File | null>(null)
const error = ref<string | null>(null)

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const selectedFile = input.files[0]
    const fileType = selectedFile.name.split('.').pop()?.toLowerCase()
    
    if (fileType === 'xlsx' || fileType === 'xls') {
      file.value = selectedFile
      error.value = null
    } else {
      error.value = 'Vui lòng chọn file Excel (.xlsx hoặc .xls)'
      file.value = null
    }
  }
}

const handleSubmit = () => {
  if (!file.value) {
    error.value = 'Vui lòng chọn file Excel'
    return
  }
  
  emit('submit', file.value)
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-main">Thêm tài liệu</h2>
        <button @click="handleClose" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Chọn file Excel
        </label>
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label class="relative cursor-pointer bg-white rounded-md font-medium text-main hover:text-main-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-main">
                <span>Tải file lên</span>
                <input 
                  type="file" 
                  class="sr-only" 
                  accept=".xlsx,.xls"
                  @change="handleFileChange"
                >
              </label>
              <p class="pl-1">hoặc kéo thả</p>
            </div>
            <p class="text-xs text-gray-500">
              XLSX, XLS tối đa 10MB
            </p>
          </div>
        </div>
        <p v-if="file" class="mt-2 text-sm text-gray-600">
          File đã chọn: {{ file.name }}
        </p>
        <p v-if="error" class="mt-2 text-sm text-red-600">
          {{ error }}
        </p>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          @click="handleClose"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
        >
          Hủy
        </button>
        <button
          @click="handleSubmit"
          class="px-4 py-2 text-sm font-medium text-white bg-main border border-transparent rounded-md hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
        >
          Tải lên
        </button>
      </div>
    </div>
  </div>
</template> 