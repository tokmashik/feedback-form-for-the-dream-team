<template>
  <div class="rating-stars">
    <div class="rating-stars__label p-small">
      Пожалуйста, оцените свой опыт прохождения тестового
    </div>

    <div class="rating-stars__wrapper">
      <div class="rating-stars__stars">
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
        class="rating-stars__adjectives"
      >
        <div
          v-for="item in currentAdjectives"
          :key="item.code"
          class="rating-stars__adjective"
          :class="{
            'rating-stars__adjective--selected': selectedAdjectives.includes(
              item.code,
            ),
            'rating-stars__adjective--not-selected':
              !selectedAdjectives.includes(item.code),
          }"
          @click="toggleAdjective(item.code)"
        >
          <div class="rating-stars__adjective-text p-base">{{ item.text }}</div>
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

    selectedAdjectives.value = []; // сброс выбранных при смене группы
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

<style lang="scss">
  .rating-stars {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__label {
      font-size: 14px;
      color: var(--color-neutral-600);

      @media (max-width: 480px) {
        font-size: 13px;
        line-height: 18px;
      }
    }

    &__wrapper {
      display: flex;
      justify-content: center;
      margin: 10px 0 26px 0;

      @media (max-width: 480px) {
        margin: 6px 0 18px 0;
      }
    }

    &__stars {
      display: flex;
      gap: 22px;

      @media (max-width: 768px) {
        gap: 14px;
      }

      @media (max-width: 480px) {
        gap: 10px;
      }

      @media (max-width: 360px) {
        gap: 8px;
      }
    }

    &__adjectives {
      display: flex;
      flex-wrap: wrap;
      max-width: 550px;
      gap: 16px;

      @media (max-width: 768px) {
        gap: 12px;
      }

      @media (max-width: 480px) {
        gap: 10px;
      }
    }

    &__adjective {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      padding: 5px 16px;
      cursor: pointer;
      user-select: none;
      transition:
        background 0.2s,
        color 0.2s;

      @media (max-width: 768px) {
        padding: 4px 14px;
      }

      @media (max-width: 480px) {
        padding: 4px 10px;
      }

      &--selected {
        background: var(--color-neutral-600);

        .rating-stars__adjective-text {
          color: var(--color-neutral-100);
        }
      }

      &--not-selected {
        background: var(--color-neutral-300);

        .rating-stars__adjective-text {
          color: var(--color-neutral-800);
        }
      }
    }

    &__adjective-text {
      font-weight: 400;
      line-height: 28px;
      font-size: 16px;

      @media (max-width: 768px) {
        font-size: 15px;
        line-height: 24px;
      }

      @media (max-width: 480px) {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

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
