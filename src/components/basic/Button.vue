<template>
  <button
    class="basic-button"
    :class="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot>Отправить</slot>
  </button>
</template>

<script setup>
  defineProps({
    type: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .basic-button {
    width: 260.5px;
    height: 56px;
    border-radius: 8px;
    padding: 14px 44px;
    gap: 12px;
    opacity: 1;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    transition: all 0.2s;

    &.primary {
      background-color: var(--color-primary1);
      color: var(--color-neutral-100);

      &:hover:not(:disabled) {
        background-color: #6153fd;
      }
    }

    &.secondary {
      background-color: var(--color-neutral-100);
      color: #4a3aff;
      border: 1px solid #4a3aff;

      &:hover:not(:disabled) {
        background-color: #f3f2ff;
      }
    }

    &:disabled {
      background-color: #d2ceff;
      cursor: not-allowed;
    }
  }
</style>
