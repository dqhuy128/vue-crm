<template>
  <MainLayout>
    <div class="mb-3">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-6">
          <SeachBox class="max-w-[550px]">
            <div class="relative grow">
              <input
                type="text"
                name=""
                id=""
                placeholder="Nhập chức vụ"
                class="w-full text-[#909090] text-[16px] max-md:text-[14px] font-normal p-2.5 bg-white border border-solid border-[#EDEDF6] rounded-[24px]"
              />
            </div>
          </SeachBox>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2 mt-5 mb-3">
      <div
        class="flex-[1] max-md:text-[16px] text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Danh sách phân quyền
      </div>

      <div class="inline-flex flex-wrap items-center gap-4 ms-auto">
        <button
          type="button"
          id="tableAdding"
          class="rounded-[24px] bg-[#1b4dea] inline-flex items-end max-md:items-center md:gap-2 p-[7px_12px] cursor-pointer transition hover:shadow-hoverinset"
          @click="toggleModal('modalNewPermission')"
        >
          <img src="@/assets/images/si_add-fill.svg" alt="" />
          <span
            class="text-white font-inter text-[16px] max-md:text-[12px] font-bold leading-normal"
          >
            Thêm mới
          </span>
        </button>
      </div>
    </div>

    <Modal
      @close="toggleModal('modalNewPermission')"
      :modalActive="modalActive.modalNewPermission"
      maxWidth="max-w-[865px]"
    >
      <div class="rounded-[24px] p-1.5 bg-white overflow-hidden py-12 px-6">
        <div class="mb-12 text-center max-md:mb-6">
          <h3
            class="inline-block text-[#464661] text-[16px] font-bold uppercase"
          >
            thêm mới nhóm quyền
          </h3>
        </div>

        <form action="" class="">
          <div class="block mb-6">
            <span
              class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Chức vụ
            </span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Nhập chức vụ"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
            />
          </div>

          <div class="block mb-4">
            <span
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Mô tả
            </span>
            <textarea
              name=""
              id=""
              placeholder="Nhập mô tả"
              class="w-full border min-h-[120px] border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
            ></textarea>
          </div>

          <div class="block mb-4">
            <span
              class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Chức năng nhóm quyền
            </span>

            <TreeComponent />
          </div>

          <div
            class="flex flex-wrap items-stretch justify-center gap-4 mt-10 text-center max-md:mt-6 xl:gap-6"
          >
            <button
              @click="toggleModal('modalNewPermission')"
              type="button"
              class="max-md:grow inline-block md:min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] max-md:text-[14px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] max-md:text-[14px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </MainLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import MainLayout from "../MainLayout.vue"
import SeachBox from "../../components/SeachBox.vue"
import Modal from "@/components/Modals.vue"
import TreeComponent from "../../components/TreeComponent.vue"
import "flatpickr/dist/flatpickr.css"

interface recordModal {
  [key: string]: boolean
}

const modalActive = ref<recordModal>({
  modalNewPermission: false
})

const toggleModal = (modalStateName: any) => {
  modalActive.value[modalStateName] = !modalActive.value[modalStateName]
}
</script>

<style lang="scss" scoped></style>
