<template>
  <MainLayout>
    <Breadcrums name="Quản lý người dùng" path="/system/user" />

    <template v-if="toggleBoxFilters">
      <div class="mb-5 rounded-[24px] bg-white p-2.5">
        <form class="xxl:gap-4 flex flex-wrap items-stretch gap-2" @submit.prevent="handleSearchUser">
          <div class="flex grow flex-wrap gap-4">
            <div class="min-w-0 flex-1">
              <div class="relative">
                <input
                  v-model="params.phone"
                  type="text"
                  class="font-inter flex w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] focus:outline-none data-[placeholder]:text-[#909090] max-md:text-[14px]"
                  placeholder="Tên, số điện thoại"
                  @input="handleFilterChange"
                />

                <button
                  v-if="params.phone"
                  type="button"
                  class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  @click="() => (params.phone = '')"
                >
                  <Icon icon="radix-icons:cross-1" class="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <SelectRoot v-model="params.per_group_name" @update:model-value="handleFilterChange">
                <SelectTrigger
                  class="font-inter flex w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn nhóm người dùng"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Tất cả người dùng </SelectItemText>
                        </SelectItem>
                        <template v-for="(item, index) in dataPerGroupName">
                          <SelectItem
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.name)"
                          >
                            <SelectItemText>
                              {{ item.description }}
                            </SelectItemText>
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

            <div class="min-w-0 flex-1">
              <SelectRoot v-model="params.staff_id" @update:model-value="handleFilterChange">
                <SelectTrigger
                  class="font-inter flex w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn khối phòng ban"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Tất cả bộ phận </SelectItemText>
                        </SelectItem>
                        <template v-for="item in flattenedDepartments" :key="item.id">
                          <SelectItem
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.id)"
                          >
                            <SelectItemText>
                              {{ item.displayName }}
                            </SelectItemText>
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

            <div class="min-w-0 flex-1">
              <SelectRoot v-model="params.position_id" @update:model-value="handleFilterChange">
                <SelectTrigger
                  class="font-inter flex w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn chức vụ"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Tất cả chức vụ </SelectItemText>
                        </SelectItem>
                        <template v-for="(items, index) in dataPosition">
                          <SelectItem
                            v-for="(item, _) in items"
                            :key="index"
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.id)"
                          >
                            <SelectItemText>
                              {{ item.name }}
                            </SelectItemText>
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

            <div class="min-w-0 flex-1">
              <SelectRoot v-model="params.status" @update:model-value="handleFilterChange">
                <SelectTrigger
                  class="font-inter flex w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn trạng thái"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                        <template v-for="status in statusOptions" :key="status.key">
                          <SelectItem
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="status.key"
                          >
                            <SelectItemText>
                              {{ status.value }}
                            </SelectItemText>
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

            <div class="min-w-0 flex-1">
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
                placeholder="Chọn khoảng thời gian"
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
            <span class="font-inter text=[16px] leading-normal font-bold text-white"> Tìm kiếm </span>
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
        Danh sách người dùng
      </div>
    </div>

    <div class="mb-6 flex flex-wrap items-center gap-4">
      <!-- Bộ lọc cột -->
      <div class="column-filter-container relative">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-[24px] border border-[#EDEDF6] bg-white px-4 py-1.5 text-[#464661] shadow-sm transition-colors hover:bg-gray-50"
          @click="showColumnFilter = !showColumnFilter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 7H21M7 12H17M10 17H14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="font-inter text-[15px] font-medium">Bộ lọc</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Dropdown bộ lọc -->
        <div
          v-if="showColumnFilter"
          class="absolute top-full left-0 z-[100] mt-2 w-80 rounded-[12px] border border-[#EDEDF6] bg-white shadow-lg"
          @click.stop
        >
          <div class="p-4">
            <h3 class="mb-3 text-base font-semibold text-[#464661]">Cài đặt hiển thị</h3>

            <!-- Search input -->
            <div class="relative mb-4">
              <input
                v-model="columnSearchText"
                type="text"
                placeholder="Tìm kiếm"
                class="w-full rounded-[8px] border border-[#EDEDF6] px-3 py-2 pr-8 text-[14px] focus:border-transparent focus:ring-2 focus:ring-[#1b4dea] focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                class="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
              >
                <path
                  d="M21 21L16.7 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <!-- Danh sách cột với checkbox -->
            <div class="max-h-60 space-y-2 overflow-y-auto">
              <div
                v-for="(column, index) in filteredColumns"
                :key="index"
                class="mb-0 flex items-center gap-3 rounded-[6px] p-2 transition-colors hover:bg-gray-50"
              >
                <input
                  :id="`column-${index}`"
                  type="checkbox"
                  :checked="column.visible"
                  class="h-4 w-4 rounded border-[#EDEDF6] bg-white text-[#1b4dea] focus:ring-2 focus:ring-[#1b4dea]"
                  @change="toggleColumnVisibility(index)"
                />
                <label :for="`column-${index}`" class="font-inter flex-1 cursor-pointer text-[14px] text-[#464661]">
                  {{ column.title }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ms-auto inline-flex flex-wrap items-center gap-4">
        <!-- <button
          id="tableImport"
          type="button"
          class="hover:shadow-hoverinset inline-flex cursor-pointer items-end justify-center gap-2 rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[7px_24px] transition max-md:flex-auto max-md:items-center max-md:gap-1 max-md:p-[7px_12px]"
          @click="toggleModal('modalUploadExcel')"
        >
          <img src="@/assets/images/bx_import.svg" alt="" />
          <span class="text-[16px] leading-normal font-bold text-[#464661] max-md:text-[14px]"> Import </span>
        </button> -->

        <!-- <template v-if="checkPermission('User', 'Import')">
         
        </template>

        <template v-if="checkPermission('User', 'Export')">
          <button
            type="button"
            id="tableExport"
            class="max-md:flex-auto inline-flex items-end justify-center max-md:items-center max-md:gap-1 gap-2 rounded-[24px] border border-solid border-[#EDEDF6] p-[7px_24px] max-md:p-[7px_12px] bg-white cursor-pointer transition hover:shadow-hoverinset"
            @click="toggleModal('modalExport')"
          >
            <img src="@/assets/images/bx_export.svg" alt="" />
            <span
              class="text-[#909090] text-[16px] max-md:text-[14px] font-bold leading-normal"
              >Export</span
            >
          </button>
        </template> -->

        <template v-if="checkPermission('User', 'Create')">
          <button
            id="tableAdding"
            type="button"
            class="hover:shadow-hoverinset inline-flex cursor-pointer items-end justify-center gap-2 rounded-[24px] bg-[#1b4dea] p-[7px_12px] transition max-md:flex-auto max-md:items-center max-md:gap-1"
            @click="toggleModal('modalNewUser')"
          >
            <img src="@/assets/images/si_add-fill.svg" alt="" />
            <span class="font-inter text-[16px] leading-normal font-bold text-white max-md:text-[14px]">
              Thêm mới
            </span>
          </button>
        </template>
      </div>
    </div>

    <template v-if="checkPermission('User', 'List')">
      <div class="flex h-full flex-col">
        <div id="tableMagic" class="table-magic styleTableMagic max-md:mb-4">
          <div class="table-container relative">
            <!-- Example column -->
            <div id="tableRowHeader" class="header table-row justify-between">
              <div v-for="(column, index) in tbhead" v-show="column.visible" :key="index" class="cell">
                {{ column.title }}

                <div v-if="column.hasSort" class="tb-sort">
                  <button type="button" class="cursor-pointer" @click="handleSort(column, index)">
                    <img src="@/assets/images/tb-sort.svg" alt="" />
                  </button>
                </div>
              </div>

              <div class="cell pinned">
                <div class="cell edit !justify-center">Thao tác</div>
              </div>
            </div>

            <!-- Skeleton Loading -->
            <SkeletonTable v-if="isLoading" :columns="tbhead.filter((col) => col.visible).length + 1" :rows="10" />

            <!-- Table Data -->
            <div v-else id="tableRowBody" class="body table-row">
              <template v-for="(items, index) in dataDocument?.doc?.items" :key="index">
                <div v-for="(item, _) in items" :key="index" class="table-item justify-between">
                  <!-- bg-blue , bg-green , bg-red , bg-purple , :class="{ 'bg-blue': id === 1 }"-->

                  <div v-show="tbhead[0].visible" class="cell">
                    <template v-if="index < 9"> 0{{ index + 1 }} </template>
                    <template v-else>{{ index + 1 }}</template>
                  </div>

                  <div v-show="tbhead[1].visible" class="cell">
                    {{ item?.code }}
                  </div>

                  <div v-show="tbhead[2].visible" class="cell">
                    {{ item?.name }}
                  </div>

                  <div v-show="tbhead[3].visible" class="cell">
                    {{ item?.phone }}
                  </div>

                  <div v-show="tbhead[4].visible" class="cell">
                    {{ item?.email }}
                  </div>

                  <div v-show="tbhead[5].visible" class="cell">
                    {{ item?.position_text }}
                  </div>

                  <div v-show="tbhead[6].visible" class="cell">
                    {{ item?.staff_text }}
                  </div>

                  <div v-show="tbhead[7].visible" class="cell">
                    {{ item?.title }}
                  </div>

                  <div v-show="tbhead[8].visible" class="cell">
                    {{ item?.status_text }}
                  </div>

                  <div v-show="tbhead[9].visible" class="cell">
                    {{ item?.username }}
                  </div>

                  <div v-show="tbhead[10].visible" class="cell">
                    {{ item?.office_text }}
                  </div>

                  <div v-show="tbhead[11].visible" class="cell">
                    {{ item?.status_married_text }}
                  </div>

                  <div v-show="tbhead[12].visible" class="cell">
                    {{ item?.refer_name }}
                  </div>

                  <div v-show="tbhead[13].visible" class="cell">
                    {{ item?.refer_relationship }}
                  </div>

                  <div v-show="tbhead[14].visible" class="cell">
                    {{ item?.refer_phone }}
                  </div>

                  <div v-show="tbhead[15].visible" class="cell">
                    <template v-if="Number(item?.status) === 1">
                      <div class="cell justify-center">
                        <div
                          class="status status-green status-body flex aspect-square h-[24px] w-auto flex-col items-center justify-center !p-0"
                        >
                          <Icon icon="radix-icons:check" class="h-2 w-2 lg:h-3 lg:w-3" />
                        </div>
                      </div>
                    </template>

                    <template v-if="Number(item?.status) === 2">
                      <div class="cell justify-center">
                        <div
                          class="status status-red status-body flex aspect-square h-[24px] w-auto flex-col items-center justify-center !p-0"
                        >
                          <Icon icon="radix-icons:cross-1" class="h-2 w-2 lg:h-3 lg:w-3" />
                        </div>
                      </div>
                    </template>
                  </div>

                  <div v-show="tbhead[16].visible" class="cell">
                    {{ item?.working_day }}
                  </div>

                  <div v-show="tbhead[17].visible" class="cell">
                    {{ item?.official_day }}
                  </div>

                  <div v-show="tbhead[18].visible" class="cell">
                    <template v-if="Number(item?.status) === 2">
                      {{ item?.updated_at }}
                    </template>
                  </div>

                  <div class="cell pinned pinned-body !justify-center">
                    <div class="cell edit edit-body">
                      <template v-if="checkPermission('User', 'Update')">
                        <button
                          type="button"
                          class="cell-btn-edit shrink-0 cursor-pointer"
                          @click="handleGetDetailUser(item?.phone)"
                        >
                          <img src="@/assets/images/action-edit-2.svg" alt="" />
                        </button>
                      </template>

                      <template v-if="checkPermission('User', 'Delete')">
                        <button
                          type="button"
                          class="cell-btn-delete shrink-0 cursor-pointer"
                          @click="confirmDeleteUser(item?.id)"
                        >
                          <img src="@/assets/images/action-edit-3.svg" alt="" />
                        </button>
                      </template>

                      <template v-if="checkPermission('Work', 'Timekeeping')">
                        <button
                          type="button"
                          class="cell-btn-update-timekeeping flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f97e06] p-1"
                          @click="confirmUpdateTimekeeping(item?.id)"
                        >
                          <Icon icon="mdi:clock-outline" class="h-4.5 w-4.5 text-[#fff]" />
                        </button>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

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
              <button
                type="button"
                :class="{ disabled: paginate.page === 1 }"
                @click="handlePageChange(paginate.page - 1)"
              >
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
                type="button"
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
    </template>

    <ModalUploadExcel
      :modal="modalActive.modalUploadExcel"
      @toggle-modal="toggleModal('modalUploadExcel')"
      @upload-success="handleUploadSuccess"
      @upload-error="handleUploadError"
      @navigate-to-edit="handleNavigateToEdit"
    />

    <ModalRegisterUser
      :prop-function="fetchDataDocument"
      :modal="modalActive.modalNewUser"
      @toggle-modal="toggleModal('modalNewUser')"
      @post-request="getPostRequest"
      @open-reset-password="handleOpenResetPassword"
    />

    <ModalEditUser
      :userdata="paramsDetailUser"
      :prop-function="fetchDataDocument"
      :modal="modalActive.modalEditUser"
      @toggle-modal="toggleModal('modalEditUser')"
      @post-request-edit="getPostRequestEdit"
    />

    <Modal :modal-active="modalActive.modalExport" max-width="max-w-[512px]" @close="toggleModal('modalExport')">
      <div class="overflow-hidden rounded-[24px] bg-white p-[45px_54px]">
        <div class="mb-3 text-center text-[16px] font-bold text-[#464661] uppercase">EXport người dùng</div>

        <div class="mb-3 text-center">
          <img class="mx-auto" src="@/assets/images/icon-park-outline_attention.svg" alt="" />
        </div>

        <div class="mx-auto mb-6 max-w-[280px] text-center text-[16px]/[26px] font-semibold text-[#464661] underline">
          Bạn có chắc muốn export danh sách người dùng?
        </div>

        <div class="flex flex-wrap items-stretch gap-6">
          <a
            href=""
            class="hover:shadow-hoverinset inline-flex max-w-[175px] flex-auto items-center justify-center rounded-lg border border-solid border-[#EDEDF6] bg-white p-1.5 text-[16px] font-semibold text-[#464661] uppercase transition"
            >KHÔNG</a
          >
          <a
            href=""
            class="hover:shadow-hoverinset inline-flex max-w-[175px] flex-auto items-center justify-center rounded-lg border border-solid border-[#013878] bg-[#013878] p-1.5 text-[16px] font-semibold text-white uppercase transition"
            >CÓ</a
          >
        </div>
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
          Bạn chắc chắn muốn xoá người dùng này ?
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
            @click="handleDeleteUser"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>

    <Modal
      :modal-active="modalActive.modalTimekeepingConfirm"
      max-width="max-w-[512px]"
      @close="toggleModal('modalTimekeepingConfirm')"
    >
      <div class="overflow-hidden rounded-[24px] bg-white p-[45px_16px]">
        <div class="mb-3 text-center text-[16px] font-bold text-[#464661] uppercase">Thông báo</div>

        <div class="mb-3 text-center">
          <img class="mx-auto" src="@/assets/images/icon-park-outline_attention.svg" alt="" />
        </div>

        <div class="mx-auto mb-6 text-center text-[16px]/[26px] font-semibold text-[#464661] underline">
          Bạn chắc chắn muốn cập nhật chấm công cho người dùng này ?
        </div>

        <div class="mt-9 flex flex-wrap items-stretch justify-center gap-3 text-center xl:gap-6">
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[130px]"
            @click="toggleModal('modalTimekeepingConfirm')"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[130px]"
            @click="handleUpdateTimekeeping"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastCreate"
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

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastUpdate"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataPostRequestEdit?.errors[Object.keys(dataPostRequestEdit?.errors)[0]],
          'bg-[#c4ffd0]': dataPostRequestEdit?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataPostRequestEdit?.message }}
        </ToastTitle>
        <ToastDescription v-if="dataPostRequestEdit?.errors" class="text-[11px] font-normal">
          {{ dataPostRequestEdit?.errors[Object.keys(dataPostRequestEdit?.errors)[0]] }}
        </ToastDescription>
        <!-- <ToastClose aria-label="Close"><span aria-hidden>×</span></ToastClose> -->
      </ToastRoot>
      <ToastViewport
        class="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </ToastProvider>

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastTimekeeping"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataTimekeepingRequest?.errors && dataTimekeepingRequest?.errors !== '',
          'bg-[#c4ffd0]': dataTimekeepingRequest?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataTimekeepingRequest?.message }}
        </ToastTitle>
        <ToastDescription
          v-if="dataTimekeepingRequest?.errors && dataTimekeepingRequest?.errors !== ''"
          class="text-[11px] font-normal"
        >
          {{ dataTimekeepingRequest?.errors }}
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

  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { endOfDay, format, startOfMonth } from 'date-fns'
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
  import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
  import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import ModalEditUser from '@/components/Modal/ModalEditUser.vue'
  import ModalRegisterUser from '@/components/Modal/ModalRegisterUser.vue'
  import ModalUploadExcel from '@/components/Modal/ModalUploadExcel.vue'
  import Modal from '@/components/Modals.vue'
  import SkeletonTable from '@/components/SkeletonTable.vue'
  import { useSystemUser } from '@/composables/system-user'
  import { apiUri } from '@/constants/apiUri'
  import router from '@/router'
  import { usePermissionStore } from '@/store/permission'
  import { tableMagic } from '@/utils/main'

  import MainLayout from '../MainLayout.vue'

  const permissionData = usePermissionStore()
  const { userData } = storeToRefs(permissionData)
  console.log('🚀 ~ userData:', userData)

  const toast = reactive({
    toastCreate: false,
    toastUpdate: false,
    toastTimekeeping: false,
  })

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
    modalNewUser: false,
    modalExport: false,
    modalEditUser: false,
    modalStatusRegister: false,
    modalStatusEdit: false,
    modalStatusConfirm: false,
    modalTimekeepingConfirm: false,
    modalUploadExcel: false,
  })

  const toggleModal = (modalStateName: any) => {
    modalActive.value[modalStateName] = !modalActive.value[modalStateName]
  }

  const handleOpenResetPassword = () => {
    permissionData.toggleModalUserInfo()
  }

  const tbhead = reactive([
    {
      title: 'STT',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Mã NV',
      hasSort: true,
      visible: true,
    },
    {
      title: 'Họ và tên',
      hasSort: true,
      visible: true,
    },
    {
      title: 'Số điện thoại',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Email',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Chức vụ',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Bộ phận',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Chức danh',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Kiểu nhân viên',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Mã nhân viên',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Địa điểm',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Tình trạng hôn nhân',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Họ và tên người thân',
      hasSort: false,
      visible: true,
    },

    {
      title: 'SĐT người thân',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Mối quan hệ',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Trạng thái',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Ngày bắt đầu',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Ngày chính thức',
      hasSort: false,
      visible: true,
    },
    {
      title: 'Ngày kết thúc',
      hasSort: false,
      visible: true,
    },
  ])

  // State cho bộ lọc dropdown
  const showColumnFilter = ref(false)
  const columnSearchText = ref('')

  // Computed để lọc các cột dựa trên search text
  const filteredColumns = computed(() => {
    if (!columnSearchText.value) return tbhead
    return tbhead.filter((column) => column.title.toLowerCase().includes(columnSearchText.value.toLowerCase()))
  })

  // Function để toggle hiển thị cột
  const toggleColumnVisibility = (columnIndex: number) => {
    // Tìm index thực tế trong tbhead dựa trên filteredColumns
    const originalIndex = tbhead.findIndex((col) => col.title === filteredColumns.value[columnIndex].title)
    if (originalIndex !== -1) {
      tbhead[originalIndex].visible = !tbhead[originalIndex].visible
    }
  }

  const auth = useAuth()

  const params = reactive({
    staff_id: '',
    position_id: '',
    status: '',
    per_group_name: '',
    phone: '',
    sort: 'name|asc', // Default sorting
    begin_date: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    finish_date: format(endOfDay(new Date()), 'yyyy-MM-dd'),
  })
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

  const fetchDataDocument = () => {
    if (debounceTime.value.timeOut !== null) {
      clearTimeout(debounceTime.value.timeOut)
    }

    debounceTime.value.timeOut = setTimeout(() => {
      const res = {
        ...params,
        page: paginate.page,
        per_page: paginate.per_page,
      }

      doFetch(
        `${apiUri}/user/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
        auth.token() as string
      ).then(() => {
        // console.log('🚀 ~ fetchDataDocument ~ res:', res)
        tableMagic()
      })
    }, 300)
  }

  const dataPerGroupName = ref<any | null>(null)
  const fetchPerGroupName = async () => {
    try {
      const response = await axios.get(`${apiUri}/permission/list`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      dataPerGroupName.value = response.data.data
      console.log('🚀 ~ fetchPerGroupName ~ response:', dataPerGroupName.value)
    } catch (error) {
      console.log('🚀 ~ fetchPerGroupName ~ error:', error)
    }
  }

  const departmentTree = ref<any | null>(null)
  const fetchDepartmentTree = async () => {
    try {
      const response = await axios.get(`${apiUri}/categories/staff`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      departmentTree.value = response.data.data
      console.log('🚀 ~ fetchDepartmentTree ~ departmentTree:', departmentTree.value)
    } catch (error) {
      console.log('🚀 ~ fetchDepartmentTree ~ error:', error)
    }
  }

  // Function để flatten department tree thành array với indent
  const flattenDepartmentTree = (treeData: any[], level: number = 0): any[] => {
    const result: any[] = []

    if (!Array.isArray(treeData)) return result

    const flattenNode = (node: any, currentLevel: number) => {
      // Tạo indent string cho tree structure
      let indentStr = ''
      if (currentLevel > 0) {
        indentStr = '  '.repeat(currentLevel - 1) + '└─ '
      }

      // Thêm node hiện tại vào result
      result.push({
        id: node.id,
        name: node.name,
        displayName: indentStr + node.name,
        level: currentLevel,
      })

      // Nếu có children thì đệ quy
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach((child: any) => {
          flattenNode(child, currentLevel + 1)
        })
      }
    }

    treeData.forEach((node: any) => {
      flattenNode(node, level)
    })

    return result
  }

  // Computed property để get flattened departments
  const flattenedDepartments = computed(() => {
    return flattenDepartmentTree(departmentTree.value || [])
  })

  const dataPosition = ref<any | null>(null)
  const fetchPositionList = async () => {
    try {
      const response = await axios.get(`${apiUri}/categories/list?type=position`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      dataPosition.value = response.data.data.items
      console.log('🚀 ~ fetchPosition ~ dataPosition:', dataPosition.value)
    } catch (error) {
      console.log('🚀 ~ fetchPosition ~ error:', error)
    }
  }

  // Fetch user options API
  const userOptions = ref<any | null>(null)
  const fetchUserOptions = async () => {
    try {
      const response = await axios.get(`${apiUri}/user/option`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      userOptions.value = response.data
      console.log('🚀 ~ fetchUserOptions ~ userOptions:', userOptions.value)
    } catch (error) {
      console.log('🚀 ~ fetchUserOptions ~ error:', error)
    }
  }

  // Computed properties for user options
  const statusOptions = computed(() => {
    const statusOption = userOptions.value?.status_option || {}
    console.log('🚀 ~ statusOptions ~ statusOption:', statusOption)

    // Transform object {key: value} to array [{key, value}]
    if (typeof statusOption === 'object' && !Array.isArray(statusOption)) {
      return Object.entries(statusOption).map(([key, value]) => ({
        key,
        value: String(value),
      }))
    }

    // If already array, return as is
    if (Array.isArray(statusOption)) {
      return statusOption.map((item) => ({
        key: item.key || item.id || item.code,
        value: item.value || item.name || item.label,
      }))
    }

    return []
  })

  const datepicker = ref<any | null>([startOfMonth(new Date()), endOfDay(new Date())])
  const updateDates = () => {
    if (datepicker.value && datepicker.value[0] && datepicker.value[1]) {
      params.begin_date = format(datepicker.value[0], 'yyyy-MM-dd')
      params.finish_date = format(datepicker.value[1], 'yyyy-MM-dd')
    } else {
      params.begin_date = ''
      params.finish_date = ''
    }
    handleFilterChange()
  }

  watch(datepicker, () => {
    if (auth.check()) {
      updateDates()
    }
  })

  const handlePageChange = (pageNum: number) => {
    // console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
    paginate.page = pageNum
    fetchDataDocument()
  }

  const handleSearchUser = async () => {
    try {
      paginate.page = 1
      paginate.per_page = 20
      await fetchDataDocument()
    } catch (error) {
      console.log('🚀 ~ handleSearchUser ~ error:', error)
    }
  }

  // Handle filter changes without debounce for immediate response
  const handleFilterChange = () => {
    paginate.page = 1
    paginate.per_page = 20
    // Call fetch directly without debounce
    const res = {
      ...params,
      page: paginate.page,
      per_page: paginate.per_page,
    }

    doFetch(
      `${apiUri}/user/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`,
      auth.token() as string
    ).then(() => {
      tableMagic()
    })
  }

  const userToDelete = ref<any | null>(null)
  const confirmDeleteUser = (id: number) => {
    toggleModal('modalStatusConfirm')
    userToDelete.value = id.toString()
  }
  const dataPostRequestDelete = ref<any | null>(null)
  const handleDeleteUser = async () => {
    if (!userToDelete.value) return

    try {
      const formData = new FormData()
      formData.append('id', userToDelete.value)

      const response = await axios.post(`${apiUri}/user/delete`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      dataPostRequestDelete.value = response.data
      toast.toastDelete = true
      toggleModal('modalStatusConfirm')
      fetchDataDocument()
    } catch (error) {
      console.log('🚀 ~ handleDeleteUser ~ error:', error)
    }
  }

  const userToUpdateTimekeeping = ref<any | null>(null)
  const confirmUpdateTimekeeping = (mcc_user_id: number) => {
    toggleModal('modalTimekeepingConfirm')
    userToUpdateTimekeeping.value = mcc_user_id.toString()
  }
  const dataTimekeepingRequest = ref<any | null>(null)
  const handleUpdateTimekeeping = async () => {
    if (!userToUpdateTimekeeping.value) return

    try {
      const formData = new FormData()
      formData.append('mcc_user_id', userToUpdateTimekeeping.value)

      const response = await axios.post(`${apiUri}/work/timekeeping`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      dataTimekeepingRequest.value = response.data
      toggleModal('modalTimekeepingConfirm')
      fetchDataDocument()
      if (dataTimekeepingRequest.value) {
        toast.toastTimekeeping = true
      }
    } catch (error: any) {
      console.log('🚀 ~ handleUpdateTimekeeping ~ error:', error)
      // Handle error response
      if (error.response?.data) {
        dataTimekeepingRequest.value = error.response.data
        toast.toastTimekeeping = true
      }
    }
  }

  const paramsDetailUser = ref<any | null>(null)
  const handleGetDetailUser = async (phone: any) => {
    try {
      const response = await axios.get(`${apiUri}/user/list?phone=${phone}`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      paramsDetailUser.value = response.data.data.items
      toggleModal('modalEditUser')
      console.log('🚀 ~ .then ~ paramsDetailUser.value:', paramsDetailUser.value)
    } catch (error) {
      console.log('🚀 ~ getDetailUser ~ error:', error)
    }
  }

  const dataPostRequest = ref<any | null>(null)
  const getPostRequest = (data: any) => {
    dataPostRequest.value = data
    if (dataPostRequest.value) {
      toggleModal('modalNewUser')
      toast.toastCreate = true
    }
    // if (dataPostRequest.value.status === 1) toggleModal('modalAddLeave')
  }

  const dataPostRequestEdit = ref<any | null>(null)
  const getPostRequestEdit = (data: any) => {
    dataPostRequestEdit.value = data
    if (dataPostRequestEdit.value) {
      toggleModal('modalEditUser')
      toast.toastUpdate = true
    }
    // if (dataPostRequestEdit.value.status === 1) toggleModal('modalEditLeave')
  }

  const {
    data,
    // isLoading: isLoadingDocument,
    doFetch,
    // fetchCategoryDocument,
    categories,
  } = useSystemUser()

  // Get loading state from useSystemUser
  const { isLoading } = useSystemUser()

  const dataDocument = reactive<any>({
    doc: data,
  })

  const dataTotalPages = computed(() =>
    Math.ceil(Number(dataDocument.doc?.pagination?.total) / Number(paginate.per_page))
  )

  // Computed property để tính toán range hiển thị pagination
  const paginationRange = computed(() => {
    const currentPage = Number(paginate.page)
    const perPage = Number(paginate.per_page)
    const total = Number(dataDocument.doc?.pagination?.total || 0)

    const start = (currentPage - 1) * perPage + 1
    const end = Math.min(currentPage * perPage, total)

    return { start, end, total }
  })

  const permissionStore = usePermissionStore()
  const { permissionList } = storeToRefs(permissionStore)
  const { checkPermission } = permissionStore

  watch(permissionList, () => {
    console.log('🚀 ~ //onMounted ~ permissionList:', permissionList)
    if (auth.check()) {
      if (!permissionList.value.includes('Document')) {
        alert('Bạn không có quyền truy cập vào trang này')
        router.push({ name: 'NotFound404' })
      } else {
        fetchDataDocument()
        console.log(dataDocument, 'dataDocument')
      }
    }
  })

  watch(
    paginate,
    async () => {
      fetchDataDocument()
    },
    {
      // must pass deep option to watch for changes on object properties
      deep: true,
      // can also pass immediate to handle that first request AND when queries change
      immediate: true,
    }
  )

  watch(
    () => [params.per_group_name, params.position_id, params.staff_id],
    () => {
      if (params.per_group_name === 'all') {
        params.per_group_name = ''
      }

      if (params.staff_id === 'all') {
        params.staff_id = ''
      }

      if (params.position_id === 'all') {
        params.position_id = ''
      }
    },
    { deep: true, immediate: true }
  )

  const handleSort = (column: any, index: any) => {
    // Determine which field to sort by based on index or column property
    let field = 'code'

    // Map column index to appropriate field names
    if (index === 1) {
      field = 'code' // Mã NV
    } else if (index === 2) {
      field = 'name' // Họ và tên
    }

    // Toggle sort direction
    const currentSort = params.sort.split('|')
    console.log('🚀 ~ handleSort ~ currentSort:', currentSort)
    const currentField = currentSort[0]
    const currentDirection = currentSort[1]

    if (currentField === field) params.sort = `${field}|${currentDirection === 'asc' ? 'desc' : 'asc'}`
    else params.sort = `${field}|asc`

    // Fetch data with new sort parameters
    fetchDataDocument()
  }

  const handleUploadSuccess = (uploadData: any) => {
    console.log('Upload successful:', uploadData)

    // Here you would normally send the data to your API
    // For now, we'll show a success message
    toast.toastCreate = false
    setTimeout(() => {
      toast.toastCreate = true
      // You can customize the toast message
      dataPostRequest.value = {
        status: 1,
        message: `Đã tải lên thành công ${uploadData.data.length} bản ghi từ file Excel`,
        errors: null,
      }
    }, 100)

    // Refresh the data list
    fetchDataDocument()
  }

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error)

    // Show error message
    toast.toastCreate = false
    setTimeout(() => {
      toast.toastCreate = true
      dataPostRequest.value = {
        status: 0,
        message: 'Có lỗi xảy ra khi tải lên file Excel',
        errors: null,
      }
    }, 100)
  }

  const handleNavigateToEdit = (uploadData: any) => {}

  onMounted(() => {
    if (auth.check()) {
      fetchDataDocument()
      fetchPerGroupName()
      fetchDepartmentTree()
      fetchPositionList()
      fetchUserOptions()
    }

    tableMagic()

    // Đóng dropdown khi click bên ngoài
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!target.closest('.column-filter-container')) {
        showColumnFilter.value = false
      }
    })
  })
</script>

<style lang="scss" scoped>
  @import '../../styles/table.module.scss';

  .status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #464661;
    font-size: 10px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    padding: 6px 10px !important;
    border-radius: 24px;

    @media (max-width: 767px) {
      padding: 6px !important;

      padding-left: 0 !important;
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

<style lang="scss">
  .user-datepicker {
    .dp__input {
      border-radius: 24px;
    }
  }
</style>
