<script setup>
import Header from './components/Header.vue';
import PropertyList from './components/PropertyList.vue';
import { computed } from 'vue';
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
</script>

<template>
  <div :class="[$themeClass]">
      <Header />
      <PropertyList />
  </div>
</template>

<style>
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

/* Применение фона и текста на уровне всего сайта */
body,
.n-layout {
  background-color: var(--body-bg);
  color: var(--text-color);
}

.center {
  padding-left: calc(50% - 570px);
  padding-right: calc(50% - 570px);
}


/* Стиль карточек в зависимости от темы */
.n-card {
  background-color: var(--card-bg);
  color: var(--text-color);
}

/* Пример стиля для контейнера с новостройками */
.property-list {
  background-color: var(--body-bg);
  color: var(--text-color);
}

/* Стили для всего приложения */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
