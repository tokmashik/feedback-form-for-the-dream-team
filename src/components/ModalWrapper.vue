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

<style lang="scss">
  .modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;

    @media (max-width: 320px) {
      // padding: 0px;
    }
    &__content {
      position: relative;
      width: 90%;
      max-width: 549px;
      background-color: var(--color-neutral-100);
      border-radius: 32px;
      padding: 44px;
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        padding: 24px 30px;
        border-radius: 24px;
      }

      @media (max-width: 480px) {
        padding: 18px 16px;
        border-radius: 16px;
      }
    }

    &__top-right {
      position: absolute;
      top: 10px;
      right: 20px;
      display: flex;
      align-items: center;

      @media (max-width: 768px) {
        top: 8px;
        gap: 0px;
      }

      @media (max-width: 480px) {
        top: 0px;
        right: 10px;
      }
    }

    &__close {
      width: 24px;
      height: 24px;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 480px) {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
