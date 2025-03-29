import Dashboard from "./Dashboard.vue";
import Ticket from "../components/Ticket.vue";
import iconTicket1 from "@/assets/images/ticket-icon-1.png";
import iconTicket2 from "@/assets/images/ticket-icon-2.png";
import iconTicket3 from "@/assets/images/ticket-icon-3.png";
import iconTicket4 from "@/assets/images/ticket-icon-4.png";
import { useRoute } from "vue-router";
import SeachBox from "../components/SeachBox.vue";
import { ref, reactive } from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Vietnamese } from "flatpickr/dist/l10n/vn.js";
const ticket = [
    {
        icon: iconTicket1,
        title: "Tổng số ticket",
        ticketList: [
            {
                title: "Tổng số yêu cầu chưa xử lý",
                status: "normal",
                count: "1"
            },
            {
                title: "Chờ xử lý",
                status: "pending",
                count: "12"
            },
            {
                title: "Đang xử lý",
                status: "waiting",
                count: "4"
            },
            {
                title: "Đã xử lý trong ngày",
                status: "done",
                count: "66"
            },
            {
                title: "Đã từ chối trong ngày",
                status: "reject",
                count: "8"
            }
        ]
    },
    {
        icon: iconTicket2,
        title: "Nghỉ phép",
        ticketList: [
            {
                title: "Tổng số ngày nghỉ",
                status: "normal"
            },
            {
                title: "Số ngày nghỉ còn lại",
                status: "normal"
            },
            {
                title: "Số ngày nghỉ đã sử dụng",
                status: "normal"
            }
        ]
    },
    {
        icon: iconTicket3,
        title: "Chấm công",
        ticketList: [
            {
                title: "Số lỗi chấm công trong tháng",
                status: "reject"
            },
            {
                title: "Đã giải trình",
                status: "normal"
            },
            {
                title: "Chưa giải trình",
                status: "reject"
            },
            {
                title: "Chờ phê duyệt",
                status: "reject"
            }
        ]
    },
    {
        icon: iconTicket4,
        title: "Nghỉ phép",
        ticketList: [
            {
                title: "Tổng số nhân viên",
                status: "normal",
                count: "12"
            },
            {
                title: "Ban Điều Hành",
                status: "normal",
                count: "4"
            },
            {
                title: "Phòng Sale Admin",
                status: "normal",
                count: "22"
            },
            {
                title: "Ban Trợ Lý",
                status: "normal",
                count: "1"
            },
            {
                title: "Phòng Pháp Chế",
                status: "normal",
                count: "123"
            },
            {
                title: "Ban Dự Án",
                status: "normal",
                count: "12"
            },
            {
                title: "Phòng HCNS",
                status: "normal",
                count: "12"
            },
            {
                title: "Phòng Marketing",
                status: "normal",
                count: "12"
            },
            {
                title: "Phòng Tuyển Dụng",
                status: "normal",
                count: "12"
            }
        ]
    },
    {
        icon: iconTicket4,
        title: "Số lượng nhân sự nghỉ / Số lượng nhân sự mới",
        ticketList: [
            {
                title: "Tổng",
                status: "reject",
                count: "0/0"
            }
        ]
    }
];
const route = useRoute();
const date1 = ref(null);
const date2 = ref(null);
const dateConfig = reactive({
    locale: Vietnamese,
    dateFormat: "d / m / Y",
    disableMobile: true
});
const dateRange = reactive({
    mode: "range",
    locale: Vietnamese,
    dateFormat: "d / m / Y",
    disableMobile: true
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof Dashboard, typeof Dashboard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Dashboard, new Dashboard({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "lg:col-span-6 col-span-12" },
});
/** @type {[typeof SeachBox, typeof SeachBox, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(SeachBox, new SeachBox({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative flex items-center grow border border-solid border-[#EDEDF6] rounded-[24px] p-[10px_12px]" },
});
const __VLS_7 = {}.FlatPickr;
/** @type {[typeof __VLS_components.FlatPickr, typeof __VLS_components.flatPickr, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    config: (__VLS_ctx.dateConfig),
    modelValue: (__VLS_ctx.date1),
    placeholder: "Chọn thời gian",
    ...{ class: "grow text-[#000] font-inter text-[16px] font-normal leading-normal focus:outline-0 focus:border-0" },
}));
const __VLS_9 = __VLS_8({
    config: (__VLS_ctx.dateConfig),
    modelValue: (__VLS_ctx.date1),
    placeholder: "Chọn thời gian",
    ...{ class: "grow text-[#000] font-inter text-[16px] font-normal leading-normal focus:outline-0 focus:border-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "pointer-events-none absolute right-3 top-1/2 -translate-y-[50%]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/cuida_calendar-outline.svg",
    alt: "",
});
var __VLS_6;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "lg:col-span-6 col-span-12" },
});
/** @type {[typeof SeachBox, typeof SeachBox, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(SeachBox, new SeachBox({}));
const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative flex items-center grow border border-solid border-[#EDEDF6] rounded-[24px] p-[10px_12px]" },
});
const __VLS_14 = {}.FlatPickr;
/** @type {[typeof __VLS_components.FlatPickr, typeof __VLS_components.flatPickr, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    modelValue: (__VLS_ctx.date2),
    config: (__VLS_ctx.dateRange),
    placeholder: "Chọn thời gian",
    ...{ class: "grow text-[#000] font-inter text-[16px] font-normal leading-normal focus:outline-0 focus:border-0" },
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.date2),
    config: (__VLS_ctx.dateRange),
    placeholder: "Chọn thời gian",
    ...{ class: "grow text-[#000] font-inter text-[16px] font-normal leading-normal focus:outline-0 focus:border-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "pointer-events-none absolute right-3 top-1/2 -translate-y-[50%]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/cuida_calendar-outline.svg",
    alt: "",
});
var __VLS_13;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
});
for (const [item, id] of __VLS_getVForSourceType((__VLS_ctx.ticket.slice(-2)))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-span-12 lg:col-span-6" },
        key: (id),
    });
    /** @type {[typeof Ticket, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(Ticket, new Ticket({
        ticketProps: ([item.icon, item.title, item.ticketList]),
        ...{ class: ([
                __VLS_ctx.route.path == '/dashboard/report'
                    ? 'ticketbox-dashboard-report'
                    : ''
            ]) },
    }));
    const __VLS_19 = __VLS_18({
        ticketProps: ([item.icon, item.title, item.ticketList]),
        ...{ class: ([
                __VLS_ctx.route.path == '/dashboard/report'
                    ? 'ticketbox-dashboard-report'
                    : ''
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[10px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-0']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[10px_12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-0']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-6']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Dashboard: Dashboard,
            Ticket: Ticket,
            SeachBox: SeachBox,
            flatPickr: flatPickr,
            ticket: ticket,
            route: route,
            date1: date1,
            date2: date2,
            dateConfig: dateConfig,
            dateRange: dateRange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
