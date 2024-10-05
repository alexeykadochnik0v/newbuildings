<template>
    <!-- Используем Naive UI для управления темой -->
    <n-config-provider :theme="theme">
        <div class="property-detail">
            <n-card hoverable class="property-card">
                <!-- Заголовок с обновленным стилем -->
                <h2 class="property-title">{{ property?.title }}</h2>
                <!-- Картинка новостройки (обычный элемент <img>) -->
                <img :src="imageUrl" alt="Property Image" class="property-image" />

                <!-- Преимущества новостройки -->
                <div class="advantages">
                    <n-h3>Преимущества новостройки</n-h3>
                    <div class="advantages-columns">
                        <!-- Левая колонка -->
                        <div class="advantages-column">
                            <n-list bordered>
                                <n-list-item v-for="(advantage, index) in leftAdvantages" :key="`left-${index}`">
                                    {{ advantage }}
                                </n-list-item>
                            </n-list>
                        </div>
                        <!-- Правая колонка -->
                        <div class="advantages-column">
                            <n-list bordered>
                                <n-list-item v-for="(advantage, index) in rightAdvantages" :key="`right-${index}`">
                                    {{ advantage }}
                                </n-list-item>
                            </n-list>
                        </div>
                    </div>
                </div>
            </n-card>

            <!-- Компонент сравнения новостроек -->
            <Comparison />
        </div>
    </n-config-provider>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { usePropertyStore } from '../stores/propertyStore';
import { useThemeStore } from '../stores/themeStore';
import { NConfigProvider, NCard, NH2, NList, NListItem, darkTheme, lightTheme } from 'naive-ui';
import Comparison from './Comparison.vue'; // Импортируем компонент Comparison

// Получаем ID новостройки из маршрута
const route = useRoute();
const propertyStore = usePropertyStore();
const themeStore = useThemeStore();
const propertyId = computed(() => route.params.id);

// Находим новостройку по ID из хранилища
const property = computed(() => {
    return propertyStore.properties.find(prop => prop.id === Number(propertyId.value));
});

// Динамический импорт изображения из папки assets
const imageUrl = computed(() => {
    try {
        return new URL(`../assets/images/${property.value.imageUrl}`, import.meta.url).href;
    } catch (e) {
        return ''; // Возвращаем пустой путь, если изображение не найдено
    }
});

// Используем тему из хранилища Pinia
const theme = computed(() => (themeStore.isDark ? darkTheme : lightTheme));

// Делим преимущества на две части
const leftAdvantages = computed(() =>
    property.value?.advantages.slice(0, Math.ceil(property.value?.advantages.length / 2))
);
const rightAdvantages = computed(() =>
    property.value?.advantages.slice(Math.ceil(property.value?.advantages.length / 2))
);
</script>

<style scoped>
.property-detail {
    padding: 16px;
}

.property-card {
    max-width: 1140px;
    margin: 0 auto;
    padding: 16px;
    background-color: var(--body-bg);
    color: var(--text-color);
    text-align: center;
    /* Центрируем текст */
}

/* Новый стиль для заголовка */
.property-title {
    font-size: 2rem;
    /* Увеличиваем размер шрифта */
    font-weight: bold;
    /* Жирный шрифт */
    margin-bottom: 1rem;
    /* Отступ снизу */
    color: var(--text-color);
    /* Цвет текста соответствует теме */
    margin-top: 0;
}

/* Стили для обычного изображения */
.property-image {
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: cover;
}

.advantages {
    margin-top: 32px;
}

/* Делаем две колонки для преимуществ */
.advantages-columns {
    display: flex;
    gap: 20px;
}

.advantages-column {
    flex: 1;
    text-align: left;
}

@media (max-width: 768px) {
    .advantages-columns {
        flex-direction: column;
        /* Колонки будут одна под другой */
        gap: 0;
    }

    .property-card {
        padding: 0;
    }

    .property-title {
        font-size: 24px;
    }

    .advantages-column {
        width: 100%;
        /* Колонки будут занимать всю ширину */
    }
}
</style>