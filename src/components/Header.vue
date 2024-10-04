<template>
  <n-config-provider :theme="theme">
    <div :class="[$themeClass]">
      <n-layout>
        <n-layout-header>
          <div class="header">
            <div class="custom-switch" @click="toggleTheme">
              <div class="switch-button" :class="{ 'switch-on': isDark }">
                <span v-if="isDark" class="icon">🌙</span>
                <span v-else class="icon">☀️</span>
              </div>
            </div>
          </div>
        </n-layout-header>
        <n-layout-content>
          <div class="content">
            <h1>Только лучшие новостройки</h1>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import { useOsTheme, darkTheme, lightTheme, NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '../stores/themeStore';

// Используем Pinia для хранения состояния темы
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

// Вычисляемая переменная для класса темы
const $themeClass = computed(() => (isDark.value ? 'dark' : 'light'));

// Определение темы на основе OS (можно добавить для автоматического подбора)
const osTheme = useOsTheme();

// Если вы хотите, чтобы тема по умолчанию зависела от ОС:
isDark.value = osTheme === 'dark';

// Определение темы для Naive UI
const theme = computed(() => (isDark.value ? darkTheme : lightTheme));

// Функция для изменения темы
const setTheme = (value) => {
  themeStore.setTheme(value);
};

// Функция для переключения темы
const toggleTheme = () => {
  setTheme(!isDark.value);
};
</script>

<style scoped>
.light {
  --body-bg: #ffffff;
  --text-color: #000000;
}

.dark {
  --body-bg: #333333;
  --text-color: #ffffff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  background-color: var(--body-bg);
  color: var(--text-color);
  padding-left: calc(50% - 570px);
  padding-right: calc(50% - 570px);
}

.content {
  text-align: center;
  margin: 2rem;
  font-size: 1.5rem;
  color: var(--text-color);
}

.custom-switch {
  width: 60px;
  height: 30px;
  border: 1px solid var(--switch-bg, #ccc);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-switch .switch-button {
  width: 28px;
  height: 28px;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease, background-color 0.3s ease;
}

.custom-switch .switch-button.switch-on {
  left: 31px;
  background-color: #4b79a1;
}

.icon {
  font-size: 1.4rem;
}
</style>