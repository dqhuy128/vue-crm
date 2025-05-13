<template>
  <div class="rounded-[24px] p-1.5 bg-white overflow-hidden">
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

    <div class="mt-8 text-center mb-7">
      <h3 class="m-0 text-[#464661] text-[16px] font-bold uppercase">
        cập nhật người dùng
      </h3>
    </div>

    <!-- sform register -->
    <form
      class="w-full mx-auto lg:p-[24px_48px] p-[24px_16px]"
      @submit.prevent="submitUserUpdate"
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
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
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
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
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
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
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
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />
            <div class="mt-1 text-sm text-red-500">{{ errors.email }}</div>
          </div>
        </div>

        <div class="col-span-12 xl:col-span-4 md:col-span-6">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Ngày tháng năm sinh
            </span>

            <VueDatePicker
              v-model="pickerEditDOB"
              :enable-time-picker="false"
              locale="vi"
              :format-locale="vi"
              cancelText="Huỷ"
              selectText="Chọn"
              format="dd/MM/yyyy"
              :max-date="new Date()"
              @update:model-value="updateDatesEdit"
            />

            <!-- <div class="relative">
              <div
                class="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2"
              >
                <img src="@/assets/images/cuidaa_calendar-outline.svg" alt="" />
              </div>
            </div> -->
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
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] px-2.5 py-1.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
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
                          <!-- {{ item.name }} - {{ item.description }} -->
                          {{ item.description }}
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
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              CCCD
            </span>

            <input
              v-model="paramsUserDetail.identification"
              type="text"
              name=""
              id=""
              placeholder="Nhập số CCCD"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />
          </div>
        </div>

        <div class="col-span-12 xl:col-span-3 md:col-span-6">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Ngày cấp
            </span>

            <VueDatePicker
              v-model="pickerEditDateissue"
              :enable-time-picker="false"
              locale="vi"
              :format-locale="vi"
              cancelText="Huỷ"
              selectText="Chọn"
              format="dd/MM/yyyy"
              :max-date="new Date()"
              @update:model-value="updateDatesEdit"
            />

            <!-- <div class="relative">
              <div
                class="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2"
              >
                <img src="@/assets/images/cuidaa_calendar-outline.svg" alt="" />
              </div>
            </div> -->
          </div>
        </div>

        <div class="col-span-12 xl:col-span-3 md:col-span-6">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Nơi cấp
            </span>

            <input
              v-model="paramsUserDetail.place_of_issue"
              type="text"
              name=""
              id=""
              placeholder="Nhập nơi cấp"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />
          </div>
        </div>

        <div class="col-span-12 xl:col-span-3 md:col-span-6">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Quê quán
            </span>

            <input
              v-model="paramsUserDetail.original_place"
              type="text"
              name=""
              id=""
              placeholder="Nhập địa chỉ"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />
          </div>
        </div>

        <div class="col-span-12 xl:col-span-3 md:col-span-6">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Bộ phận
            </span>

            <SelectRoot v-model="staffType.id">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] px-2.5 py-1.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn bộ phận"
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
                        class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                        value="all"
                      >
                        <SelectItemText> Chọn bộ phận </SelectItemText>
                      </SelectItem>

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
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Chức vụ
            </span>

            <SelectRoot v-model="positionType.id">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn chức vụ"
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
                        class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                        value="all"
                      >
                        <SelectItemText> Chọn chức vụ </SelectItemText>
                      </SelectItem>

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
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Địa điểm làm việc
            </span>

            <SelectRoot v-model="regionType.id">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn địa điểm"
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
                        class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                        value="all"
                      >
                        <SelectItemText> Chọn địa điểm </SelectItemText>
                      </SelectItem>

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
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn quản lý"
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
                        class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                        value="all"
                      >
                        <SelectItemText> Chọn quản lý </SelectItemText>
                      </SelectItem>

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
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Địa chỉ thường trú
            </span>

            <input
              v-model="paramsUserDetail.permanent_address"
              type="text"
              name=""
              id=""
              placeholder="Nhập địa chỉ"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />
          </div>
        </div>

        <div class="col-span-12 xl:col-span-6">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-semibold leading-normal mb-3"
            >
              Địa chỉ tạm trú
            </span>

            <input
              v-model="paramsUserDetail.residence_address"
              type="text"
              name=""
              id=""
              placeholder="Nhập địa chỉ tạm trú"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
            >
              Hợp đồng làm việc
            </span>

            <input
              v-model="paramsUserDetail.work_contract"
              type="text"
              name=""
              id=""
              placeholder="Nhập hợp đồng làm việc"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
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
              v-model="pickerEditWorkingDay"
              :enable-time-picker="false"
              locale="vi"
              :format-locale="vi"
              cancelText="Huỷ"
              selectText="Chọn"
              format="dd/MM/yyyy"
              @update:model-value="updateDatesEdit"
            />

            <!-- <div class="relative">
              <div
                class="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2"
              >
                <img src="@/assets/images/cuidaa_calendar-outline.svg" alt="" />
              </div>
            </div> -->
          </div>
        </div>

        <div class="col-span-12 md:col-span-4">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
            >
              Số ngày nghỉ phép năm
            </span>
            <input
              v-model="paramsUserDetail.total_days_off"
              type="text"
              name=""
              id=""
              placeholder="Nhập số ngày nghỉ phép năm"
              class="w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:italic placeholder:text-[#909090] placeholder:opacity-75"
            />
          </div>
        </div>

        <div class="col-span-12 md:col-span-4">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
            >
              ID máy chấm công
            </span>

            <SelectRoot v-model="paramsUserDetail.mcc_user_id">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn ID máy chấm công"
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
                        class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                        value="all"
                      >
                        <SelectItemText> Chọn ID máy chấm công </SelectItemText>
                      </SelectItem>

                      <SelectItem
                        v-for="(itemValue, index) in mccData.value"
                        :key="mccData.id[index]"
                        class="text-[#464661] text-[16px] font-normal leading-normal p-[6px_12px] data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:hover:cursor-pointer"
                        :value="String(mccData.id[index])"
                      >
                        <SelectItemText>
                          {{ mccData.id[index] }} - {{ itemValue }}
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

        <div class="col-span-12 md:col-span-4">
          <div class="block">
            <span
              class="block text-[#464661] font-inter text-[16px] font-bold leading-normal mb-3"
            >
              Trạng thái
            </span>

            <SelectRoot v-model="paramsUserDetail.status">
              <SelectTrigger
                class="flex flex-wrap items-center w-full border border-solid border-[#EDEDF6] bg-white rounded-[8px] py-1.5 px-2.5 focus:outline-none text-[#000] data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="text-ellipsis whitespace-nowrap w-[90%] overflow-hidden grow font-inter text-[16px] max-md:text-[14px] font-normal leading-normal text-start"
                  placeholder="Chọn trạng thái"
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
        <slot />
        <button
          type="submit"
          class="relative max-md:grow inline-block md:min-w-[175px] border border-solid border-main bg-main text-white text-[16px] font-bold leading-normal uppercase text-center p-2 rounded-[8px] cursor-pointer hover:shadow-hoverinset hover:transition transition inset-sha"
          :class="{ 'opacity-75 pointer-events-none': onSubmitting }"
        >
          <div
            class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            v-if="onSubmitting"
          >
            <Icon
              icon="eos-icons:three-dots-loading"
              class="w-12 h-full aspect-square"
            />
          </div>
          <div v-else>Lưu</div>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import Modal from '@/components/Modals.vue'
import { onBeforeMount, onMounted, reactive, ref, watch, nextTick } from 'vue'
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

const props = defineProps<{
  userdata: any
  propFunction: Function
}>()
const emit = defineEmits(['toggle-modal', 'post-request-edit'])

// Sử dụng type any cho date picker để có thể xử lý nhiều loại giá trị
const pickerEditDOB = ref<any>(null)
const pickerEditDateissue = ref<any>(null)
const pickerEditWorkingDay = ref<any>(null)

// Hàm xử lý và cập nhật giá trị ngày tháng cho các fields để tránh lỗi __vnode
const updateDatesEdit = () => {
  try {
    if (!pickerEditDOB.value || String(pickerEditDOB.value) === '0000-00-00') {
      // Nếu giá trị rỗng hoặc không hợp lệ, tạo ngày mới
      pickerEditDOB.value = new Date(
        new Date().setDate(new Date().getDate() + 1)
      )
    } else if (pickerEditDOB.value instanceof Date) {
      // Nếu là đối tượng Date, format theo chuẩn yyyy-MM-dd
      paramsUserDetail.dob = format(pickerEditDOB.value, 'dd/MM/yyyy')
    } else if (typeof pickerEditDOB.value === 'string') {
      // Nếu là chuỗi, sử dụng trực tiếp
      paramsUserDetail.dob = new Date(pickerEditDOB.value).toString()
    }

    if (
      !pickerEditDateissue.value ||
      String(pickerEditDateissue.value) === '0000-00-00'
    ) {
      pickerEditDateissue.value = new Date(
        new Date().setDate(new Date().getDate() + 1)
      )
    } else if (pickerEditDateissue.value instanceof Date) {
      paramsUserDetail.date_of_issue = format(
        pickerEditDateissue.value,
        'yyyy-MM-dd'
      )
    } else if (typeof pickerEditDateissue.value === 'string') {
      paramsUserDetail.date_of_issue = pickerEditDateissue.value
    }

    if (
      !pickerEditWorkingDay.value ||
      String(pickerEditWorkingDay.value) === '0000-00-00'
    ) {
      pickerEditWorkingDay.value = new Date(
        new Date().setDate(new Date().getDate() + 1)
      )
    } else if (pickerEditWorkingDay.value instanceof Date) {
      paramsUserDetail.working_day = format(
        pickerEditWorkingDay.value,
        'yyyy-MM-dd'
      )
    } else if (typeof pickerEditWorkingDay.value === 'string') {
      paramsUserDetail.working_day = pickerEditWorkingDay.value
    }
  } catch (error) {
    console.error('Error updating dates:', error)
  }
}

// Theo dõi thay đổi của các date picker để cập nhật dữ liệu
watch([pickerEditDOB, pickerEditDateissue, pickerEditWorkingDay], () => {
  if (auth.check()) {
    updateDatesEdit()
  }
})

const paramsUserDetail = reactive<any>({
  id: '',
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
  mcc_user_id: ''
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

const mccData = reactive<any>({
  value: '',
  id: ''
})
const fetchMccData = async () => {
  try {
    const response = await axios.get(`${apiUri}/work/usermcc`, {
      headers: {
        Authorization: `Bearer ${auth.token()}`
      }
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
        Authorization: `Bearer ${auth.token()}`
      }
    })

    staffData.value = response.data.data.items
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

    positionData.value = response.data.data.items
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

    regionData.value = response.data.data.items
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

    leaderData.value = response.data.data.items
    // console.log('🚀 ~ fetchListLeader ~ items:', leaderData.value)
  } catch (error) {
    console.error('Error fetching position list:', error)
  }
}

const errorMsg = ref<any | null>(null)
const postRequestEdit = ref<any | null>(null)
const onSubmitting = ref(false)
const submitUserUpdate = handleSubmit(async () => {
  onSubmitting.value = true
  try {
    const formDataUser = new FormData()

    if (paramsUserDetail.id) formDataUser.append('id', paramsUserDetail.id)
    if (paramsUserDetail.code)
      formDataUser.append('code', paramsUserDetail.code)
    if (paramsUserDetail.phone)
      formDataUser.append('phone', paramsUserDetail.phone)
    if (paramsUserDetail.name)
      formDataUser.append('name', paramsUserDetail.name)
    if (paramsUserDetail.email)
      formDataUser.append('email', paramsUserDetail.email)
    if (paramsUserDetail.dob) formDataUser.append('dob', paramsUserDetail.dob)
    if (paramsUserDetail.per_group_name)
      formDataUser.append('per_group_name', paramsUserDetail.per_group_name)
    if (paramsUserDetail.identification)
      formDataUser.append('identification', paramsUserDetail.identification)
    if (paramsUserDetail.date_of_issue)
      formDataUser.append('date_of_issue', paramsUserDetail.date_of_issue)
    if (paramsUserDetail.place_of_issue)
      formDataUser.append('place_of_issue', paramsUserDetail.place_of_issue)
    if (paramsUserDetail.original_place)
      formDataUser.append('original_place', paramsUserDetail.original_place)
    if (staffType.id) formDataUser.append('part_id', staffType.id)
    if (positionType.id) formDataUser.append('position_id', positionType.id)
    if (regionType.id) formDataUser.append('region_id', regionType.id)
    if (leaderType.id) formDataUser.append('parent_id', leaderType.id)
    if (paramsUserDetail.permanent_address)
      formDataUser.append(
        'permanent_address',
        paramsUserDetail.permanent_address
      )
    if (paramsUserDetail.residence_address)
      formDataUser.append(
        'residence_address',
        paramsUserDetail.residence_address
      )
    if (paramsUserDetail.work_contract)
      formDataUser.append('work_contract', paramsUserDetail.work_contract)
    if (paramsUserDetail.working_day)
      formDataUser.append('working_day', paramsUserDetail.working_day)
    if (paramsUserDetail.total_days_off)
      formDataUser.append('total_days_off', paramsUserDetail.total_days_off)
    if (paramsUserDetail.status) {
      formDataUser.append('status', paramsUserDetail.status)
    } else {
      formDataUser.append('status', '1')
    }
    if (paramsUserDetail.mcc_user_id) {
      formDataUser.append('mcc_user_id', paramsUserDetail.mcc_user_id)
    }

    const response = await axios.post(`${apiUri}/user/update`, formDataUser, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token()}`
      }
    })

    if (response.data.errors || response.data.status == 0) {
      errorMsg.value = response.data.errors + '. ' + response.data.message
    }

    postRequestEdit.value = response.data
    emit('post-request-edit', postRequestEdit.value)
    props.propFunction()
    console.log('🚀 ~ handleSubmit ~ response:', response)
  } catch (error) {
    console.error('Error fetching position list:', error)
  } finally {
    onSubmitting.value = false
  }
})

watch([email, phone, name, group_user, code], (newVal) => {
  paramsUserDetail.email = newVal[0]
  paramsUserDetail.phone = newVal[1]
  paramsUserDetail.name = newVal[2]
  paramsUserDetail.per_group_name = newVal[3]
  paramsUserDetail.code = newVal[4]
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

watch(
  () => props.userdata,
  (newVal) => {
    if (newVal[0][0].email) {
      email.value = newVal[0][0].email
    }
    if (newVal[0][0].phone) {
      phone.value = newVal[0][0].phone
    }
    if (newVal[0][0].name) {
      name.value = newVal[0][0].name
    }
    if (newVal[0][0].code) {
      code.value = newVal[0][0].code
    }
    if (newVal[0][0].per_group_name) {
      group_user.value = newVal[0][0].per_group_name
    }
    if (newVal[0][0].id) {
      paramsUserDetail.id = newVal[0][0].id
    }
    if (newVal[0][0].dob) {
      const [day, month, year] = newVal[0][0].dob.split('/')
      pickerEditDOB.value = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      )
      paramsUserDetail.dob = newVal[0][0].dob
    }
    if (newVal[0][0].identification) {
      paramsUserDetail.identification = newVal[0][0].identification
    }
    if (newVal[0][0].place_of_issue) {
      paramsUserDetail.place_of_issue = newVal[0][0].place_of_issue
    }
    if (newVal[0][0].original_place) {
      paramsUserDetail.original_place = newVal[0][0].original_place
    }
    if (newVal[0][0].per_group_name) {
      paramsUserDetail.per_group_name = newVal[0][0].per_group_name
    }
    if (newVal[0][0].identification) {
      paramsUserDetail.identification = newVal[0][0].identification
    }
    if (newVal[0][0].date_of_issue) {
      paramsUserDetail.date_of_issue = newVal[0][0].date_of_issue
      pickerEditDateissue.value = newVal[0][0].date_of_issue
    }
    if (newVal[0][0].original_place) {
      paramsUserDetail.original_place = newVal[0][0].original_place
    }
    if (newVal[0][0].part_id) {
      paramsUserDetail.part_id = newVal[0][0].part_id
    }
    if (newVal[0][0].position_id) {
      paramsUserDetail.position_id = newVal[0][0].position_id
    }
    if (newVal[0][0].region_id) {
      paramsUserDetail.region_id = newVal[0][0].region_id
    }
    if (newVal[0][0].permanent_address) {
      paramsUserDetail.permanent_address = newVal[0][0].permanent_address
    }
    if (newVal[0][0].residence_address) {
      paramsUserDetail.residence_address = newVal[0][0].residence_address
    }
    if (newVal[0][0].work_contract) {
      paramsUserDetail.work_contract = newVal[0][0].work_contract
    }
    if (newVal[0][0].working_day) {
      paramsUserDetail.working_day = newVal[0][0].working_day
      pickerEditWorkingDay.value = newVal[0][0].working_day
    }
    if (newVal[0][0].total_days_off) {
      paramsUserDetail.total_days_off = newVal[0][0].total_days_off
    }
    if (newVal[0][0].status) {
      paramsUserDetail.status = newVal[0][0].status
    }
    if (newVal[0][0].part_text) {
      paramsUserDetail.part_text = newVal[0][0].part_text
    }
    if (newVal[0][0].region_text) {
      paramsUserDetail.region_text = newVal[0][0].region_text
    }
    if (newVal[0][0].region_id) {
      regionType.id = newVal[0][0].region_id
    }
    if (newVal[0][0].position_id) {
      positionType.id = newVal[0][0].position_id
    }
    if (newVal[0][0].part_id) {
      staffType.id = newVal[0][0].part_id
    }
    if (newVal[0][0].mcc_user_id) {
      paramsUserDetail.mcc_user_id = newVal[0][0].mcc_user_id
    } else {
      paramsUserDetail.mcc_user_id = 'all'
    }
  }
)

onMounted(() => {
  fetchListPermission()
  fetchListStaff()
  fetchListPosition()
  fetchListRegion()
  fetchListLeader()
  fetchMccData()
  // Đảm bảo cập nhật ngày tháng sau khi component đã được render đầy đủ
  // Sử dụng nextTick để đảm bảo DOM đã cập nhật trước khi làm việc với các ref
  nextTick(() => {
    if (auth.check()) {
      updateDatesEdit()
    }
  })
})
</script>

<style lang="scss" scoped></style>
