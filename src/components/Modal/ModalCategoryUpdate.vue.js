/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { SelectContent, SelectGroup, SelectItem, SelectItemText, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue, SelectViewport, } from 'radix-vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
import { capitalizeFirstLetter } from '@/utils/main';
const auth = useAuth();
const token = auth.token();
const session = auth.check();
const emit = defineEmits(['post-request-edit']);
const props = defineProps();
const paramsUpdate = reactive({
    id: '',
    type: '',
    name: '',
    description: '',
    status: '',
});
const categoriesType = ref(null);
const getCategoriesType = async () => {
    try {
        const response = await axios.get(`${apiUri}/categories/type`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        categoriesType.value = response.data.data;
        // console.log('🚀 ~ getCategoriesType ~ response:', categoriesType.value)
    }
    catch (error) {
        console.log('🚀 ~ getCategoriesType ~ error:', error);
    }
};
const postRequestEdit = ref(null);
const onSubmitting = ref(false);
const handleUpdateCategory = async () => {
    onSubmitting.value = true;
    try {
        const formData = new FormData();
        if (paramsUpdate.id)
            formData.append('id', paramsUpdate.id);
        if (paramsUpdate.type)
            formData.append('type', paramsUpdate.type);
        if (paramsUpdate.name)
            formData.append('name', paramsUpdate.name);
        if (paramsUpdate.description)
            formData.append('description', paramsUpdate.description);
        if (paramsUpdate.status)
            formData.append('status', paramsUpdate.status);
        const response = await axios.post(`${apiUri}/categories/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        // props.closeModal()
        postRequestEdit.value = response.data;
        emit('post-request-edit', postRequestEdit.value);
        props.propFunction();
        console.log('🚀 ~ handleUpdateCategory ~ response:', response);
    }
    catch (error) {
        console.log('🚀 ~ handleUpdateCategory ~ error:', error);
    }
    finally {
        onSubmitting.value = false;
    }
};
onMounted(() => {
    getCategoriesType();
});
watch(() => props.datatype, (newVal) => {
    paramsUpdate.id = newVal.data.id;
    paramsUpdate.type = newVal.data.type;
    paramsUpdate.name = newVal.data.name;
    paramsUpdate.description = newVal.data.description;
    if (newVal.data.status === null)
        return (paramsUpdate.status = '0');
    paramsUpdate.status = newVal.data.status;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleUpdateCategory) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6 gap-x-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 xl:col-span-4" },
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
    modelValue: (__VLS_ctx.paramsUpdate.type),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.paramsUpdate.type),
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
    placeholder: "Chọn loại danh mục",
}));
const __VLS_10 = __VLS_9({
    ...{ class: "font-inter grow text-start text-[16px] leading-normal font-normal" },
    placeholder: "Chọn loại danh mục",
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
for (const [item, key] of __VLS_getVForSourceType((__VLS_ctx.categoriesType))) {
    const __VLS_40 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        key: (key),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(key)),
    }));
    const __VLS_42 = __VLS_41({
        key: (key),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(key)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    const __VLS_44 = {}.SelectItemText;
    /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    (__VLS_ctx.capitalizeFirstLetter(item));
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
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUpdate.name),
    type: "text",
    name: "",
    placeholder: "Trợ lý",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_56 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    modelValue: (__VLS_ctx.paramsUpdate.status),
}));
const __VLS_58 = __VLS_57({
    modelValue: (__VLS_ctx.paramsUpdate.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
const __VLS_60 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_62 = __VLS_61({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
const __VLS_64 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn trạng thái",
}));
const __VLS_66 = __VLS_65({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn trạng thái",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const __VLS_68 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_70 = __VLS_69({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
var __VLS_63;
const __VLS_72 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({}));
const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
const __VLS_76 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_78 = __VLS_77({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
const __VLS_80 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_83.slots.default;
const __VLS_84 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({}));
const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_87.slots.default;
const __VLS_88 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(1)),
}));
const __VLS_90 = __VLS_89({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(1)),
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
__VLS_91.slots.default;
const __VLS_92 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
__VLS_95.slots.default;
var __VLS_95;
var __VLS_91;
const __VLS_96 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(0)),
}));
const __VLS_98 = __VLS_97({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(0)),
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_99.slots.default;
const __VLS_100 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({}));
const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
__VLS_103.slots.default;
var __VLS_103;
var __VLS_99;
var __VLS_87;
var __VLS_83;
var __VLS_79;
var __VLS_75;
var __VLS_59;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
    id: "",
    value: (__VLS_ctx.paramsUpdate.description),
    name: "",
    placeholder: "Nhập mô tả",
    ...{ class: "font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6" },
});
var __VLS_104 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
    ...{ class: ({ 'pointer-events-none opacity-75': __VLS_ctx.onSubmitting }) },
});
if (__VLS_ctx.onSubmitting) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" },
    });
    const __VLS_106 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }));
    const __VLS_108 = __VLS_107({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:col-span-4']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-4']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-4']} */ ;
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
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[placeholder]:text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[90%]']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ellipsis']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:text-[14px]']} */ ;
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
/** @type {__VLS_StyleScopedClasses['p-[6px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[disabled]:pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:bg-[#D5E3E8]']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:hover:cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[6px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[disabled]:pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:bg-[#D5E3E8]']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[highlighted]:hover:cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
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
var __VLS_105 = __VLS_104;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Icon: Icon,
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
            capitalizeFirstLetter: capitalizeFirstLetter,
            paramsUpdate: paramsUpdate,
            categoriesType: categoriesType,
            onSubmitting: onSubmitting,
            handleUpdateCategory: handleUpdateCategory,
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
//# sourceMappingURL=ModalCategoryUpdate.vue.js.map