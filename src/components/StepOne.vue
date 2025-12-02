<template>
  <form class="form" @submit.prevent="submitForm">
    <div>
      <h2>Форма обратной связи</h2>
      <RatingStars
        v-model:rating="userRating"
        v-model:adjectives="userAdjectives"
      />
    </div>

    <div style="gap: 28px; display: flex; margin-top: 36px">
      <BaseInput
        v-model="name"
        label="ФИО"
        placeholder="Иван Иванов"
        required
        :error="errors.name"
      />
      <BaseInput
        v-model="email"
        label="Почта"
        placeholder="Введите email"
        required
        :error="errors.email"
      />
    </div>

    <div style="gap: 28px; display: flex; margin-top: 28px">
      <BaseInput
        v-model="phone"
        type="phone"
        label="Номер телефона"
        placeholder="+7 (000) 000 00 00"
        required
        :error="errors.phone"
      />
      <BaseSelect
        id="experience"
        label="Грейд"
        v-model="selectedOption"
        :options="selectOptions"
        required
        :error="errors.selectedOption"
      />
    </div>

    <BaseInput
      v-model="additionalInfo"
      type="textarea"
      label="Дополнительная информация"
      placeholder="Что понравилось и не понравилось"
    />

    <div style="gap: 28px; display: flex; margin-top: 36px">
      <BaseButton type="secondary" @click="resetForm">Отменить</BaseButton>
      <BaseButton type="primary" @click="submitForm"> Отправить </BaseButton>
    </div>
  </form>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue';
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

  const errors = reactive({
    name: '',
    email: '',
    phone: '',
    selectedOption: '',
  });

  // Функция проверки email
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Проверка формы
  const validateForm = () => {
    errors.name = name.value.trim() ? '' : 'ФИО обязательно';
    errors.email = email.value.trim()
      ? isValidEmail(email.value)
        ? ''
        : 'Неверный формат email'
      : 'Email обязателен';
    errors.phone = phone.value.trim() ? '' : 'Телефон обязателен';
    errors.selectedOption = selectedOption.value ? '' : 'Выберите грейд';

    return !Object.values(errors).some(Boolean);
  };

  // Отправка формы
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

  // Сброс формы
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

  // // Кнопка отправки отключена, если есть пустые поля
  // const isSubmitDisabled = computed(
  //   () => !name.value || !email.value || !phone.value || !selectedOption.value,
  // );

  const selectOptions = [
    { value: '', label: 'Выберите' },
    { value: 'junior', label: 'Junior' },
    { value: 'middle', label: 'Middle' },
    { value: 'senior', label: 'Senior' },
    { value: 'team_lead', label: 'Team Lead' },
  ];
</script>

<!-- <style lang="scss">
  .form {
    background-color: var(--color-neutral-100);
    gap: 36px;
    border-radius: 32px;
    padding: 44px;
  }
</style> -->
