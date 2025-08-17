import axios from 'axios'
import { reactive, Ref } from 'vue'

import { apiUri } from '@/constants/apiUri'

interface typesImage {
  src: any
  type: any
}

export const image = reactive<typesImage>({
  src: null,
  type: null,
})

// This function is used to detect the actual image type,
const getMimeType = (file: any, fallback = null) => {
  const byteArray = new Uint8Array(file).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}

export const change = ({ coordinates, canvas }: any) => {
  // console.log('🚀 ~ change ~ coordinates, canvas:' + coordinates, canvas)
}

export const loadImage = (event: any, modal: any) => {
  const { files } = event.target
  if (files && files[0]) {
    if (image.src) {
      URL.revokeObjectURL(image.src)
    }
    const blob = URL.createObjectURL(files[0])

    const reader = new FileReader()
    reader.onload = (e) => {
      // Cập nhật các thuộc tính của đối tượng reactive
      image.src = blob
      image.type = getMimeType(e.target, files[0].type)
    }
    reader.readAsArrayBuffer(files[0])
    modal.modalUserCroppie = true
  }
}

export const initializeCropper = (self: any) => {
  if (self && self.$refs && self.$refs.cropper) {
    // Reset cropper to initial state
    self.$refs.cropper.refresh()
  }
}

export const destroyCropper = (self: any) => {
  if (self && self.$refs && self.$refs.cropper) {
    self.$refs.cropper.reset()
  }
  image.src = null
}

export const postServer = (self: any, authCheck: any, authToken: any, blobUrlRef: Ref<string>) => {
  if (!self || !self.$refs || !self.$refs.cropper) {
    console.error('Cropper reference is missing or invalid')
    return
  }

  const { canvas } = self.$refs.cropper.getResult()

  if (canvas && authCheck) {
    const form = new FormData()
    canvas.toBlob(async (blob: any) => {
      form.append('file', blob)

      const response = await axios.post(`${apiUri}/user/uploadavatar`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      })

      const { message } = response.data
      blobUrlRef.value = message
      console.log('🚀 ~ canvas.toBlob ~ message:', message)
      console.log('🚀 ~ canvas.toBlob ~ blobUrlRef.value:', blobUrlRef.value)

      // Perhaps you should add the setting appropriate file format here
    }, 'image/jpeg')
  }
}
