<template>
  <Modal :modal-active="props.modal" max-width="max-w-[500px]" @close="() => emit('toggle-modal')">
    <div class="overflow-hidden rounded-[24px] bg-white">
      <!-- Header -->
      <!-- <div class="border-b border-[#EDEDF6] p-6">
        <div class="text-center text-[20px] font-bold text-[#464661] uppercase">Upload File Excel</div>
      </div> -->

      <!-- Content -->
      <div class="p-6">
        <!-- Upload Section -->
        <div class="mb-6">
          <div class="mb-3 text-[16px] font-semibold text-[#464661]">Chọn file Excel (.xlsx)</div>

          <!-- Upload Area -->
          <div
            class="relative rounded-[12px] border-2 border-dashed border-[#EDEDF6] p-8 text-center transition-colors hover:border-[#1b4dea] hover:bg-[#f8fcff]"
            :class="{ 'border-red-400 bg-red-50': uploadError }"
            @dragover.prevent="handleDragOver"
            @drop.prevent="handleDrop"
          >
            <input
              ref="fileInput"
              type="file"
              accept=".xlsx,.xls"
              class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              @change="handleFileSelect"
            />

            <div v-if="!selectedFile" class="flex flex-col items-center">
              <div class="mb-4">
                <svg class="h-16 w-16 text-[#909090]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div class="mb-2 text-[16px] font-medium text-[#464661]">
                Kéo thả file Excel vào đây hoặc click để chọn file
              </div>
              <div class="text-[14px] text-[#909090]">Chỉ chấp nhận file .xlsx hoặc .xls</div>
            </div>

            <div v-else class="flex flex-col items-center">
              <div class="mb-4">
                <svg class="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="mb-2 text-[16px] font-medium text-[#464661]">
                {{ selectedFile.name }}
              </div>
              <div class="mb-4 text-[14px] text-[#909090]">Kích thước: {{ formatFileSize(selectedFile.size) }}</div>
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-[14px] text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                @click.stop="clearFile"
              >
                Xóa file
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="uploadError" class="mt-3 text-[14px] text-red-600">
            {{ uploadError }}
          </div>
        </div>

        <!-- Upload Progress -->
        <div v-if="uploading" class="mb-6">
          <div class="mb-3 text-[16px] font-semibold text-[#464661]">Đang tải lên...</div>
          <div class="h-2.5 w-full rounded-full bg-gray-200">
            <div
              class="h-2.5 rounded-full bg-[#1b4dea] transition-all duration-300"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
          <div class="mt-2 text-[14px] text-[#909090]">{{ uploadProgress }}% hoàn thành</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-4 p-6 pt-0">
        <button
          type="button"
          class="rounded-lg border border-[#EDEDF6] px-6 py-2.5 text-[16px] font-semibold text-[#464661] transition-colors hover:bg-gray-50"
          :disabled="uploading"
          @click="() => emit('toggle-modal')"
        >
          Hủy
        </button>
        <button
          type="button"
          class="rounded-lg bg-[#1b4dea] px-6 py-2.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#0f3bb6] disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!selectedFile || uploading"
          @click="handleUpload"
        >
          <span v-if="uploading">Đang tải lên...</span>
          <span v-else>Tải lên</span>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref } from 'vue'
  import { useAuth } from 'vue-auth3'
  import * as XLSX from 'xlsx'

  import Modal from '@/components/Modals.vue'
  import { apiUri } from '@/constants/apiUri'

  interface Props {
    modal: boolean
  }

  interface ExcelRow {
    [key: string]: any
  }

  const props = defineProps<Props>()
  const emit = defineEmits(['toggle-modal', 'upload-success', 'upload-error', 'navigate-to-edit'])

  const auth = useAuth()

  const fileInput = ref<HTMLInputElement>()
  const selectedFile = ref<File | null>(null)
  const previewData = ref<ExcelRow[]>([])
  const previewHeaders = ref<string[]>([])
  const uploadError = ref<string>('')
  const uploading = ref<boolean>(false)
  const uploadProgress = ref<number>(0)

  // Allowed file types
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
  ]

  // Max file size (10MB)
  const maxFileSize = 10 * 1024 * 1024

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'Chỉ chấp nhận file Excel (.xlsx hoặc .xls)'
    }

    if (file.size > maxFileSize) {
      return 'Kích thước file không được vượt quá 10MB'
    }

    return null
  }

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      uploadError.value = validationError
      clearFile()
      return
    }

    uploadError.value = ''
    selectedFile.value = file
    readExcelFile(file)
  }

  const readExcelFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })

      // Get first worksheet
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]

      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1, // Use first row as headers
        defval: '', // Default value for empty cells
      }) as any[][]

      if (jsonData.length === 0) {
        uploadError.value = 'File Excel trống hoặc không có dữ liệu'
        clearFile()
        return
      }

      // Extract headers and data
      const headers = jsonData[0] as string[]
      const data = jsonData.slice(1).map((row) => {
        const rowObj: ExcelRow = {}
        headers.forEach((header, index) => {
          rowObj[header] = row[index] || ''
        })
        return rowObj
      })

      previewHeaders.value = headers
      previewData.value = data
    } catch (error) {
      console.error('Error reading Excel file:', error)
      uploadError.value = 'Không thể đọc file Excel. Vui lòng kiểm tra định dạng file.'
      clearFile()
    }
  }

  const clearFile = () => {
    selectedFile.value = null
    previewData.value = []
    previewHeaders.value = []
    uploadError.value = ''

    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  const handleUpload = async () => {
    if (!selectedFile.value || previewData.value.length === 0) return

    uploading.value = true
    uploadProgress.value = 0
    uploadError.value = ''

    try {
      // Create FormData to send file
      const formData = new FormData()
      formData.append('file', selectedFile.value)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        if (uploadProgress.value < 90) {
          uploadProgress.value += 10
        }
      }, 200)

      // Upload file to API
      const response = await axios.post(`${apiUri}/user/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            if (percentCompleted >= 90) {
              clearInterval(progressInterval)
            }
            uploadProgress.value = percentCompleted
          }
        },
      })

      clearInterval(progressInterval)
      uploadProgress.value = 100

      // Emit success event with the data and API response
      emit('upload-success', {
        file: selectedFile.value,
        data: previewData.value,
        headers: previewHeaders.value,
        response: response.data,
      })

      // Close modal after successful upload
      setTimeout(() => {
        emit('toggle-modal')
        clearFile()
      }, 1000)
    } catch (error: any) {
      console.error('Upload error:', error)

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Lỗi từ server'
        uploadError.value = `Upload thất bại: ${errorMessage}`
        emit('upload-error', {
          status: error.response.status,
          message: errorMessage,
          data: error.response.data,
        })
      } else if (error.request) {
        // Network error
        uploadError.value = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.'
        emit('upload-error', {
          type: 'network',
          message: 'Network error',
          error: error,
        })
      } else {
        // Other error
        uploadError.value = 'Có lỗi xảy ra khi tải lên file'
        emit('upload-error', error)
      }
    } finally {
      uploading.value = false
      uploadProgress.value = 0
    }
  }

  // Drag and drop functionality
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()

    const files = event.dataTransfer?.files
    if (!files || files.length === 0) return

    const file = files[0]
    const validationError = validateFile(file)

    if (validationError) {
      uploadError.value = validationError
      return
    }

    uploadError.value = ''
    selectedFile.value = file
    readExcelFile(file)
  }

  // Column detection methods
  const detectColumn = (fieldType: string): string => {
    if (!previewHeaders.value || previewHeaders.value.length === 0) return ''

    const patterns = {
      name: [
        'họ và tên',
        'họ tên',
        'ho va ten',
        'ho ten',
        'hoten',
        'ten nhan vien',
        'ten',
        'name',
        'full name',
        'fullname',
        'tên đầy đủ',
        'tên nhân viên',
        'họ và tên đầy đủ',
      ],
      email: [
        'email công ty',
        'email',
        'e-mail',
        'mail',
        'email address',
        'email công ty',
        'email company',
        'email doanh nghiệp',
        'email work',
        'email lam viec',
        'email chính',
        'email chinh',
        'email công việc',
        'email cong viec',
        'email office',
        'email van phong',
      ],
    }

    const fieldPatterns = patterns[fieldType as keyof typeof patterns] || []

    for (const header of previewHeaders.value) {
      const headerLower = header.toLowerCase().trim()
      for (const pattern of fieldPatterns) {
        if (
          headerLower === pattern.toLowerCase() ||
          headerLower.includes(pattern.toLowerCase()) ||
          pattern.toLowerCase().includes(headerLower)
        ) {
          return header
        }
      }
    }

    return ''
  }

  const detectColumnIcon = (fieldType: string): string => {
    return detectColumn(fieldType) ? '✅' : '❌'
  }

  const isImportantColumn = (header: string): boolean => {
    const importantPatterns = [
      'họ và tên',
      'họ tên',
      'name',
      'fullname',
      'full name',
      'mã nv',
      'mã nhân viên',
      'code',
      'employee code',
    ]
    const headerLower = header.toLowerCase()
    return importantPatterns.some((pattern) => headerLower.includes(pattern))
  }

  const isEmailColumn = (header: string): boolean => {
    const emailPatterns = ['email', 'e-mail', 'mail', 'email address']
    const headerLower = header.toLowerCase()
    return emailPatterns.some((pattern) => headerLower.includes(pattern))
  }
</script>

<style scoped>
  /* Custom styles for better UX */
  .file-upload-area {
    transition: all 0.3s ease;
  }

  .file-upload-area:hover {
    border-color: #1b4dea;
    background-color: #f8fcff;
  }

  .preview-table {
    max-height: 400px;
    overflow-y: auto;
  }

  .progress-bar {
    transition: width 0.3s ease;
  }
</style>
