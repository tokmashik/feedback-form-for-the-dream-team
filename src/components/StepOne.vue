<template>
    <div>
    Форма обратной связи
    <RatingStars />
    </div>

  <form @submit.prevent="submitForm">
    <BaseInput v-model="name" label="Имя" placeholder="Введите имя" />
    <BaseInput v-model="email" type="email" label="Email" placeholder="Введите email" />
    <!-- <BaseButton >Отправить</BaseButton> -->

    <BaseButton type="primary" @click="submitForm">Отправить</BaseButton>
    <BaseButton type="secondary" @click="resetForm">Сбросить</BaseButton>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from './basic/Button.vue'

const name = ref('')
const email = ref('')

const submitForm = () => {
  alert(`Имя: ${name.value}, Email: ${email.value}`)
}

const resetForm = () => {
  name.value = ''
  email.value = ''
}
</script>

  