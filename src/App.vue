<template>
  <div id="app">
    <!-- Главная страница -->
    <router-view />

    <!-- Модалки поверх всего -->
    <ModalWrapper v-if="currentRoute === '/feedback'">
      <FeedbackForm @submit="goSuccess" @close="goHome" />
    </ModalWrapper>

    <ModalWrapper v-if="currentRoute === '/success'">
      <SuccessForm @close="goHome" />
    </ModalWrapper>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import ModalWrapper from '@/components/ModalWrapper.vue';
  import FeedbackForm from '@/components/FeedbackForm.vue';
  import SuccessForm from '@/components/SuccessForm.vue';

  const route = useRoute();
  const router = useRouter();

  const currentRoute = computed(() => route.path);

  // Навигация
  const goHome = () => router.push('/');
  const goSuccess = () => router.push('/success');
</script>
