<template>
  <div class="p-small">Пожалуйста, оцените свой опыт прохождения тестового</div>
  <div class="rating-wrapper">
    <div class="stars">
      <BasicIcon
        name="error"
        width="157"
        height="143"
        color="white"
      />
      <StarIcon
        v-for="index in 5"
        :key="index"
        :filled="index <= rating || index <= hoverRating"
        @mouseenter="hoverRating = index"
        @mouseleave="hoverRating = 0"
        @click="setRating(index)"
      />
      {{ currentAdjectives }}
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import StarIcon from './StarIcon.vue';

  const rating = ref(0); // выбранное количество звезд
  const hoverRating = ref(0); // подсветка при наведении
  const currentAdjectives = ref(0);
  const arrayOfPositiveAdjectives = [
  { code: 'interesting', text: 'Интересно' },
  { code: 'easy', text: 'Легко' },
  { code: 'fast_done', text: 'Быстро сделал' },
  { code: 'beautiful', text: 'Красиво' },
  { code: 'detailed', text: 'Подробно описано' },
  { code: 'clear_and_to_the_point', text: 'Все понятно и по делу' },
];

const arrayOfNegativeAdjectives = [
  { code: 'unclear', text: 'Не понятно' },
  { code: 'boring', text: 'Однообразно' },
  { code: 'dull', text: 'Скучно' },
  { code: 'inconvenient', text: 'Неудобно' },
  { code: 'nothing_understood', text: 'Ничего не понял' },
  { code: 'too_complex', text: 'Слишком сложно для тестового' },
];


  function setRating(value) {
  console.log('value', value);
  rating.value = value;

  if (value <= 3) {
    this.currentAdjectives = this.arrayOfNegativeAdjectives
  } else {
    this.currentAdjectives = this.arrayOfPositiveAdjectives
  }
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
