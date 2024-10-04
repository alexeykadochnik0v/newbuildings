// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import PropertyList from '../components/PropertyList.vue';
import PropertyDetail from '../components/PropertyDetail.vue';

const routes = [
  { path: '/', component: PropertyList },
  { path: '/property/:id', component: PropertyDetail, props: true },
];

const router = createRouter({
  history: createWebHistory('/newbuildings/'), // Убедитесь, что base путь соответствует вашему проекту
  routes,
});

export default router;
