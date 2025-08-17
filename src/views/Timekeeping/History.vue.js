/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import '@vuepic/vue-datepicker/dist/main.css';
import { Icon } from '@iconify/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale/vi';
import { storeToRefs } from 'pinia';
import { SelectContent, SelectGroup, SelectItem, SelectItemText, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue, SelectViewport, } from 'radix-vue';
import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue';
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import Breadcrums from '@/components/BreadcrumsNew.vue';
import ModalAddWorkHistory from '@/components/Modal/ModalAddWorkHistory.vue';
import Modal from '@/components/Modals.vue';
import { useWork } from '@/composables/work';
import { apiUri } from '@/constants/apiUri';
import router from '@/router';
import { usePermissionStore } from '@/store/permission';
import { tableMagic } from '@/utils/main';
import MainLayout from '@/views/MainLayout.vue';
const toast = reactive({
    toastA: false,
});
const auth = useAuth();
const toggleBoxFilters = ref(false);
const screenWidth = ref(window.innerWidth);
const isInputActive = ref(false);
let resizeTimer;
// Chỉ cập nhật toggleBoxFilters khi không có input đang focus
const updateLayout = () => {
    screenWidth.value = window.innerWidth;
    if (!isInputActive.value) {
        toggleBoxFilters.value = screenWidth.value >= 768;
    }
};
// Xử lý sự kiện khi input được focus/blur
const trackInputState = (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        isInputActive.value = event.type === 'focus';
    }
};
// Add event listener for window resize
onMounted(() => {
    // Khởi tạo giá trị ban đầu
    updateLayout();
    // Theo dõi resize với debounce
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateLayout, 100);
    });
    // Sử dụng event capturing để theo dõi tất cả input
    document.addEventListener('focus', trackInputState, true);
    document.addEventListener('blur', trackInputState, true);
});
onBeforeUnmount(() => {
    document.removeEventListener('focus', trackInputState, true);
    document.removeEventListener('blur', trackInputState, true);
    window.removeEventListener('resize', updateLayout);
    clearTimeout(resizeTimer);
});
// Watch for screenWidth changes
watch(screenWidth, () => {
    updateLayout();
});
const modalActive = ref({
    modalStatusAddLeave: false,
    modalStatusEditLeave: false,
    modalStatusConfirm: false,
    modalAddWorkHistory: false,
});
const toggleModal = (modalStateName) => {
    modalActive.value[modalStateName] = !modalActive.value[modalStateName];
};
const tbhead = reactive([
    {
        title: 'STT',
        hasSort: false,
    },
    {
        title: 'Họ và tên',
        hasSort: false,
    },
    {
        title: 'Ngày làm việc',
        hasSort: false,
    },
    {
        title: 'Giờ vào',
        hasSort: false,
    },
    {
        title: 'Giờ ra',
        hasSort: false,
    },
    {
        title: 'Giờ làm việc',
        hasSort: false,
    },
]);
const paramsWorkHistory = reactive({
    begin_date: '',
    finish_date: '',
    name: '',
});
const datepicker = ref(null);
const startDate = new Date(new Date().setDate(1));
const endDate = new Date();
datepicker.value = [startDate, endDate];
paramsWorkHistory.begin_date = format(startDate, 'yyyy-MM-dd');
paramsWorkHistory.finish_date = format(endDate, 'yyyy-MM-dd');
const updateDates = () => {
    if (datepicker.value) {
        paramsWorkHistory.begin_date = format(datepicker.value[0], 'yyyy-MM-dd');
        paramsWorkHistory.finish_date = format(datepicker.value[1], 'yyyy-MM-dd');
    }
};
watch(datepicker, () => {
    if (auth.check()) {
        updateDates();
    }
});
const paginate = reactive({
    page: 1,
    per_page: 20,
});
const debounceTime = ref({
    timeOut: null,
    counter: 0,
});
const fetchDataWorkHistory = () => {
    if (debounceTime.value.timeOut !== null) {
        clearTimeout(debounceTime.value.timeOut);
    }
    debounceTime.value.timeOut = setTimeout(() => {
        const res = {
            ...paramsWorkHistory,
            page: paginate.page,
            per_page: paginate.per_page,
        };
        doFetch(`${apiUri}/work/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`, auth.token()).then(() => {
            // console.log('🚀 ~ fetchDataWorkHistory ~ res:', res)
            tableMagic();
        });
    }, 300);
};
const dataTotalPages = computed(() => Math.ceil(Number(dataWorkHistory.doc?.pagination?.total) / Number(paginate.per_page)));
const handlePageChange = (pageNum) => {
    // console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
    paginate.page = pageNum;
    fetchDataWorkHistory();
};
const dataUserMCC = reactive({
    items: [],
});
const fetchDataUserMCC = async () => {
    const res = await axios.get(`${apiUri}/work/usermcc`, {
        headers: {
            Authorization: `Bearer ${auth.token()}`,
            'Content-Type': 'application/json',
        },
    });
    const { items } = res.data.data;
    dataUserMCC.items = Object.values(items);
};
const handleSearchWorkHistory = async () => {
    try {
        const formData = new FormData();
        formData.append('begin_date', paramsWorkHistory.begin_date);
        formData.append('finish_date', paramsWorkHistory.finish_date);
        formData.append('name', paramsWorkHistory.name);
        const res = await axios.post(`${apiUri}/work/list`, formData, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        fetchDataWorkHistory();
        console.log('🚀 ~ handleSearchWorkHistory ~ res:', res);
    }
    catch (error) {
        console.log('🚀 ~ handleSearchWorkHistory ~ error:', error);
    }
};
const dataUserExplain = ref(null);
const handleUserExplain = async (id, date) => {
    try {
        dataUserExplain.value = dataWorkHistory.doc?.items?.[Number(id)]?.[date];
        console.log('🚀 ~ handleUserExplain ~ dataUserExplain.value:', dataUserExplain.value);
        toggleModal('modalAddWorkHistory');
    }
    catch (error) {
        console.log('🚀 ~ handleUserExplain ~ error:', error);
    }
};
const { data, doFetch } = useWork();
const dataWorkHistory = reactive({
    doc: data,
});
const dataWorkHistoryList = computed(() => {
    if (!dataWorkHistory.doc?.items)
        return [];
    return Object.entries(dataWorkHistory.doc.items).map(([key, values]) => ({
        values: Object.values(values),
    }));
});
console.log('🚀 ~ dataWorkHistoryList:', dataWorkHistoryList);
const dataPostRequest = ref(null);
const getPostRequest = (data) => {
    dataPostRequest.value = data;
    if (dataPostRequest.value)
        toast.toastA = true;
    if (dataPostRequest.value.status == 1)
        toggleModal('modalAddWorkHistory');
};
const permissionStore = usePermissionStore();
const { permissionList } = storeToRefs(permissionStore);
const { checkPermission } = permissionStore;
watch(permissionList, () => {
    console.log('🚀 ~ //onMounted ~ permissionList:', permissionList);
    if (auth.check()) {
        if (!permissionList.value.includes('Document')) {
            alert('Bạn không có quyền truy cập vào trang này');
            router.push({ name: 'NotFound404' });
        }
        else {
            fetchDataWorkHistory();
            console.log(dataWorkHistory, 'dataWorkHistory');
        }
    }
});
watch(paginate, async () => {
    fetchDataWorkHistory();
}, {
    // must pass deep option to watch for changes on object properties
    deep: true,
    // can also pass immediate to handle that first request AND when queries change
    immediate: true,
});
onMounted(() => {
    if (auth.check()) {
        fetchDataWorkHistory();
        fetchDataUserMCC();
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof MainLayout, typeof MainLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MainLayout, new MainLayout({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
/** @type {[typeof Breadcrums, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(Breadcrums, new Breadcrums({
    name: "Lịch sử chấm công",
    path: "/timekeeping/history",
}));
const __VLS_5 = __VLS_4({
    name: "Lịch sử chấm công",
    path: "/timekeeping/history",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
if (__VLS_ctx.toggleBoxFilters) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-5 rounded-[24px] bg-white p-2.5" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSearchWorkHistory) },
        ...{ class: "flex flex-wrap gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "xxl:gap-4 flex grow flex-wrap items-stretch gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex-[0_0_calc((100%-16px)/2)] max-lg:w-[calc(50%-4px)] max-lg:flex-[0_0_calc(50%-4px)] max-md:w-[calc(100%)] max-md:flex-[0_0_calc(100%)]" },
    });
    const __VLS_7 = {}.SelectRoot;
    /** @type {[typeof __VLS_components.SelectRoot, typeof __VLS_components.SelectRoot, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        modelValue: (__VLS_ctx.paramsWorkHistory.name),
    }));
    const __VLS_9 = __VLS_8({
        modelValue: (__VLS_ctx.paramsWorkHistory.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_10.slots.default;
    const __VLS_11 = {}.SelectTrigger;
    /** @type {[typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        ...{ class: "flex h-full w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    }));
    const __VLS_13 = __VLS_12({
        ...{ class: "flex h-full w-full flex-wrap items-center rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[6px_12px] text-[#000] focus:outline-none data-[placeholder]:text-[#909090]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_14.slots.default;
    const __VLS_15 = {}.SelectValue;
    /** @type {[typeof __VLS_components.SelectValue, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[15px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
        placeholder: "Tên nhân viên",
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "font-inter w-[90%] grow overflow-hidden text-start text-[15px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]" },
        placeholder: "Tên nhân viên",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const __VLS_19 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        icon: "radix-icons:chevron-down",
        ...{ class: "h-3.5 w-3.5" },
    }));
    const __VLS_21 = __VLS_20({
        icon: "radix-icons:chevron-down",
        ...{ class: "h-3.5 w-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    var __VLS_14;
    const __VLS_23 = {}.SelectPortal;
    /** @type {[typeof __VLS_components.SelectPortal, typeof __VLS_components.SelectPortal, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
    const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
    __VLS_26.slots.default;
    const __VLS_27 = {}.SelectContent;
    /** @type {[typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ]} */ ;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
        position: "popper",
        sideOffset: (5),
    }));
    const __VLS_29 = __VLS_28({
        ...{ class: "SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]" },
        position: "popper",
        sideOffset: (5),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    __VLS_30.slots.default;
    const __VLS_31 = {}.SelectScrollUpButton;
    /** @type {[typeof __VLS_components.SelectScrollUpButton, typeof __VLS_components.SelectScrollUpButton, ]} */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
    }));
    const __VLS_33 = __VLS_32({
        ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_34.slots.default;
    const __VLS_35 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        icon: "radix-icons:chevron-up",
    }));
    const __VLS_37 = __VLS_36({
        icon: "radix-icons:chevron-up",
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    var __VLS_34;
    const __VLS_39 = {}.SelectViewport;
    /** @type {[typeof __VLS_components.SelectViewport, typeof __VLS_components.SelectViewport, ]} */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({}));
    const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
    __VLS_42.slots.default;
    const __VLS_43 = {}.SelectGroup;
    /** @type {[typeof __VLS_components.SelectGroup, typeof __VLS_components.SelectGroup, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
    const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
    __VLS_46.slots.default;
    const __VLS_47 = {}.SelectItem;
    /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: "all",
    }));
    const __VLS_49 = __VLS_48({
        ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
        value: "all",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_50.slots.default;
    const __VLS_51 = {}.SelectItemText;
    /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({}));
    const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_54.slots.default;
    var __VLS_54;
    var __VLS_50;
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.dataUserMCC.items))) {
        const __VLS_55 = {}.SelectItem;
        /** @type {[typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ]} */ ;
        // @ts-ignore
        const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item)),
        }));
        const __VLS_57 = __VLS_56({
            ...{ class: "p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer" },
            value: (String(item)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_56));
        __VLS_58.slots.default;
        const __VLS_59 = {}.SelectItemText;
        /** @type {[typeof __VLS_components.SelectItemText, typeof __VLS_components.SelectItemText, ]} */ ;
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({}));
        const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
        __VLS_62.slots.default;
        (item);
        var __VLS_62;
        var __VLS_58;
    }
    var __VLS_46;
    var __VLS_42;
    const __VLS_63 = {}.SelectScrollDownButton;
    /** @type {[typeof __VLS_components.SelectScrollDownButton, typeof __VLS_components.SelectScrollDownButton, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
    }));
    const __VLS_65 = __VLS_64({
        ...{ class: "text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_66.slots.default;
    const __VLS_67 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
        icon: "radix-icons:chevron-down",
    }));
    const __VLS_69 = __VLS_68({
        icon: "radix-icons:chevron-down",
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    var __VLS_66;
    var __VLS_30;
    var __VLS_26;
    var __VLS_10;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex-[0_0_calc((100%-16px)/2)] max-lg:w-[calc(50%-4px)] max-lg:flex-[0_0_calc(50%-4px)] max-md:w-[calc(100%)] max-md:flex-[0_0_calc(100%)]" },
    });
    const __VLS_71 = {}.VueDatePicker;
    /** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (__VLS_ctx.datepicker),
        ...{ class: "work-history-datepicker" },
        enableTimePicker: (false),
        locale: "vi",
        formatLocale: (__VLS_ctx.vi),
        cancelText: "Huỷ",
        selectText: "Chọn",
        range: true,
        format: "dd/MM/yyyy",
        maxDate: (new Date()),
    }));
    const __VLS_73 = __VLS_72({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (__VLS_ctx.datepicker),
        ...{ class: "work-history-datepicker" },
        enableTimePicker: (false),
        locale: "vi",
        formatLocale: (__VLS_ctx.vi),
        cancelText: "Huỷ",
        selectText: "Chọn",
        range: true,
        format: "dd/MM/yyyy",
        maxDate: (new Date()),
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    let __VLS_75;
    let __VLS_76;
    let __VLS_77;
    const __VLS_78 = {
        'onUpdate:modelValue': (__VLS_ctx.updateDates)
    };
    var __VLS_74;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "hover:shadow-hoverinset inline-flex cursor-pointer items-center justify-center gap-2 rounded-[24px] bg-[#013878] p-[8px_16px] transition max-md:flex-[100%]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        d: "M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z",
        stroke: "white",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        d: "M21.0002 21L16.7002 16.7",
        stroke: "white",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "font-inter text-[15px] leading-normal font-bold text-white" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3 flex flex-wrap items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.toggleBoxFilters = !__VLS_ctx.toggleBoxFilters;
        } },
    type: "button",
    ...{ class: "inline-block h-9 w-9 rounded-md bg-white md:hidden" },
});
const __VLS_79 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    icon: "lsicon:filter-outline",
    ...{ class: "h-full w-full p-1.5" },
}));
const __VLS_81 = __VLS_80({
    icon: "lsicon:filter-outline",
    ...{ class: "h-full w-full p-1.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "font-inter hidden flex-[1] text-[20px] leading-normal font-bold text-[#464661] max-md:text-[16px] md:block" },
});
if (__VLS_ctx.checkPermission('Work', 'List')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex h-full flex-col overflow-hidden" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "tableMagic",
        ...{ class: "table-magic styleTableMagic max-md:mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "tableRowHeader",
        ...{ class: "header table-row justify-between !ps-5" },
    });
    for (const [column, index] of __VLS_getVForSourceType((__VLS_ctx.tbhead))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (index),
            ...{ class: "cell" },
        });
        (column.title);
        if (column.hasSort) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "tb-sort" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                type: "button",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: "@/assets/images/tb-sort.svg",
                alt: "",
            });
        }
    }
    if (__VLS_ctx.checkPermission('Work', 'Create')) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell pinned !py-4.5 !pe-2.5" },
        });
    }
    if (__VLS_ctx.dataWorkHistoryList) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            id: "tableRowBody",
            ...{ class: "body table-row" },
        });
        for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.dataWorkHistoryList))) {
            (index);
            for (const [it, itIndex] of __VLS_getVForSourceType((item.values))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    key: (itIndex),
                    ...{ class: "table-item justify-between !ps-5" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "cell" },
                });
                (index + 1);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "cell" },
                });
                (it?.user_name);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "cell" },
                });
                (it?.work_date);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "cell" },
                });
                (it?.check_in);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "cell" },
                });
                (it?.check_out);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "cell" },
                });
                (it?.total_hours);
                if (__VLS_ctx.checkPermission('Work', 'Create')) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                        ...{ class: "cell pinned pinned-body justify-center !pe-2.5" },
                    });
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                        ...{ onClick: (...[$event]) => {
                                if (!(__VLS_ctx.checkPermission('Work', 'List')))
                                    return;
                                if (!(__VLS_ctx.dataWorkHistoryList))
                                    return;
                                if (!(__VLS_ctx.checkPermission('Work', 'Create')))
                                    return;
                                __VLS_ctx.handleUserExplain(it.user_id, it.work_date);
                            } },
                        type: "button",
                        ...{ class: "cell-btn-edit shrink-0 cursor-pointer" },
                    });
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                        src: "@/assets/images/action-edit-2.svg",
                        alt: "",
                    });
                }
            }
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tb-pagination flex flex-wrap items-center gap-2 max-md:justify-center md:gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        id: "selectPerPage",
        value: (__VLS_ctx.paginate.per_page),
        name: "",
        ...{ class: "cursor-pointer appearance-none rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[8px_12px] text-[14px] font-normal text-[#464661] focus:outline-none md:min-w-[264px]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "10",
        selected: (__VLS_ctx.paginate.per_page === 10),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "20",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "30",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "40",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pointer-events-none absolute top-[50%] right-3 -translate-y-[50%] max-md:hidden" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        width: "8",
        height: "6",
        viewBox: "0 0 8 6",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        d: "M0.964013 1.1641C1.04759 1.08049 1.14682 1.01417 1.25603 0.968927C1.36524 0.92368 1.4823 0.900391 1.60051 0.900391C1.71873 0.900391 1.83578 0.92368 1.945 0.968927C2.05421 1.01417 2.15344 1.08049 2.23701 1.1641L4.00001 2.9271L5.76401 1.1641C5.9339 1.00121 6.16083 0.911356 6.39617 0.913785C6.63152 0.916214 6.85654 1.01073 7.02303 1.17709C7.18952 1.34345 7.28422 1.5684 7.28683 1.80374C7.28944 2.03908 7.19976 2.26609 7.03701 2.4361L4.63701 4.8361C4.55344 4.9197 4.45421 4.98602 4.345 5.03127C4.23578 5.07652 4.11873 5.09981 4.00051 5.09981C3.8823 5.09981 3.76524 5.07652 3.65603 5.03127C3.54682 4.98602 3.44759 4.9197 3.36401 4.8361L0.964013 2.4361C0.795473 2.26735 0.700806 2.0386 0.700806 1.8001C0.700806 1.5616 0.795473 1.33285 0.964013 1.1641Z",
        fill: "#363636",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-wrap items-center gap-2 md:ms-auto" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-[14px] font-normal text-[#464661]" },
    });
    if (__VLS_ctx.dataWorkHistory.doc?.pagination?.total &&
        Number(__VLS_ctx.dataWorkHistory.doc?.pagination.total) > __VLS_ctx.paginate.per_page) {
        (__VLS_ctx.paginate.per_page);
        (__VLS_ctx.dataWorkHistory.doc?.pagination?.total || 0);
    }
    else {
        (__VLS_ctx.dataWorkHistory.doc?.pagination?.total || 0);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tb-navigation flex flex-wrap items-center md:gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.checkPermission('Work', 'List')))
                    return;
                __VLS_ctx.handlePageChange(__VLS_ctx.paginate.page - 1);
            } },
        ...{ class: ({ disabled: __VLS_ctx.paginate.page === 1 }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        d: "M14.69 17.29C14.7827 17.1975 14.8562 17.0876 14.9064 16.9666C14.9566 16.8456 14.9824 16.7159 14.9824 16.585C14.9824 16.454 14.9566 16.3243 14.9064 16.2034C14.8562 16.0824 14.7827 15.9725 14.69 15.88L10.81 12L14.69 8.11998C14.877 7.933 14.982 7.67941 14.982 7.41498C14.982 7.15055 14.877 6.89695 14.69 6.70998C14.503 6.523 14.2494 6.41796 13.985 6.41796C13.7206 6.41796 13.467 6.523 13.28 6.70998L8.68998 11.3C8.59727 11.3925 8.52373 11.5024 8.47355 11.6234C8.42336 11.7443 8.39753 11.874 8.39753 12.005C8.39753 12.1359 8.42336 12.2656 8.47355 12.3866C8.52373 12.5076 8.59727 12.6175 8.68998 12.71L13.28 17.3C13.66 17.68 14.3 17.68 14.69 17.29Z",
        fill: "#363636",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "",
        type: "text",
        name: "",
        value: (__VLS_ctx.paginate.page),
        ...{ class: "inline-flex h-[32px] w-[32px] flex-col items-center justify-center rounded-[8px] border border-solid border-[#909090] bg-white text-center text-[16px] font-bold text-[#464661]" },
        readonly: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.checkPermission('Work', 'List')))
                    return;
                __VLS_ctx.handlePageChange(__VLS_ctx.paginate.page + 1);
            } },
        ...{ class: ({
                disabled: Number(__VLS_ctx.paginate.page) >= __VLS_ctx.dataTotalPages,
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        d: "M9.31002 6.71002C9.21732 6.80254 9.14377 6.91242 9.09359 7.0334C9.04341 7.15437 9.01758 7.28405 9.01758 7.41502C9.01758 7.54599 9.04341 7.67567 9.09359 7.79665C9.14377 7.91762 9.21732 8.02751 9.31002 8.12002L13.19 12L9.31002 15.88C9.12304 16.067 9.018 16.3206 9.018 16.585C9.018 16.8494 9.12304 17.103 9.31002 17.29C9.497 17.477 9.7506 17.582 10.015 17.582C10.2794 17.582 10.533 17.477 10.72 17.29L15.31 12.7C15.4027 12.6075 15.4763 12.4976 15.5265 12.3766C15.5766 12.2557 15.6025 12.126 15.6025 11.995C15.6025 11.8641 15.5766 11.7344 15.5265 11.6134C15.4763 11.4924 15.4027 11.3825 15.31 11.29L10.72 6.70002C10.34 6.32002 9.70002 6.32002 9.31002 6.71002Z",
        fill: "#363636",
    });
}
/** @type {[typeof Modal, typeof Modal, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(Modal, new Modal({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalAddWorkHistory),
    maxWidth: "max-w-[670px]",
}));
const __VLS_84 = __VLS_83({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalAddWorkHistory),
    maxWidth: "max-w-[670px]",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
let __VLS_86;
let __VLS_87;
let __VLS_88;
const __VLS_89 = {
    onClose: (...[$event]) => {
        __VLS_ctx.toggleModal('modalAddWorkHistory');
    }
};
__VLS_85.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-12 text-center max-xl:mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "m-0 text-[16px] font-bold text-[#464661] uppercase" },
});
/** @type {[typeof ModalAddWorkHistory, typeof ModalAddWorkHistory, ]} */ ;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(ModalAddWorkHistory, new ModalAddWorkHistory({
    ...{ 'onPostRequest': {} },
    datatype: (__VLS_ctx.dataUserExplain),
    propFunction: (__VLS_ctx.fetchDataWorkHistory),
}));
const __VLS_91 = __VLS_90({
    ...{ 'onPostRequest': {} },
    datatype: (__VLS_ctx.dataUserExplain),
    propFunction: (__VLS_ctx.fetchDataWorkHistory),
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
let __VLS_93;
let __VLS_94;
let __VLS_95;
const __VLS_96 = {
    onPostRequest: (__VLS_ctx.getPostRequest)
};
__VLS_92.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.toggleModal('modalAddWorkHistory');
        } },
    type: "button",
    ...{ class: "hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
});
var __VLS_92;
var __VLS_85;
const __VLS_97 = {}.ToastProvider;
/** @type {[typeof __VLS_components.ToastProvider, typeof __VLS_components.ToastProvider, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({}));
const __VLS_99 = __VLS_98({}, ...__VLS_functionalComponentArgsRest(__VLS_98));
__VLS_100.slots.default;
const __VLS_101 = {}.ToastRoot;
/** @type {[typeof __VLS_components.ToastRoot, typeof __VLS_components.ToastRoot, ]} */ ;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
    open: (__VLS_ctx.toast.toastA),
    duration: (5000),
    ...{ class: "flex flex-col gap-1.5 rounded-md p-3 shadow-2xl" },
    ...{ class: ({
            'bg-[#ffd0d0]': __VLS_ctx.dataPostRequest?.errors[Object.keys(__VLS_ctx.dataPostRequest?.errors)[0]],
            'bg-[#c4ffd0]': __VLS_ctx.dataPostRequest?.status === 1,
        }) },
}));
const __VLS_103 = __VLS_102({
    open: (__VLS_ctx.toast.toastA),
    duration: (5000),
    ...{ class: "flex flex-col gap-1.5 rounded-md p-3 shadow-2xl" },
    ...{ class: ({
            'bg-[#ffd0d0]': __VLS_ctx.dataPostRequest?.errors[Object.keys(__VLS_ctx.dataPostRequest?.errors)[0]],
            'bg-[#c4ffd0]': __VLS_ctx.dataPostRequest?.status === 1,
        }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
__VLS_104.slots.default;
const __VLS_105 = {}.ToastTitle;
/** @type {[typeof __VLS_components.ToastTitle, typeof __VLS_components.ToastTitle, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    ...{ class: "text-[13px] font-medium" },
}));
const __VLS_107 = __VLS_106({
    ...{ class: "text-[13px] font-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
__VLS_108.slots.default;
(__VLS_ctx.dataPostRequest?.message);
var __VLS_108;
if (__VLS_ctx.dataPostRequest?.errors[Object.keys(__VLS_ctx.dataPostRequest?.errors)[0]]) {
    const __VLS_109 = {}.ToastDescription;
    /** @type {[typeof __VLS_components.ToastDescription, typeof __VLS_components.ToastDescription, ]} */ ;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
        ...{ class: "text-[11px] font-normal" },
    }));
    const __VLS_111 = __VLS_110({
        ...{ class: "text-[11px] font-normal" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    __VLS_112.slots.default;
    (__VLS_ctx.dataPostRequest?.errors[Object.keys(__VLS_ctx.dataPostRequest?.errors)[0]]);
    var __VLS_112;
}
var __VLS_104;
const __VLS_113 = {}.ToastViewport;
/** @type {[typeof __VLS_components.ToastViewport, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    ...{ class: "fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" },
}));
const __VLS_115 = __VLS_114({
    ...{ class: "fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
var __VLS_100;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['xxl:gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-[0_0_calc((100%-16px)/2)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:w-[calc(50%-4px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:flex-[0_0_calc(50%-4px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:w-[calc(100%)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:flex-[0_0_calc(100%)]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[6px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000]']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['data-[placeholder]:text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[90%]']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[15px]']} */ ;
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
/** @type {__VLS_StyleScopedClasses['flex-[0_0_calc((100%-16px)/2)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:w-[calc(50%-4px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-lg:flex-[0_0_calc(50%-4px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:w-[calc(100%)]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:flex-[0_0_calc(100%)]']} */ ;
/** @type {__VLS_StyleScopedClasses['work-history-datepicker']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#013878]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[8px_16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:flex-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[15px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-[1]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['table-magic']} */ ;
/** @type {__VLS_StyleScopedClasses['styleTableMagic']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['!ps-5']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['tb-sort']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['pinned']} */ ;
/** @type {__VLS_StyleScopedClasses['!py-4.5']} */ ;
/** @type {__VLS_StyleScopedClasses['!pe-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['body']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-item']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['!ps-5']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['pinned']} */ ;
/** @type {__VLS_StyleScopedClasses['pinned-body']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['!pe-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-btn-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['tb-pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['appearance-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[8px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[14px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['md:min-w-[264px]']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:ms-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[14px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['tb-navigation']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[32px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[32px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[52px_24px_36px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-xl:mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['m-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
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
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#ffd0d0]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#c4ffd0]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[2147483647]']} */ ;
/** @type {__VLS_StyleScopedClasses['m-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[390px]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[100vw]']} */ ;
/** @type {__VLS_StyleScopedClasses['list-none']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[var(--viewport-padding)]']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['[--viewport-padding:_25px]']} */ ;
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
            ToastDescription: ToastDescription,
            ToastProvider: ToastProvider,
            ToastRoot: ToastRoot,
            ToastTitle: ToastTitle,
            ToastViewport: ToastViewport,
            Breadcrums: Breadcrums,
            ModalAddWorkHistory: ModalAddWorkHistory,
            Modal: Modal,
            MainLayout: MainLayout,
            toast: toast,
            toggleBoxFilters: toggleBoxFilters,
            modalActive: modalActive,
            toggleModal: toggleModal,
            tbhead: tbhead,
            paramsWorkHistory: paramsWorkHistory,
            datepicker: datepicker,
            updateDates: updateDates,
            paginate: paginate,
            fetchDataWorkHistory: fetchDataWorkHistory,
            dataTotalPages: dataTotalPages,
            handlePageChange: handlePageChange,
            dataUserMCC: dataUserMCC,
            handleSearchWorkHistory: handleSearchWorkHistory,
            dataUserExplain: dataUserExplain,
            handleUserExplain: handleUserExplain,
            dataWorkHistory: dataWorkHistory,
            dataWorkHistoryList: dataWorkHistoryList,
            dataPostRequest: dataPostRequest,
            getPostRequest: getPostRequest,
            checkPermission: checkPermission,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=History.vue.js.map