/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import axios from 'axios';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useAuth } from 'vue-auth3';
import TreeNode from '@/components/TreeNode.vue';
import { apiUri } from '@/constants/apiUri';
const auth = useAuth();
const props = defineProps({
    permission: {
        type: Object,
        required: true,
    },
});
const dataTypePermission = reactive({
    group: '',
    action: '',
    status: '',
});
const isLoadingUpdate = ref(false);
const isErrorUpdate = ref(false);
const treeData = ref({});
const treeArray = ref([]);
const fetchPermissionList = async () => {
    try {
        isLoadingUpdate.value = true;
        const { data } = await axios.post(`${apiUri}/permission/listPermission`, {}, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data: dataPermission } = data;
        treeData.value = dataPermission;
        rebuildTreeArray();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        isLoadingUpdate.value = false;
    }
};
const rebuildTreeArray = () => {
    treeArray.value = Object.entries(treeData.value || {}).map(([groupKey, groupValue]) => {
        const children = Object.entries(groupValue.action || {}).map(([actionKey, actionLabel]) => {
            return {
                id: `${groupKey}.${actionKey}`,
                label: actionLabel,
                children: [],
            };
        });
        return {
            id: groupKey,
            label: groupValue.name,
            expanded: true,
            children,
        };
    });
    // After building the tree, sync selected items if permissions already loaded
    updateSelectedItems();
};
fetchPermissionList();
const updatePermission = async (dataTypePermission) => {
    isLoadingUpdate.value = true;
    try {
        const permissionFormData = new FormData();
        permissionFormData.append('group', dataTypePermission.group);
        permissionFormData.append('action', dataTypePermission.action);
        permissionFormData.append('status', dataTypePermission.status);
        const response = await axios.post(`${apiUri}/permission/updatePermission`, permissionFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data } = response;
        console.log('🚀 ~ updatePermission ~ response:', data);
        if (data.status === 0) {
            isErrorUpdate.value = true;
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        isLoadingUpdate.value = false;
    }
};
// Track selected items
const selectedItems = reactive(new Set());
const permissionsArray = ref([]);
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
        // Sử dụng nextTick để đảm bảo việc cập nhật UI hoàn tất trước
        nextTick(() => {
            dataTypePermission.action = nodeId;
            dataTypePermission.status = '0';
            updatePermission(dataTypePermission);
        });
    }
    else {
        // Select the node
        selectedItems.add(nodeId);
        // If the node has children, select all children
        if (node.children && node.children.length > 0) {
            selectChildren(node);
        }
        // Sử dụng nextTick để đảm bảo việc cập nhật UI hoàn tất trước
        nextTick(() => {
            dataTypePermission.action = nodeId;
            dataTypePermission.status = '1';
            updatePermission(dataTypePermission);
        });
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
// Function to recursively find and add matching permissions
const findAndAddPermissions = (node, permissions) => {
    // Check if the current node ID exists in the permissions
    const found = permissions.some((perm) => perm.key === node.id);
    if (found) {
        selectedItems.add(node.id);
        // Find the permission object
        const permission = permissions.find((perm) => perm.key === node.id);
        // Recursively check all children independently
        if (node.children && node.children.length > 0 && permission && permission.values) {
            node.children.forEach((child) => {
                permission.values.forEach((value) => {
                    if (`${node.id}.${value}` === child.id) {
                        selectedItems.add(child.id);
                    }
                });
            });
        }
    }
};
// Scan the entire tree and update selectedItems based on permissions
const updateSelectedItems = () => {
    if (!permissionsArray.value || permissionsArray.value.length === 0)
        return;
    // Clear existing selections if needed
    selectedItems.clear();
    // Process each top-level node
    treeArray.value.forEach((node) => {
        findAndAddPermissions(node, permissionsArray.value);
    });
};
watch(() => [props.permission.permission, props.permission.listPermission, props.permission.name], () => {
    const transformedObj = {};
    Object.entries(props.permission?.listPermission || {}).forEach(([key, values]) => {
        transformedObj[key] = values.map((value) => [value]);
    });
    permissionsArray.value = Object.entries(transformedObj).map(([key, values]) => {
        return { ['key']: key, ['values']: values };
    });
    dataTypePermission.group = props.permission.name;
    updateSelectedItems();
});
onMounted(() => {
    // Update selected items on component mount
    updateSelectedItems();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tree-component font-inter focus:border-main min-h-[120px] w-full rounded-[8px] border border-solid border-[#EDEDF6] bg-white text-[16px] leading-normal font-normal text-[#000] placeholder:text-[#909090] placeholder:opacity-75" },
});
for (const [node] of __VLS_getVForSourceType((__VLS_ctx.treeArray))) {
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
if (__VLS_ctx.isLoadingUpdate) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "isLoadingTree",
        ...{ class: "absolute inset-0 z-100 !h-full w-full bg-[#ffffffbf]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "animate-loading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        'stroke-width': "1.5",
        stroke: "currentColor",
        ...{ class: "size-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
    });
}
/** @type {__VLS_StyleScopedClasses['tree-component']} */ ;
/** @type {__VLS_StyleScopedClasses['font-inter']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-main']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[120px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#EDEDF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#000]']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-[#909090]']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:opacity-75']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-100']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#ffffffbf]']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['size-6']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TreeNode: TreeNode,
            isLoadingUpdate: isLoadingUpdate,
            treeArray: treeArray,
            selectedItems: selectedItems,
            toggleSelect: toggleSelect,
            toggleExpand: toggleExpand,
        };
    },
    props: {
        permission: {
            type: Object,
            required: true,
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        permission: {
            type: Object,
            required: true,
        },
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=TreeComponent.vue.js.map