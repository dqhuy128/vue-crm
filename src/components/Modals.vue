<template>
  <div v-show="isVisible" class="modal-overlay" @click.self="closeModal">
    <div
      class="modal-content relative max-md:mx-1.5"
      :class="{ 'modal-enter': isVisible, 'modal-leave': !isVisible }"
    >
      <button
        @click="closeModal"
        class="absolute right-6 top-6 z-10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z"
            fill="#464661"
          />
        </svg>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue"

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const isVisible = ref(props.isVisible)
    watch(
      () => props.isVisible,
      (newVal) => {
        isVisible.value = newVal
      }
    )

    return {
      isVisible
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  opacity: 0;
  visibility: hidden;
}

.modal-content {
  border-radius: 24px;
  background: #fff;
  width: 100%;
  max-width: 670px;
  padding: 6px;
  transform: scale(0.9);

  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  opacity: 0;
  max-height: 95vh;
  overflow-y: auto;
  box-sizing: border-box;
  transition-delay: 1s !important;
}

.modal-enter {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.modal-leave {
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.modal-overlay {
  visibility: visible;
  opacity: 1;
}
</style>
