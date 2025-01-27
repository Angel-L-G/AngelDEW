import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

export interface Product {
  id: number
  name: string
  quantity: number
  price: number
  image: string
}

export const useCartStore = defineStore('cart', () => {
  const state = reactive<{ products: Product[] }>({
    products: [],
  })

  const totalPrice = computed(() =>
    state.products.reduce((total, product) => total + product.price * product.quantity, 0)
  )

  function addProduct(product: Product) {
    const existingProduct = state.products.find(p => p.id === product.id)
    if (existingProduct) {
      existingProduct.quantity += product.quantity
    } else {
      state.products.push(product)
    }
  }

  function removeProduct(id: number) {
    state.products = state.products.filter(product => product.id !== id)
  }

  function updateQuantity(id: number, quantity: number) {
    const product = state.products.find(p => p.id === id)
    if (product) {
      product.quantity = quantity
    }
  }

  function clearCart() {
    state.products = []
  }

  return {
    state,
    totalPrice,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
  }
})
