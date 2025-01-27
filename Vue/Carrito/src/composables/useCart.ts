import { ref, computed } from 'vue'

const products = ref<
  { id: number; name: string; price: number; quantity: number; image: string }[]
>([])

export function useCart() {
  const totalPrice = computed(() =>
    products.value.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  const addToCart = (
    product: { id: number; name: string; price: number; image: string },
    quantity: number
  ) => {
    const existingProduct = products.value.find((p) => p.id === product.id)
    if (existingProduct) {
      existingProduct.quantity += quantity
    } else {
      products.value.push({ ...product, quantity })
    }
  }

  const removeFromCart = (id: number) => {
    products.value = products.value.filter((product) => product.id !== id)
  }

  const updateQuantity = (id: number, quantity: number) => {
    const product = products.value.find((p) => p.id === id)
    if (product) {
      product.quantity = quantity
    }
  }

  const clearCart = () => {
    products.value = []
  }

  return {
    products,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
