<template>
  <div class="feedback">
    <dev name="fade" v-if="isMobile">
      <div class="feedback__mobile" :key="step">
        <h2 class="feedback__title">Форма обратной связи</h2>

        <div v-show="step === 1" class="feedback__mobile-step">
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
            @input="onPhoneInput($event.target.value)"
          />

          <div class="feedback__mobile-actions">
            <BaseButton type="secondary"
                        @click="resetForm"
            >Отменить</BaseButton
            >
            <BaseButton type="primary" @click="nextStep">Далее</BaseButton>
          </div>
        </div>

        <div v-show="step === 2" class="feedback__mobile-step">
          <RatingStars
            v-model:rating="userRating"
            v-model:adjectives="userAdjectives"
          />

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
    </dev>

    <form v-else class="feedback__form" @submit.prevent="submitForm">
      <div class="feedback__header">
        <h2 class="feedback__title">Форма обратной связи</h2>

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
          @input="onPhoneInput($event.target.value)"
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
import { ref, reactive, computed, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';

import FormStepper from './FormStepper.vue';
import BaseButton from './basic/Button.vue';
import RatingStars from './RatingStars.vue';
import BaseInput from './basic/Input.vue';
import BaseSelect from './basic/Select.vue';

import { maskPhone } from '@/utils/phoneMask';
import { isValidEmail, isFullNameValid, isValidPhone } from '@/utils/validation';
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

watch(name, (v) => {
  name.value = v
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ');
});

const onPhoneInput = (val) => {
  phone.value = maskPhone(val);
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
      : 'Неверная почта'
    : 'Почта обязательна';

  errors.phone = phone.value
    ? isValidPhone(phone.value)
      ? ''
      : 'Некорректный номер'
    : 'Телефон обязателен';

  return Object.values(errors).every((x) => !x);
};

const nextStep = () => {
  if (validateForm()) step.value = 2;
};

const prevStep = () => {
  step.value = 1;
};

const submitForm = () => {
  if (!validateForm()) return;

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

    &__form,
    &__mobile {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: 12px;
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

    &__stepper {
      margin-top: auto;
    }
  }
</style>
