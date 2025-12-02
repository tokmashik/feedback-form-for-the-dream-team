<template>
  <div class="base-select">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      class="select-field"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const isFocused = ref(false);

  defineProps({
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    id: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    options: {
      type: Array,
      default: () => [
        { value: '', label: 'Выберите' },
        { value: '1', label: 'Опция 1' },
        { value: '2', label: 'Опция 2' },
        { value: '3', label: 'Опция 3' },
      ],
    },
  });

  defineEmits(['update:modelValue']);
</script>

<style scoped>
  .base-select {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .input-label {
    margin-bottom: 0.25rem;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .select-field {
    width: 260.5px;
    height: 56px;
    border-radius: 8px;
    padding: 14px 16px;
    background: var(--color-neutral-200);
    border: 1px solid transparent;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s ease;
  }

  .select-field:focus {
    border: 1px solid #4a3aff;
    background: var(--color-neutral-200);
  }
</style>
