<script setup lang="ts">
import { calcBgBefore } from '@/lib/index'
import { onMounted, reactive, ref } from 'vue'
import { useAuth } from 'vue-auth3'
import { useRouter } from 'vue-router'
import { apiUri } from '@/constants/apiUri'

const isPasswordVisible = ref(false)
// Function to toggle the password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const router = useRouter()
const auth = useAuth()

const form = reactive({
  username: '0904345514',
  password: '123456@'
})

const error = ref<string | null>(null)

const handleLogin = async () => {
  error.value = null

  try {
    const formData = new FormData()
    formData.append('username', form.username)
    formData.append('password', form.password)

    const res = await auth.login({
      method: 'post',
      url: `${apiUri}/user/login`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      staySignedIn: true,
      fetchUser: true
    })

    if (res.data.status !== 1) {
      //  dang nhap ko thanh cong
      error.value = 'Đăng nhập thất bại'
      if (res.data.errors && res.data.errors.login) {
        error.value = res.data.errors.login
      }
    } else {
      // get access token
      const { access_token } = res.data.data

      // Set the access_token as the default token in Vue Auth 3
      auth.token(null, access_token)

      // dang nhap thanh cong
      router.push({ name: 'Personal' })
    }
  } catch (err: any) {
    console.error('Chi tiết lỗi:', err)
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
                đăng nhập
              </div>

              <form class="block w-full" @submit.prevent="handleLogin">
                <div class="block mb-4">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                  >
                    Tên đăng nhập
                  </span>
                  <input
                    v-model="form.username"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Nhập tên đăng nhập"
                    class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                  />
                </div>

                <div class="block mb-3">
                  <span
                    class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                  >
                    Mật khẩu
                  </span>
                  <div class="relative">
                    <input
                      :type="isPasswordVisible ? 'text' : 'password'"
                      v-model="form.password"
                      name="password"
                      id="password"
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

                <p v-if="error" class="my-2 text-sm text-red-600">
                  {{ error }}
                </p>

                <div class="block text-end xl:mb-[70px] mb-[30px]">
                  <router-link
                    :to="{ name: 'ResetPass' }"
                    class="inline-block text-[#909090] font-inter text-[16px] font-bold leading-normal hover:text-main transition"
                  >
                    Lấy lại mật khẩu
                  </router-link>
                </div>

                <div class="block">
                  <button
                    type="submit"
                    class="block w-full bg-main !text-white text-[16px] font-bold leading-normal !uppercase text-center p-2.5 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
                  >
                    đăng nhập
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
