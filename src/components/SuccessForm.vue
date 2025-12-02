<template>
  <form class="form" @submit.prevent="submitForm">
    <div>
      <h2>Спасибо, ваш ответ отправлен</h2>
      <div class="p-small">Свяжемся с вами в ближайшее время</div>

      <BasicIcon
        name="success"
        width="157"
        height="143"
        color="var(--color-neutral-100)"
      />
    </div>
    <BaseButton type="primary" @click="submitForm">На главную</BaseButton>
  </form>
</template>

<script setup>
  import BasicIcon from './basic/BasicIcon.vue';
  import BaseButton from './basic/Button.vue';

  const emit = defineEmits(['close']);

  const submitForm = () => {
    console.log('Форма успеха закрыта');
    emit('close');
  };
</script>
