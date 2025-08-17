/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { SelectContent, SelectGroup, SelectItem, SelectItemText, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue, SelectViewport, } from 'radix-vue';
import { ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
// import 'vue-multiselect/dist/vue-multiselect.min.css'
import { capitalizeFirstLetter } from '@/utils/main';
import FileUpload from '../FileUpload.vue';
const props = defineProps();
const emit = defineEmits(['post-request-edit']);
const fileUploadPreview = ref([]);
const FormSubmitEdit = ref({
    name: props.data?.name || null,
    description: props.data?.description || null,
    docCate: props.data?.type_id || null,
    id: props.data?.id || null,
    link: props.data?.link || null,
});
function clearAndCloseModal() {
    props.closeModal();
    setTimeout(() => {
        fileUploadPreview.value = [];
        FormSubmitEdit.value.name = null;
        FormSubmitEdit.value.description = null;
        FormSubmitEdit.value.docCate = null;
        FormSubmitEdit.value.id = null;
        FormSubmitEdit.value.link = null;
    }, 200);
}
function removeFilePreview() {
    FormSubmitEdit.value.link = null;
}
const setUrlFromFiles = async (files) => {
    let file;
    if (files instanceof File) {
        file = files;
    }
    else {
        const list = Array.from(files);
        if (list.length === 0)
            return;
        file = list[list.length - 1]; // get the latest (last) file
    }
    // Clear the existing link to avoid duplication
    FormSubmitEdit.value.link = null;
    const path = await readFileAsDataURL(file);
    // Replace previous file, only keep one
    fileUploadPreview.value = [
        {
            file,
            name: file.name,
            path,
        },
    ];
};
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
function onFileUpdate(files) {
    // console.log(files, 'onFileUpdate')
    setUrlFromFiles(files);
}
function clearFilePreview() {
    fileUploadPreview.value = [];
    if (fileUploadPreview.value) {
        fileUploadPreview.value = []; // reset input
    }
}
const auth = useAuth();
const postRequestEdit = ref(null);
const onSubmitting = ref(false);
const submit = async () => {
    onSubmitting.value = true;
    const formData = new FormData();
    formData.append('name', FormSubmitEdit.value.name || '');
    formData.append('id', FormSubmitEdit.value.id || '');
    formData.append('type_id', FormSubmitEdit.value.docCate || '');
    formData.append('description', FormSubmitEdit.value.description);
    if (fileUploadPreview.value.length > 0) {
        fileUploadPreview.value.forEach((item) => {
            formData.append('file', item.file);
        });
    }
    else {
        formData.append('file', '');
    }
    const response = await axios
        .post(`${apiUri}/document/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token()}`,
        },
    })
        .then(function (res) {
        // successful response flow
        //   fileUploadPreview.value = []
        FormSubmitEdit.value.docCate = '';
        postRequestEdit.value = res.data;
        emit('post-request-edit', postRequestEdit.value);
        props.propFunction();
    })
        .catch(function (error) {
        console.log(error, 'error /document/update');
    })
        .finally(() => {
        onSubmitting.value = false;
    });
};
watch(() => props.data, () => {
    FormSubmitEdit.value.name = props.data.name;
    FormSubmitEdit.value.description = props.data.description;
    FormSubmitEdit.value.docCate = props.data.type_id;
    FormSubmitEdit.value.id = props.data.id;
    FormSubmitEdit.value.link = props.data.link;
    // Clear any uploaded files when loading a new document
    fileUploadPreview.value = [];
});
function getFilenameFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.submit) },
    action: "",
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
    modelValue: (__VLS_ctx.FormSubmitEdit.docCate),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.FormSubmitEdit.docCate),
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
    placeholder: "Chọn loại tài liệu",
}));
const __VLS_10 = __VLS_9({
    ...{ class: "font-inter grow text-start text-[16px] leading-normal font-normal" },
    placeholder: "Chọn loại tài liệu",
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
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.propData))) {
    const __VLS_40 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        key: (index),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (item.id),
    }));
    const __VLS_42 = __VLS_41({
        key: (index),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (item.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    const __VLS_44 = {}.SelectItemText;
    /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    (__VLS_ctx.capitalizeFirstLetter(item.name));
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
    value: (__VLS_ctx.FormSubmitEdit.name),
    type: "text",
    name: "",
    placeholder: "Trợ lý",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12" },
});
/** @type {[typeof FileUpload, typeof FileUpload, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(FileUpload, new FileUpload({
    ...{ 'onChange': {} },
    key: ('modal-edit'),
    accept: ([
        'application/vnd.ms-excel',
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]),
}));
const __VLS_57 = __VLS_56({
    ...{ 'onChange': {} },
    key: ('modal-edit'),
    accept: ([
        'application/vnd.ms-excel',
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_59;
let __VLS_60;
let __VLS_61;
const __VLS_62 = {
    onChange: (__VLS_ctx.onFileUpdate)
};
__VLS_58.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "file-upload" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "42",
    height: "42",
    viewBox: "0 0 42 42",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M10.2183 17.7371C6.36563 18.6532 3.5 22.1174 3.5 26.25C3.5 31.0826 7.41738 35 12.25 35C13.0786 35 13.881 34.8845 14.6414 34.6693M31.5481 17.7371C35.4008 18.6532 38.2655 22.1174 38.2655 26.25C38.2655 31.0826 34.3481 35 29.5155 35C28.6869 35 27.8845 34.8845 27.125 34.6693M31.5 17.5C31.5 11.7014 26.7986 7 21 7C15.2014 7 10.5 11.7014 10.5 17.5M14.9319 24.3959L21 18.3085L27.2405 24.5M21 33.25V21.4042",
    stroke: "#013878",
    'stroke-width': "2.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "file-upload-txt" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "file-upload-link" },
});
var __VLS_58;
if (__VLS_ctx.FormSubmitEdit.link && __VLS_ctx.fileUploadPreview.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "relative flex items-center pt-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.getFilenameFromUrl(__VLS_ctx.FormSubmitEdit.link));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.removeFilePreview) },
        ...{ class: "ms-2 cursor-pointer rounded-sm bg-red-500" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        'data-v-d642cc0b': "",
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
        'data-v-d642cc0b': "",
        d: "M11.9998 13.4L7.0998 18.3C6.91647 18.4833 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4833 5.6998 18.3C5.51647 18.1167 5.4248 17.8833 5.4248 17.6C5.4248 17.3167 5.51647 17.0833 5.6998 16.9L10.5998 12L5.6998 7.1C5.51647 6.91667 5.4248 6.68334 5.4248 6.4C5.4248 6.11667 5.51647 5.88334 5.6998 5.7C5.88314 5.51667 6.11647 5.425 6.3998 5.425C6.68314 5.425 6.91647 5.51667 7.0998 5.7L11.9998 10.6L16.8998 5.7C17.0831 5.51667 17.3165 5.425 17.5998 5.425C17.8831 5.425 18.1165 5.51667 18.2998 5.7C18.4831 5.88334 18.5748 6.11667 18.5748 6.4C18.5748 6.68334 18.4831 6.91667 18.2998 7.1L13.3998 12L18.2998 16.9C18.4831 17.0833 18.5748 17.3167 18.5748 17.6C18.5748 17.8833 18.4831 18.1167 18.2998 18.3C18.1165 18.4833 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4833 16.8998 18.3L11.9998 13.4Z",
        fill: "#fff",
    });
}
if (__VLS_ctx.fileUploadPreview.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (const [list, index] of __VLS_getVForSourceType((__VLS_ctx.fileUploadPreview))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            ...{ class: "relative flex items-center pt-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (list.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.clearFilePreview) },
            ...{ class: "ms-2 cursor-pointer rounded-sm bg-red-500" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            'data-v-d642cc0b': "",
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
            'data-v-d642cc0b': "",
            d: "M11.9998 13.4L7.0998 18.3C6.91647 18.4833 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4833 5.6998 18.3C5.51647 18.1167 5.4248 17.8833 5.4248 17.6C5.4248 17.3167 5.51647 17.0833 5.6998 16.9L10.5998 12L5.6998 7.1C5.51647 6.91667 5.4248 6.68334 5.4248 6.4C5.4248 6.11667 5.51647 5.88334 5.6998 5.7C5.88314 5.51667 6.11647 5.425 6.3998 5.425C6.68314 5.425 6.91647 5.51667 7.0998 5.7L11.9998 10.6L16.8998 5.7C17.0831 5.51667 17.3165 5.425 17.5998 5.425C17.8831 5.425 18.1165 5.51667 18.2998 5.7C18.4831 5.88334 18.5748 6.11667 18.5748 6.4C18.5748 6.68334 18.4831 6.91667 18.2998 7.1L13.3998 12L18.2998 16.9C18.4831 17.0833 18.5748 17.3167 18.5748 17.6C18.5748 17.8833 18.4831 18.1167 18.2998 18.3C18.1165 18.4833 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4833 16.8998 18.3L11.9998 13.4Z",
            fill: "#fff",
        });
    }
}
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
    value: (__VLS_ctx.FormSubmitEdit.description),
    name: "",
    placeholder: "Nhập mô tả",
    ...{ class: "font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-9 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.clearAndCloseModal) },
    type: "button",
    ...{ class: "hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "border-main bg-main hover:shadow-hoverinset relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
    ...{ class: ({ 'pointer-events-none opacity-75': __VLS_ctx.onSubmitting }) },
});
if (__VLS_ctx.onSubmitting) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" },
    });
    const __VLS_63 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }));
    const __VLS_65 = __VLS_64({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
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
/** @type {__VLS_StyleScopedClasses['file-upload']} */ ;
/** @type {__VLS_StyleScopedClasses['file-upload-txt']} */ ;
/** @type {__VLS_StyleScopedClasses['file-upload-link']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ms-2']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ms-2']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
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
/** @type {__VLS_StyleScopedClasses['placeholder:italic']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:opacity-75']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-9']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-sha']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:transition']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:grow']} */ ;
/** @type {__VLS_StyleScopedClasses['md:min-w-[175px]']} */ ;
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
            FileUpload: FileUpload,
            fileUploadPreview: fileUploadPreview,
            FormSubmitEdit: FormSubmitEdit,
            clearAndCloseModal: clearAndCloseModal,
            removeFilePreview: removeFilePreview,
            onFileUpdate: onFileUpdate,
            clearFilePreview: clearFilePreview,
            onSubmitting: onSubmitting,
            submit: submit,
            getFilenameFromUrl: getFilenameFromUrl,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=EditDocument.vue.js.map