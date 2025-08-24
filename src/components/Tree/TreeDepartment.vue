<template>
  <div class="tree-department">
    <!-- Tree Structure -->
    <div class="tree-container">
      <!-- <div class="tree-header">
        <button class="add-btn" @click="$emit('add-department')">
          <svg class="add-icon" viewBox="0 0 24 24">
            <path
              d="M13 6C13 5.73478 12.8946 5.48043 12.7071 5.29289C12.5196 5.10536 12.2652 5 12 5C11.7348 5 11.4804 5.10536 11.2929 5.29289C11.1054 5.48043 11 5.73478 11 6V11H6C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12C5 12.2652 5.10536 12.5196 5.29289 12.7071C5.48043 12.8946 5.73478 13 6 13H11V18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19C12.2652 19 12.5196 18.8946 12.7071 18.7071C12.8946 18.5196 13 18.2652 13 18V13H18C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11H13V6Z"
              fill="white"
            />
          </svg>
          <span>Thêm mới</span>
        </button>
      </div> -->

      <div class="tree-content">
        <TreeNode
          v-for="node in treeData"
          :key="node.id"
          :node="node"
          :level="0"
          @edit="handleEdit"
          @toggle="handleToggle"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  import TreeNode from './TreeNode.vue'

  // Props
  const _props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
  })

  // Emits
  const emit = defineEmits(['add-department', 'edit-department', 'node-toggle', 'delete-department'])

  // Reactive tree data derived from props.data
  const treeData = ref([])
  const expandedIds = ref(new Set())

  // Helpers to safely access different back-end shapes
  const pick = (obj, keys) => {
    for (const key of keys) {
      if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key]
    }
    return undefined
  }

  const resolveChildren = (item) => {
    const candidates = [
      'children',
      'child',
      'childs',
      'childNodes',
      'sub',
      'subs',
      'items',
      'nodes',
      'departments',
      'list',
    ]
    for (const key of candidates) {
      if (Array.isArray(item?.[key])) return item[key]
    }
    return []
  }

  const formatLabel = (item) => {
    const code = pick(item, ['code', 'categoryCode', 'value'])
    const name = pick(item, ['name', 'title', 'label', 'categoryName', 'category_name'])
    if (code && name) return `[${code}] - ${name}`
    return String(name ?? code ?? pick(item, ['id', '_id', 'key']) ?? 'Unnamed')
  }

  const toNode = (item, pathIndex = '0', expandedIdSet) => {
    const id = String(pick(item, ['id', '_id', 'key', 'value', 'code', 'categoryCode']) ?? `${pathIndex}`)
    const children = resolveChildren(item)
    return {
      id,
      name: formatLabel(item),
      // Preserve expanded state if previously expanded
      expanded: expandedIdSet?.has(id) || false,
      children: (children || []).map((child, idx) => toNode(child, `${pathIndex}-${idx}`, expandedIdSet)),
    }
  }

  const mapTree = (input, expandedIdSet) => {
    if (!Array.isArray(input)) return []
    return input.map((item, idx) => toNode(item, String(idx), expandedIdSet))
  }

  // Sync incoming data
  watch(
    () => _props.data,
    (val) => {
      treeData.value = mapTree(val || [], expandedIds.value)
    },
    { immediate: true, deep: true }
  )

  // Methods
  const handleEdit = (id) => {
    emit('edit-department', id)
  }

  const handleDelete = (id) => {
    emit('delete-department', id)
  }

  const handleToggle = (nodeId) => {
    toggleNode(treeData.value, nodeId)
    emit('node-toggle', nodeId)
  }

  const toggleNode = (nodes, targetId) => {
    for (let node of nodes) {
      if (node.id === targetId) {
        node.expanded = !node.expanded
        if (node.expanded) {
          expandedIds.value.add(node.id)
        } else {
          expandedIds.value.delete(node.id)
        }
        return true
      }
      if (node.children && node.children.length > 0) {
        if (toggleNode(node.children, targetId)) {
          return true
        }
      }
    }
    return false
  }
</script>

<style scoped>
  .add-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1b4dea;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .add-btn:hover {
    background: #1640d6;
    transform: translateY(-1px);
  }

  .add-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .tree-content {
    /* padding: 16px 0; */
    max-height: 500px;
    overflow-y: auto;
  }

  .tree-content::-webkit-scrollbar {
    width: 6px;
  }

  .tree-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .tree-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .tree-content::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
</style>
