<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { calcBgBefore } from '../../lib/index'
import { apiClient } from '@/plugins/axios'
import router from '@/router'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Get email from route query params
const route = useRoute()
// Array to hold OTP values
const otpValues = ref(['', '', '', '', '', ''])
const otpPost = ref<any | null>(null)
const email = ref<string>('')

// Set the email from query params on component mount
onMounted(() => {
  calcBgBefore()
  if (route.query.email) {
    email.value = route.query.email as string
    console.log('Email retrieved from query params:', email.value)
  }
})

watch(
  otpValues,
  (newValues) => {
    const allFilled = newValues.every((value) => value !== '')

    if (allFilled) {
      otpPost.value = newValues.join('')
    } else {
      otpPost.value = null
    }
  },
  { deep: true }
)

const handlePostOtp = async () => {
  try {
    const formData = new FormData()
    formData.append('otp', otpPost.value)
    formData.append('email', email.value)

    const response = await axios.post('/api/user/otp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('🚀 ~ handlePostOtp ~ response:', response)
    const { errors } = response.data

    if (errors) {
      alert(errors)
      return
    }

    router.push({
      name: 'ResetGetPass',
      query: { email: email.value }
    })
  } catch (error) {
    console.log(error)
  }
}

// Move focus to next input after typing
const moveFocus = (index: any) => {
  if (
    otpValues.value[index].length === 1 &&
    index < otpValues.value.length - 1
  ) {
    const nextInput = document.getElementById(`otp${index + 2}`)
    if (nextInput) {
      nextInput.focus()
    }
  }
}

// Handle paste event and fill OTP inputs
const handlePaste = (event: any) => {
  const pastedValue = event.clipboardData.getData('Text')
  otpValues.value = pastedValue.split('').slice(0, 6)
}

// Handle backspace (deleting character) to move focus to previous input
const handleKeyDown = (event: any, index: any) => {
  if (event.key === 'Backspace' && otpValues.value[index] === '') {
    if (index > 0) {
      const prevInput = document.getElementById(`otp${index}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }
}

onMounted(() => {
  calcBgBefore()
})
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-center w-full h-[100vh] bg-[#E9F0F4] after:content-[] after:w-full after:h-full after:absolute after:right-0 after:bottom-0 after:bg-[url(./assets/images/svg-login.svg)] after:bg-no-repeat after:bg-right-bottom after:bg-auto after:pointer-events-none"
  >
    <div
      id="rectangleLogin"
      class="max-md:hidden fixed left-0 top-0 bottom-0 h-[100vh] bg-white pointer-events-none"
    ></div>
    <div class="mx-[15px] w-[calc(100%-30px)]">
      <div
        id="formLoginIndex"
        class="relative z-[1] max-w-[865px] max-h-[616px] h-full w-full m-auto rounded-[24px] shadow-[15px_21px_33px_0px_rgba(0,0,0,0.15)] overflow-hidden"
      >
        <div class="flex flex-row flex-wrap h-full">
          <div id="formLoginStart" class="md:w-[31%] w-full bg-[#E9F0F4]">
            <div class="md:py-[60px] p-4 md:px-[25px] flex flex-col h-full">
              <div
                class="md:max-w-[161px] max-w-[110px] w-full mx-auto md:mb-[45px]"
              >
                <img
                  src="@/assets/images/logo-login.png"
                  class="object-scale-down max-w-full h-auto"
                  alt=""
                />
              </div>

              <div
                class="text-main font-inter text-[20px]/[33px] font-bold uppercase text-end lg:pe-[25px] mb-8 hidden md:block"
              >
                hệ thống <br />
                crm skygroup
              </div>

              <div class="hidden mx-auto mt-auto w-full md:block">
                <img
                  src="@/assets/images/login-frame.svg"
                  class="object-scale-down max-w-full h-auto"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div class="md:w-[69%] w-full bg-white">
            <div
              class="max-w-[430px] mx-auto flex flex-col items-center justify-center h-full max-md:p-4"
            >
              <div
                class="text-main font-inter text-[16px] font-bold uppercase leading-normal text-center mb-7"
              >
                Lấy lại mật khẩu
              </div>

              <div
                class="text-[#909090] text-center text-[16px] font-normal leading-normal mb-10 max-w-[235px] mx-auto"
              >
                Bạn sẽ nhận được mã kích hoạt từ email của bạn
              </div>

              <form @submit.prevent="handlePostOtp" class="block w-full">
                <div
                  class="text-center text-[#464661] text-[16px] font-bold mb-3"
                >
                  Nhập mã kích hoạt
                </div>

                <div class="mb-12 otp-inputs">
                  <input
                    v-for="(otp, index) in otpValues"
                    :key="index"
                    type="text"
                    :id="'otp' + (index + 1)"
                    maxlength="1"
                    v-model="otpValues[index]"
                    class="otp-input"
                    @input="moveFocus(index)"
                    @paste="handlePaste($event)"
                    @keydown="handleKeyDown($event, index)"
                  />
                </div>

                <div class="block">
                  <button
                    type="submit"
                    class="block w-full bg-main !text-white text-[16px] font-bold leading-normal !uppercase text-center p-2.5 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition"
                  >
                    xác nhận
                  </button>
                </div>

                <div class="mt-6 text-center">
                  <button
                    type="submit"
                    class="inline-flex items-center gap-2 text-[#909090] text-[16px] font-normal"
                  >
                    Gửi lại mã
                    <img
                      src="@/assets/images/material-symbols_refresh-rounded.svg"
                      alt=""
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.otp-inputs {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 8px;
}

.otp-input {
  width: 38px;
  height: 38px;
  color: #013878;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #ededf6;
  background: #fff;
  transition: border 0.3s;
}

.otp-input:focus {
  border-color: #013878;
}
</style>
