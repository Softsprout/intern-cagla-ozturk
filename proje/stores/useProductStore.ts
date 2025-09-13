interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  inStock: boolean
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        price: 29.99,
        description: 'Soft and comfortable 100% organic cotton t-shirt',
        category: 'T-Shirts',
        image: 'https://picsum.photos/400/300?random=1',
        inStock: true
      },
      {
        id: 2,
        name: 'Slim Fit Jeans',
        price: 79.99,
        description: 'Classic blue denim jeans with modern slim fit',
        category: 'Pants',
        image: 'https://picsum.photos/400/300?random=2',
        inStock: true
      },
      {
        id: 3,
        name: 'Summer Dress',
        price: 59.99,
        description: 'Light and breezy floral summer dress',
        category: 'Dresses',
        image: 'https://picsum.photos/400/300?random=3',
        inStock: true
      },
      {
        id: 4,
        name: 'Wool Sweater',
        price: 89.99,
        description: 'Warm and cozy wool blend sweater',
        category: 'Sweaters',
        image: 'https://picsum.photos/400/300?random=4',
        inStock: true
      },
      {
        id: 5,
        name: 'Leather Jacket',
        price: 199.99,
        description: 'Classic leather jacket with modern styling',
        category: 'Jackets',
        image: 'https://picsum.photos/400/300?random=5',
        inStock: false
      },
      {
        id: 6,
        name: 'Silk Scarf',
        price: 34.99,
        description: 'Elegant silk scarf with contemporary pattern',
        category: 'Accessories',
        image: 'https://picsum.photos/400/300?random=6',
        inStock: true
      }
    ] as Product[],
    favorites: [] as number[],
    cart: [] as { productId: number, quantity: number }[]
  }),
  
  getters: {
    categories: (state) => [...new Set(state.products.map(p => p.category))],
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId)
        return total + (product ? product.price * item.quantity : 0)
      }, 0)
    },
    cartItemsCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    }
  },
  
  actions: {
    addToCart(productId: number) {
      const existingItem = this.cart.find(item => item.productId === productId)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({ productId, quantity: 1 })
      }
    },
    
    removeFromCart(productId: number) {
      const index = this.cart.findIndex(item => item.productId === productId)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    },
    
    toggleFavorite(productId: number) {
      const index = this.favorites.indexOf(productId)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(productId)
      }
    }
  }
})