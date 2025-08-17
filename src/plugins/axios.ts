import axios from 'axios'
import { useAuth } from 'vue-auth3'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

export const apiClient = axios.create({
  baseURL: 'https://api.skygroupvn.com.vn/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization,Access-Control-Max-Age',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': 86400,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    if (config.headers) {
      delete config.headers['access-control-max-age']
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Thêm axios interceptor cho response
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log('🚀 ~ error:', error)

//     if (error.response && error.response.status === 401) {
//       // Đăng xuất người dùng
//       auth.logout({
//         makeRequest: true, // Disable API request
//         redirect: '/login' // Redirect to login page
//       })
//       // Chuyển hướng tới trang login
//       router.push('/login')
//     }
//     return Promise.reject(error)
//   }
// )
