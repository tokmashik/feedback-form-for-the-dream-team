<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    max-width: 500px;
    width: 100%;
    background-color: var(--color-neutral-100);
    border-radius: 32px;
    padding: 44px;
  }
</style>
