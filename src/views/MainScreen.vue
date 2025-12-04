<template>
  <div class="main-screen">
    <BaseButton type="secondary" @click="openFeedback">
      Оставить отзыв
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/components/basic/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const openFeedback = () => router.push('/feedback');
</script>
