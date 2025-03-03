import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import DashboardPersonal from "../views/DashboardPersonal.vue"
import DashboardReport from "../views/DashboardReport.vue"

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
    }
  ]
})

export default router
