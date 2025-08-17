/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale/vi';
import { onMounted, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
const auth = useAuth();
const emit = defineEmits(['post-request-edit']);
const props = defineProps();
const datepicker = ref(null);
const startDate = ref(null);
const endDate = ref(null);
datepicker.value = [startDate.value, endDate.value];
const updateDates = () => {
    if (datepicker.value) {
        paramsLeaveEdit.begin_date = format(datepicker.value[0], 'yyyy-MM-dd');
        paramsLeaveEdit.finish_date = format(datepicker.value[1], 'yyyy-MM-dd');
        // paramsLeaveEdit.begin_date = startDate
        // paramsLeaveEdit.finish_date = endDate
    }
};
watch(datepicker, () => {
    if (auth.check()) {
        updateDates();
    }
});
watch(() => props.datatype, (newVal) => {
    const { id } = newVal.data;
    const { begin_date } = newVal.data;
    const { finish_date } = newVal.data;
    const { reason } = newVal.data;
    startDate.value = begin_date.toString();
    endDate.value = finish_date.toString();
    datepicker.value = [startDate.value, endDate.value];
    paramsLeaveEdit.id = id.toString();
    paramsLeaveEdit.begin_date = begin_date.toString();
    paramsLeaveEdit.finish_date = finish_date.toString();
    paramsLeaveEdit.reason = reason.toString();
});
const paramsLeaveEdit = reactive({
    id: '',
    begin_date: '',
    finish_date: '',
    reason: '',
});
const postRequestEdit = ref(null);
const onSubmitting = ref(false);
const submitEditLeave = async () => {
    onSubmitting.value = true;
    try {
        const formData = new FormData();
        formData.append('id', paramsLeaveEdit.id);
        formData.append('begin_date', paramsLeaveEdit.begin_date);
        formData.append('finish_date', paramsLeaveEdit.finish_date);
        formData.append('reason', paramsLeaveEdit.reason);
        const res = await axios.post(`${apiUri}/leave/update`, formData, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        datepicker.value = [null, null];
        startDate.value = null;
        endDate.value = null;
        paramsLeaveEdit.reason = null;
        paramsLeaveEdit.begin_date = null;
        paramsLeaveEdit.finish_date = null;
        props.propFunction();
        postRequestEdit.value = res.data;
        emit('post-request-edit', postRequestEdit.value);
        console.log('🚀 ~ postAddLeave ~ res:', postRequestEdit.value);
    }
    catch (error) {
        console.log('🚀 ~ postAddLeave ~ error:', error);
    }
    finally {
        onSubmitting.value = false;
    }
};
onMounted(() => {
    if (auth.check()) {
        updateDates();
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.submitEditLeave) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_0 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.datepicker),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    range: true,
    format: "dd/MM/yyyy",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.datepicker),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    range: true,
    format: "dd/MM/yyyy",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    'onUpdate:modelValue': (__VLS_ctx.updateDates)
};
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
    id: "",
    value: (__VLS_ctx.paramsLeaveEdit.reason),
    name: "",
    placeholder: "Nhập mô tả",
    ...{ class: "font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6" },
});
var __VLS_8 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
    ...{ class: ({ 'pointer-events-none opacity-75': __VLS_ctx.onSubmitting }) },
});
if (__VLS_ctx.onSubmitting) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" },
    });
    const __VLS_10 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }));
    const __VLS_12 = __VLS_11({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-main']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[120px]']} */ ;
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
/** @type {__VLS_StyleScopedClasses['placeholder:opacity-75']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-9']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-main']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-main']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-sha']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:transition']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:grow']} */ ;
/** @type {__VLS_StyleScopedClasses['md:min-w-[175px]']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-75']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-x-[-50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-[-50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-square']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            VueDatePicker: VueDatePicker,
            vi: vi,
            datepicker: datepicker,
            updateDates: updateDates,
            paramsLeaveEdit: paramsLeaveEdit,
            onSubmitting: onSubmitting,
            submitEditLeave: submitEditLeave,
        };
    },
    emits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ModalEditLeave.vue.js.map