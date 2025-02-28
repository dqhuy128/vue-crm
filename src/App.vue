<script setup lang="ts">
import { onMounted } from "vue"

const calcBgBefore = () => {
  const element: any = document.getElementById("formLoginStart")
  const offsetLeft: number = element.offsetLeft
  console.log(offsetLeft)
}

onMounted(() => {
  calcBgBefore()
})
</script>

<template>
  <section
    class="relative flex flex-col items-center justify-center w-full h-[100vh] bg-[#E9F0F4] after:content-[] after:w-full after:h-full after:absolute after:right-0 after:bottom-0 after:bg-[url(./assets/images/svg-login.svg)] after:bg-no-repeat after:bg-right-bottom after:bg-auto after:pointer-events-none before:content-[] before:absolute before:left-0 before:top-0 before:bottom-0 before:h-full before:w-[41.4%] before:bg-white before:pointer-events-none"
  >
    <div
      id="formLoginStart"
      class="relative z-[1] max-w-[865px] max-h-[616px] h-full w-full m-auto rounded-[24px] shadow-[15px_21px_33px_0px_rgba(0,0,0,0.15)] overflow-hidden"
    >
      <div class="flex flex-row h-full">
        <div class="w-[31%] bg-[#E9F0F4]">
          <div class="py-[60px] px-[25px] flex flex-col h-full">
            <div class="max-w-[161px] w-full mx-auto mb-[45px]">
              <img
                src="./assets/images/logo-login.png"
                class="max-w-full h-auto object-scale-down"
                alt=""
              />
            </div>

            <div
              class="text-main font-inter text-[20px]/[33px] font-bold uppercase text-end pe-[25px]"
            >
              hệ thống <br />
              crm skygroup
            </div>

            <div class="w-full mt-auto">
              <img
                src="./assets/images/login-frame.svg"
                class="max-w-full h-auto object-scale-down"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="w-[69%] bg-white">
          <div
            class="max-w-[430px] mx-auto flex flex-col items-center justify-center h-full"
          >
            <div
              class="text-main font-inter text-[16px] font-bold uppercase leading-normal text-center mb-[50px]"
            >
              đăng nhập
            </div>

            <form action="" class="block w-full">
              <div class="block mb-4">
                <span
                  class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
                >
                  Tên đăng nhập
                </span>
                <input
                  type="text"
                  name=""
                  id=""
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
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Nhập mật khẩu"
                  class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                />
              </div>

              <div class="block text-end xl:mb-[70px] mb-[30px]">
                <router-link
                  to="/"
                  class="inline-block text-[#909090] font-inter text-[16px] font-bold leading-normal hover:text-main transition"
                  >Lấy lại mật khẩu</router-link
                >
              </div>

              <div class="block">
                <button
                  type="submit"
                  class="block w-full bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2.5 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
                >
                  đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
