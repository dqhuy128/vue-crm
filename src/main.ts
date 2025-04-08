import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTippy from 'vue-tippy'
// import { createPinia } from 'pinia'
import '@/style.css'
import '@/assets/sass/style.scss'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import { createAuth } from 'vue-auth3'
import driverAuthBasic from 'vue-auth3/drivers/auth/basic'
import driverAuthBearer from 'vue-auth3/drivers/auth/bearer'
import driverHttpAxios from 'vue-auth3/drivers/http/axios'

const app = createApp(App)
// const pinia = createPinia()

const auth = createAuth({
  plugins: {
    router
  },
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios
  }
})

app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      placement: 'top',
      allowHTML: true,
      arrow: false,
      interactive: true,
      animation: 'fade',
      theme: 'light'
    } // => Global default options * see all props
  }
)

// app.use(pinia)
app.use(router).use(auth).mount('#app')
