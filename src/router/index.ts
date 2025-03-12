import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import DashboardPersonal from "../views/DashboardPersonal.vue"
import DashboardReport from "../views/DashboardReport.vue"
import SystemAdminUser from "../views/SystemAdminUser.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
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
