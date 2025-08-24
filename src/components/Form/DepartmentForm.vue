<template>
  <div class="department-form">
    <!-- Form Header -->
    <div class="form-header">
      <h2 class="form-title">THÊM MỚI KHỐI, PHÒNG BAN, BỘ PHẬN</h2>
    </div>

    <!-- Form Content -->
    <form class="form-content" @submit.prevent="handleSubmit">
      <!-- Name Field -->
      <div class="form-field">
        <!-- required -->
        <label class="form-label required"> Tên </label>
        <input
          v-model="formData.name"
          type="text"
          class="form-input"
          :class="{ error: errors.name }"
          placeholder="Nhập tên khối, phòng ban, bộ phận muốn thêm mới"
          @blur="validateField('name')"
          @input="clearError('name')"
        />
        <div v-if="errors.name" class="error-message">
          {{ errors.name }}
        </div>
      </div>

      <!-- Parent Category Field -->
      <div class="form-field">
        <label class="form-label">Danh mục cha</label>
        <ScrollableDropdown
          v-model="formData.parentId"
          :options="computedParentOptions"
          placeholder="Danh mục gốc"
          @change="handleParentChange"
        />
      </div>

      <!-- Description Field -->
      <div class="form-field">
        <label class="form-label">Mô tả</label>
        <textarea v-model="formData.description" class="form-textarea" placeholder="Nhập nội dung" rows="4"></textarea>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" class="btn btn-cancel" @click="handleCancel">XOÁ</button>
        <button type="submit" class="btn btn-save" :disabled="isSubmitting || !isFormValid">
          {{ isSubmitting ? 'ĐANG LƯU...' : isEditMode ? 'CẬP NHẬT' : 'LƯU' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { computed, reactive, ref, watch } from 'vue'

  import ScrollableDropdown from '../Dropdown/ScrollableDropdown.vue'

  // Props
  const props = defineProps({
    editData: {
      type: Object,
      default: null,
    },
    departmentTree: {
      type: Array,
      default: () => [],
    },
    parentOptions: {
      type: Array,
      default: () => [
        {
          value: null,
          label: 'Danh mục gốc',
          level: 0,
        },
        {
          value: '12-1',
          label: 'Khối điều hành',
          level: 1,
        },
        {
          value: '12-2',
          label: 'DM cấp 2 - Phòng ban',
          level: 2,
        },
        {
          value: '12-3',
          label: 'DM cấp 3 - Bộ phận',
          level: 2,
        },
        {
          value: '12-4',
          label: 'Khối BO',
          level: 1,
        },
        {
          value: '12-5',
          label: 'Khối Kinh doanh',
          level: 1,
        },
      ],
    },
  })

  // Emits
  const emit = defineEmits(['submit', 'cancel'])

  // Reactive data
  const formData = reactive({
    id: props.editData?.id || '',
    name: props.editData?.name || '',
    parentId: props.editData?.parent_id || null,
    description: props.editData?.description || '',
    type: 'staff',
  })

  const errors = reactive({
    name: null,
  })

  const isSubmitting = ref(false)

  // Computed
  const isFormValid = computed(() => {
    return formData.name.trim().length > 0 && !errors.name
  })

  // Edit mode derived from presence of id
  const isEditMode = computed(() => {
    return Boolean(props.editData && (props.editData.id || formData.id))
  })

  // Optional: build parent options from departmentTree if provided
  const flattenTreeToOptions = (nodes, level = 0) => {
    if (!Array.isArray(nodes)) return []
    const results = []
    for (const node of nodes) {
      results.push({ value: node.id, label: node.name || String(node.id), level })
      if (node.children && node.children.length) {
        results.push(...flattenTreeToOptions(node.children, level + 1))
      }
    }
    return results
  }

  // Parent options derived from departmentTree if provided; fallback to prop parentOptions
  const computedParentOptions = computed(() => {
    if (Array.isArray(props.departmentTree) && props.departmentTree.length) {
      return [{ value: null, label: 'Danh mục gốc', level: 0 }, ...flattenTreeToOptions(props.departmentTree, 1)]
    }
    return props.parentOptions
  })

  // Sync form when editData changes so clicking "Sửa" trên node khác sẽ cập nhật ngay
  watch(
    () => props.editData,
    (val) => {
      if (val) {
        Object.assign(formData, {
          id: val.id || '',
          name: val.name || '',
          parentId: val.parent_id || '',
          description: val.description || '',
        })
      } else {
        Object.assign(formData, {
          id: '',
          name: '',
          parentId: '',
          description: '',
        })
      }
      // Clear validation errors on context switch
      Object.keys(errors).forEach((key) => {
        errors[key] = null
      })
    },
    { immediate: true, deep: true }
  )

  // Validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
  }

  // Methods
  const validateField = (fieldName) => {
    const rules = validationRules[fieldName]
    const value = formData[fieldName]

    if (fieldName === 'name') {
      if (rules.required && (!value || value.trim().length === 0)) {
        errors.name = 'Tên là trường bắt buộc'
        return false
      }

      if (value && value.trim().length < rules.minLength) {
        errors.name = `Tên phải có ít nhất ${rules.minLength} ký tự`
        return false
      }

      if (value && value.length > rules.maxLength) {
        errors.name = `Tên không được vượt quá ${rules.maxLength} ký tự`
        return false
      }

      errors.name = null
      return true
    }

    return true
  }

  const validateForm = () => {
    let isValid = true

    // Validate all fields
    Object.keys(validationRules).forEach((field) => {
      if (!validateField(field)) {
        isValid = false
      }
    })

    return isValid
  }

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      errors[fieldName] = null
    }
  }

  const handleParentChange = (option) => {
    formData.parentId = option?.value ?? null
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    isSubmitting.value = true

    try {
      await emit('submit', formData)

      // Reset form if not in edit mode
      if (!isEditMode.value) {
        resetForm()
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  const handleCancel = () => {
    if (props.editData) {
      // Reset to original data
      Object.assign(formData, {
        name: props.editData.name || '',
        parentId: props.editData.parent_id || '',
        description: props.editData.description || '',
      })
    } else {
      resetForm()
    }

    // Clear errors
    Object.keys(errors).forEach((key) => {
      errors[key] = null
    })

    emit('cancel')
  }

  const resetForm = () => {
    Object.assign(formData, {
      name: '',
      parentId: '',
      description: '',
    })
  }
</script>

<style scoped>
  /* .department-form {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  } */

  .form-title {
    color: #464661;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.7;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  .form-field {
    margin-bottom: 24px;
  }

  .form-field:last-of-type {
    margin-bottom: 32px;
  }

  .form-label {
    display: block;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #464661;
    margin-bottom: 8px;
  }

  .form-label.required {
    position: relative;
  }

  .required-asterisk {
    color: #e61b1b;
    margin-left: 4px;
  }

  .form-input {
    width: 100%;
    height: 38px;
    padding: 0 16px;
    border: 1px solid #ededf6;
    border-radius: 8px;
    background: white;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #464661;
    transition: all 0.2s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: #1b4dea;
    box-shadow: 0 0 0 3px rgba(27, 77, 234, 0.1);
  }

  .form-input.error {
    border-color: #e61b1b;
  }

  .form-input.error:focus {
    box-shadow: 0 0 0 3px rgba(230, 27, 27, 0.1);
  }

  .form-input::placeholder {
    color: #909090;
    font-style: italic;
  }

  .form-textarea {
    width: 100%;
    min-height: 139px;
    padding: 16px;
    border: 1px solid #ededf6;
    border-radius: 8px;
    background: white;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #464661;
    resize: vertical;
    transition: all 0.2s ease;
  }

  .form-textarea:focus {
    outline: none;
    border-color: #1b4dea;
    box-shadow: 0 0 0 3px rgba(27, 77, 234, 0.1);
  }

  .form-textarea::placeholder {
    color: #909090;
    font-style: italic;
  }

  .error-message {
    margin-top: 6px;
    font-size: 14px;
    color: #e61b1b;
    font-weight: 500;
  }

  .form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-start;
    padding-top: 10px;
  }

  .btn {
    height: 38px;
    padding: 0 24px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
      min-width: 175px;
    }

    @media (max-width: 767px) {
      flex: 1;
    }
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-cancel {
    background: white;
    color: #464661;
    border: 1px solid #ededf6;
  }

  .btn-cancel:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #d1d5db;
  }

  .btn-save {
    background: #013878;
    color: white;
  }

  .btn-save:hover:not(:disabled) {
    background: #012a5a;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(1, 56, 120, 0.3);
  }
</style>
