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
        background-color: var(--color-primary1-disabled);
      }
    }

    &.secondary {
      background-color: var(--color-neutral-100);
      color: var(--color-primary1);
      border: 1px solid var(--color-primary1);

      &:hover:not(:disabled) {
        background-color: var(--color-primary1-hover-disabled);
      }
    }

    &:disabled {
      background-color: var(--color-primary1-light);
      cursor: not-allowed;
    }
  }
</style>
