import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import "./assets/sass/style.scss"
import VueTippy from "vue-tippy"
import "tippy.js/dist/tippy.css"
import "tippy.js/themes/light.css"

const app = createApp(App)
app.use(router)
app.use(
  VueTippy,
  // optional
  {
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
    componentSingleton: "tippy-singleton", // => <tippy-singleton/>,
    defaultProps: {
      placement: "top",
      allowHTML: true,
      arrow: false,
      interactive: true,
      animation: "fade",
      theme: "light"
    } // => Global default options * see all props
  }
)
app.mount("#app")
