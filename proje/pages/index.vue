<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold text-indigo-600">StyleStore</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <!-- Cart -->
                        <button @click="isCartOpen = true" class="relative p-2 text-gray-600 hover:text-indigo-600">
                            <span class="sr-only">Cart</span>
                            <div v-if="cartItemsCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {{ cartItemsCount }}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                        <ShoppingCart :is-open="isCartOpen" @close="isCartOpen = false" />
                        <!-- Favorites -->
                        <button @click="isFavoritesOpen = true" class="p-2 text-gray-600 hover:text-indigo-600">
                            <span class="sr-only">Favorites</span>
                            <div v-if="favoritesCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {{ favoritesCount }}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <FavoritesList :is-open="isFavoritesOpen" @close="isFavoritesOpen = false" />
                    </div>
                </div>
            </nav>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Categories -->
            <div class="flex space-x-4 mb-8 overflow-x-auto pb-2">
                <button 
                    v-for="category in categories" 
                    :key="category"
                    :class="[
                        'px-4 py-2 rounded-full shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                        store.selectedCategory === category
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                    ]"
                    @click="categoryClickHandler(category)"
                >
                    {{ category }}
                </button>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow overflow-hidden group cursor-pointer">
                    <nuxt-link :to="`/${product.id}`" class="block">
                        <div class="aspect-w-3 aspect-h-2">
                            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:opacity-75 transition-opacity">
                        </div>
                    </nuxt-link>
                    <div class="p-4">
                        <div class="flex justify-between items-start">
                            <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
                            <button 
                                @click="toggleFavorite(product.id)"
                                class="p-2 text-gray-400 hover:text-red-500"
                                :class="{ 'text-red-500': store.favorites.includes(product.id) }"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :fill="store.favorites.includes(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
                        <div class="mt-3 flex justify-between items-center">
                            <p class="text-lg font-bold text-indigo-600">${{ product.price.toFixed(2) }}</p>
                            <button 
                                @click="addToCart(product.id)"
                                :disabled="!product.inStock"
                                class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/productStore'
import { ref } from 'vue'

const store = useProductStore()
const isCartOpen = ref(false)
const isFavoritesOpen = ref(false)

const products = computed(() => store.filteredProducts)
const categories = computed(() => store.categories)
const cartItemsCount = computed(() => store.cartItemsCount)
const favoritesCount = computed(() => store.favorites.length)

const addToCart = (productId: number) => {
    store.addToCart(productId)
}

const toggleFavorite = (productId: number) => {
    store.toggleFavorite(productId)
}

function categoryClickHandler(category: string) {
    if (store.selectedCategory === category) {
        store.setSelectedCategory(null) // Clicking the same category again will show all products
    } else {
        store.setSelectedCategory(category)
    }
}

</script>

<style>
.aspect-w-3 {
    position: relative;
    padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
    --tw-aspect-w: 3;
}
.aspect-h-2 {
    --tw-aspect-h: 2;
}
.aspect-w-3 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>