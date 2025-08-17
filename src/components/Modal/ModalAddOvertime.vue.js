/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import '@vuepic/vue-datepicker/dist/main.css';
import { Icon } from '@iconify/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale/vi';
import { SelectContent, SelectGroup, SelectItem, SelectItemText, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue, SelectViewport, } from 'radix-vue';
import { computed, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
const auth = useAuth();
const token = auth.token();
const session = auth.check();
const emit = defineEmits(['post-request']);
const props = defineProps();
const postRequest = ref(null);
const onSubmitting = ref(false);
const paramsOvertime = reactive({
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
const handleCreateOvertime = async () => {
    onSubmitting.value = true;
    if (session) {
        const formData = new FormData();
        formData.append('name', paramsOvertime.name);
        formData.append('type', paramsOvertime.type);
        formData.append('description', paramsOvertime.reason);
        // Pass overtime params as requested
        formData.append('date', paramsOvertime.date);
        formData.append('begin_time', paramsOvertime.begin_time);
        formData.append('finish_time', paramsOvertime.finish_time);
        const res = await axios
            .post(`${apiUri}/categories/create`, formData, {
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
            paramsOvertime.name = '';
            paramsOvertime.reason = '';
            postRequest.value = res.data;
            emit('post-request', postRequest.value);
            props.propFunction();
        })
            .catch((err) => {
            console.log('handleCreateCategory ~ err', err);
        })
            .finally(() => {
            onSubmitting.value = false;
        });
    }
};
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
    ...{ onSubmit: (__VLS_ctx.handleCreateOvertime) },
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
const __VLS_0 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.paramsOvertime.type),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.paramsOvertime.type),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_6 = __VLS_5({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "font-inter grow text-start text-[16px] leading-normal font-normal" },
    placeholder: "Chọn mã nhân viên",
}));
const __VLS_10 = __VLS_9({
    ...{ class: "font-inter grow text-start text-[16px] leading-normal font-normal" },
    placeholder: "Chọn mã nhân viên",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_14 = __VLS_13({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_7;
const __VLS_16 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_22 = __VLS_21({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    icon: "radix-icons:chevron-up",
}));
const __VLS_30 = __VLS_29({
    icon: "radix-icons:chevron-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
const __VLS_32 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
for (const [item, key] of __VLS_getVForSourceType((__VLS_ctx.datatype))) {
    const __VLS_40 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        key: (key),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (item.code),
    }));
    const __VLS_42 = __VLS_41({
        key: (key),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (item.code),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    const __VLS_44 = {}.SelectItemText;
    /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    (item.code);
    var __VLS_47;
    var __VLS_43;
}
var __VLS_39;
var __VLS_35;
const __VLS_48 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_50 = __VLS_49({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    icon: "radix-icons:chevron-down",
}));
const __VLS_54 = __VLS_53({
    icon: "radix-icons:chevron-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
var __VLS_51;
var __VLS_23;
var __VLS_19;
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsOvertime.name),
    type: "text",
    name: "",
    placeholder: "Nhập họ và tên",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
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
const __VLS_56 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.datepicker),
    ...{ class: "work-history-datepicker" },
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd/MM/yyyy",
    maxDate: (new Date()),
}));
const __VLS_58 = __VLS_57({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.datepicker),
    ...{ class: "work-history-datepicker" },
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd/MM/yyyy",
    maxDate: (new Date()),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_60;
let __VLS_61;
let __VLS_62;
const __VLS_63 = {
    'onUpdate:modelValue': (__VLS_ctx.updateDates)
};
var __VLS_59;
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
const __VLS_64 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
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
const __VLS_66 = __VLS_65({
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
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-6" },
});
const __VLS_68 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
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
const __VLS_70 = __VLS_69({
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
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
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
var __VLS_72 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase hover:transition max-md:grow md:min-w-[175px]" },
    ...{ class: ({ 'pointer-events-none opacity-75': __VLS_ctx.onSubmitting }) },
});
if (__VLS_ctx.onSubmitting) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" },
    });
    const __VLS_74 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }));
    const __VLS_76 = __VLS_75({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
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
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000]']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[placeholder]:text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['SelectContent']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[side=top]:animate-slideDownAndFade']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[side=right]:animate-slideLeftAndFade']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[side=bottom]:animate-slideUpAndFade']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[side=left]:animate-slideRightAndFade']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[100]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#FAFAFA]']} */ ;
/** @type {__VLS_StyleScopedClasses['will-change-[opacity,transform]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet11']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[25px]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-default']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[6px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[disabled]:pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:bg-[#D5E3E8]']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:hover:cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet11']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[25px]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-default']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
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
var __VLS_73 = __VLS_72;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Icon: Icon,
            VueDatePicker: VueDatePicker,
            vi: vi,
            SelectContent: SelectContent,
            SelectGroup: SelectGroup,
            SelectItem: SelectItem,
            SelectItemText: SelectItemText,
            SelectPortal: SelectPortal,
            SelectRoot: SelectRoot,
            SelectScrollDownButton: SelectScrollDownButton,
            SelectScrollUpButton: SelectScrollUpButton,
            SelectTrigger: SelectTrigger,
            SelectValue: SelectValue,
            SelectViewport: SelectViewport,
            onSubmitting: onSubmitting,
            paramsOvertime: paramsOvertime,
            datepicker: datepicker,
            updateDates: updateDates,
            beginTimeObj: beginTimeObj,
            finishTimeObj: finishTimeObj,
            handleCreateOvertime: handleCreateOvertime,
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
//# sourceMappingURL=ModalAddOvertime.vue.js.map