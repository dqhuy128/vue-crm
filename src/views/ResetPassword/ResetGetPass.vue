<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { calcBgBefore } from '../../lib/index'
import { apiClient } from '@/plugins/axios'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const password1 = ref('')
const password2 = ref('')
const isPasswordVisible = ref(false)
const email = ref<string>('')

// Function to toggle the password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

// Function to handle password reset submission
const handleResetPassword = async () => {
  if (password1.value !== password2.value) {
    alert('Mật khẩu không khớp')
    return
  }

  if (!password1.value || password1.value.length < 6) {
    alert('Mật khẩu phải có ít nhất 6 ký tự')
    return
  }

  try {
    const formData = new FormData()
    formData.append('email', email.value)
    formData.append('password', password1.value)
    formData.append('repass', password2.value)

    const response = await apiClient.post('/user/newpass', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('🚀 ~ handleResetPassword ~ response:', response)
    alert('Đặt lại mật khẩu thành công')
    router.push({ name: 'Login' })
  } catch (error) {
    console.log(error)
    alert('Đặt lại mật khẩu thất bại')
  }
}

onMounted(() => {
  calcBgBefore()
  if (route.query.email) {
    email.value = route.query.email as string
    console.log('Email retrieved from query params:', email.value)
  }
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
                  class="object-scale-down h-auto max-w-full"
                  alt=""
                />
              </div>

              <div
                class="text-main font-inter text-[20px]/[33px] font-bold uppercase text-end lg:pe-[25px] mb-8 hidden md:block"
              >
                hệ thống <br />
                crm skygroup
              </div>

              <div class="hidden w-full mx-auto mt-auto md:block">
                <img
                  src="@/assets/images/login-frame.svg"
                  class="object-scale-down h-auto max-w-full"
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
                class="text-main font-inter text-[16px] font-bold uppercase leading-normal text-center mb-[50px]"
              >
                đặt lại mật khẩu
              </div>

              <form @submit.prevent="handleResetPassword" class="block w-full">
                <div class="block mb-3">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                  >
                    Nhập mật khẩu mới
                  </span>
                  <div class="relative">
                    <input
                      :type="isPasswordVisible ? 'text' : 'password'"
                      v-model="password1"
                      name=""
                      placeholder="Nhập mật khẩu"
                      class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                    />

                    <button
                      @click="togglePasswordVisibility"
                      type="button"
                      class="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <template v-if="isPasswordVisible">
                        <img
                          src="@/assets/images/clarity_eye-show-solid.svg"
                          alt=""
                        />
                      </template>

                      <template v-else>
                        <img
                          src="@/assets/images/clarity_eye-hide-solid.svg"
                          alt=""
                        />
                      </template>
                    </button>
                  </div>
                </div>

                <div class="block mb-3">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                  >
                    Nhập lại mật khẩu
                  </span>
                  <div class="relative">
                    <input
                      :type="isPasswordVisible ? 'text' : 'password'"
                      v-model="password2"
                      name=""
                      placeholder="Nhập mật khẩu"
                      class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                    />

                    <button
                      @click="togglePasswordVisibility"
                      type="button"
                      class="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <template v-if="isPasswordVisible">
                        <img
                          src="@/assets/images/clarity_eye-show-solid.svg"
                          alt=""
                        />
                      </template>

                      <template v-else>
                        <img
                          src="@/assets/images/clarity_eye-hide-solid.svg"
                          alt=""
                        />
                      </template>
                    </button>
                  </div>
                </div>

                <div class="block">
                  <button
                    type="submit"
                    class="block w-full bg-main !text-white text-[16px] font-bold leading-normal !uppercase text-center p-2.5 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
                  >
                    Xác nhận
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
