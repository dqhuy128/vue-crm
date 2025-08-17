/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import '@vuepic/vue-datepicker/dist/main.css';
import { Icon } from '@iconify/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale/vi';
import { computed, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
const auth = useAuth();
const token = auth.token();
const session = auth.check();
const emit = defineEmits(['post-request-edit']);
const props = defineProps();
const postRequest = ref(null);
const onSubmitting = ref(false);
const paramsOvertime = reactive({
    id: '',
    date: '',
    begin_time: '',
    finish_time: '',
    name: '',
    type: '',
    reason: '',
});
const datepicker = ref(null);
const startDate = new Date(new Date());
datepicker.value = startDate;
paramsOvertime.date = format(startDate, 'yyyy-MM-dd');
const updateDates = () => {
    const value = datepicker.value;
    if (!value)
        return;
    if (Array.isArray(value)) {
        const first = value[0];
        if (first)
            paramsOvertime.date = format(first, 'yyyy-MM-dd');
    }
    else if (value instanceof Date) {
        paramsOvertime.date = format(value, 'yyyy-MM-dd');
    }
};
watch(datepicker, () => {
    if (auth.check()) {
        updateDates();
    }
});
const parseTimeStringToObj = (value) => {
    if (!value)
        return undefined;
    const [h, m] = value.split(':').map((v) => Number(v));
    if (Number.isNaN(h) || Number.isNaN(m))
        return undefined;
    return { hours: h, minutes: m };
};
const timeStringToMinutes = (value) => {
    const obj = parseTimeStringToObj(value);
    if (!obj)
        return undefined;
    return obj.hours * 60 + obj.minutes;
};
const formatToHHmm = (value) => {
    if (value === undefined || value === null)
        return '';
    const raw = value.toString().trim();
    // Accept: HH:mm or HH:mm:ss; return first 5 chars when pattern matches
    const match = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (match) {
        const h = match[1].padStart(2, '0');
        const m = match[2];
        return `${h}:${m}`;
    }
    // Fallback: attempt to split and take first two parts
    const parts = raw.split(':');
    if (parts.length >= 2) {
        return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
    }
    return raw;
};
const beginTimeObj = computed(() => parseTimeStringToObj(paramsOvertime.begin_time));
const finishTimeObj = computed(() => parseTimeStringToObj(paramsOvertime.finish_time));
// Keep finish_time >= begin_time
watch(() => [paramsOvertime.begin_time, paramsOvertime.finish_time], ([begin, finish]) => {
    const b = timeStringToMinutes(begin);
    const f = timeStringToMinutes(finish);
    if (b !== undefined && f !== undefined && f < b) {
        paramsOvertime.finish_time = begin;
    }
});
const handleUpdateOvertime = async () => {
    onSubmitting.value = true;
    if (session) {
        const formData = new FormData();
        if (paramsOvertime.id)
            formData.append('id', paramsOvertime.id);
        formData.append('reason', paramsOvertime.reason);
        formData.append('date', paramsOvertime.date);
        formData.append('begin_time', paramsOvertime.begin_time);
        formData.append('finish_time', paramsOvertime.finish_time);
        const res = await axios
            .post(`${apiUri}/orvertime/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
            if (res.data.errors.input) {
                const { message } = res.data;
                const { input } = res.data.errors;
                alert(message + '. ' + input);
                return;
            }
            postRequest.value = res.data;
            emit('post-request-edit', postRequest.value);
            props.propFunction();
        })
            .catch((err) => {
            console.log('handleUpdateOvertime ~ err', err);
        })
            .finally(() => {
            onSubmitting.value = false;
        });
    }
};
// Sync incoming data from parent (similar to ModalCategoryUpdate behavior)
watch(() => props.datatype, (newVal) => {
    if (!newVal || !newVal.data)
        return;
    const { id, date, begin_time, finish_time, reason } = newVal.data;
    paramsOvertime.id = id?.toString?.() ?? String(id ?? '');
    paramsOvertime.date = date?.toString?.() ?? String(date ?? '');
    paramsOvertime.begin_time = formatToHHmm(begin_time);
    paramsOvertime.finish_time = formatToHHmm(finish_time);
    paramsOvertime.reason = reason?.toString?.() ?? String(reason ?? '');
    // Initialize datepicker value using provided date
    try {
        if (paramsOvertime.date) {
            const parts = paramsOvertime.date.split('-').map((n) => Number(n));
            // yyyy-MM-dd → new Date(y, m-1, d)
            if (parts.length === 3) {
                datepicker.value = new Date(parts[0], parts[1] - 1, parts[2]);
            }
        }
    }
    catch (e) {
        // noop if parsing fails
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleUpdateOvertime) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-[0_0_calc((100%-16px)/2)] max-lg:w-[calc(50%-4px)] max-lg:flex-[0_0_calc(50%-4px)] max-md:w-[calc(100%)] max-md:flex-[0_0_calc(100%)]" },
});
const __VLS_0 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.datepicker),
    ...{ class: "work-history-datepicker" },
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd/MM/yyyy",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.datepicker),
    ...{ class: "work-history-datepicker" },
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
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
    ...{ class: "col-span-12 md:col-span-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-6" },
});
const __VLS_8 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    modelValue: (__VLS_ctx.paramsOvertime.begin_time),
    ...{ class: "work-history-datepicker timepicker-sm" },
    timePicker: true,
    modelType: "HH:mm",
    is24: (true),
    enableSeconds: (false),
    minutesIncrement: (5),
    placeholder: "Từ",
    autoApply: true,
    actionRow: ({ showNow: false, showPreview: false }),
    config: ({ modeHeight: 160, keepActionRow: false }),
    maxTime: (__VLS_ctx.finishTimeObj || undefined),
}));
const __VLS_10 = __VLS_9({
    modelValue: (__VLS_ctx.paramsOvertime.begin_time),
    ...{ class: "work-history-datepicker timepicker-sm" },
    timePicker: true,
    modelType: "HH:mm",
    is24: (true),
    enableSeconds: (false),
    minutesIncrement: (5),
    placeholder: "Từ",
    autoApply: true,
    actionRow: ({ showNow: false, showPreview: false }),
    config: ({ modeHeight: 160, keepActionRow: false }),
    maxTime: (__VLS_ctx.finishTimeObj || undefined),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-6" },
});
const __VLS_12 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.paramsOvertime.finish_time),
    ...{ class: "work-history-datepicker timepicker-sm" },
    timePicker: true,
    modelType: "HH:mm",
    is24: (true),
    enableSeconds: (false),
    minutesIncrement: (5),
    placeholder: "Đến",
    autoApply: true,
    actionRow: ({ showNow: false, showPreview: false }),
    config: ({ modeHeight: 160, keepActionRow: false }),
    minTime: (__VLS_ctx.beginTimeObj || undefined),
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.paramsOvertime.finish_time),
    ...{ class: "work-history-datepicker timepicker-sm" },
    timePicker: true,
    modelType: "HH:mm",
    is24: (true),
    enableSeconds: (false),
    minutesIncrement: (5),
    placeholder: "Đến",
    autoApply: true,
    actionRow: ({ showNow: false, showPreview: false }),
    config: ({ modeHeight: 160, keepActionRow: false }),
    minTime: (__VLS_ctx.beginTimeObj || undefined),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
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
    value: (__VLS_ctx.paramsOvertime.reason),
    name: "",
    placeholder: "Nhập lý do",
    ...{ class: "font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6" },
});
var __VLS_16 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase hover:transition max-md:grow md:min-w-[175px]" },
    ...{ class: ({ 'pointer-events-none opacity-75': __VLS_ctx.onSubmitting }) },
});
if (__VLS_ctx.onSubmitting) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" },
    });
    const __VLS_18 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }));
    const __VLS_20 = __VLS_19({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-[0_0_calc((100%-16px)/2)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:w-[calc(50%-4px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:flex-[0_0_calc(50%-4px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:w-[calc(100%)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:flex-[0_0_calc(100%)]']} */ ;
/** @type {__VLS_StyleScopedClasses['work-history-datepicker']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['work-history-datepicker']} */ ;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['work-history-datepicker']} */ ;
/** @type {__VLS_StyleScopedClasses['timepicker-sm']} */ ;
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
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
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
var __VLS_17 = __VLS_16;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Icon: Icon,
            VueDatePicker: VueDatePicker,
            vi: vi,
            onSubmitting: onSubmitting,
            paramsOvertime: paramsOvertime,
            datepicker: datepicker,
            updateDates: updateDates,
            beginTimeObj: beginTimeObj,
            finishTimeObj: finishTimeObj,
            handleUpdateOvertime: handleUpdateOvertime,
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
//# sourceMappingURL=ModalUpdateOvertime.vue.js.map