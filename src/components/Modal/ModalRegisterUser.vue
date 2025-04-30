<template>
  <Modal
    @close="() => emit('toggle-modal')"
    :modalActive="props.modal"
    maxWidth="max-w-[865px]"
  >
    <div class="rounded-[24px] p-1.5 bg-white overflow-hidden">
      <div class="mt-8 text-center mb-7">
        <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
          thêm mới người dùng
        </h3>
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
      <form
        class="w-full mx-auto lg:p-[24px_48px] p-[24px_16px]"
        @submit.prevent="onSubmitRegister()"
      >
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Mã nhân viên
              </span>
              <input
                v-model="code"
                v-bind="codeAttrs"
                type="text"
                name=""
                id=""
                placeholder="Nhập mã nhân viên"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.code }}</div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Họ và tên
              </span>
              <input
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                name=""
                id=""
                placeholder="Nhập họ tên"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.name }}</div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Số điện thoại
              </span>
              <input
                v-model="phone"
                v-bind="phoneAttrs"
                type="text"
                name=""
                id=""
                placeholder="Nhập số điện thoại"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.phone }}</div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Email
              </span>
              <input
                v-model="email"
                v-bind="emailAttrs"
                type="text"
                name=""
                id=""
                placeholder="Nhập email"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
              <div class="mt-1 text-sm text-red-500">{{ errors.email }}</div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Ngày tháng năm sinh
              </span>

              <div class="relative">
                <VueDatePicker
                  v-model="pickerDOB"
                  :enable-time-picker="false"
                  locale="vi"
                  :format-locale="vi"
                  cancelText="Huỷ"
                  selectText="Chọn"
                  format="dd/MM/yyyy"
                  :max-date="new Date()"
                />
                <div
                  class="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2"
                >
                  <img
                    src="@/assets/images/cuidaa_calendar-outline.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Nhóm người dùng
              </span>

              <SelectRoot v-model="group_user" v-bind="guAttrs">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectScrollUpButton
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-up" />
                    </SelectScrollUpButton>

                    <SelectViewport>
                      <SelectGroup>
                        <SelectItem
                          v-for="(item, key) in listGrPermiss"
                          :key="key"
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.name)"
                        >
                          <SelectItemText>
                            <!-- {{ capitalizeFirstLetter(item) }} -->
                            {{ item.name }} - {{ item.description }}
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

              <div class="mt-1 text-sm text-red-500">
                {{ errors.group_user }}
              </div>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                CCCD
              </span>

              <input
                v-model="paramsUser.identification"
                type="text"
                name=""
                id=""
                placeholder="Nhập số CCCD"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Ngày cấp
              </span>

              <VueDatePicker
                v-model="pickerDateissue"
                :enable-time-picker="false"
                locale="vi"
                :format-locale="vi"
                cancelText="Huỷ"
                selectText="Chọn"
                format="dd-MM-yyyy"
                :max-date="new Date()"
                @update:model-value="updateDates"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Nơi cấp
              </span>

              <input
                v-model="paramsUser.place_of_issue"
                type="text"
                name=""
                id=""
                placeholder="Nhập nơi cấp"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Quê quán
              </span>

              <input
                v-model="paramsUser.original_place"
                type="text"
                name=""
                id=""
                placeholder="Nhập địa chỉ"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Bộ phận
              </span>

              <SelectRoot v-model="staffType.id">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectScrollUpButton
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-up" />
                    </SelectScrollUpButton>

                    <SelectViewport>
                      <SelectGroup>
                        <template v-for="(items, key) in staffData">
                          <SelectItem
                            v-for="(item, _) in items"
                            :key="item.id"
                            class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
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
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-down" />
                    </SelectScrollDownButton>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Chức vụ
              </span>

              <SelectRoot v-model="positionType.id">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectScrollUpButton
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-up" />
                    </SelectScrollUpButton>

                    <SelectViewport>
                      <SelectGroup>
                        <template v-for="(items, key) in positionData">
                          <SelectItem
                            v-for="(item, _) in items"
                            :key="item.id"
                            class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
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
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-down" />
                    </SelectScrollDownButton>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Địa điểm làm việc
              </span>

              <SelectRoot v-model="regionType.id">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectScrollUpButton
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-up" />
                    </SelectScrollUpButton>

                    <SelectViewport>
                      <SelectGroup>
                        <SelectItem
                          v-for="(item, _) in regionData"
                          :key="item.id"
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
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
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-down" />
                    </SelectScrollDownButton>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>
            </div>
          </div>

          <div class="col-span-12 xl:col-span-3 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Quản lý trực tiếp
              </span>

              <SelectRoot v-model="leaderType.id">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectScrollUpButton
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                    >
                      <Icon icon="radix-icons:chevron-up" />
                    </SelectScrollUpButton>

                    <SelectViewport>
                      <SelectGroup>
                        <template v-for="(items, key) in leaderData">
                          <SelectItem
                            v-for="(item, _) in items"
                            :key="item.id"
                            class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
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
                      class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
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
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Địa chỉ thường trú
              </span>

              <input
                v-model="paramsUser.permanent_address"
                type="text"
                name=""
                id=""
                placeholder="Nhập địa chỉ"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
              >
                Địa chỉ tạm trú
              </span>

              <input
                v-model="paramsUser.residence_address"
                type="text"
                name=""
                id=""
                placeholder="Nhập địa chỉ tạm trú"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="required block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Hợp đồng làm việc
              </span>

              <input
                v-model="paramsUser.work_contract"
                type="text"
                name=""
                id=""
                placeholder="Nhập hợp đồng làm việc"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Ngày tháng vào làm việc
              </span>

              <VueDatePicker
                v-model="pickerWorkingDay"
                :enable-time-picker="false"
                locale="vi"
                :format-locale="vi"
                cancelText="Huỷ"
                selectText="Chọn"
                format="dd-MM-yyyy"
                @update:model-value="updateDates"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Số ngày nghỉ còn lại
              </span>
              <input
                v-model="paramsUser.total_days_off"
                type="text"
                name=""
                id=""
                placeholder="Nhập số ngày nghỉ còn lại"
                class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
              />
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span
                class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
              >
                Trạng thái
              </span>

              <SelectRoot v-model="paramsUser.status">
                <SelectTrigger
                  class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] p-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                  aria-label="Customise options"
                >
                  <SelectValue
                    class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                    placeholder="Chọn loại danh mục"
                  />
                  <Icon icon="radix-icons:chevron-down" class="w-3.5 h-3.5" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent
                    class="SelectContent rounded-lg bg-[#FAFAFA] overflow-hidden will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                    position="popper"
                    :side-offset="5"
                  >
                    <SelectViewport>
                      <SelectGroup>
                        <SelectItem
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                          :value="String(1)"
                        >
                          <SelectItemText>
                            <!-- {{ capitalizeFirstLetter(item) }} -->
                            Đang hoạt động
                          </SelectItemText>
                        </SelectItem>

                        <SelectItem
                          class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
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

        <div
          class="flex flex-wrap items-stretch justify-center gap-4 mt-10 text-center xl:gap-6"
        >
          <button
            @click="() => emit('toggle-modal')"
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
</template>

<script lang="ts" setup>
import Modal from '@/components/Modals.vue'
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import 'flatpickr/dist/flatpickr.css'
import { apiClient } from '@/plugins/axios'
import { useAuth } from 'vue-auth3'

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
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useSystemUser } from '@/composables/system-user'
import { tableMagic } from '@/utils/main'
import { apiUri } from '@/constants/apiUri'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { vi } from 'date-fns/locale/vi'
import { format } from 'date-fns'

const auth = useAuth()

const props = defineProps(['modal'])
const emit = defineEmits(['toggle-modal', 'post-request'])

const pickerDOB = ref<any | null>(null)
const pickerDateissue = ref<any | null>(null)
const pickerWorkingDay = ref<any | null>(null)

const initDates = () => {
  pickerDOB.value = new Date(new Date().setDate(new Date().getDate() + 1))
  pickerDateissue.value = new Date(new Date().setDate(new Date().getDate() + 1))
  pickerWorkingDay.value = new Date(
    new Date().setDate(new Date().getDate() + 1)
  )
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
  status: ''
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
    group_user: yup.string().required('Bạn hãy chọn nhóm người dùng')
  })
)

// Sử dụng useForm hook
const { handleSubmit, errors, values, meta, defineField, resetForm } = useForm({
  validationSchema: schema
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
        Authorization: `Bearer ${auth.token()}`
      }
    })

    const { data } = response.data
    listGrPermiss.value = data
  } catch (error) {
    console.error('Error fetching permission list:', error)
  }
}

const staffType = reactive({
  value: '',
  id: ''
})
const staffData = ref<any | null>(null)
const positionType = reactive({
  value: '',
  id: ''
})
const positionData = ref<any | null>(null)
const regionType = reactive({
  value: '',
  id: ''
})
const regionData = ref<any | null>(null)
const leaderType = reactive({
  value: '',
  id: ''
})
const leaderData = ref<any | null>(null)

const fetchListStaff = async () => {
  try {
    const response = await axios.get(`${apiUri}/categories/list?type=staff`, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
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
    const response = await axios.get(
      `${apiUri}/categories/list?type=position`,
      {
        headers: {
          Authorization: `Bearer ${auth.token()}`
        }
      }
    )

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
        Authorization: `Bearer ${auth.token()}`
      }
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
        Authorization: `Bearer ${auth.token()}`
      }
    })

    const { items } = response.data.data
    leaderData.value = items
    // console.log('🚀 ~ fetchListLeader ~ items:', leaderData.value)
  } catch (error) {
    console.error('Error fetching position list:', error)
  }
}

const params = reactive({
  part_id: '',
  position_id: '',
  per_group_name: '',
  phone: ''
})
const paginate = reactive({
  page: 1,
  per_page: 10
})
const debounceTime = ref<{
  timeOut: number | null
  counter: number
}>({
  timeOut: null,
  counter: 0
})

const fetchDataDocument = () => {
  if (debounceTime.value.timeOut !== null) {
    clearTimeout(debounceTime.value.timeOut)
  }

  debounceTime.value.timeOut = setTimeout(() => {
    const res = {
      ...params,
      page: paginate.page,
      per_page: paginate.per_page
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

const postRequest = ref<any | null>(null)
const onSubmitRegister = handleSubmit(async () => {
  try {
    const formDataUser = new FormData()

    if (paramsUser.code) formDataUser.append('code', paramsUser.code)
    if (paramsUser.phone) formDataUser.append('phone', paramsUser.phone)
    if (paramsUser.name) formDataUser.append('name', paramsUser.name)
    if (paramsUser.email) formDataUser.append('email', paramsUser.email)
    if (paramsUser.dob) formDataUser.append('dob', paramsUser.dob)
    if (paramsUser.per_group_name)
      formDataUser.append('per_group_name', paramsUser.per_group_name)
    if (paramsUser.identification)
      formDataUser.append('identification', paramsUser.identification)
    if (paramsUser.date_of_issue)
      formDataUser.append('date_of_issue', paramsUser.date_of_issue)
    if (paramsUser.place_of_issue)
      formDataUser.append('place_of_issue', paramsUser.place_of_issue)
    if (paramsUser.original_place)
      formDataUser.append('original_place', paramsUser.original_place)
    if (staffType.id) formDataUser.append('part_id', staffType.id)
    if (positionType.id) formDataUser.append('position_id', positionType.id)
    if (regionType.id) formDataUser.append('region_id', regionType.id)
    if (leaderType.id) formDataUser.append('parent_id', leaderType.id)
    if (paramsUser.permanent_address)
      formDataUser.append('permanent_address', paramsUser.permanent_address)
    if (paramsUser.residence_address)
      formDataUser.append('residence_address', paramsUser.residence_address)
    if (paramsUser.work_contract)
      formDataUser.append('work_contract', paramsUser.work_contract)
    if (paramsUser.working_day)
      formDataUser.append('working_day', paramsUser.working_day)
    if (paramsUser.total_days_off)
      formDataUser.append('total_days_off', paramsUser.total_days_off)
    if (paramsUser.status) {
      formDataUser.append('status', paramsUser.status)
    } else {
      formDataUser.append('status', '1')
    }

    const response = await axios.post(`${apiUri}/user/create`, formDataUser, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token()}`
      }
    })
    postRequest.value = response.data
    emit('post-request', postRequest.value)
    Object.keys(paramsUser).map((key) => {
      paramsUser[key] = ''
    })
    fetchDataDocument()
    console.log('🚀 ~ handleSubmit ~ response:', response)
  } catch (error) {
    console.error('Error fetching position list:', error)
  }
})

const { doFetch } = useSystemUser()

watch([email, phone, name, group_user, code], (newVal) => {
  paramsUser.email = newVal[0]
  paramsUser.phone = newVal[1]
  paramsUser.name = newVal[2]
  paramsUser.per_group_name = newVal[3]
  paramsUser.code = newVal[4]
})

onMounted(() => {
  fetchListPermission()
  fetchListStaff()
  fetchListPosition()
  fetchListRegion()
  fetchListLeader()
  initDates()
  updateDates()
})
</script>

<style lang="scss" scoped></style>
