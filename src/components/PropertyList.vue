<template>
    <div class="property-list center">
        <!-- Поле поиска новостроек -->
        <n-input :value="searchQuery" @input="onSearchInput" placeholder="Поиск новостроек..." class="search-input" />

        <!-- Сетка для отображения новостроек -->
        <n-grid :cols="gridColumns" :x-gap="16" :y-gap="16" responsive="screen">
            <n-grid-item v-for="property in filteredProperties" :key="property.id">
                <!-- Компонент PropertyCard для каждой новостройки -->
                <PropertyCard :title="property.title" :imageUrl="getImageUrl(property.imageUrl)" :propertyId="property.id" />
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePropertySearch } from '../composables/usePropertySearch';
import { NGrid, NGridItem, NInput } from 'naive-ui';
import PropertyCard from './PropertyCard.vue';
import debounce from 'lodash/debounce';

// Используем композиционную функцию для получения данных о поиске новостроек
const { filteredProperties, searchQuery, setSearchQuery } = usePropertySearch();

// Функция для обработки ввода в строку поиска с debounce для оптимизации
const onSearchInput = debounce((value) => {
    setSearchQuery(value);
}, 30); // Задержка 30 мс

// Управляем количеством колонок в сетке в зависимости от ширины экрана
const screenWidth = ref(window.innerWidth);

// Обновляем значение ширины экрана при изменении размеров окна
window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
});

// Определяем количество колонок в сетке в зависимости от ширины экрана
const gridColumns = computed(() => {
    if (screenWidth.value > 1024) return 4;
    if (screenWidth.value > 768) return 3;
    if (screenWidth.value > 520) return 2;
    return 1;
});

// Функция для получения динамического пути к изображениям
const getImageUrl = (imageUrl) => {
    try {
        return new URL(`../assets/images/${imageUrl}`, import.meta.url).href;
    } catch (e) {
        return ''; // Обработка ошибки, если изображение не найдено
    }
};
</script>

<style scoped>
.property-list {
    margin: auto;
    padding: 0 16px;
    /* по умолчанию отступы для мобильных устройств */
}

/* Медиазапрос для планшетов */
@media (min-width: 768px) {
    .property-list {
        padding: 0 32px;
    }
}

/* Медиазапрос для больших планшетов и небольших десктопов */
@media (min-width: 1024px) {
    .property-list {
        padding: 0 calc(50% - 570px);
    }
}

.search-input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 2rem;
}
</style>
