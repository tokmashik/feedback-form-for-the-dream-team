<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}<span v-if="required" class="required-star">*</span>
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :placeholder="placeholder"
      :rows="3"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :class="['input-field', { 'input-error': error }]"
    ></textarea>

    <input
      v-else
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :class="['input-field', { 'input-error': error }]"
    />

    <span v-if="error" class="error-message">{{ error }}</span>
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
    error: { type: String, default: '' },
    required: { type: Boolean, default: false },
  });

  defineEmits(['update:modelValue']);
</script>

<style scoped>
  .base-input {
    display: flex;
    flex-direction: column;
  }

  .input-label {
    margin-bottom: 4px;
    justify-content: start;
    display: flex;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--color-neutral-600);
  }

  .required-star {
    color: var(--color-danger);
    margin-left: 2px;
  }

  .input-field {
    padding: 14px 16px;
    border-radius: 8px;
    background: var(--color-neutral-200);
    border: 1px solid transparent;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s ease;
    resize: none;
    color: var(--color-neutral-800);
  }

  .input-field:focus {
    border: 1px solid var(--color-primary1);
  }

  .input-field.input-error {
    border: 1px solid var(--color-danger);
  }

  .input-field::placeholder {
    color: var(--color-neutral-500);
  }

  .error-message {
    color: var(--color-danger);
    font-size: 12px;
    margin-top: 4px;
  }
  textarea {
    color: var(--color-neutral-800);
    font-size: 16px;
    font-family: 'DM Sans', sans-serif;
  }
  .textarea-field {
    min-height: 80px;
  }
  input::selection,
  textarea::selection {
    background-color: #b8b2ff;
  }
</style>
