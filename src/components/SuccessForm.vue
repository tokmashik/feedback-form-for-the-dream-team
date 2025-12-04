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
  console.log('Форма успешно отправлена');
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
      margin-top: 24px;
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
    @media (max-width: 768px) {
      gap: 50px;

      &__content {
        gap: 50px;
      }

      &__title {
        font-size: 28px;
      }

      &__subtitle {
        font-size: 15px;
      }

      &__icon {
        width: 140px;
        height: 125px;
      }

      &__button {
        width: 180px;
      }
    }

    @media (max-width: 480px) {
      gap: 30px;

      &__content {
        gap: 30px;
      }

      &__title {
        font-size: 24px;
      }

      &__subtitle {
        font-size: 14px;
      }

      &__icon {
        width: 120px;
        height: 110px;
      }

      &__button {
        width: 100%;
        max-width: 260px;
      }
    }

    @media (max-width: 320px) {
      gap: 20px;

      &__content {
        gap: 20px;
      }

      &__title {
        font-size: 18px;
      }

      &__subtitle {
        font-size: 12px;
      }

      &__icon {
        width: 100px;
        height: 90px;
      }

      &__button {
        width: 100%;
        max-width: 220px;
        font-size: 14px;
        padding: 10px 16px;
      }
    }
  }
</style>
