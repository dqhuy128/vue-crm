/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted } from 'vue';
import { calculateMainLayout, toggleSidebar } from '@/utils/main';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
onMounted(() => {
    calculateMainLayout();
    toggleSidebar();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex min-h-[100vh] flex-col bg-[#E9F0F4]" },
});
/** @type {[typeof Sidebar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "MainLayout",
    ...{ class: "main-layout block px-6 py-7" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col lg:h-[calc(100vh-75px)]" },
});
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
var __VLS_6 = {};
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[100vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#E9F0F4]']} */ ;
/** @type {__VLS_StyleScopedClasses['main-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-7']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:h-[calc(100vh-75px)]']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            Sidebar: Sidebar,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MainLayout.vue.js.map