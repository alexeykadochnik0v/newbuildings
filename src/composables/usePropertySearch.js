// src/composables/usePropertySearch.js

import { storeToRefs } from 'pinia';
import { usePropertyStore } from '../stores/propertyStore';

export function usePropertySearch() {
    const propertyStore = usePropertyStore();
    const { filteredProperties, searchQuery } = storeToRefs(propertyStore);

    // Метод для изменения поискового запроса
    const setSearchQuery = (value) => {
        propertyStore.setSearchQuery(value);
    };

    return { filteredProperties, searchQuery, setSearchQuery };
}
