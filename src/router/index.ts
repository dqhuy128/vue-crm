import { createRouter, createWebHistory } from "vue-router"
import LoginView from "../views/Login/IndexView.vue"
import GetMailView from "../views/Login/GetMailView.vue"
import GetOtpView from "../views/Login/GetOtpView.vue"
import SetPasswordView from "../views/Login/SetPasswordView.vue"
import DashboardPersonal from "../views/DashboardPersonal.vue"
import DashboardReport from "../views/DashboardReport.vue"
import SystemAdminUser from "../views/SystemAdminUser.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView
    },
    {
      path: "/getpass-mail",
      name: "getmail",
      component: GetMailView
    },
    {
      path: "/getpass-otp",
      name: "getotp",
      component: GetOtpView
    },
    {
      path: "/setpass",
      name: "setpass",
      component: SetPasswordView
    },
    {
      path: "/dashboard/personal",
      name: "dashboard-personal",
      component: DashboardPersonal
    },
    {
      path: "/dashboard/report",
      name: "dashboard-report",
      component: DashboardReport
    },
    {
      path: "/systemadmin-user",
      name: "systemadmin-user",
      component: SystemAdminUser
    },
    {
      path: "/permit",
      name: "permit",
      component: () => import("../views/PermitView.vue")
    }
  ]
})

export default router
