<template>
  <div class="skeleton-table">
    <!-- Skeleton Header -->
    <div class="skeleton-header">
      <div v-for="n in columns" :key="n" class="skeleton-cell skeleton-header-cell">
        <div class="skeleton-shimmer"></div>
      </div>
    </div>

    <!-- Skeleton Body Rows -->
    <div class="skeleton-body">
      <div v-for="row in rows" :key="row" class="skeleton-row">
        <div v-for="col in columns" :key="`${row}-${col}`" class="skeleton-cell">
          <div class="skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    columns: number
    rows?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    rows: 10,
  })
</script>

<style scoped>
  .skeleton-table {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  .skeleton-header {
    display: flex;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    padding: 16px 20px;
  }

  .skeleton-header-cell {
    height: 24px;
  }

  .skeleton-body {
    background-color: white;
  }

  .skeleton-row {
    display: flex;
    padding: 16px 20px;
    border-bottom: 1px solid #f1f3f4;
    align-items: center;
  }

  .skeleton-row:last-child {
    border-bottom: none;
  }

  .skeleton-cell {
    flex: 1;
    margin: 0 8px;
    position: relative;
    overflow: hidden;
  }

  .skeleton-cell:first-child {
    margin-left: 0;
  }

  .skeleton-cell:last-child {
    margin-right: 0;
  }

  .skeleton-shimmer {
    width: 100%;
    height: 20px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
    background-size: 400% 100%;
    animation: shimmer 10s linear infinite;
    border-radius: 4px;
  }

  .skeleton-header-cell .skeleton-shimmer {
    height: 24px;
  }

  @keyframes shimmer {
    0% {
      background-position: -400% 0;
    }
    100% {
      background-position: 400% 0;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .skeleton-header,
    .skeleton-row {
      padding: 12px 16px;
    }

    .skeleton-shimmer {
      height: 16px;
    }

    .skeleton-header-cell .skeleton-shimmer {
      height: 20px;
    }
  }
</style>
