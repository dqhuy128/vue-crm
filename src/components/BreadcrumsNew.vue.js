/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref } from 'vue';
import PageTitle from './PageTitle.vue';
const breadcrumbsList = ref([
    {
        name: 'Home',
    },
]);
const props = defineProps();
breadcrumbsList.value.push({
    name: props.name,
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "my-4 block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "breadcrumbs",
    ...{ class: "flex flex-wrap items-center gap-2" },
});
for (const [n, idx] of __VLS_getVForSourceType((__VLS_ctx.breadcrumbsList))) {
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: "",
        ...{ class: ([
                idx === 0
                    ? 'breadcrumbs-nav-first font-inter text-[16px] leading-normal font-normal text-[#464661]'
                    : 'font-inter text-[16px] leading-normal font-bold text-[#464661]',
            ]) },
    }));
    const __VLS_2 = __VLS_1({
        to: "",
        ...{ class: ([
                idx === 0
                    ? 'breadcrumbs-nav-first font-inter text-[16px] leading-normal font-normal text-[#464661]'
                    : 'font-inter text-[16px] leading-normal font-bold text-[#464661]',
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    (n.name);
    var __VLS_3;
}
/** @type {[typeof PageTitle, typeof PageTitle, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(PageTitle, new PageTitle({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
var __VLS_7 = {};
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
// @ts-ignore
var __VLS_8 = __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PageTitle: PageTitle,
            breadcrumbsList: breadcrumbsList,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=BreadcrumsNew.vue.js.map