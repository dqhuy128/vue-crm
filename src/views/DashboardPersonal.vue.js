import Dashboard from "./Dashboard.vue";
import Ticket from "../components/Ticket.vue";
import iconTicket1 from "@/assets/images/ticket-icon-1.png";
import iconTicket2 from "@/assets/images/ticket-icon-2.png";
import iconTicket3 from "@/assets/images/ticket-icon-3.png";
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
    }
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
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
    ...{ class: "grid grid-cols-12 gap-6" },
});
for (const [item, id] of __VLS_getVForSourceType((__VLS_ctx.ticket))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-span-12 xl:col-span-4" },
        key: (id),
    });
    /** @type {[typeof Ticket, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(Ticket, new Ticket({
        ticketProps: ([item.icon, item.title, item.ticketList]),
    }));
    const __VLS_5 = __VLS_4({
        ticketProps: ([item.icon, item.title, item.ticketList]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:col-span-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Dashboard: Dashboard,
            Ticket: Ticket,
            ticket: ticket,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
