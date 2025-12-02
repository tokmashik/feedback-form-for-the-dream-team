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
    disabled: { type: Boolean, default: false },
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
    justify-content: start;
    display: flex;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #6f6c90;
    /* user-select: none; */
  }

  .input-field {
    padding: 14px 16px;
    border-radius: 8px;
    background: var(--color-neutral-200);
    border: 1px solid transparent;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s ease;
  }

  .input-field:focus {
    border: 1px solid #4a3aff;
  }

  .input-field::placeholder {
    color: #a0a3bd;
  }
</style>
