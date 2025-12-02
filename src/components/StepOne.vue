<template>
  <form class="form" @submit.prevent="submitForm">
    <div>
      <h2>Форма обратной связи</h2>
      <RatingStars
        v-model:rating="userRating"
        v-model:adjectives="userAdjectives"
      />
    </div>
    <div style="gap: 28px; display: flex">
      <BaseInput v-model="name" label="ФИО" placeholder="Иван Иванов" />
      <BaseInput
        v-model="email"
        type="email"
        label="Почта"
        placeholder="Введите email"
      />
    </div>
    <div style="gap: 28px; display: flex">
      <BaseInput
        v-model="phone"
        type="phone"
        label="Номер телефона"
        placeholder="+7 (000) 000 00 00"
      />
      <BaseSelect
        id="experience"
        label="Грейд"
        v-model="selectedOption"
        :options="selectOptions"
      />
    </div>
    <BaseInput
      v-model="phone"
      type="textaria"
      label="Дополнительная информация"
      placeholder="Что понравилось и не понравилось"
    />
    <div style="gap: 28px; display: flex">
      <BaseButton type="secondary" @click="resetForm">Отменить</BaseButton>
      <BaseButton type="primary" @click="submitForm">Отправить</BaseButton>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import BaseButton from './basic/Button.vue';
  import RatingStars from './RatingStars.vue';
  import BaseInput from './basic/Input.vue';
  import BaseSelect from './basic/Select.vue';
  // import { useRouter } from 'vue-router'

  const name = ref('');
  const email = ref('');
  const selectedOption = ref('');
  const userRating = ref(0);
  const userAdjectives = ref([]);

  // const router = useRouter()
  const submitForm = () => {
    // alert(`Имя: ${name.value}, Email: ${email.value}`)
    // router.push({ name: 'ThankYou' }) // или path: '/thank-you'
  };

  const selectOptions = [
    { value: '', label: 'Выберите' },
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
  ];

  const resetForm = () => {
    name.value = '';
    email.value = '';
  };
</script>

<style lang="scss">
  .form {
    background-color: var(--color-neutral-100);
    gap: 36px;
    // display: flex;
    // justify-content: center;
    border-radius: 32px;
    padding: 44px;
  }
</style>
