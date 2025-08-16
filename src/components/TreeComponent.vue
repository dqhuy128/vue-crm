<script lang="ts" setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import TreeNode from '@/components/TreeNode.vue'
import axios from 'axios'
import { apiUri } from '@/constants/apiUri'
import { useAuth } from 'vue-auth3'

const auth = useAuth()
const props = defineProps({
  permission: {
    type: Object,
    required: true
  }
})

interface typePermission {
  group: string
  action: string
  status: string
}

const dataTypePermission = reactive<typePermission>({
  group: '',
  action: '',
  status: ''
})
const isLoadingUpdate = ref(false)
const isErrorUpdate = ref(false)

const treeData = ref<Record<string, any>>({})
const treeArray = ref<any[]>([])

const fetchPermissionList = async () => {
  try {
    isLoadingUpdate.value = true
    const { data } = await axios.post(
      `${apiUri}/permission/listPermission`,
      {},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`
        }
      }
    )
    const { data: dataPermission } = data
    treeData.value = dataPermission
    rebuildTreeArray()
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingUpdate.value = false
  }
}

const rebuildTreeArray = () => {
  treeArray.value = Object.entries(treeData.value || {}).map(
    ([groupKey, groupValue]: [string, any]) => {
      const children = Object.entries(groupValue.action || {}).map(
        ([actionKey, actionLabel]) => {
          return {
            id: `${groupKey}.${actionKey}`,
            label: actionLabel,
            children: []
          }
        }
      )

      return {
        id: groupKey,
        label: groupValue.name,
        expanded: true,
        children
      }
    }
  )
  // After building the tree, sync selected items if permissions already loaded
  updateSelectedItems()
}

fetchPermissionList()

const updatePermission = async (dataTypePermission: typePermission) => {
  isLoadingUpdate.value = true
  try {
    const permissionFormData = new FormData()
    permissionFormData.append('group', dataTypePermission.group)
    permissionFormData.append('action', dataTypePermission.action)
    permissionFormData.append('status', dataTypePermission.status)

    const response = await axios.post(
      `${apiUri}/permission/updatePermission`,
      permissionFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`
        }
      }
    )

    const { data } = response
    console.log('🚀 ~ updatePermission ~ response:', data)
    if (data.status === 0) {
      isErrorUpdate.value = true
      return false
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingUpdate.value = false
  }
}

// Track selected items
const selectedItems = reactive(new Set())
const permissionsArray = ref<any[]>([])

// Toggle selection of a node
const toggleSelect = (node: any) => {
  const nodeId = node.id

  if (selectedItems.has(nodeId)) {
    // Unselect the node
    selectedItems.delete(nodeId)

    // If the node has children, unselect all children
    if (node.children && node.children.length > 0) {
      unselectChildren(node)
    }

    // Sử dụng nextTick để đảm bảo việc cập nhật UI hoàn tất trước
    nextTick(() => {
      dataTypePermission.action = nodeId
      dataTypePermission.status = '0'
      updatePermission(dataTypePermission)
    })
  } else {
    // Select the node
    selectedItems.add(nodeId)

    // If the node has children, select all children
    if (node.children && node.children.length > 0) {
      selectChildren(node)
    }

    // Sử dụng nextTick để đảm bảo việc cập nhật UI hoàn tất trước
    nextTick(() => {
      dataTypePermission.action = nodeId
      dataTypePermission.status = '1'
      updatePermission(dataTypePermission)
    })
  }
}

// Toggle expand/collapse of a node
const toggleExpand = (node: any) => {
  node.expanded = !node.expanded
}

// Helper function to select all children of a node
const selectChildren = (node: any) => {
  if (!node.children) return

  node.children.forEach((child: any) => {
    selectedItems.add(child.id)
    selectChildren(child)
  })
}

// Helper function to unselect all children of a node
const unselectChildren = (node: any) => {
  if (!node.children) return

  node.children.forEach((child: any) => {
    selectedItems.delete(child.id)
    unselectChildren(child)
  })
}

// Function to recursively find and add matching permissions
const findAndAddPermissions = (node: any, permissions: any) => {
  // Check if the current node ID exists in the permissions
  const found = permissions.some((perm: any) => perm.key === node.id)

  if (found) {
    selectedItems.add(node.id)

    // Find the permission object
    const permission = permissions.find((perm: any) => perm.key === node.id)

    // Recursively check all children independently
    if (
      node.children &&
      node.children.length > 0 &&
      permission &&
      permission.values
    ) {
      node.children.forEach((child: any) => {
        permission.values.forEach((value: any) => {
          if (`${node.id}.${value}` === child.id) {
            selectedItems.add(child.id)
          }
        })
      })
    }
  }
}

// Scan the entire tree and update selectedItems based on permissions
const updateSelectedItems = () => {
  if (!permissionsArray.value || permissionsArray.value.length === 0) return

  // Clear existing selections if needed
  selectedItems.clear()

  // Process each top-level node
  treeArray.value.forEach((node: any) => {
    findAndAddPermissions(node, permissionsArray.value)
  })
}

watch(
  () => [
    props.permission.permission,
    props.permission.listPermission,
    props.permission.name
  ],
  () => {
    const transformedObj: any = {}
    Object.entries(props.permission?.listPermission || {}).forEach(
      ([key, values]: any) => {
        transformedObj[key] = values.map((value: any) => [value])
      }
    )
    permissionsArray.value = Object.entries(transformedObj).map(
      ([key, values]) => {
        return { ['key']: key, ['values']: values }
      }
    )
    dataTypePermission.group = props.permission.name
    updateSelectedItems()
  }
)

onMounted(() => {
  // Update selected items on component mount
  updateSelectedItems()
})
</script>

<template>
  <div
    class="tree-component w-full border min-h-[120px] border-solid border-[#EDEDF6] bg-white rounded-[8px] text-[#000] font-inter text-[16px] font-normal leading-normal focus:border-main placeholder:text-[#909090] placeholder:opacity-75"
  >
    <TreeNode
      v-for="node in treeArray"
      :key="node.id"
      :node="node"
      :selectedItems="selectedItems"
      @toggle-select="toggleSelect"
      @toggle-expand="toggleExpand"
    />
  </div>

  <template v-if="isLoadingUpdate">
    <div
      id="isLoadingTree"
      class="absolute w-full inset-0 !h-full z-100 bg-[#ffffffbf]"
    >
      <div class="animate-loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.tree-component {
  padding: 5px 12px 35px;
}

#isLoadingTree {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 45px);

  .animate-loading {
    animation: circle 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
