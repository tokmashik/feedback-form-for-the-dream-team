<template>
  <div class="stepper">
    <div class="stepper__steps">
      <div
        class="stepper__step"
        :class="{ 'stepper__step--active': step >= 1 }"
      >
        1
      </div>

      <div class="stepper__line">
        <div
          class="stepper__line-progress"
          :style="{ width: lineWidth + '%' }"
        ></div>
      </div>

      <div
        class="stepper__step"
        :class="{ 'stepper__step--active': step >= 2 }"
      >
        2
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, watch, ref } from 'vue';

  const props = defineProps({
    filledFields: { type: Number, required: true },
    totalFields: { type: Number, default: 4 },
  });

  const step = ref(1);

  // Прогресс линии
  const lineWidth = computed(() =>
    Math.min((props.filledFields / props.totalFields) * 100, 100),
  );

  // Обновляем активный шаг
  watch(
    () => props.filledFields,
    (val) => {
      step.value = val >= props.totalFields ? 2 : 1;
    },
    { immediate: true },
  );
</script>

<style scoped lang="scss">
  .stepper {
    margin-bottom: 24px;

    &__steps {
      display: flex;
      align-items: center;
      position: relative;
    }

    &__step {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--color-neutral-400);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      z-index: 2;
      transition: background 0.3s ease;

      &--active {
        background: var(--color-neutral-600);
      }
    }

    &__line {
      flex-grow: 1;
      height: 4px;
      background: var(--color-neutral-300);
      margin: 0 12px;
      border-radius: 2px;
      position: relative;
      overflow: hidden;

      &-progress {
        height: 100%;
        background: var(--color-neutral-600);
        transition: width 0.3s ease;
      }
    }
  }
</style>
