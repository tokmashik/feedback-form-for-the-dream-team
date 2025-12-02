import { createRouter, createWebHistory } from 'vue-router';
import MainScreen from '../views/MainScreen.vue';

const routes = [
  { path: '/', name: 'main', component: MainScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
