<template>
  <div class="modal">
    <div class="modal__content">
      <button class="modal__close" @click="$emit('close')">
        <!-- <img src="@/assets/svg/close.svg" alt="close" /> -->
        <BasicIcon name="close" width="16" height="16" />
      </button>

      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import BasicIcon from './basic/BasicIcon.vue';
</script>

<style scoped>
  .modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    /* z-index: 1000; */
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

  /* Кнопка-крестик */
  .modal__close {
    position: absolute;
    top: 20px;
    right: 20px;

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

  .modal__close img {
    width: 100%;
    height: 100%;
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

    .modal__close {
      top: 14px;
      right: 14px;
      width: 20px;
      height: 20px;
    }
  }
</style>
