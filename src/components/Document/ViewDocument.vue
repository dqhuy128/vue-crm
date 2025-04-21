<template>
  <form action="">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Loại tài liệu *
          </span>
          <select
           
            class="border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-[10px_12px] text-[#909090] font-inter text-[16px] max-md:text-[14px] font-normal leading-normal w-full"
          >
            <template
              v-for="(item, index) in categoryDocument.data"
              :key="index"
            >
              <option :value="item.id" :selected="item.id === props.data?.type_id">
                {{ item.name }}
              </option>
            </template>
          </select> 
        </div>
      </div>

      <div class="col-span-12 md:col-span-6">
        <div class="block">
          <span
            class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
          >
            Tên tài liệu *
          </span>

          <input
            type="text"
            name=""
            id=""
            placeholder="Trợ lý"
            class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            :value="props.data?.name"
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
             :value="props.data?.description"
            placeholder="Nhập mô tả"
            class="w-full border min-h-[120px] border-solid border-[#161616] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
          ></textarea>
        </div>
      </div>
    </div>

    <div
      class="flex flex-wrap items-stretch justify-center gap-4 text-center mt-9 xl:gap-6"
    >
      <slot></slot>
      <!-- <button
        type="submit"
        class="max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
      >
        Lưu
      </button> -->
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useDocument } from '@/composables/document';
import { reactive, ref } from 'vue';
import { useAuth } from 'vue-auth3';
// import 'vue-multiselect/dist/vue-multiselect.min.css'
const props = defineProps<{
  closeModal: () => void
  data: any
}>()
const FormSubmit = ref({
  name: props.data?.name || null,
  description: props.data?.description || null,
  docCate: props.data?.type_id || null,
  id: props.data?.id || null
})
const auth = useAuth()

const { doFetch, fetchCategoryDocument, categories } = useDocument()

const categoryDocument = reactive({
  data: categories.value || undefined
})
// onMounted(() => {

//   auth.load().then(() => {
//     if (auth.check() && categories.value.length === 0) {
//       fetchCategoryDocument()
//     }
//   })
// })
</script>

<style lang="scss" scoped>
.file-upload {
  width: 100%;
  min-width: 100%;
  min-height: 240px;
  border: 1px dashed #464661;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fbfbfb;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #464661;
  gap: 12px;
}
.file-upload-txt {
  font-weight: 600;
}
.file-upload-link {
  color: #1b4dea;
  text-decoration: underline;
}
</style>
