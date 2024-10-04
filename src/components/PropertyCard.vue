<!-- components/PropertyCard.vue -->

<template>
    <router-link :to="`/property/${propertyId}`" class="property-card">
        <img :src="imageUrl" alt="Property Image" class="property-image" />
        <div class="property-title">{{ title }}</div>
    </router-link>
</template>

<script setup>
defineProps({
    title: String,
    imageUrl: String,
    propertyId: [String, Number], // Добавляем пропс для ID
});
</script>


<style scoped>
.property-card {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
}

.property-card:hover {
    transform: scale(1.02);
}

.property-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.property-title {
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
}
</style>