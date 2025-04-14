import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://api.skygroupvn.com.vn/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, Content-Type, X-Auth-Token, Authorization,Access-Control-Max-Age',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': 86400,
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
