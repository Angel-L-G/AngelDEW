<template>
  <div class="container my-4">
    <h2 class="mb-4">Mi Carrito</h2>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="product in products"
        :key="product.id"
      >
        <div class="d-flex align-items-center">
          <img :src="product.image" alt="Product Image" class="me-3" width="50" />
          <div>
            <h5>{{ product.name }}</h5>
            <p class="mb-1">\${{ product.price }}</p>
            <div class="d-flex align-items-center">
              <input
                type="number"
                class="form-control form-control-sm me-2"
                v-model.number="product.quantity"
                @input="handleUpdateQuantity(product)"
                min="1"
              />
              <button
                class="btn btn-danger btn-sm"
                @click="() => removeFromCart(product.id)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <p>Total: ${{ product.price * product.quantity }}</p>
      </li>
    </ul>
    <div class="mt-4">
      <h4>Total del Carrito: ${{ totalPrice }}</h4>
      <button class="btn btn-warning mt-2" @click="clearCart">
        Vaciar carrito
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart';

const { products, totalPrice, removeFromCart, updateQuantity, clearCart } =
  useCart();

const handleUpdateQuantity = (product: { id: number; quantity: number }) => {
  updateQuantity(product.id, product.quantity);
};
</script>
