/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import 'flatpickr/dist/flatpickr.css';
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale/vi';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { useRoute } from 'vue-router';
import iconTicket4 from '@/assets/images/ticket-icon-4.png';
import Breadcrums from '@/components/BreadcrumsNew.vue';
import Buttons from '@/components/Buttons.vue';
import Ticket from '@/components/Ticket.vue';
import { apiUri } from '@/constants/apiUri';
import MainLayout from '@/views/MainLayout.vue';
const auth = useAuth();
const dataReport = ref();
const fetchReport = async () => {
    try {
        const res = await axios.get(`${apiUri}/dashboard/report`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data } = res.data;
        dataReport.value = data;
    }
    catch (error) {
        console.log('🚀 ~ fetchTicket ~ error:', error);
    }
};
const ticket = [
    {
        icon: iconTicket4,
        title: 'Nghỉ phép',
        ticketList: [
            {
                title: computed(() => dataReport.value?.total?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.total?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[1]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[1]?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[2]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[2]?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[3]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[3]?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[4]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[4]?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[14]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[14]?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[33]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[33]?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[34]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[34]?.count || '0'),
            },
            {
                title: computed(() => dataReport.value?.[35]?.name),
                status: 'normal',
                count: computed(() => dataReport.value?.[35]?.count || '0'),
            },
        ],
    },
    {
        icon: iconTicket4,
        title: 'Số lượng nhân sự nghỉ / Số lượng nhân sự mới',
        ticketList: [
            {
                title: 'Tổng',
                status: 'reject',
                count: computed(() => dataReport.value?.total?.count || '0'),
            },
        ],
    },
];
const route = useRoute();
const paramsDashboardReport = reactive({
    begin_date: '',
    finish_date: '',
});
const datepicker = ref(null);
const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
const endDate = new Date();
datepicker.value = [startDate, endDate];
paramsDashboardReport.begin_date = format(startDate, 'yyyy-MM-dd');
paramsDashboardReport.finish_date = format(endDate, 'yyyy-MM-dd');
const updateDates = () => {
    if (datepicker.value) {
        paramsDashboardReport.begin_date = format(datepicker.value[0], 'yyyy-MM-dd');
        paramsDashboardReport.finish_date = format(datepicker.value[1], 'yyyy-MM-dd');
    }
};
watch(datepicker, () => {
    if (auth.check()) {
        updateDates();
    }
});
const handleSearchReport = async () => {
    try {
        const formData = new FormData();
        formData.append('begin_date', paramsDashboardReport.begin_date);
        formData.append('finish_date', paramsDashboardReport.finish_date);
        const res = await axios.post(`${apiUri}/dashboard/report`, formData, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data } = res.data;
        dataReport.value = data;
        // console.log('🚀 ~ handleSearchReport ~ dataReport.value:', dataReport.value)
    }
    catch (error) {
        console.log('🚀 ~ handleSearchReport ~ error:', error);
    }
};
onMounted(() => {
    fetchReport();
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
    name: "Dashboard",
    path: "/dashboard/personal",
}));
const __VLS_5 = __VLS_4({
    name: "Dashboard",
    path: "/dashboard/personal",
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
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-span-12 lg:col-span-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-box-cpn rounded-[24px] bg-white p-2.5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSearchReport) },
    ...{ class: "flex flex-wrap items-stretch gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grow" },
});
const __VLS_10 = {}.VueDatePicker;
/** @type {[typeof __VLS_components.VueDatePicker, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
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
const __VLS_12 = __VLS_11({
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
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
let __VLS_16;
const __VLS_17 = {
    'onUpdate:modelValue': (__VLS_ctx.updateDates)
};
var __VLS_13;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "font-inter text=[16px] hover:shadow-hoverinset inline-flex cursor-pointer items-center justify-center gap-2 rounded-[24px] bg-[#013878] p-[8px_16px] leading-normal font-bold text-white transition max-md:w-full max-md:text-[14px]" },
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-12 gap-6" },
});
for (const [item, id] of __VLS_getVForSourceType((__VLS_ctx.ticket.slice(-2)))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (id),
        ...{ class: "col-span-12 lg:col-span-6" },
    });
    /** @type {[typeof Ticket, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(Ticket, new Ticket({
        ticketProps: ([item.icon, item.title, item.ticketList]),
        ...{ class: ([__VLS_ctx.route.path == '/dashboard/report' ? 'ticketbox-dashboard-report' : '']) },
    }));
    const __VLS_19 = __VLS_18({
        ticketProps: ([item.icon, item.title, item.ticketList]),
        ...{ class: ([__VLS_ctx.route.path == '/dashboard/report' ? 'ticketbox-dashboard-report' : '']) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-6']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box-cpn']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['work-history-datepicker']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text=[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-hoverinset']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#013878]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[8px_16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-md:text-[14px]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['col-span-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-6']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            VueDatePicker: VueDatePicker,
            vi: vi,
            Breadcrums: Breadcrums,
            Buttons: Buttons,
            Ticket: Ticket,
            MainLayout: MainLayout,
            ticket: ticket,
            route: route,
            datepicker: datepicker,
            updateDates: updateDates,
            handleSearchReport: handleSearchReport,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=DashboardReport.vue.js.map