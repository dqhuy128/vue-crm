<template>
  <Modal :modal-active="props.modal" max-width="max-w-[865px]" @close="() => emit('toggle-modal')">
    <div class="overflow-hidden rounded-[24px] bg-white p-1.5">
      <div class="mt-8 mb-7 text-center">
        <h3 class="m-0 text-[16px] font-bold text-[#464661] uppercase">thêm mới người dùng</h3>
      </div>
      <!-- <div class="bg-[#fafafa] rounded-[18px_18px_0_0] p-5 pt-8">
        <div
          class="relative max-w-[112px] max-h-[112px] w-full h-full mx-auto mb-4"
        >
          <div
            class="w-full h-full max-w-full bg-[#E9F0F4] rounded-[24px] overflow-hidden"
          >
            <img
              src="@/assets/images/si_user-fill.svg"
              class="object-cover w-full h-full"
              alt=""
            />
          </div>

          <div class="absolute bottom-0 right-0 z-10">
            <img src="@/assets/images/ic-camera.svg" alt="" />
          </div>
        </div>
      </div> -->

      <!-- sform register -->
      <form class="mx-auto w-full p-[24px_16px] lg:p-[24px_48px]" @submit.prevent="onSubmitRegister()">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <div class="block">
              <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Mã nhân viên
              </span>
              <input
                v-bind="codeAttrs"
                id=""
                v-model="code"
                type="text"
                name=""
                placeholder="Nhập mã nhân viên"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.code }}</div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <div class="block">
              <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Họ và tên
              </span>
              <input
                v-bind="nameAttrs"
                id=""
                v-model="name"
                type="text"
                name=""
                placeholder="Nhập họ tên"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.name }}</div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <div class="block">
              <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Số điện thoại
              </span>
              <input
                v-bind="phoneAttrs"
                id=""
                v-model="phone"
                type="text"
                name=""
                placeholder="Nhập số điện thoại"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.phone }}</div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <div class="block">
              <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Email
              </span>
              <input
                v-bind="emailAttrs"
                id=""
                v-model="email"
                type="text"
                name=""
                placeholder="Nhập email"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.email }}</div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Ngày tháng năm sinh
              </span>

              <VueDatePicker
                v-model="pickerDOB"
                :enable-time-picker="false"
                locale="vi"
                :format-locale="vi"
                cancel-text="Huỷ"
                select-text="Chọn"
                format="dd/MM/yyyy"
                :max-date="new Date()"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <div class="block">
              <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Nhóm người dùng
              </span>

              <SelectRoot v-model="group_user" v-bind="guAttrs">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          v-for="(item, key) in listGrPermiss"
                          :key="key"
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.name)"
                        >
                          <SelectItemText>
                            <!-- {{ capitalizeFirstLetter(item) }} -->
                            {{ item.description }}
                          </SelectItemText>
                        </SelectItem>
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

              <div class="mt-1 text-sm text-red-500">
                {{ errors.group_user }}
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]"> CCCD </span>

              <input
                id=""
                v-model="paramsUser.identification"
                type="text"
                name=""
                placeholder="Nhập số CCCD"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Ngày cấp
              </span>

              <VueDatePicker
                v-model="pickerDateissue"
                :enable-time-picker="false"
                locale="vi"
                :format-locale="vi"
                cancel-text="Huỷ"
                select-text="Chọn"
                format="dd-MM-yyyy"
                :max-date="new Date()"
                @update:model-value="updateDates"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Nơi cấp
              </span>

              <input
                id=""
                v-model="paramsUser.place_of_issue"
                type="text"
                name=""
                placeholder="Nhập nơi cấp"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Quê quán
              </span>

              <input
                id=""
                v-model="paramsUser.original_place"
                type="text"
                name=""
                placeholder="Nhập địa chỉ"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Bộ phận
              </span>

              <SelectRoot v-model="staffType.id">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn bộ phận"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Chọn bộ phận </SelectItemText>
                        </SelectItem>

                        <template v-for="(items, key) in staffData">
                          <SelectItem
                            v-for="(item, _) in items"
                            :key="item.id"
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.id)"
                          >
                            <SelectItemText>
                              <!-- {{ capitalizeFirstLetter(item) }} -->
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
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Chức vụ
              </span>

              <SelectRoot v-model="positionType.id">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Chọn chức vụ </SelectItemText>
                        </SelectItem>

                        <template v-for="(items, key) in positionData">
                          <SelectItem
                            v-for="(item, _) in items"
                            :key="item.id"
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.id)"
                          >
                            <SelectItemText>
                              <!-- {{ capitalizeFirstLetter(item) }} -->
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
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Địa điểm làm việc
              </span>

              <SelectRoot v-model="regionType.id">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn địa điểm"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Chọn địa điểm </SelectItemText>
                        </SelectItem>

                        <SelectItem
                          v-for="(item, _) in regionData"
                          :key="item.id"
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.id)"
                        >
                          <SelectItemText>
                            <!-- {{ capitalizeFirstLetter(item) }} -->
                            {{ item.name }}
                          </SelectItemText>
                        </SelectItem>
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
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                Quản lý trực tiếp
              </span>

              <SelectRoot v-model="leaderType.id">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn quản lý"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Chọn quản lý </SelectItemText>
                        </SelectItem>

                        <template v-for="(items, key) in leaderData">
                          <SelectItem
                            v-for="(item, _) in items"
                            :key="item.id"
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.id)"
                          >
                            <SelectItemText>
                              <!-- {{ capitalizeFirstLetter(item) }} -->
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
          </div>

          <div class="col-span-12 xl:col-span-6">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Địa chỉ thường trú
              </span>

              <input
                id=""
                v-model="paramsUser.permanent_address"
                type="text"
                name=""
                placeholder="Nhập địa chỉ"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-6">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Địa chỉ tạm trú
              </span>

              <input
                id=""
                v-model="paramsUser.residence_address"
                type="text"
                name=""
                placeholder="Nhập địa chỉ tạm trú"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                Hợp đồng làm việc
              </span>

              <input
                id=""
                v-model="paramsUser.work_contract"
                type="text"
                name=""
                placeholder="Nhập hợp đồng làm việc"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                Ngày tháng vào làm việc
              </span>

              <VueDatePicker
                v-model="pickerWorkingDay"
                :enable-time-picker="false"
                locale="vi"
                :format-locale="vi"
                cancel-text="Huỷ"
                select-text="Chọn"
                format="dd-MM-yyyy"
                @update:model-value="updateDates"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-4">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                Số ngày nghỉ phép năm
              </span>
              <input
                id=""
                v-model="paramsUser.total_days_off"
                type="text"
                name=""
                placeholder="Nhập số ngày nghỉ phép năm"
                class="font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-4">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                ID máy chấm công
              </span>

              <SelectRoot v-model="paramsUser.mcc_user_id">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn ID máy chấm công"
                  />
                  <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                          <SelectItemText> Chọn ID máy chấm công </SelectItemText>
                        </SelectItem>

                        <SelectItem
                          v-for="(itemValue, index) in mccData.value"
                          :key="mccData.id[index]"
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(mccData.id[index])"
                        >
                          <SelectItemText> {{ mccData.id[index] }} - {{ itemValue }} </SelectItemText>
                        </SelectItem>
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
          </div>

          <div class="col-span-12 md:col-span-4">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                Trạng thái
              </span>

              <SelectRoot v-model="paramsUser.status">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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
                    class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectViewport>
                      <SelectGroup>
                        <SelectItem
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(1)"
                        >
                          <SelectItemText>
                            <!-- {{ capitalizeFirstLetter(item) }} -->
                            Đang hoạt động
                          </SelectItemText>
                        </SelectItem>

                        <SelectItem
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(2)"
                        >
                          <SelectItemText>
                            <!-- {{ capitalizeFirstLetter(item) }} -->
                            Dừng hoạt động
                          </SelectItemText>
                        </SelectItem>
                      </SelectGroup>
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>
            </div>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6">
          <button
            type="button"
            class="hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]"
            @click="() => emit('toggle-modal')"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="border-main bg-main hover:shadow-hoverinset inset-sha relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]"
            :class="{ 'pointer-events-none opacity-75': onSubmitting }"
          >
            <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
              <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
            </div>
            <div v-else>Lưu</div>
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import 'flatpickr/dist/flatpickr.css'
  import '@vuepic/vue-datepicker/dist/main.css'

  import { Icon } from '@iconify/vue'
  import { toTypedSchema } from '@vee-validate/yup'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import { vi } from 'date-fns/locale/vi'
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
  import { useForm } from 'vee-validate'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'
  import * as yup from 'yup'

  import Modal from '@/components/Modals.vue'
  import { apiUri } from '@/constants/apiUri'

  const auth = useAuth()

  const props = defineProps<{
    modal: any
    propFunction: Function
  }>()
  const emit = defineEmits(['toggle-modal', 'post-request'])

  const pickerDOB = ref<any | null>(null)
  const pickerDateissue = ref<any | null>(null)
  const pickerWorkingDay = ref<any | null>(null)

  const initDates = () => {
    pickerDOB.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerDateissue.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerWorkingDay.value = new Date(new Date().setDate(new Date().getDate() + 1))
  }
  const updateDates = () => {
    if (pickerDOB.value) {
      // Nếu là đối tượng Date, format theo chuẩn yyyy-MM-dd
      paramsUser.dob = format(pickerDOB.value, 'yyyy-MM-dd')
    }
    if (pickerDateissue.value) {
      paramsUser.date_of_issue = format(pickerDateissue.value, 'yyyy-MM-dd')
    }
    if (pickerWorkingDay.value) {
      paramsUser.working_day = format(pickerWorkingDay.value, 'yyyy-MM-dd')
    }
  }

  // Theo dõi thay đổi của các date picker để cập nhật dữ liệu
  watch([pickerDOB, pickerDateissue, pickerWorkingDay], () => {
    if (auth.check()) {
      updateDates()
    }
  })

  const paramsUser = reactive<any>({
    code: '',
    phone: '',
    name: '',
    email: '',
    dob: '',
    per_group_name: '',
    identification: '',
    date_of_issue: '',
    place_of_issue: '',
    original_place: '',
    part_id: '',
    position_id: '',
    region_id: '',
    parent_id: '',
    permanent_address: '',
    residence_address: '',
    work_contract: '',
    working_day: '',
    total_days_off: '',
    status: '',
    mcc_user_id: '',
  })

  // Định nghĩa schema validate với yup
  const schema = toTypedSchema(
    yup.object({
      name: yup.string().required('Bạn hãy nhập họ tên'),
      code: yup.string().required('Bạn hãy nhập mã nhân viên'),
      email: yup
        .string()
        .required('Bạn hãy nhập email')
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Email không hợp lệ'
        ),
      phone: yup
        .string()
        .required('Bạn hãy nhập số điện thoại')
        .matches(/^[0-9]{10}$/, 'Bạn cần nhập đúng 10 số'),
      group_user: yup.string().required('Bạn hãy chọn nhóm người dùng'),
    })
  )

  // Sử dụng useForm hook
  const { handleSubmit, errors, values, meta, defineField, resetForm } = useForm({
    validationSchema: schema,
  })

  const [email, emailAttrs] = defineField('email')
  const [phone, phoneAttrs] = defineField('phone')
  const [name, nameAttrs] = defineField('name')
  const [code, codeAttrs] = defineField('code')
  const [group_user, guAttrs] = defineField('group_user')

  const listGrPermiss = ref<any | null>(null)
  const fetchListPermission = async () => {
    try {
      const response = await axios.get(`${apiUri}/permission/list`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      const { data } = response.data
      listGrPermiss.value = data
    } catch (error) {
      console.error('Error fetching permission list:', error)
    }
  }

  const staffType = reactive({
    value: '',
    id: '',
  })
  const staffData = ref<any | null>(null)
  const positionType = reactive({
    value: '',
    id: '',
  })
  const positionData = ref<any | null>(null)
  const regionType = reactive({
    value: '',
    id: '',
  })
  const regionData = ref<any | null>(null)
  const leaderType = reactive({
    value: '',
    id: '',
  })
  const leaderData = ref<any | null>(null)
  const mccData = reactive<any>({
    value: '',
    id: '',
  })

  const fetchMccData = async () => {
    try {
      const response = await axios.get(`${apiUri}/work/usermcc`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      const { items } = response.data.data
      mccData.value = Object.values(items)
      mccData.id = Object.keys(items)
    } catch (error) {
      console.error('Error fetching mcc data:', error)
    }
  }

  const fetchListStaff = async () => {
    try {
      const response = await axios.get(`${apiUri}/categories/list?type=staff`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      const { items } = response.data.data
      staffData.value = items
      // console.log('🚀 ~ fetchListStaff ~ response:', staffData.value)
    } catch (error) {
      console.error('Error fetching staff list:', error)
    }
  }

  const fetchListPosition = async () => {
    try {
      const response = await axios.get(`${apiUri}/categories/list?type=position`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      const { items } = response.data.data
      positionData.value = items
      // console.log('🚀 ~ fetchListPosition ~ response:', positionData.value)
    } catch (error) {
      console.error('Error fetching position list:', error)
    }
  }

  const fetchListRegion = async () => {
    try {
      const response = await axios.get(`${apiUri}/location/region`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      const { items } = response.data.data
      regionData.value = items
      // console.log('🚀 ~ fetchListPosition ~ response:', regionData.value)
    } catch (error) {
      console.error('Error fetching position list:', error)
    }
  }

  const fetchListLeader = async () => {
    try {
      const response = await axios.get(`${apiUri}/user/list`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      const { items } = response.data.data
      leaderData.value = items
      // console.log('🚀 ~ fetchListLeader ~ items:', leaderData.value)
    } catch (error) {
      console.error('Error fetching position list:', error)
    }
  }

  const postRequest = ref<any | null>(null)
  const onSubmitting = ref(false)
  const onSubmitRegister = handleSubmit(async () => {
    onSubmitting.value = true
    try {
      const formDataUser = new FormData()

      if (paramsUser.code) formDataUser.append('code', paramsUser.code)
      if (paramsUser.phone) formDataUser.append('phone', paramsUser.phone)
      if (paramsUser.name) formDataUser.append('name', paramsUser.name)
      if (paramsUser.email) formDataUser.append('email', paramsUser.email)
      if (paramsUser.dob) formDataUser.append('dob', paramsUser.dob)
      if (paramsUser.per_group_name) formDataUser.append('per_group_name', paramsUser.per_group_name)
      if (paramsUser.identification) formDataUser.append('identification', paramsUser.identification)
      if (paramsUser.date_of_issue) formDataUser.append('date_of_issue', paramsUser.date_of_issue)
      if (paramsUser.place_of_issue) formDataUser.append('place_of_issue', paramsUser.place_of_issue)
      if (paramsUser.original_place) formDataUser.append('original_place', paramsUser.original_place)
      if (staffType.id) formDataUser.append('part_id', staffType.id)
      if (positionType.id) formDataUser.append('position_id', positionType.id)
      if (regionType.id) formDataUser.append('region_id', regionType.id)
      if (leaderType.id) formDataUser.append('parent_id', leaderType.id)
      if (paramsUser.permanent_address) formDataUser.append('permanent_address', paramsUser.permanent_address)
      if (paramsUser.residence_address) formDataUser.append('residence_address', paramsUser.residence_address)
      if (paramsUser.work_contract) formDataUser.append('work_contract', paramsUser.work_contract)
      if (paramsUser.working_day) formDataUser.append('working_day', paramsUser.working_day)
      if (paramsUser.total_days_off) formDataUser.append('total_days_off', paramsUser.total_days_off)
      if (paramsUser.status) {
        formDataUser.append('status', paramsUser.status)
      } else {
        formDataUser.append('status', '1')
      }
      if (paramsUser.mcc_user_id) {
        formDataUser.append('mcc_user_id', paramsUser.mcc_user_id)
      }

      const response = await axios.post(`${apiUri}/user/create`, formDataUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      postRequest.value = response.data
      emit('post-request', postRequest.value)
      Object.keys(paramsUser).map((key) => {
        paramsUser[key] = ''
      })
      props.propFunction()
      console.log('🚀 ~ handleSubmit ~ response:', response)
    } catch (error) {
      console.error('Error fetching position list:', error)
    } finally {
      onSubmitting.value = false
    }
  })

  watch([email, phone, name, group_user, code], (newVal) => {
    paramsUser.email = newVal[0]
    paramsUser.phone = newVal[1]
    paramsUser.name = newVal[2]
    paramsUser.per_group_name = newVal[3]
    paramsUser.code = newVal[4]
  })

  watch([staffType, positionType, regionType, leaderType, mccData], () => {
    if (staffType.id === 'all') {
      staffType.id = String(0)
    }
    if (positionType.id === 'all') {
      positionType.id = String(0)
    }
    if (regionType.id === 'all') {
      regionType.id = String(0)
    }
    if (leaderType.id === 'all') {
      leaderType.id = String(0)
    }
    if (mccData.id === 'all') {
      mccData.id = String(0)
    }
  })

  onMounted(() => {
    fetchListPermission()
    fetchListStaff()
    fetchListPosition()
    fetchListRegion()
    fetchListLeader()
    initDates()
    updateDates()
    fetchMccData()
  })
</script>

<style lang="scss" scoped></style>
