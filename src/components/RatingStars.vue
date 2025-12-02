<template>
  <div style="gap: 20px">
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

    <Transition name="fade-block" mode="out-in">
      <div
        v-if="currentAdjectives.length"
        :key="ratingGroupKey"
        class="adjectives"
      >
        <div
          v-for="item in currentAdjectives"
          :key="item.code"
          class="adjective"
          :class="{ selected: selectedAdjectives.includes(item.code) }"
          @click="toggleAdjective(item.code)"
        >
          <div class="p-base">{{ item.text }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import StarIcon from './StarIcon.vue';

  const rating = ref(0);
  const hoverRating = ref(0);
  const selectedAdjectives = ref([]);

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

  const currentAdjectives = ref([]);

  const currentGroup = ref(null);

  const ratingGroupKey = computed(() =>
    rating.value <= 2 ? 'negative' : 'positive',
  );

  const emit = defineEmits(['update:rating', 'update:adjectives']);

  function setRating(value) {
    rating.value = value;

    const newGroup = value <= 2 ? 'negative' : 'positive';

    if (newGroup !== currentGroup.value) {
      currentGroup.value = newGroup;

      currentAdjectives.value =
        newGroup === 'negative'
          ? arrayOfNegativeAdjectives
          : arrayOfPositiveAdjectives;

      selectedAdjectives.value = []; // решила добавить сброс выбранных только при смене группы
    }

    emitData();
  }

  function toggleAdjective(code) {
    if (selectedAdjectives.value.includes(code)) {
      selectedAdjectives.value = selectedAdjectives.value.filter(
        (c) => c !== code,
      );
    } else {
      selectedAdjectives.value.push(code);
    }
    emitData();
  }

  function emitData() {
    emit('update:rating', rating.value);
    emit('update:adjectives', selectedAdjectives.value);
  }
</script>

<style scoped lang="scss">
  .rating-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin: 20px 0 36px 0;
  }

  .stars {
    display: flex;
    gap: 22px;
  }

  .adjectives {
    display: flex;
    flex-wrap: wrap;
    max-width: 550px;
    gap: 16px;
  }

  .adjective {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    padding: 5px 16px;
    background: var(--color-neutral-300);
    cursor: pointer;
    user-select: none;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .adjective.selected {
    background: var(--color-neutral-600);
  }

  .adjective.selected .p-base {
    color: #fff;
    font-weight: 400;
    line-height: 28px;
  }

  /* Плавное исчезновение и появление всего блока, потому что иначе слишком резкое появление */
  .fade-block-enter-active,
  .fade-block-leave-active {
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  .fade-block-enter-from,
  .fade-block-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
