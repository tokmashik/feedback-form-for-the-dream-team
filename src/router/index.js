import { createRouter, createWebHistory } from 'vue-router';
import MainScreen from '@/views/MainScreen.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainScreen },
    { path: '/feedback', component: MainScreen },
    { path: '/success', component: MainScreen },
    { path: '/error', component: MainScreen },
  ],
});
