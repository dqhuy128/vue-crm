import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.skygroupvn.com.vn/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// // Interceptor để xử lý lỗi
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Xử lý khi token hết hạn
//       // Bạn có thể dispatch một event hoặc thực hiện refresh token ở đây
//     }
//     return Promise.reject(error)
//   }
// )

export default apiClient
