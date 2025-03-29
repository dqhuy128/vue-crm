import { ref, reactive } from "vue";
import TreeNode from "./TreeNode.vue";
// Sample tree data structure matching the image
const treeData = reactive([
    {
        id: "system",
        label: "Quản trị hệ thống",
        expanded: true,
        children: [
            {
                id: "user-management",
                label: "Quản lý người dùng",
                children: []
            },
            {
                id: "permission-management",
                label: "Quản lý phân quyền",
                children: []
            },
            {
                id: "system-catalog",
                label: "Quản lý danh mục chung của hệ thống",
                children: []
            }
        ]
    },
    {
        id: "documents",
        label: "Tài liệu",
        expanded: false,
        children: []
    },
    {
        id: "attendance",
        label: "Quản lý chấm công",
        expanded: false,
        children: []
    },
    {
        id: "leave",
        label: "Quản lý ngày nghỉ",
        expanded: false,
        children: []
    },
    {
        id: "tickets",
        label: "Xin/duyệt ticket",
        expanded: false,
        children: []
    },
    {
        id: "notifications",
        label: "Quản lý thông báo",
        expanded: false,
        children: []
    }
]);
// Track selected items
const selectedItems = reactive(new Set(["user-management", "system-catalog"]));
// Toggle selection of a node
const toggleSelect = (node) => {
    const nodeId = node.id;
    if (selectedItems.has(nodeId)) {
        // Unselect the node
        selectedItems.delete(nodeId);
        // If the node has children, unselect all children
        if (node.children && node.children.length > 0) {
            unselectChildren(node);
        }
    }
    else {
        // Select the node
        selectedItems.add(nodeId);
        // If the node has children, select all children
        if (node.children && node.children.length > 0) {
            selectChildren(node);
        }
    }
};
// Toggle expand/collapse of a node
const toggleExpand = (node) => {
    node.expanded = !node.expanded;
};
// Helper function to select all children of a node
const selectChildren = (node) => {
    if (!node.children)
        return;
    node.children.forEach((child) => {
        selectedItems.add(child.id);
        selectChildren(child);
    });
};
// Helper function to unselect all children of a node
const unselectChildren = (node) => {
    if (!node.children)
        return;
    node.children.forEach((child) => {
        selectedItems.delete(child.id);
        unselectChildren(child);
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tree-component w-full border min-h-[120px] border-solid border-[#EDEDF6] bg-white rounded-[8px] text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75" },
});
for (const [node] of __VLS_getVForSourceType((__VLS_ctx.treeData))) {
    /** @type {[typeof TreeNode, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(TreeNode, new TreeNode({
        ...{ 'onToggleSelect': {} },
        ...{ 'onToggleExpand': {} },
        key: (node.id),
        node: (node),
        selectedItems: (__VLS_ctx.selectedItems),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onToggleSelect': {} },
        ...{ 'onToggleExpand': {} },
        key: (node.id),
        node: (node),
        selectedItems: (__VLS_ctx.selectedItems),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onToggleSelect: (__VLS_ctx.toggleSelect)
    };
    const __VLS_7 = {
        onToggleExpand: (__VLS_ctx.toggleExpand)
    };
    var __VLS_2;
}
/** @type {__VLS_StyleScopedClasses['tree-component']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[120px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-main']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:opacity-75']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TreeNode: TreeNode,
            treeData: treeData,
            selectedItems: selectedItems,
            toggleSelect: toggleSelect,
            toggleExpand: toggleExpand,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
