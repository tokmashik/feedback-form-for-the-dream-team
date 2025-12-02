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
});

defineEmits(['update:modelValue']);
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
  width: 260.5px;
  height: 56px;
  padding: 14px 16px;
  border-radius: 8px;
  background: var(--color-neutral-200);
  border: 1px solid transparent;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease;
}

.input-field:focus {
  border: 1px solid #4A3AFF;
}
</style>
