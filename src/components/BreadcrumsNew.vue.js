import PageTitle from "./PageTitle.vue";
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block mt-5 mb-7" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "breadcrumbs",
    ...{ class: "flex flex-wrap items-center gap-2 mb-2" },
});
for (const [n, idx] of __VLS_getVForSourceType((props.breadcrumbList))) {
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: (n.path),
        ...{ class: ([
                idx === 0
                    ? 'breadcrumbs-nav-first text-[#464661] font-inter text-[16px] font-normal leading-normal'
                    : 'text-[#464661] font-inter text-[16px] font-bold leading-normal'
            ]) },
    }));
    const __VLS_2 = __VLS_1({
        to: (n.path),
        ...{ class: ([
                idx === 0
                    ? 'breadcrumbs-nav-first text-[#464661] font-inter text-[16px] font-normal leading-normal'
                    : 'text-[#464661] font-inter text-[16px] font-bold leading-normal'
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
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-7']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
// @ts-ignore
var __VLS_8 = __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PageTitle: PageTitle,
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
