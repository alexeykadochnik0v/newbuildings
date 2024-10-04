import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: false,
    }),
    getters: {
        themeClass: (state) => (state.isDark ? 'dark' : 'light'), // Добавляем геттер для вычисляемого значения
    },
    actions: {
        setTheme(value) {
            this.isDark = value;
        },
        toggleTheme() {
            this.isDark = !this.isDark; // Добавляем метод для переключения темы
        },
    },
});
