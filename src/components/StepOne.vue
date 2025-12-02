<template>
  <form class="form" @submit.prevent="submitForm">
    <div>
      <h2>
        Форма обратной связи
      </h2>
    <RatingStars />
    </div>
    <div style="gap: 28px; display: flex;">
    <BaseInput v-model="name" label="Имя" placeholder="Введите имя" />
    <BaseInput v-model="email" type="email" label="Email" placeholder="Введите email" />
    </div>

    <BaseSelect
      id="experience"
      label="Опыт прохождения тестового"
      v-model="selectedOption"
      :options="selectOptions"
    />
    <div style="gap: 28px; display: flex;">

    <BaseButton type="secondary" @click="resetForm">Отменить</BaseButton>
    <BaseButton type="primary" @click="submitForm">Отправить</BaseButton>
  </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from './basic/Button.vue'
import RatingStars from './RatingStars.vue'
import BaseInput from './basic/Input.vue'
import BaseSelect from './basic/Select.vue'
// import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const selectedOption = ref('')
// const router = useRouter()
const submitForm = () => {
  // alert(`Имя: ${name.value}, Email: ${email.value}`)
  // router.push({ name: 'ThankYou' }) // или path: '/thank-you'
}

const selectOptions = [
  { value: '', label: 'Выберите' },
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' }
]

const resetForm = () => {
  name.value = ''
  email.value = ''
}
</script>

<style lang="scss">
.form {
  background-color: #fff;
  gap: 40px;
  border-radius: 32px;
  padding: 44px;
}
</style>

  