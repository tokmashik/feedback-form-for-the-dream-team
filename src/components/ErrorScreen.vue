<template>
    <form class="form" @submit.prevent="submitForm">
      <div>
        <h2>
            Спасибо, ваш ответ отправлен
        </h2>
        <div class="p-small">
            Свяжемся с вами в ближайшее время
        </div>

        <BasicIcon
        :width="36"
        :height="36"
        :file="'error'"
      />
      </div>
    </form>
</template>
  
  <script setup>
  import { ref } from 'vue'
  // import { useRouter } from 'vue-router'
import BasicIcon from './basic/BasicIcon.vue'
  
  // const router = useRouter()
  const submitForm = () => {
    // alert(`Имя: ${name.value}, Email: ${email.value}`)
    // router.push({ name: 'ThankYou' }) // или path: '/thank-you'
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
  
    