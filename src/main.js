import { createApp } from 'vue';
import './style.css';
import './assets/styles/variables.scss';
import './assets/fonts/fonts.css';
import App from './App.vue';
import router from './router';
import 'virtual:svg-icons-register';

createApp(App).use(router).mount('#app');
