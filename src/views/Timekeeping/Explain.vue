<template>
  <MainLayout>
    <Breadcrums name="Giải trình chấm công" path="/timekeeping/explain" />

    <template v-if="toggleBoxFilters">
      <div class="mb-5 rounded-[24px] bg-white p-2.5">
        <form class="flex flex-wrap gap-4" @submit.prevent="handleSearchWorkExplain">
          <div class="flex grow flex-wrap items-stretch gap-2">
            <div
              class="flex-[0_0_calc(100%)] md:flex-[0_0_calc((100%-8px)/2)] lg:w-[calc((100%-16px)/3)] lg:flex-[0_0_calc((100%-16px)/3)]"
            >
              <div class="relative">
                <input
                  id=""
                  v-model="paramsWorkExplain.name"
                  type="text"
                  name=""
                  placeholder="Nhập tên"
                  class="font-inter block w-full rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] focus:outline-none max-md:text-[14px]"
                />

                <button
                  v-if="paramsWorkExplain.name"
                  type="button"
                  class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  @click="() => (paramsWorkExplain.name = '')"
                >
                  <Icon icon="radix-icons:cross-1" class="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div
              class="flex-[0_0_calc(100%)] md:flex-[0_0_calc((100%-8px)/2)] lg:w-[calc((100%-16px)/3)] lg:flex-[0_0_calc((100%-16px)/3)]"
            >
              <SelectRoot v-model="paramsWorkExplain.status">
                <SelectTrigger
                  class="flex h-full w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[15px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn trạng thái"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectScrollUpButton
                      class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white"
                    >
                      <Icon icon="radix-icons:chevron-up" />
                    </SelectScrollUpButton>

                    <SelectViewport>
                      <SelectGroup>
                        <SelectItem
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          value="all"
                        >
                          <SelectItemText> Tất cả trạng thái </SelectItemText>
                        </SelectItem>

                        <template v-for="item in 3" :key="item">
                          <SelectItem
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item - 1)"
                          >
                            <SelectItemText v-if="item === 1"> Chờ phê duyệt </SelectItemText>
                            <SelectItemText v-if="item === 2"> Đã phê duyệt </SelectItemText>
                            <SelectItemText v-if="item === 3"> Không phê duyệt </SelectItemText>
                          </SelectItem>
                        </template>
                      </SelectGroup>
                    </SelectViewport>

                    <SelectScrollDownButton
                      class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white"
                    >
                      <Icon icon="radix-icons:chevron-down" />
                    </SelectScrollDownButton>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>
            </div>

            <div class="flex-[0_0_calc(100%)] lg:w-[calc((100%-16px)/3)] lg:flex-[0_0_calc((100%-16px)/3)]">
              <VueDatePicker
                v-model="datepicker"
                class="work-history-datepicker"
                :enable-time-picker="false"
                locale="vi"
                :format-locale="vi"
                cancel-text="Huỷ"
                select-text="Chọn"
                range
                format="dd/MM/yyyy"
                :max-date="new Date()"
                @update:model-value="updateDates"
              />
            </div>
          </div>

          <button
            type="submit"
            class="hover:shadow-hoverinset inline-flex cursor-pointer items-center justify-center gap-2 rounded-[24px] bg-[#013878] p-[8px_16px] transition max-md:flex-[100%]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <span class="font-inter text-[15px] leading-normal font-bold text-white"> Tìm kiếm </span>
          </button>
        </form>
      </div>
    </template>

    <div class="mb-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="inline-block h-9 w-9 rounded-md bg-white md:hidden"
        @click="toggleBoxFilters = !toggleBoxFilters"
      >
        <Icon icon="lsicon:filter-outline" class="h-full w-full p-1.5" />
      </button>
      <div
        class="font-inter hidden flex-[1] text-[20px] leading-normal font-bold text-[#464661] max-md:text-[16px] md:block"
      >
        Giải trình chấm công
      </div>
    </div>

    <div v-show="!permissionList.length || checkPermission('Work', 'Explanation')" class="flex h-full flex-col">
      <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
        <div class="table-container relative">
          <!-- Example column -->
          <div id="tableRowHeader" class="header table-row justify-between !ps-5">
            <div v-for="(column, index) in tbhead" :key="index" class="cell">
              {{ column.title }}

              <div v-if="column.hasSort" class="tb-sort">
                <button type="button">
                  <img src="@/assets/images/tb-sort.svg" alt="" />
                </button>
              </div>
            </div>

            <div class="cell pinned !px-2 !py-4.5">Giải trình</div>
          </div>

          <!-- Skeleton Loading -->
          <SkeletonTable v-if="isLoading" :columns="9" :rows="10" />

          <!-- Table Data -->
          <template v-else-if="!isInitialLoad && normalizedItems.length">
            <div id="tableRowBody" class="body table-row">
              <div v-for="(it, index) in normalizedItems" :key="index" class="table-item justify-between !ps-5">
                <div class="cell">
                  {{ it.id }}
                </div>

                <div class="cell">
                  {{ it.code }}
                </div>

                <div class="cell">
                  {{ it.name }}
                </div>

                <div class="cell">
                  {{ it.work_date }}
                </div>

                <div class="cell reason-cell">
                  {{ it.reason }}
                </div>

                <div class="cell">
                  <button
                    v-if="it.image"
                    type="button"
                    class="cell-btn-edit shrink-0 cursor-pointer"
                    @click="openPreview(it.image, it.origin_image)"
                  >
                    <img src="@/assets/images/action-edit-1.svg" alt="" />
                  </button>
                </div>

                <div class="cell">
                  <div class="relative w-full" @click.stop="toggleDropdownManager(it.id)">
                    <!-- <template v-if="checkPermission('Overtime', 'Approval')"> -->
                    <template v-if="it.manager_status_text == 'Đã phê duyệt'">
                      <div class="status status-green status-body block w-full text-[13px]">Đã phê duyệt</div>
                    </template>

                    <template v-if="it.manager_status_text == 'Chờ phê duyệt'">
                      <div class="status status-red status-body block w-full text-[13px]">Chờ phê duyệt</div>
                    </template>

                    <template v-if="it.manager_status_text == 'Đã từ chối'">
                      <div class="status status-gray status-body block w-full text-[13px]">Không phê duyệt</div>
                    </template>
                    <!-- </template> -->

                    <div
                      class="invisible absolute right-0 left-0 z-[12] w-full opacity-0 transition"
                      :class="{
                        'visible opacity-100': activeDropdownManager === it.id,
                      }"
                    >
                      <RadioGroupRoot
                        v-model="radioStateSingle"
                        class="flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl"
                        default-value="0"
                      >
                        <template v-if="it.manager_approved">
                          <RadioGroupItem
                            :id="`r1-${it.id}`"
                            class="block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]"
                            value="1"
                            @click="handleManagerApprove(it.id, '1')"
                          >
                            <label
                              class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                              :for="`r1-${it.id}`"
                            >
                              Duyệt
                            </label>
                          </RadioGroupItem>
                          <RadioGroupItem
                            :id="`r2-${it.id}`"
                            class="block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]"
                            value="2"
                            @click="handleManagerApprove(it.id, '2')"
                          >
                            <label
                              class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                              :for="`r2-${it.id}`"
                            >
                              Không duyệt
                            </label>
                          </RadioGroupItem>
                        </template>
                      </RadioGroupRoot>
                    </div>
                  </div>
                </div>

                <div class="cell" data-dropdown="human">
                  <div class="relative w-full" @click.stop="toggleDropdownHuman(it.id)">
                    <!-- <template v-if="checkPermission('Overtime', 'Approval')"> -->
                    <template v-if="it.human_status_text == 'Đã phê duyệt'">
                      <div class="status status-green status-body block w-full text-[13px]">Đã phê duyệt</div>
                    </template>

                    <template v-if="it.human_status_text == 'Chờ phê duyệt'">
                      <div class="status status-red status-body block w-full text-[13px]">Chờ phê duyệt</div>
                    </template>

                    <template v-if="it.human_status_text == 'Đã từ chối'">
                      <div class="status status-gray status-body block w-full text-[13px]">Không phê duyệt</div>
                    </template>
                    <!-- </template> -->

                    <div
                      class="invisible absolute right-0 left-0 z-[12] w-full opacity-0 transition"
                      :class="{
                        'visible opacity-100': activeDropdownHuman === it.id,
                      }"
                    >
                      <RadioGroupRoot
                        v-model="radioStateSingle"
                        class="flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl"
                        default-value="0"
                      >
                        <template v-if="it.human_approved">
                          <RadioGroupItem
                            :id="`r1-${it.id}`"
                            class="block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]"
                            value="1"
                            @click="handleHumanApprove(it.id, '1')"
                          >
                            <label
                              class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                              :for="`r1-${it.id}`"
                            >
                              Duyệt
                            </label>
                          </RadioGroupItem>
                          <RadioGroupItem
                            :id="`r2-${it.id}`"
                            class="block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]"
                            value="2"
                            @click="handleHumanApprove(it.id, '2')"
                          >
                            <label
                              class="cursor-pointer text-center text-[10px] font-normal text-[#464661]"
                              :for="`r2-${it.id}`"
                            >
                              Không duyệt
                            </label>
                          </RadioGroupItem>
                        </template>
                      </RadioGroupRoot>
                    </div>
                  </div>
                </div>

                <div class="cell pinned pinned-body justify-center !px-2.5">
                  <template v-if="it.action.includes('edit')">
                    <button
                      type="button"
                      class="cell-btn-edit shrink-0 cursor-pointer"
                      @click="handleUserExplain(it.id)"
                    >
                      <img src="@/assets/images/action-edit-2.svg" alt="" />
                    </button>
                  </template>

                  <!-- @click="confirmDeleteExplain(it.id)" -->
                  <template v-if="it.action.includes('delete')">
                    <button
                      type="button"
                      class="cell-btn-edit shrink-0 cursor-pointer"
                      @click="confirmDeleteExplain(it.id)"
                    >
                      <img src="@/assets/images/action-edit-3.svg" alt="" />
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- PAGINATION -->

      <div class="tb-pagination flex flex-wrap items-center gap-2 max-md:justify-center md:gap-4">
        <div class="relative">
          <select
            id="selectPerPage"
            v-model="paginate.per_page"
            name=""
            class="cursor-pointer appearance-none rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[14px] font-normal text-[#464661] focus:outline-none md:min-w-[264px]"
          >
            <option value="10" :selected="paginate.per_page === 10">10 bản ghi / trang</option>
            <option value="20">20 bản ghi / trang</option>
            <option value="30">30 bản ghi / trang</option>
            <option value="40">40 bản ghi / trang</option>
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
          <div class="text-[14px] font-normal text-[#464661]">
            <template v-if="paginationRange.total > 0">
              {{ paginationRange.start }} - {{ paginationRange.end }} trong {{ paginationRange.total }} kết quả
            </template>
            <template v-else> 0 kết quả </template>
          </div>

          <div class="tb-navigation flex flex-wrap items-center md:gap-2">
            <button :class="{ disabled: paginate.page === 1 }" @click="handlePageChange(paginate.page - 1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.69 17.29C14.7827 17.1975 14.8562 17.0876 14.9064 16.9666C14.9566 16.8456 14.9824 16.7159 14.9824 16.585C14.9824 16.454 14.9566 16.3243 14.9064 16.2034C14.8562 16.0824 14.7827 15.9725 14.69 15.88L10.81 12L14.69 8.11998C14.877 7.933 14.982 7.67941 14.982 7.41498C14.982 7.15055 14.877 6.89695 14.69 6.70998C14.503 6.523 14.2494 6.41796 13.985 6.41796C13.7206 6.41796 13.467 6.523 13.28 6.70998L8.68998 11.3C8.59727 11.3925 8.52373 11.5024 8.47355 11.6234C8.42336 11.7443 8.39753 11.874 8.39753 12.005C8.39753 12.1359 8.42336 12.2656 8.47355 12.3866C8.52373 12.5076 8.59727 12.6175 8.68998 12.71L13.28 17.3C13.66 17.68 14.3 17.68 14.69 17.29Z"
                  fill="#363636"
                />
              </svg>
            </button>

            <input
              id=""
              type="text"
              name=""
              :value="paginate.page"
              class="inline-flex h-[32px] w-[32px] flex-col items-center justify-center rounded-[8px] border border-solid border-[#909090] bg-white text-center text-[16px] font-bold text-[#464661]"
              readonly
            />

            <button
              :class="{
                disabled: Number(paginate.page) >= dataTotalPages,
              }"
              @click="handlePageChange(paginate.page + 1)"
            >
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

    <Modal :modal-active="modalPreviewActive" max-width="max-w-[1024px]" @close="modalPreviewActive = false">
      <div class="overflow-hidden rounded-[24px] bg-white p-4">
        <img v-if="previewUrl" :src="previewUrl" alt="preview" class="mx-auto max-h-[100vh] w-auto object-contain" />

        <div class="mt-4 text-center">
          <a
            :href="originUrl"
            target="_blank"
            class="hover:shadow-hoverinset inline-flex cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#013878] p-[4px_8px] text-sm text-white transition"
            >Xem hình ảnh gốc</a
          >
        </div>
      </div>
    </Modal>

    <Modal
      :modal-active="modalActive.modalWorkExplain"
      max-width="max-w-[670px]"
      @close="toggleModal('modalWorkExplain')"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]">
        <div class="mb-12 text-center max-xl:mb-6">
          <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">Lý do</h3>
        </div>

        <ModalWorkExplain
          :datatype="dataUserExplain"
          :prop-function="fetchDataWorkExplain"
          @post-request="getPostRequest"
        >
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
            @click="toggleModal('modalWorkExplain')"
          >
            Hủy
          </button>
        </ModalWorkExplain>
      </div>
    </Modal>

    <Modal
      :modal-active="modalActive.modalStatusConfirm"
      max-width="max-w-[512px]"
      @close="toggleModal('modalStatusConfirm')"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-[45px_16px]">
        <div class="mb-3 text-center text-[16px] font-bold text-[#464661] uppercase">Thông báo</div>

        <div class="mb-3 text-center">
          <img class="mx-auto" src="@/assets/images/icon-park-outline_attention.svg" alt="" />
        </div>

        <div class="mx-auto mb-6 text-center text-[16px]/[26px] font-semibold text-[#464661] underline">
          Bạn chắc chắn muốn xoá giải trình này ?
        </div>

        <div class="mt-9 flex flex-wrap items-stretch justify-center gap-3 text-center xl:gap-6">
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[130px]"
            @click="toggleModal('modalStatusConfirm')"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[130px]"
            @click="handleDeleteExplain"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastA"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]],
          'bg-[#c4ffd0]': dataPostRequest?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataPostRequest?.message }}
        </ToastTitle>
        <ToastDescription v-if="dataPostRequest?.errors" class="text-[11px] font-normal">
          {{ dataPostRequest?.errors[Object.keys(dataPostRequest?.errors)[0]] }}
        </ToastDescription>
        <!-- <ToastClose aria-label="Close"><span aria-hidden>×</span></ToastClose> -->
      </ToastRoot>
      <ToastViewport
        class="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </ToastProvider>
  </MainLayout>
</template>

<script lang="ts" setup>
  import '@vuepic/vue-datepicker/dist/main.css'
  import '@/styles/table.module.scss'

  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
  import { storeToRefs } from 'pinia'
  import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport,
  } from 'radix-vue'
  import { RadioGroupItem, RadioGroupRoot } from 'radix-vue'
  import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
  import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import ModalWorkExplain from '@/components/Modal/ModalWorkExplain.vue'
  import Modal from '@/components/Modals.vue'
  import SkeletonTable from '@/components/SkeletonTable.vue'
  import { useWork } from '@/composables/work'
  import { apiUri } from '@/constants/apiUri'
  import router from '@/router'
  import { usePermissionStore } from '@/store/permission'
  import { tableMagic } from '@/utils/main'
  import MainLayout from '@/views/MainLayout.vue'

  const toast = reactive({
    toastA: false,
  })

  const auth = useAuth()

  const toggleBoxFilters = ref(false)
  const screenWidth = ref(window.innerWidth)
  const isInputActive = ref(false)
  let resizeTimer: any
  // Chỉ cập nhật toggleBoxFilters khi không có input đang focus
  const updateLayout = () => {
    screenWidth.value = window.innerWidth
    if (!isInputActive.value) {
      toggleBoxFilters.value = screenWidth.value >= 768
    }
  }
  // Xử lý sự kiện khi input được focus/blur
  const trackInputState = (event: any) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      isInputActive.value = event.type === 'focus'
    }
  }

  // Add event listener for window resize
  onMounted(() => {
    // Khởi tạo giá trị ban đầu
    updateLayout()

    // Theo dõi resize với debounce
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateLayout, 100)
    })

    // Sử dụng event capturing để theo dõi tất cả input
    document.addEventListener('focus', trackInputState, true)
    document.addEventListener('blur', trackInputState, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('focus', trackInputState, true)
    document.removeEventListener('blur', trackInputState, true)
    window.removeEventListener('resize', updateLayout)
    clearTimeout(resizeTimer)
  })
  // Watch for screenWidth changes
  watch(screenWidth, () => {
    updateLayout()
  })

  interface recordModal {
    [key: string]: boolean
  }
  const modalActive = ref<recordModal>({
    modalStatusAddLeave: false,
    modalStatusEditLeave: false,
    modalStatusConfirm: false,
    modalWorkExplain: false,
  })

  const toggleModal = (modalStateName: any) => {
    modalActive.value[modalStateName] = !modalActive.value[modalStateName]
  }

  const tbhead = reactive([
    {
      title: 'STT',
      hasSort: false,
    },
    {
      title: 'Mã NV',
      hasSort: false,
    },
    {
      title: 'Họ và tên',
      hasSort: false,
    },
    {
      title: 'Ngày giải trình',
      hasSort: false,
    },
    {
      title: 'Lý do',
      hasSort: false,
    },
    {
      title: 'Hình ảnh',
      hasSort: false,
    },
    {
      title: 'Quản lý duyệt',
      hasSort: false,
    },
    {
      title: 'HCNS duyệt',
      hasSort: false,
    },
  ])

  interface typeparamsWorkExplain {
    begin_date: string
    finish_date: string
    name: string
    status: string
  }
  const paramsWorkExplain = reactive<typeparamsWorkExplain>({
    begin_date: '',
    finish_date: '',
    name: '',
    status: '',
  })

  const datepicker = ref<any | null>(null)
  const startDate = new Date(new Date().setDate(1))
  const endDate = new Date()
  datepicker.value = [startDate, endDate]
  paramsWorkExplain.begin_date = format(startDate, 'yyyy-MM-dd')
  paramsWorkExplain.finish_date = format(endDate, 'yyyy-MM-dd')
  const updateDates = () => {
    if (datepicker.value) {
      paramsWorkExplain.begin_date = format(datepicker.value[0], 'yyyy-MM-dd')
      paramsWorkExplain.finish_date = format(datepicker.value[1], 'yyyy-MM-dd')
    }
  }
  watch(datepicker, () => {
    if (auth.check()) {
      updateDates()
    }
  })

  watch(
    () => paramsWorkExplain.status,
    () => {
      if (paramsWorkExplain.status === 'all') paramsWorkExplain.status = ''
    }
  )

  const paginate = reactive({
    page: 1,
    per_page: 20,
  })
  const debounceTime = ref<{
    timeOut: number | null
    counter: number
  }>({
    timeOut: null,
    counter: 0,
  })

  const isFetching = ref(false)
  const isInitialLoad = ref(true)

  // Computed property to normalize actions without mutating original data
  const normalizedItems = computed(() => {
    if (!dataWorkExplain.doc?.items) return []
    return dataWorkExplain.doc.items.map((item: any) => {
      const src = item?.action
      let normalized: string[] = []
      if (Array.isArray(src)) {
        normalized = src
          .flatMap((s: any) => String(s).split(','))
          .map((t: string) => t.trim())
          .filter(Boolean)
      } else if (typeof src === 'string') {
        normalized = src
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean)
      }
      return { ...item, action: normalized }
    })
  })

  const fetchDataWorkExplain = () => {
    if (isFetching.value) return // Prevent concurrent requests

    if (debounceTime.value.timeOut !== null) {
      clearTimeout(debounceTime.value.timeOut)
    }

    debounceTime.value.timeOut = setTimeout(() => {
      if (isFetching.value) return

      isFetching.value = true
      const res = {
        ...paramsWorkExplain,
        page: paginate.page,
        per_page: paginate.per_page,
      }

      doFetch(
        `${apiUri}/work/explanation?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
        auth.token() as string
      )
        .then(() => {
          isInitialLoad.value = false
          tableMagic()
        })
        .finally(() => {
          isFetching.value = false
          tableMagic()
        })
    }, 300)
  }

  const handlePageChange = (pageNum: number) => {
    paginate.page = pageNum
    fetchDataWorkExplain()
  }

  const handleSearchWorkExplain = async () => {
    try {
      const formData = new FormData()
      formData.append('begin_date', paramsWorkExplain.begin_date)
      formData.append('finish_date', paramsWorkExplain.finish_date)
      formData.append('name', paramsWorkExplain.name)
      formData.append('status', paramsWorkExplain.status)

      await axios.post(`${apiUri}/work/explanation`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      fetchDataWorkExplain()
    } catch (error) {
      console.error('handleSearchWorkExplain error:', error)
    }
  }

  const dataUserExplain = ref<any | null>(null)
  const handleUserExplain = async (id: string) => {
    try {
      dataUserExplain.value = normalizedItems.value.find((item) => item.id === id)
      toggleModal('modalWorkExplain')
    } catch (error) {
      console.error('handleUserExplain error:', error)
    }
  }

  const activeDropdownManager = ref(null)
  const toggleDropdownManager = (id: any) => {
    if (activeDropdownManager.value === id) {
      activeDropdownManager.value = null
    } else {
      activeDropdownManager.value = id
    }
  }

  const activeDropdownHuman = ref(null)
  const toggleDropdownHuman = (id: any) => {
    if (activeDropdownHuman.value === id) {
      activeDropdownHuman.value = null
    } else {
      activeDropdownHuman.value = id
    }
  }

  const radioStateSingle = ref('0')

  const handleManagerApprove = async (id: string, status: string) => {
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('status', status)

      await axios.post(`${apiUri}/work/managerStatus`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      fetchDataWorkExplain()
    } catch (error) {
      console.error('handleManagerApprove error:', error)
    }
  }

  const handleHumanApprove = async (id: string, status: string) => {
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('status', status)

      await axios.post(`${apiUri}/work/humanStatus`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      fetchDataWorkExplain()
    } catch (error) {
      console.error('handleHumanApprove error:', error)
    }
  }

  const { data, doFetch, isLoading } = useWork()

  const dataWorkExplain = reactive({
    doc: data,
  })

  const dataTotalPages = computed(() =>
    Math.ceil(Number(dataWorkExplain.doc?.pagination?.total) / Number(paginate.per_page))
  )

  // Computed property để tính toán range hiển thị pagination
  const paginationRange = computed(() => {
    const currentPage = Number(paginate.page)
    const perPage = Number(paginate.per_page)
    const total = Number(dataWorkExplain.doc?.pagination?.total || 0)

    const start = (currentPage - 1) * perPage + 1
    const end = Math.min(currentPage * perPage, total)

    return { start, end, total }
  })

  const dataPostRequest = ref<any | null>(null)
  const getPostRequest = (data: any) => {
    dataPostRequest.value = data
    if (dataPostRequest.value) toast.toastA = true
    if (dataPostRequest.value.status === 1) toggleModal('modalWorkExplain')
  }

  const permissionStore = usePermissionStore()
  const { permissionList } = storeToRefs(permissionStore)
  const { checkPermission } = permissionStore

  const hasInitialFetch = ref(false)

  watch(permissionList, () => {
    console.error('🚀 ~ //onMounted ~ permissionList:', permissionList)
    if (auth.check()) {
      if (!permissionList.value.includes('Work')) {
        alert('Bạn không có quyền truy cập vào trang này')
        router.push({ name: 'NotFound404' })
      } else {
        fetchDataWorkExplain()
        console.error(dataWorkExplain, 'dataWorkExplain')
      }
    }
  })

  watch(
    paginate,
    () => {
      // Only fetch if we've done initial fetch
      if (hasInitialFetch.value) {
        fetchDataWorkExplain()
      }
    },
    {
      // must pass deep option to watch for changes on object properties
      deep: true,
    }
  )

  onMounted(() => {
    if (auth.check()) {
      fetchDataWorkExplain()
    }
  })

  // Image preview modal state and handler
  const previewUrl = ref<string>('')
  const originUrl = ref<string>('')
  const modalPreviewActive = ref(false)
  const openPreview = (url?: string, originUrlValue?: string) => {
    previewUrl.value = url || ''
    originUrl.value = originUrlValue || ''
    if (previewUrl.value) modalPreviewActive.value = true
  }

  const idDeleteExplain = ref<string | null>(null)
  const confirmDeleteExplain = (id: string) => {
    idDeleteExplain.value = id
    toggleModal('modalStatusConfirm')
  }

  const handleDeleteExplain = async () => {
    if (!idDeleteExplain.value) return
    try {
      const formData = new FormData()
      formData.append('id', idDeleteExplain.value)

      const res = await axios.post(`${apiUri}/work/delete`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      getPostRequest(res.data)
      toggleModal('modalStatusConfirm')
      toggleModal('modalWorkExplain')
      fetchDataWorkExplain()
    } catch (error) {
      console.error('handleDeleteExplain error:', error)
    }
  }
</script>

<style lang="scss">
  .work-history-datepicker {
    .dp__input {
      border-radius: 24px;
    }
  }
</style>
