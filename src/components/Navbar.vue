<script setup lang="ts">
  import 'vue-advanced-cropper/dist/style.css'

  import { Icon } from '@iconify/vue'
  import axios from 'axios'
  import { storeToRefs } from 'pinia'
  import { ErrorMessage, Field, Form, useForm } from 'vee-validate'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { Cropper } from 'vue-advanced-cropper'
  import { useAuth } from 'vue-auth3'
  import { RouterLink } from 'vue-router'

  import Modal from '@/components/Modals.vue'
  import { apiUri } from '@/constants/apiUri'
  import { change, destroyCropper, image, loadImage, postServer } from '@/lib/cropper'
  import { usePermissionStore } from '@/store/permission'
  interface recordModal {
    [key: string]: boolean
  }

  const auth = useAuth()
  const updateUrlAva = ref<string>('')
  const isPasswordVisible = ref(false)
  const { resetForm } = useForm()
  const cropperRef = ref(null)
  const permissionStore = usePermissionStore()
  const { modalUserInfo } = storeToRefs(permissionStore)
  const modalActive = ref<recordModal>({
    modalUserAvatar: false,
    modalUserCroppie: false,
  })

  const changePass = reactive({
    slogan: '',
    old_pass: '',
    new_pass: '',
    new_repass: '',
    error: '',
  })

  // Toggle edit mode for slogan (Bio/ Quote)
  const isEditingSlogan = ref(false)

  const sloganBeforeEdit = ref<string>('')

  const startEditingSlogan = () => {
    sloganBeforeEdit.value = changePass.slogan
    isEditingSlogan.value = true
  }

  const toggleModal = (modalStateName: any) => {
    modalActive.value[modalStateName] = !modalActive.value[modalStateName]
  }

  // Function to toggle the password visibility
  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  // Logout handler
  const handleLogout = async () => {
    try {
      // Perform logout without an API call
      await auth
        .logout({
          makeRequest: false, // Disable API request
          redirect: '/login', // Redirect to login page
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

    await postServer({ $refs: { cropper: cropperRef.value } }, auth.check(), auth.token(), updateUrlAva)
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

        const response = await axios.post(`${apiUri}/user/changepass`, formChangePass, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token()}`,
          },
        })

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

  const bio = ref<any>()
  const fetchIndividual = async () => {
    try {
      const { data } = await axios.get(`${apiUri}/dashboard/individual`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      const {
        data: {
          infor: { slogan },
        },
      } = data

      bio.value = slogan
    } catch (error) {
      console.error('Failed to fetch individual:', error)
    }
  }

  const handleUpdateSlogan = async () => {
    try {
      const formUpdateSlogan = new FormData()
      formUpdateSlogan.append('slogan', changePass.slogan)

      await axios.post(`${apiUri}/user/updateSlogan`, formUpdateSlogan, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
    } catch (error) {
      console.error('Failed to change password:', error)
    }
  }

  const submitSlogan = async () => {
    if (changePass.slogan) {
      await handleUpdateSlogan()
      await fetchIndividual()
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

  watch(bio, async (newValue) => {
    if (newValue) {
      await fetchIndividual()
    }
  })

  watch(isEditingSlogan, async (newValue, oldValue) => {
    if (oldValue && !newValue) {
      if (changePass.slogan !== sloganBeforeEdit.value) {
        await submitSlogan()
      }
    }
  })

  // onBeforeMount(() => {
  //   fetchUser()
  // })
  const permissionData = usePermissionStore()
  const { userData } = storeToRefs(permissionData)

  onMounted(() => {
    if (auth.check()) {
      if (!userData.value) {
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
      <button id="btnToggleSidebar" type="button" class="inline-block cursor-pointer rounded-[8px] bg-white p-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 18C3.71667 18 3.47934 17.904 3.288 17.712C3.09667 17.52 3.00067 17.2827 3 17C2.99934 16.7173 3.09534 16.48 3.288 16.288C3.48067 16.096 3.718 16 4 16H20C20.2833 16 20.521 16.096 20.713 16.288C20.905 16.48 21.0007 16.7173 21 17C20.9993 17.2827 20.9033 17.5203 20.712 17.713C20.5207 17.9057 20.2833 18.0013 20 18H4ZM4 13C3.71667 13 3.47934 12.904 3.288 12.712C3.09667 12.52 3.00067 12.2827 3 12C2.99934 11.7173 3.09534 11.48 3.288 11.288C3.48067 11.096 3.718 11 4 11H20C20.2833 11 20.521 11.096 20.713 11.288C20.905 11.48 21.0007 11.7173 21 12C20.9993 12.2827 20.9033 12.5203 20.712 12.713C20.5207 12.9057 20.2833 13.0013 20 13H4ZM4 8C3.71667 8 3.47934 7.904 3.288 7.712C3.09667 7.52 3.00067 7.28267 3 7C2.99934 6.71733 3.09534 6.48 3.288 6.288C3.48067 6.096 3.718 6 4 6H20C20.2833 6 20.521 6.096 20.713 6.288C20.905 6.48 21.0007 6.71733 21 7C20.9993 7.28267 20.9033 7.52033 20.712 7.713C20.5207 7.90567 20.2833 8.00133 20 8H4Z"
            fill="#464661"
          />
        </svg>
      </button>

      <div class="ms-auto inline-flex items-center gap-3 md:gap-6">
        <!-- <router-link
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
        </router-link> -->

        <div class="tippy-user-login">
          <tippy tag="button" content-tag="div" content-class="content-wrapper">
            <template #default>
              <div class="inline-flex cursor-pointer flex-wrap items-center gap-2">
                <div class="block">
                  <h3 v-if="auth.check() && userData" class="font-inter text-[16px] font-bold text-[#464661]">
                    {{ userData?.name }}
                  </h3>
                  <span class="font-inter block text-right text-[14px] font-normal text-[#909090]"> Online </span>
                </div>

                <div class="relative">
                  <div class="h-[38px] w-[38px] overflow-hidden rounded-[8px]">
                    <router-link to="">
                      <img class="h-full w-full object-cover" :src="updateUrlAva || userData?.avatar" alt="" />
                    </router-link>
                  </div>

                  <div
                    class="absolute right-[-4px] bottom-[-2px] h-[12px] w-[12px] rounded-[50%] border border-solid border-white bg-[#12F13E]"
                  ></div>
                </div>
              </div>
            </template>
            <template #content>
              <button
                type="button"
                class="font-inter hover:text-main block w-full cursor-pointer border-b border-solid border-[#E9F0F4] p-2.5 !text-start text-[16px] leading-normal font-normal text-[#464661] transition"
                @click="toggleModal('modalUserInfo')"
              >
                Thông tin cá nhân
              </button>
              <button
                type="button"
                class="font-inter hover:text-main block cursor-pointer p-2.5 text-[16px] leading-normal font-normal text-[#464661] transition"
                @click="handleLogout"
              >
                Đăng xuất
              </button>
            </template>
          </tippy>
        </div>
      </div>
    </div>

    <Modal :modal-active="modalActive.modalUserInfo" max-width="max-w-[702px]" @close="toggleModal('modalUserInfo')">
      <div class="overflow-hidden rounded-[24px] bg-white p-1.5">
        <div class="rounded-[18px_18px_0_0] bg-[#fafafa] p-5 pt-10">
          <div class="mb-4 text-center">
            <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">Thông tin cá nhân</h3>
          </div>

          <div class="relative mx-auto mb-4 h-full max-h-[112px] w-full max-w-[112px]">
            <div class="h-full w-full max-w-full overflow-hidden rounded-[24px] bg-[#E9F0F4]">
              <img :src="updateUrlAva || userData?.avatar" class="h-full w-full object-cover" alt="" />
            </div>

            <div class="absolute right-[-10px] bottom-[-10px] z-10">
              <img src="@/assets/images/ic-camera.svg" alt="" />
            </div>

            <input
              ref="file"
              class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              type="file"
              accept="image/*"
              @change="loadImage($event, modalActive)"
            />
          </div>

          <div class="mb-4 text-center">
            <h3 class="m-0 text-[16px] leading-normal font-bold text-[#464661]">
              {{ userData?.name }}
            </h3>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex grow items-center justify-center gap-2">
              <img src="@/assets/images/lucide_mail.svg" alt="" />
              <span class="text-[14px] leading-normal font-bold text-[#464661]">
                {{ userData?.email }}
              </span>
            </div>

            <div class="inline-flex grow items-center justify-center gap-2">
              <img src="@/assets/images/mynaui_mobile.svg" alt="" />
              <span class="text-[14px] leading-normal font-bold text-[#464661]">
                {{ userData?.phone }}
              </span>
            </div>
          </div>
        </div>

        <Form class="mx-auto block w-full max-w-[552px] p-4 xl:p-9" @submit="onSubmit">
          <div class="mb-3 text-start">
            <h3 class="m-0 text-base leading-normal font-bold text-[#464661]">Bio/ Quote</h3>
          </div>

          <div class="relative mb-9 flex items-center gap-3">
            <template v-if="!isEditingSlogan">
              <div class="flex w-full items-stretch gap-2">
                <div class="relative flex-1">
                  <div
                    class="font-inter w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 !pe-10 text-[16px] leading-normal font-normal text-[#1B4DEA] italic"
                  >
                    {{ bio || userData?.slogan || changePass.slogan || 'Nhập slogan' }}
                  </div>

                  <button
                    type="button"
                    class="absolute top-1/2 right-2.5 shrink-0 -translate-y-1/2 cursor-pointer"
                    @click="startEditingSlogan"
                  >
                    <Icon icon="mage:edit-fill" class="h-5 w-5 text-[#464661]" />
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <Field
                v-model="changePass.slogan"
                :value="userData?.slogan"
                :rules="isRequired('Vui lòng nhập slogan !')"
                :type="'text'"
                name="slogan"
                placeholder="Nhập slogan"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
                @blur="isEditingSlogan = false"
              />
            </template>
          </div>

          <div class="mb-3 text-center">
            <h3 class="m-0 text-[20px] leading-normal font-bold text-[#464661]">Đổi mật khẩu</h3>
          </div>

          <div class="mb-3 block">
            <span class="required font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
              Mật khẩu Cũ
            </span>
            <div class="relative">
              <Field
                v-model="changePass.old_pass"
                :rules="isRequired('Vui lòng nhập mật khẩu cũ !')"
                :type="isPasswordVisible ? 'text' : 'password'"
                name="old_pass"
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

            <ErrorMessage name="old_pass" class="mt-1 block text-sm text-red-500" />
          </div>

          <div class="mb-3 block">
            <span class="required font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
              Mật khẩu mới
            </span>
            <div class="relative">
              <Field
                v-model="changePass.new_pass"
                :rules="isRequired('Vui lòng nhập mật khẩu mới !')"
                :type="isPasswordVisible ? 'text' : 'password'"
                name="new_pass"
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

            <ErrorMessage name="new_pass" class="mt-1 block text-sm text-red-500" />
          </div>

          <div class="mb-3 block">
            <span class="required font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
              Nhập lại mật khẩu mới
            </span>
            <div class="relative">
              <Field
                v-model="changePass.new_repass"
                :rules="isRequired('Vui lòng nhập lại mật khẩu mới !')"
                :type="isPasswordVisible ? 'text' : 'password'"
                name="new_repass"
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

            <ErrorMessage name="new_repass" class="mt-1 block text-sm text-red-500" />
          </div>

          <p class="text-sm text-red-500">
            {{ changePass.error }}
          </p>

          <div class="mt-10 block text-center">
            <button
              type="submit"
              class="bg-main hover:shadow-hoverinset inset-sha inline-block min-w-[175px] cursor-pointer rounded-[8px] p-2 text-center text-[16px] leading-normal font-bold !text-white !uppercase transition hover:transition"
              :class="{
                'pointer-events-auto opacity-100': changePass.old_pass,
                'pointer-events-none opacity-50': !changePass.old_pass,
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
      :modal-active="modalActive.modalUserCroppie"
      max-width="max-w-[702px]"
      @close="handleCroppieClose()"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-1.5">
        <div class="min-h-[155px] rounded-[18px_18px_0_0] bg-[#fafafa] p-5 pt-10">
          <div class="mb-4 text-center">
            <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">chọn ảnh đại diện</h3>
          </div>
        </div>

        <form class="block w-full max-w-[100%] py-4" @submit.prevent="handlePostServer()">
          <div class="block">
            <cropper
              ref="cropperRef"
              class="cropper"
              :src="image.src"
              :stencil-props="{
                aspectRatio: 1 / 1,
              }"
              @change="change"
            />
          </div>

          <div class="mt-10 block text-center">
            <button
              type="submit"
              class="bg-main hover:shadow-hoverinset inset-sha inline-block min-w-[175px] cursor-pointer rounded-[8px] p-2 text-center text-[16px] leading-normal font-bold !text-white !uppercase transition hover:transition"
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
  [data-tippy-root] {
    z-index: 99 !important;
  }

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
