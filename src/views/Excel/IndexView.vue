<template>
  <MainLayout>
    <Breadcrums name="Chỉnh sửa dữ liệu Excel" path="/excel/import" />

    <!-- Header với thông tin file -->
    <div class="mb-6 rounded-[24px] bg-white p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-[20px] font-bold text-[#464661]">Chỉnh sửa dữ liệu Excel</h1>
          <div class="mt-2 flex flex-wrap items-center gap-4 text-[14px] text-[#909090]">
            <span v-if="fileInfo.name"> <strong>File:</strong> {{ fileInfo.name }} </span>
            <span v-if="fileInfo.size"> <strong>Kích thước:</strong> {{ formatFileSize(fileInfo.size) }} </span>
            <span v-if="excelData.length > 0"> <strong>Số bản ghi:</strong> {{ excelData.length }} </span>
          </div>

          <!-- Debug: Show Excel column mapping -->
          <div v-if="excelHeaders.length > 0" class="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div class="mb-2 text-[14px] font-semibold text-blue-800">🔍 Mapping cột Excel:</div>
            <div class="grid grid-cols-2 gap-2 text-[12px] text-blue-700 md:grid-cols-3">
              <div v-for="header in excelHeaders.slice(0, 10)" :key="header" class="truncate">
                <span class="font-medium">{{ header }}</span>
              </div>
              <div v-if="excelHeaders.length > 10" class="text-blue-600">
                ... và {{ excelHeaders.length - 10 }} cột khác
              </div>
            </div>

            <!-- Column Detection Results -->
            <div v-if="excelData.length > 0" class="mt-3 rounded-lg border border-green-200 bg-green-50 p-2">
              <div class="mb-2 text-[13px] font-semibold text-green-800">🎯 Kết quả phát hiện cột:</div>
              <div class="grid grid-cols-1 gap-1 text-[11px] text-green-700 md:grid-cols-3">
                <div class="flex items-center gap-1">
                  <span class="font-medium">Họ và tên:</span>
                  <span class="rounded bg-white px-1 text-[10px]">{{
                    getDetectedColumn('name') || 'Không tìm thấy'
                  }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="font-medium">Email:</span>
                  <span class="rounded bg-white px-1 text-[10px]">{{
                    getDetectedColumn('email') || 'Không tìm thấy'
                  }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="font-medium">Mã NV:</span>
                  <span class="rounded bg-white px-1 text-[10px]">{{
                    getDetectedColumn('code') || 'Không tìm thấy'
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mapping Status -->
          <div
            v-if="excelData.length > 0 && excelHeaders.length > 0"
            class="mt-3 rounded-lg border border-green-200 bg-green-50 p-3"
          >
            <div class="mb-2 text-[14px] font-semibold text-green-800">✅ Trạng thái mapping:</div>
            <div class="grid grid-cols-2 gap-2 text-[12px] text-green-700 md:grid-cols-4">
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Mã NV: {{ getMappingStatus('code') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Họ tên: {{ getMappingStatus('name') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Email: {{ getMappingStatus('email') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span>SĐT: {{ getMappingStatus('phone') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span
                  :class="[
                    'h-2 w-2 rounded-full',
                    getMappingStatusColor('identification') === 'green' ? 'bg-green-500' : 'bg-red-500',
                  ]"
                ></span>
                <span>CCCD: {{ getMappingStatus('identification') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span
                  :class="[
                    'h-2 w-2 rounded-full',
                    getMappingStatusColor('permanent_address') === 'green' ? 'bg-green-500' : 'bg-red-500',
                  ]"
                ></span>
                <span>Địa chỉ: {{ getMappingStatus('permanent_address') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span
                  :class="[
                    'h-2 w-2 rounded-full',
                    getMappingStatusColor('staff_id') === 'green' ? 'bg-green-500' : 'bg-red-500',
                  ]"
                ></span>
                <span>Khối: {{ getMappingStatus('staff_id') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span
                  :class="[
                    'h-2 w-2 rounded-full',
                    getMappingStatusColor('office_id') === 'green' ? 'bg-green-500' : 'bg-red-500',
                  ]"
                ></span>
                <span>Văn phòng: {{ getMappingStatus('office_id') }}</span>
              </div>
            </div>
          </div>

          <!-- Validation Summary -->
          <div
            v-if="validationSummary.totalRows > 0"
            class="mt-3 rounded-lg border p-3"
            :class="hasValidationErrors ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'"
          >
            <div
              class="mb-2 text-[14px] font-semibold"
              :class="hasValidationErrors ? 'text-red-800' : 'text-green-800'"
            >
              📊 Tóm tắt kiểm tra dữ liệu:
            </div>
            <div class="grid grid-cols-2 gap-2 text-[12px] md:grid-cols-5">
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>Tổng: {{ validationSummary.totalRows }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Hợp lệ: {{ validationSummary.validRows }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-red-500"></span>
                <span>Lỗi: {{ validationSummary.errorRows }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-orange-500"></span>
                <span>Lỗi nghiêm trọng: {{ validationSummary.criticalErrors }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                <span>Cảnh báo: {{ validationSummary.warnings }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            type="button"
            class="rounded-lg border border-[#EDEDF6] px-4 py-2 text-[14px] font-medium text-[#464661] transition-colors hover:bg-gray-50"
            @click="$router.back()"
          >
            Quay lại
          </button>
          <button
            type="button"
            class="rounded-lg border border-[#FF6B35] px-4 py-2 text-[14px] font-medium text-[#FF6B35] transition-colors hover:bg-orange-50"
            :disabled="excelData.length === 0"
            @click="fillDataFromExcel"
          >
            📝 Điền dữ liệu
          </button>
          <button
            type="button"
            class="rounded-lg border border-[#28a745] px-4 py-2 text-[14px] font-medium text-[#28a745] transition-colors hover:bg-green-50"
            :disabled="excelData.length === 0"
            @click="compareAllRowsWithExisting"
          >
            🔍 So sánh dữ liệu
          </button>
          <button
            type="button"
            class="rounded-lg border border-[#ff9500] px-4 py-2 text-[14px] font-medium text-[#ff9500] transition-colors hover:bg-orange-50"
            :disabled="excelData.length === 0"
            @click="validateAllData"
          >
            🔍 Kiểm tra dữ liệu
          </button>
          <button
            type="button"
            class="rounded-lg border border-purple-500 px-4 py-2 text-[14px] font-medium text-purple-500 transition-colors hover:bg-purple-50"
            :disabled="excelData.length === 0"
            @click="debugColumnMapping"
          >
            🐛 Debug Mapping
          </button>
          <button
            type="button"
            class="rounded-lg bg-[#1b4dea] px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#0f3bb6] disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="saving || excelData.length === 0 || hasValidationErrors"
            @click="handleSaveAll"
          >
            <span v-if="saving">Đang lưu...</span>
            <span v-else>Import dữ liệu</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Progress bar khi lưu -->
    <div v-if="saving" class="mb-6 rounded-[24px] bg-white p-6">
      <div class="mb-3 text-[16px] font-semibold text-[#464661]">Đang lưu dữ liệu...</div>
      <div class="h-2.5 w-full rounded-full bg-gray-200">
        <div
          class="h-2.5 rounded-full bg-[#1b4dea] transition-all duration-300"
          :style="{ width: saveProgress + '%' }"
        ></div>
      </div>
      <div class="mt-2 text-[14px] text-[#909090]">
        {{ saveProgress }}% hoàn thành ({{ savedCount }}/{{ excelData.length }})
      </div>
    </div>

    <!-- Table với horizontal scroll -->
    <div class="rounded-[24px] bg-white p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <!-- Table Header -->
          <thead>
            <tr class="border-b border-[#EDEDF6] bg-[#f8fcff]">
              <th
                class="sticky left-0 z-10 min-w-[60px] border-r border-[#EDEDF6] bg-[#f8fcff] px-4 py-3 text-left text-[14px] font-bold text-[#464661]"
              >
                STT
              </th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Mã NV *</th>
              <th class="min-w-[200px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Họ và tên *</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Email *</th>
              <th class="min-w-[120px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">SĐT *</th>
              <th class="min-w-[120px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Ngày sinh</th>
              <th class="min-w-[100px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Giới tính</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">CCCD</th>
              <th class="min-w-[120px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Ngày cấp</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Nơi cấp</th>
              <th class="min-w-[200px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Địa chỉ thường trú</th>
              <th class="min-w-[200px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Địa chỉ tạm trú</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Khối *</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Phòng ban *</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Chức vụ</th>
              <th class="min-w-[120px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Ngày vào làm</th>
              <th class="min-w-[120px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Ngày chính thức</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Quản lý trực tiếp</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Văn phòng *</th>
              <th class="min-w-[150px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Nhóm người dùng *</th>
              <th class="min-w-[100px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Trạng thái</th>
              <th class="min-w-[200px] px-4 py-3 text-left text-[14px] font-bold text-[#464661]">Trạng thái so sánh</th>
              <th
                class="sticky right-0 z-10 min-w-[100px] bg-[#f8fcff] px-4 py-3 text-center text-[14px] font-bold text-[#464661]"
              >
                Thao tác
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr
              v-for="(row, rowIndex) in excelData"
              :key="`row-${rowIndex}`"
              class="border-b border-[#EDEDF6] hover:bg-gray-50"
              :class="{ 'bg-red-50': row.hasError }"
            >
              <!-- STT -->
              <td
                class="sticky left-0 z-10 border-r border-[#EDEDF6] bg-white px-4 py-3 text-[14px] font-medium text-[#464661]"
              >
                {{ rowIndex + 1 }}
              </td>

              <!-- Mã NV -->
              <td class="px-4 py-3">
                <input
                  v-model="row.code"
                  v-bind="row.codeAttrs"
                  placeholder="Nhập mã nhân viên"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
                <span v-if="row.errors?.code" class="mt-1 text-xs text-red-500">{{ row.errors.code }}</span>
              </td>

              <!-- Họ và tên -->
              <td class="px-4 py-3">
                <input
                  v-model="row.name"
                  v-bind="row.nameAttrs"
                  placeholder="Nhập họ và tên"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
                <span v-if="row.errors?.name" class="mt-1 text-xs text-red-500">{{ row.errors.name }}</span>
              </td>

              <!-- Email -->
              <td class="px-4 py-3">
                <input
                  v-model="row.email"
                  v-bind="row.emailAttrs"
                  placeholder="Nhập Email"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
                <span v-if="row.errors?.email" class="mt-1 text-xs text-red-500">{{ row.errors.email }}</span>
              </td>

              <!-- SĐT -->
              <td class="px-4 py-3">
                <input
                  v-model="row.phone"
                  v-bind="row.phoneAttrs"
                  placeholder="Nhập số điện thoại"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
                <span v-if="row.errors?.phone" class="mt-1 text-xs text-red-500">{{ row.errors.phone }}</span>
              </td>

              <!-- Ngày sinh -->
              <td class="px-4 py-3">
                <VueDatePicker
                  v-model="row.dob"
                  :enable-time="false"
                  :format="'dd/MM/yyyy'"
                  locale="vi"
                  input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
                />
              </td>

              <!-- Giới tính -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.gender as string">
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
                            <SelectItemText value="Nam">Nam</SelectItemText>
                          </SelectItem>
                          <SelectItem
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            value="female"
                          >
                            <SelectItemText value="Nữ">Nữ</SelectItemText>
                          </SelectItem>
                          <SelectItem
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            value="other"
                          >
                            <SelectItemText value="Khác">Khác</SelectItemText>
                          </SelectItem>
                        </SelectGroup>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </SelectRoot>
              </td>

              <!-- CCCD -->
              <td class="px-4 py-3">
                <input
                  v-model="row.identification"
                  v-bind="row.identificationAttrs"
                  placeholder="Nhập số CCCD"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
                <span v-if="row.errors?.identification" class="mt-1 text-xs text-red-500">{{
                  row.errors.identification
                }}</span>
              </td>

              <!-- Ngày cấp -->
              <td class="px-4 py-3">
                <VueDatePicker
                  v-model="row.date_of_issue"
                  :enable-time="false"
                  :format="'dd/MM/yyyy'"
                  locale="vi"
                  input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
                />
              </td>

              <!-- Nơi cấp -->
              <td class="px-4 py-3">
                <input
                  v-model="row.place_of_issue"
                  placeholder="Nhập nơi cấp"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
              </td>

              <!-- Địa chỉ thường trú -->
              <td class="px-4 py-3">
                <input
                  v-model="row.permanent_address"
                  v-bind="row.permanent_addressAttrs"
                  placeholder="Nhập địa chỉ thường trú"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
              </td>

              <!-- Địa chỉ tạm trú -->
              <td class="px-4 py-3">
                <input
                  v-model="row.residence_address"
                  v-bind="row.residence_addressAttrs"
                  placeholder="Nhập địa chỉ tạm trú"
                  class="h-[38px] w-full rounded-lg border border-[#ededf6] bg-white px-3 outline-none"
                />
              </td>

              <!-- Khối -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.staff_id">
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
                            <SelectItemText value="Chọn khối"> Chọn khối </SelectItemText>
                          </SelectItem>
                          <template v-for="item in departmentTree" :key="item.id">
                            <SelectItem
                              class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                              :value="String(item.id)"
                            >
                              <SelectItemText :value="item.name">{{ item.name }}</SelectItemText>
                            </SelectItem>
                          </template>
                        </SelectGroup>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </SelectRoot>
                <span v-if="row.errors?.staff_id" class="mt-1 text-xs text-red-500">{{ row.errors.staff_id }}</span>
              </td>

              <!-- Phòng ban -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.room_id">
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
                            <SelectItemText value="Chọn phòng ban"> Chọn phòng ban </SelectItemText>
                          </SelectItem>

                          <SelectItem
                            v-for="(item, itemIndex) in getRoomOptions(row.staff_id).filter(
                              (opt: any) => opt && opt.id
                            )"
                            :key="`room-${itemIndex}`"
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.id)"
                          >
                            <SelectItemText>{{ item.name }}</SelectItemText>
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
                <span v-if="row.errors?.room_id" class="mt-1 text-xs text-red-500">{{ row.errors.room_id }}</span>
              </td>

              <!-- Chức vụ -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.position_id">
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
                            <SelectItemText value="Chọn chức vụ"> Chọn chức vụ </SelectItemText>
                          </SelectItem>

                          <template
                            v-for="(category, categoryIndex) in positionData"
                            :key="`position-cat-${categoryIndex}`"
                          >
                            <SelectItem
                              v-for="item in category"
                              :key="`position-item-${item.id}`"
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
              </td>

              <!-- Ngày vào làm -->
              <td class="px-4 py-3">
                <VueDatePicker
                  v-model="row.working_day"
                  :enable-time="false"
                  :format="'dd/MM/yyyy'"
                  locale="vi"
                  input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
                />
              </td>

              <!-- Ngày chính thức -->
              <td class="px-4 py-3">
                <VueDatePicker
                  v-model="row.official_day"
                  :enable-time="false"
                  :format="'dd/MM/yyyy'"
                  locale="vi"
                  input-class-name="h-[38px] w-full rounded-lg border border-[#ededf6] px-3 focus:outline-none bg-white"
                />
              </td>

              <!-- Quản lý trực tiếp -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.parent_id">
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
                            <SelectItemText value="Chọn quản lý"> Chọn quản lý </SelectItemText>
                          </SelectItem>

                          <template
                            v-for="(category, categoryIndex) in leaderData"
                            :key="`leader-cat-${categoryIndex}`"
                          >
                            <SelectItem
                              v-for="item in category"
                              :key="`leader-item-${item.id}`"
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
              </td>

              <!-- Văn phòng -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.office_id">
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
                            <SelectItemText value="Chọn địa điểm"> Chọn địa điểm </SelectItemText>
                          </SelectItem>

                          <template v-for="(offices, officesIndex) in regionData" :key="`office-cat-${officesIndex}`">
                            <SelectItem
                              v-for="item in offices"
                              :key="`office-item-${item.id}`"
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
              </td>

              <!-- Nhóm người dùng -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.per_group_name">
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
                            v-for="(item, itemIndex) in listGrPermiss"
                            :key="`permission-${itemIndex}`"
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            :value="String(item.name)"
                          >
                            <SelectItemText :value="item.description">
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
                  {{ row.errors?.per_group_name }}
                </div>
              </td>

              <!-- Trạng thái -->
              <td class="px-4 py-3">
                <SelectRoot v-model="row.status">
                  <SelectTrigger
                    class="font-inter flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[16px] leading-normal font-normal text-[#000] data-[placeholder]:text-[#909090] max-md:text-[14px]"
                    aria-label="Customise options"
                  >
                    <SelectValue
                      class="font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
                      placeholder="Hoạt động"
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
                            value="1"
                          >
                            <SelectItemText value="Hoạt động">Hoạt động</SelectItemText>
                          </SelectItem>
                          <SelectItem
                            class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                            value="2"
                          >
                            <SelectItemText value="Không hoạt động">Không hoạt động</SelectItemText>
                          </SelectItem>
                        </SelectGroup>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </SelectRoot>
              </td>

              <!-- Trạng thái so sánh -->
              <td class="px-4 py-3">
                <div v-if="row.comparisonResult" class="text-[12px]">
                  <div class="mb-1 flex items-center gap-1">
                    <span
                      :class="[
                        'inline-block h-2 w-2 rounded-full',
                        row.comparisonResult.matchType === 'exact'
                          ? 'bg-green-500'
                          : row.comparisonResult.matchType === 'partial'
                            ? 'bg-yellow-500'
                            : row.comparisonResult.matchType === 'duplicate'
                              ? 'bg-red-500'
                              : 'bg-gray-500',
                      ]"
                    ></span>
                    <span class="font-medium">
                      {{
                        row.comparisonResult.matchType === 'exact'
                          ? 'Khớp chính xác'
                          : row.comparisonResult.matchType === 'partial'
                            ? 'Khớp một phần'
                            : row.comparisonResult.matchType === 'duplicate'
                              ? 'Trùng lặp'
                              : 'Mới'
                      }}
                    </span>
                  </div>
                  <div class="text-gray-600">
                    <div v-if="row.comparisonResult.importAction === 'update'">🔄 Cập nhật</div>
                    <div v-else-if="row.comparisonResult.importAction === 'create'">➕ Tạo mới</div>
                    <div v-else>⏭️ Bỏ qua</div>
                  </div>
                  <div v-if="row.comparisonResult.duplicateFields?.length > 0" class="mt-1 text-[10px] text-red-600">
                    Trùng: {{ row.comparisonResult.duplicateFields.join(', ') }}
                  </div>
                  <div v-if="!row.comparisonResult.canImport" class="mt-1 text-[10px] text-red-600">
                    {{ row.comparisonResult.reasons?.join(', ') }}
                  </div>
                  <div v-if="row.importStatus === 'success'" class="mt-1 text-[10px] text-green-600">
                    ✅ Đã import thành công
                  </div>
                  <div v-if="row.importStatus === 'error'" class="mt-1 text-[10px] text-red-600">❌ Lỗi import</div>
                </div>
                <div v-else class="text-[12px] text-gray-400">Chưa so sánh</div>
              </td>

              <!-- Thao tác -->
              <td class="sticky right-0 z-10 bg-white px-4 py-3 text-center">
                <div class="flex justify-center gap-2">
                  <button
                    type="button"
                    class="rounded px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
                    @click="validateRow(rowIndex)"
                  >
                    Kiểm tra
                  </button>
                  <button
                    type="button"
                    class="rounded px-3 py-1 text-xs text-red-600 hover:bg-red-50"
                    @click="removeRow(rowIndex)"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="excelData.length > 0" class="mt-6 flex items-center justify-between">
        <div class="text-[14px] text-[#909090]">
          Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }} -
          {{ Math.min(currentPage * itemsPerPage, excelData.length) }} của {{ excelData.length }} bản ghi
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded border border-[#EDEDF6] px-3 py-1 text-[14px] hover:bg-gray-50 disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Trước
          </button>

          <span class="px-3 py-1 text-[14px]">{{ currentPage }} / {{ totalPages }}</span>

          <button
            type="button"
            class="rounded border border-[#EDEDF6] px-3 py-1 text-[14px] hover:bg-gray-50 disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Sau
          </button>
        </div>
      </div>
    </div>

    <!-- Toast notifications -->
    <ToastProvider>
      <ToastRoot
        v-model:open="toast.open"
        :duration="5000"
        class="flex flex-col gap-1.5 rounded-md p-3 shadow-2xl"
        :class="toast.type === 'success' ? 'bg-[#c4ffd0]' : 'bg-[#ffd0d0]'"
      >
        <ToastTitle class="text-[13px] font-medium">{{ toast.title }}</ToastTitle>
        <ToastDescription class="text-[11px] font-normal">{{ toast.description }}</ToastDescription>
      </ToastRoot>
      <ToastViewport
        class="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </ToastProvider>
  </MainLayout>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import axios from 'axios'
  import { format } from 'date-fns'
  import {
    SelectContent,
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
  import { computed, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'
  import { useRouter } from 'vue-router'

  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import { apiUri } from '@/constants/apiUri'
  import MainLayout from '@/views/MainLayout.vue'
  import { ItemUser } from '@/views/SystemAdmin/types'

  interface ExcelRow extends ItemUser {
    hasError?: boolean
    errors?: { [key: string]: string }
    codeAttrs?: any
    nameAttrs?: any
    emailAttrs?: any
    phoneAttrs?: any
    identificationAttrs?: any
    permanent_addressAttrs?: any
    residence_addressAttrs?: any
    comparisonResult?: any
    importStatus?: 'success' | 'error' | 'pending'
  }

  const router = useRouter()
  const auth = useAuth()

  // Props from route
  const fileInfo = ref({
    name: '',
    size: 0,
  })

  const excelData = ref<ExcelRow[]>([])
  const excelHeaders = ref<string[]>([])
  const saving = ref(false)
  const saveProgress = ref(0)
  const savedCount = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const hasValidationErrors = ref(false)
  const validationSummary = ref({
    totalRows: 0,
    validRows: 0,
    errorRows: 0,
    criticalErrors: 0,
    warnings: 0,
  })

  // Toast state
  const toast = reactive({
    open: false,
    title: '',
    description: '',
    type: 'success', // 'success' or 'error'
  })

  // Data sources
  const listGrPermiss = ref<any[]>([])
  const departmentTree = ref<any[]>([])
  const positionData = ref<any[]>([])
  const regionData = ref<any[]>([])
  const leaderData = ref<any[]>([])
  const existingUsers = ref<any[]>([])
  const originalExcelData = ref<any[]>([]) // Store original Excel data

  // Validation will be handled per row instead of global schema

  // We handle validation per row instead of global form
  // Form attrs are handled by individual row fields

  // Computed
  const totalPages = computed(() => Math.ceil(excelData.value.length / itemsPerPage.value))

  // Note: paginatedData is not used in current implementation

  // Methods
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getRoomOptions = (staffId: string) => {
    if (!staffId || !departmentTree.value) return []

    const staff = departmentTree.value.find((s: any) => String(s.id) === String(staffId))
    if (staff && staff.children) {
      return staff.children.map((room: any) => ({
        id: room.id,
        name: room.name,
      }))
    }
    return []
  }

  const validateRow = async (index: number) => {
    const row = excelData.value[index]
    if (!row) return

    try {
      // Simple validation for required fields
      const errors: any = {}

      if (!row.code?.trim()) errors.code = 'Mã nhân viên là bắt buộc'
      if (!row.name?.trim()) errors.name = 'Họ tên là bắt buộc'
      if (!row.email?.trim()) errors.email = 'Email là bắt buộc'
      if (!row.phone?.trim()) errors.phone = 'Số điện thoại là bắt buộc'
      if (!row.staff_id?.trim()) errors.staff_id = 'Khối là bắt buộc'
      if (!row.room_id?.trim()) errors.room_id = 'Phòng ban là bắt buộc'
      if (!row.office_id?.trim()) errors.office_id = 'Văn phòng là bắt buộc'
      if (!row.per_group_name?.trim()) errors.per_group_name = 'Nhóm người dùng là bắt buộc'
      if (!row.identification?.trim()) errors.identification = 'CCCD là bắt buộc'
      if (!row.permanent_address?.trim()) errors.permanent_address = 'Địa chỉ thường trú là bắt buộc'
      if (!row.residence_address?.trim()) errors.residence_address = 'Địa chỉ tạm trú là bắt buộc'

      // Email validation
      if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.email = 'Email không hợp lệ'
      }

      // Phone validation
      if (row.phone && !/^[0-9]{10}$/.test(row.phone.replace(/\s/g, ''))) {
        errors.phone = 'Số điện thoại phải có 10 chữ số'
      }

      row.hasError = Object.keys(errors).length > 0
      row.errors = errors

      if (row.hasError) {
        showToast('Lỗi', 'Vui lòng kiểm tra lại dữ liệu', 'error')
      } else {
        showToast('Thành công', 'Dữ liệu hợp lệ', 'success')
      }
    } catch (error) {
      console.error('Validation error:', error)
      showToast('Lỗi', 'Có lỗi xảy ra khi kiểm tra dữ liệu', 'error')
    }
  }

  const removeRow = (index: number) => {
    if (confirm('Bạn có chắc muốn xóa dòng này?')) {
      excelData.value.splice(index, 1)
      showToast('Thành công', 'Đã xóa dòng dữ liệu', 'success')
    }
  }

  // Comprehensive data validation
  const validateAllData = () => {
    if (excelData.value.length === 0) {
      showToast('Cảnh báo', 'Không có dữ liệu để kiểm tra', 'error')
      return
    }

    console.warn('🔍 Starting comprehensive data validation...')

    let totalRows = excelData.value.length
    let validRows = 0
    let errorRows = 0
    let criticalErrors = 0
    let warnings = 0

    excelData.value.forEach((row, index) => {
      const errors: any = {}
      let hasCriticalError = false

      // Critical validations (required fields)
      if (!row.name || !row.name.trim()) {
        errors.name = 'Họ và tên là bắt buộc'
        hasCriticalError = true
      }

      if (!row.email || !row.email.trim()) {
        errors.email = 'Email là bắt buộc'
        hasCriticalError = true
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.email = 'Email không hợp lệ'
        hasCriticalError = true
      }

      if (!row.code || !row.code.trim()) {
        errors.code = 'Mã nhân viên là bắt buộc'
        hasCriticalError = true
      }

      if (!row.phone || !row.phone.trim()) {
        errors.phone = 'Số điện thoại là bắt buộc'
        hasCriticalError = true
      } else if (!/^[0-9]{10,11}$/.test(row.phone.replace(/\s/g, ''))) {
        errors.phone = 'Số điện thoại phải có 10-11 chữ số'
        hasCriticalError = true
      }

      if (!row.staff_id || !row.staff_id.trim()) {
        errors.staff_id = 'Khối là bắt buộc'
        hasCriticalError = true
      }

      if (!row.room_id || !row.room_id.trim()) {
        errors.room_id = 'Phòng ban là bắt buộc'
        hasCriticalError = true
      }

      if (!row.office_id || !row.office_id.trim()) {
        errors.office_id = 'Văn phòng là bắt buộc'
        hasCriticalError = true
      }

      if (!row.per_group_name || !row.per_group_name.trim()) {
        errors.per_group_name = 'Nhóm người dùng là bắt buộc'
        hasCriticalError = true
      }

      if (!row.identification || !row.identification.trim()) {
        errors.identification = 'CCCD là bắt buộc'
        hasCriticalError = true
      }

      if (!row.permanent_address || !row.permanent_address.trim()) {
        errors.permanent_address = 'Địa chỉ thường trú là bắt buộc'
        hasCriticalError = true
      }

      // Warning validations (recommended but not required)
      if (!row.dob) {
        warnings++
        if (!errors.warnings) (errors as any).warnings = []
        ;(errors as any).warnings.push('Thiếu ngày sinh')
      }

      if (!row.place_of_issue || !row.place_of_issue.trim()) {
        warnings++
        if (!(errors as any).warnings) (errors as any).warnings = []
        ;(errors as any).warnings.push('Thiếu nơi cấp CCCD')
      }

      // Update row status
      row.errors = errors
      row.hasError = Object.keys(errors).length > 0

      if (hasCriticalError) {
        errorRows++
        criticalErrors++
      } else {
        validRows++
      }

      // Log validation result for debugging
      if (row.hasError) {
        console.warn(`Row ${index + 1} validation:`, errors)
      }
    })

    // Update validation summary
    validationSummary.value = {
      totalRows,
      validRows,
      errorRows,
      criticalErrors,
      warnings,
    }

    hasValidationErrors.value = errorRows > 0

    // Show validation results
    const message = `Kết quả kiểm tra dữ liệu:\n• Tổng số: ${totalRows} hàng\n• Hợp lệ: ${validRows} hàng\n• Có lỗi: ${errorRows} hàng\n• Cảnh báo: ${warnings} trường`

    if (errorRows === 0) {
      showToast('Thành công', `${message}\n✅ Tất cả dữ liệu đều hợp lệ!`, 'success')
    } else {
      showToast('Cảnh báo', `${message}\n⚠️ Vui lòng sửa các lỗi trước khi import!`, 'error')
    }

    console.warn('✅ Validation completed:', validationSummary.value)
  }

  const handleSaveAll = async () => {
    if (excelData.value.length === 0) return

    saving.value = true
    saveProgress.value = 0
    savedCount.value = 0
    let skippedCount = 0
    let updatedCount = 0
    let createdCount = 0

    try {
      const totalRecords = excelData.value.length

      for (let i = 0; i < totalRecords; i++) {
        const row = excelData.value[i]

        // Get comparison result
        const comparison = row.comparisonResult
        if (!comparison) {
          console.warn(`Row ${i + 1} has no comparison result, skipping`)
          skippedCount++
          continue
        }

        // Skip if cannot import
        if (!comparison.canImport) {
          console.warn(`Row ${i + 1} cannot be imported:`, comparison.reasons)
          row.hasError = true
          row.errors = { general: comparison.reasons.join(', ') }
          skippedCount++
          continue
        }

        // Update row data based on comparison
        updateRowBasedOnComparison(row)

        // Prepare form data
        const formData = new FormData()

        // Map all fields to FormData (same as ModalEditUser logic)
        Object.keys(row).forEach((key) => {
          const value = (row as any)[key]
          if (value !== null && value !== undefined && value !== '' && key !== 'comparisonResult') {
            if (value instanceof Date) {
              formData.append(key, format(value, 'yyyy-MM-dd'))
            } else {
              formData.append(key, String(value))
            }
          }
        })

        // Set default values for required fields (from ModalEditUser)
        if (!formData.has('status')) {
          formData.append('status', '1')
        }
        if (!formData.has('gender')) {
          formData.append('gender', 'male')
        }

        try {
          let apiUrl = `${apiUri}/user/create`
          let _method = 'post'

          // Use update API if we have an existing user ID
          if (comparison.importAction === 'update' && row.id && row.id !== `temp_${i}`) {
            apiUrl = `${apiUri}/user/update`
            formData.append('id', String(row.id))
            _method = 'post'
          }

          const response = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${auth.token()}`,
            },
          })

          savedCount.value++
          saveProgress.value = Math.round((savedCount.value / totalRecords) * 100)

          // Track import type
          if (comparison.importAction === 'update') {
            updatedCount++
          } else {
            createdCount++
          }

          // Mark as successfully saved
          row.hasError = false
          row.errors = {}
          row.importStatus = 'success'

          console.warn(`Row ${i + 1} ${comparison.importAction}d successfully:`, response.data)
        } catch (error: any) {
          console.error(`Error saving row ${i + 1}:`, error)
          row.hasError = true
          row.errors = { general: error.response?.data?.message || 'Lỗi khi lưu dữ liệu' }
          row.importStatus = 'error'
        }
      }

      // Show detailed results
      const resultMessage = `Hoàn thành: ${savedCount.value}/${totalRecords} bản ghi được xử lý`
      const detailMessage = `Tạo mới: ${createdCount}, Cập nhật: ${updatedCount}, Bỏ qua: ${skippedCount}`

      if (savedCount.value > 0) {
        showToast('Thành công', `${resultMessage}\n${detailMessage}`, 'success')
      }

      if (savedCount.value < totalRecords) {
        showToast('Cảnh báo', `${totalRecords - savedCount.value} bản ghi có lỗi hoặc bị bỏ qua`, 'error')
      }
    } catch (error) {
      console.error('Save error:', error)
      showToast('Lỗi', 'Có lỗi xảy ra khi lưu dữ liệu', 'error')
    } finally {
      saving.value = false
    }
  }

  const showToast = (title: string, description: string, type: 'success' | 'error' = 'success') => {
    toast.title = title
    toast.description = description
    toast.type = type
    toast.open = true
  }

  // Map gender from Excel to system format
  const mapGender = (genderValue: string): string => {
    if (!genderValue) return ''

    const value = genderValue.toLowerCase().trim()
    if (value === 'nam' || value === 'male' || value === 'm') return 'male'
    if (value === 'nữ' || value === 'nu' || value === 'female' || value === 'f') return 'female'
    if (value === 'khác' || value === 'other' || value === 'o') return 'other'
    return ''
  }

  // Map department names to IDs
  const mapDepartmentToId = (departmentName: string): string => {
    if (!departmentName || !departmentTree.value) return ''

    const department = departmentTree.value.find((dept: any) =>
      dept.name.toLowerCase().includes(departmentName.toLowerCase())
    )
    return department ? String(department.id) : ''
  }

  // Map position names to IDs
  const mapPositionToId = (positionName: string): string => {
    if (!positionName || !positionData.value) return ''

    for (const category of Object.values(positionData.value)) {
      const position = (category as any[]).find((pos: any) =>
        pos.name.toLowerCase().includes(positionName.toLowerCase())
      )
      if (position) return String(position.id)
    }
    return ''
  }

  // Map office names to IDs
  const mapOfficeToId = (officeName: string): string => {
    if (!officeName || !regionData.value) return ''

    for (const offices of regionData.value) {
      const office = offices.find((off: any) => off.name.toLowerCase().includes(officeName.toLowerCase()))
      if (office) return String(office.id)
    }
    return ''
  }

  // Map permission group names to values
  const mapPermissionToValue = (groupName: string): string => {
    if (!groupName || !listGrPermiss.value) return ''

    const group = listGrPermiss.value.find((grp: any) =>
      grp.description.toLowerCase().includes(groupName.toLowerCase())
    )
    return group ? group.name : ''
  }

  // Initialize data from sessionStorage
  const initializeFromStorage = () => {
    const uploadDataString = sessionStorage.getItem('excelUploadData')

    if (uploadDataString) {
      try {
        const uploadData = JSON.parse(uploadDataString)

        if (uploadData && uploadData.data) {
          // Debug logs (remove in production)
          console.warn('Raw Excel data:', uploadData.data.slice(0, 3)) // Debug: show first 3 rows
          console.warn('Excel headers:', uploadData.headers) // Debug: show headers

          // Debug column mapping
          if (uploadData.data.length > 0) {
            const firstRow = uploadData.data[0]
            console.warn('🔍 Column Mapping Debug:')
            console.warn('Available columns:', Object.keys(firstRow))
            console.warn(
              'Looking for "Họ và tên":',
              findValueByKeyPattern(
                firstRow,
                ['họ và tên', 'hoten', 'name', 'ho ten', 'full name', 'ten nhan vien', 'họ tên', 'ho va ten'],
                true
              )
            )
            console.warn(
              'Looking for "Email":',
              findValueByKeyPattern(firstRow, ['email', 'e-mail', 'mail', 'email công ty', 'email address'], true)
            )
            console.warn(
              'Looking for "Mã NV":',
              findValueByKeyPattern(
                firstRow,
                ['mã nv', 'manv', 'code', 'ma nhan vien', 'employee code', 'mã nhân viên'],
                true
              )
            )
          }

          // Store original Excel data
          originalExcelData.value = uploadData.data

          excelData.value = uploadData.data.map((row: any, index: number) => {
            // Debug: log the actual row structure for first few rows
            if (index === 0) {
              console.warn('First row keys:', Object.keys(row))
              console.warn('First row values:', row)
              console.warn('Available Excel headers:', uploadData.headers)
            }

            // Map Excel columns to system fields with flexible matching
            const mappedRow = {
              id: `temp_${index}`,
              hasError: false,
              errors: {},
              // Map Excel data to system fields with multiple possible column names
              code: findValueByKeyPattern(row, [
                'mã nv',
                'manv',
                'code',
                'ma nhan vien',
                'employee code',
                'mã nhân viên',
              ]),
              name: findValueByKeyPattern(row, [
                'họ và tên',
                'hoten',
                'name',
                'ho ten',
                'full name',
                'ten nhan vien',
                'họ tên',
                'ho va ten',
              ]),
              email: findValueByKeyPattern(row, ['email', 'e-mail', 'mail', 'email công ty', 'email address']),
              phone: findValueByKeyPattern(row, [
                'sđt',
                'sodienthoai',
                'phone',
                'dien thoai',
                'so dien thoai',
                'mobile',
              ]),
              dob:
                parseDate(findValueByKeyPattern(row, ['ngày sinh', 'ngaysinh', 'birth date', 'birthday', 'dob'])) ||
                undefined,
              gender: mapGender(findValueByKeyPattern(row, ['giới tính', 'gioitinh', 'gender', 'sex'])) || undefined,
              identification: findValueByKeyPattern(row, ['cccd', 'cmnd', 'identification', 'id number', 'citizen id']),
              date_of_issue:
                parseDate(findValueByKeyPattern(row, ['ngày cấp', 'ngaycap', 'issue date', 'date of issue'])) ||
                undefined,
              place_of_issue: findValueByKeyPattern(row, ['nơi cấp', 'noicap', 'place of issue', 'issued by']),
              permanent_address: findValueByKeyPattern(row, [
                'địa chỉ thường trú',
                'diachithuongtru',
                'permanent address',
                'address',
              ]),
              residence_address: findValueByKeyPattern(row, [
                'địa chỉ tạm trú',
                'diachitamtru',
                'temporary address',
                'current address',
              ]),
              staff_id: mapDepartmentToId(findValueByKeyPattern(row, ['khối', 'khoi', 'department', 'block'])),
              room_id: '', // Will be set after department is loaded
              position_id: mapPositionToId(
                findValueByKeyPattern(row, ['chức vụ', 'chucvu', 'position', 'title', 'job title'])
              ),
              working_day:
                parseDate(findValueByKeyPattern(row, ['ngày vào làm', 'ngayvaolam', 'start date', 'join date'])) ||
                undefined,
              official_day:
                parseDate(
                  findValueByKeyPattern(row, ['ngày chính thức', 'ngaychinhthuc', 'official date', 'confirmation date'])
                ) || undefined,
              parent_id: '', // Will be mapped from manager name
              office_id: mapOfficeToId(findValueByKeyPattern(row, ['văn phòng', 'vanphong', 'office', 'branch'])),
              per_group_name: mapPermissionToValue(
                findValueByKeyPattern(row, ['nhóm người dùng', 'nhomnguoidung', 'user group', 'group'])
              ),
              status: '1', // Default to active
            }

            return mappedRow
          })

          console.warn('Mapped data sample:', excelData.value.slice(0, 2)) // Debug: show mapped data

          fileInfo.value = {
            name: uploadData.file?.name || '',
            size: uploadData.file?.size || 0,
          }

          // Store headers for debugging
          excelHeaders.value = uploadData.headers || []

          // Clear the stored data
          sessionStorage.removeItem('excelUploadData')
        } else {
          throw new Error('Invalid upload data')
        }
      } catch (error) {
        console.error('Error parsing upload data:', error)
        showToast('Lỗi', 'Không thể tải dữ liệu Excel', 'error')
        router.push('/system/user')
      }
    } else {
      // If no data, redirect back
      router.push('/system/user')
    }
  }

  // Parse date from Excel format
  const parseDate = (dateValue: string): Date | null => {
    if (!dateValue) return null

    try {
      // Simple date parsing - you might want to use a library like date-fns for better parsing
      if (dateValue.includes('/')) {
        const parts = dateValue.split('/')
        if (parts.length === 3) {
          const day = parseInt(parts[0])
          const month = parseInt(parts[1]) - 1 // JS months are 0-based
          const year = parseInt(parts[2])
          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return new Date(year, month, day)
          }
        }
      } else if (dateValue.includes('-')) {
        const parts = dateValue.split('-')
        if (parts.length === 3) {
          let day, month, year
          if (parts[2].length === 4) {
            // YYYY-MM-DD
            year = parseInt(parts[0])
            month = parseInt(parts[1]) - 1
            day = parseInt(parts[2])
          } else {
            // DD-MM-YYYY or MM-DD-YYYY
            day = parseInt(parts[0])
            month = parseInt(parts[1]) - 1
            year = parseInt(parts[2])
          }
          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return new Date(year, month, day)
          }
        }
      }

      // If parsing fails, try creating Date object directly
      const date = new Date(dateValue)
      return isNaN(date.getTime()) ? null : date
    } catch (error) {
      console.error('Error parsing date:', dateValue, error)
      return null
    }
  }

  // Load existing users for comparison
  const loadExistingUsers = async () => {
    try {
      const response = await axios.get(`${apiUri}/user/list`, {
        headers: { Authorization: `Bearer ${auth.token()}` },
      })
      existingUsers.value = response.data.data.items || []
      console.warn('Loaded existing users:', existingUsers.value.length)
    } catch (error) {
      console.error('Error loading existing users:', error)
      showToast('Lỗi', 'Không thể tải danh sách người dùng hiện có', 'error')
    }
  }

  // Compare Excel row with existing data
  const compareRowWithExisting = (row: ExcelRow): any => {
    const comparison = {
      isDuplicate: false,
      duplicateFields: [] as string[],
      existingUser: null as any,
      matchType: 'none' as 'none' | 'partial' | 'exact' | 'duplicate',
      canImport: true,
      importAction: 'create' as 'create' | 'update' | 'skip',
      reasons: [] as string[],
    }

    // Check for duplicates by key fields
    const duplicateChecks = [
      { field: 'email', value: row.email, label: 'Email' },
      { field: 'phone', value: row.phone, label: 'Số điện thoại' },
      { field: 'identification', value: row.identification, label: 'CCCD' },
      { field: 'code', value: row.code, label: 'Mã nhân viên' },
    ]

    for (const check of duplicateChecks) {
      if (check.value) {
        // Check if any existing user has this value
        for (const existingUser of existingUsers.value) {
          const existingValue = existingUser[check.field]
          if (existingValue && String(existingValue).toLowerCase() === String(check.value).toLowerCase()) {
            comparison.isDuplicate = true
            comparison.duplicateFields.push(check.label)
            if (!comparison.existingUser) {
              comparison.existingUser = existingUser
            }
          }
        }
      }
    }

    // Determine match type and import action
    if (comparison.isDuplicate) {
      if (comparison.duplicateFields.length >= 2) {
        comparison.matchType = 'exact'
        comparison.importAction = 'update'
        comparison.reasons.push('Cập nhật thông tin người dùng hiện có')
      } else {
        comparison.matchType = 'partial'
        comparison.importAction = 'update'
        comparison.reasons.push('Cập nhật một phần thông tin')
      }
    } else {
      comparison.matchType = 'none'
      comparison.importAction = 'create'
      comparison.reasons.push('Tạo người dùng mới')
    }

    // Additional validation checks
    if (!row.email || !row.name || !row.phone) {
      comparison.canImport = false
      comparison.reasons.push('Thiếu thông tin bắt buộc')
    }

    return comparison
  }

  // Compare all rows with existing data
  const compareAllRowsWithExisting = () => {
    excelData.value.forEach((row, index) => {
      const comparison = compareRowWithExisting(row)
      row.comparisonResult = comparison
      console.warn(`Row ${index + 1} comparison:`, comparison)
    })
  }

  // Fill data from Excel to form fields
  const fillDataFromExcel = () => {
    if (excelData.value.length === 0 || originalExcelData.value.length === 0) {
      showToast('Cảnh báo', 'Không có dữ liệu Excel để điền', 'error')
      return
    }

    let totalFieldsFilled = 0
    let nameFieldsFilled = 0
    let emailFieldsFilled = 0
    let codeFieldsFilled = 0
    let phoneFieldsFilled = 0

    // Log Excel headers for debugging
    console.warn('Excel Headers:', excelHeaders.value)
    console.warn('First Excel row:', originalExcelData.value[0])

    excelData.value.forEach((row, index) => {
      const excelRow = originalExcelData.value[index]
      if (!excelRow) return

      try {
        // Priority 1: Fill "Họ và tên" (name) field - CỰC KỲ QUAN TRỌNG
        if (!row.name || !row.name.trim()) {
          const nameValue = findValueByKeyPattern(
            excelRow,
            [
              'họ và tên',
              'họ tên',
              'ho va ten',
              'ho ten',
              'hoten',
              'ten nhan vien',
              'ten',
              'name',
              'full name',
              'fullname',
              'tên đầy đủ',
              'tên nhân viên',
              'họ và tên đầy đủ',
              // Thêm các pattern phổ biến khác
              'họ',
              'tên đệm',
              'tên chính',
            ],
            true
          ) // Enable debug logging for name field
          if (nameValue && nameValue.trim()) {
            row.name = nameValue.trim()
            nameFieldsFilled++
            totalFieldsFilled++
            console.warn(`Row ${index + 1}: Filled name = "${nameValue}"`)
          }
        }

        // Priority 2: Fill "Email công ty" field - CỰC KỲ QUAN TRỌNG
        if (!row.email || !row.email.trim()) {
          const emailValue = findValueByKeyPattern(
            excelRow,
            [
              'email công ty',
              'email',
              'e-mail',
              'mail',
              'email address',
              'email công ty',
              'email company',
              'email doanh nghiệp',
              'email work',
              'email lam viec',
              'email chính',
              'email chinh',
              'email công việc',
              'email cong viec',
              'email office',
              'email van phong',
              // Các pattern email khác
              'email cá nhân',
              'email ca nhan',
              'personal email',
              'work email',
            ],
            true
          ) // Enable debug logging for email field
          if (emailValue && emailValue.trim()) {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (emailRegex.test(emailValue.trim())) {
              row.email = emailValue.trim()
              emailFieldsFilled++
              totalFieldsFilled++
              console.warn(`Row ${index + 1}: Filled email = "${emailValue}"`)
            } else {
              console.warn(`Row ${index + 1}: Invalid email format: "${emailValue}"`)
            }
          }
        }

        // Fill "Mã NV" field
        if (!row.code || !row.code.trim()) {
          const codeValue = findValueByKeyPattern(excelRow, [
            'mã nv',
            'mã nhân viên',
            'ma nv',
            'ma nhan vien',
            'manv',
            'code',
            'employee code',
            'mã số',
            'mã',
            'employee id',
            'emp id',
            'id',
            'mã định danh',
          ])
          if (codeValue && codeValue.trim()) {
            row.code = codeValue.trim()
            codeFieldsFilled++
            totalFieldsFilled++
          }
        }

        // Fill "SĐT" field
        if (!row.phone || !row.phone.trim()) {
          const phoneValue = findValueByKeyPattern(excelRow, [
            'sđt',
            'số điện thoại',
            'so dien thoai',
            'sodienthoai',
            'phone',
            'dien thoai',
            'mobile',
            'phone number',
            'mobile phone',
            'điện thoại',
            'số liên lạc',
            'contact number',
          ])
          if (phoneValue && phoneValue.trim()) {
            // Clean phone number (remove spaces, dashes, etc.)
            const cleanPhone = phoneValue.replace(/[\s\-\(\)]/g, '')
            if (cleanPhone.length >= 10) {
              row.phone = cleanPhone
              phoneFieldsFilled++
              totalFieldsFilled++
            }
          }
        }

        // Fill other important fields
        if (!row.identification || !row.identification.trim()) {
          const idValue = findValueByKeyPattern(excelRow, [
            'cccd',
            'cmnd',
            'số cccd',
            'số cmnd',
            'identification',
            'id number',
            'citizen id',
            'số định danh',
            'mã định danh',
          ])
          if (idValue && idValue.trim()) {
            row.identification = idValue.trim()
            totalFieldsFilled++
          }
        }

        if (!row.permanent_address || !row.permanent_address.trim()) {
          const addressValue = findValueByKeyPattern(excelRow, [
            'địa chỉ thường trú',
            'địa chỉ',
            'diachi',
            'diachithuongtru',
            'permanent address',
            'address',
            'địa chỉ nhà',
            'địa chỉ cư trú',
          ])
          if (addressValue && addressValue.trim()) {
            row.permanent_address = addressValue.trim()
            totalFieldsFilled++
          }
        }
      } catch (error) {
        console.error(`Error filling data for row ${index + 1}:`, error)
      }
    })

    // Detailed feedback to user
    const message = `Đã điền dữ liệu từ Excel:\n• Họ và tên: ${nameFieldsFilled}\n• Email công ty: ${emailFieldsFilled}\n• Mã NV: ${codeFieldsFilled}\n• SĐT: ${phoneFieldsFilled}\n• Tổng cộng: ${totalFieldsFilled} trường`

    if (totalFieldsFilled > 0) {
      showToast('Thành công', message, 'success')
      console.warn('Fill Excel Data Summary:', {
        totalFieldsFilled,
        nameFieldsFilled,
        emailFieldsFilled,
        codeFieldsFilled,
        phoneFieldsFilled,
      })
    } else {
      showToast('Thông báo', 'Không tìm thấy dữ liệu phù hợp trong Excel hoặc tất cả trường đã có dữ liệu', 'error')
    }
  }

  // Update row data based on comparison and import action
  const updateRowBasedOnComparison = (row: ExcelRow) => {
    const comparison = row.comparisonResult
    if (!comparison) return

    if (comparison.importAction === 'update' && comparison.existingUser) {
      // Merge existing data with Excel data
      const existing = comparison.existingUser

      // Update fields that are empty in Excel but exist in system
      if (!row.staff_id && existing.staff_id) {
        row.staff_id = existing.staff_id
      }
      if (!row.room_id && existing.room_id) {
        row.room_id = existing.room_id
      }
      if (!row.position_id && existing.position_id) {
        row.position_id = existing.position_id
      }
      if (!row.office_id && existing.office_id) {
        row.office_id = existing.office_id
      }
      if (!row.per_group_name && existing.per_group_name) {
        row.per_group_name = existing.per_group_name
      }

      // Keep existing ID for update
      row.id = existing.id
    }
  }

  // Load reference data
  const loadReferenceData = async () => {
    try {
      // Load permissions
      const permissionResponse = await axios.get(`${apiUri}/permission/list`, {
        headers: { Authorization: `Bearer ${auth.token()}` },
      })
      listGrPermiss.value = permissionResponse.data.data

      // Load departments
      const departmentResponse = await axios.get(`${apiUri}/categories/staff`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      departmentTree.value = departmentResponse.data.data

      // Load positions
      const positionResponse = await axios.get(`${apiUri}/categories/list?type=position`, {
        headers: { Authorization: `Bearer ${auth.token()}` },
      })
      positionData.value = positionResponse.data.data.items

      // Load regions
      const regionResponse = await axios.get(`${apiUri}/categories/list?type=office`, {
        headers: { Authorization: `Bearer ${auth.token()}` },
      })
      regionData.value = regionResponse.data.data.items

      // Load leaders
      const leaderResponse = await axios.get(`${apiUri}/user/list`, {
        headers: { Authorization: `Bearer ${auth.token()}` },
      })
      leaderData.value = leaderResponse.data.data.items
    } catch (error) {
      console.error('Error loading reference data:', error)
      showToast('Lỗi', 'Không thể tải dữ liệu tham khảo', 'error')
    }
  }

  // Watch for page changes to reset to first page when data changes
  watch(
    () => excelData.value.length,
    () => {
      currentPage.value = 1
    }
  )

  // Auto-fill data when Excel data is loaded
  watch(
    () => excelData.value,
    (newData, oldData) => {
      // Only auto-fill if new data is loaded (not just modified)
      if (newData && newData.length > 0 && (!oldData || oldData.length === 0)) {
        console.warn('🔄 Auto-filling Excel data...')
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          autoFillExcelData()
        }, 500)
      }
    },
    { deep: true }
  )

  // Auto-fill function optimized for speed
  const autoFillExcelData = () => {
    if (excelData.value.length === 0 || originalExcelData.value.length === 0) {
      return
    }

    let totalFieldsFilled = 0
    let nameFieldsFilled = 0
    let emailFieldsFilled = 0
    let codeFieldsFilled = 0
    let phoneFieldsFilled = 0

    console.warn('🚀 Auto-filling Excel data for', excelData.value.length, 'rows')

    excelData.value.forEach((row, index) => {
      const excelRow = originalExcelData.value[index]
      if (!excelRow) return

      try {
        // Priority 1: Fill "Họ và tên" (name) field - MOST IMPORTANT
        if (!row.name || !row.name.trim()) {
          const nameValue = findValueByKeyPattern(excelRow, [
            'họ và tên',
            'họ tên',
            'ho va ten',
            'ho ten',
            'hoten',
            'ten nhan vien',
            'ten',
            'name',
            'full name',
            'fullname',
          ])
          if (nameValue && nameValue.trim()) {
            row.name = nameValue.trim()
            nameFieldsFilled++
            totalFieldsFilled++
          }
        }

        // Priority 2: Fill "Email công ty" field - MOST IMPORTANT
        if (!row.email || !row.email.trim()) {
          const emailValue = findValueByKeyPattern(excelRow, [
            'email công ty',
            'email',
            'e-mail',
            'mail',
            'email address',
          ])
          if (emailValue && emailValue.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (emailRegex.test(emailValue.trim())) {
              row.email = emailValue.trim()
              emailFieldsFilled++
              totalFieldsFilled++
            }
          }
        }

        // Priority 3: Fill "Mã NV" field
        if (!row.code || !row.code.trim()) {
          const codeValue = findValueByKeyPattern(excelRow, [
            'mã nv',
            'mã nhân viên',
            'ma nv',
            'ma nhan vien',
            'manv',
            'code',
          ])
          if (codeValue && codeValue.trim()) {
            row.code = codeValue.trim()
            codeFieldsFilled++
            totalFieldsFilled++
          }
        }

        // Priority 4: Fill "SĐT" field
        if (!row.phone || !row.phone.trim()) {
          const phoneValue = findValueByKeyPattern(excelRow, [
            'sđt',
            'số điện thoại',
            'so dien thoai',
            'sodienthoai',
            'phone',
            'dien thoai',
            'mobile',
          ])
          if (phoneValue && phoneValue.trim()) {
            const cleanPhone = phoneValue.replace(/[\s\-\(\)]/g, '')
            if (cleanPhone.length >= 10) {
              row.phone = cleanPhone
              phoneFieldsFilled++
              totalFieldsFilled++
            }
          }
        }
      } catch (error) {
        console.error(`Error auto-filling data for row ${index + 1}:`, error)
      }
    })

    // Log results
    const results = {
      totalFieldsFilled,
      nameFieldsFilled,
      emailFieldsFilled,
      codeFieldsFilled,
      phoneFieldsFilled,
    }

    console.warn('✅ Auto-fill completed:', results)

    // Show toast if significant data was filled
    if (totalFieldsFilled > 0) {
      const message = `Tự động điền dữ liệu:\n• Họ và tên: ${nameFieldsFilled}\n• Email: ${emailFieldsFilled}\n• Mã NV: ${codeFieldsFilled}\n• SĐT: ${phoneFieldsFilled}`
      showToast('Thành công', message, 'success')
    }
  }

  // Helper function to find value by flexible key pattern matching
  const findValueByKeyPattern = (row: any, patterns: string[], debugLog: boolean = false): string => {
    if (!row || typeof row !== 'object') return ''

    const debugInfo = debugLog
      ? {
          patterns,
          availableKeys: Object.keys(row),
          searchResults: [] as string[],
        }
      : null

    // Priority 1: Exact match (case insensitive) - MOST IMPORTANT
    for (const pattern of patterns) {
      for (const [key, value] of Object.entries(row)) {
        if (key && typeof key === 'string' && key.toLowerCase().trim() === pattern.toLowerCase().trim()) {
          if (debugLog) debugInfo!.searchResults.push(`EXACT: "${key}" -> "${value}"`)
          return String(value || '')
        }
      }
    }

    // Priority 1.5: Exact match with normalized spaces
    for (const pattern of patterns) {
      const normalizedPattern = pattern.toLowerCase().replace(/\s+/g, ' ').trim()
      for (const [key, value] of Object.entries(row)) {
        if (key && typeof key === 'string') {
          const normalizedKey = key.toLowerCase().replace(/\s+/g, ' ').trim()
          if (normalizedKey === normalizedPattern) {
            if (debugLog) debugInfo!.searchResults.push(`EXACT_NORMALIZED: "${key}" -> "${value}"`)
            return String(value || '')
          }
        }
      }
    }

    // Priority 2: Partial match with word boundaries
    for (const pattern of patterns) {
      const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      for (const [key, value] of Object.entries(row)) {
        if (key && typeof key === 'string' && regex.test(key)) {
          if (debugLog) debugInfo!.searchResults.push(`WORD_BOUNDARY: "${key}" -> "${value}"`)
          return String(value || '')
        }
      }
    }

    // Priority 3: Contains match (more flexible)
    for (const pattern of patterns) {
      for (const [key, value] of Object.entries(row)) {
        if (key && typeof key === 'string' && key.toLowerCase().includes(pattern.toLowerCase())) {
          if (debugLog) debugInfo!.searchResults.push(`CONTAINS: "${key}" -> "${value}"`)
          return String(value || '')
        }
      }
    }

    // Priority 4: Fuzzy match by removing spaces and special chars
    for (const pattern of patterns) {
      const normalizedPattern = pattern.toLowerCase().replace(/[^a-z0-9]/g, '')
      for (const [key, value] of Object.entries(row)) {
        if (key && typeof key === 'string') {
          const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '')
          if (normalizedKey.includes(normalizedPattern)) {
            if (debugLog) debugInfo!.searchResults.push(`FUZZY: "${key}" -> "${value}"`)
            return String(value || '')
          }
        }
      }
    }

    // Priority 5: Special patterns for common variations
    for (const pattern of patterns) {
      // Handle "email công ty" -> "email", "email work" patterns
      if (pattern.includes('email')) {
        const emailPatterns = ['email', 'e-mail', 'mail']
        for (const emailPattern of emailPatterns) {
          for (const [key, value] of Object.entries(row)) {
            if (key && typeof key === 'string' && key.toLowerCase().includes(emailPattern)) {
              if (debugLog) debugInfo!.searchResults.push(`EMAIL_SPECIAL: "${key}" -> "${value}"`)
              return String(value || '')
            }
          }
        }
      }

      // Handle "họ và tên" -> "name", "fullname" patterns
      if (pattern.includes('họ') || pattern.includes('tên')) {
        const namePatterns = ['name', 'fullname', 'full name', 'ho ten', 'hoten']
        for (const namePattern of namePatterns) {
          for (const [key, value] of Object.entries(row)) {
            if (key && typeof key === 'string' && key.toLowerCase().includes(namePattern)) {
              if (debugLog) debugInfo!.searchResults.push(`NAME_SPECIAL: "${key}" -> "${value}"`)
              return String(value || '')
            }
          }
        }
      }
    }

    // Priority 6: Similarity matching for typos
    for (const pattern of patterns) {
      const patternWords = pattern.toLowerCase().split(/\s+/)
      for (const [key, value] of Object.entries(row)) {
        if (key && typeof key === 'string') {
          const keyWords = key.toLowerCase().split(/\s+/)
          // Check if most words match (Levenshtein distance could be better but this is simpler)
          const matches = patternWords.filter((pWord) =>
            keyWords.some((kWord) => kWord.includes(pWord) || pWord.includes(kWord))
          ).length
          if (matches >= Math.max(1, patternWords.length * 0.6)) {
            // 60% similarity
            if (debugLog)
              debugInfo!.searchResults.push(`SIMILARITY: "${key}" -> "${value}" (${matches}/${patternWords.length})`)
            return String(value || '')
          }
        }
      }
    }

    if (debugLog && debugInfo) {
      console.warn('Pattern Search Debug:', debugInfo)
    }

    return ''
  }

  // Get mapping status for a field
  const getMappingStatus = (fieldName: string): string => {
    if (excelData.value.length === 0) return 'Chưa có dữ liệu'

    const sampleRow = excelData.value[0]
    const value = (sampleRow as any)[fieldName]

    if (value && value.toString().trim()) {
      return '✅ Có dữ liệu'
    } else {
      return '❌ Trống'
    }
  }

  // Get color for mapping status
  const getMappingStatusColor = (fieldName: string): string => {
    if (excelData.value.length === 0) return 'gray'

    const sampleRow = excelData.value[0]
    const value = (sampleRow as any)[fieldName]

    return value && value.toString().trim() ? 'green' : 'red'
  }

  // Get detected column name for a field type
  const getDetectedColumn = (fieldType: string): string => {
    if (excelData.value.length === 0 || originalExcelData.value.length === 0) return ''

    const firstRow = originalExcelData.value[0]
    if (!firstRow) return ''

    const patterns = {
      name: ['họ và tên', 'hoten', 'name', 'ho ten', 'full name', 'ten nhan vien', 'họ tên', 'ho va ten'],
      email: ['email', 'e-mail', 'mail', 'email công ty', 'email address'],
      code: ['mã nv', 'manv', 'code', 'ma nhan vien', 'employee code', 'mã nhân viên'],
    }

    const fieldPatterns = patterns[fieldType as keyof typeof patterns] || []

    // Find the actual column name that matched
    for (const pattern of fieldPatterns) {
      for (const [key, _value] of Object.entries(firstRow)) {
        if (key && typeof key === 'string' && key.toLowerCase().trim() === pattern.toLowerCase().trim()) {
          return key
        }
      }
    }

    // Try normalized match
    for (const pattern of fieldPatterns) {
      const normalizedPattern = pattern.toLowerCase().replace(/\s+/g, ' ').trim()
      for (const [key, _value] of Object.entries(firstRow)) {
        if (key && typeof key === 'string') {
          const normalizedKey = key.toLowerCase().replace(/\s+/g, ' ').trim()
          if (normalizedKey === normalizedPattern) {
            return key
          }
        }
      }
    }

    return ''
  }

  // Debug column mapping function
  const debugColumnMapping = () => {
    if (excelData.value.length === 0 || originalExcelData.value.length === 0) {
      showToast('Cảnh báo', 'Không có dữ liệu để debug', 'error')
      return
    }

    console.warn('🐛 DEBUG COLUMN MAPPING')
    console.warn('='.repeat(50))

    const firstRow = originalExcelData.value[0]
    console.warn('📋 Available Excel columns:')
    Object.keys(firstRow).forEach((key, index) => {
      console.warn(`${index + 1}. "${key}" = "${firstRow[key]}"`)
    })

    console.warn('\n🔍 Mapping Results:')

    // Test name mapping
    const namePatterns = ['họ và tên', 'hoten', 'name', 'ho ten', 'full name', 'ten nhan vien', 'họ tên', 'ho va ten']
    const nameResult = findValueByKeyPattern(firstRow, namePatterns, true)
    console.warn(`👤 Name mapping: "${nameResult}"`)

    // Test email mapping
    const emailPatterns = ['email', 'e-mail', 'mail', 'email công ty', 'email address']
    const emailResult = findValueByKeyPattern(firstRow, emailPatterns, true)
    console.warn(`📧 Email mapping: "${emailResult}"`)

    // Test code mapping
    const codePatterns = ['mã nv', 'manv', 'code', 'ma nhan vien', 'employee code', 'mã nhân viên']
    const codeResult = findValueByKeyPattern(firstRow, codePatterns, true)
    console.warn(`🆔 Code mapping: "${codeResult}"`)

    console.warn('\n📊 Current mapped data (first row):')
    const firstMappedRow = excelData.value[0]
    console.warn(`Name: "${firstMappedRow.name}"`)
    console.warn(`Email: "${firstMappedRow.email}"`)
    console.warn(`Code: "${firstMappedRow.code}"`)

    console.warn('='.repeat(50))

    showToast('Debug', 'Đã log thông tin debug ra console. Mở Developer Tools để xem chi tiết.', 'success')
  }

  onMounted(async () => {
    if (auth.check()) {
      initializeFromStorage()
      await loadReferenceData()
      await loadExistingUsers()
      // Auto-compare data after loading
      if (excelData.value.length > 0) {
        compareAllRowsWithExisting()
      }
    }
  })
</script>

<style scoped>
  /* Custom styles for horizontal scrolling table */
  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  th,
  td {
    white-space: nowrap;
  }

  th.sticky,
  td.sticky {
    position: sticky;
    background: white;
  }

  th.sticky.left-0,
  td.sticky.left-0 {
    left: 0;
    z-index: 10;
  }

  th.sticky.right-0,
  td.sticky.right-0 {
    right: 0;
    z-index: 10;
  }

  /* Custom input styles */
  input:focus,
  .dp__input:focus {
    border-color: #1b4dea;
    box-shadow: 0 0 0 2px rgba(27, 77, 234, 0.1);
  }

  /* Error styles */
  input.border-red-400,
  .dp__input.border-red-400 {
    border-color: #ef4444;
  }

  /* Select styles */
  :deep(.select-trigger) {
    border: 1px solid #ededf6;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    width: 100%;
  }

  :deep(.select-trigger:focus) {
    border-color: #1b4dea;
    box-shadow: 0 0 0 2px rgba(27, 77, 234, 0.1);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .overflow-x-auto {
      font-size: 12px;
    }

    th,
    td {
      padding: 8px 4px;
      min-width: 120px;
    }

    th.min-w-[60px],
    td.min-w-[60px] {
      min-width: 50px;
    }
  }
</style>
