<template>
  <form class="form" @submit.prevent="submitForm">
    <div>
      <h2>Что-то пошло не так</h2>
      <div class="p-small">Попробуйте заполнить форму позже</div>

      <BasicIcon name="error" width="157" height="143" color="white" />
    </div>
    <div style="gap: 28px; display: flex">
      <BaseButton type="secondary" @click="resetForm">Закрыть</BaseButton>
      <BaseButton type="primary" @click="submitForm"
        >Попробовать снова</BaseButton
      >
    </div>
    Обратиться в тех поддержку
  </form>
</template>

<script setup>
  import BasicIcon from './basic/BasicIcon.vue';
  import BaseButton from './basic/Button.vue';

  const submitForm = () => {
    console.log('Форма отправлена');
  };
</script>