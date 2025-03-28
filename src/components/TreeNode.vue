<template>
  <div class="tree-node">
    <div class="node-content" :style="{ paddingLeft: `${level * 20}px` }">
      <span
        v-if="hasChildren"
        class="expand-icon"
        @click="$emit('toggle-expand', node)"
      >
        <template v-if="node.expanded">
          <img src="@/assets/images/tabler_caret-down-filled.svg" alt="" />
        </template>

        <template v-else>
          <img src="@/assets/images/tabler_caret-right-filled.svg" alt="" />
        </template>
      </span>
      <span v-else class="expand-placeholder"></span>

      <input
        :id="node.id"
        type="checkbox"
        :checked="isSelected"
        @change="$emit('toggle-select', node)"
        class="checkbox"
      />

      <label :for="node.id" class="checkbox-label"></label>

      <label :for="node.id" class="node-label">{{ node.label }}</label>
    </div>

    <div v-if="hasChildren && node.expanded" class="children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :selectedItems="selectedItems"
        @toggle-select="$emit('toggle-select', $event)"
        @toggle-expand="$emit('toggle-expand', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

// Define props
const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  },
  selectedItems: {
    type: Set,
    required: true
  }
})

// Define emits
const emit = defineEmits(["toggle-select", "toggle-expand"])

// Computed properties
const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

const isSelected = computed(() => {
  return props.selectedItems.has(props.node.id)
})
</script>

<style lang="scss" scoped>
.tree-node {
  margin: 2px 0;
  border-bottom: 1px solid #ededf6;

  &:has(.children) {
    .node-content {
      padding-bottom: 6px;
    }

    @media (max-width: 767px) {
      .expand-placeholder {
        display: none;
      }
    }
  }
}

.node-content {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.expand-icon {
  width: 24px;
  cursor: pointer;
  user-select: none;
  margin-right: 12px;

  @media (max-width: 767px) {
    width: 14px;
    margin-right: 5px;
  }
}

.expand-placeholder {
  width: 24px;
  display: inline-block;
  margin-right: 12px;

  @media (max-width: 767px) {
    display: none;
  }
}

.checkbox {
  appearance: none;
  display: none;

  &:checked + .checkbox-label {
    &::after {
      content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.6997 4.19C14.0097 4.464 14.0387 4.938 13.7647 5.25L8.0147 11.75C7.9483 11.8251 7.86751 11.8861 7.77713 11.9294C7.68674 11.9728 7.58859 11.9975 7.48847 12.0023C7.38835 12.007 7.28829 11.9917 7.1942 11.9571C7.10012 11.9225 7.01392 11.8695 6.9407 11.801L3.1907 8.301C3.04644 8.16505 2.96186 7.97751 2.95547 7.77938C2.94907 7.58125 3.02138 7.38865 3.15657 7.24368C3.29177 7.0987 3.47886 7.01315 3.67695 7.00571C3.87504 6.99828 4.06802 7.06957 4.2137 7.204L7.4037 10.174L12.6437 4.254C12.709 4.1801 12.7883 4.1198 12.877 4.07658C12.9656 4.03335 13.062 4.00804 13.1604 4.0021C13.2589 3.99615 13.3576 4.00969 13.4508 4.04193C13.544 4.07418 13.63 4.12449 13.7037 4.19H13.6997Z" fill="%23E61B1B"/></svg>');
    }
  }

  &-label {
    flex-shrink: 0;
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    border: 1px solid #909090;
    background: #fff;
    margin-right: 12px;
    cursor: pointer;

    @media (max-width: 767px) {
      width: 14px;
      height: 14px;
      margin-right: 6px;
    }

    &::after {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      top: -2px;

      @media (max-width: 767px) {
        top: -4px;
        left: -2px;
      }
    }
  }
}

.node-label {
  color: #464661;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  user-select: none;

  @media (max-width: 767px) {
    font-size: 14px;
  }
}

.children {
  @media (min-width: 768px) {
    margin-left: 12px;
  }

  .node-label {
    color: #909090;
  }

  .node-content {
    padding: 7px 0;
  }

  .tree-node {
    border-bottom: none;
  }
}
</style>
