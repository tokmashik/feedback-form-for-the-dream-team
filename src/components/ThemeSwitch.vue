<template>
  <button class="button-toggle-theme" @click="toggleTheme">
    <transition name="fade">
      <BasicIcon
        v-if="isDark"
        key="sun"
        width="24"
        height="24"
        name="sun"
        class="button-toggle-theme__icon"
      />
      <BasicIcon
        v-else
        key="moon"
        width="24"
        height="24"
        name="moon"
        class="button-toggle-theme__icon"
      />
    </transition>
  </button>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import BasicIcon from './basic/BasicIcon.vue';

  const isDark = ref(false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      isDark.value = true;
      document.body.classList.add('dark-theme');
    }
  });
</script>

<style scoped lang="scss">
  .button-toggle-theme {
    position: relative;
    width: 48px;
    height: 48px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &__icon {
      position: absolute;
    }
  }

  /* Плавная анимация иконок при тыке */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s ease;
  }
  .fade-enter {
    opacity: 0;
    transform: translateY(-30%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateY(30%);
  }
</style>
