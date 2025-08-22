<template>
  <div class="scrollable-dropdown" :class="{ open: isOpen }">
    <!-- Dropdown Trigger -->
    <div ref="trigger" class="dropdown-trigger" @click="toggleDropdown">
      <input
        type="text"
        :value="displayValue"
        :placeholder="placeholder"
        readonly
        class="dropdown-input"
        :class="{ 'has-value': selectedValue }"
      />
      <div class="dropdown-arrow" :class="{ open: isOpen }">
        <svg viewBox="0 0 24 24" class="arrow-icon">
          <path
            d="M8.964 10.164C9.04758 10.0804 9.1468 10.0141 9.25602 9.96883C9.36523 9.92358 9.48229 9.90029 9.6005 9.90029C9.71871 9.90029 9.83577 9.92358 9.94498 9.96883C10.0542 10.0141 10.1534 10.0804 10.237 10.164L12 11.927L13.764 10.164C13.9339 10.0011 14.1608 9.91126 14.3962 9.91369C14.6315 9.91612 14.8565 10.0106 15.023 10.177C15.1895 10.3433 15.2842 10.5683 15.2868 10.8036C15.2894 11.039 15.1998 11.266 15.037 11.436L12.637 13.836C12.5534 13.9196 12.4542 13.9859 12.345 14.0312C12.2358 14.0764 12.1187 14.0997 12.0005 14.0997C11.8823 14.0997 11.7652 14.0764 11.656 14.0312C11.5468 13.9859 11.4476 13.9196 11.364 13.836L8.964 11.436C8.79546 11.2672 8.70079 11.0385 8.70079 10.8C8.70079 10.5615 8.79546 10.3327 8.964 10.164Z"
            fill="#464661"
          />
        </svg>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div v-if="isOpen" ref="menu" class="dropdown-menu">
        <div class="dropdown-content">
          <div
            v-for="option in options"
            :key="option.value"
            class="dropdown-option"
            :class="{
              selected: option.value === selectedValue,
              nested: option.level > 0,
            }"
            :style="{ paddingLeft: `${(option.level || 0) * 20}px` }"
            @click="selectOption(option)"
          >
            <span class="option-text">{{ option.label }}</span>
            <span v-if="option.value === selectedValue" class="selected-indicator">✓</span>
          </div>
        </div>

        <!-- Custom Scrollbar -->
        <div class="scrollbar">
          <div class="scrollbar-track">
            <div class="scrollbar-thumb" :style="scrollbarStyle" @mousedown="startDrag"></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

  // Props
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Chọn một tùy chọn',
    },
    maxHeight: {
      type: String,
      default: '200px',
    },
  })

  // Emits
  const emit = defineEmits(['update:modelValue', 'change'])

  // Reactive data
  const isOpen = ref(false)
  const trigger = ref(null)
  const menu = ref(null)
  const scrollTop = ref(0)
  const isDragging = ref(false)

  // Computed
  const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  const displayValue = computed(() => {
    if (!selectedValue.value) return ''
    const option = props.options.find((opt) => opt.value === selectedValue.value)
    return option ? option.label : ''
  })

  const scrollbarStyle = computed(() => {
    if (!menu.value) return {}

    const menuElement = menu.value.querySelector('.dropdown-content')
    if (!menuElement) return {}

    const { scrollHeight, clientHeight } = menuElement
    const scrollRatio = clientHeight / scrollHeight
    const thumbHeight = Math.max(scrollRatio * clientHeight, 20)
    const thumbTop = (scrollTop.value / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight)

    return {
      height: `${thumbHeight}px`,
      top: `${thumbTop}px`,
      display: scrollRatio >= 1 ? 'none' : 'block',
    }
  })

  // Methods
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      nextTick(() => {
        scrollToSelected()
      })
    }
  }

  const selectOption = (option) => {
    selectedValue.value = option.value
    emit('change', option)
    isOpen.value = false
  }

  const scrollToSelected = () => {
    if (!menu.value || !selectedValue.value) return

    const selectedElement = menu.value.querySelector('.dropdown-option.selected')
    if (selectedElement) {
      const menuContent = menu.value.querySelector('.dropdown-content')
      const optionTop = selectedElement.offsetTop
      const optionHeight = selectedElement.offsetHeight
      const menuHeight = menuContent.clientHeight

      if (optionTop < scrollTop.value) {
        menuContent.scrollTop = optionTop
      } else if (optionTop + optionHeight > scrollTop.value + menuHeight) {
        menuContent.scrollTop = optionTop + optionHeight - menuHeight
      }
    }
  }

  const _handleScroll = (e) => {
    scrollTop.value = e.target.scrollTop
  }

  const startDrag = (e) => {
    isDragging.value = true
    const startY = e.clientY
    const startScrollTop = scrollTop.value

    const handleMouseMove = (e) => {
      if (!isDragging.value) return

      const deltaY = e.clientY - startY
      const menuContent = menu.value.querySelector('.dropdown-content')
      const { scrollHeight, clientHeight } = menuContent
      const maxScroll = scrollHeight - clientHeight
      const scrollRatio = deltaY / clientHeight

      menuContent.scrollTop = Math.max(0, Math.min(startScrollTop + scrollRatio * maxScroll, maxScroll))
    }

    const handleMouseUp = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleClickOutside = (e) => {
    if (trigger.value && !trigger.value.contains(e.target) && menu.value && !menu.value.contains(e.target)) {
      isOpen.value = false
    }
  }

  // Lifecycle
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style scoped>
  .scrollable-dropdown {
    position: relative;
    width: 100%;
  }

  .dropdown-trigger {
    position: relative;
    cursor: pointer;
  }

  .dropdown-input {
    width: 100%;
    height: 38px;
    padding: 0 40px 0 16px;
    border: 1px solid #ededf6;
    border-radius: 8px;
    background: white;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #464661;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dropdown-input:focus {
    outline: none;
    border-color: #1b4dea;
    box-shadow: 0 0 0 3px rgba(27, 77, 234, 0.1);
  }

  .dropdown-input::placeholder {
    color: #909090;
    font-style: italic;
  }

  .dropdown-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.2s ease;
    pointer-events: none;
  }

  .dropdown-arrow.open {
    transform: translateY(-50%) rotate(180deg);
  }

  .arrow-icon {
    width: 24px;
    height: 24px;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: v-bind(maxHeight);
    overflow: hidden;
    display: flex;
    border-radius: 8px;
    border: 1px solid #ededf6;
    background: #f5f8fa;
  }

  .dropdown-content {
    flex: 1;
    max-height: v-bind(maxHeight);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 10px 30px;
  }

  .dropdown-content::-webkit-scrollbar {
    display: none;
  }

  .dropdown-option {
    padding: 6px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #f5f8fa;
  }

  .dropdown-option:last-child {
    border-bottom: none;
  }

  .dropdown-option:hover {
    background: #f8f9fa;
  }

  /* .dropdown-option.selected .option-text {
    color: #1b4dea;
  } */

  .dropdown-option.nested {
    font-size: 14px;
  }

  .option-text {
    color: #464661;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex: 1;
  }

  .selected-indicator {
    color: #1b4dea;
    font-weight: bold;
    font-size: 14px;
  }

  .scrollbar {
    width: 8px;
    background: #f5f8fa;
    position: relative;
  }

  .scrollbar-track {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .scrollbar-thumb {
    position: absolute;
    width: 6px;
    left: 1px;
    background: #bcbcbc;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  /* Transitions */
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease;
    transform-origin: top;
  }

  .dropdown-enter-from {
    opacity: 0;
    transform: scaleY(0.8) translateY(-10px);
  }

  .dropdown-leave-to {
    opacity: 0;
    transform: scaleY(0.8) translateY(-10px);
  }

  .dropdown-enter-to,
  .dropdown-leave-from {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
</style>
