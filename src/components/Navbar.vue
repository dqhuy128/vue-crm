<script setup lang="ts">
import Modal from '@/components/Modals.vue'
import { apiUri } from '@/constants/apiUri'
import {
  change,
  destroyCropper,
  image,
  loadImage,
  postServer
} from '@/lib/cropper'
import { apiClient } from '@/plugins/axios'
import { usePermissionStore } from '@/store/permission'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { ErrorMessage, Field, Form, useForm } from 'vee-validate'
import { onMounted, reactive, ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { useAuth } from 'vue-auth3'
import { RouterLink } from 'vue-router'
interface recordModal {
  [key: string]: boolean
}

const auth = useAuth()
const token = ref<string | null>(null)
const user = ref<any>(null)
const isAuthenticated = ref(false)
const updateUrlAva = ref<string>('')
const isPasswordVisible = ref(false)
const { resetForm } = useForm()
const cropperRef = ref(null)
const permissionStore = usePermissionStore()
const modalActive = ref<recordModal>({
  modalUserInfo: false,
  modalUserAvatar: false,
  modalUserCroppie: false
})

const changePass = reactive({
  old_pass: '',
  new_pass: '',
  new_repass: '',
  error: ''
})

const toggleModal = (modalStateName: any) => {
  modalActive.value[modalStateName] = !modalActive.value[modalStateName]
}

// Function to toggle the password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

// const fetchUser = async () => {
//   isAuthenticated.value = auth.check()

//   if (isAuthenticated.value) {
//     token.value = auth.token() // Gets the default token
//     // Fetch user data from the API
//     try {
//       const response = await auth.fetch({
//         method: 'get',
//         url: `${apiUri}/user/info`,
//         credentials: 'include',
//         headers: {
//           Authorization: `Bearer ${token.value}`
//         }
//       })

//       const { data } = response.data
//       user.value = data
//     } catch (error: any) {
//       console.error('NavBar.vue ~ Failed to fetch user data:', error)

//       if (error.response?.status === 401) {
//         // Logout user
//         await auth.logout({
//           makeRequest: false,
//           redirect: '/login'
//         }).then(() =>{
//           permissionStore.$reset();
//         })

//         // console.clear()
//       }
//     }
//   }
// }

// Logout handler
const handleLogout = async () => {
  try {
    // Perform logout without an API call
    await auth
      .logout({
        makeRequest: false, // Disable API request
        redirect: '/login' // Redirect to login page
      })
      .then(() => {
        permissionStore.$reset() // Reset the permission store
      })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const handleCroppieClose = () => {
  toggleModal('modalUserCroppie')
  if (cropperRef.value) {
    destroyCropper({ $refs: { cropper: cropperRef.value } })
  } else {
    image.src = null // Just reset the image if no ref is available
  }
}

const handlePostServer = async () => {
  if (!cropperRef.value) {
    console.error('Cropper reference is missing')
    return
  }

  await postServer(
    { $refs: { cropper: cropperRef.value } },
    auth.check(),
    auth.token(),
    updateUrlAva
  )
  modalActive.value['modalUserCroppie'] = false
}

const handleChangePass = async () => {
  changePass.error = ''

  try {
    if (auth.check()) {
      const formChangePass = new FormData()
      formChangePass.append('old_pass', changePass.old_pass)
      formChangePass.append('new_pass', changePass.new_pass)
      formChangePass.append('new_repass', changePass.new_repass)

      const response = await axios.post(
        `/api/user/changepass`,
        formChangePass,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token()}`
          }
        }
      )

      const { old_pass } = response.data.errors
      const { new_pass } = response.data.errors
      const { message } = response.data
      const { status } = response.data

      changePass.error = old_pass ? old_pass : new_pass ? new_pass : null

      if (status === 1) {
        changePass.error = message

        setTimeout(() => {
          changePass.error = ''
        }, 5000)
      }
    }
  } catch (error) {
    console.error('Failed to change password:', error)
  }
}

const onSubmit = async (values: any, { resetForm }: any) => {
  console.log(values)
  await handleChangePass()
  resetForm()
}

const isRequired = (text: string) => {
  return (value: any) => (value && value.trim() ? true : text)
}

// onBeforeMount(() => {
//   fetchUser()
// })
const permissionData = usePermissionStore()
const { userData } = storeToRefs(permissionData)

onMounted(() => {
  if (auth.check()) {
    if (!userData) {
      const token = auth.token()
      if (token) {
        permissionData.fetchUserData(token)
      }
    }
  }
})
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

      <div class="inline-flex gap-3 items-center md:gap-6 ms-auto">
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
          <tippy tag="button" content-tag="div" content-class="content-wrapper">
            <template #default>
              <div
                class="inline-flex flex-wrap gap-2 items-center cursor-pointer"
              >
                <div class="block">
                  <h3
                    class="text-[#464661] font-inter text-[16px] font-bold"
                    v-if="auth.check() && userData"
                  >
                    {{ userData?.name }}
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
                        class="object-cover w-full h-full"
                        :src="updateUrlAva || userData?.avatar"
                        alt=""
                      />
                    </router-link>
                  </div>

                  <div
                    class="absolute bottom-[-2px] right-[-4px] w-[12px] h-[12px] rounded-[50%] bg-[#12F13E] border border-solid border-white"
                  ></div>
                </div>
              </div>
            </template>
            <template #content>
              <button
                type="button"
                class="block w-full !text-start text-[#464661] font-inter text-[16px] font-normal leading-normal p-2.5 hover:text-main transition border-b border-solid border-[#E9F0F4] cursor-pointer"
                @click="toggleModal('modalUserInfo')"
              >
                Thông tin cá nhân
              </button>
              <button
                type="button"
                class="block text-[#464661] font-inter text-[16px] font-normal leading-normal p-2.5 hover:text-main transition cursor-pointer"
                @click="handleLogout"
              >
                Đăng xuất
              </button>
            </template>
          </tippy>
        </div>
      </div>
    </div>

    <Modal
      @close="toggleModal('modalUserInfo')"
      :modalActive="modalActive.modalUserInfo"
      maxWidth="max-w-[702px]"
    >
      <div class="rounded-[24px] p-1.5 bg-white overflow-hidden">
        <div class="bg-[#fafafa] rounded-[18px_18px_0_0] p-5 pt-10">
          <div class="mb-4 text-center">
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
                :src="updateUrlAva || userData?.avatar"
                class="object-cover w-full h-full"
                alt=""
              />
            </div>

            <div class="absolute bottom-[-10px] right-[-10px] z-10">
              <img src="@/assets/images/ic-camera.svg" alt="" />
            </div>

            <input
              class="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
              type="file"
              ref="file"
              @change="loadImage($event, modalActive)"
              accept="image/*"
            />
          </div>

          <div class="mb-4 text-center">
            <h3 class="m-0 text-[#464661] text-[16px] font-bold leading-normal">
              {{ userData?.name }}
            </h3>
          </div>

          <div class="flex flex-wrap gap-2 items-center">
            <div class="inline-flex gap-2 justify-center items-center grow">
              <img src="@/assets/images/lucide_mail.svg" alt="" />
              <span class="text-[#464661] text-[14px] font-bold leading-normal">
                {{ userData?.email }}
              </span>
            </div>

            <div class="inline-flex gap-2 justify-center items-center grow">
              <img src="@/assets/images/mynaui_mobile.svg" alt="" />
              <span class="text-[#464661] text-[14px] font-bold leading-normal">
                {{ userData?.phone }}
              </span>
            </div>
          </div>
        </div>

        <Form
          class="block w-full max-w-[552px] mx-auto xl:p-9 p-4"
          @submit="onSubmit"
        >
          <div class="mb-3 text-center">
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
              <Field
                :rules="isRequired('Vui lòng nhập mật khẩu cũ !')"
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="changePass.old_pass"
                name="old_pass"
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

            <ErrorMessage
              name="old_pass"
              class="block mt-1 text-sm text-red-500"
            />
          </div>

          <div class="block mb-3">
            <span
              class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
            >
              Mật khẩu mới
            </span>
            <div class="relative">
              <Field
                :rules="isRequired('Vui lòng nhập mật khẩu mới !')"
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="changePass.new_pass"
                name="new_pass"
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

            <ErrorMessage
              name="new_pass"
              class="block mt-1 text-sm text-red-500"
            />
          </div>

          <div class="block mb-3">
            <span
              class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
            >
              Nhập lại mật khẩu mới
            </span>
            <div class="relative">
              <Field
                :rules="isRequired('Vui lòng nhập lại mật khẩu mới !')"
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="changePass.new_repass"
                name="new_repass"
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

            <ErrorMessage
              name="new_repass"
              class="block mt-1 text-sm text-red-500"
            />
          </div>

          <p class="text-sm text-red-500">
            {{ changePass.error }}
          </p>

          <div class="block mt-10 text-center">
            <button
              type="submit"
              class="inline-block min-w-[175px] bg-main !text-white text-[16px] font-bold leading-normal !uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
              :class="{
                'pointer-events-auto opacity-100': changePass.old_pass,
                'pointer-events-none opacity-50': !changePass.old_pass
              }"
            >
              Lưu
            </button>
          </div>
        </Form>
      </div>
    </Modal>

    <!-- @open="initializeCropper(this)" -->
    <Modal
      v-if="modalActive.modalUserCroppie"
      @close="handleCroppieClose()"
      :modalActive="modalActive.modalUserCroppie"
      maxWidth="max-w-[702px]"
    >
      <div class="rounded-[24px] p-1.5 bg-white overflow-hidden">
        <div
          class="bg-[#fafafa] rounded-[18px_18px_0_0] p-5 pt-10 min-h-[155px]"
        >
          <div class="mb-4 text-center">
            <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
              chọn ảnh đại diện
            </h3>
          </div>
        </div>

        <form
          class="block w-full max-w-[100%] py-4"
          @submit.prevent="handlePostServer()"
        >
          <div class="block">
            <cropper
              ref="cropperRef"
              class="cropper"
              :src="image.src"
              :stencil-props="{
                aspectRatio: 1 / 1
              }"
              @change="change"
            />
          </div>

          <div class="block mt-10 text-center">
            <button
              type="submit"
              class="inline-block min-w-[175px] bg-main !text-white text-[16px] font-bold leading-normal !uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
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

.cropper {
  height: 415px;
  width: 100%;
  background: transparent;
}

.vue-advanced-cropper__background,
.vue-advanced-cropper__foreground {
  background: #fafafa;
}
</style>
