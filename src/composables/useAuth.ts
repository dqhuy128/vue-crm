// src/composables/useAuth.js
import router from "@/router"
import { ref } from "vue"

const user: any = ref(null)
const isAuthenticated = ref(false)

// Tài khoản admin mặc định
const defaultAdmin = {
  username: "admin",
  password: "admin",
  name: "Admin User"
}

export function useAuth() {
  // Hàm đăng nhập giả lập
  const login = (credentials: any) => {
    if (
      credentials.username === defaultAdmin.username &&
      credentials.password === defaultAdmin.password
    ) {
      user.value = { name: defaultAdmin.name }
      isAuthenticated.value = true
      localStorage.setItem("token", "fake-jwt-token") // Lưu token giả lập
    } else {
      throw new Error("Thông tin đăng nhập không chính xác")
    }
  }

  // Hàm đăng xuất
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem("token")
    router.push("/")
  }

  // Kiểm tra trạng thái đăng nhập khi tải lại trang
  const checkAuth = () => {
    const token = localStorage.getItem("token")
    if (token) {
      user.value = { name: defaultAdmin.name }
      isAuthenticated.value = true
    } else {
      logout()
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
