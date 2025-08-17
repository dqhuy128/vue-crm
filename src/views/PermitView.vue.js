/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { reactive, ref } from 'vue';
import BreadcrumsNew from '../components/BreadcrumsNew.vue';
import MainLayout from './MainLayout.vue';
const statusColor = {
    success: 'bg-[#C4FFD0] border-[##12F13E] ',
    canceld: 'border-red-600 bg-red-300',
    pending: 'border-[#F11212] bg-[#FFC4C4]',
};
const breadcrumbList = ref([
    {
        name: 'Nghỉ phép',
        path: '/',
    },
    {
        name: 'Thông tin nghỉ phép',
        path: '/',
    },
]);
const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endDate',
    },
    {
        title: 'Lý do nghỉ',
        dataIndex: 'reason',
    },
    {
        title: 'Buổi',
        dataIndex: 'session',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
        title: 'Thao tác',
        dataIndex: 'actions',
        width: 130,
    },
];
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        stt: `0${i}`,
        startDate: `21/08/2024`,
        endDate: `22/08/2024`,
        reason: `Việc gia đình`,
        session: '01',
        status: `${Math.floor(Math.random() * i * 2) % 3 === 0 ? 'Đã duyệt' : Math.floor(Math.random() * i * 2) % 2 === 0 ? 'Chưa duyệt' : 'Chờ phê duyệt'}`,
        actions: ['edit', 'delete', 'view'],
    });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = (key) => {
    editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
};
const save = (key) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
    delete editableData[key];
};
const cancel = (key) => {
    delete editableData[key];
};
function cloneDeep(arg0) {
    throw new Error('Function not implemented.');
}
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
/** @type {[typeof BreadcrumsNew, typeof BreadcrumsNew, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(BreadcrumsNew, new BreadcrumsNew({
    name: "Thông tin nghỉ phép",
}));
const __VLS_5 = __VLS_4({
    name: "Thông tin nghỉ phép",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
var __VLS_6;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "rounded-[24px] bg-white p-2.5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    action: "",
    ...{ class: "flex flex-wrap items-stretch gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "select-block grow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    id: "",
    name: "",
    ...{ class: "font-inter rounded-[24px] border border-solid border-[#EDEDF6] bg-white p-[10px_12px] text-[16px] leading-normal font-normal text-[#909090]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "hover:shadow-hoverinset inline-flex cursor-pointer items-center gap-2 rounded-[24px] bg-[#013878] p-[8px_16px] transition" },
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
    ...{ class: "font-inter text=[16px] leading-normal font-bold text-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-5 mb-3 flex flex-wrap items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "font-inter flex-[1] text-[20px] leading-normal font-bold text-[#464661] max-md:text-[16px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ms-auto inline-flex flex-wrap items-center gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    id: "tableAdding",
    type: "button",
    ...{ class: "hover:shadow-hoverinset inline-flex cursor-pointer items-end gap-2 rounded-[24px] bg-[#1b4dea] p-[7px_12px] transition" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/si_add-fill.svg",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "font-inter text-[16px] leading-normal font-bold text-white" },
});
const __VLS_7 = {}.ALayout;
/** @type {[typeof __VLS_components.ALayout, typeof __VLS_components.aLayout, typeof __VLS_components.ALayout, typeof __VLS_components.aLayout, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    id: "aTableUserList",
    ...{ class: "!bg-transparent" },
}));
const __VLS_9 = __VLS_8({
    id: "aTableUserList",
    ...{ class: "!bg-transparent" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_10.slots.default;
const __VLS_11 = {}.ATable;
/** @type {[typeof __VLS_components.ATable, typeof __VLS_components.aTable, typeof __VLS_components.ATable, typeof __VLS_components.aTable, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    columns: (__VLS_ctx.columns),
    dataSource: (__VLS_ctx.dataSource),
}));
const __VLS_13 = __VLS_12({
    columns: (__VLS_ctx.columns),
    dataSource: (__VLS_ctx.dataSource),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
{
    const { bodyCell: __VLS_thisSlot } = __VLS_14.slots;
    const [{ column, record }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (column.dataIndex === 'status') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: (__VLS_ctx.statusColor[record.status === 'Đã duyệt' ? 'success' : record.status === 'Chưa duyệt' ? 'canceld' : 'pending'] + ' inline-flex items-center rounded-3xl border px-5 py-2') },
        });
        (record.status);
    }
    if (column.dataIndex === 'actions') {
        const __VLS_15 = {}.ASpace;
        /** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
        const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
        __VLS_18.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            type: "button",
            ...{ class: "flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center rounded-full bg-[#1B4DEA]" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
            d: "M7.99996 6C8.53039 6 9.0391 6.21071 9.41417 6.58579C9.78925 6.96086 9.99996 7.46957 9.99996 8C9.99996 8.53043 9.78925 9.03914 9.41417 9.41421C9.0391 9.78929 8.53039 10 7.99996 10C7.46953 10 6.96082 9.78929 6.58575 9.41421C6.21067 9.03914 5.99996 8.53043 5.99996 8C5.99996 7.46957 6.21067 6.96086 6.58575 6.58579C6.96082 6.21071 7.46953 6 7.99996 6ZM7.99996 3C11.3333 3 14.18 5.07333 15.3333 8C14.18 10.9267 11.3333 13 7.99996 13C4.66663 13 1.81996 10.9267 0.666626 8C1.81996 5.07333 4.66663 3 7.99996 3ZM2.11996 8C2.6588 9.1002 3.4955 10.0272 4.53495 10.6755C5.57439 11.3238 6.77489 11.6675 7.99996 11.6675C9.22503 11.6675 10.4255 11.3238 11.465 10.6755C12.5044 10.0272 13.3411 9.1002 13.88 8C13.3411 6.8998 12.5044 5.97283 11.465 5.3245C10.4255 4.67616 9.22503 4.33245 7.99996 4.33245C6.77489 4.33245 5.57439 4.67616 4.53495 5.3245C3.4955 5.97283 2.6588 6.8998 2.11996 8Z",
            fill: "white",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            type: "button",
            ...{ class: "flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center rounded-full bg-[#1BB6EA]" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
            d: "M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8",
            stroke: "white",
            'stroke-width': "1.5",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
            d: "M12.25 1.74991C12.5152 1.48469 12.8749 1.33569 13.25 1.33569C13.6251 1.33569 13.9848 1.48469 14.25 1.74991C14.5152 2.01512 14.6642 2.37483 14.6642 2.74991C14.6642 3.12498 14.5152 3.48469 14.25 3.74991L8.24136 9.75924C8.08305 9.9174 7.88749 10.0332 7.67269 10.0959L5.75735 10.6559C5.69999 10.6726 5.63918 10.6736 5.58129 10.6588C5.52341 10.644 5.47057 10.6139 5.42832 10.5716C5.38607 10.5294 5.35595 10.4765 5.34112 10.4186C5.32629 10.3607 5.32729 10.2999 5.34402 10.2426L5.90402 8.32724C5.96704 8.11261 6.08304 7.91728 6.24136 7.75924L12.25 1.74991Z",
            stroke: "white",
            'stroke-width': "1.5",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            type: "button",
            ...{ class: "flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center rounded-full bg-[#E61B1B]" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
            d: "M7.49996 14H4.66663C4.29996 14 3.98618 13.8696 3.72529 13.6087C3.4644 13.3478 3.33374 13.0338 3.33329 12.6667V4H2.66663V2.66667H5.99996V2H9.99996V2.66667H13.3333V4H12.6666V6.86667C12.4777 6.81111 12.2584 6.76378 12.0086 6.72467C11.7588 6.68555 11.5337 6.66622 11.3333 6.66667V4H4.66663V12.6667H6.86663C6.93329 12.9 7.02218 13.1307 7.13329 13.3587C7.2444 13.5867 7.36663 13.8004 7.49996 14ZM5.99996 11.3333H6.66663C6.66663 10.6333 6.77774 10.0582 6.99996 9.608L7.33329 8.93333V5.33333H5.99996V11.3333ZM8.66663 7.5C8.85551 7.37778 9.06951 7.25556 9.30863 7.13333C9.54774 7.01111 9.77818 6.92222 9.99996 6.86667V5.33333H8.66663V7.5Z",
            fill: "white",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
            d: "M15.3333 11.6667C15.3333 12.6391 14.947 13.5718 14.2594 14.2594C13.5718 14.947 12.6391 15.3333 11.6667 15.3333C10.6942 15.3333 9.76158 14.947 9.07394 14.2594C8.38631 13.5718 8 12.6391 8 11.6667C8 10.6942 8.38631 9.76158 9.07394 9.07394C9.76158 8.38631 10.6942 8 11.6667 8C12.6391 8 13.5718 8.38631 14.2594 9.07394C14.947 9.76158 15.3333 10.6942 15.3333 11.6667ZM10.5693 10.0973C10.5067 10.0347 10.4219 9.99958 10.3333 9.99958C10.2448 9.99958 10.1599 10.0347 10.0973 10.0973C10.0347 10.1599 9.99958 10.2448 9.99958 10.3333C9.99958 10.4219 10.0347 10.5067 10.0973 10.5693L11.1953 11.6667L10.0973 12.764C10.0347 12.8266 9.99958 12.9115 9.99958 13C9.99958 13.0885 10.0347 13.1734 10.0973 13.236C10.1599 13.2986 10.2448 13.3338 10.3333 13.3338C10.4219 13.3338 10.5067 13.2986 10.5693 13.236L11.6667 12.138L12.764 13.236C12.795 13.267 12.8318 13.2916 12.8723 13.3083C12.9128 13.3251 12.9562 13.3338 13 13.3338C13.0438 13.3338 13.0872 13.3251 13.1277 13.3083C13.1682 13.2916 13.205 13.267 13.236 13.236C13.267 13.205 13.2916 13.1682 13.3083 13.1277C13.3251 13.0872 13.3338 13.0438 13.3338 13C13.3338 12.9562 13.3251 12.9128 13.3083 12.8723C13.2916 12.8318 13.267 12.795 13.236 12.764L12.138 11.6667L13.236 10.5693C13.2986 10.5067 13.3338 10.4219 13.3338 10.3333C13.3338 10.2448 13.2986 10.1599 13.236 10.0973C13.1734 10.0347 13.0885 9.99958 13 9.99958C12.9115 9.99958 12.8266 10.0347 12.764 10.0973L11.6667 11.1953L10.5693 10.0973Z",
            fill: "white",
        });
        var __VLS_18;
    }
}
var __VLS_14;
var __VLS_10;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['select-block']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[10px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#013878]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[8px_16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text=[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-[1]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#464661]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['ms-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#1b4dea]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[7px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['!bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#1B4DEA]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#1BB6EA]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#E61B1B]']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BreadcrumsNew: BreadcrumsNew,
            MainLayout: MainLayout,
            statusColor: statusColor,
            columns: columns,
            dataSource: dataSource,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=PermitView.vue.js.map