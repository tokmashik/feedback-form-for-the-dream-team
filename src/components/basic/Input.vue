<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :placeholder="placeholder"
      :rows="3"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :class="['base-input__field', { 'base-input__field--error': error }]"
    ></textarea>

    <input
      v-else
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :class="['base-input__field', { 'base-input__field--error': error }]"
    />

    <span v-if="error" class="base-input__error">{{ error }}</span>
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

<style scoped lang="scss">
  .base-input {
    display: flex;
    flex-direction: column;

    &__label {
      margin-bottom: 4px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: var(--color-neutral-600);
      display: flex;
      justify-content: flex-start;
      user-select: none;
    }

    &__required {
      color: var(--color-danger);
      margin-left: 2px;
    }

    &__field {
      font-family: "DM Sans", sans-serif;
      padding: 14px 16px;
      border-radius: 8px;
      background: var(--color-neutral-200);
      border: 1px solid transparent;
      font-size: 16px;
      outline: none;
      transition: border 0.2s ease;
      resize: none;
      color: var(--color-neutral-800);

      &:focus {
        border: 1px solid var(--color-primary1);
      }

      &--error {
        border: 1px solid var(--color-danger);
      }

      &::placeholder {
        color: var(--color-neutral-500);
      }
    }

    &__error {
      color: var(--color-danger);
      font-size: 12px;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      &__field {
        padding: 10px 16px;
      }
    }
  }

  .base-input__field::selection,
  textarea::selection {
    background-color: #b8b2ff;
  }
</style>
