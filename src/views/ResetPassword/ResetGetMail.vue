<script setup lang="ts">
  import axios from 'axios'
  import { onMounted, ref } from 'vue'

  import { apiUri } from '@/constants/apiUri'
  import router from '@/router'

  import { calcBgBefore } from '../../lib/index'

  const email = ref<string>('')
  const handleEmailChange = async () => {
    const formData = new FormData()
    formData.append('email', email.value)

    try {
      const response = await axios.post(`${apiUri}/user/forgotpass`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const { errors } = response.data

      if (errors) {
        alert(errors)
        return
      }

      router.push({
        name: 'ResetGetOtp',
        query: { email: email.value },
      })
      console.log('🚀 ~ handleEmailChange ~ response:', response)
    } catch (error) {
      console.log(error)
    }
  }

  // const emit = defineEmits(['handleStep'])

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
              <div class="text-main font-inter mb-[50px] text-center text-[16px] leading-normal font-bold uppercase">
                Lấy lại mật khẩu
              </div>

              <form action="" class="block w-full" @submit.prevent="handleEmailChange()">
                <div class="mb-10 block">
                  <span class="required font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                    Email của bạn
                  </span>
                  <div class="relative">
                    <input
                      id="formEmail"
                      v-model="email"
                      name="formEmail"
                      placeholder="Nhập email"
                      class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
                    />

                    <button type="button" class="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer">
                      <img src="@/assets/images/majesticons_mail-line.svg" alt="" />
                    </button>
                  </div>
                </div>

                <div class="block">
                  <button
                    type="submit"
                    class="bg-main hover:shadow-hoverinset block w-full cursor-pointer rounded-[8px] p-2.5 text-center text-[16px] leading-normal font-bold !text-white !uppercase transition hover:transition"
                    :class="{
                      'pointer-events-auto opacity-100': email,
                      'pointer-events-none opacity-50': !email,
                    }"
                  >
                    tiếp tục
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
