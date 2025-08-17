/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { RouterView } from 'vue-router';
import router from '@/router';
import { usePermissionStore } from '@/store/permission';
const permissionStore = usePermissionStore();
const { permissionList } = storeToRefs(permissionStore);
const auth = useAuth();
onMounted(() => {
    if (auth.check()) {
        const res = permissionList.value.includes('User') ? true : false;
        if (!res) {
            console.log(' access denied ');
            // router.push('/')
        }
    }
});
const checkPermission = ref(false);
watch(permissionList, () => {
    console.log('🚀 ~ //onMounted ~ permissionList: Leave', permissionList.value.includes('Leave'));
    if (auth.check()) {
        checkPermission.value = permissionList.value.includes('Leave') ? true : false;
        if (!checkPermission.value) {
            alert('Bạn không có quyền truy cập vào trang này');
            router.push({ name: 'NotFound404' });
        }
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterView: RouterView,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=IndexView.vue.js.map