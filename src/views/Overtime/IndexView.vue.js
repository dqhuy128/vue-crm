/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue';
import { RadioGroupItem, RadioGroupRoot } from 'radix-vue';
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import Breadcrums from '@/components/BreadcrumsNew.vue';
import ModalAddOvertime from '@/components/Modal/ModalAddOvertime.vue';
import ModalCategoryUpdate from '@/components/Modal/ModalCategoryUpdate.vue';
import Modal from '@/components/Modals.vue';
import { useSystemManager } from '@/composables/system-manager';
import { apiUri } from '@/constants/apiUri';
import router from '@/router';
import { usePermissionStore } from '@/store/permission';
import { tableMagic } from '@/utils/main';
import MainLayout from '../MainLayout.vue';
const toast = reactive({
    toastCreate: false,
    toastUpdate: false,
});
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
    modalAddCateManager: false,
    modalEditCateManager: false,
    modalStatusAdd: false,
    modalStatusEdit: false,
    modalStatusConfirm: false,
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
        title: 'Mã NV',
        hasSort: false,
    },
    {
        title: 'Họ và tên',
        hasSort: false,
    },
    {
        title: 'Ngày tăng ca',
        hasSort: false,
    },
    {
        title: 'Thời gian tăng ca',
        hasSort: false,
    },
    {
        title: 'Lý do nghỉ',
        hasSort: false,
    },
]);
const auth = useAuth();
const params = reactive({
    type: '',
    name: '',
});
const paginate = reactive({
    page: 1,
    per_page: 20,
});
const debounceTime = ref({
    timeOut: null,
    counter: 0,
});
const fetchDataOvertime = () => {
    if (debounceTime.value.timeOut !== null) {
        clearTimeout(debounceTime.value.timeOut);
    }
    debounceTime.value.timeOut = setTimeout(() => {
        const res = {
            ...params,
            page: paginate.page,
            per_page: paginate.per_page,
        };
        doFetch(`${apiUri}/orvertime/list?${new URLSearchParams(Object.fromEntries(Object.entries(res).map(([key, value]) => [key, String(value)]))).toString()}`, auth.token()).then(() => {
            console.log('🚀 ~ fetchDataOvertime ~ res:', res);
            tableMagic();
        });
    }, 300);
};
const handlePageChange = (pageNum) => {
    // console.log('🚀 ~ handlePageChange ~ pageNum:', pageNum)
    paginate.page = pageNum;
    fetchDataOvertime();
};
const categoryToDelete = ref(null);
const confirmDeleteCategory = (id) => {
    toggleModal('modalStatusConfirm');
    categoryToDelete.value = id.toString();
};
const handleDeleteCategory = async () => {
    if (!categoryToDelete.value)
        return;
    try {
        const formData = new FormData();
        formData.append('id', categoryToDelete.value);
        const response = await axios.post(`${apiUri}/categories/delete`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        toggleModal('modalStatusConfirm');
        fetchDataOvertime();
        // console.log('🚀 ~ handleDeleteCategory ~ response:', response)
    }
    catch (error) {
        console.log('🚀 ~ handleDeleteCategory ~ error:', error);
    }
};
const dataDetailCategory = ref(null);
const getDetailCategory = async (id) => {
    try {
        const response = await axios.get(`${apiUri}/categories/detail?id=${id}`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        toggleModal('modalEditCateManager');
        dataDetailCategory.value = response.data;
        // console.log('🚀 ~ getDetailCategory ~ response:', response.data)
    }
    catch (error) { }
};
const dataPostRequest = ref(null);
const getPostRequest = (data) => {
    dataPostRequest.value = data;
    if (dataPostRequest.value) {
        toggleModal('modalAddCateManager');
        toast.toastCreate = true;
    }
    // if (dataPostRequest.value.status === 1) toggleModal('modalAddLeave')
};
const dataPostRequestEdit = ref(null);
const getPostRequestEdit = (data) => {
    dataPostRequestEdit.value = data;
    if (dataPostRequestEdit.value) {
        toggleModal('modalEditCateManager');
        toast.toastUpdate = true;
    }
    // if (dataPostRequestEdit.value.status === 1) toggleModal('modalEditLeave')
};
const { data, doFetch } = useSystemManager();
const dataOvertime = reactive({
    doc: data,
});
const selectData = computed(() => {
    return dataOvertime.doc?.items || [];
});
const dataTotalPages = computed(() => Math.ceil(Number(dataOvertime.doc?.pagination?.total) / Number(paginate.per_page)));
const activeDropdownManager = ref(null);
const toggleDropdownManager = (id) => {
    if (activeDropdownManager.value === id) {
        activeDropdownManager.value = null;
    }
    else {
        activeDropdownManager.value = id;
    }
};
const activeDropdownHuman = ref(null);
const toggleDropdownHuman = (id) => {
    if (activeDropdownHuman.value === id) {
        activeDropdownHuman.value = null;
    }
    else {
        activeDropdownHuman.value = id;
    }
};
const overtimeItem = ref(null);
const radioStateSingle = ref('0');
const handleApproveLeave = async (id) => {
    if (!radioStateSingle.value)
        return;
    try {
        await radioStateSingle.value;
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append('status', radioStateSingle.value);
        const response = await axios
            .post(`${apiUri}/leave/status`, formData, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        })
            .then((res) => {
            if (dataOvertime.doc && dataOvertime.doc.items) {
                overtimeItem.value = dataOvertime.doc.items.find((item) => item.id === id);
                if (!overtimeItem.value)
                    return;
                overtimeItem.value.status =
                    radioStateSingle.value === '1'
                        ? 'Đã phê duyệt'
                        : radioStateSingle.value === '2'
                            ? 'Đã từ chối'
                            : 'Chờ phê duyệt';
            }
            console.log('🚀 ~ handleApproveLeave ~ res:', res.data.message);
        })
            .then(() => {
            tableMagic();
        });
    }
    catch (error) {
        console.log('🚀 ~ handleApproveLeave ~ error:', error);
    }
};
onMounted(() => {
    if (auth.check()) {
        // fetchingSelected()
        fetchDataOvertime();
    }
});
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
            fetchDataOvertime();
            console.log(dataOvertime, 'dataOvertime');
        }
    }
});
watch(paginate, async () => {
    fetchDataOvertime();
}, {
    // must pass deep option to watch for changes on object properties
    deep: true,
    // can also pass immediate to handle that first request AND when queries change
    immediate: true,
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
    name: "Tăng ca",
    path: "/overtime",
}));
const __VLS_5 = __VLS_4({
    name: "Tăng ca",
    path: "/overtime",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
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
const __VLS_7 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    icon: "lsicon:filter-outline",
    ...{ class: "h-full w-full p-1.5" },
}));
const __VLS_9 = __VLS_8({
    icon: "lsicon:filter-outline",
    ...{ class: "h-full w-full p-1.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "font-inter hidden flex-[1] text-[20px] leading-normal font-bold text-[#464661] max-md:text-[16px] md:block" },
});
if (__VLS_ctx.checkPermission('Categories', 'Create')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ms-auto inline-flex flex-wrap items-center gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.checkPermission('Categories', 'Create')))
                    return;
                __VLS_ctx.toggleModal('modalAddCateManager');
            } },
        id: "tableAdding",
        type: "button",
        ...{ class: "hover:shadow-hoverinset inline-flex cursor-pointer items-end justify-center gap-2 rounded-[24px] bg-[#1b4dea] p-[7px_12px] transition max-md:flex-auto max-md:items-center max-md:gap-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: "@/assets/images/si_add-fill.svg",
        alt: "",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "font-inter text-[16px] leading-normal font-bold text-white max-md:text-[14px]" },
    });
}
if (__VLS_ctx.checkPermission('Orvertime', 'List')) {
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
        ...{ class: "header table-row justify-between" },
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell pinned" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cell edit" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "tableRowBody",
        ...{ class: "body table-row" },
    });
    if (__VLS_ctx.dataOvertime.doc) {
        for (const [it, index] of __VLS_getVForSourceType((__VLS_ctx.dataOvertime.doc.items))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (index),
                ...{ class: "table-item justify-between" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            if (index < 9) {
                (index + 1);
            }
            else {
                (index + 1);
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            (it.code);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            (it.name);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            (it.date);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            (it.begin_time);
            (it.finish_time);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            (it.reason);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                            return;
                        if (!(__VLS_ctx.dataOvertime.doc))
                            return;
                        __VLS_ctx.toggleDropdownManager(it.id);
                    } },
                ...{ class: "relative w-full" },
            });
            if (it.manager_status_text == 'Đã phê duyệt') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "status status-green status-body block w-full text-[13px]" },
                });
            }
            if (it.manager_status_text == 'Chờ phê duyệt') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "status status-red status-body block w-full text-[13px]" },
                });
            }
            if (it.manager_status_text == 'Đã từ chối') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "status status-gray status-body block w-full text-[13px]" },
                });
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "invisible absolute right-0 left-0 z-[12] w-full opacity-0 transition" },
                ...{ class: ({
                        'visible opacity-100': __VLS_ctx.activeDropdownManager === it.id,
                    }) },
            });
            const __VLS_11 = {}.RadioGroupRoot;
            /** @type {[typeof __VLS_components.RadioGroupRoot, typeof __VLS_components.RadioGroupRoot, ]} */ ;
            // @ts-ignore
            const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
                modelValue: (__VLS_ctx.radioStateSingle),
                ...{ class: "flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl" },
                defaultValue: "0",
            }));
            const __VLS_13 = __VLS_12({
                modelValue: (__VLS_ctx.radioStateSingle),
                ...{ class: "flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl" },
                defaultValue: "0",
            }, ...__VLS_functionalComponentArgsRest(__VLS_12));
            __VLS_14.slots.default;
            const __VLS_15 = {}.RadioGroupItem;
            /** @type {[typeof __VLS_components.RadioGroupItem, typeof __VLS_components.RadioGroupItem, ]} */ ;
            // @ts-ignore
            const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
                ...{ 'onClick': {} },
                id: (`r1-${it.id}`),
                ...{ class: "block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]" },
                value: "1",
            }));
            const __VLS_17 = __VLS_16({
                ...{ 'onClick': {} },
                id: (`r1-${it.id}`),
                ...{ class: "block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]" },
                value: "1",
            }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            let __VLS_19;
            let __VLS_20;
            let __VLS_21;
            const __VLS_22 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                        return;
                    if (!(__VLS_ctx.dataOvertime.doc))
                        return;
                    __VLS_ctx.handleApproveLeave(it.id);
                }
            };
            __VLS_18.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "cursor-pointer text-center text-[10px] font-normal text-[#464661]" },
                for: (`r1-${it.id}`),
            });
            var __VLS_18;
            const __VLS_23 = {}.RadioGroupItem;
            /** @type {[typeof __VLS_components.RadioGroupItem, typeof __VLS_components.RadioGroupItem, ]} */ ;
            // @ts-ignore
            const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
                ...{ 'onClick': {} },
                id: (`r2-${it.id}`),
                ...{ class: "block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]" },
                value: "2",
            }));
            const __VLS_25 = __VLS_24({
                ...{ 'onClick': {} },
                id: (`r2-${it.id}`),
                ...{ class: "block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]" },
                value: "2",
            }, ...__VLS_functionalComponentArgsRest(__VLS_24));
            let __VLS_27;
            let __VLS_28;
            let __VLS_29;
            const __VLS_30 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                        return;
                    if (!(__VLS_ctx.dataOvertime.doc))
                        return;
                    __VLS_ctx.handleApproveLeave(it.id);
                }
            };
            __VLS_26.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "cursor-pointer text-center text-[10px] font-normal text-[#464661]" },
                for: (`r2-${it.id}`),
            });
            var __VLS_26;
            var __VLS_14;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                            return;
                        if (!(__VLS_ctx.dataOvertime.doc))
                            return;
                        __VLS_ctx.toggleDropdownHuman(it.id);
                    } },
                ...{ class: "relative w-full" },
            });
            if (it.human_status_text == 'Đã phê duyệt') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "status status-green status-body block w-full text-[13px]" },
                });
            }
            if (it.human_status_text == 'Chờ phê duyệt') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "status status-red status-body block w-full text-[13px]" },
                });
            }
            if (it.human_status_text == 'Đã từ chối') {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "status status-gray status-body block w-full text-[13px]" },
                });
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "invisible absolute right-0 left-0 z-[12] w-full opacity-0 transition" },
                ...{ class: ({
                        'visible opacity-100': __VLS_ctx.activeDropdownHuman === it.id,
                    }) },
            });
            const __VLS_31 = {}.RadioGroupRoot;
            /** @type {[typeof __VLS_components.RadioGroupRoot, typeof __VLS_components.RadioGroupRoot, ]} */ ;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
                modelValue: (__VLS_ctx.radioStateSingle),
                ...{ class: "flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl" },
                defaultValue: "0",
            }));
            const __VLS_33 = __VLS_32({
                modelValue: (__VLS_ctx.radioStateSingle),
                ...{ class: "flex flex-col overflow-hidden rounded-xl border border-solid border-[#EDEDF6] bg-white shadow-2xl" },
                defaultValue: "0",
            }, ...__VLS_functionalComponentArgsRest(__VLS_32));
            __VLS_34.slots.default;
            const __VLS_35 = {}.RadioGroupItem;
            /** @type {[typeof __VLS_components.RadioGroupItem, typeof __VLS_components.RadioGroupItem, ]} */ ;
            // @ts-ignore
            const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
                ...{ 'onClick': {} },
                id: (`r1-${it.id}`),
                ...{ class: "block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]" },
                value: "1",
            }));
            const __VLS_37 = __VLS_36({
                ...{ 'onClick': {} },
                id: (`r1-${it.id}`),
                ...{ class: "block cursor-pointer border-b border-solid border-[#EDEDF6] p-1.5 outline-none hover:bg-[#C4FFD0]" },
                value: "1",
            }, ...__VLS_functionalComponentArgsRest(__VLS_36));
            let __VLS_39;
            let __VLS_40;
            let __VLS_41;
            const __VLS_42 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                        return;
                    if (!(__VLS_ctx.dataOvertime.doc))
                        return;
                    __VLS_ctx.handleApproveLeave(it.id);
                }
            };
            __VLS_38.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "cursor-pointer text-center text-[10px] font-normal text-[#464661]" },
                for: (`r1-${it.id}`),
            });
            var __VLS_38;
            const __VLS_43 = {}.RadioGroupItem;
            /** @type {[typeof __VLS_components.RadioGroupItem, typeof __VLS_components.RadioGroupItem, ]} */ ;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
                ...{ 'onClick': {} },
                id: (`r2-${it.id}`),
                ...{ class: "block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]" },
                value: "2",
            }));
            const __VLS_45 = __VLS_44({
                ...{ 'onClick': {} },
                id: (`r2-${it.id}`),
                ...{ class: "block cursor-pointer p-1.5 outline-none hover:bg-[#FFC4C4]" },
                value: "2",
            }, ...__VLS_functionalComponentArgsRest(__VLS_44));
            let __VLS_47;
            let __VLS_48;
            let __VLS_49;
            const __VLS_50 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                        return;
                    if (!(__VLS_ctx.dataOvertime.doc))
                        return;
                    __VLS_ctx.handleApproveLeave(it.id);
                }
            };
            __VLS_46.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "cursor-pointer text-center text-[10px] font-normal text-[#464661]" },
                for: (`r2-${it.id}`),
            });
            var __VLS_46;
            var __VLS_34;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell edit edit-body" },
            });
            if (__VLS_ctx.checkPermission('Categories', 'Update')) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                                return;
                            if (!(__VLS_ctx.dataOvertime.doc))
                                return;
                            if (!(__VLS_ctx.checkPermission('Categories', 'Update')))
                                return;
                            __VLS_ctx.getDetailCategory(it.id);
                        } },
                    type: "button",
                    ...{ class: "cell-btn-edit shrink-0 cursor-pointer" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                    src: "@/assets/images/action-edit-2.svg",
                    alt: "",
                });
            }
            if (__VLS_ctx.checkPermission('Categories', 'Delete')) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
                                return;
                            if (!(__VLS_ctx.dataOvertime.doc))
                                return;
                            if (!(__VLS_ctx.checkPermission('Categories', 'Delete')))
                                return;
                            __VLS_ctx.confirmDeleteCategory(it.id);
                        } },
                    type: "button",
                    ...{ class: "cell-btn-delete shrink-0 cursor-pointer" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                    src: "@/assets/images/action-edit-3.svg",
                    alt: "",
                });
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
    if (__VLS_ctx.dataOvertime.doc?.pagination?.total && Number(__VLS_ctx.dataOvertime.doc?.pagination.total) > __VLS_ctx.paginate.per_page) {
        (__VLS_ctx.paginate.per_page);
        (__VLS_ctx.dataOvertime.doc?.pagination?.total || 0);
    }
    else {
        (__VLS_ctx.dataOvertime.doc?.pagination?.total || 0);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tb-navigation flex flex-wrap items-center md:gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
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
                if (!(__VLS_ctx.checkPermission('Orvertime', 'List')))
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
const __VLS_51 = __VLS_asFunctionalComponent(Modal, new Modal({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalAddCateManager),
    maxWidth: "max-w-[670px]",
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalAddCateManager),
    maxWidth: "max-w-[670px]",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_54;
let __VLS_55;
let __VLS_56;
const __VLS_57 = {
    onClose: (...[$event]) => {
        __VLS_ctx.toggleModal('modalAddCateManager');
    }
};
__VLS_53.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-12 text-center max-xl:mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "m-0 text-[16px] font-bold text-[#464661] uppercase" },
});
/** @type {[typeof ModalAddOvertime, typeof ModalAddOvertime, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(ModalAddOvertime, new ModalAddOvertime({
    ...{ 'onPostRequest': {} },
    datatype: (__VLS_ctx.selectData),
    propFunction: (__VLS_ctx.fetchDataOvertime),
}));
const __VLS_59 = __VLS_58({
    ...{ 'onPostRequest': {} },
    datatype: (__VLS_ctx.selectData),
    propFunction: (__VLS_ctx.fetchDataOvertime),
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_61;
let __VLS_62;
let __VLS_63;
const __VLS_64 = {
    onPostRequest: (__VLS_ctx.getPostRequest)
};
__VLS_60.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.toggleModal('modalAddCateManager');
        } },
    type: "button",
    ...{ class: "hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
});
var __VLS_60;
var __VLS_53;
/** @type {[typeof Modal, typeof Modal, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(Modal, new Modal({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalEditCateManager),
    maxWidth: "max-w-[670px]",
}));
const __VLS_66 = __VLS_65({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalEditCateManager),
    maxWidth: "max-w-[670px]",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
let __VLS_70;
const __VLS_71 = {
    onClose: (...[$event]) => {
        __VLS_ctx.toggleModal('modalEditCateManager');
    }
};
__VLS_67.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-hidden rounded-[24px] bg-white p-[52px_24px_36px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-12 text-center max-xl:mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "m-0 text-[16px] font-bold text-[#464661] uppercase" },
});
/** @type {[typeof ModalCategoryUpdate, typeof ModalCategoryUpdate, ]} */ ;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(ModalCategoryUpdate, new ModalCategoryUpdate({
    ...{ 'onPostRequestEdit': {} },
    datatype: (__VLS_ctx.dataDetailCategory),
    propFunction: (__VLS_ctx.fetchDataOvertime),
}));
const __VLS_73 = __VLS_72({
    ...{ 'onPostRequestEdit': {} },
    datatype: (__VLS_ctx.dataDetailCategory),
    propFunction: (__VLS_ctx.fetchDataOvertime),
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
let __VLS_75;
let __VLS_76;
let __VLS_77;
const __VLS_78 = {
    onPostRequestEdit: (__VLS_ctx.getPostRequestEdit)
};
__VLS_74.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.toggleModal('modalEditCateManager');
        } },
    type: "button",
    ...{ class: "hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[175px]" },
});
var __VLS_74;
var __VLS_67;
/** @type {[typeof Modal, typeof Modal, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(Modal, new Modal({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalStatusConfirm),
    maxWidth: "max-w-[512px]",
}));
const __VLS_80 = __VLS_79({
    ...{ 'onClose': {} },
    modalActive: (__VLS_ctx.modalActive.modalStatusConfirm),
    maxWidth: "max-w-[512px]",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
let __VLS_82;
let __VLS_83;
let __VLS_84;
const __VLS_85 = {
    onClose: (...[$event]) => {
        __VLS_ctx.toggleModal('modalStatusConfirm');
    }
};
__VLS_81.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-hidden rounded-[24px] bg-white p-[45px_16px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3 text-center text-[16px] font-bold text-[#464661] uppercase" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3 text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ class: "mx-auto" },
    src: "@/assets/images/icon-park-outline_attention.svg",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto mb-6 text-center text-[16px]/[26px] font-semibold text-[#464661] underline" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-9 flex flex-wrap items-stretch justify-center gap-3 text-center xl:gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.toggleModal('modalStatusConfirm');
        } },
    type: "button",
    ...{ class: "hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid border-[#EDEDF6] bg-white p-2 text-center text-[16px] leading-normal font-bold text-[#464661] uppercase transition hover:transition max-md:grow md:min-w-[130px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleDeleteCategory) },
    type: "submit",
    ...{ class: "border-main bg-main hover:shadow-hoverinset inset-sha inline-block cursor-pointer rounded-[8px] border border-solid p-2 text-center text-[16px] leading-normal font-bold text-white uppercase transition hover:transition max-md:grow md:min-w-[130px]" },
});
var __VLS_81;
const __VLS_86 = {}.ToastProvider;
/** @type {[typeof __VLS_components.ToastProvider, typeof __VLS_components.ToastProvider, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({}));
const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
__VLS_89.slots.default;
const __VLS_90 = {}.ToastRoot;
/** @type {[typeof __VLS_components.ToastRoot, typeof __VLS_components.ToastRoot, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    open: (__VLS_ctx.toast.toastCreate),
    duration: (5000),
    ...{ class: "flex flex-col gap-1.5 rounded-md p-3 shadow-2xl" },
    ...{ class: ({
            'bg-[#ffd0d0]': __VLS_ctx.dataPostRequest?.errors[Object.keys(__VLS_ctx.dataPostRequest?.errors)[0]],
            'bg-[#c4ffd0]': __VLS_ctx.dataPostRequest?.status === 1,
        }) },
}));
const __VLS_92 = __VLS_91({
    open: (__VLS_ctx.toast.toastCreate),
    duration: (5000),
    ...{ class: "flex flex-col gap-1.5 rounded-md p-3 shadow-2xl" },
    ...{ class: ({
            'bg-[#ffd0d0]': __VLS_ctx.dataPostRequest?.errors[Object.keys(__VLS_ctx.dataPostRequest?.errors)[0]],
            'bg-[#c4ffd0]': __VLS_ctx.dataPostRequest?.status === 1,
        }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
__VLS_93.slots.default;
const __VLS_94 = {}.ToastTitle;
/** @type {[typeof __VLS_components.ToastTitle, typeof __VLS_components.ToastTitle, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    ...{ class: "text-[13px] font-medium" },
}));
const __VLS_96 = __VLS_95({
    ...{ class: "text-[13px] font-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_97.slots.default;
(__VLS_ctx.dataPostRequest?.message);
var __VLS_97;
if (__VLS_ctx.dataPostRequest?.errors) {
    const __VLS_98 = {}.ToastDescription;
    /** @type {[typeof __VLS_components.ToastDescription, typeof __VLS_components.ToastDescription, ]} */ ;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
        ...{ class: "text-[11px] font-normal" },
    }));
    const __VLS_100 = __VLS_99({
        ...{ class: "text-[11px] font-normal" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    __VLS_101.slots.default;
    (__VLS_ctx.dataPostRequest?.errors[Object.keys(__VLS_ctx.dataPostRequest?.errors)[0]]);
    var __VLS_101;
}
var __VLS_93;
const __VLS_102 = {}.ToastViewport;
/** @type {[typeof __VLS_components.ToastViewport, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    ...{ class: "fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" },
}));
const __VLS_104 = __VLS_103({
    ...{ class: "fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
var __VLS_89;
const __VLS_106 = {}.ToastProvider;
/** @type {[typeof __VLS_components.ToastProvider, typeof __VLS_components.ToastProvider, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({}));
const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
__VLS_109.slots.default;
const __VLS_110 = {}.ToastRoot;
/** @type {[typeof __VLS_components.ToastRoot, typeof __VLS_components.ToastRoot, ]} */ ;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    open: (__VLS_ctx.toast.toastUpdate),
    duration: (5000),
    ...{ class: "flex flex-col gap-1.5 rounded-md p-3 shadow-2xl" },
    ...{ class: ({
            'bg-[#ffd0d0]': __VLS_ctx.dataPostRequestEdit?.errors[Object.keys(__VLS_ctx.dataPostRequestEdit?.errors)[0]],
            'bg-[#c4ffd0]': __VLS_ctx.dataPostRequestEdit?.status === 1,
        }) },
}));
const __VLS_112 = __VLS_111({
    open: (__VLS_ctx.toast.toastUpdate),
    duration: (5000),
    ...{ class: "flex flex-col gap-1.5 rounded-md p-3 shadow-2xl" },
    ...{ class: ({
            'bg-[#ffd0d0]': __VLS_ctx.dataPostRequestEdit?.errors[Object.keys(__VLS_ctx.dataPostRequestEdit?.errors)[0]],
            'bg-[#c4ffd0]': __VLS_ctx.dataPostRequestEdit?.status === 1,
        }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
__VLS_113.slots.default;
const __VLS_114 = {}.ToastTitle;
/** @type {[typeof __VLS_components.ToastTitle, typeof __VLS_components.ToastTitle, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    ...{ class: "text-[13px] font-medium" },
}));
const __VLS_116 = __VLS_115({
    ...{ class: "text-[13px] font-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
(__VLS_ctx.dataPostRequestEdit?.message);
var __VLS_117;
if (__VLS_ctx.dataPostRequestEdit?.errors) {
    const __VLS_118 = {}.ToastDescription;
    /** @type {[typeof __VLS_components.ToastDescription, typeof __VLS_components.ToastDescription, ]} */ ;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
        ...{ class: "text-[11px] font-normal" },
    }));
    const __VLS_120 = __VLS_119({
        ...{ class: "text-[11px] font-normal" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    __VLS_121.slots.default;
    (__VLS_ctx.dataPostRequestEdit?.errors[Object.keys(__VLS_ctx.dataPostRequestEdit?.errors)[0]]);
    var __VLS_121;
}
var __VLS_113;
const __VLS_122 = {}.ToastViewport;
/** @type {[typeof __VLS_components.ToastViewport, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    ...{ class: "fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" },
}));
const __VLS_124 = __VLS_123({
    ...{ class: "fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
var __VLS_109;
var __VLS_2;
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
/** @type {__VLS_StyleScopedClasses['ms-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#1b4dea]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[7px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:flex-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:text-[14px]']} */ ;
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
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['tb-sort']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['pinned']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['edit']} */ ;
/** @type {__VLS_StyleScopedClasses['body']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-item']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-green']} */ ;
/** @type {__VLS_StyleScopedClasses['status-body']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-red']} */ ;
/** @type {__VLS_StyleScopedClasses['status-body']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-gray']} */ ;
/** @type {__VLS_StyleScopedClasses['status-body']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['invisible']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[12]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['visible']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#C4FFD0]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#FFC4C4]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-green']} */ ;
/** @type {__VLS_StyleScopedClasses['status-body']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-red']} */ ;
/** @type {__VLS_StyleScopedClasses['status-body']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-gray']} */ ;
/** @type {__VLS_StyleScopedClasses['status-body']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[13px]']} */ ;
/** @type {__VLS_StyleScopedClasses['invisible']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[12]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['visible']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#C4FFD0]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#FFC4C4]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['edit']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-body']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-btn-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-btn-delete']} */ ;
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
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[45px_16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]/[26px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['underline']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-9']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['md:min-w-[130px]']} */ ;
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
/** @type {__VLS_StyleScopedClasses['md:min-w-[130px]']} */ ;
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
            ToastDescription: ToastDescription,
            ToastProvider: ToastProvider,
            ToastRoot: ToastRoot,
            ToastTitle: ToastTitle,
            ToastViewport: ToastViewport,
            RadioGroupItem: RadioGroupItem,
            RadioGroupRoot: RadioGroupRoot,
            Breadcrums: Breadcrums,
            ModalAddOvertime: ModalAddOvertime,
            ModalCategoryUpdate: ModalCategoryUpdate,
            Modal: Modal,
            MainLayout: MainLayout,
            toast: toast,
            toggleBoxFilters: toggleBoxFilters,
            modalActive: modalActive,
            toggleModal: toggleModal,
            tbhead: tbhead,
            paginate: paginate,
            fetchDataOvertime: fetchDataOvertime,
            handlePageChange: handlePageChange,
            confirmDeleteCategory: confirmDeleteCategory,
            handleDeleteCategory: handleDeleteCategory,
            dataDetailCategory: dataDetailCategory,
            getDetailCategory: getDetailCategory,
            dataPostRequest: dataPostRequest,
            getPostRequest: getPostRequest,
            dataPostRequestEdit: dataPostRequestEdit,
            getPostRequestEdit: getPostRequestEdit,
            dataOvertime: dataOvertime,
            selectData: selectData,
            dataTotalPages: dataTotalPages,
            activeDropdownManager: activeDropdownManager,
            toggleDropdownManager: toggleDropdownManager,
            activeDropdownHuman: activeDropdownHuman,
            toggleDropdownHuman: toggleDropdownHuman,
            radioStateSingle: radioStateSingle,
            handleApproveLeave: handleApproveLeave,
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
//# sourceMappingURL=IndexView.vue.js.map