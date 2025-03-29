import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Breadcrums from "../components/BreadcrumsNew.vue";
import Sidebar from "../components/Sidebar.vue";
import { calculateMainLayout, toggleSidebar } from "@/utils/main";
onMounted(() => {
    calculateMainLayout();
    toggleSidebar();
});
const breadcrumbsList = ref([
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Dashboard",
        path: "/dashboard"
    }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "py-7 px-6 bg-[#E9F0F4] min-h-[100vh] flex flex-col items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-wrap w-full h-full gap-6" },
});
/** @type {[typeof Sidebar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "MainLayout",
    ...{ class: "main-layout grow" },
});
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {[typeof Breadcrums, typeof Breadcrums, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(Breadcrums, new Breadcrums({
    breadcrumbList: (__VLS_ctx.breadcrumbsList),
    path: "/",
}));
const __VLS_7 = __VLS_6({
    breadcrumbList: (__VLS_ctx.breadcrumbsList),
    path: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.PageTitle;
/** @type {[typeof __VLS_components.PageTitle, typeof __VLS_components.PageTitle, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
var __VLS_12;
var __VLS_8;
var __VLS_13 = {};
/** @type {__VLS_StyleScopedClasses['py-7']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#E9F0F4]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[100vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['main-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
// @ts-ignore
var __VLS_14 = __VLS_13;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            Breadcrums: Breadcrums,
            Sidebar: Sidebar,
            breadcrumbsList: breadcrumbsList,
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
