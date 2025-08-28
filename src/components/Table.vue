<template>
  <div class="flex h-full flex-col">
    <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
      <div class="table-container relative">
        <!-- Example column -->
        <div id="tableRowHeader" class="header table-row" :class="justify">
          <div v-for="(column, index) in tbhead" :key="index" class="cell">
            {{ column.title }}

            <div v-if="column.hasSort" class="tb-sort">
              <button type="button">
                <img src="@/assets/images/tb-sort.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="cell pinned">
            <div v-if="status" class="cell">Trạng thái</div>
            <div class="cell edit">Edit</div>
          </div>
        </div>

        <!-- Example row -->
        <div id="tableRowBody" class="body table-row">
          <template v-for="n in 25">
            <div v-for="(item, index) in tbbody" :key="index" class="table-item" :class="justify">
              <!-- bg-blue , bg-green , bg-red , bg-purple , :class="{ 'bg-blue': id === 1 }"-->
              <div v-for="(data, id) in item.data" :key="id" class="cell">
                {{ data.title }}
              </div>

              <div class="cell pinned pinned-body">
                <div v-if="status" class="cell status status-green status-body">Đang hoạt động</div>

                <div class="cell edit edit-body">
                  <slot></slot>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- <div
                      id="isLoadingTable"
                      class="absolute w-full inset-0 !h-full z-100 bg-[#ffffffbf]"
                    >
                      <div class="animate-loading-table">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </div>
                      <div class="block">Đang tải dữ liệu</div>
                    </div> -->
      </div>
    </div>

    <div class="tb-pagination flex flex-wrap items-center gap-2 max-md:justify-center md:gap-4">
      <div class="relative">
        <select
          id="selectPerPage"
          name=""
          class="cursor-pointer appearance-none rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[14px] font-normal text-[#464661] md:min-w-[264px]"
        >
          <option value="">20 bản ghi / trang</option>
          <option value="">40 bản ghi / trang</option>
          <option value="">30 bản ghi / trang</option>
          <option value="">10 bản ghi / trang</option>
        </select>

        <div class="pointer-events-none absolute top-[50%] right-3 -translate-y-[50%] max-md:hidden">
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.964013 1.1641C1.04759 1.08049 1.14682 1.01417 1.25603 0.968927C1.36524 0.92368 1.4823 0.900391 1.60051 0.900391C1.71873 0.900391 1.83578 0.92368 1.945 0.968927C2.05421 1.01417 2.15344 1.08049 2.23701 1.1641L4.00001 2.9271L5.76401 1.1641C5.9339 1.00121 6.16083 0.911356 6.39617 0.913785C6.63152 0.916214 6.85654 1.01073 7.02303 1.17709C7.18952 1.34345 7.28422 1.5684 7.28683 1.80374C7.28944 2.03908 7.19976 2.26609 7.03701 2.4361L4.63701 4.8361C4.55344 4.9197 4.45421 4.98602 4.345 5.03127C4.23578 5.07652 4.11873 5.09981 4.00051 5.09981C3.8823 5.09981 3.76524 5.07652 3.65603 5.03127C3.54682 4.98602 3.44759 4.9197 3.36401 4.8361L0.964013 2.4361C0.795473 2.26735 0.700806 2.0386 0.700806 1.8001C0.700806 1.5616 0.795473 1.33285 0.964013 1.1641Z"
              fill="#363636"
            />
          </svg>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2 md:ms-auto">
        <div class="text-[14px] font-normal text-[#464661]">1 - 10 trong 10 kết quả</div>

        <div class="tb-navigation flex flex-wrap items-center md:gap-2">
          <a href="" class="disabled">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.69 17.29C14.7827 17.1975 14.8562 17.0876 14.9064 16.9666C14.9566 16.8456 14.9824 16.7159 14.9824 16.585C14.9824 16.454 14.9566 16.3243 14.9064 16.2034C14.8562 16.0824 14.7827 15.9725 14.69 15.88L10.81 12L14.69 8.11998C14.877 7.933 14.982 7.67941 14.982 7.41498C14.982 7.15055 14.877 6.89695 14.69 6.70998C14.503 6.523 14.2494 6.41796 13.985 6.41796C13.7206 6.41796 13.467 6.523 13.28 6.70998L8.68998 11.3C8.59727 11.3925 8.52373 11.5024 8.47355 11.6234C8.42336 11.7443 8.39753 11.874 8.39753 12.005C8.39753 12.1359 8.42336 12.2656 8.47355 12.3866C8.52373 12.5076 8.59727 12.6175 8.68998 12.71L13.28 17.3C13.66 17.68 14.3 17.68 14.69 17.29Z"
                fill="#363636"
              />
            </svg>
          </a>

          <input
            id=""
            type="text"
            name=""
            :value="props.params.currentPage"
            class="inline-flex h-[32px] w-[32px] flex-col items-center justify-center rounded-[8px] border border-solid border-[#909090] bg-white text-center text-[16px] font-bold text-[#464661]"
          />

          <button href="" @click="goToNextPage">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.31002 6.71002C9.21732 6.80254 9.14377 6.91242 9.09359 7.0334C9.04341 7.15437 9.01758 7.28405 9.01758 7.41502C9.01758 7.54599 9.04341 7.67567 9.09359 7.79665C9.14377 7.91762 9.21732 8.02751 9.31002 8.12002L13.19 12L9.31002 15.88C9.12304 16.067 9.018 16.3206 9.018 16.585C9.018 16.8494 9.12304 17.103 9.31002 17.29C9.497 17.477 9.7506 17.582 10.015 17.582C10.2794 17.582 10.533 17.477 10.72 17.29L15.31 12.7C15.4027 12.6075 15.4763 12.4976 15.5265 12.3766C15.5766 12.2557 15.6025 12.126 15.6025 11.995C15.6025 11.8641 15.5766 11.7344 15.5265 11.6134C15.4763 11.4924 15.4027 11.3825 15.31 11.29L10.72 6.70002C10.34 6.32002 9.70002 6.32002 9.31002 6.71002Z"
                fill="#363636"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'

  import { tableMagic } from '../utils/main'

  const props = defineProps<{
    tbhead: any
    tbbody: any
    justify?: any
    status?: boolean
    handlePageChange?: (page: number) => void
    params: {
      currentPage: number
      totalPages: number
      perPage: number
    }
  }>()
  // function go to next page
  const current = ref(props.params.currentPage)
  const goToNextPage = () => {
    const newPage = Number(props.params.currentPage) + 1
    console.log('🚀 ~ goToNextPage ~ newPage:', newPage)
    props.handlePageChange?.(newPage)
  }
  onMounted(() => {
    tableMagic()
  })
</script>

<style lang="scss">
  @import '../styles/table.module.scss';
</style>

<style lang="scss" scoped>
  .status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #464661;

    font-style: normal;
    font-weight: 400;
    line-height: 1;
    padding: 6px 10px !important;
    border-radius: 24px;

    @media (max-width: 767px) {
      padding: 6px !important;
      padding-left: 0 !important;
      font-size: 10px !important;
    }

    &-body {
      @media (max-width: 767px) {
        padding: 6px !important;
        font-size: 7px !important;
      }
    }
  }

  .status-green {
    border: 1px solid #12f13e;
    background: #c4ffd0;
  }

  .status-red {
    border: 1px solid #ff0000;
    background: #ff00003d;
  }

  .status-gray {
    border: 1px solid #9c9c9c;
    background: #9c9c9c73;
  }
</style>
