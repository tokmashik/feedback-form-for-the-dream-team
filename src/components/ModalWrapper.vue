<template>
  <div class="modal">
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 1000;
  }

  .modal__content {
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
  }
</style>
