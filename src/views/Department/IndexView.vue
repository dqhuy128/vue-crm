<script lang="ts" setup>
  import axios from 'axios'
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
  const departmentTree = ref([])
  const parentOptions = ref([
    { value: null, label: 'Danh mục gốc', level: 0 },
    { value: '12-1', label: 'Khối điều hành', level: 1 },
    { value: '12-2', label: 'DM cấp 2 - Phòng ban', level: 2 },
    { value: '12-3', label: 'DM cấp 3 - Bộ phận', level: 2 },
    { value: '12-4', label: 'Khối BO', level: 1 },
    { value: '12-5', label: 'Khối Kinh doanh', level: 1 },
  ])

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
    editingDepartment.value = null
  }

  const handleEditDepartment = (department: any) => {
    editingDepartment.value = department
  }

  const handleFormSubmit = async (_formData: any) => {
    try {
      // TODO: Implement API call to save department
      // console.log('Saving department:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // After save, keep form visible and reset editing state if needed
      editingDepartment.value = null

      // TODO: Refresh department tree data
      alert('Lưu thành công!')
    } catch (error) {
      console.error('Error saving department:', error)
      alert('Có lỗi xảy ra khi lưu!')
    }
  }

  const handleFormCancel = () => {
    editingDepartment.value = null
  }

  const handleNodeToggle = (_nodeId: string) => {
    // console.log('Node toggled:', nodeId)
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
          <TreeDepartment
            :data="departmentTree"
            @add-department="handleAddDepartment"
            @edit-department="handleEditDepartment"
            @node-toggle="handleNodeToggle"
          />
        </div>

        <!-- Right Panel - Form -->
        <div class="right-panel">
          <DepartmentForm
            :edit-data="editingDepartment"
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
