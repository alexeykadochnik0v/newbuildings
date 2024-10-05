<template>
    <div class="property-list center">
        <!-- Поле поиска новостроек для десктопа и мобилки -->
        <n-input v-if="isDesktop" :value="searchQuery" @input="onSearchInput" placeholder="Поиск новостроек..."
            class="search-input" />

        <n-input v-else v-model:value="mobileSearchQuery" placeholder="Поиск новостроек..." class="search-input"
            @keyup.enter="onMobileSearch">
            <template #suffix>
                <n-button @click="onMobileSearch" type="primary">Искать</n-button>
            </template>
        </n-input>

        <!-- Сетка для отображения новостроек -->
        <n-grid :cols="gridColumns" :x-gap="16" :y-gap="16" responsive="screen" class="property-grid">
            <n-grid-item v-for="property in filteredProperties" :key="property.id">
                <!-- Компонент PropertyCard для каждой новостройки -->
                <PropertyCard :title="property.title" :imageUrl="getImageUrl(property.imageUrl)"
                    :propertyId="property.id" />
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePropertySearch } from '../composables/usePropertySearch';
import { NGrid, NGridItem, NInput, NButton } from 'naive-ui';
import PropertyCard from './PropertyCard.vue';

// Используем композиционную функцию для получения данных о поиске новостроек
const { filteredProperties, searchQuery, setSearchQuery } = usePropertySearch();

// Переменная для хранения поискового запроса на мобилке
const mobileSearchQuery = ref('');

// Определение, мобилка или десктоп
const screenWidth = ref(window.innerWidth);
const isDesktop = computed(() => screenWidth.value > 768);

// Обновляем значение ширины экрана при изменении размеров окна
window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
});

// Функция для обработки ввода на десктопе с debounce для оптимизации
const onSearchInput = (value) => {
    setSearchQuery(value);
}; // Задержка 300 мс

// Функция для обработки поиска на мобилке
const onMobileSearch = () => {
    setSearchQuery(mobileSearchQuery.value);
};

// Управление количеством колонок в сетке в зависимости от ширины экрана
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
    margin-bottom: 1rem;
}

.mobile-search {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 1rem;
}

.n-input>.n-input__suffix {
    display: flex;
    align-items: center;
}

.property-grid {
    margin-bottom: 2rem;
}
</style>