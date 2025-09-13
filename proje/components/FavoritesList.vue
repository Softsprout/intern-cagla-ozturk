<template>
  <div v-show="isOpen" class="fixed inset-0 overflow-hidden z-50">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>

      <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full flex flex-col bg-white shadow-xl">
            <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Favorites</h2>
                <div class="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    @click="close"
                  >
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <div class="flow-root">
                  <ul role="list" class="-my-6 divide-y divide-gray-200">
                    <li v-for="product in favoriteProducts" :key="product.id" class="py-6 flex">
                      <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          :src="product.image"
                          :alt="product.name"
                          class="w-full h-full object-center object-cover"
                        >
                      </div>

                      <div class="ml-4 flex-1 flex flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>{{ product.name }}</h3>
                            <p class="ml-4">${{ product.price.toFixed(2) }}</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
                        </div>
                        <div class="flex-1 flex items-end justify-between text-sm">
                          <p class="text-gray-500">
                            {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                          </p>
                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                              @click="toggleFavorite(product.id)"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                <button
                  type="button"
                  class="text-indigo-600 font-medium hover:text-indigo-500"
                  @click="close"
                >
                  Continue Shopping
                  <span aria-hidden="true"> →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/productStore'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const store = useProductStore()

const favoriteProducts = computed(() => {
  return store.products.filter(product => store.favorites.includes(product.id))
})

const close = () => {
  emit('close')
}

const toggleFavorite = (productId: number) => {
  store.toggleFavorite(productId)
}
</script>