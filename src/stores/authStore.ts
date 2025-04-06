// src/stores/auth.js
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken')
  }),

  actions: {
    async login(credentials: any) {
      try {
        const response = await api.post('/user/login', credentials)

        const { access_token, user } = response.data

        this.token = access_token
        this.user = user
        this.isAuthenticated = true

        localStorage.setItem('authToken', access_token) // Lưu token vào localStorage
      } catch (error) {
        console.error('Đăng nhập thất bại:', error)
        throw error
      }
    },

    async logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('authToken')
      window.location.href = '/'
    },

    // Kiểm tra trạng thái xác thực khi tải lại trang
    async checkAuth() {
      if (this.token) {
        try {
          const response = await api.get('/user/info') // Đường dẫn API lấy thông tin người dùng
          this.user = response.data
          this.isAuthenticated = true
        } catch (error) {
          this.logout()
        }
      }
    }
  }
})
