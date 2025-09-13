<template>
  <div v-show="isOpen" class="fixed inset-0 overflow-hidden z-50">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>

      <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full flex flex-col bg-white shadow-xl">
            <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Shopping cart</h2>
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
                    <li v-for="item in cartItems" :key="item.productId" class="py-6 flex">
                      <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          :src="item.product.image"
                          :alt="item.product.name"
                          class="w-full h-full object-center object-cover"
                        >
                      </div>

                      <div class="ml-4 flex-1 flex flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>{{ item.product.name }}</h3>
                            <p class="ml-4">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                          </div>
                        </div>
                        <div class="flex-1 flex items-end justify-between text-sm">
                          <div class="flex items-center">
                            <button
                              @click="decreaseQuantity(item.productId)"
                              class="px-2 py-1 text-gray-600 hover:text-gray-800"
                            >-</button>
                            <span class="mx-2">{{ item.quantity }}</span>
                            <button
                              @click="increaseQuantity(item.productId)"
                              class="px-2 py-1 text-gray-600 hover:text-gray-800"
                            >+</button>
                          </div>

                          <div class="flex">
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                              @click="removeFromCart(item.productId)"
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
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${{ cartTotal.toFixed(2) }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div class="mt-6">
                <button
                  class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  @click="checkout"
                >
                  Checkout
                </button>
              </div>
              <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or
                  <button
                    type="button"
                    class="text-indigo-600 font-medium hover:text-indigo-500"
                    @click="close"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> →</span>
                  </button>
                </p>
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

const cartItems = computed(() => {
  return store.cart.map(item => ({
    ...item,
    product: store.products.find(p => p.id === item.productId)!
  }))
})

const cartTotal = computed(() => store.cartTotal)

const close = () => {
  emit('close')
}

const removeFromCart = (productId: number) => {
  store.removeFromCart(productId)
}

const increaseQuantity = (productId: number) => {
  store.addToCart(productId)
}

const decreaseQuantity = (productId: number) => {
  const item = store.cart.find(item => item.productId === productId)
  if (item && item.quantity > 1) {
    item.quantity--
  } else {
    store.removeFromCart(productId)
  }
}

const checkout = () => {
  // Implement checkout logic here
  alert('Checkout functionality will be implemented soon!')
}
</script>