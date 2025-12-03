<template>
  <div class="feedback-form-container">
    <form class="feedback-form" @submit.prevent="submitForm">
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
      <FormStepper
        :filledFields="filledFieldsCount"
        :totalFields="totalFields"
      />
    </form>
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue';
  import FormStepper from './FormStepper.vue';
  import BaseButton from './basic/Button.vue';
  import RatingStars from './RatingStars.vue';
  import BaseInput from './basic/Input.vue';
  import BaseSelect from './basic/Select.vue';

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

    if (parts.length !== 3) return false;

    return parts.every((word) => /^[A-Za-zА-Яа-яЁё-]{2,}$/.test(word));
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

    alert('Форма успешно отправлена!');
  };

  const resetForm = () => {
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

<style scoped lang="scss">
  .feedback-form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 800px;
    margin: 0 auto;

    &__header {
      gap: 16px;
    }

    &__rating {
      align-self: flex-start;
    }

    &__row {
      display: flex;
      gap: 28px;
      max-width: 549px;

      @media (max-width: 768px) {
        flex-direction: column;
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
    }

    &__button {
      min-width: 120px;
    }
  }
</style>
