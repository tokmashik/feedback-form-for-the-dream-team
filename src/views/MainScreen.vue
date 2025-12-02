<template>
    <div id="app">
      <!-- Первая форма сразу открыта -->
      <ModalWrapper v-if="isFeedbackOpen">
        <FeedbackForm @submit="submitFeedback" />
      </ModalWrapper>
  
      <!-- Форма успешного заполнения -->
      <ModalWrapper v-if="isSuccessOpen">
        <SuccessForm @close="closeSuccess" />
      </ModalWrapper>
  
      <!-- Кнопка для повторного открытия формы (не обязательно) -->
      <Button @click="openFeedback">Оставить отзыв снова</Button>
    </div>
  </template>
  
  <script setup>
import ModalWrapper from '@/components/ModalWrapper.vue';
import FeedbackForm from '@/components/StepOne.vue';
import SuccessForm from '@/components/SuccessScreen.vue';
// import Button from '@/components/basic/Button.vue'; // если у тебя кнопка в basic

  import { useModal } from '@/composables/useModal';
//   import ModalWrapper from './components/ModalWrapper.vue';
//   import FeedbackForm from './components/form/FeedbackForm.vue';
//   import FeedbackForm from '@/components/StepOne.vue';
//   import SuccessForm from './components/form/SuccessForm.vue';
    // import ErrorScreen from './components/ErrorScreen.vue';
//   import SuccessForm from '@x/components/SuccessScreen.vue';
//   import Button from './components/ui/Button.vue';
  
  const {
    isFeedbackOpen,
    isSuccessOpen,
    openFeedback,
    closeSuccess,
    submitFeedback
  } = useModal();
  </script>
  