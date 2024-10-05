<template>
    <n-card hoverable class="comparison-card">
        <!-- Заголовок -->
        <n-h3 class="comparison-title">Сравни с другими новостройками</n-h3>

        <!-- Хэштеги с названиями новостроек -->
        <n-space wrap>
            <n-tag v-for="property in properties" :key="property.id" type="info" class="property-tag"
                @click="navigateToProperty(property.id)" style="cursor: pointer;">
                #{{ property.title }}
            </n-tag>
        </n-space>
    </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { NCard, NH3, NTag, NSpace } from 'naive-ui';
import { usePropertyStore } from '../stores/propertyStore';

// Получаем список всех новостроек из хранилища
const propertyStore = usePropertyStore();
const properties = ref(propertyStore.properties);

// Используем роутер для навигации при клике на хэштег
const router = useRouter();
const navigateToProperty = (propertyId) => {
    router.push(`/property/${propertyId}`);
};
</script>

<style scoped>
.comparison-card {
    padding-left: calc(50% - 470px);
    padding-right: calc(50% - 470px);
    margin: 16px 0;
    border: none;
}

.comparison-card:hover {
    box-shadow: none;
}

.comparison-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.property-tag {
    margin: 4px;
    transition: transform 0.2s ease, background-color 0.2s ease;
}

.property-tag:hover {
    background-color: var(--info-hover-color);
    /* Изменяем цвет фона при наведении */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    /* Добавляем тень для эффекта "поднятия" */
}
</style>