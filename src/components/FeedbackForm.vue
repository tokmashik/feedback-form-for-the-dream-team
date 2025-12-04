<template>
  <div class="feedback-wrapper">
    <transition name="fade" v-if="isMobile">
      <div>
        <h2>Форма обратной связи</h2>
        <div v-if="step === 1" key="step1" class="feedback-mobile-step">
          <BaseInput
            class="feedback-form__input"
            v-model="name"
            label="ФИО"
            placeholder="Иван Иванов"
            required
            :error="errors.name"
          />
          <BaseInput
            class="feedback-form__input"
            v-model="email"
            label="Почта"
            placeholder="Введите email"
            required
            :error="errors.email"
          />
          <BaseInput
            class="feedback-form__input"
            v-model="phone"
            type="phone"
            label="Номер телефона"
            placeholder="+7 (000) 000 00 00"
            required
            :error="errors.phone"
            @input="maskPhone"
          />

          <div class="actions">
            <BaseButton type="secondary" @click="resetForm">
              Отменить
            </BaseButton>
            <BaseButton type="primary" @click="nextStep"> Далее </BaseButton>
          </div>
        </div>

        <div v-else-if="step === 2" key="step2" class="feedback-mobile-step">
          <RatingStars v-model:rating="userRating" />

          <BaseSelect
            class="feedback-form__select"
            v-model="selectedOption"
            id="experience"
            label="Грейд"
            :options="selectOptions"
            :error="errors.selectedOption"
            required
          />

          <BaseInput
            class="feedback-form__textarea"
            v-model="additionalInfo"
            type="textarea"
            label="Дополнительная информация"
            placeholder="Что понравилось и не понравилось"
          />

          <div class="actions">
            <BaseButton type="secondary" @click="prevStep">Назад</BaseButton>
            <BaseButton type="primary" @click="submitForm"
              >Отправить</BaseButton
            >
          </div>
        </div>

        <div>
          <FormStepper
            :filledFields="filledFieldsCount"
            :totalFields="totalFields"
          />
        </div>
      </div>
    </transition>

    <form v-else class="feedback-form" @submit.prevent="submitForm">
      <div class="feedback-form__header">
        <h2 class="feedback-form__title">Форма обратной связи</h2>
        <RatingStars
          class="feedback-form__rating"
          v-model:rating="userRating"
          v-model:adjectives="userAdjectives"
        />
      </div>

      <div class="feedback-form__row">
        <BaseInput
          class="feedback-form__input"
          v-model="name"
          label="ФИО"
          placeholder="Иван Иванов"
          required
          :error="errors.name"
        />
        <BaseInput
          class="feedback-form__input"
          v-model="email"
          label="Почта"
          placeholder="Введите email"
          required
          :error="errors.email"
        />
      </div>

      <div class="feedback-form__row">
        <BaseInput
          class="feedback-form__input"
          v-model="phone"
          type="phone"
          label="Номер телефона"
          placeholder="+7 (000) 000 00 00"
          required
          :error="errors.phone"
        />
        <BaseSelect
          class="feedback-form__select"
          id="experience"
          label="Грейд"
          v-model="selectedOption"
          :options="selectOptions"
          required
          :error="errors.selectedOption"
        />
      </div>

      <BaseInput
        class="feedback-form__textarea"
        v-model="additionalInfo"
        type="textarea"
        label="Дополнительная информация"
        placeholder="Что понравилось и не понравилось"
      />

      <div class="feedback-form__actions">
        <BaseButton
          class="feedback-form__button"
          type="secondary"
          @click="resetForm"
        >
          Отменить
        </BaseButton>
        <BaseButton
          class="feedback-form__button"
          type="primary"
          @click="submitForm"
        >
          Отправить
        </BaseButton>
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

  const isMobile = useMediaQuery('(max-width: 768px)');
  const step = ref(1);
  const emit = defineEmits(['submit', 'close']);

  const name = ref('');
  const email = ref('');
  const phone = ref('');
  const selectedOption = ref('');
  const additionalInfo = ref('');
  const userRating = ref(0);
  const userAdjectives = ref([]);

  const totalFields = 4;

  const filledFieldsCount = computed(() => {
    let count = 0;
    if (name.value) count++;
    if (email.value) count++;
    if (phone.value) count++;
    if (selectedOption.value) count++;
    return count;
  });

  const errors = reactive({
    name: '',
    email: '',
    phone: '',
    selectedOption: '',
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
    errors.name = name.value.trim()
      ? isFullNameValid(name.value)
        ? ''
        : 'ФИО должно состоять из 3 слов'
      : 'ФИО обязательно';

    errors.email = email.value.trim()
      ? isValidEmail(email.value)
        ? ''
        : 'Неверный формат email'
      : 'Email обязателен';

    errors.phone = phone.value.trim() ? '' : 'Телефон обязателен';
    errors.selectedOption = selectedOption.value ? '' : 'Выберите грейд';

    return !Object.values(errors).some(Boolean);
  };

  const maskPhone = () => {
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    if (!digits) return;

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
    if (isMobile & (step.value === 2)) {
      step.value = 1;
    } else emit('close');
    name.value = '';
    email.value = '';
    phone.value = '';
    selectedOption.value = '';
    additionalInfo.value = '';
    userRating.value = 0;
    userAdjectives.value = [];
    Object.keys(errors).forEach((key) => (errors[key] = ''));
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
  .feedback-form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 800px;
    margin: 0 auto;

    &__header {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__row {
      display: flex;
      gap: 28px;
      max-width: 549px;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        max-width: 100%;
      }
    }

    &__input,
    &__select,
    &__textarea {
      flex: 1;
    }

    &__actions {
      display: flex;
      gap: 28px;

      @media (max-width: 768px) {
        justify-content: center;
        gap: 8px;
        width: 100%;
      }

      @media (max-width: 480px) {
        flex-direction: column;
        gap: 16px;
      }
    }

    &__button {
      min-width: 120px;

      @media (max-width: 480px) {
        width: 100%;
      }
    }

    &__stepper {
      display: none;

      @media (max-width: 480px) {
        display: block;
      }
    }
  }

  .feedback-form-container {
    @media (max-width: 768px) {
      padding: 16px;
    }
  }

  .feedback-mobile-step {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .actions {
    display: flex;
    gap: 16px;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .quick-answers {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .quick-answer {
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid #ddd;
    background: #f5f5f5;
    cursor: pointer;

    &.active {
      background: #ffd966;
      border-color: #ffaa00;
    }
  }
</style>
