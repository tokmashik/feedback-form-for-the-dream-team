<template>
  <div class="select" ref="selectRef">
    <label v-if="label" class="select__label">{{ label }}</label>

    <div
      class="select__box"
      :class="{ 'select__box--open': isOpen }"
      @click="toggleDropdown"
    >
      <span
        class="select__text"
        :class="{ 'select__text--active': modelValue }"
      >
        {{ selectedLabel || placeholder }}
      </span>

      <svg
        class="select__arrow"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="#6F6C90"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div v-if="isOpen" class="select__dropdown">
      <div
        v-for="option in filteredOptions"
        :key="option.value"
        class="select__item"
        :class="{ 'select__item--selected': option.value === modelValue }"
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
    options: { type: Array, default: () => [] },
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

  const filteredOptions = computed(() =>
    props.options.filter((o) => o.value !== ''),
  );

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
  .select {
    display: flex;
    flex-direction: column;
    position: relative;

    &__label {
      margin-bottom: 4px;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      color: var(--color-neutral-600);
      font-weight: 400;
      line-height: 20px;
    }

    &__box {
      padding: 12px 16px;
      border-radius: 8px;
      background: var(--color-neutral-200);
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: border 0.2s ease;

      &--open {
        border: 1px solid var(--color-primary1);

        .select__arrow {
          transform: rotate(180deg);
        }
      }

      .select__text {
        color: var(--color-neutral-500);
        font-size: 16px;

        &--active {
          color: var(--color-neutral-800);
        }
      }

      .select__arrow {
        transition: transform 0.25s ease;
      }
    }

    &__dropdown {
      margin-top: 8px;
      background: var(--color-neutral-100);
      border-radius: 8px;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
      overflow: hidden;
      z-index: 100;
      position: absolute;
      width: 100%;
    }

    &__item {
      width: 100%;
      height: 44px;
      padding: 12px 16px;
      background: var(--color-neutral-100);
      color: #4e4b66;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background 0.15s ease;
      font-size: 16px;

      &:hover {
        background: var(--color-primary1-hover-disabled);
      }

      &--selected {
        background: var(--color-neutral-600);
        color: var(--color-neutral-100);
      }
    }
  }
</style>
