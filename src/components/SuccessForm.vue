<template>
  <form class="success-form" @submit.prevent="submitForm">
    <div class="success-form__content">
      <div>
        <h2 class="success-form__title">Спасибо, ваш ответ отправлен</h2>
        <div class="success-form__subtitle">
          Свяжемся с вами в ближайшее время
        </div>
      </div>

      <BasicIcon
        class="success-form__icon"
        name="success"
        width="157"
        height="143"
        color="var(--color-neutral-100)"
      />
    </div>

    <BaseButton class="success-form__button" type="primary" @click="submitForm">
      На главную
    </BaseButton>
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

<style lang="scss">
  .success-form {
    display: flex;
    flex-direction: column;
    gap: 95px;
    align-items: center;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 95px;
    }

    &__title {
      font-size: 32px;
      font-weight: 700;
      color: var(--color-neutral-800);
      text-align: center;
      margin: 0 0 8px 0;
    }

    &__subtitle {
      font-size: 16px;
      font-weight: 400;
      color: var(--color-neutral-600);
      text-align: center;
    }

    &__icon {
      display: block;
    }

    &__button {
      align-self: center;
      width: 200px;
    }

    @media (max-width: 480px) {
      gap: 20px;

      &__content {
        gap: 20px;
      }

      &__title {
        font-size: 24px;
      }

      &__subtitle {
        font-size: 14px;
      }

      &__icon {
        width: 120px !important;
        height: 110px !important;
      }

      &__button {
        width: 100%;
        max-width: 260px;
      }
    }
  }
</style>
