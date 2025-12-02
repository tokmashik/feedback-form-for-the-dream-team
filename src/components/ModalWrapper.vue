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
    /* background-color: rgba(0,0,0,0.5); */
    display: flex;
    align-items: center;
    justify-content: center;
    /* z-index: 1000; */
  }
  
  .modal-content {
    max-width: 500px;
    width: 100%;
    background-color: var(--color-neutral-100);
    /* gap: 40px; */
    border-radius: 32px;
    padding: 44px;
  }
  </style>
  