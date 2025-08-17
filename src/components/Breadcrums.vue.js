/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useRoute } from 'vue-router';
import { splitPath, uppercasedFirstWord } from '../utils/main';
const route = useRoute();
const currentPath = splitPath(route.path);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-5 mb-7 block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "breadcrumbs",
    ...{ class: "mb-2 flex flex-wrap items-center gap-2" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "",
    ...{ class: "breadcrumbs-nav-first font-inter text-[16px] leading-normal font-normal text-[#464661]" },
}));
const __VLS_2 = __VLS_1({
    to: "",
    ...{ class: "breadcrumbs-nav-first font-inter text-[16px] leading-normal font-normal text-[#464661]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
const __VLS_4 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    to: "",
    ...{ class: "font-inter text-[16px] leading-normal font-bold text-[#464661]" },
}));
const __VLS_6 = __VLS_5({
    to: "",
    ...{ class: "font-inter text-[16px] leading-normal font-bold text-[#464661]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
(__VLS_ctx.uppercasedFirstWord(__VLS_ctx.currentPath));
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-7']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumbs-nav-first']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            uppercasedFirstWord: uppercasedFirstWord,
            currentPath: currentPath,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Breadcrums.vue.js.map