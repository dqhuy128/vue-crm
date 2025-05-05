<template>
  <div
    class="tree-component w-full border min-h-[120px] border-solid border-[#EDEDF6] bg-white rounded-[8px] text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
  >
    <TreeNode
      v-for="node in treeData"
      :key="node.id"
      :node="node"
      :selectedItems="selectedItems"
      @toggle-select="toggleSelect"
      @toggle-expand="toggleExpand"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import TreeNode from '@/components/TreeNode.vue'

const props = defineProps({
  permission: {
    type: Array,
    required: true
  }
})
watch(
  () => props.permission,
  (newVal) => {
    console.log('🚀 ~ newVal:', newVal)
    console.log('props.permission watch')
    initializeSelectedItems()
  }
)

// Sample tree data structure matching the image
const treeData = reactive([
  {
    id: 'Admin',
    label: 'Quản lý hệ thống',
    expanded: true,
    children: [
      {
        id: 'User',
        label: 'Quản lý người dùng',
        children: []
      },
      {
        id: 'Permission',
        label: 'Quản lý phân quyền',
        children: []
      },
      {
        id: 'Categories',
        label: 'Quản lý danh mục',
        children: []
      }
    ]
  },
  {
    id: 'Document',
    label: 'Quản lý tài liệu',
    expanded: false,
    children: []
  },
  {
    id: 'Leave',
    label: 'Quản lý nghỉ phép',
    expanded: false,
    children: []
  },
  {
    id: 'Work',
    label: 'Quản lý chấm công',
    expanded: false,
    children: []
  }
])

// Track selected items
const selectedItems = reactive(new Set())

// Initialize selectedItems based on permission prop
const initializeSelectedItems = () => {
  // Reset selections
  selectedItems.clear()
  // Helper function to check nodes recursively
  const checkNode = (node) => {
    if (props.permission.includes(node.id)) {
      selectedItems.add(node.id)
    }
    if (node.children && node.children.length > 0) {
      node.children.map((child) => checkNode(child))
    }
  }
  // Process all root nodes
  treeData.map((node) => checkNode(node))
  // Check parent nodes after all children have been processed
  updateParentNodes()
}

// Helper function to update parent nodes based on children selection
const updateParentNodes = () => {
  const checkParentNode = (node) => {
    if (!node.children || node.children.length === 0) return false

    const allChildrenSelected = node.children.every((child) => {
      // For nodes with their own children, recursively check
      if (child.children && child.children.length > 0) {
        return checkParentNode(child)
      }
      // For leaf nodes, just check if they're selected
      return selectedItems.has(child.id)
    })

    if (allChildrenSelected) {
      selectedItems.add(node.id)
      return true
    }

    return selectedItems.has(node.id)
  }

  // Process all root nodes
  treeData.map((node) => checkParentNode(node))
}

// Toggle selection of a node
const toggleSelect = (node) => {
  const nodeId = node.id

  if (selectedItems.has(nodeId)) {
    // Unselect the node
    selectedItems.delete(nodeId)

    // If the node has children, unselect all children
    if (node.children && node.children.length > 0) {
      unselectChildren(node)
    }
  } else {
    // Select the node
    selectedItems.add(nodeId)

    // If the node has children, select all children
    if (node.children && node.children.length > 0) {
      selectChildren(node)
    }
  }
}

// Toggle expand/collapse of a node
const toggleExpand = (node) => {
  node.expanded = !node.expanded
}

// Helper function to select all children of a node
const selectChildren = (node) => {
  if (!node.children) return

  node.children.forEach((child) => {
    selectedItems.add(child.id)
    selectChildren(child)
  })
}

// Helper function to unselect all children of a node
const unselectChildren = (node) => {
  if (!node.children) return

  node.children.forEach((child) => {
    selectedItems.delete(child.id)
    unselectChildren(child)
  })
}

onMounted(() => {
  // initializeSelectedItems()
})
</script>

<style lang="scss" scoped>
.tree-component {
  padding: 5px 12px 35px;
}
</style>
