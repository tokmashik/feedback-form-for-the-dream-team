<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__top-right">
        <ThemeSwitch />
        <button class="modal__close" @click="$emit('close')">
          <BasicIcon name="close" width="16" height="16" />
        </button>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import BasicIcon from './basic/BasicIcon.vue';
  import ThemeSwitch from './ThemeSwitch.vue';
</script>

<style scoped>
  .modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal__content {
    position: relative;
    width: 90%;
    max-width: 549px;
    background-color: var(--color-neutral-100);
    border-radius: 32px;
    padding: 44px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .modal__top-right {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
  }

  .modal__close {
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .modal__content {
      padding: 24px;
      border-radius: 24px;
    }
  }

  @media (max-width: 480px) {
    .modal__content {
      padding: 20px;
      border-radius: 16px;
    }

    .modal__top-right {
      top: 14px;
      right: 14px;
      gap: 8px;
    }

    .modal__close {
      width: 20px;
      height: 20px;
    }
  }
</style>
