<script setup>
import Header from './components/Header.vue';
import { computed, watchEffect } from 'vue';
import { useOsTheme, darkTheme, lightTheme } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useThemeStore } from './stores/themeStore';

// Используем Pinia для хранения состояния темы
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

// Определяем текущую тему (светлая или темная)
const $themeClass = computed(() => (isDark.value ? 'dark' : 'light'));

// Определение темы на основе ОС
const osTheme = useOsTheme();
isDark.value = osTheme === 'dark';

// Изменение класса у body в зависимости от темы
watchEffect(() => {
  if (isDark.value) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
});
</script>

<template>
  <div :class="[$themeClass]">
    <Header />
    <!-- Компоненты будут меняться в зависимости от маршрута -->
    <router-view />
  </div>
</template>

<style>
/* Цвета для темной и светлой тем */
.light-theme {
  background-color: #ffffff;
  color: #000000;
}

.dark-theme {
  background-color: #333333;
  color: #ffffff;
}

body {
  transition: background-color 0.3s ease;
  /* Плавный переход между темами */
}

.light {
  --body-bg: #ffffff;
  --text-color: #000000;
  --card-bg: #ffffff;
}

.dark {
  --body-bg: #333333;
  --text-color: #ffffff;
  --card-bg: #444444;
}

/* Стиль для всего приложения */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
