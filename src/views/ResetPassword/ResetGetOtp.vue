<script setup lang="ts">
  import axios from 'axios'
  import { onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import { apiUri } from '@/constants/apiUri'
  import router from '@/router'

  import { calcBgBefore } from '../../lib/index'

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

      const response = await axios.post(`${apiUri}/user/otp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('🚀 ~ handlePostOtp ~ response:', response)
      const { errors } = response.data

      if (errors) {
        alert(errors)
        return
      }

      router.push({
        name: 'ResetGetPass',
        query: { email: email.value },
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Move focus to next input after typing
  const moveFocus = (index: any) => {
    if (otpValues.value[index].length === 1 && index < otpValues.value.length - 1) {
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
    class="after:content-[] relative flex h-[100vh] w-full flex-col items-center justify-center bg-[#E9F0F4] after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:h-full after:w-full after:bg-[url(./assets/images/svg-login.svg)] after:bg-auto after:bg-right-bottom after:bg-no-repeat"
  >
    <div
      id="rectangleLogin"
      class="pointer-events-none fixed top-0 bottom-0 left-0 h-[100vh] bg-white max-md:hidden"
    ></div>
    <div class="mx-[15px] w-[calc(100%-30px)]">
      <div
        id="formLoginIndex"
        class="relative z-[1] m-auto h-full max-h-[616px] w-full max-w-[865px] overflow-hidden rounded-[24px] shadow-[15px_21px_33px_0px_rgba(0,0,0,0.15)]"
      >
        <div class="flex h-full flex-row flex-wrap">
          <div id="formLoginStart" class="w-full bg-[#E9F0F4] md:w-[31%]">
            <div class="flex h-full flex-col p-4 md:px-[25px] md:py-[60px]">
              <div class="mx-auto w-full max-w-[110px] md:mb-[45px] md:max-w-[161px]">
                <img src="@/assets/images/logo-login.png" class="h-auto max-w-full object-scale-down" alt="" />
              </div>

              <div
                class="text-main font-inter mb-8 hidden text-end text-[20px]/[33px] font-bold uppercase md:block lg:pe-[25px]"
              >
                hệ thống <br />
                crm skygroup
              </div>

              <div class="mx-auto mt-auto hidden w-full md:block">
                <img src="@/assets/images/login-frame.svg" class="h-auto max-w-full object-scale-down" alt="" />
              </div>
            </div>
          </div>

          <div class="w-full bg-white md:w-[69%]">
            <div class="mx-auto flex h-full max-w-[430px] flex-col items-center justify-center max-md:p-4">
              <div class="text-main font-inter mb-7 text-center text-[16px] leading-normal font-bold uppercase">
                Lấy lại mật khẩu
              </div>

              <div
                class="mx-auto mb-10 max-w-[235px] text-center text-[16px] leading-normal font-normal text-[#909090]"
              >
                Bạn sẽ nhận được mã kích hoạt từ email của bạn
              </div>

              <form class="block w-full" @submit.prevent="handlePostOtp">
                <div class="mb-3 text-center text-[16px] font-bold text-[#464661]">Nhập mã kích hoạt</div>

                <div class="otp-inputs mb-12">
                  <input
                    v-for="(otp, index) in otpValues"
                    :id="'otp' + (index + 1)"
                    :key="index"
                    v-model="otpValues[index]"
                    type="text"
                    maxlength="1"
                    class="otp-input"
                    @input="moveFocus(index)"
                    @paste="handlePaste($event)"
                    @keydown="handleKeyDown($event, index)"
                  />
                </div>

                <div class="block">
                  <button
                    type="submit"
                    class="bg-main hover:shadow-hoverinset block w-full cursor-pointer rounded-[8px] p-2.5 text-center text-[16px] leading-normal font-bold !text-white !uppercase transition hover:transition"
                  >
                    xác nhận
                  </button>
                </div>

                <div class="mt-6 text-center">
                  <button type="submit" class="inline-flex items-center gap-2 text-[16px] font-normal text-[#909090]">
                    Gửi lại mã
                    <img src="@/assets/images/material-symbols_refresh-rounded.svg" alt="" />
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
