<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ref } from "vue"
import Modal from "@/components/Modals.vue"

const modalState = ref<Record<string, boolean>>({
  modal1: false
})

const showModal = (modalName: any) => {
  modalState.value[modalName] = true
}

const closeModal = (modalName: any) => {
  modalState.value[modalName] = false
}

const password1 = ref("")
const password2 = ref("")
const password3 = ref("")
const isPasswordVisible = ref(false)

// Function to toggle the password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div id="NavBar">
    <div class="flex flex-wrap items-center">
      <button
        id="btnToggleSidebar"
        type="button"
        class="inline-block bg-white rounded-[8px] p-2 cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18C3.71667 18 3.47934 17.904 3.288 17.712C3.09667 17.52 3.00067 17.2827 3 17C2.99934 16.7173 3.09534 16.48 3.288 16.288C3.48067 16.096 3.718 16 4 16H20C20.2833 16 20.521 16.096 20.713 16.288C20.905 16.48 21.0007 16.7173 21 17C20.9993 17.2827 20.9033 17.5203 20.712 17.713C20.5207 17.9057 20.2833 18.0013 20 18H4ZM4 13C3.71667 13 3.47934 12.904 3.288 12.712C3.09667 12.52 3.00067 12.2827 3 12C2.99934 11.7173 3.09534 11.48 3.288 11.288C3.48067 11.096 3.718 11 4 11H20C20.2833 11 20.521 11.096 20.713 11.288C20.905 11.48 21.0007 11.7173 21 12C20.9993 12.2827 20.9033 12.5203 20.712 12.713C20.5207 12.9057 20.2833 13.0013 20 13H4ZM4 8C3.71667 8 3.47934 7.904 3.288 7.712C3.09667 7.52 3.00067 7.28267 3 7C2.99934 6.71733 3.09534 6.48 3.288 6.288C3.48067 6.096 3.718 6 4 6H20C20.2833 6 20.521 6.096 20.713 6.288C20.905 6.48 21.0007 6.71733 21 7C20.9993 7.28267 20.9033 7.52033 20.712 7.713C20.5207 7.90567 20.2833 8.00133 20 8H4Z"
            fill="#464661"
          />
        </svg>
      </button>

      <div class="ms-auto inline-flex items-center gap-6">
        <router-link
          to=""
          class="relative inline-block bg-white rounded-[8px] p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.7501 9.71V9.005C18.7501 5.136 15.7261 2 12.0001 2C8.27406 2 5.25006 5.136 5.25006 9.005V9.71C5.25127 10.5516 5.01111 11.3758 4.55806 12.085L3.45006 13.81C2.43906 15.385 3.21106 17.526 4.97006 18.024C9.56635 19.3257 14.4338 19.3257 19.0301 18.024C20.7891 17.526 21.5611 15.385 20.5501 13.811L19.4421 12.086C18.9887 11.3769 18.7482 10.5527 18.7491 9.711L18.7501 9.71Z"
              stroke="#464661"
              stroke-width="1.5"
            />
            <path
              d="M7.5 19C8.155 20.748 9.922 22 12 22C14.078 22 15.845 20.748 16.5 19"
              stroke="#464661"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>

          <span
            class="absolute top-0 right-0 translate-x-[25%] translate-y-[-25%] inline-flex items-center justify-center rounded-[50%] bg-[#1B4DEA] w-4 h-4 text-white font-inter text-[10px] font-normal leading-normal"
            >2</span
          >
        </router-link>

        <div class="tippy-user-login">
          <tippy
            tag="button"
            content-tag="div"
            content-class="content-wrapper "
          >
            <template #default>
              <div
                class="cursor-pointer inline-flex flex-wrap items-center gap-2"
              >
                <div class="block">
                  <h3 class="text-[#464661] font-inter text-[16px] font-bold">
                    Nguyễn Đức Hiếu
                  </h3>
                  <span
                    class="block text-[#909090] font-inter text-[14px] font-normal text-right"
                  >
                    Online
                  </span>
                </div>

                <div class="relative">
                  <div class="w-[38px] h-[38px] rounded-[8px] overflow-hidden">
                    <router-link to="">
                      <img
                        class="w-full h-full object-cover"
                        src="@/assets/images/sm-avatar.png"
                        alt=""
                      />
                    </router-link>
                  </div>

                  <div
                    class="absolute bottom-0 right-0 w-[12px] h-[12px] rounded-[50%] bg-[#12F13E] border border-solid border-white"
                  ></div>
                </div>
              </div>
            </template>
            <template #content>
              <button
                type="button"
                class="block w-full !text-start text-[#464661] font-inter text-[16px] font-normal leading-normal p-2.5 hover:text-main transition border-b border-solid border-[#E9F0F4]"
                @click="showModal('modal1')"
              >
                Thông tin cá nhân
              </button>
              <router-link
                to=""
                class="block text-[#464661] font-inter text-[16px] font-normal leading-normal p-2.5 hover:text-main transition"
              >
                Đăng xuất
              </router-link>
            </template>
          </tippy>
        </div>
      </div>
    </div>

    <Modal
      :isVisible="modalState.modal1"
      :closeModal="() => closeModal('modal1')"
    >
      <div class="bg-[#fafafa] rounded-[18px_18px_0_0] p-5 pt-10">
        <div class="text-center mb-4">
          <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
            Thông tin cá nhân
          </h3>
        </div>

        <div
          class="relative max-w-[112px] max-h-[112px] w-full h-full mx-auto mb-4"
        >
          <div
            class="w-full h-full max-w-full bg-[#E9F0F4] rounded-[24px] overflow-hidden"
          >
            <img
              src="@/assets/images/si_user-fill.svg"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div class="absolute right-0 bottom-0 z-10">
            <img src="@/assets/images/ic-camera.svg" alt="" />
          </div>
        </div>

        <div class="mb-4 text-center">
          <h3 class="m-0 text-[#464661] text-[16px] font-bold leading-normal">
            Nguyễn Đức Hiếu
          </h3>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <div class="grow inline-flex items-center justify-center gap-2">
            <img src="@/assets/images/lucide_mail.svg" alt="" />
            <span class="text-[#464661] text-[14px] font-bold leading-normal">
              hieund@abc.com
            </span>
          </div>

          <div class="grow inline-flex items-center justify-center gap-2">
            <img src="@/assets/images/mynaui_mobile.svg" alt="" />
            <span class="text-[#464661] text-[14px] font-bold leading-normal">
              090 333 4444
            </span>
          </div>
        </div>
      </div>

      <form
        action=""
        class="block w-full max-w-[480px] mx-auto md:p-[36px] md:pb-[45px] p-4"
      >
        <div class="text-center mb-3">
          <h3 class="m-0 text-[#464661] text-[20px] font-bold leading-normal">
            Đổi mật khẩu
          </h3>
        </div>

        <div class="block mb-3">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
          >
            Mật khẩu Cũ
          </span>
          <div class="relative">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model="password1"
              name=""
              id="inputPassword"
              placeholder="Nhập mật khẩu"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />

            <button
              @click="togglePasswordVisibility"
              type="button"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
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

        <div class="block mb-3">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
          >
            Mật khẩu mới
          </span>
          <div class="relative">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model="password2"
              name=""
              id="inputPassword"
              placeholder="Nhập mật khẩu"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />

            <button
              @click="togglePasswordVisibility"
              type="button"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
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

        <div class="block mb-3">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
          >
            Nhập lại mật khẩu mới
          </span>
          <div class="relative">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model="password3"
              name=""
              id="inputPassword"
              placeholder="Nhập mật khẩu"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />

            <button
              @click="togglePasswordVisibility"
              type="button"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
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

        <div class="block text-center mt-10">
          <button
            type="submit"
            class="inline-block min-w-[175px] bg-main !text-white text-[16px] font-bold leading-normal !uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
          >
            Lưu
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<style lang="scss">
.tippy-user-login {
  .tippy-box {
    min-width: 192px;
    width: 100%;
    box-shadow: none !important;
  }

  .tippy-content {
    padding: 0;
    border-radius: 8px;
    background: #fff;
  }
}
</style>
