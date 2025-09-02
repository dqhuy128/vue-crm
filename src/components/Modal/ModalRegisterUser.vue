<template>
  <Modal :modal-active="props.modal" max-width="max-w-[865px]" @close="() => emit('toggle-modal')">
    <form class="mx-auto w-full max-w-[864px] rounded-3xl bg-white py-11" @submit.prevent="onSubmitRegister">
      <div class="mb-6 text-center text-[16px] font-bold text-[#464661] uppercase">thêm mới người dùng</div>

      <!-- Thông tin cá nhân -->
      <div class="bg-[#f8fcff] p-5 xl:px-12">
        <div class="mb-3 text-[16px] font-semibold text-[#013878] uppercase">Thông tin cá nhân</div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Họ và tên <span class="text-[#e61b1b]">*</span></label
            >
            <input
              v-model="name"
              v-bind="nameAttrs"
              placeholder="Nhập họ và tên"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
            <span v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</span>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Ngày tháng năm sinh <span class="text-[#e61b1b]">*</span></label
            >
            <VueDatePicker
              v-model="pickerDOB"
              :enable-time="false"
              :format="'dd/MM/yyyy'"
              locale="vi"
              input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Giới tính <span class="text-[#e61b1b]">*</span></label
            >
            <SelectRoot v-model="genderModel">
              <SelectTrigger
                class="font-inter flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Nam"
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
                        value="male"
                      >
                        <SelectItemText>Nam</SelectItemText>
                      </SelectItem>
                      <SelectItem
                        class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                        value="female"
                      >
                        <SelectItemText>Nữ</SelectItemText>
                      </SelectItem>
                      <SelectItem
                        class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                        value="other"
                      >
                        <SelectItemText>Khác</SelectItemText>
                      </SelectItem>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Số điện thoại <span class="text-[#e61b1b]">*</span></label
            >
            <input
              v-model="phone"
              v-bind="phoneAttrs"
              placeholder="Nhập số điện thoại"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
            <span v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</span>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <label class="text-[14px] font-semibold text-[#464661]">Email <span class="text-[#e61b1b]">*</span></label>
            <input
              v-model="email"
              v-bind="emailAttrs"
              placeholder="Nhập Email"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
            <span v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</span>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <label class="text-[14px] font-semibold text-[#464661]">STK NCB</label>
            <input
              v-model="paramsUser.bank_ncb_nunber"
              placeholder="Nhập STK"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-3">
            <label class="text-[14px] font-semibold text-[#464661]">Tình trạng hôn nhân</label>
            <SelectRoot v-model="maritalStatusModel">
              <SelectTrigger
                class="font-inter flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn tình trạng ..."
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
                        value="SINGLE"
                      >
                        <SelectItemText>Độc thân</SelectItemText>
                      </SelectItem>
                      <SelectItem
                        class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                        value="MARRIED"
                      >
                        <SelectItemText>Đã kết hôn</SelectItemText>
                      </SelectItem>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
        </div>
      </div>

      <!-- Thông tin cư trú -->
      <div class="bg-white p-5 xl:px-12">
        <div class="mb-3 text-[16px] font-semibold text-[#013878] uppercase">Thông tin cư trú</div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Số CCCD <span class="text-[#e61b1b]">*</span></label
            >
            <input
              v-model="identification"
              v-bind="identificationAttrs"
              placeholder="Nhập số CCCD"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
            <span v-if="errors.identification" class="mt-1 text-xs text-red-500">{{ errors.identification }}</span>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Ngày cấp</label>
            <VueDatePicker
              v-model="pickerDateissue"
              :enable-time="false"
              :format="'dd/MM/yyyy'"
              locale="vi"
              input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Nơi cấp</label>
            <input
              v-model="paramsUser.place_of_issue"
              placeholder="Nhập nơi cấp"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <label class="text-[14px] font-semibold text-[#464661]">Địa chỉ thường trú</label>
            <input
              v-model="permanent_address"
              placeholder="Nhập địa chỉ thường trú"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
            <!-- <span v-if="errors.permanent_address" class="mt-1 text-xs text-red-500">{{
              errors.permanent_address
            }}</span> -->
          </div>
          <div class="col-span-12 md:col-span-6">
            <label class="text-[14px] font-semibold text-[#464661]">Địa chỉ tạm trú </label>
            <input
              v-model="residence_address"
              placeholder="Nhập địa chỉ tạm trú"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
            <!-- <span v-if="errors.residence_address" class="mt-1 text-xs text-red-500">{{
              errors.residence_address
            }}</span> -->
          </div>
        </div>
      </div>

      <!-- Liên hệ khẩn cấp -->
      <div class="bg-[#f8fcff] p-5 xl:px-12">
        <div class="mb-3 text-[16px] font-semibold text-[#013878] uppercase">Liên hệ khẩn cấp</div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Họ và tên người thân</label>
            <input
              v-model="paramsUser.refer_name"
              placeholder="Nhập họ và tên"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Mối quan hệ</label>
            <input
              v-model="paramsUser.refer_relationship"
              placeholder="Nhập mối quan hệ"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">SĐT người thân</label>
            <input
              v-model="paramsUser.refer_phone"
              placeholder="Nhập số điện thoại"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Thông tin công việc -->
      <div class="bg-white p-5 xl:px-12">
        <div class="mb-3 text-[16px] font-semibold text-[#013878] uppercase">Thông tin công việc</div>

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Ngày tháng vào làm việc</label>
            <VueDatePicker
              v-model="pickerWorkingDay"
              :enable-time="false"
              :format="'dd/MM/yyyy'"
              locale="vi"
              input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Ngày lên chính thức</label>
            <VueDatePicker
              v-model="pickerOfficialDay"
              :enable-time="false"
              :format="'dd/MM/yyyy'"
              locale="vi"
              input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Kiểu nhân viên</label>
            <SelectRoot v-model="employeeTypeModel">
              <SelectTrigger
                class="inline-flex h-[38px] w-full items-center justify-between rounded-lg border border-[#ededf6] px-3"
              >
                <SelectValue placeholder="Chọn kiểu nhân viên" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent
                  class="z-[1000] mt-1 max-h-60 w-[--radix-select-trigger-width] overflow-auto rounded-md border border-[#ededf6] bg-white shadow"
                >
                  <SelectViewport>
                    <SelectGroup>
                      <SelectItem value="probation" class="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        ><SelectItemText>Thử việc</SelectItemText></SelectItem
                      >
                      <SelectItem value="official" class="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        ><SelectItemText>Chính thức</SelectItemText></SelectItem
                      >
                      <SelectItem value="part_time" class="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        ><SelectItemText>Part-time</SelectItemText></SelectItem
                      >
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Mã nhân viên <span class="text-[#e61b1b]">*</span></label
            >
            <input
              v-model="code"
              v-bind="codeAttrs"
              placeholder="Nhập mã nhân viên"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
            <span v-if="errors.code" class="mt-1 text-xs text-red-500">{{ errors.code }}</span>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Mã Pincode</label>
            <input
              v-model="paramsUser.pincode"
              placeholder="Nhập mã Pincode"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Chức vụ</label>
            <SelectRoot v-model="positionType.id">
              <SelectTrigger
                class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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

                      <template v-for="(items, key) in positionData" :key="String(key)">
                        <SelectItem
                          v-for="(item, _) in items"
                          :key="item.id"
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

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Chức danh</label>
            <input
              v-model="paramsUser.title"
              placeholder="Nhập chức danh"
              class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Khối <span class="text-[#e61b1b]">*</span></label>
            <SelectRoot v-model="staff_id">
              <SelectTrigger
                class="font-inter flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn khối"
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
                        value="all"
                      >
                        <SelectItemText> Chọn khối </SelectItemText>
                      </SelectItem>
                      <template v-for="item in departmentTree" :key="item.id">
                        <SelectItem
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(item.id)"
                        >
                          <SelectItemText>{{ item.name }}</SelectItemText>
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
            <span v-if="errors.staff_id" class="mt-1 text-xs text-red-500">{{ errors.staff_id }}</span>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Phòng ban <span class="text-[#e61b1b]">*</span></label
            >
            <SelectRoot v-model="room_id">
              <SelectTrigger
                class="font-inter flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                aria-label="Customise options"
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn phòng ban"
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
                        <SelectItemText> Chọn phòng ban </SelectItemText>
                      </SelectItem>

                      <template v-for="(items, key) in departmentChildrenOptions" :key="String(key)">
                        <SelectItem
                          v-if="items && items.id"
                          :key="items.id"
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(items.id)"
                        >
                          <SelectItemText>{{ items.name }}</SelectItemText>
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
            <span v-if="errors.room_id" class="mt-1 text-xs text-red-500">{{ errors.room_id }}</span>
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Bộ phận</label>
            <SelectRoot v-model="paramsUser.part_id">
              <SelectTrigger
                class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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

                      <template v-for="(items, key) in departmentPartOptions" :key="String(key)">
                        <SelectItem
                          v-if="items && items.id"
                          :key="items.id"
                          class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                          :value="String(items.id)"
                        >
                          <SelectItemText>{{ items.name }}</SelectItemText>
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

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Quản lý trực tiếp</label>
            <SelectRoot v-model="leaderType.id">
              <SelectTrigger
                class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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

                      <template v-for="(items, key) in leaderData" :key="String(key)">
                        <SelectItem
                          v-for="(item, _) in items"
                          :key="item.id"
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

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Văn phòng làm việc <span class="text-[#e61b1b]">*</span></label
            >
            <SelectRoot v-model="regionType.id">
              <SelectTrigger
                class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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

                      <template v-for="(items, index) in regionData" :key="index">
                        <SelectItem
                          v-for="item in items"
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
        </div>
      </div>

      <!-- Nhóm người dùng -->
      <div class="bg-[#f8fcff] p-5 xl:px-12">
        <div class="mb-3 text-[16px] font-semibold text-[#013878] uppercase">Phân quyền</div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span class="required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
                Nhóm người dùng
              </span>

              <SelectRoot v-model="group_user">
                <SelectTrigger
                  class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
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

          <div class="col-span-12 md:col-span-6">
            <div class="h-full text-end">
              <div class="inline-flex h-full flex-col justify-end">
                <button
                  type="button"
                  class="hover:shadow-hoverinset h-[38px] cursor-pointer rounded-lg bg-[#1b4dea] px-4 text-white"
                  @click="handleResetPassword"
                >
                  RESET MẬT KHẨU
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          class="hover:shadow-hoverinset h-[38px] w-[174px] cursor-pointer rounded-lg border border-[#ededf6] text-[16px] font-bold text-[#464661] uppercase transition"
          @click="emit('toggle-modal')"
        >
          HỦY
        </button>
        <button
          type="button"
          class="hover:shadow-hoverinset relative h-[38px] w-[174px] cursor-pointer rounded-lg bg-[#013878] text-[16px] font-bold text-white uppercase transition"
          :disabled="onSubmitting"
          :class="{ 'pointer-events-none opacity-75': onSubmitting }"
          @click="onSubmitRegister"
        >
          <div v-if="onSubmitting" class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Icon icon="eos-icons:three-dots-loading" class="aspect-square h-full w-12" />
          </div>
          <div v-else>Lưu</div>
        </button>
      </div>
    </form>
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
  import { computed, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'
  import * as yup from 'yup'

  import Modal from '@/components/Modals.vue'
  import { apiUri } from '@/constants/apiUri'
  import { ItemUser } from '@/views/SystemAdmin/types'

  const auth = useAuth()

  const props = defineProps<{
    modal: any
    propFunction: Function
  }>()
  const emit = defineEmits(['toggle-modal', 'post-request', 'open-reset-password'])

  const pickerDOB = ref<any | null>(null)
  const pickerDateissue = ref<any | null>(null)
  const pickerWorkingDay = ref<any | null>(null)
  const pickerOfficialDay = ref<any | null>(null)

  const initDates = () => {
    pickerDOB.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerDateissue.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerWorkingDay.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerOfficialDay.value = new Date(new Date().setDate(new Date().getDate() + 1))
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
    if (pickerOfficialDay.value) {
      paramsUser.official_day = format(pickerOfficialDay.value, 'yyyy-MM-dd')
    }
  }

  // Theo dõi thay đổi của các date picker để cập nhật dữ liệu
  watch([pickerDOB, pickerDateissue, pickerWorkingDay, pickerOfficialDay], () => {
    if (auth.check()) {
      updateDates()
    }
  })

  const paramsUser = reactive<Partial<ItemUser>>({
    id: '',
    username: '',
    email: '',
    name: '',
    status: '',
    code: '',
    pincode: '' as string,
    phone: '',
    dob: '',
    gender: '' as string,
    staff_id: '',
    room_id: '',
    part_id: '',
    slogan: '',
    type: '',
    refer_name: '',
    refer_phone: '',
    refer_relationship: '',
    enable_notification: '',
    identification: '',
    place_of_issue: '',
    date_of_issue: '',
    original_place: '',
    parent_id: '',
    position_id: '',
    title: '',
    office_id: '',
    permanent_address: '',
    residence_address: '',
    work_contract: '',
    working_day: '',
    official_day: '',
    mcc_user_id: '',
    bank_ncb_nunber: '',
    marital_status: '' as string,
    created_at: '',
    updated_at: '',
    per_group_name: '',
    status_text: '',
    type_text: '',
    status_married_text: '',
    staff_text: '',
    room_text: '',
    part_text: '',
    position_text: '',
    office_text: '',
    per_text: '',
  })

  // Model bridges to satisfy strict typing for selects
  const genderModel = computed<string>({
    get: () => (paramsUser.gender ?? '') as string,
    set: (v: string) => {
      paramsUser.gender = v as any
    },
  })
  const maritalStatusModel = computed<string>({
    get: () => (paramsUser.marital_status ?? '') as string,
    set: (v: string) => {
      paramsUser.marital_status = v as any
    },
  })
  const employeeTypeModel = computed<string>({
    get: () => (paramsUser.type ?? '') as string,
    set: (v: string) => {
      paramsUser.type = v as any
    },
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
      // Thêm validation cho các trường bắt buộc khác
      staff_id: yup.string().required('Bạn hãy chọn khối'),
      room_id: yup.string().required('Bạn hãy chọn phòng ban'),
      identification: yup.string().required('Bạn hãy nhập số CCCD'),
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
  const [staff_id, staff_idAttrs] = defineField('staff_id')
  const [room_id, room_idAttrs] = defineField('room_id')
  const [identification, identificationAttrs] = defineField('identification')

  // Non-validated fields
  const permanent_address = ref('')
  const residence_address = ref('')

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

  // Department tree for phòng ban
  const departmentTree = ref<any | null>(null)
  // Children (phòng ban) of the selected Khối (staffType.id)
  const departmentChildrenOptions = computed<any[]>(() => {
    const root = departmentTree.value
    if (!root) return []

    // Normalize roots into array
    let roots: any[] = []
    if (Array.isArray(root)) {
      roots = root as any[]
    } else if (root && Array.isArray((root as any).items)) {
      roots = (root as any).items as any[]
    } else if (root && typeof root === 'object') {
      try {
        roots = Object.values(root as Record<string, any[]>).flat()
      } catch (e) {
        roots = []
      }
    }

    const targetId = String(paramsUser.staff_id ?? '')

    // If a khối is selected, find its children
    if (targetId) {
      const node = roots.find((n: any) => String(n.id) === targetId)
      if (node && Array.isArray(node.children)) {
        return node.children.map((c: any) => ({ id: c.id, name: c.name }))
      }
    }

    // Fallback: aggregate all children across all khối
    const aggregated: any[] = []
    for (const n of roots) {
      if (n && Array.isArray(n.children)) {
        for (const c of n.children) {
          aggregated.push({ id: c.id, name: c.name })
        }
      }
    }
    return aggregated
  })

  // Parts (bộ phận) = children of selected Room within selected Khối
  const departmentPartOptions = computed<any[]>(() => {
    const root = departmentTree.value
    if (!root) return []

    // Normalize roots into array
    let roots: any[] = []
    if (Array.isArray(root)) {
      roots = root as any[]
    } else if (root && Array.isArray((root as any).items)) {
      roots = (root as any).items as any[]
    } else if (root && typeof root === 'object') {
      try {
        roots = Object.values(root as Record<string, any[]>).flat()
      } catch (e) {
        roots = []
      }
    }

    const selectedStaffId = String(paramsUser.staff_id ?? '')
    const selectedRoomId = String(paramsUser.room_id ?? '')

    // If both staff and room are selected, drill down to parts
    if (selectedStaffId && selectedRoomId) {
      const staffNode = roots.find((n: any) => String(n.id) === selectedStaffId)
      if (staffNode && Array.isArray(staffNode.children)) {
        const roomNode = staffNode.children.find((c: any) => String(c.id) === selectedRoomId)
        if (roomNode && Array.isArray(roomNode.children)) {
          return roomNode.children.map((p: any) => ({ id: p.id, name: p.name }))
        }
      }
    }

    // Fallback: aggregate all parts under selected staff; or under all roots
    const aggregateFrom = (() => {
      if (selectedStaffId) {
        const staffNode = roots.find((n: any) => String(n.id) === selectedStaffId)
        if (staffNode) return [staffNode]
      }
      return roots
    })()

    const aggregated: any[] = []
    for (const staffNode of aggregateFrom) {
      if (staffNode && Array.isArray(staffNode.children)) {
        for (const room of staffNode.children) {
          if (room && Array.isArray(room.children)) {
            for (const part of room.children) {
              aggregated.push({ id: part.id, name: part.name })
            }
          }
        }
      }
    }
    return aggregated
  })

  const fetchDepartmentTree = async () => {
    try {
      const { data } = await axios.get(`${apiUri}/categories/staff`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      departmentTree.value = data.data
    } catch (error) {
      console.error('Error fetching department tree:', error)
    }
  }

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
      const response = await axios.get(`${apiUri}/categories/list?type=office`, {
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

  const handleResetPassword = () => {
    // Đóng modal hiện tại và mở modal reset password
    emit('toggle-modal')
    emit('open-reset-password')
  }

  const postRequest = ref<any | null>(null)
  const onSubmitting = ref(false)
  const onSubmitRegister = handleSubmit(async () => {
    onSubmitting.value = true
    try {
      const formDataUser = new FormData()

      if (paramsUser.code) formDataUser.append('code', String(paramsUser.code))
      if (paramsUser.phone) formDataUser.append('phone', String(paramsUser.phone))
      if (paramsUser.name) formDataUser.append('name', String(paramsUser.name))
      if (paramsUser.email) formDataUser.append('email', String(paramsUser.email))
      if (paramsUser.dob) formDataUser.append('dob', String(paramsUser.dob))
      if (paramsUser.gender) formDataUser.append('gender', String(paramsUser.gender))
      if (paramsUser.marital_status) formDataUser.append('marital_status', String(paramsUser.marital_status))
      if (paramsUser.bank_ncb_nunber) formDataUser.append('bank_ncb_nunber', String(paramsUser.bank_ncb_nunber))
      if (paramsUser.per_group_name) formDataUser.append('per_group_name', String(paramsUser.per_group_name))
      if (paramsUser.identification) formDataUser.append('identification', String(paramsUser.identification))
      if (paramsUser.date_of_issue) formDataUser.append('date_of_issue', String(paramsUser.date_of_issue))
      if (paramsUser.place_of_issue) formDataUser.append('place_of_issue', String(paramsUser.place_of_issue))
      if (paramsUser.original_place) formDataUser.append('original_place', String(paramsUser.original_place))
      if (staffType.id) formDataUser.append('part_id', staffType.id)
      if (positionType.id) formDataUser.append('position_id', positionType.id)
      if (regionType.id) formDataUser.append('office_id', regionType.id)
      if (leaderType.id) formDataUser.append('parent_id', leaderType.id)
      if (paramsUser.permanent_address) formDataUser.append('permanent_address', String(paramsUser.permanent_address))
      if (paramsUser.residence_address) formDataUser.append('residence_address', String(paramsUser.residence_address))
      if (paramsUser.work_contract) formDataUser.append('work_contract', String(paramsUser.work_contract))
      if (paramsUser.working_day) formDataUser.append('working_day', String(paramsUser.working_day))
      if (paramsUser.official_day) formDataUser.append('official_day', String(paramsUser.official_day))
      if (paramsUser.status) {
        formDataUser.append('status', String(paramsUser.status))
      } else {
        formDataUser.append('status', '1')
      }
      if (paramsUser.mcc_user_id) {
        formDataUser.append('mcc_user_id', String(paramsUser.mcc_user_id))
      }

      // Thêm các trường còn thiếu
      if (paramsUser.staff_id) formDataUser.append('staff_id', String(paramsUser.staff_id))
      if (paramsUser.room_id) formDataUser.append('room_id', String(paramsUser.room_id))
      if (paramsUser.title) formDataUser.append('title', String(paramsUser.title))
      if (paramsUser.pincode) formDataUser.append('pincode', String(paramsUser.pincode))
      if (paramsUser.refer_name) formDataUser.append('refer_name', String(paramsUser.refer_name))
      if (paramsUser.refer_phone) formDataUser.append('refer_phone', String(paramsUser.refer_phone))
      if (paramsUser.refer_relationship)
        formDataUser.append('refer_relationship', String(paramsUser.refer_relationship))
      if (paramsUser.type) formDataUser.append('type', String(paramsUser.type))
      if (paramsUser.part_id) formDataUser.append('part_id', String(paramsUser.part_id))

      // Log FormData contents
      console.log('🚀 ~ FormData contents:')
      for (let [key, value] of formDataUser.entries()) {
        console.log(`${key}: ${value}`)
      }

      const response = await axios.post(`${apiUri}/user/create`, formDataUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      postRequest.value = response.data
      emit('post-request', postRequest.value)
      for (const key in paramsUser) {
        ;(paramsUser as Record<string, any>)[key] = ''
      }
      props.propFunction()
    } catch (error: any) {
      console.error('❌ ~ Error submitting form:', error)
      if (error.response) {
        console.error('❌ ~ Response data:', error.response.data)
        console.error('❌ ~ Response status:', error.response.status)
      }
    } finally {
      onSubmitting.value = false
    }
  })

  watch(
    [email, phone, name, group_user, code, staff_id, room_id, permanent_address, residence_address, identification],
    (newVal) => {
      paramsUser.email = newVal[0]
      paramsUser.phone = newVal[1]
      paramsUser.name = newVal[2]
      paramsUser.per_group_name = newVal[3]
      paramsUser.code = newVal[4]
      paramsUser.staff_id = newVal[5]
      paramsUser.room_id = newVal[6]
      paramsUser.permanent_address = newVal[7]
      paramsUser.residence_address = newVal[8]
      paramsUser.identification = newVal[9]
    }
  )

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
    fetchDepartmentTree()
    initDates()
    updateDates()
    fetchMccData()
  })
</script>

<style lang="scss" scoped></style>
