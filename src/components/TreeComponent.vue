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
import { ref, reactive } from "vue"
import TreeNode from "./TreeNode.vue"

// Sample tree data structure matching the image
const treeData = reactive([
  {
    id: "system",
    label: "Quản trị hệ thống",
    expanded: true,
    children: [
      {
        id: "user-management",
        label: "Quản lý người dùng",
        children: []
      },
      {
        id: "permission-management",
        label: "Quản lý phân quyền",
        children: []
      },
      {
        id: "system-catalog",
        label: "Quản lý danh mục chung của hệ thống",
        children: []
      }
    ]
  },
  {
    id: "documents",
    label: "Tài liệu",
    expanded: false,
    children: []
  },
  {
    id: "attendance",
    label: "Quản lý chấm công",
    expanded: false,
    children: []
  },
  {
    id: "leave",
    label: "Quản lý ngày nghỉ",
    expanded: false,
    children: []
  },
  {
    id: "tickets",
    label: "Xin/duyệt ticket",
    expanded: false,
    children: []
  },
  {
    id: "notifications",
    label: "Quản lý thông báo",
    expanded: false,
    children: []
  }
])

// Track selected items
const selectedItems = reactive(new Set(["user-management", "system-catalog"]))

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
</script>

<style lang="scss" scoped>
.tree-component {
  padding: 5px 12px 35px;
}
</style>
