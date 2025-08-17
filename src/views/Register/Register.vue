<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import { calcBgBefore } from '@/lib/index'

  const isPasswordVisible = ref(false)
  // Function to toggle the password visibility
  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  const name = ref(null)
  const password = ref(null)

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
                đăng ký
              </div>

              <form class="block w-full">
                <div class="mb-4 block">
                  <span class="required font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                    Tên đăng nhập
                  </span>
                  <input
                    id=""
                    v-model="name"
                    type="text"
                    name=""
                    placeholder="Nhập tên đăng nhập"
                    class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
                  />
                </div>

                <div class="mb-3 block">
                  <span class="required font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                    Mật khẩu
                  </span>
                  <div class="relative">
                    <input
                      v-model="password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      name=""
                      placeholder="Nhập mật khẩu"
                      class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
                    />

                    <button
                      type="button"
                      class="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
                      @click="togglePasswordVisibility"
                    >
                      <template v-if="isPasswordVisible">
                        <img src="@/assets/images/clarity_eye-show-solid.svg" alt="" />
                      </template>

                      <template v-else>
                        <img src="@/assets/images/clarity_eye-hide-solid.svg" alt="" />
                      </template>
                    </button>
                  </div>
                </div>

                <div class="block">
                  <button
                    type="submit"
                    class="bg-main hover:shadow-hoverinset inset-sha block w-full cursor-pointer rounded-[8px] p-2.5 text-center text-[16px] leading-normal font-bold !text-white !uppercase transition hover:transition"
                  >
                    đăng ký
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
