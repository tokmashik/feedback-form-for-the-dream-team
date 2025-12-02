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
    type: { type: String, default: 'primary' }, // primary / secondary / custom
    disabled: { type: Boolean, default: false }
  })
  
  defineEmits(['click'])
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
    font-weight: 500;
    transition: all 0.2s;
  
    &.primary {
      background-color: var(--color-primary1);
      color: #fff;
  
      &:hover:not(:disabled) {
        background-color: #6153fd;
      }
    }
  
    &.secondary {
      background-color: #fff;
      color: #4A3AFF;
      border: 1px solid #4A3AFF;
  
      &:hover:not(:disabled) {
        background-color: #f3f2ff;
      }
    }
  
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
  </style>
  