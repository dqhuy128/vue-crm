// import { createPinia } from 'pinia'
import '@/assets/sass/style.scss';
import '@/style.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createAuth } from 'vue-auth3';
import driverAuthBearer from 'vue-auth3/drivers/auth/bearer';
import driverHttpAxios from 'vue-auth3/drivers/http/axios';
import VueTippy from 'vue-tippy';
import App from './App.vue';
import router from './router';
const app = createApp(App);
const pinia = createPinia();
const auth = createAuth({
    plugins: {
        router,
    },
    drivers: {
        auth: driverAuthBearer,
        http: driverHttpAxios,
    },
    fetchData: { enabled: true },
    stores: ['storage', 'cookie'],
});
app.use(VueTippy, 
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
        theme: 'light',
    }, // => Global default options * see all props
});
app.use(pinia);
app.use(router).use(auth).mount('#app');
//# sourceMappingURL=main.js.map