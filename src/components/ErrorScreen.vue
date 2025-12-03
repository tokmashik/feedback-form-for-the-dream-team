<template>
  <form class="error-form" @submit.prevent="submitForm">
    <div class="error-form__content">
      <h2 class="error-form__title">Что-то пошло не так</h2>
      <div class="error-form__subtitle p-small">
        Попробуйте заполнить форму позже
      </div>

      <BasicIcon
        class="error-form__icon"
        name="error"
        width="157"
        height="143"
        color="white"
      />
    </div>

    <div class="error-form__actions">
      <BaseButton type="secondary" @click="resetForm"> Закрыть </BaseButton>

      <BaseButton type="primary" @click="submitForm">
        Попробовать снова
      </BaseButton>
    </div>

    <a class="error-form__support p-small-link" type="button">
      Обратиться в тех поддержку
    </a>
  </form>
</template>

<script setup>
  import BasicIcon from './basic/BasicIcon.vue';
  import BaseButton from './basic/Button.vue';

  const emit = defineEmits(['submit', 'close']);

  const submitForm = () => {
    console.log('Усп, сломалось. Повторная отправка формы');
    emit('submit');
  };

  const resetForm = () => {
    emit('close');
  };
</script>

<style lang="scss">
  .error-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      text-align: center;
    }

    &__title {
      margin: 0;
    }

    &__icon {
      display: block;
    }

    &__actions {
      display: flex;
      gap: 28px;
    }

    &__support {
      background: none;
      border: none;
      cursor: pointer;
    }

    @media (max-width: 480px) {
      gap: 20px;

      &__content {
        gap: 20px;
      }

      &__actions {
        flex-direction: column;
        gap: 16px;
        width: 100%;
      }

      &__support {
        margin-top: 8px;
      }
    }
  }
</style>
