/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import 'flatpickr/dist/flatpickr.css';
import '@vuepic/vue-datepicker/dist/main.css';
import { Icon } from '@iconify/vue';
import { toTypedSchema } from '@vee-validate/yup';
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale/vi';
import { SelectContent, SelectGroup, SelectItem, SelectItemText, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue, SelectViewport, } from 'radix-vue';
import { useForm } from 'vee-validate';
import { onMounted, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import * as yup from 'yup';
import Modal from '@/components/Modals.vue';
import { apiUri } from '@/constants/apiUri';
const auth = useAuth();
const props = defineProps();
const emit = defineEmits(['toggle-modal', 'post-request']);
const pickerDOB = ref(null);
const pickerDateissue = ref(null);
const pickerWorkingDay = ref(null);
const initDates = () => {
    pickerDOB.value = new Date(new Date().setDate(new Date().getDate() + 1));
    pickerDateissue.value = new Date(new Date().setDate(new Date().getDate() + 1));
    pickerWorkingDay.value = new Date(new Date().setDate(new Date().getDate() + 1));
};
const updateDates = () => {
    if (pickerDOB.value) {
        // Nếu là đối tượng Date, format theo chuẩn yyyy-MM-dd
        paramsUser.dob = format(pickerDOB.value, 'yyyy-MM-dd');
    }
    if (pickerDateissue.value) {
        paramsUser.date_of_issue = format(pickerDateissue.value, 'yyyy-MM-dd');
    }
    if (pickerWorkingDay.value) {
        paramsUser.working_day = format(pickerWorkingDay.value, 'yyyy-MM-dd');
    }
};
// Theo dõi thay đổi của các date picker để cập nhật dữ liệu
watch([pickerDOB, pickerDateissue, pickerWorkingDay], () => {
    if (auth.check()) {
        updateDates();
    }
});
const paramsUser = reactive({
    code: '',
    phone: '',
    name: '',
    email: '',
    dob: '',
    per_group_name: '',
    identification: '',
    date_of_issue: '',
    place_of_issue: '',
    original_place: '',
    part_id: '',
    position_id: '',
    region_id: '',
    parent_id: '',
    permanent_address: '',
    residence_address: '',
    work_contract: '',
    working_day: '',
    total_days_off: '',
    status: '',
    mcc_user_id: '',
});
// Định nghĩa schema validate với yup
const schema = toTypedSchema(yup.object({
    name: yup.string().required('Bạn hãy nhập họ tên'),
    code: yup.string().required('Bạn hãy nhập mã nhân viên'),
    email: yup
        .string()
        .required('Bạn hãy nhập email')
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email không hợp lệ'),
    phone: yup
        .string()
        .required('Bạn hãy nhập số điện thoại')
        .matches(/^[0-9]{10}$/, 'Bạn cần nhập đúng 10 số'),
    group_user: yup.string().required('Bạn hãy chọn nhóm người dùng'),
}));
// Sử dụng useForm hook
const { handleSubmit, errors, values, meta, defineField, resetForm } = useForm({
    validationSchema: schema,
});
const [email, emailAttrs] = defineField('email');
const [phone, phoneAttrs] = defineField('phone');
const [name, nameAttrs] = defineField('name');
const [code, codeAttrs] = defineField('code');
const [group_user, guAttrs] = defineField('group_user');
const listGrPermiss = ref(null);
const fetchListPermission = async () => {
    try {
        const response = await axios.get(`${apiUri}/permission/list`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data } = response.data;
        listGrPermiss.value = data;
    }
    catch (error) {
        console.error('Error fetching permission list:', error);
    }
};
const staffType = reactive({
    value: '',
    id: '',
});
const staffData = ref(null);
const positionType = reactive({
    value: '',
    id: '',
});
const positionData = ref(null);
const regionType = reactive({
    value: '',
    id: '',
});
const regionData = ref(null);
const leaderType = reactive({
    value: '',
    id: '',
});
const leaderData = ref(null);
const mccData = reactive({
    value: '',
    id: '',
});
const fetchMccData = async () => {
    try {
        const response = await axios.get(`${apiUri}/work/usermcc`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { items } = response.data.data;
        mccData.value = Object.values(items);
        mccData.id = Object.keys(items);
    }
    catch (error) {
        console.error('Error fetching mcc data:', error);
    }
};
const fetchListStaff = async () => {
    try {
        const response = await axios.get(`${apiUri}/categories/list?type=staff`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { items } = response.data.data;
        staffData.value = items;
        // console.log('🚀 ~ fetchListStaff ~ response:', staffData.value)
    }
    catch (error) {
        console.error('Error fetching staff list:', error);
    }
};
const fetchListPosition = async () => {
    try {
        const response = await axios.get(`${apiUri}/categories/list?type=position`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { items } = response.data.data;
        positionData.value = items;
        // console.log('🚀 ~ fetchListPosition ~ response:', positionData.value)
    }
    catch (error) {
        console.error('Error fetching position list:', error);
    }
};
const fetchListRegion = async () => {
    try {
        const response = await axios.get(`${apiUri}/location/region`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { items } = response.data.data;
        regionData.value = items;
        // console.log('🚀 ~ fetchListPosition ~ response:', regionData.value)
    }
    catch (error) {
        console.error('Error fetching position list:', error);
    }
};
const fetchListLeader = async () => {
    try {
        const response = await axios.get(`${apiUri}/user/list`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { items } = response.data.data;
        leaderData.value = items;
        // console.log('🚀 ~ fetchListLeader ~ items:', leaderData.value)
    }
    catch (error) {
        console.error('Error fetching position list:', error);
    }
};
const postRequest = ref(null);
const onSubmitting = ref(false);
const onSubmitRegister = handleSubmit(async () => {
    onSubmitting.value = true;
    try {
        const formDataUser = new FormData();
        if (paramsUser.code)
            formDataUser.append('code', paramsUser.code);
        if (paramsUser.phone)
            formDataUser.append('phone', paramsUser.phone);
        if (paramsUser.name)
            formDataUser.append('name', paramsUser.name);
        if (paramsUser.email)
            formDataUser.append('email', paramsUser.email);
        if (paramsUser.dob)
            formDataUser.append('dob', paramsUser.dob);
        if (paramsUser.per_group_name)
            formDataUser.append('per_group_name', paramsUser.per_group_name);
        if (paramsUser.identification)
            formDataUser.append('identification', paramsUser.identification);
        if (paramsUser.date_of_issue)
            formDataUser.append('date_of_issue', paramsUser.date_of_issue);
        if (paramsUser.place_of_issue)
            formDataUser.append('place_of_issue', paramsUser.place_of_issue);
        if (paramsUser.original_place)
            formDataUser.append('original_place', paramsUser.original_place);
        if (staffType.id)
            formDataUser.append('part_id', staffType.id);
        if (positionType.id)
            formDataUser.append('position_id', positionType.id);
        if (regionType.id)
            formDataUser.append('region_id', regionType.id);
        if (leaderType.id)
            formDataUser.append('parent_id', leaderType.id);
        if (paramsUser.permanent_address)
            formDataUser.append('permanent_address', paramsUser.permanent_address);
        if (paramsUser.residence_address)
            formDataUser.append('residence_address', paramsUser.residence_address);
        if (paramsUser.work_contract)
            formDataUser.append('work_contract', paramsUser.work_contract);
        if (paramsUser.working_day)
            formDataUser.append('working_day', paramsUser.working_day);
        if (paramsUser.total_days_off)
            formDataUser.append('total_days_off', paramsUser.total_days_off);
        if (paramsUser.status) {
            formDataUser.append('status', paramsUser.status);
        }
        else {
            formDataUser.append('status', '1');
        }
        if (paramsUser.mcc_user_id) {
            formDataUser.append('mcc_user_id', paramsUser.mcc_user_id);
        }
        const response = await axios.post(`${apiUri}/user/create`, formDataUser, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        postRequest.value = response.data;
        emit('post-request', postRequest.value);
        Object.keys(paramsUser).map((key) => {
            paramsUser[key] = '';
        });
        props.propFunction();
        console.log('🚀 ~ handleSubmit ~ response:', response);
    }
    catch (error) {
        console.error('Error fetching position list:', error);
    }
    finally {
        onSubmitting.value = false;
    }
});
watch([email, phone, name, group_user, code], (newVal) => {
    paramsUser.email = newVal[0];
    paramsUser.phone = newVal[1];
    paramsUser.name = newVal[2];
    paramsUser.per_group_name = newVal[3];
    paramsUser.code = newVal[4];
});
watch([staffType, positionType, regionType, leaderType, mccData], () => {
    if (staffType.id === 'all') {
        staffType.id = String(0);
    }
    if (positionType.id === 'all') {
        positionType.id = String(0);
    }
    if (regionType.id === 'all') {
        regionType.id = String(0);
    }
    if (leaderType.id === 'all') {
        leaderType.id = String(0);
    }
    if (mccData.id === 'all') {
        mccData.id = String(0);
    }
});
onMounted(() => {
    fetchListPermission();
    fetchListStaff();
    fetchListPosition();
    fetchListRegion();
    fetchListLeader();
    initDates();
    updateDates();
    fetchMccData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof Modal, typeof Modal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Modal, new Modal({
    ...{ 'onClose': {} },
    modalActive: (props.modal),
    maxWidth: "max-w-[865px]",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClose': {} },
    modalActive: (props.modal),
    maxWidth: "max-w-[865px]",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onClose: (() => __VLS_ctx.emit('toggle-modal'))
};
var __VLS_7 = {};
__VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-hidden rounded-[24px] bg-white p-1.5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-8 mb-7 text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "m-0 text-[16px] font-bold text-[#464661] uppercase" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (...[$event]) => {
            __VLS_ctx.onSubmitRegister();
        } },
    ...{ class: "mx-auto w-full p-[24px_16px] lg:p-[24px_48px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...(__VLS_ctx.codeAttrs),
    id: "",
    value: (__VLS_ctx.code),
    type: "text",
    name: "",
    placeholder: "Nhập mã nhân viên",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-1 text-sm text-red-500" },
});
(__VLS_ctx.errors.code);
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
    ...(__VLS_ctx.nameAttrs),
    id: "",
    value: (__VLS_ctx.name),
    type: "text",
    name: "",
    placeholder: "Nhập họ tên",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-1 text-sm text-red-500" },
});
(__VLS_ctx.errors.name);
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
    ...(__VLS_ctx.phoneAttrs),
    id: "",
    value: (__VLS_ctx.phone),
    type: "text",
    name: "",
    placeholder: "Nhập số điện thoại",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-1 text-sm text-red-500" },
});
(__VLS_ctx.errors.phone);
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
    ...(__VLS_ctx.emailAttrs),
    id: "",
    value: (__VLS_ctx.email),
    type: "text",
    name: "",
    placeholder: "Nhập email",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-1 text-sm text-red-500" },
});
(__VLS_ctx.errors.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_8 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    modelValue: (__VLS_ctx.pickerDOB),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd/MM/yyyy",
    maxDate: (new Date()),
}));
const __VLS_10 = __VLS_9({
    modelValue: (__VLS_ctx.pickerDOB),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd/MM/yyyy",
    maxDate: (new Date()),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "required font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_12 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.group_user),
    ...(__VLS_ctx.guAttrs),
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.group_user),
    ...(__VLS_ctx.guAttrs),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_18 = __VLS_17({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn loại danh mục",
}));
const __VLS_22 = __VLS_21({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn loại danh mục",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_26 = __VLS_25({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_19;
const __VLS_28 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_34 = __VLS_33({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
const __VLS_40 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    icon: "radix-icons:chevron-up",
}));
const __VLS_42 = __VLS_41({
    icon: "radix-icons:chevron-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
var __VLS_39;
const __VLS_44 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
const __VLS_48 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
for (const [item, key] of __VLS_getVForSourceType((__VLS_ctx.listGrPermiss))) {
    const __VLS_52 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        key: (key),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(item.name)),
    }));
    const __VLS_54 = __VLS_53({
        key: (key),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(item.name)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    const __VLS_56 = {}.SelectItemText;
    /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
    const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_59.slots.default;
    (item.description);
    var __VLS_59;
    var __VLS_55;
}
var __VLS_51;
var __VLS_47;
const __VLS_60 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_62 = __VLS_61({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
const __VLS_64 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    icon: "radix-icons:chevron-down",
}));
const __VLS_66 = __VLS_65({
    icon: "radix-icons:chevron-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
var __VLS_63;
var __VLS_35;
var __VLS_31;
var __VLS_15;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-1 text-sm text-red-500" },
});
(__VLS_ctx.errors.group_user);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUser.identification),
    type: "text",
    name: "",
    placeholder: "Nhập số CCCD",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_68 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.pickerDateissue),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd-MM-yyyy",
    maxDate: (new Date()),
}));
const __VLS_70 = __VLS_69({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.pickerDateissue),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd-MM-yyyy",
    maxDate: (new Date()),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_72;
let __VLS_73;
let __VLS_74;
const __VLS_75 = {
    'onUpdate:modelValue': (__VLS_ctx.updateDates)
};
var __VLS_71;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUser.place_of_issue),
    type: "text",
    name: "",
    placeholder: "Nhập nơi cấp",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUser.original_place),
    type: "text",
    name: "",
    placeholder: "Nhập địa chỉ",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_76 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    modelValue: (__VLS_ctx.staffType.id),
}));
const __VLS_78 = __VLS_77({
    modelValue: (__VLS_ctx.staffType.id),
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
const __VLS_80 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_82 = __VLS_81({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_83.slots.default;
const __VLS_84 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn bộ phận",
}));
const __VLS_86 = __VLS_85({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn bộ phận",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const __VLS_88 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_90 = __VLS_89({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
var __VLS_83;
const __VLS_92 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
__VLS_95.slots.default;
const __VLS_96 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_98 = __VLS_97({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_99.slots.default;
const __VLS_100 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_102 = __VLS_101({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
__VLS_103.slots.default;
const __VLS_104 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    icon: "radix-icons:chevron-up",
}));
const __VLS_106 = __VLS_105({
    icon: "radix-icons:chevron-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
var __VLS_103;
const __VLS_108 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({}));
const __VLS_110 = __VLS_109({}, ...__VLS_functionalComponentArgsRest(__VLS_109));
__VLS_111.slots.default;
const __VLS_112 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({}));
const __VLS_114 = __VLS_113({}, ...__VLS_functionalComponentArgsRest(__VLS_113));
__VLS_115.slots.default;
const __VLS_116 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}));
const __VLS_118 = __VLS_117({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
__VLS_119.slots.default;
const __VLS_120 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({}));
const __VLS_122 = __VLS_121({}, ...__VLS_functionalComponentArgsRest(__VLS_121));
__VLS_123.slots.default;
var __VLS_123;
var __VLS_119;
for (const [items, key] of __VLS_getVForSourceType((__VLS_ctx.staffData))) {
    for (const [item, _] of __VLS_getVForSourceType((items))) {
        const __VLS_124 = {}.SelectItem;
        /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
        // @ts-ignore
        const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
            key: (item.id),
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item.id)),
        }));
        const __VLS_126 = __VLS_125({
            key: (item.id),
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_125));
        __VLS_127.slots.default;
        const __VLS_128 = {}.SelectItemText;
        /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
        // @ts-ignore
        const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({}));
        const __VLS_130 = __VLS_129({}, ...__VLS_functionalComponentArgsRest(__VLS_129));
        __VLS_131.slots.default;
        (item.name);
        var __VLS_131;
        var __VLS_127;
    }
}
var __VLS_115;
var __VLS_111;
const __VLS_132 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_134 = __VLS_133({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_133));
__VLS_135.slots.default;
const __VLS_136 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
    icon: "radix-icons:chevron-down",
}));
const __VLS_138 = __VLS_137({
    icon: "radix-icons:chevron-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
var __VLS_135;
var __VLS_99;
var __VLS_95;
var __VLS_79;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_140 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({
    modelValue: (__VLS_ctx.positionType.id),
}));
const __VLS_142 = __VLS_141({
    modelValue: (__VLS_ctx.positionType.id),
}, ...__VLS_functionalComponentArgsRest(__VLS_141));
__VLS_143.slots.default;
const __VLS_144 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_146 = __VLS_145({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_145));
__VLS_147.slots.default;
const __VLS_148 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn chức vụ",
}));
const __VLS_150 = __VLS_149({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn chức vụ",
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
const __VLS_152 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_154 = __VLS_153({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_153));
var __VLS_147;
const __VLS_156 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({}));
const __VLS_158 = __VLS_157({}, ...__VLS_functionalComponentArgsRest(__VLS_157));
__VLS_159.slots.default;
const __VLS_160 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_162 = __VLS_161({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_161));
__VLS_163.slots.default;
const __VLS_164 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_166 = __VLS_165({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_165));
__VLS_167.slots.default;
const __VLS_168 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({
    icon: "radix-icons:chevron-up",
}));
const __VLS_170 = __VLS_169({
    icon: "radix-icons:chevron-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
var __VLS_167;
const __VLS_172 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({}));
const __VLS_174 = __VLS_173({}, ...__VLS_functionalComponentArgsRest(__VLS_173));
__VLS_175.slots.default;
const __VLS_176 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({}));
const __VLS_178 = __VLS_177({}, ...__VLS_functionalComponentArgsRest(__VLS_177));
__VLS_179.slots.default;
const __VLS_180 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}));
const __VLS_182 = __VLS_181({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
__VLS_183.slots.default;
const __VLS_184 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({}));
const __VLS_186 = __VLS_185({}, ...__VLS_functionalComponentArgsRest(__VLS_185));
__VLS_187.slots.default;
var __VLS_187;
var __VLS_183;
for (const [items, key] of __VLS_getVForSourceType((__VLS_ctx.positionData))) {
    for (const [item, _] of __VLS_getVForSourceType((items))) {
        const __VLS_188 = {}.SelectItem;
        /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
        // @ts-ignore
        const __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({
            key: (item.id),
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item.id)),
        }));
        const __VLS_190 = __VLS_189({
            key: (item.id),
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_189));
        __VLS_191.slots.default;
        const __VLS_192 = {}.SelectItemText;
        /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
        // @ts-ignore
        const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({}));
        const __VLS_194 = __VLS_193({}, ...__VLS_functionalComponentArgsRest(__VLS_193));
        __VLS_195.slots.default;
        (item.name);
        var __VLS_195;
        var __VLS_191;
    }
}
var __VLS_179;
var __VLS_175;
const __VLS_196 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_198 = __VLS_197({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_197));
__VLS_199.slots.default;
const __VLS_200 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_201 = __VLS_asFunctionalComponent(__VLS_200, new __VLS_200({
    icon: "radix-icons:chevron-down",
}));
const __VLS_202 = __VLS_201({
    icon: "radix-icons:chevron-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_201));
var __VLS_199;
var __VLS_163;
var __VLS_159;
var __VLS_143;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
const __VLS_204 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({
    modelValue: (__VLS_ctx.regionType.id),
}));
const __VLS_206 = __VLS_205({
    modelValue: (__VLS_ctx.regionType.id),
}, ...__VLS_functionalComponentArgsRest(__VLS_205));
__VLS_207.slots.default;
const __VLS_208 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_209 = __VLS_asFunctionalComponent(__VLS_208, new __VLS_208({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_210 = __VLS_209({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_209));
__VLS_211.slots.default;
const __VLS_212 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn địa điểm",
}));
const __VLS_214 = __VLS_213({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn địa điểm",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
const __VLS_216 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_218 = __VLS_217({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
var __VLS_211;
const __VLS_220 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({}));
const __VLS_222 = __VLS_221({}, ...__VLS_functionalComponentArgsRest(__VLS_221));
__VLS_223.slots.default;
const __VLS_224 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_226 = __VLS_225({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
__VLS_227.slots.default;
const __VLS_228 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
const __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_230 = __VLS_229({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_229));
__VLS_231.slots.default;
const __VLS_232 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
    icon: "radix-icons:chevron-up",
}));
const __VLS_234 = __VLS_233({
    icon: "radix-icons:chevron-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
var __VLS_231;
const __VLS_236 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({}));
const __VLS_238 = __VLS_237({}, ...__VLS_functionalComponentArgsRest(__VLS_237));
__VLS_239.slots.default;
const __VLS_240 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({}));
const __VLS_242 = __VLS_241({}, ...__VLS_functionalComponentArgsRest(__VLS_241));
__VLS_243.slots.default;
const __VLS_244 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}));
const __VLS_246 = __VLS_245({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_245));
__VLS_247.slots.default;
const __VLS_248 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({}));
const __VLS_250 = __VLS_249({}, ...__VLS_functionalComponentArgsRest(__VLS_249));
__VLS_251.slots.default;
var __VLS_251;
var __VLS_247;
for (const [item, _] of __VLS_getVForSourceType((__VLS_ctx.regionData))) {
    const __VLS_252 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({
        key: (item.id),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(item.id)),
    }));
    const __VLS_254 = __VLS_253({
        key: (item.id),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(item.id)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_253));
    __VLS_255.slots.default;
    const __VLS_256 = {}.SelectItemText;
    /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
    // @ts-ignore
    const __VLS_257 = __VLS_asFunctionalComponent(__VLS_256, new __VLS_256({}));
    const __VLS_258 = __VLS_257({}, ...__VLS_functionalComponentArgsRest(__VLS_257));
    __VLS_259.slots.default;
    (item.name);
    var __VLS_259;
    var __VLS_255;
}
var __VLS_243;
var __VLS_239;
const __VLS_260 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
const __VLS_261 = __VLS_asFunctionalComponent(__VLS_260, new __VLS_260({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_262 = __VLS_261({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_261));
__VLS_263.slots.default;
const __VLS_264 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({
    icon: "radix-icons:chevron-down",
}));
const __VLS_266 = __VLS_265({
    icon: "radix-icons:chevron-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_265));
var __VLS_263;
var __VLS_227;
var __VLS_223;
var __VLS_207;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6 xl:col-span-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]" },
});
const __VLS_268 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_269 = __VLS_asFunctionalComponent(__VLS_268, new __VLS_268({
    modelValue: (__VLS_ctx.leaderType.id),
}));
const __VLS_270 = __VLS_269({
    modelValue: (__VLS_ctx.leaderType.id),
}, ...__VLS_functionalComponentArgsRest(__VLS_269));
__VLS_271.slots.default;
const __VLS_272 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_273 = __VLS_asFunctionalComponent(__VLS_272, new __VLS_272({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_274 = __VLS_273({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_273));
__VLS_275.slots.default;
const __VLS_276 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_277 = __VLS_asFunctionalComponent(__VLS_276, new __VLS_276({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn quản lý",
}));
const __VLS_278 = __VLS_277({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn quản lý",
}, ...__VLS_functionalComponentArgsRest(__VLS_277));
const __VLS_280 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_281 = __VLS_asFunctionalComponent(__VLS_280, new __VLS_280({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_282 = __VLS_281({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_281));
var __VLS_275;
const __VLS_284 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_285 = __VLS_asFunctionalComponent(__VLS_284, new __VLS_284({}));
const __VLS_286 = __VLS_285({}, ...__VLS_functionalComponentArgsRest(__VLS_285));
__VLS_287.slots.default;
const __VLS_288 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_289 = __VLS_asFunctionalComponent(__VLS_288, new __VLS_288({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_290 = __VLS_289({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_289));
__VLS_291.slots.default;
const __VLS_292 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent(__VLS_292, new __VLS_292({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_294 = __VLS_293({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
__VLS_295.slots.default;
const __VLS_296 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({
    icon: "radix-icons:chevron-up",
}));
const __VLS_298 = __VLS_297({
    icon: "radix-icons:chevron-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_297));
var __VLS_295;
const __VLS_300 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_301 = __VLS_asFunctionalComponent(__VLS_300, new __VLS_300({}));
const __VLS_302 = __VLS_301({}, ...__VLS_functionalComponentArgsRest(__VLS_301));
__VLS_303.slots.default;
const __VLS_304 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_305 = __VLS_asFunctionalComponent(__VLS_304, new __VLS_304({}));
const __VLS_306 = __VLS_305({}, ...__VLS_functionalComponentArgsRest(__VLS_305));
__VLS_307.slots.default;
const __VLS_308 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_309 = __VLS_asFunctionalComponent(__VLS_308, new __VLS_308({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}));
const __VLS_310 = __VLS_309({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_309));
__VLS_311.slots.default;
const __VLS_312 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_313 = __VLS_asFunctionalComponent(__VLS_312, new __VLS_312({}));
const __VLS_314 = __VLS_313({}, ...__VLS_functionalComponentArgsRest(__VLS_313));
__VLS_315.slots.default;
var __VLS_315;
var __VLS_311;
for (const [items, key] of __VLS_getVForSourceType((__VLS_ctx.leaderData))) {
    for (const [item, _] of __VLS_getVForSourceType((items))) {
        const __VLS_316 = {}.SelectItem;
        /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
        // @ts-ignore
        const __VLS_317 = __VLS_asFunctionalComponent(__VLS_316, new __VLS_316({
            key: (item.id),
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item.id)),
        }));
        const __VLS_318 = __VLS_317({
            key: (item.id),
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_317));
        __VLS_319.slots.default;
        const __VLS_320 = {}.SelectItemText;
        /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
        // @ts-ignore
        const __VLS_321 = __VLS_asFunctionalComponent(__VLS_320, new __VLS_320({}));
        const __VLS_322 = __VLS_321({}, ...__VLS_functionalComponentArgsRest(__VLS_321));
        __VLS_323.slots.default;
        (item.name);
        var __VLS_323;
        var __VLS_319;
    }
}
var __VLS_307;
var __VLS_303;
const __VLS_324 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
const __VLS_325 = __VLS_asFunctionalComponent(__VLS_324, new __VLS_324({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_326 = __VLS_325({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_325));
__VLS_327.slots.default;
const __VLS_328 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_329 = __VLS_asFunctionalComponent(__VLS_328, new __VLS_328({
    icon: "radix-icons:chevron-down",
}));
const __VLS_330 = __VLS_329({
    icon: "radix-icons:chevron-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_329));
var __VLS_327;
var __VLS_291;
var __VLS_287;
var __VLS_271;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 xl:col-span-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUser.permanent_address),
    type: "text",
    name: "",
    placeholder: "Nhập địa chỉ",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 xl:col-span-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-semibold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUser.residence_address),
    type: "text",
    name: "",
    placeholder: "Nhập địa chỉ tạm trú",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUser.work_contract),
    type: "text",
    name: "",
    placeholder: "Nhập hợp đồng làm việc",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]" },
});
const __VLS_332 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_333 = __VLS_asFunctionalComponent(__VLS_332, new __VLS_332({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.pickerWorkingDay),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd-MM-yyyy",
}));
const __VLS_334 = __VLS_333({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.pickerWorkingDay),
    enableTimePicker: (false),
    locale: "vi",
    formatLocale: (__VLS_ctx.vi),
    cancelText: "Huỷ",
    selectText: "Chọn",
    format: "dd-MM-yyyy",
}, ...__VLS_functionalComponentArgsRest(__VLS_333));
let __VLS_336;
let __VLS_337;
let __VLS_338;
const __VLS_339 = {
    'onUpdate:modelValue': (__VLS_ctx.updateDates)
};
var __VLS_335;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "",
    value: (__VLS_ctx.paramsUser.total_days_off),
    type: "text",
    name: "",
    placeholder: "Nhập số ngày nghỉ phép năm",
    ...{ class: "font-inter focus:border-main w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:italic placeholder:opacity-75" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]" },
});
const __VLS_340 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_341 = __VLS_asFunctionalComponent(__VLS_340, new __VLS_340({
    modelValue: (__VLS_ctx.paramsUser.mcc_user_id),
}));
const __VLS_342 = __VLS_341({
    modelValue: (__VLS_ctx.paramsUser.mcc_user_id),
}, ...__VLS_functionalComponentArgsRest(__VLS_341));
__VLS_343.slots.default;
const __VLS_344 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_345 = __VLS_asFunctionalComponent(__VLS_344, new __VLS_344({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_346 = __VLS_345({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_345));
__VLS_347.slots.default;
const __VLS_348 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_349 = __VLS_asFunctionalComponent(__VLS_348, new __VLS_348({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn ID máy chấm công",
}));
const __VLS_350 = __VLS_349({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn ID máy chấm công",
}, ...__VLS_functionalComponentArgsRest(__VLS_349));
const __VLS_352 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_353 = __VLS_asFunctionalComponent(__VLS_352, new __VLS_352({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_354 = __VLS_353({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_353));
var __VLS_347;
const __VLS_356 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_357 = __VLS_asFunctionalComponent(__VLS_356, new __VLS_356({}));
const __VLS_358 = __VLS_357({}, ...__VLS_functionalComponentArgsRest(__VLS_357));
__VLS_359.slots.default;
const __VLS_360 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_361 = __VLS_asFunctionalComponent(__VLS_360, new __VLS_360({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_362 = __VLS_361({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_361));
__VLS_363.slots.default;
const __VLS_364 = {}.SelectScrollUpButton;
/** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
// @ts-ignore
const __VLS_365 = __VLS_asFunctionalComponent(__VLS_364, new __VLS_364({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_366 = __VLS_365({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_365));
__VLS_367.slots.default;
const __VLS_368 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_369 = __VLS_asFunctionalComponent(__VLS_368, new __VLS_368({
    icon: "radix-icons:chevron-up",
}));
const __VLS_370 = __VLS_369({
    icon: "radix-icons:chevron-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_369));
var __VLS_367;
const __VLS_372 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_373 = __VLS_asFunctionalComponent(__VLS_372, new __VLS_372({}));
const __VLS_374 = __VLS_373({}, ...__VLS_functionalComponentArgsRest(__VLS_373));
__VLS_375.slots.default;
const __VLS_376 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_377 = __VLS_asFunctionalComponent(__VLS_376, new __VLS_376({}));
const __VLS_378 = __VLS_377({}, ...__VLS_functionalComponentArgsRest(__VLS_377));
__VLS_379.slots.default;
const __VLS_380 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_381 = __VLS_asFunctionalComponent(__VLS_380, new __VLS_380({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}));
const __VLS_382 = __VLS_381({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_381));
__VLS_383.slots.default;
const __VLS_384 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_385 = __VLS_asFunctionalComponent(__VLS_384, new __VLS_384({}));
const __VLS_386 = __VLS_385({}, ...__VLS_functionalComponentArgsRest(__VLS_385));
__VLS_387.slots.default;
var __VLS_387;
var __VLS_383;
for (const [itemValue, index] of __VLS_getVForSourceType((__VLS_ctx.mccData.value))) {
    const __VLS_388 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    const __VLS_389 = __VLS_asFunctionalComponent(__VLS_388, new __VLS_388({
        key: (__VLS_ctx.mccData.id[index]),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(__VLS_ctx.mccData.id[index])),
    }));
    const __VLS_390 = __VLS_389({
        key: (__VLS_ctx.mccData.id[index]),
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: (String(__VLS_ctx.mccData.id[index])),
    }, ...__VLS_functionalComponentArgsRest(__VLS_389));
    __VLS_391.slots.default;
    const __VLS_392 = {}.SelectItemText;
    /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
    // @ts-ignore
    const __VLS_393 = __VLS_asFunctionalComponent(__VLS_392, new __VLS_392({}));
    const __VLS_394 = __VLS_393({}, ...__VLS_functionalComponentArgsRest(__VLS_393));
    __VLS_395.slots.default;
    (__VLS_ctx.mccData.id[index]);
    (itemValue);
    var __VLS_395;
    var __VLS_391;
}
var __VLS_379;
var __VLS_375;
const __VLS_396 = {}.SelectScrollDownButton;
/** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
// @ts-ignore
const __VLS_397 = __VLS_asFunctionalComponent(__VLS_396, new __VLS_396({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}));
const __VLS_398 = __VLS_397({
    ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_397));
__VLS_399.slots.default;
const __VLS_400 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_401 = __VLS_asFunctionalComponent(__VLS_400, new __VLS_400({
    icon: "radix-icons:chevron-down",
}));
const __VLS_402 = __VLS_401({
    icon: "radix-icons:chevron-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_401));
var __VLS_399;
var __VLS_363;
var __VLS_359;
var __VLS_343;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 md:col-span-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter mb-3 block text-[16px] leading-normal font-bold text-[#464661]" },
});
const __VLS_404 = {}.SelectRoot;
/** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
// @ts-ignore
const __VLS_405 = __VLS_asFunctionalComponent(__VLS_404, new __VLS_404({
    modelValue: (__VLS_ctx.paramsUser.status),
}));
const __VLS_406 = __VLS_405({
    modelValue: (__VLS_ctx.paramsUser.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_405));
__VLS_407.slots.default;
const __VLS_408 = {}.SelectTrigger;
/** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
// @ts-ignore
const __VLS_409 = __VLS_asFunctionalComponent(__VLS_408, new __VLS_408({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}));
const __VLS_410 = __VLS_409({
    ...{ class: "flex w-full flex-wrap items-center rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    'aria-label': "Customise options",
}, ...__VLS_functionalComponentArgsRest(__VLS_409));
__VLS_411.slots.default;
const __VLS_412 = {}.SelectValue;
/** @type {[typeof __VLS_components.SelectValue, ]} */ ;
// @ts-ignore
const __VLS_413 = __VLS_asFunctionalComponent(__VLS_412, new __VLS_412({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn trạng thái",
}));
const __VLS_414 = __VLS_413({
    ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
    placeholder: "Chọn trạng thái",
}, ...__VLS_functionalComponentArgsRest(__VLS_413));
const __VLS_416 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_417 = __VLS_asFunctionalComponent(__VLS_416, new __VLS_416({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_418 = __VLS_417({
    icon: "radix-icons:chevron-down",
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_417));
var __VLS_411;
const __VLS_420 = {}.SelectPortal;
/** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
// @ts-ignore
const __VLS_421 = __VLS_asFunctionalComponent(__VLS_420, new __VLS_420({}));
const __VLS_422 = __VLS_421({}, ...__VLS_functionalComponentArgsRest(__VLS_421));
__VLS_423.slots.default;
const __VLS_424 = {}.SelectContent;
/** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
// @ts-ignore
const __VLS_425 = __VLS_asFunctionalComponent(__VLS_424, new __VLS_424({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}));
const __VLS_426 = __VLS_425({
    ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
    position: "popper",
    sideOffset: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_425));
__VLS_427.slots.default;
const __VLS_428 = {}.SelectViewport;
/** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
// @ts-ignore
const __VLS_429 = __VLS_asFunctionalComponent(__VLS_428, new __VLS_428({}));
const __VLS_430 = __VLS_429({}, ...__VLS_functionalComponentArgsRest(__VLS_429));
__VLS_431.slots.default;
const __VLS_432 = {}.SelectGroup;
/** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
// @ts-ignore
const __VLS_433 = __VLS_asFunctionalComponent(__VLS_432, new __VLS_432({}));
const __VLS_434 = __VLS_433({}, ...__VLS_functionalComponentArgsRest(__VLS_433));
__VLS_435.slots.default;
const __VLS_436 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_437 = __VLS_asFunctionalComponent(__VLS_436, new __VLS_436({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(1)),
}));
const __VLS_438 = __VLS_437({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(1)),
}, ...__VLS_functionalComponentArgsRest(__VLS_437));
__VLS_439.slots.default;
const __VLS_440 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_441 = __VLS_asFunctionalComponent(__VLS_440, new __VLS_440({}));
const __VLS_442 = __VLS_441({}, ...__VLS_functionalComponentArgsRest(__VLS_441));
__VLS_443.slots.default;
var __VLS_443;
var __VLS_439;
const __VLS_444 = {}.SelectItem;
/** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
// @ts-ignore
const __VLS_445 = __VLS_asFunctionalComponent(__VLS_444, new __VLS_444({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(2)),
}));
const __VLS_446 = __VLS_445({
    ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
    value: (String(2)),
}, ...__VLS_functionalComponentArgsRest(__VLS_445));
__VLS_447.slots.default;
const __VLS_448 = {}.SelectItemText;
/** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
// @ts-ignore
const __VLS_449 = __VLS_asFunctionalComponent(__VLS_448, new __VLS_448({}));
const __VLS_450 = __VLS_449({}, ...__VLS_functionalComponentArgsRest(__VLS_449));
__VLS_451.slots.default;
var __VLS_451;
var __VLS_447;
var __VLS_435;
var __VLS_431;
var __VLS_427;
var __VLS_423;
var __VLS_407;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-10 flex flex-wrap items-stretch justify-center gap-4 text-center xl:gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (() => __VLS_ctx.emit('toggle-modal')) },
    type: "button",
    ...{ class: "hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "border-main bg-main hover:shadow-hoverinset inset-sha relative inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
    ...{ class: ({ 'pointer-events-none opacity-75': __VLS_ctx.onSubmitting }) },
});
if (__VLS_ctx.onSubmitting) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" },
    });
    const __VLS_452 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_453 = __VLS_asFunctionalComponent(__VLS_452, new __VLS_452({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }));
    const __VLS_454 = __VLS_453({
        icon: "eos-icons:three-dots-loading",
        ...{ class: "aspect-square h-full w-12" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_453));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['m-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[24px_16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:p-[24px_48px]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:col-span-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-6']} */ ;
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
/** @type {__VLS_StyleScopedClasses['xl:col-span-6']} */ ;
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
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
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
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
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
/** @type {__VLS_StyleScopedClasses['md:col-span-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
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
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
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
/** @type {__VLS_StyleScopedClasses['md:col-span-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
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
/** @type {__VLS_StyleScopedClasses['inset-sha']} */ ;
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
            Modal: Modal,
            emit: emit,
            pickerDOB: pickerDOB,
            pickerDateissue: pickerDateissue,
            pickerWorkingDay: pickerWorkingDay,
            updateDates: updateDates,
            paramsUser: paramsUser,
            errors: errors,
            email: email,
            emailAttrs: emailAttrs,
            phone: phone,
            phoneAttrs: phoneAttrs,
            name: name,
            nameAttrs: nameAttrs,
            code: code,
            codeAttrs: codeAttrs,
            group_user: group_user,
            guAttrs: guAttrs,
            listGrPermiss: listGrPermiss,
            staffType: staffType,
            staffData: staffData,
            positionType: positionType,
            positionData: positionData,
            regionType: regionType,
            regionData: regionData,
            leaderType: leaderType,
            leaderData: leaderData,
            mccData: mccData,
            onSubmitting: onSubmitting,
            onSubmitRegister: onSubmitRegister,
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
//# sourceMappingURL=ModalRegisterUser.vue.js.map