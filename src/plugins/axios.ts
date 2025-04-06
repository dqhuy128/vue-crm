// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.skygroupvn.com.vn/api', // Thay bằng URL API của bạn
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor để thêm token vào header của mỗi yêu cầu
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor để xử lý lỗi xác thực (ví dụ: token hết hạn)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xử lý đăng xuất hoặc làm mới token tại đây
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
