<template>
  <MainLayout>
    <div class="bg-white rounded-[24px] p-2.5">
      <form action="" class="flex flex-wrap items-stretch gap-4">
        <div class="grow max-md:flex-[100%]">
          <input
            type="text"
            name=""
            id=""
            placeholder="Nhập tên danh mục"
            class="block w-full border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal"
          />
        </div>

        <div class="select-block grow max-lg:flex-[100%]">
          <select
            name=""
            id=""
            class="border border-solid border-[#EDEDF6] bg-white rounded-[24px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal"
          >
            <option value="">Chọn loại danh mục</option>
            <option value="">Chọn loại danh mục</option>
            <option value="">Chọn loại danh mục</option>
          </select>

          <SelectRoot v-model="fruit">
            <SelectTrigger
              class="inline-flex min-w-[160px] items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9 outline-none"
              aria-label="Customise options"
            >
              <SelectValue placeholder="Select a fruit..." />
              <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                class="min-w-[160px] bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                :side-offset="5"
              >
                <SelectScrollUpButton
                  class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                >
                  <Icon icon="radix-icons:chevron-up" />
                </SelectScrollUpButton>

                <SelectViewport class="p-[5px]">
                  <SelectLabel
                    class="px-[25px] text-xs leading-[25px] text-mauve11"
                  >
                    Fruits
                  </SelectLabel>
                  <SelectGroup>
                    <SelectItem
                      v-for="(option, index) in options"
                      :key="index"
                      class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                      :value="option"
                    >
                      <SelectItemIndicator
                        class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                      >
                        <Icon icon="radix-icons:check" />
                      </SelectItemIndicator>
                      <SelectItemText>
                        {{ option }}
                      </SelectItemText>
                    </SelectItem>
                  </SelectGroup>
                </SelectViewport>

                <SelectScrollDownButton
                  class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                >
                  <Icon icon="radix-icons:chevron-down" />
                </SelectScrollDownButton>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>

        <button
          type="submit"
          class="inline-flex items-center justify-center max-md:flex-[100%] gap-2 bg-[#013878] rounded-[24px] p-[8px_16px] transition hover:shadow-hoverinset cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.0002 21L16.7002 16.7"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            class="text-white font-inter text=[16px] font-bold leading-normal"
          >
            Tìm kiếm
          </span>
        </button>
      </form>
    </div>

    <div class="flex flex-wrap items-center gap-2 mt-5 mb-3">
      <div
        class="flex-[1] max-md:text-[16px] text-[#464661] font-inter text-[20px] font-bold leading-normal"
      >
        Danh sách danh mục hệ thống
      </div>

      <div class="inline-flex flex-wrap items-center gap-4 ms-auto">
        <button
          type="button"
          id="tableAdding"
          class="max-md:flex-auto rounded-[24px] bg-[#1b4dea] inline-flex items-end justify-center max-md:items-center max-md:gap-1 gap-2 p-[7px_12px] cursor-pointer transition hover:shadow-hoverinset"
          @click="toggleModal('modalAddCateManager')"
        >
          <img src="@/assets/images/si_add-fill.svg" alt="" />
          <span
            class="text-white font-inter text-[16px] max-md:text-[14px] font-bold leading-normal"
          >
            Thêm mới
          </span>
        </button>
      </div>
    </div>

    <Modal
      @close="toggleModal('modalAddCateManager')"
      :modalActive="modalActive.modalAddCateManager"
      maxWidth="max-w-[670px]"
    >
      <div class="rounded-[24px] p-[52px_24px_36px] bg-white overflow-hidden">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
            chi tiết danh mục
          </h3>
        </div>

        <form action="">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-6">
              <div class="block">
                <span
                  class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                >
                  Loại danh mục
                </span>

                <MultipleSelect
                  :options="optionsGroupUser"
                  holder="Danh mục loại ticket"
                  v-model="valueGroupUser.value1"
                />
              </div>
            </div>

            <div class="col-span-12 md:col-span-6">
              <div class="block">
                <span
                  class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
                >
                  Tên danh mục
                </span>

                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Trợ lý"
                  class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
                />
              </div>
            </div>

            <div class="col-span-12">
              <div class="block">
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
            </div>
          </div>

          <div
            class="flex flex-wrap items-stretch justify-center gap-4 text-center mt-9 xl:gap-6"
          >
            <button
              @click="toggleModal('modalAddCateManager')"
              type="button"
              class="max-md:grow inline-block md:min-w-[175px] border border-solid border-[#EDEDF6] bg-white text-[#464661] text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
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
import Modal from "@/components/Modals.vue"
import MultipleSelect from "@/components/MultiSelect.vue"
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from "radix-vue"
const fruit = ref()

const options = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]
const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"]

interface recordModal {
  [key: string]: boolean
}

const modalActive = ref<recordModal>({
  modalAddCateManager: false,
  modalEditCateManager: false
})

const toggleModal = (modalStateName: any) => {
  modalActive.value[modalStateName] = !modalActive.value[modalStateName]
}

interface recordSelection {
  [key: string]: any
}

const valueGroupUser = ref<recordSelection>({
  value1: null,
  value2: null,
  value3: null,
  value4: null,
  value5: null,
  value6: null
})
const optionsGroupUser: any = ref([
  "Danh mục loại A",
  "Danh mục loại B",
  "Danh mục loại C",
  "Danh mục loại D"
])
</script>

<style lang="scss" scoped>
.select-block {
  position: relative;

  &::after {
    content: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.96389 10.164C9.04747 10.0804 9.1467 10.0141 9.25591 9.96881C9.36512 9.92356 9.48218 9.90027 9.60039 9.90027C9.71861 9.90027 9.83566 9.92356 9.94487 9.96881C10.0541 10.0141 10.1533 10.0804 10.2369 10.164L11.9999 11.927L13.7639 10.164C13.9338 10.0011 14.1607 9.91123 14.3961 9.91366C14.6314 9.91609 14.8564 10.0106 15.0229 10.177C15.1894 10.3433 15.2841 10.5683 15.2867 10.8036C15.2893 11.039 15.1996 11.266 15.0369 11.436L12.6369 13.836C12.5533 13.9196 12.4541 13.9859 12.3449 14.0311C12.2357 14.0764 12.1186 14.0997 12.0004 14.0997C11.8822 14.0997 11.7651 14.0764 11.6559 14.0311C11.5467 13.9859 11.4475 13.9196 11.3639 13.836L8.96389 11.436C8.79535 11.2672 8.70068 11.0385 8.70068 10.8C8.70068 10.5615 8.79535 10.3327 8.96389 10.164Z" fill="%23464661"/></svg>');
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-40%);
    z-index: 1;
    pointer-events: none;
  }

  select {
    appearance: none;
    width: 100%;
  }
}
</style>

<style lang="scss"></style>
