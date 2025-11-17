<template>
  <SelectRoot :model-value="modelValue" @update:model-value="updateModelValue">
    <SelectTrigger
      class="flex w-full flex-wrap items-center rounded-full border border-solid border-[#EDEDF6] bg-white px-2.5 py-1.5 text-[#000] focus:outline-none data-[placeholder]:text-[#909090]"
      aria-label="Customise options"
    >
      <SelectValue
        class="font-inter w-[90%] grow overflow-hidden rounded-full text-start text-[16px] leading-normal font-normal text-ellipsis whitespace-nowrap max-md:text-[14px]"
        :placeholder="placeholder"
      />
      <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent
        class="SelectContent data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[102] overflow-hidden rounded-lg bg-[#FAFAFA] will-change-[opacity,transform]"
        position="popper"
        :side-offset="5"
        @open-auto-focus="handleOpenAutoFocus"
      >
        <div class="sticky top-0 z-10 border-b border-gray-200 bg-[#FAFAFA] p-2">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#D5E3E8] focus:outline-none"
            @keydown.stop
            @keyup.stop
            @keypress.stop
            @input.stop
            @focus.stop
            @blur.stop
            @click.stop
          />
        </div>
        <SelectScrollUpButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
          <Icon icon="radix-icons:chevron-up" />
        </SelectScrollUpButton>

        <SelectViewport :style="{ maxHeight }">
          <SelectGroup>
            <SelectItem
              v-if="showDefaultOption"
              class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
              value="all"
            >
              <SelectItemText>{{ placeholder }}</SelectItemText>
            </SelectItem>

            <template v-for="(items, key) in filteredOptions" :key="String(key)">
              <SelectItem
                v-for="(item, _) in items"
                :key="getOptionValue(item)"
                class="p-[6px_12px] text-[16px] leading-normal font-normal text-[#464661] data-[disabled]:pointer-events-none data-[highlighted]:bg-[#D5E3E8] data-[highlighted]:outline-none data-[highlighted]:hover:cursor-pointer"
                :value="String(getOptionValue(item))"
              >
                <SelectItemText>
                  {{ getOptionLabel(item) }}
                </SelectItemText>
              </SelectItem>
            </template>

            <!-- No results message -->
            <div
              v-if="searchQuery.trim() && filteredOptions && Object.keys(filteredOptions).length === 0"
              class="p-[6px_12px] text-center text-[14px] text-gray-500"
            >
              Không tìm thấy kết quả
            </div>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
          <Icon icon="radix-icons:chevron-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport,
  } from 'radix-vue'
  import { computed, nextTick, onUnmounted, ref, watch } from 'vue'

  interface Props {
    modelValue: string
    options: Record<string, any[]> | null
    placeholder?: string
    searchPlaceholder?: string
    optionValue?: string
    optionLabel?: string
    maxHeight?: string
    showDefaultOption?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Chọn...',
    searchPlaceholder: 'Tìm kiếm...',
    optionValue: 'id',
    optionLabel: 'name',
    maxHeight: '300px',
    showDefaultOption: true,
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const searchQuery = ref('')
  const debouncedSearchQuery = ref('')
  const searchInput = ref<HTMLInputElement | null>(null)

  // Debounce search query updates
  let searchTimeout: number | null = null
  const debounceSearch = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = value
    }, 300) // 300ms debounce
  }

  // Watch for search query changes and debounce them
  watch(searchQuery, (newValue) => {
    debounceSearch(newValue)
  })

  // Computed property to filter options based on debounced search query
  const filteredOptions = computed(() => {
    if (!props.options || !debouncedSearchQuery.value.trim()) {
      return props.options
    }

    const query = debouncedSearchQuery.value.toLowerCase().trim()
    const filtered: any = {}

    for (const [key, items] of Object.entries(props.options)) {
      const filteredItems = (items as any[]).filter(
        (item: any) => getOptionLabel(item) && getOptionLabel(item).toLowerCase().includes(query)
      )

      if (filteredItems.length > 0) {
        filtered[key] = filteredItems
      }
    }

    return filtered
  })

  const getOptionValue = (item: any): any => {
    return item[props.optionValue]
  }

  const getOptionLabel = (item: any): string => {
    return item[props.optionLabel] || ''
  }

  const updateModelValue = (value: string) => {
    emit('update:modelValue', value === 'all' ? '' : value)
  }

  // Handle auto-focus when dropdown opens
  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault()
    // Use nextTick to ensure DOM is updated
    nextTick(() => {
      searchInput.value?.focus()
    })
  }

  watch(props.modelValue, (newValue) => {
    if (newValue) {
      searchQuery.value = ''
    }
  })

  // Cleanup timeout on component unmount
  onUnmounted(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
  })
</script>

<style scoped>
  /* Custom animations for SelectContent */
  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-slideDownAndFade {
    animation: slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .animate-slideLeftAndFade {
    animation: slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .animate-slideUpAndFade {
    animation: slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .animate-slideRightAndFade {
    animation: slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
</style>
