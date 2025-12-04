<template>
  <div class="feedback">
    <transition name="fade" v-if="isMobile">
      <div class="feedback__mobile" :key="step">
        <h1 class="feedback__title">Форма обратной связи</h1>

        <div v-if="step === 1" class="feedback__mobile-step">
          <BaseInput
            class="feedback__input"
            v-model="name"
            label="ФИО"
            placeholder="Иван Иванов"
            required
            :error="errors.name"
          />

          <BaseInput
            class="feedback__input"
            v-model="email"
            label="Почта"
            placeholder="Введите email"
            required
            :error="errors.email"
          />

          <BaseInput
            class="feedback__input"
            v-model="phone"
            type="phone"
            label="Номер телефона"
            placeholder="+7 (000) 000 00 00"
            required
            :error="errors.phone"
            @input="maskPhone"
          />

          <div class="feedback__mobile-actions">
            <BaseButton type="secondary"
                        @click="resetForm"
            >Отменить</BaseButton
            >
            <BaseButton type="primary" @click="nextStep">Далее</BaseButton>
          </div>
        </div>

        <div v-else-if="step === 2" class="feedback__mobile-step">
          <RatingStars v-model:rating="userRating" />

          <BaseSelect
            class="feedback__select"
            v-model="selectedOption"
            id="experience"
            label="Грейд"
            :options="selectOptions"
            :error="errors.selectedOption"
            required
          />

          <BaseInput
            class="feedback__textarea"
            v-model="additionalInfo"
            type="textarea"
            label="Дополнительная информация"
            placeholder="Что понравилось и не понравилось"
          />

          <div class="feedback__mobile-actions">
            <BaseButton type="secondary" @click="prevStep">Назад</BaseButton>
            <BaseButton type="primary"
                        @click="submitForm"
            >Отправить</BaseButton
            >
          </div>
        </div>

        <FormStepper
          class="feedback__stepper"
          :filledFields="filledFieldsCount"
          :totalFields="totalFields"
        />
      </div>
    </transition>

    <form v-else class="feedback__form" @submit.prevent="submitForm">
      <div class="feedback__header">
        <h1 class="feedback__title">Форма обратной связи</h1>

        <RatingStars
          class="feedback__rating"
          v-model:rating="userRating"
          v-model:adjectives="userAdjectives"
        />
      </div>

      <div class="feedback__row">
        <BaseInput
          class="feedback__input"
          v-model="name"
          label="ФИО"
          placeholder="Иван Иванов"
          required
          :error="errors.name"
        />

        <BaseInput
          class="feedback__input"
          v-model="email"
          label="Почта"
          placeholder="Введите email"
          required
          :error="errors.email"
        />
      </div>

      <div class="feedback__row">
        <BaseInput
          class="feedback__input"
          v-model="phone"
          type="phone"
          label="Номер телефона"
          placeholder="+7 (000) 000 00 00"
          required
          :error="errors.phone"
          @input="maskPhone"
        />

        <BaseSelect
          class="feedback__select"
          id="experience"
          label="Грейд"
          v-model="selectedOption"
          :options="selectOptions"
          required
          :error="errors.selectedOption"
        />
      </div>

      <BaseInput
        class="feedback__textarea"
        v-model="additionalInfo"
        type="textarea"
        label="Дополнительная информация"
        placeholder="Что понравилось и не понравилось"
      />


      <div class="feedback__actions">
        <BaseButton type="secondary" @click="resetForm">Отменить</BaseButton>
        <BaseButton type="primary" @click="submitForm">Отправить</BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useMediaQuery } from '@vueuse/core';

import FormStepper from './FormStepper.vue';
import BaseButton from './basic/Button.vue';
import RatingStars from './RatingStars.vue';
import BaseInput from './basic/Input.vue';
import BaseSelect from './basic/Select.vue';

const emit = defineEmits(['submit', 'close']);
const isMobile = useMediaQuery('(max-width: 768px)');
const step = ref(1);

const name = ref('');
const email = ref('');
const phone = ref('');
const selectedOption = ref('');
const additionalInfo = ref('');
const userRating = ref(0);
const userAdjectives = ref([]);

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  selectedOption: '',
});

const totalFields = 4;

const filledFieldsCount = computed(() => {
  return [name.value, email.value, phone.value, userRating.value].filter(
    Boolean,
  ).length;
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isFullNameValid = (fullName) => {
  const parts = fullName.trim().split(/\s+/);
  return (
    parts.length === 3 &&
      parts.every((w) => /^[A-Za-zА-Яа-яЁё-]{2,}$/.test(w))
  );
};

const validateForm = () => {
  errors.name = name.value
    ? isFullNameValid(name.value)
      ? ''
      : 'ФИО должно состоять из трёх слов'
    : 'ФИО обязательно';
  errors.email = email.value
    ? isValidEmail(email.value)
      ? ''
      : 'Неверный email'
    : 'Email обязателен';
  errors.phone = phone.value ? '' : 'Телефон обязателен';
  errors.selectedOption = selectedOption.value ? '' : 'Выберите грейд';

  return Object.values(errors).every((v) => !v);
};

const maskPhone = () => {
  const digits = phone.value.replace(/\D/g, '').slice(0, 11);

  if (!digits) {
    phone.value = '+7 (';
    return;
  }

  phone.value =
      '+7 (' +
      digits.slice(1, 4) +
      ') ' +
      digits.slice(4, 7) +
      ' ' +
      digits.slice(7, 9) +
      ' ' +
      digits.slice(9, 11);
};

const nextStep = () => {
  // if (validateForm())
  step.value = 2;
};

const prevStep = () => {
  step.value = 1;
};

const submitForm = () => {
  // if (!validateForm()) return;

  console.log({
    name: name.value,
    email: email.value,
    phone: phone.value,
    selectedOption: selectedOption.value,
    additionalInfo: additionalInfo.value,
    rating: userRating.value,
    adjectives: userAdjectives.value,
  });
  emit('submit');
};

const resetForm = () => {
  if (isMobile.value && step.value === 2) {
    step.value = 1;
    return;
  }
  emit('close');
  step.value = 1;

  name.value =
      email.value =
      phone.value =
      selectedOption.value =
      additionalInfo.value =
        '';
  userRating.value = 0;
  userAdjectives.value = [];

  Object.keys(errors).forEach((k) => (errors[k] = ''));
};

const selectOptions = [
  { value: '', label: 'Выберите' },
  { value: 'junior', label: 'Junior' },
  { value: 'middle', label: 'Middle' },
  { value: 'senior', label: 'Senior' },
  { value: 'team_lead', label: 'Team Lead' },
];
</script>

<style lang="scss">
  .feedback {
    max-width: 800px;

    &__title {
      margin-bottom: 16px;
    }

    &__form,
    &__mobile {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__row {
      display: flex;
      gap: 24px;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
      }
    }

    &__input,
    &__select,
    &__textarea {
      flex: 1;
    }

    &__actions {
      display: flex;
      gap: 20px;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 8px;
        width: 100%;
      }

      @media (max-width: 480px) {
        flex-direction: column;
        width: 100%;
      }
    }
    &__mobile-actions {
      @media (max-width: 768px) {
        display: flex;

        gap: 8px;
      }
    }
    &__mobile-step {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__quick-answers {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    &__quick-answer {
      padding: 8px 14px;
      border-radius: 12px;
      border: 1px solid #ddd;
      background: #f6f6f6;
      cursor: pointer;
      font-size: 14px;

      &--active {
        background: #ffe08a;
        border-color: #f2b400;
      }
    }

    &__stepper {
      margin-top: auto;
    }
  }
</style>
