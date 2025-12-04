<template>
  <div id="app">
    <router-view />

    <ModalWrapper @close="closeModal" v-if="currentRoute === '/feedback'">
      <FeedbackForm @submit="goRandom" @close="closeModal" />
    </ModalWrapper>

    <ModalWrapper @close="closeModal" v-if="currentRoute === '/success'">
      <SuccessForm @close="closeModal" />
    </ModalWrapper>

    <ModalWrapper @close="closeModal" v-if="currentRoute === '/error'">
      <ErrorScreen @close="closeModal" @submit="goRandom" />
    </ModalWrapper>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import ModalWrapper from '@/components/ModalWrapper.vue';
  import FeedbackForm from '@/components/FeedbackForm.vue';
  import SuccessForm from '@/components/SuccessForm.vue';
  import ErrorScreen from '@/components/ErrorScreen.vue';

  const route = useRoute();
  const router = useRouter();

  const currentRoute = computed(() => route.path);

  const closeModal = () => router.push('/');

  // Так как нам нужно отобразить 2 вида формы, то рандомно просто показываем одну из них
  const goRandom = () => {
    const isSuccess = Math.random() > 0.5;
    router.push(isSuccess ? '/success' : '/error');
  };
</script>
