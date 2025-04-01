import { createRouter, createWebHistory } from "vue-router"
import LoginView from "../views/Login/IndexView.vue"
import GetMailView from "../views/Login/GetMailView.vue"
import GetOtpView from "../views/Login/GetOtpView.vue"
import SetPasswordView from "../views/Login/SetPasswordView.vue"
import DashboardPersonal from "../views/DashboardPersonal.vue"
import DashboardReport from "../views/DashboardReport.vue"
import SystemUser from "../views/SystemAdmin/User.vue"
import SystemPermission from "../views/SystemAdmin/Permission.vue"
import SystemCateManagement from "../views/SystemAdmin/CateManagement.vue"
import MageDashboard from "@/assets/images/mage_dashboard.svg"
// import FluentData from "@/assets/images/fluent_data-pie-24-regular.svg"
// import FluentNote from "@/assets/images/fluent_note-24-regular.svg"
// import Iconoir from "@/assets/images/iconoir_timer-off.svg"
// import Proicons from "@/assets/images/proicons_timer.svg"

const router = createRouter({
  history: createWebHistory(),
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
      component: DashboardPersonal,
      meta: {
        icon: MageDashboard,
        title: "Dashboard",
        nav: false
      }
    },
    {
      path: "/dashboard/report",
      name: "dashboard-report",
      component: DashboardReport
    },
    {
      path: "/systemadmin-user",
      name: "systemadmin-user",
      component: SystemUser
    },
    {
      path: "/systemadmin-permission",
      name: "systemadmin-permission",
      component: SystemPermission
    },
    {
      path: "/systemadmin-management",
      name: "systemadmin-management",
      component: SystemCateManagement
    },
    {
      path: "/permit",
      name: "permit",
      component: () => import("../views/PermitView.vue")
    }
  ]
})

export default router
