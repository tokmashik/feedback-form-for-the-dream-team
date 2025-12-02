<template>
  <div class="p-small">
    Пожалуйста, оцените свой опыт прохождения тестового
  </div>
  <div class="rating-wrapper">
    <div class="stars">
      <StarIcon
        v-for="index in 5"
        :key="index"
        :filled="index <= rating || index <= hoverRating"
        @mouseenter="hoverRating = index"
        @mouseleave="hoverRating = 0"
        @click="setRating(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StarIcon from './StarIcon.vue';

const rating = ref(0);          // выбранное количество звезд
const hoverRating = ref(0);     // подсветка при наведении

function setRating(value) {
  rating.value = value;
}
</script>

<style scoped lang="scss">
.rating-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stars {
  display: flex;
  gap: 4px;
}
</style>
