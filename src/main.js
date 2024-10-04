// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import naive from 'naive-ui';
import { createPinia } from 'pinia';
import router from './router'; // Убедитесь, что роутер импортируется корректно

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(naive);
app.use(router); // Обязательно используем роутер
app.mount('#app');
