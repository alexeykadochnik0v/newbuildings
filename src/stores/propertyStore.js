// stores/propertyStore.js

import { defineStore } from 'pinia';

export const usePropertyStore = defineStore('property', {
    state: () => ({
        properties: [
            { id: 1, title: 'Новостройка 1', imageUrl: './images/image-1.jpg' },
            { id: 2, title: 'Новостройка 2', imageUrl: './images/image-1.jpg' },
            { id: 3, title: 'Новостройка 3', imageUrl: './images/image-1.jpg' },
            { id: 4, title: 'Новостройка 4', imageUrl: './images/image-1.jpg' },
            { id: 5, title: 'Новостройка 5', imageUrl: './images/image-1.jpg' },
            { id: 6, title: 'Новостройка 6', imageUrl: './images/image-1.jpg' },
            { id: 7, title: 'Новостройка 7', imageUrl: './images/image-1.jpg' },
            { id: 8, title: 'Новостройка 8', imageUrl: './images/image-1.jpg' },
        ],
        searchQuery: '', // Переменная для хранения поискового запроса
    }),
    getters: {
        filteredProperties: (state) => {
            const query = state.searchQuery.toLowerCase().trim();
            // Если поисковый запрос пустой, возвращаем все новостройки
            if (!query) {
                return state.properties;
            }
            // Фильтруем новостройки по названию, если есть введённый текст
            return state.properties.filter((property) =>
                property.title.toLowerCase().includes(query)
            );
        },
    },
    actions: {
        // Действие для изменения поискового запроса
        setSearchQuery(query) {
            this.searchQuery = query;
        },
    },
});
