<template>
  <Modal :modal-active="props.modal" max-width="max-w-[865px]" @close="() => emit('toggle-modal')">
    <form class="mx-auto w-full max-w-[864px] rounded-3xl bg-white py-11" @submit.prevent="onSubmitRegister">
      <div class="mb-6 text-center text-[16px] font-bold text-[#464661] uppercase">cập nhật người dùng</div>

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
              :text-input="true"
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
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Nam"
                />
                <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent
                  class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn tình trạng ..."
                />
                <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent
                  class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
              :text-input="true"
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
            <label class="text-[14px] font-semibold text-[#464661]">Địa chỉ thường trú </label>
            <input
              v-model="permanent_address"
              v-bind="permanent_addressAttrs"
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
              v-bind="residence_addressAttrs"
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
              :text-input="true"
              input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Ngày tháng nghỉ việc</label>
            <VueDatePicker
              v-model="pickerDayOff"
              :enable-time="false"
              :format="'dd/MM/yyyy'"
              locale="vi"
              :text-input="true"
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
              :text-input="true"
              input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
            />
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Kiểu nhân viên</label>
            <SelectRoot v-model="employeeTypeModel">
              <SelectTrigger
                class="font-inter flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                aria-label="Customise options"
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn kiểu nhân viên"
                />
                <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent
                  class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
                  position="popper"
                  :side-offset="5"
                >
                  <SelectViewport>
                    <SelectGroup>
                      <SelectItem
                        v-for="(typeText, typeKey) in workingType"
                        :key="typeKey"
                        class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                        :value="String(typeKey)"
                      >
                        <SelectItemText>{{ typeText }}</SelectItemText>
                      </SelectItem>
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
            <label class="text-[14px] font-semibold text-[#464661]">Tình trạng nhân viên</label>
            <SelectRoot v-model="paramsUser.status">
              <SelectTrigger
                class="font-inter flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                aria-label="Customise options"
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn tình trạng nhân viên"
                />
                <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent
                  class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
                  position="popper"
                  :side-offset="5"
                >
                  <SelectViewport>
                    <SelectGroup>
                      <SelectItem
                        v-for="(statusText, statusKey) in workingStatus"
                        :key="statusKey"
                        class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                        :value="String(statusKey)"
                      >
                        <SelectItemText>{{ statusText }}</SelectItemText>
                      </SelectItem>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]">Chức vụ</label>
            <SelectRoot v-model="positionType.id">
              <SelectTrigger
                class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn chức vụ"
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
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn khối"
                />
                <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent
                  class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
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
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn phòng ban"
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
            <label class="text-[14px] font-semibold text-[#464661]">Bộ phận </label>
            <SelectRoot v-model="paramsUser.part_id">
              <SelectTrigger
                class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn bộ phận"
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
            <SearchableSelect
              v-model="leaderType.id"
              :options="leaderData"
              placeholder="Chọn quản lý"
              search-placeholder="Tìm kiếm quản lý..."
            />
          </div>

          <div class="col-span-12 md:col-span-6 xl:col-span-4">
            <label class="text-[14px] font-semibold text-[#464661]"
              >Văn phòng làm việc <span class="text-[#e61b1b]">*</span></label
            >
            <SelectRoot v-model="regionType.id">
              <SelectTrigger
                class="flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
                aria-label="Customise options"
                @click.stop
              >
                <SelectValue
                  class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                  placeholder="Chọn địa điểm"
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
                  @click.stop
                >
                  <SelectValue
                    class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                    placeholder="Chọn loại danh mục"
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
            <span class="font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]">
              Đặt lại mật khẩu
            </span>
            <div class="relative">
              <input
                v-model="paramsUser.reset_pass_input"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Nhập mật khẩu"
                autocomplete="new-password"
                autocapitalize="off"
                spellcheck="false"
                class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 pr-10 outline-none"
              />
              <button
                type="button"
                class="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
                @click="togglePasswordVisibility"
              >
                <template v-if="showPassword">
                  <img src="@/assets/images/clarity_eye-show-solid.svg" alt="" />
                </template>
                <template v-else>
                  <img src="@/assets/images/clarity_eye-hide-solid.svg" alt="" />
                </template>
              </button>
            </div>
          </div>

          <!-- <div class="col-span-12 md:col-span-6">
            <div class="block">
              <span class="font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]">
                ID máy chấm công
              </span>

              <SimpleSelect
                v-model="mccUserIdModel"
                :options="mccOptions"
                :placeholder="'Chọn ID máy chấm công'"
                :show-default-option="false"
                :show-search="true"
                search-placeholder="Tìm kiếm ID máy chấm công..."
              />
            </div>
          </div> -->

          <!-- <div v-if="paramsUser.reset_pass != '1'" class="col-span-12 md:col-span-6">
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
          </div> -->
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

    <ToastProvider>
      <ToastRoot
        v-model:open="toast.toastResetPass"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="{
          'bg-[#ffd0d0]': dataPostRequestResetPass?.errors?.[Object.keys(dataPostRequestResetPass?.errors || {})[0]],
          'bg-[#c4ffd0]': dataPostRequestResetPass?.status === 1,
        }"
      >
        <ToastTitle class="text-[13px] font-medium">
          {{ dataPostRequestResetPass?.message }}
        </ToastTitle>
        <ToastDescription
          v-if="dataPostRequestResetPass?.errors?.[Object.keys(dataPostRequestResetPass?.errors || {})[0]]"
          class="text-[11px] font-normal"
        >
          {{ dataPostRequestResetPass?.errors[Object.keys(dataPostRequestResetPass?.errors || {})[0]] }}
        </ToastDescription>
      </ToastRoot>
      <ToastViewport
        class="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </ToastProvider>
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
  import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
  import { useForm } from 'vee-validate'
  import { computed, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'
  import * as yup from 'yup'

  import Modal from '@/components/Modals.vue'
  import SearchableSelect from '@/components/SearchableSelect.vue'
  import { apiUri } from '@/constants/apiUri'
  import { ItemUser } from '@/views/SystemAdmin/types'

  const auth = useAuth()

  const props = defineProps<{
    modal: any
    propFunction: Function
    userdata: any
  }>()
  const emit = defineEmits(['toggle-modal', 'post-request-edit'])

  const pickerDOB = ref<any | null>(null)
  const pickerDateissue = ref<any | null>(null)
  const pickerWorkingDay = ref<any | null>(null)
  const pickerOfficialDay = ref<any | null>(null)
  const pickerDayOff = ref<any | null>(null)
  const showPassword = ref(false)

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  const initDates = () => {
    pickerDOB.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerDateissue.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerWorkingDay.value = new Date(new Date().setDate(new Date().getDate() + 1))
    pickerOfficialDay.value = new Date(new Date().setDate(new Date().getDate() + 1))
    // pickerDayOff.value starts as null (no default date)
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
    if (pickerDayOff.value) {
      ;(paramsUser as Record<string, any>).day_off = format(pickerDayOff.value, 'yyyy-MM-dd')
    }
  }

  // Theo dõi thay đổi của các date picker để cập nhật dữ liệu
  watch([pickerDOB, pickerDateissue, pickerWorkingDay, pickerOfficialDay, pickerDayOff], () => {
    if (auth.check()) {
      updateDates()
    }
  })

  const paramsUser = reactive<Partial<ItemUser>>({
    id: '',
    username: '',
    reset_pass: '',
    reset_pass_input: '',
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
      // permanent_address: yup.string().required('Bạn hãy nhập địa chỉ thường trú'),
      // residence_address: yup.string().required('Bạn hãy nhập địa chỉ tạm trú'),
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
  const [permanent_address, permanent_addressAttrs] = defineField('permanent_address')
  const [residence_address, residence_addressAttrs] = defineField('residence_address')
  const [identification, identificationAttrs] = defineField('identification')

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

  const rsStateLoading = ref(false)
  const dataPostRequestResetPass = ref<any | null>(null)
  const toast = reactive({
    toastResetPass: false,
  })

  const fetchUserResetPassword = async () => {
    const formData = new FormData()
    formData.append('id', String(props.userdata[0][0].id))

    try {
      rsStateLoading.value = true
      const response = await axios.post(`${apiUri}/user/resetPass`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })

      if (response.data.status !== 1) return

      dataPostRequestResetPass.value = response.data
      toast.toastResetPass = true
    } catch (error) {
      console.error('Error fetching user reset password:', error)
    } finally {
      rsStateLoading.value = false
    }
  }

  const handleResetPassword = () => {
    fetchUserResetPassword()
  }

  const fetchWorkingStatus = async () => {
    try {
      const {
        data: { status, status_option },
      } = await axios.get(`${apiUri}/user/option`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      if (status !== 1) {
        console.error('Error fetching working status:', status)
        return
      }
      workingStatus.value = status_option
    } catch (error) {
      console.error('Error fetching working status:', error)
    }
  }

  const fetchWorkingType = async () => {
    try {
      const {
        data: { status, type_option },
      } = await axios.get(`${apiUri}/user/option`, {
        headers: {
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      if (status !== 1) {
        console.error('Error fetching working type:', status)
        return
      }
      workingType.value = type_option
    } catch (error) {
      console.error('Error fetching working type:', error)
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
  const workingStatus = ref<any | null>(null)
  const workingType = ref<any | null>(null)

  // Transform mccData for SearchableSelect
  const mccOptions = computed((): any[] => {
    if (!mccData.value || !mccData.id || !Array.isArray(mccData.value) || !Array.isArray(mccData.id)) {
      return []
    }

    return mccData.value.map((itemValue: any, index: number) => ({
      id: String(mccData.id[index]),
      name: itemValue,
    }))
  })

  // MCC user ID model bridge for type safety
  const mccUserIdModel = computed({
    get: () => paramsUser.mcc_user_id || '',
    set: (value: string) => {
      paramsUser.mcc_user_id = value
    },
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
      const response = await axios.get(`${apiUri}/user/usermcc`, {
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

  const postRequest = ref<any | null>(null)
  const onSubmitting = ref(false)
  const onSubmitRegister = handleSubmit(async () => {
    onSubmitting.value = true
    try {
      console.log('🚀 ~ Starting form submission...')
      console.log('🚀 ~ Form values:', {
        email: email.value,
        phone: phone.value,
        name: name.value,
        code: code.value,
        group_user: group_user.value,
      })
      console.log('🚀 ~ Params user:', paramsUser)

      const formDataUser = new FormData()

      formDataUser.append('id', String(props.userdata[0][0].id))
      if (paramsUser.reset_pass_input) formDataUser.append('password', String(paramsUser.reset_pass_input))
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
      if ((paramsUser as Record<string, any>).day_off)
        formDataUser.append('day_off', String((paramsUser as Record<string, any>).day_off))
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

      const response = await axios.post(`${apiUri}/user/update`, formDataUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      postRequest.value = response.data
      emit('post-request-edit', postRequest.value)

      // Clear form after successful update
      for (const key in paramsUser) {
        ;(paramsUser as Record<string, any>)[key] = ''
      }

      props.propFunction()
      console.log('🚀 ~ Form updated successfully:', response)
    } catch (error: any) {
      console.error('❌ ~ Error updating form:', error)
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

  watch(
    () => props.userdata,
    (newVal) => {
      const userData = newVal[0][0]
      console.log('🚀 ~ userData:', userData)

      // Map form fields
      name.value = userData.name || ''
      email.value = userData.email || ''
      phone.value = userData.phone || ''
      group_user.value = userData.per_group_name || ''
      code.value = userData.code || ''
      staff_id.value = userData.staff_id || ''
      room_id.value = userData.room_id || ''
      permanent_address.value = userData.permanent_address || ''
      residence_address.value = userData.residence_address || ''
      identification.value = userData.identification || ''

      // Map to paramsUser object
      paramsUser.name = userData.name || ''
      paramsUser.reset_pass = userData.reset_pass || ''
      paramsUser.email = userData.email || ''
      paramsUser.phone = userData.phone || ''
      paramsUser.per_group_name = userData.per_group_name || ''
      paramsUser.code = userData.code || ''
      paramsUser.staff_id = userData.staff_id || ''
      paramsUser.room_id = userData.room_id || ''
      paramsUser.permanent_address = userData.permanent_address || ''
      paramsUser.residence_address = userData.residence_address || ''
      paramsUser.identification = userData.identification || ''
      paramsUser.title = userData.title || ''
      paramsUser.pincode = userData.pincode || ''
      paramsUser.refer_name = userData.refer_name || ''
      paramsUser.refer_phone = userData.refer_phone || ''
      paramsUser.refer_relationship = userData.refer_relationship || ''
      paramsUser.type = userData.type || ''
      paramsUser.part_id = userData.part_id || ''
      paramsUser.status = userData.status || '1'
      paramsUser.dob = userData.dob || ''
      paramsUser.gender = userData.gender || ''
      paramsUser.marital_status = userData.marital_status || ''
      paramsUser.bank_ncb_nunber = userData.bank_ncb_nunber || ''
      paramsUser.date_of_issue = userData.date_of_issue || ''
      paramsUser.place_of_issue = userData.place_of_issue || ''
      paramsUser.original_place = userData.original_place || ''
      paramsUser.work_contract = userData.work_contract || ''
      paramsUser.working_day = userData.working_day || ''
      paramsUser.official_day = userData.official_day || ''
      paramsUser.mcc_user_id = userData.mcc_user_id || ''
      paramsUser.position_id = userData.position_id || ''
      paramsUser.office_id = userData.office_id || ''
      paramsUser.parent_id = userData.parent_id || ''
      paramsUser.username = userData.username || ''
      paramsUser.slogan = userData.slogan || ''
      paramsUser.enable_notification = userData.enable_notification || ''

      // Map select types
      staffType.id = userData.part_id || ''
      positionType.id = userData.position_id || ''
      regionType.id = userData.office_id || ''
      leaderType.id = userData.parent_id || ''

      // Set MCC user ID
      paramsUser.mcc_user_id = userData.mcc_user_id || 'all'

      // Update date pickers if dates exist
      if (userData.dob) {
        pickerDOB.value = new Date(userData.dob)
      }
      if (userData.date_of_issue) {
        pickerDateissue.value = new Date(userData.date_of_issue)
      }
      if (userData.working_day) {
        pickerWorkingDay.value = new Date(userData.working_day)
      }
      if (userData.official_day) {
        pickerOfficialDay.value = new Date(userData.official_day)
      }
      if (userData.day_off) {
        pickerDayOff.value = new Date(userData.day_off)
      }

      // Update dates in paramsUser after setting pickers
      updateDates()
    }
  )

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
    fetchWorkingStatus()
    fetchWorkingType()
  })
</script>

<style lang="scss" scoped></style>
