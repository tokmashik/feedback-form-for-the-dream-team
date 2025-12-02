<template>
  <div class="custom-select" ref="selectRef">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="select-box" :class="{ open: isOpen }" @click="toggleDropdown">
      <span class="selected-text">
        {{ selectedLabel || placeholder }}
      </span>

      <svg class="arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="#6F6C90"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Dropdown list -->
    <div v-if="isOpen" class="dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        class="dropdown-item"
        :class="{ selected: option.value === modelValue }"
        @click="select(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

  const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: 'Выберите' },
    options: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const isOpen = ref(false);
  const selectRef = ref(null);

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const select = (value) => {
    emit('update:modelValue', value);
    isOpen.value = false;
  };

  const selectedLabel = computed(() => {
    const item = props.options.find((o) => o.value === props.modelValue);
    return item ? item.label : '';
  });

  const handleClickOutside = (e) => {
    if (selectRef.value && !selectRef.value.contains(e.target)) {
      isOpen.value = false;
    }
  };

  onMounted(() => document.addEventListener('click', handleClickOutside));
  onBeforeUnmount(() =>
    document.removeEventListener('click', handleClickOutside),
  );
</script>

<style scoped lang="scss">
  .custom-select {
    width: 265px;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .input-label {
    margin-bottom: 4px;
    font-size: 14px;
    color: #6f6c90;
    font-weight: 400;
    line-height: 20px;
    justify-content: start;
    display: flex;
  }

  .select-box {
    width: 100%;
    // height: 44px;
    padding: 12px 16px;
    border-radius: 8px;
    background: var(--color-neutral-200);
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border 0.2s ease;

    .selected-text {
      color: #a0a3bd;
      font-size: 16px;
    }
    .selected-text::selection {
      background-color: #b8b2ff; /* фон выделения */
    }
    .arrow {
      transition: transform 0.25s ease;
    }

    &.open {
      border: 1px solid #4a3aff;

      .arrow {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown {
    margin-top: 8px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    z-index: 100;
    position: absolute;
    width: 100%;
  }

  .dropdown-item {
    width: 100%;
    height: 44px;
    padding: 12px 16px;
    background: #ffffff;
    color: #4e4b66;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    transition: background 0.15s ease;
    gap: 8px;
    font-size: 14px;

    &:hover {
      background: #f3f4f6;
    }

    &.selected {
      background: var(--color-neutral-600);
      color: #fff;
    }
  }
</style>
