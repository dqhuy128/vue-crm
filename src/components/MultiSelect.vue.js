import { computed } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
const props = defineProps();
const emit = defineEmits(["update:modelValue"]);
const internalValue = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        // Khi giá trị thay đổi, emit event để báo cho component cha
        emit("update:modelValue", val);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.multiselect;
/** @type {[typeof __VLS_components.Multiselect, typeof __VLS_components.multiselect, typeof __VLS_components.Multiselect, typeof __VLS_components.multiselect, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.internalValue),
    searchable: (false),
    closeOnSelect: (true),
    showLabels: (false),
    placeholder: (props.holder),
    options: (props.options),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.internalValue),
    searchable: (false),
    closeOnSelect: (true),
    showLabels: (false),
    placeholder: (props.holder),
    options: (props.options),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Multiselect: Multiselect,
            internalValue: internalValue,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
