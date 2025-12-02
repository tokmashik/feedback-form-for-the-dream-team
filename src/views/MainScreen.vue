<template>
  <div id="app">
    <ModalWrapper v-if="isFeedbackOpen">
      <FeedbackForm @submit="submitFeedback" />
    </ModalWrapper>
    <ModalWrapper v-if="isSuccessOpen">
      <SuccessForm @close="closeSuccess" />
    </ModalWrapper>

    <BaseButton type="secondary" @click="openFeedback"
      >Оставить отзыв снова</BaseButton
    >
  </div>
</template>

<script setup>
  import ModalWrapper from '@/components/ModalWrapper.vue';
  import FeedbackForm from '@/components/StepOne.vue';
  import SuccessForm from '@/components/SuccessScreen.vue';
  import BaseButton from '@/components/basic/Button.vue';

  import { useModal } from '@/composables/useModal';
  // import ErrorScreen from './components/ErrorScreen.vue';

  const {
    isFeedbackOpen,
    isSuccessOpen,
    openFeedback,
    closeSuccess,
    submitFeedback,
  } = useModal();
</script>
