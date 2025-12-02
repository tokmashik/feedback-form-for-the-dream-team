<template>
  <form class="form" @submit.prevent="submitForm">
    <div>
      <h2>Спасибо, ваш ответ отправлен</h2>
      <div class="p-small">Свяжемся с вами в ближайшее время</div>

      <BasicIcon name="success" width="157" height="143" color="#fff" />
    </div>
  </form>
</template>

<script setup>
  import BasicIcon from './basic/BasicIcon.vue';

  const submitForm = () => {
    console.log('Форма отправлена');
  };
</script>
<style lang="scss">
  .form {
    background-color: #fff;
    gap: 40px;
    border-radius: 32px;
    padding: 44px;
  }
</style>
