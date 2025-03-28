import Buttons from "../components/Buttons.vue";
import MainLayout from "../views/MainLayout.vue";
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof MainLayout, typeof MainLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MainLayout, new MainLayout({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
/** @type {[typeof Buttons, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(Buttons, new Buttons({
    title: (`active`),
}));
const __VLS_5 = __VLS_4({
    title: (`active`),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
var __VLS_7 = {};
var __VLS_2;
// @ts-ignore
var __VLS_8 = __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Buttons: Buttons,
            MainLayout: MainLayout,
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
