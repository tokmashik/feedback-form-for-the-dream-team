<template>
  <form class="error-form" @submit.prevent="submitForm">
    <div class="error-form__content">
      <div>
        <h2 class="error-form__title">Что-то пошло не так</h2>
        <div class="error-form__subtitle p-small">
          Попробуйте заполнить форму позже
        </div>
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
      <BaseButton type="secondary" @click="resetForm">Закрыть</BaseButton>
      <BaseButton type="primary"
                  @click="submitForm"
      >Попробовать снова</BaseButton
      >
    </div>
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
    gap: 95px;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 95px;
      text-align: center;
    }

    &__title {
      margin-top: 24px;
    }

    &__subtitle {
      font-size: 16px;
      font-weight: 400;
      color: var(--color-neutral-600);
    }

    &__icon {
      display: block;
    }

    &__actions {
      display: flex;
      width: 100%;
      gap: 28px;
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

      &__actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
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

      &__actions {
        flex-direction: column;
        gap: 16px;
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

      &__actions {
        flex-direction: column;
        gap: 12px;
        width: 100%;
      }
    }
  }
</style>
