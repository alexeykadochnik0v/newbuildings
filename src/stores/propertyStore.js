// src/store/propertyStore.js
import { defineStore } from 'pinia';

export const usePropertyStore = defineStore('property', {
    state: () => ({
        properties: [
            {
                id: 1,
                title: 'ЖК Краснодар',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🚇 Рядом с метро',
                    '🌳 Экологически чистый район',
                    '🏙 Развитая инфраструктура',
                    '🚗 Подземный паркинг',
                    '🪟 Панорамные окна',
                    '🏞 Зоны для отдыха и спорта',
                    '🏠 Высокие потолки',
                    '👶 Детские площадки'
                ]
            },
            {
                id: 2,
                title: 'ЖК Панорама',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🔒 Закрытая территория',
                    '🛡 Охраняемая парковка',
                    '🛍 Близость к ТРЦ',
                    '🎒 Школы и детсады в пешей доступности',
                    '🚍 Развитая транспортная инфраструктура',
                    '🌿 Ландшафтный дизайн',
                    '⚽ Спортивные площадки',
                    '🔧 Квартиры с чистовой отделкой'
                ]
            },
            {
                id: 3,
                title: 'ЖК Губернский',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🛝 Современные детские площадки',
                    '🅿️ Парковочные места для всех жителей',
                    '🌳 В шаговой доступности от парков',
                    '🛒 Рядом с рынком',
                    '🚌 Развитая транспортная сеть',
                    '🏥 Наличие медицинских учреждений поблизости',
                    '🏢 Просторные планировки квартир',
                    '🌐 Подключение к скоростному интернету'
                ]
            },
            {
                id: 4,
                title: 'ЖК Черемушки',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🏛 Близость к историческому центру города',
                    '🚌 Развитая сеть общественного транспорта',
                    '🏪 Магазины и супермаркеты поблизости',
                    '🏫 Рядом с образовательными учреждениями',
                    '⚽ Спортивные зоны',
                    '🚴‍♂️ Наличие велодорожек',
                    '🛡 Охраняемая территория',
                    '🔐 Высокий уровень безопасности'
                ]
            },
            {
                id: 5,
                title: 'ЖК Солнечный',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🚫🚗 Закрытые дворы без машин',
                    '🛡 Охраняемая парковка',
                    '🚍 Транспортная доступность',
                    '🏃 Широкие возможности для активного отдыха',
                    '🌲 Рядом с лесопарковой зоной',
                    '🏋️ Наличие фитнес-центров',
                    '🛝 Оборудованные детские площадки',
                    '🌿 Экологически чистый район'
                ]
            },
            {
                id: 6,
                title: 'ЖК Цветной бульвар',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🌇 Квартиры с панорамными видами',
                    '🛍 Развитая сеть магазинов и кафе',
                    '🚍 Близость к общественному транспорту',
                    '🎒 В шаговой доступности детские сады',
                    '🌳 Парк рядом с комплексом',
                    '🛡 Охраняемая территория',
                    '⚽ Современные спортивные площадки',
                    '🚲 Наличие велопарковок'
                ]
            },
            {
                id: 7,
                title: 'ЖК Северный',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🌊 Близость к набережной',
                    '🏞 Тихий и спокойный район',
                    '🌅 Панорамные виды на реку',
                    '🚗 Подземный паркинг',
                    '🚴‍♀️ Велодорожки и прогулочные зоны',
                    '🎉 Близость к развлекательным заведениям',
                    '🌿 Экологически чистая среда',
                    '🏗 Современные архитектурные решения'
                ]
            },
            {
                id: 8,
                title: 'ЖК Спортивный парк',
                imageUrl: 'image-1.jpg',
                advantages: [
                    '🏟 Рядом со спортивным комплексом',
                    '🔒 Закрытая территория',
                    '🛡 Высокий уровень безопасности',
                    '🏢 Развитая социальная инфраструктура',
                    '🛍 Близость к ТРЦ и кинотеатрам',
                    '🚴‍♀️ Развитая сеть велодорожек',
                    '🚍 Транспортная доступность',
                    '⚽ Современные детские и спортивные площадки'
                ]
            }
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
