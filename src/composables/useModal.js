import { ref } from 'vue';

export function useModal() {
  const isFeedbackOpen = ref(true); // сразу открыта при загрузке
  const isSuccessOpen = ref(false);

  function openFeedback() {
    isFeedbackOpen.value = true;
  }

  function closeFeedback() {
    isFeedbackOpen.value = false;
  }

  function openSuccess() {
    isSuccessOpen.value = true;
  }

  function closeSuccess() {
    isSuccessOpen.value = false;
  }

  function submitFeedback() {
    closeFeedback();
    openSuccess();
  }

  return {
    isFeedbackOpen,
    isSuccessOpen,
    openFeedback,
    closeFeedback,
    openSuccess,
    closeSuccess,
    submitFeedback
  };
}
