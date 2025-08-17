/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, inject, onMounted, ref } from 'vue';
const injectedOptions = inject('VFileDropOptions', {
    accept: undefined,
    multiple: undefined,
    id: undefined,
});
const { accept: injectedAccept, multiple: injectedMultiple, id: injectedId } = injectedOptions;
const props = withDefaults(defineProps(), {
    accept: () => [],
    multiple: false,
    id: undefined,
});
const emit = defineEmits();
const accept = computed(() => {
    if (injectedAccept) {
        return injectedAccept;
    }
    return props.accept;
});
const multiple = computed(() => {
    if (injectedMultiple) {
        return injectedMultiple;
    }
    return props.multiple;
});
const files = ref();
const returnFiles = computed(() => {
    if (multiple.value) {
        return files.value;
    }
    return files.value[0];
});
function emitChange() {
    emit('change', returnFiles.value);
}
const acceptInputMimeTypes = computed(() => {
    if (!accept.value.length) {
        return '';
    }
    if (typeof accept.value === 'string') {
        return accept.value;
    }
    return accept.value.join(',');
});
function checkIfTypeMimeIsAllowedOnDrop(file) {
    const fileType = file.type;
    if (!accept.value.length) {
        return true;
    }
    if (typeof accept.value === 'string') {
        return fileType === accept.value;
    }
    return accept.value.includes(fileType);
}
function onFileChange(event) {
    const eventTarget = event.target;
    if (!eventTarget.files) {
        return;
    }
    files.value = eventTarget.files;
    emitChange();
}
function onFileDrop(event) {
    event.preventDefault();
    if (!event.dataTransfer) {
        return;
    }
    files.value = [];
    if (!multiple.value && (event.dataTransfer?.items?.length > 1 || event?.dataTransfer?.files?.length > 1)) {
        console.warn("Only one file is allowed. Please add the 'multiple' prop on the component to allow multiple files.");
    }
    if (event.dataTransfer.items) {
        for (const item of [...event.dataTransfer.items]) {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file && !checkIfTypeMimeIsAllowedOnDrop(file)) {
                    console.error(`The file ${file.name} is not allowed. Please add the '${file.type}' mime type to the 'accept' prop on the component.`);
                    return;
                }
                if (file) {
                    files.value.push(file);
                }
            }
        }
    }
    else {
        for (const file of [...event.dataTransfer.files]) {
            if (file && !checkIfTypeMimeIsAllowedOnDrop(file)) {
                console.error(`The file ${file.name} is not allowed. Please add the '${file.type}' mime type to the 'accept' prop on the component.`);
                return;
            }
            if (file) {
                files.value.push(file);
            }
        }
    }
    emitChange();
}
function onDragover(event) {
    event.preventDefault();
}
// unmount then clear the files
onMounted(() => {
    console.log('Run Mounted FileUpload');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    accept: () => [],
    multiple: false,
    id: undefined,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "file-upload__container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.onFileChange) },
    id: ('upload-file' + (props.id ? `-${props.id}` : '')),
    ...{ class: "file-upload__input" },
    type: "file",
    accept: (__VLS_ctx.acceptInputMimeTypes),
    multiple: (__VLS_ctx.multiple),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
var __VLS_0 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ onDrop: (__VLS_ctx.onFileDrop) },
    ...{ onDragover: (__VLS_ctx.onDragover) },
    ...{ class: "file-upload__label" },
    htmlFor: ('upload-file' + (props.id ? `-${props.id}` : '')),
});
/** @type {__VLS_StyleScopedClasses['file-upload__container']} */ ;
/** @type {__VLS_StyleScopedClasses['file-upload__input']} */ ;
/** @type {__VLS_StyleScopedClasses['file-upload__label']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            multiple: multiple,
            acceptInputMimeTypes: acceptInputMimeTypes,
            onFileChange: onFileChange,
            onFileDrop: onFileDrop,
            onDragover: onDragover,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=FileUpload.vue.js.map