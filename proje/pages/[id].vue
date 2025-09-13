<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <div class="relative">
          <div class="aspect-w-3 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-center object-cover">
          </div>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.name }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl text-gray-900">${{ product.price.toFixed(2) }}</p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>
            <p class="text-base text-gray-900">{{ product.description }}</p>
          </div>

          <div class="mt-6">
            <!-- Stock status -->
            <div class="flex items-center">
              <div :class="[product.inStock ? 'bg-green-100' : 'bg-red-100', 'rounded-full px-3 py-1 text-sm font-medium']">
                <p :class="[product.inStock ? 'text-green-800' : 'text-red-800']">
                  {{ product.inStock ? 'In stock' : 'Out of stock' }}
                </p>
              </div>
            </div>

            <div class="mt-10 flex sm:flex-col1">
              <button
                type="button"
                :disabled="!product.inStock"
                @click="addToCart(product.id)"
                class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add to cart
              </button>

              <button
                type="button"
                @click="toggleFavorite(product.id)"
                class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-red-500"
                :class="{ 'text-red-500': isFavorite }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" :fill="isFavorite ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="sr-only">Add to favorites</span>
              </button>
            </div>
          </div>

          <section class="mt-12">
            <div class="border-t border-gray-200 pt-8">
              <h2 class="text-sm font-medium text-gray-900">Category</h2>
              <div class="mt-2">
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {{ product.category }}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductStore } from '~/stores/productStore'

const route = useRoute()
const store = useProductStore()

const product = computed(() => {
  return store.products.find(p => p.id === parseInt(route.params.id as string)) || {
    id: 0,
    name: 'Product not found',
    price: 0,
    description: '',
    category: '',
    image: '',
    inStock: false
  }
})

const isFavorite = computed(() => {
  return store.favorites.includes(product.value.id)
})

const addToCart = (productId: number) => {
  store.addToCart(productId)
}

const toggleFavorite = (productId: number) => {
  store.toggleFavorite(productId)
}
</script>