/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import { useRoute } from 'vue-router';
import FluentData from '@/assets/images/fluent_data-pie-24-regular.svg';
import FluentHistory from '@/assets/images/fluent_history-24-filled.svg';
import FluentNote from '@/assets/images/fluent_note-24-regular.svg';
import HugeContact from '@/assets/images/hugeicons_contact.svg';
import IconamoonCategory from '@/assets/images/iconamoon_category-light.svg';
import Iconoir from '@/assets/images/iconoir_timer-off.svg';
import OvertimeOutline from '@/assets/images/lsicon_overtime-outline.svg';
import LucideUserCog from '@/assets/images/lucide_user-cog.svg';
import LucideUserPen from '@/assets/images/lucide_user-pen.svg';
import MageDashboard from '@/assets/images/mage_dashboard.svg';
import EditNote from '@/assets/images/material-symbols_edit-note-outline-rounded.svg';
import TickCircle from '@/assets/images/mdi_tick-circle-outline.svg';
import MingcuteDepartment from '@/assets/images/mingcute_department-line.svg';
import Proicons from '@/assets/images/proicons_timer.svg';
import TableUserScan from '@/assets/images/tabler_user-scan.svg';
import { usePermissionStore } from '@/store/permission';
const refDataSidebar = ref([
    {
        icon: MageDashboard,
        title: 'Dashboard',
        route: 'Personal',
        permissionName: 'all',
        nav: false,
    },
    {
        icon: FluentData,
        title: 'Quản trị hệ thống',
        route: 'SystemUser',
        nav: true,
        permissionName: 'all',
        submenu: [
            {
                icon: LucideUserCog,
                title: 'Quản lý người dùng',
                route: 'SystemUser',
                permissionName: 'User',
            },
            {
                icon: LucideUserPen,
                title: 'Quản lý phân quyền',
                route: 'SystemPermission',
                permissionName: 'Permission',
            },
            {
                icon: IconamoonCategory,
                title: 'Quản lý danh mục',
                route: 'SystemCategory',
                permissionName: 'Categories',
            },
        ],
    },
    {
        icon: MingcuteDepartment,
        title: 'Khối, phòng ban',
        route: 'Department',
        nav: false,
        permissionName: 'all',
    },
    {
        icon: HugeContact,
        title: 'Hợp đồng',
        route: 'Contract',
        nav: false,
        permissionName: 'all',
    },
    {
        icon: FluentNote,
        title: 'Tài liệu',
        route: 'Document',
        nav: false,
        permissionName: 'Document',
    },
    {
        icon: Iconoir,
        title: 'Nghỉ phép',
        nav: true,
        route: 'Info',
        permissionName: 'Leave',
        submenu: [
            {
                icon: TableUserScan,
                title: 'Thông tin nghỉ phép',
                route: 'Info',
                permissionName: 'Leave',
                permissionRole: 'List',
            },
            {
                icon: TickCircle,
                title: 'Phê duyệt nghỉ phép',
                route: 'Access',
                permissionName: 'Leave',
                permissionRole: 'Approval',
            },
        ],
    },
    {
        icon: Proicons,
        title: 'Chấm công',
        nav: true,
        route: 'History',
        permissionName: 'Work',
        submenu: [
            {
                icon: FluentHistory,
                title: 'Lịch sử chấm công',
                route: 'History',
                permissionName: 'Work',
                permissionRole: 'List',
            },
            {
                icon: EditNote,
                title: 'Giải trình chấm công',
                route: 'Explain',
                permissionName: 'Work',
                permissionRole: 'Explanation',
            },
        ],
    },
    {
        icon: OvertimeOutline,
        title: 'Tăng ca',
        route: 'Overtime',
        nav: false,
        permissionName: 'Orvertime',
    },
]);
const auth = useAuth();
const route = useRoute();
console.log('🚀 ~ route:', route);
const dropdownState = ref({});
const toggleDropdown = (idx) => {
    // Nếu dropdown đang mở, đóng lại, nếu chưa mở, mở dropdown đó
    dropdownState.value[idx] = !dropdownState.value[idx];
};
const isDropdownOpen = (idx) => {
    // Kiểm tra dropdown có đang mở không
    return dropdownState.value[idx];
};
const isChildRoute = (item) => {
    if (!item.submenu)
        return false;
    return item.submenu.some((sub) => sub.route === route.name);
};
// Hàm mở dropdown dựa trên route hiện tại
const openActiveDropdowns = () => {
    refDataSidebar.value.map((item, idx) => {
        if (isChildRoute(item)) {
            dropdownState.value[idx] = true;
        }
    });
};
// Theo dõi thay đổi route để cập nhật dropdown
watch(() => route.name, () => {
    openActiveDropdowns();
}, { immediate: true });
const permissionData = usePermissionStore();
const { permision, permissionList, userData } = storeToRefs(permissionData);
// console.log(permissionList.value, 'permission change state')
const checkPermission = (arrRole, permissionRole) => {
    // First check if permissions are loaded
    if (!permision || !permision.value) {
        const token = auth.token();
        token && permissionData.fetchUserData(token);
        return false;
    }
    // Special cases
    if (arrRole === 'all') {
        return true;
    }
    if (arrRole === 'Admin') {
        return userData && userData.value?.per_group_name === 'Admin' ? true : false;
    }
    // Check if the permission name exists
    const hasPermissionName = permissionList.value.includes(arrRole);
    // If no permissionRole is provided, just check the permission name
    if (!permissionRole) {
        return hasPermissionName;
    }
    // If permissionRole is provided, check if it's in the array of roles for this permission
    if (hasPermissionName && permision.value[arrRole]) {
        return permision.value[arrRole].includes(permissionRole);
    }
    return false;
};
// Function to check if a menu item has any visible submenu items
const hasVisibleSubmenuItems = (item) => {
    if (!item.submenu)
        return true;
    return item.submenu.some((sub) => checkPermission(sub.permissionName, sub.permissionRole));
};
onMounted(() => {
    if (auth.check()) {
        openActiveDropdowns();
        const token = auth.token();
        if (token) {
            ;
            (permissionData.fetchPermission(token), permissionData.fetchUserData(token));
        }
        // permissionData.setUserPermission()
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sub-link']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "Sidebar",
    ...{ class: "sidebar bg-main flex h-full w-full flex-col px-2.5 py-6 max-xl:pt-14 xl:rounded-[24px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    id: "mbBtnCloseSidebar",
    type: "button",
    ...{ class: "absolute top-3 right-3 inline-block cursor-pointer rounded-[8px] bg-white p-1 xl:hidden" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M4 18C3.71667 18 3.47934 17.904 3.288 17.712C3.09667 17.52 3.00067 17.2827 3 17C2.99934 16.7173 3.09534 16.48 3.288 16.288C3.48067 16.096 3.718 16 4 16H20C20.2833 16 20.521 16.096 20.713 16.288C20.905 16.48 21.0007 16.7173 21 17C20.9993 17.2827 20.9033 17.5203 20.712 17.713C20.5207 17.9057 20.2833 18.0013 20 18H4ZM4 13C3.71667 13 3.47934 12.904 3.288 12.712C3.09667 12.52 3.00067 12.2827 3 12C2.99934 11.7173 3.09534 11.48 3.288 11.288C3.48067 11.096 3.718 11 4 11H20C20.2833 11 20.521 11.096 20.713 11.288C20.905 11.48 21.0007 11.7173 21 12C20.9993 12.2827 20.9033 12.5203 20.712 12.713C20.5207 12.9057 20.2833 13.0013 20 13H4ZM4 8C3.71667 8 3.47934 7.904 3.288 7.712C3.09667 7.52 3.00067 7.28267 3 7C2.99934 6.71733 3.09534 6.48 3.288 6.288C3.48067 6.096 3.718 6 4 6H20C20.2833 6 20.521 6.096 20.713 6.288C20.905 6.48 21.0007 6.71733 21 7C20.9993 7.28267 20.9033 7.52033 20.712 7.713C20.5207 7.90567 20.2833 8.00133 20 8H4Z",
    fill: "#464661",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-10 h-auto w-full max-w-full px-2.5" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: ({ name: 'Personal' }),
}));
const __VLS_2 = __VLS_1({
    to: ({ name: 'Personal' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/logo-sidebar.png",
    alt: "",
    ...{ class: "h-auto w-auto max-w-full object-scale-down" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "sidebar-menu" },
});
for (const [item, id] of __VLS_getVForSourceType((__VLS_ctx.refDataSidebar))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (id),
        ...{ class: "sidebar-menu-item" },
    });
    if (__VLS_ctx.permision &&
        __VLS_ctx.checkPermission(item.permissionName, item.permissionRole) &&
        (!item.submenu || __VLS_ctx.hasVisibleSubmenuItems(item))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "sidebar-menu-parent" },
        });
        const __VLS_4 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            to: ({ name: `${item.route}` }),
            ...{ class: "parent-link" },
        }));
        const __VLS_6 = __VLS_5({
            to: ({ name: `${item.route}` }),
            ...{ class: "parent-link" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        __VLS_7.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (item.icon),
            alt: "",
        });
        (item.title);
        var __VLS_7;
        if (item.nav) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.permision &&
                            __VLS_ctx.checkPermission(item.permissionName, item.permissionRole) &&
                            (!item.submenu || __VLS_ctx.hasVisibleSubmenuItems(item))))
                            return;
                        if (!(item.nav))
                            return;
                        __VLS_ctx.toggleDropdown(id);
                    } },
                type: "button",
                ...{ class: "sidebar-nav-dropdown" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                xmlns: "http://www.w3.org/2000/svg",
                width: "8",
                height: "6",
                viewBox: "0 0 8 6",
                fill: "none",
                ...{ class: ({ 'rotate-in': __VLS_ctx.isDropdownOpen(id) }) },
                ...{ style: ({ transition: 'transform 0.2s' }) },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
                d: "M0.963891 1.16401C1.04747 1.0804 1.1467 1.01408 1.25591 0.968836C1.36512 0.923588 1.48218 0.900299 1.60039 0.900299C1.71861 0.900299 1.83566 0.923588 1.94487 0.968836C2.05409 1.01408 2.15332 1.0804 2.23689 1.16401L3.99989 2.92701L5.76389 1.16401C5.93378 1.00112 6.16071 0.911265 6.39605 0.913693C6.63139 0.916122 6.85642 1.01064 7.02291 1.177C7.1894 1.34336 7.28409 1.56831 7.28671 1.80365C7.28932 2.03899 7.19964 2.26599 7.03689 2.43601L4.63689 4.83601C4.55331 4.91961 4.45409 4.98593 4.34487 5.03118C4.23566 5.07643 4.11861 5.09971 4.00039 5.09971C3.88218 5.09971 3.76512 5.07643 3.65591 5.03118C3.5467 4.98593 3.44747 4.91961 3.36389 4.83601L0.963891 2.43601C0.79535 2.26726 0.700684 2.03851 0.700684 1.80001C0.700684 1.56151 0.79535 1.33276 0.963891 1.16401Z",
                fill: "white",
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: "sidebar-menu-sub" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isDropdownOpen(id)) }, null, null);
        for (const [sub, idx] of __VLS_getVForSourceType((item.submenu))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                key: (idx),
            });
            if (__VLS_ctx.permision && __VLS_ctx.checkPermission(sub.permissionName, sub.permissionRole)) {
                const __VLS_8 = {}.RouterLink;
                /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
                // @ts-ignore
                const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
                    to: ({ name: `${sub.route}` }),
                    ...{ class: "sub-link" },
                }));
                const __VLS_10 = __VLS_9({
                    to: ({ name: `${sub.route}` }),
                    ...{ class: "sub-link" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_9));
                __VLS_11.slots.default;
                __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                    src: (sub.icon),
                    alt: "",
                });
                (sub.title);
                var __VLS_11;
            }
        }
    }
}
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-main']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-xl:pt-14']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:rounded-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-3']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-scale-down']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-parent']} */ ;
/** @type {__VLS_StyleScopedClasses['parent-link']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-nav-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['rotate-in']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-link']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            refDataSidebar: refDataSidebar,
            toggleDropdown: toggleDropdown,
            isDropdownOpen: isDropdownOpen,
            permision: permision,
            checkPermission: checkPermission,
            hasVisibleSubmenuItems: hasVisibleSubmenuItems,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Sidebar.vue.js.map