# Hướng dẫn Import Excel

## 📋 Format Excel được hỗ trợ

File Excel cần có cấu trúc như sau với **dòng đầu tiên là header**:

### 🔴 Cột bắt buộc:

- **Mã NV** hoặc **MaNV** hoặc **Code**: Mã nhân viên
- **Họ và tên** hoặc **HoTen** hoặc **Name**: Họ và tên đầy đủ
- **Email** hoặc **E-mail**: Địa chỉ email
- **SĐT** hoặc **SoDienThoai** hoặc **Phone**: Số điện thoại
- **CCCD** hoặc **CMND** hoặc **Identification**: Số căn cước công dân
- **Địa chỉ thường trú** hoặc **DiaChiThuongTru**: Địa chỉ thường trú
- **Địa chỉ tạm trú** hoặc **DiaChiTamTru**: Địa chỉ tạm trú
- **Khối** hoặc **Khoi**: Tên khối/department
- **Văn phòng** hoặc **VanPhong**: Tên văn phòng/branch
- **Nhóm người dùng** hoặc **NhomNguoiDung**: Tên nhóm quyền

### 🟡 Cột tùy chọn:

- **Ngày sinh** hoặc **NgaySinh**: DD/MM/YYYY
- **Giới tính** hoặc **GioiTinh**: Nam/Nữ/Khác
- **Ngày cấp** hoặc **NgayCap**: DD/MM/YYYY
- **Nơi cấp** hoặc **NoiCap**: Nơi cấp CCCD
- **Phòng ban** hoặc **PhongBan**: Tên phòng ban
- **Chức vụ** hoặc **ChucVu**: Tên chức vụ
- **Ngày vào làm** hoặc **NgayVaoLam**: DD/MM/YYYY
- **Ngày chính thức** hoặc **NgayChinhThuc**: DD/MM/YYYY
- **Quản lý trực tiếp**: Tên quản lý trực tiếp

## 📊 Ví dụ format Excel:

| Mã NV | Họ và tên    | Email         | SĐT        | Ngày sinh  | Giới tính | CCCD         | Địa chỉ thường trú | Địa chỉ tạm trú | Khối | Phòng ban       | Chức vụ    | Ngày vào làm | Văn phòng | Nhóm người dùng |
| ----- | ------------ | ------------- | ---------- | ---------- | --------- | ------------ | ------------------ | --------------- | ---- | --------------- | ---------- | ------------ | --------- | --------------- |
| NV001 | Nguyễn Văn A | a@example.com | 0123456789 | 01/01/1990 | Nam       | 012345678901 | Hà Nội             | Hà Nội          | IT   | Development     | Developer  | 01/06/2022   | Hà Nội    | Developer       |
| NV002 | Trần Thị B   | b@example.com | 0987654321 | 15/05/1985 | Nữ        | 098765432109 | TP.HCM             | TP.HCM          | HR   | Human Resources | HR Manager | 01/03/2020   | TP.HCM    | Manager         |

## 🚀 Các bước import:

1. **Chuẩn bị file Excel**: Đảm bảo file có định dạng .xlsx hoặc .xls
2. **Upload file**: Vào System Admin → User → Click "Import"
3. **Xem mapping**: Hệ thống sẽ hiển thị tên cột Excel và trạng thái mapping
4. **Xem preview**: Kiểm tra dữ liệu đã được map đúng chưa
5. **Chỉnh sửa**: Sửa các field còn thiếu hoặc sai
6. **Lưu**: Click "Lưu tất cả" để tạo user từ dữ liệu Excel

## ⚠️ Lưu ý quan trọng:

- **Dòng đầu tiên** phải là header (tên cột)
- **Không để trống** các cột bắt buộc
- **Format ngày tháng**: DD/MM/YYYY
- **Số điện thoại**: Phải có đúng 10 chữ số
- **Email**: Phải có định dạng email hợp lệ
- **File size**: Tối đa 10MB

## 🔧 Troubleshooting:

### Nếu dữ liệu không được mapping đúng:

1. **Kiểm tra tên cột**: Xem phần "🔍 Mapping cột Excel" để biết tên cột thực sự
2. **Xem trạng thái mapping**: Phần "✅ Trạng thái mapping" cho biết field nào có dữ liệu
3. **Kiểm tra console**: Mở Developer Tools (F12) → Console để xem log debug
4. **Tên cột phổ biến được hỗ trợ**:
   - Mã NV, MaNV, Code, Employee Code
   - Họ và tên, HoTen, Name, Full Name
   - Email, E-mail, Mail
   - SĐT, SoDienThoai, Phone, Mobile
   - CCCD, CMND, Identification, ID Number
   - Khối, Khoi, Department, Block
   - Văn phòng, VanPhong, Office, Branch

### Nếu vẫn không hoạt động:

1. Đảm bảo tên cột trong Excel không có khoảng trắng thừa
2. Thử viết thường hoặc viết hoa tên cột
3. Liên hệ admin để cập nhật logic mapping nếu cần

## 🎯 Tips để thành công:

1. **Copy tên cột** từ danh sách trên để đảm bảo chính xác
2. **Kiểm tra định dạng** ngày tháng và số điện thoại
3. **Test với 1-2 dòng** trước khi import hàng loạt
4. **Sử dụng Excel** thay vì Google Sheets để tránh lỗi format
