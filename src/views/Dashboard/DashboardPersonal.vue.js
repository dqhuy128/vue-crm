/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useAuth } from 'vue-auth3';
import iconTicket1 from '@/assets/images/ticket-icon-1.png';
import iconTicket2 from '@/assets/images/ticket-icon-2.png';
import iconTicket3 from '@/assets/images/ticket-icon-3.png';
import Breadcrums from '@/components/BreadcrumsNew.vue';
import Buttons from '@/components/Buttons.vue';
import Ticket from '@/components/Ticket.vue';
import { apiUri } from '@/constants/apiUri';
import MainLayout from '@/views/MainLayout.vue';
const auth = useAuth();
const dataTicket = ref();
const dataLeave = ref();
const dataWork = ref();
const fetchTicket = async () => {
    try {
        const res = await axios.get(`${apiUri}/dashboard/individual`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data } = res.data;
        dataTicket.value = data.ticket;
        dataLeave.value = data.leave;
        dataWork.value = data.work;
    }
    catch (error) {
        console.log('🚀 ~ fetchTicket ~ error:', error);
    }
};
const ticket = [
    {
        icon: iconTicket1,
        title: 'Tổng số ticket',
        sroute: 'SystemCategory',
        ticketList: [
            {
                title: 'Tổng số ticket',
                status: 'normal',
                count: computed(() => dataTicket.value?.total || '0'),
            },
            {
                title: 'Tổng số ticket chờ xử lý',
                status: 'normal',
                count: computed(() => dataTicket.value?.pending || '0'),
            },
            {
                title: 'Tổng số ticket đang xử lý',
                status: 'waiting',
                count: computed(() => dataTicket.value?.processing || '0'),
            },
            {
                title: 'Tổng số ticket đã hoàn thành.',
                status: 'done',
                count: computed(() => dataTicket.value?.done || '0'),
            },
            {
                title: 'Tổng số ticket đã từ chối',
                status: 'reject',
                count: computed(() => dataTicket.value?.deny || '0'),
            },
        ],
    },
    {
        icon: iconTicket2,
        title: 'Nghỉ phép',
        sroute: 'Info',
        ticketList: [
            {
                title: 'Tổng số ngày nghỉ phép',
                status: 'normal',
                count: computed(() => dataLeave.value?.total || '0'),
            },
            {
                title: 'Tổng số ngày nghỉ phép đã dùng',
                status: 'normal',
                count: computed(() => dataLeave.value?.used || '0'),
            },
            {
                title: 'Tổng số ngày nghỉ phép còn lại',
                status: 'normal',
                count: computed(() => String(dataLeave.value?.remain || '0')),
            },
        ],
    },
    {
        icon: iconTicket3,
        title: 'Chấm công',
        sroute: 'History',
        ticketList: [
            {
                title: 'Tổng số chấm công đã giải trình',
                status: 'normal',
                count: computed(() => dataWork.value?.total || '0'),
            },
            {
                title: 'Tổng số giải trình được phê duyệt',
                status: 'normal',
                count: computed(() => dataWork.value?.accept || '0'),
            },
            {
                title: 'Tổng số giải trình chờ xử lý',
                status: 'normal',
                count: computed(() => dataWork.value?.pending || '0'),
            },
            {
                title: 'Tổng số giải trình bị từ chối',
                status: 'reject',
                count: computed(() => dataWork.value?.deny || '0'),
            },
        ],
    },
];
onMounted(() => {
    fetchTicket();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof MainLayout, typeof MainLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MainLayout, new MainLayout({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
/** @type {[typeof Breadcrums, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(Breadcrums, new Breadcrums({
    name: "Dashboard",
}));
const __VLS_5 = __VLS_4({
    name: "Dashboard",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
/** @type {[typeof Buttons, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Buttons, new Buttons({
    title: (`active`),
}));
const __VLS_8 = __VLS_7({
    title: (`active`),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
});
for (const [item, id] of __VLS_getVForSourceType((__VLS_ctx.ticket))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (id),
        ...{ class: "col-span-12 xl:col-span-4" },
    });
    /** @type {[typeof Ticket, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(Ticket, new Ticket({
        ticketProps: ([item.icon, item.title, item.ticketList, item.sroute]),
    }));
    const __VLS_11 = __VLS_10({
        ticketProps: ([item.icon, item.title, item.ticketList, item.sroute]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
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
            Breadcrums: Breadcrums,
            Buttons: Buttons,
            Ticket: Ticket,
            MainLayout: MainLayout,
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
//# sourceMappingURL=DashboardPersonal.vue.js.map