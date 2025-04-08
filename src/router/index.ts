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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
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
      path: '/getpass-mail',
      name: 'GetMail',
      component: GetMailView,
      meta: { auth: false }
    },
    {
      path: '/getpass-otp',
      name: 'GetOtp',
      component: GetOtpView,
      meta: { auth: false }
    },
    {
      path: '/setpass',
      name: 'SetPassword',
      component: SetPasswordView,
      meta: { auth: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { auth: true },
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
      meta: { auth: true },
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
