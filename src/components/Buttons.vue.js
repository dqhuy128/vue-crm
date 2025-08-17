/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useRoute } from 'vue-router';
import { splitPath } from '../utils/main';
const route = useRoute();
// Get the current path
const currentPath = route.path;
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "buttonList",
    ...{ class: "inline-flex flex-wrap items-center gap-1 rounded-[8px]" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: (`${__VLS_ctx.splitPath(__VLS_ctx.currentPath)}/personal`),
    ...{ class: "font-inter rounded-[8px] bg-white px-9 py-2.5 text-[16px] leading-normal font-bold text-[#909090] transition hover:bg-[#1b4dea] hover:text-white" },
    ...{ class: ([__VLS_ctx.currentPath == '/dashboard/personal' ? __VLS_ctx.title : '']) },
}));
const __VLS_2 = __VLS_1({
    to: (`${__VLS_ctx.splitPath(__VLS_ctx.currentPath)}/personal`),
    ...{ class: "font-inter rounded-[8px] bg-white px-9 py-2.5 text-[16px] leading-normal font-bold text-[#909090] transition hover:bg-[#1b4dea] hover:text-white" },
    ...{ class: ([__VLS_ctx.currentPath == '/dashboard/personal' ? __VLS_ctx.title : '']) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
const __VLS_4 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    to: (`${__VLS_ctx.splitPath(__VLS_ctx.currentPath)}/report`),
    ...{ class: "font-inter rounded-[8px] bg-white px-9 py-2.5 text-[16px] leading-normal font-bold text-[#909090] transition hover:bg-[#1b4dea] hover:text-white" },
    ...{ class: ([__VLS_ctx.currentPath == '/dashboard/report' ? __VLS_ctx.title : '']) },
}));
const __VLS_6 = __VLS_5({
    to: (`${__VLS_ctx.splitPath(__VLS_ctx.currentPath)}/report`),
    ...{ class: "font-inter rounded-[8px] bg-white px-9 py-2.5 text-[16px] leading-normal font-bold text-[#909090] transition hover:bg-[#1b4dea] hover:text-white" },
    ...{ class: ([__VLS_ctx.currentPath == '/dashboard/report' ? __VLS_ctx.title : '']) },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-9']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#1b4dea]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-9']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#1b4dea]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            splitPath: splitPath,
            currentPath: currentPath,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Buttons.vue.js.map