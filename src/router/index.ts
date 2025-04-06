import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login/Login.vue'
import RegisterView from '@/views/Login/Register.vue'
import GetMailView from '@/views/Login/GetMailView.vue'
import GetOtpView from '@/views/Login/GetOtpView.vue'
import SetPasswordView from '@/views/Login/SetPasswordView.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import DashboardPersonal from '@/views/Dashboard/DashboardPersonal.vue'
import DashboardReport from '@/views/Dashboard/DashboardReport.vue'
import SystemView from '@/views/SystemAdmin/SystemAdmin.vue'
import SystemUser from '@/views/SystemAdmin/User.vue'
import SystemPermission from '@/views/SystemAdmin/Permission.vue'
import SystemCateManagement from '@/views/SystemAdmin/CateManagement.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/getpass-mail',
      name: 'GetMail',
      component: GetMailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/getpass-otp',
      name: 'GetOtp',
      component: GetOtpView,
      meta: { requiresAuth: true }
    },
    {
      path: '/setpass',
      name: 'SetPassword',
      component: SetPasswordView,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'personal',
          name: 'Personal',
          component: DashboardPersonal
        },
        {
          path: 'report',
          name: 'Report',
          component: DashboardReport
        }
      ]
    },
    {
      path: '/system',
      name: 'System',
      component: SystemView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'user',
          name: 'SystemUser',
          component: SystemUser
        },
        {
          path: 'permission',
          name: 'SystemPermission',
          component: SystemPermission
        },
        {
          path: 'management',
          name: 'SystemManagement',
          component: SystemCateManagement
        }
      ]
    },
    {
      path: '/permit',
      name: 'Permit',
      component: () => import('../views/PermitView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
