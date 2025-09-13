interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  inStock: boolean
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([
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
  ])

  const favorites = ref<number[]>([])
  const cart = ref<{ productId: number, quantity: number }[]>([])
  const selectedCategory = ref<string | null>(null)

  const categories = computed(() => [...new Set(products.value.map(p => p.category))])

  const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products.value
    return products.value.filter(p => p.category === selectedCategory.value)
  })
  
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => {
      const product = products.value.find(p => p.id === item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  })

  const cartItemsCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  function addToCart(productId: number) {
    const existingItem = cart.value.find(item => item.productId === productId)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ productId, quantity: 1 })
    }
  }

  function removeFromCart(productId: number) {
    const index = cart.value.findIndex(item => item.productId === productId)
    if (index > -1) {
      cart.value.splice(index, 1)
    }
  }

  function setSelectedCategory(category: string | null) {
    selectedCategory.value = category
  }

  function toggleFavorite(productId: number) {
    const index = favorites.value.indexOf(productId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(productId)
    }
  }

  return {
    products,
    favorites,
    cart,
    categories,
    cartTotal,
    cartItemsCount,
    filteredProducts,
    selectedCategory,
    addToCart,
    removeFromCart,
    toggleFavorite,
    setSelectedCategory
  }
})