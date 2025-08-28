<script lang="ts" setup>
  import axios from 'axios'
  import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useAuth } from 'vue-auth3'

  import Breadcrums from '@/components/BreadcrumsNew.vue'
  import DepartmentForm from '@/components/Form/DepartmentForm.vue'
  import TreeDepartment from '@/components/Tree/TreeDepartment.vue'
  import { apiUri } from '@/constants/apiUri'

  import MainLayout from '../MainLayout.vue'
  const toggleBoxFilters = ref(false)
  const screenWidth = ref(window.innerWidth)
  const isInputActive = ref(false)
  let resizeTimer: any
  // Chỉ cập nhật toggleBoxFilters khi không có input đang focus
  const updateLayout = () => {
    screenWidth.value = window.innerWidth
    if (!isInputActive.value) {
      toggleBoxFilters.value = screenWidth.value >= 768
    }
  }
  // Xử lý sự kiện khi input được focus/blur
  const trackInputState = (event: any) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      isInputActive.value = event.type === 'focus'
    }
  }
  // Add event listener for window resize
  onMounted(() => {
    // Khởi tạo giá trị ban đầu
    updateLayout()

    // Theo dõi resize với debounce
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateLayout, 100)
    })

    // Sử dụng event capturing để theo dõi tất cả input
    document.addEventListener('focus', trackInputState, true)
    document.addEventListener('blur', trackInputState, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('focus', trackInputState, true)
    document.removeEventListener('blur', trackInputState, true)
    window.removeEventListener('resize', updateLayout)
    clearTimeout(resizeTimer)
  })
  // Watch for screenWidth changes
  watch(screenWidth, () => {
    updateLayout()
  })

  const auth = useAuth()

  // Department Management State
  const editingDepartment = ref(null)
  const parentOptions = ref([
    { value: null, label: 'Danh mục gốc', level: 0 },
    { value: '12-1', label: 'Khối điều hành', level: 1 },
    { value: '12-2', label: 'DM cấp 2 - Phòng ban', level: 2 },
    { value: '12-3', label: 'DM cấp 3 - Bộ phận', level: 2 },
    { value: '12-4', label: 'Khối BO', level: 1 },
    { value: '12-5', label: 'Khối Kinh doanh', level: 1 },
  ])
  const departmentTree = ref([])
  const fetchDepartmentTree = async () => {
    try {
      const { data } = await axios.get(`${apiUri}/categories/staff`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      departmentTree.value = data.data
    } catch (error) {
      console.error('Error fetching department tree:', error)
    }
  }

  // Department Management Methods
  const handleAddDepartment = () => {
    // editingDepartment.value = null
    // Object.assign(paramsDetailDepartment, { id: '', name: '', description: '', parent_id: null })
  }

  const paramsDetailDepartment = reactive({
    id: '',
    name: '',
    description: '',
    parent_id: '',
    type: 'staff',
  })
  const getDetailDepartment = async (nodeId: string) => {
    try {
      const { data } = await axios.get(`${apiUri}/categories/detail?id=${nodeId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      const { id, name, description, parent_id } = data.data
      Object.assign(paramsDetailDepartment, { id, name, description, parent_id })
    } catch (error) {
      console.error('Error fetching department:', error)
    }
  }

  const handleFormSubmit = async (_formData: any) => {
    try {
      const formData = new FormData()
      // Determine mode by presence of id
      const isUpdate = Boolean(_formData?.id)

      if (_formData?.id) formData.append('id', _formData.id)
      if (_formData?.type) formData.append('type', _formData.type)
      if (_formData?.name) formData.append('name', _formData.name)
      if (_formData?.description) formData.append('description', _formData.description)
      if (_formData?.parentId !== undefined && _formData?.parentId !== null && _formData?.parentId !== '') {
        formData.append('parent_id', _formData.parentId)
      }

      const url = isUpdate ? `${apiUri}/categories/update` : `${apiUri}/categories/create`

      const { status } = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      if (status === 200) {
        await fetchDepartmentTree()
        // Clear edit state and reset form to create mode
        Object.assign(paramsDetailDepartment, { id: '', name: '', description: '', parent_id: '' })
        editingDepartment.value = null
      }
    } catch (error) {
      console.error('Error saving department:', error)
    }
  }

  const handleFormCancel = () => {
    editingDepartment.value = null
  }

  const handleNodeToggle = (_nodeId: string) => {
    // console.log('Node toggled:', nodeId)
  }

  const handleDeleteDepartment = async (id: string) => {
    try {
      const formData = new FormData()
      formData.append('id', id)
      const { status } = await axios.post(`${apiUri}/categories/delete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token()}`,
        },
      })
      if (status === 200) {
        await fetchDepartmentTree()
      }
    } catch (error) {
      console.error('Error deleting department:', error)
    }
  }

  onMounted(() => {
    fetchDepartmentTree()
  })
</script>

<template>
  <MainLayout>
    <Breadcrums name=" Khối, Phòng ban, bộ phận" path="/overtime" />

    <div
      class="font-inter hidden flex-[1] text-[20px] leading-normal font-bold text-[#464661] max-md:text-[16px] md:block"
    >
      Danh sách bộ phận
    </div>

    <!-- Department Management Content -->
    <div class="department-management">
      <div class="management-container">
        <!-- Left Panel - Tree Structure -->
        <div class="left-panel">
          <template v-if="departmentTree.length > 0">
            <TreeDepartment
              :data="departmentTree"
              @add-department="handleAddDepartment"
              @edit-department="getDetailDepartment"
              @node-toggle="handleNodeToggle"
              @delete-department="handleDeleteDepartment"
            />
          </template>
          <template v-else>
            <div class="flex h-full items-center justify-center">
              <p class="text-[16px] leading-6 text-[#464661]">Chưa có dữ liệu ...</p>
            </div>
          </template>
        </div>

        <!-- Right Panel - Form -->
        <div :class="['right-panel']">
          <DepartmentForm
            :edit-data="paramsDetailDepartment"
            :department-tree="departmentTree"
            :parent-options="parentOptions"
            @submit="handleFormSubmit"
            @cancel="handleFormCancel"
          />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
  .department-management {
    padding: 24px 0;
    min-height: calc(100vh - 200px);

    .management-container {
      border-radius: 24px;
      background: #fff;
      grid-template-columns: 35% 1fr;

      @media (min-width: 1024px) {
        display: grid;
        gap: 24px;
      }

      @media (max-width: 991px) {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 0 16px;
      }
    }

    // .left-panel,
    // .right-panel {
    //   background: white;
    //   border-radius: 24px;
    //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    //   overflow: hidden;
    //   height: fit-content;
    // }

    .left-panel {
      padding: 30px;

      @media (min-width: 1024px) {
        border-right: 1px solid #ededf6;
      }

      @media (max-width: 991px) {
        padding-bottom: 0;
      }

      @media (max-width: 767px) {
        padding-inline: 0;
      }
    }

    .right-panel {
      position: sticky;
      top: 24px;
      padding: 30px 30px 70px 0;

      @media (max-width: 991px) {
        position: static;
        padding: 0 30px 30px;
      }

      @media (max-width: 767px) {
        padding-inline: 0;
        padding-block: 30px;
      }
    }
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .department-management .management-container {
      max-width: 100%;
      padding: 0 16px;
    }
  }

  @media (max-width: 768px) {
    .department-management {
      padding: 16px 0;

      .management-container {
        gap: 16px;
        padding: 0 12px;
      }
    }
  }
</style>
