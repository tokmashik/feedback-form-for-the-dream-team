<template>
    <div class="base-input">
      <label v-if="label" :for="id" class="input-label">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
        class="input-field"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    label: { type: String, default: '' },
    id: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  })
  
  defineEmits(['update:modelValue'])
  </script>
  
  <style scoped>
  .base-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  
  .input-label {
    margin-bottom: 0.25rem;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .input-field {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;
  }
  
  .input-field:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
  </style>
  