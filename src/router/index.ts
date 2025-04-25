import Dashboard from '@/views/Dashboard/Dashboard.vue'
import DashboardPersonal from '@/views/Dashboard/DashboardPersonal.vue'
import DashboardReport from '@/views/Dashboard/DashboardReport.vue'
import Document from '@/views/Document/Document.vue'
import LeaveAccess from '@/views/Leave/Access.vue'
import LeaveIndex from '@/views/Leave/IndexView.vue'
import LeaveInfo from '@/views/Leave/Info.vue'
import LoginView from '@/views/Login/Login.vue'
import RegisterView from '@/views/Register/Register.vue'
import ResetGetOtp from '@/views/ResetPassword/ResetGetOtp.vue'
import ResetGetPass from '@/views/ResetPassword/ResetGetPass.vue'
import ResetPassView from '@/views/ResetPassword/ResetView.vue'
import SystemAdmin from '@/views/SystemAdmin/Admin.vue'
import SystemCategory from '@/views/SystemAdmin/Category.vue'
import SystemIndexView from '@/views/SystemAdmin/IndexView.vue'
import SystemPermission from '@/views/SystemAdmin/Permission.vue'
import SystemUser from '@/views/SystemAdmin/User.vue'
import TimekeepingExplain from '@/views/Timekeeping/Explain.vue'
import TimekeepingHistory from '@/views/Timekeeping/History.vue'
import TimekeepingIndex from '@/views/Timekeeping/IndexView.vue'
import { useAuth } from 'vue-auth3'
import { createRouter, createWebHistory } from 'vue-router'
const auth = useAuth()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'Personal' }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { auth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { auth: false }
    },
    {
      path: '/reset-password',
      name: 'ResetPass',
      component: ResetPassView,
      meta: { auth: false }
    },
    {
      path: '/get-otp',
      name: 'ResetGetOtp',
      component: ResetGetOtp,
      meta: { auth: false }
    },
    {
      path: '/get-pass',
      name: 'ResetGetPass',
      component: ResetGetPass,
      meta: { auth: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { auth: true, accessRole: 'Admin' },
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
      component: SystemIndexView,
      meta: { auth: true, accessRole: 'Admin' },
      children: [
        {
          path: 'admin',
          name: 'SystemAdmin',
          component: SystemAdmin
        },
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
          path: 'category',
          name: 'SystemCategory',
          component: SystemCategory
        }
      ]
    },
    {
      path: '/leave',
      name: 'Leave',
      component: LeaveIndex,
      meta: { auth: true, accessRole: 'Admin' },
      children: [
        {
          path: 'info',
          name: 'Info',
          component: LeaveInfo
        },
        {
          path: 'access',
          name: 'Access',
          component: LeaveAccess
        }
      ]
    },
    {
      path: '/time-keeping',
      name: 'TimeKeeping',
      component: TimekeepingIndex,
      meta: { auth: true, accessRole: 'Admin' },
      children: [
        {
          path: 'history',
          name: 'History',
          component: TimekeepingHistory
        },
        {
          path: 'explain',
          name: 'Explain',
          component: TimekeepingExplain
        }
      ]
    },
    {
      path: '/document',
      name: 'Document',
      component: Document,
      meta: { auth: true }
    }
    // {
    //   path: '/permit',
    //   name: 'Permit',
    //   component: () => import('../views/PermitView.vue')
    // }

    // {
    //   path: '/admin',
    //   name: 'Admin',
    //   component: () => import('../views/Admin.vue'),
    //   meta: {
    //     auth: {
    //       roles: ['admin'], // Chỉ cho phép người dùng có role 'admin'
    //       forbiddenRedirect: '/unauthorized'
    //     }
    //   }
    // },
  ]
})

export default router
