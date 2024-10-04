<!-- components/PropertyList.vue -->

<template>
    <div class="property-list">
        <!-- Поле ввода для поиска новостроек -->
        <n-input :value="searchQuery" @input="onSearchInput" placeholder="Поиск новостроек..." class="search-input" />

        <!-- Сетка с новостройками -->
        <n-grid :cols="gridColumns" :x-gap="16" :y-gap="16" responsive="screen">
            <n-grid-item v-for="property in filteredProperties" :key="property.id">
                <PropertyCard :title="property.title" :imageUrl="property.imageUrl" />
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

// Используем композиционную функцию для получения данных о поиске
const { filteredProperties, searchQuery, setSearchQuery } = usePropertySearch();

// Функция для изменения поискового запроса с использованием debounce
const onSearchInput = debounce((value) => {
    setSearchQuery(value);
}, 30); // задержка 30 мс

// Управление количеством колонок в сетке в зависимости от ширины экрана
const screenWidth = ref(window.innerWidth);

window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
});

const gridColumns = computed(() => {
    if (screenWidth.value > 1024) return 4;
    if (screenWidth.value > 768) return 3;
    if (screenWidth.value > 520) return 2;
    return 1;
});
</script>


<style scoped>
.property-list {
    margin: auto;
    padding-left: calc(50% - 570px);
    padding-right: calc(50% - 570px);
}

.search-input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 2rem;
}

</style>
