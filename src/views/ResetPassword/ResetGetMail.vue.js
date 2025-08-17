/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { apiUri } from '@/constants/apiUri';
import router from '@/router';
import { calcBgBefore } from '../../lib/index';
const email = ref('');
const handleEmailChange = async () => {
    const formData = new FormData();
    formData.append('email', email.value);
    try {
        const response = await axios.post(`${apiUri}/user/forgotpass`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const { errors } = response.data;
        if (errors) {
            alert(errors);
            return;
        }
        router.push({
            name: 'ResetGetOtp',
            query: { email: email.value },
        });
        console.log('🚀 ~ handleEmailChange ~ response:', response);
    }
    catch (error) {
        console.log(error);
    }
};
// const emit = defineEmits(['handleStep'])
onMounted(() => {
    calcBgBefore();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "after:content-[] relative flex h-[100vh] w-full flex-col items-center justify-center bg-[#E9F0F4] after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:h-full after:w-full after:bg-[url(./assets/images/svg-login.svg)] after:bg-auto after:bg-right-bottom after:bg-no-repeat" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "rectangleLogin",
    ...{ class: "pointer-events-none fixed top-0 bottom-0 left-0 h-[100vh] bg-white max-md:hidden" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-[15px] w-[calc(100%-30px)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "formLoginIndex",
    ...{ class: "relative z-[1] m-auto h-full max-h-[616px] w-full max-w-[865px] overflow-hidden rounded-[24px] shadow-[15px_21px_33px_0px_rgba(0,0,0,0.15)]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex h-full flex-row flex-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "formLoginStart",
    ...{ class: "w-full bg-[#E9F0F4] md:w-[31%]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex h-full flex-col p-4 md:px-[25px] md:py-[60px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto w-full max-w-[110px] md:mb-[45px] md:max-w-[161px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/logo-login.png",
    ...{ class: "h-auto max-w-full object-scale-down" },
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-main font-inter mb-8 hidden text-end text-[20px]/[33px] font-bold uppercase md:block lg:pe-[25px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto mt-auto hidden w-full md:block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/login-frame.svg",
    ...{ class: "h-auto max-w-full object-scale-down" },
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "w-full bg-white md:w-[69%]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto flex h-full max-w-[430px] flex-col items-center justify-center max-md:p-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-main font-inter mb-[50px] text-center text-[16px] leading-normal font-bold uppercase" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (...[$event]) => {
            __VLS_ctx.handleEmailChange();
        } },
    action: "",
    ...{ class: "block w-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-10 block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "formEmail",
    name: "formEmail",
    placeholder: "Nhập email",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
(__VLS_ctx.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "button",
    ...{ class: "absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/majesticons_mail-line.svg",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "bg-main hover:shadow-hoverinset block w-full cursor-pointer rounded-[8px] p-2.5 text-center text-[16px] leading-normal font-bold !text-white !uppercase transition hover:transition" },
    ...{ class: ({
            'pointer-events-auto opacity-100': __VLS_ctx.email,
            'pointer-events-none opacity-50': !__VLS_ctx.email,
        }) },
});
/** @type {__VLS_StyleScopedClasses['after:content-[]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#E9F0F4]']} */ ;
/** @type {__VLS_StyleScopedClasses['after:pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['after:absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['after:right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['after:bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['after:h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['after:w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['after:bg-[url(./assets/images/svg-login.svg)]']} */ ;
/** @type {__VLS_StyleScopedClasses['after:bg-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['after:bg-right-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['after:bg-no-repeat']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-[15px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[calc(100%-30px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[1]']} */ ;
/** @type {__VLS_StyleScopedClasses['m-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[616px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[865px]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[15px_21px_33px_0px_rgba(0,0,0,0.15)]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#E9F0F4]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[31%]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-[25px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-[60px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[110px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:mb-[45px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:max-w-[161px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-scale-down']} */ ;
/** @type {__VLS_StyleScopedClasses['text-main']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[20px]/[33px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:pe-[25px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-scale-down']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[69%]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[430px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-main']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-[50px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-main']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000]']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:italic']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:opacity-75']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['right-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-main']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['!uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:transition']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            email: email,
            handleEmailChange: handleEmailChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ResetGetMail.vue.js.map