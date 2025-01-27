<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Mi Tienda</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Tienda</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">Carrito</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCart } from '@/composables/useCart';

const { products } = useCart();
const cartCount = computed(() =>
  products.reduce((total, product) => total + product.quantity, 0)
);
</script>
