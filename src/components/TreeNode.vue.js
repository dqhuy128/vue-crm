/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed } from 'vue';
// Define props
const props = defineProps({
    node: {
        type: Object,
        required: true,
    },
    level: {
        type: Number,
        default: 0,
    },
    selectedItems: {
        type: Set,
        required: true,
    },
});
// Define emits
const emit = defineEmits(['toggle-select', 'toggle-expand']);
// Computed properties
const hasChildren = computed(() => {
    return props.node.children && props.node.children.length > 0;
});
const isSelected = computed(() => {
    return props.selectedItems.has(props.node.id);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['expand-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['children']} */ ;
/** @type {__VLS_StyleScopedClasses['node-label']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tree-node" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "node-content" },
    ...{ style: ({ paddingLeft: `${__VLS_ctx.level * 20}px` }) },
});
if (__VLS_ctx.hasChildren) {
    if (__VLS_ctx.hasChildren) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren))
                        return;
                    if (!(__VLS_ctx.hasChildren))
                        return;
                    __VLS_ctx.$emit('toggle-expand', __VLS_ctx.node);
                } },
            ...{ class: "expand-icon" },
        });
        if (__VLS_ctx.node.expanded) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: "@/assets/images/tabler_caret-down-filled.svg",
                alt: "",
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: "@/assets/images/tabler_caret-right-filled.svg",
                alt: "",
            });
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "expand-placeholder" },
        });
    }
}
if (!__VLS_ctx.hasChildren) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onChange: (...[$event]) => {
                if (!(!__VLS_ctx.hasChildren))
                    return;
                __VLS_ctx.$emit('toggle-select', __VLS_ctx.node);
            } },
        id: (__VLS_ctx.node.id),
        type: "checkbox",
        checked: (__VLS_ctx.isSelected),
        ...{ class: "checkbox" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: (__VLS_ctx.node.id),
        ...{ class: "checkbox-label" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: (__VLS_ctx.node.id),
    ...{ class: "node-label" },
});
(__VLS_ctx.node.label);
if (__VLS_ctx.hasChildren && __VLS_ctx.node.expanded) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "children" },
    });
    for (const [child] of __VLS_getVForSourceType((__VLS_ctx.node.children))) {
        const __VLS_0 = {}.TreeNode;
        /** @type {[typeof __VLS_components.TreeNode, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ 'onToggleSelect': {} },
            ...{ 'onToggleExpand': {} },
            key: (child.id),
            node: (child),
            level: (__VLS_ctx.level + 1),
            selectedItems: (__VLS_ctx.selectedItems),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onToggleSelect': {} },
            ...{ 'onToggleExpand': {} },
            key: (child.id),
            node: (child),
            level: (__VLS_ctx.level + 1),
            selectedItems: (__VLS_ctx.selectedItems),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_4;
        let __VLS_5;
        let __VLS_6;
        const __VLS_7 = {
            onToggleSelect: (...[$event]) => {
                if (!(__VLS_ctx.hasChildren && __VLS_ctx.node.expanded))
                    return;
                __VLS_ctx.$emit('toggle-select', $event);
            }
        };
        const __VLS_8 = {
            onToggleExpand: (...[$event]) => {
                if (!(__VLS_ctx.hasChildren && __VLS_ctx.node.expanded))
                    return;
                __VLS_ctx.$emit('toggle-expand', $event);
            }
        };
        var __VLS_3;
    }
}
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-content']} */ ;
/** @type {__VLS_StyleScopedClasses['expand-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['expand-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['node-label']} */ ;
/** @type {__VLS_StyleScopedClasses['children']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            hasChildren: hasChildren,
            isSelected: isSelected,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=TreeNode.vue.js.map