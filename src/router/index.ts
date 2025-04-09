import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login/Login.vue'
import RegisterView from '@/views/Register/Register.vue'
import ResetPassView from '@/views/ResetPassword/ResetView.vue'
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
      path: '/reset-password',
      name: 'ResetPass',
      component: ResetPassView,
      meta: { auth: false }
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
