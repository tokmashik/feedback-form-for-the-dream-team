<template>
  <div class="p-small">Пожалуйста, оцените свой опыт прохождения тестового</div>
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

    <div class="adjectives" v-if="currentAdjectives.length">
      <div
        v-for="item in currentAdjectives"
        :key="item.code"
        class="adjective"
        :class="{ selected: selectedAdjectives.includes(item.code) }"
        @click="toggleAdjective(item.code)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StarIcon from './StarIcon.vue'

const rating = ref(0)
const hoverRating = ref(0)
const selectedAdjectives = ref([])

const arrayOfPositiveAdjectives = [
  { code: 'interesting', text: 'Интересно' },
  { code: 'easy', text: 'Легко' },
  { code: 'fast_done', text: 'Быстро сделал' },
  { code: 'beautiful', text: 'Красиво' },
  { code: 'detailed', text: 'Подробно описано' },
  { code: 'clear_and_to_the_point', text: 'Все понятно и по делу' },
]

const arrayOfNegativeAdjectives = [
  { code: 'unclear', text: 'Не понятно' },
  { code: 'boring', text: 'Однообразно' },
  { code: 'dull', text: 'Скучно' },
  { code: 'inconvenient', text: 'Неудобно' },
  { code: 'nothing_understood', text: 'Ничего не понял' },
  { code: 'too_complex', text: 'Слишком сложно для тестового' },
]

const currentAdjectives = ref([])

const emit = defineEmits(['update:rating', 'update:adjectives'])

function setRating(value) {
  rating.value = value
  currentAdjectives.value = value <= 3 ? arrayOfNegativeAdjectives : arrayOfPositiveAdjectives
  selectedAdjectives.value = []
  emitData()
}

function toggleAdjective(code) {
  if (selectedAdjectives.value.includes(code)) {
    selectedAdjectives.value = selectedAdjectives.value.filter(c => c !== code)
  } else {
    selectedAdjectives.value.push(code)
  }
  emitData()
}

function emitData() {
  emit('update:rating', rating.value)
  emit('update:adjectives', selectedAdjectives.value)
}
</script>

<style scoped lang="scss">
.rating-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stars {
  display: flex;
  gap: 8px;
}

.adjectives {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.adjective {
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 78px;
  // height: 38px;
  border-radius: 100px;
  padding: 5px 16px;
  background: #eff0f6;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s, color 0.2s;
}

.adjective.selected {
  background: var(--color-neutral-600);
  color: white;
}
</style>
