<template>
  <div class="tree-node" :style="{ '--level': level }">
    <!-- Node Content -->
    <div class="node-content" :class="{ 'has-children': hasChildren }">
      <!-- Indentation and Connection Lines -->
      <div class="node-indent" :style="{ marginLeft: `${level * 32}px` }">
        <!-- Connection lines -->
        <div v-if="level > 0" class="connection-lines">
          <!-- Vertical line -->
          <div class="vertical-line"></div>
          <!-- Horizontal line -->
          <div class="horizontal-line"></div>
        </div>

        <!-- Expand/Collapse Toggle -->
        <button v-if="hasChildren" class="toggle-btn" :class="{ expanded: node.expanded }" @click="toggleExpanded">
          <div class="toggle-icon">
            <div class="toggle-line horizontal"></div>
            <div class="toggle-line vertical" :class="{ hidden: node.expanded }"></div>
          </div>
        </button>

        <!-- Empty space for nodes without children -->
        <div v-else class="toggle-placeholder"></div>
      </div>

      <!-- Node Label and Actions -->
      <div class="node-label">
        <span class="node-text">{{ node.name }}</span>
        <button class="edit-btn" @click="handleEdit">
          <span>Sửa</span>
        </button>
      </div>
    </div>

    <!-- Children -->
    <div v-if="hasChildren && node.expanded" class="node-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        @edit="$emit('edit', $event)"
        @toggle="$emit('toggle', $event)"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  // Props
  const props = defineProps({
    node: {
      type: Object,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
  })

  // Emits
  const emit = defineEmits(['edit', 'toggle'])

  // Computed
  const hasChildren = computed(() => {
    return props.node.children && props.node.children.length > 0
  })

  // Methods
  const toggleExpanded = () => {
    emit('toggle', props.node.id)
  }

  const handleEdit = () => {
    emit('edit', props.node)
  }
</script>

<style scoped>
  .tree-node {
    position: relative;
  }

  .node-content {
    display: flex;
    align-items: flex-start;
    padding: 8px 0;
    position: relative;
    transition: background-color 0.2s ease;
  }

  .node-indent {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 6px;
  }

  /* .connection-lines {
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
  }

  .vertical-line {
    position: absolute;
    left: 17px;
    top: -27px;
    width: 0;
    height: 30px;
    border-left: 1px dashed #909090;
  }

  .horizontal-line {
    position: absolute;
    left: -15px;
    top: 0;
    width: 30px;
    height: 1px;
    border-top: 1px dashed #909090;
  } */

  .toggle-btn {
    width: 12px;
    height: 12px;
    border: 1px solid #909090;
    border-radius: 2px;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 12px;
    transition: all 0.2s ease;
  }

  .toggle-btn:hover {
    border-color: #464661;
    background: #f8f9fa;
  }

  .toggle-icon {
    position: relative;
    width: 6px;
    height: 6px;
  }

  .toggle-line {
    position: absolute;
    background: #909090;
    transition: all 0.2s ease;
  }

  .toggle-line.horizontal {
    left: 1px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 1px;
  }

  .toggle-line.vertical {
    left: 50%;
    top: 1px;
    transform: translateX(-50%);
    width: 1px;
    height: 4px;
  }

  .toggle-line.hidden {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }

  .toggle-placeholder {
    width: 12px;
    height: 12px;
    margin-right: 12px;
  }

  .node-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* flex: 1; */
    min-width: 0;
  }

  .node-text {
    color: #464661;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    flex: 1;
  }

  .edit-btn {
    background: #1bb6ea;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 1px 7px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-left: 12px;
    flex-shrink: 0;
  }

  .edit-btn:hover {
    background: #16a5d8;
    transform: translateY(-1px);
  }

  .node-children {
    position: relative;
  }

  /* Additional connection lines for nested children */
  /* .node-children::before {
    content: '';
    position: absolute;
    left: calc(var(--level) * 24px + 29px);
    top: -12px;
    bottom: 17px;
    width: 0;
    border-left: 1px dashed #909090;
  } */
</style>
