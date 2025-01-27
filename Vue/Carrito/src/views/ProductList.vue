<template>
  <div class="container my-4">
    <h2 class="mb-4">Lista de Productos</h2>
    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="product in products"
        :key="product.id"
      >
        <ProductItem :product="product" :stock="product.stock" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';

const products = [
  {
    id: 1,
    name: 'Camiseta',
    price: 20,
    image: '/images/shirt.jpg',
    stock: 10,
  },
  {
    id: 2,
    name: 'Pantalón',
    price: 30,
    image: '/images/pants.jpg',
    stock: 5,
  },
  {
    id: 3,
    name: 'Zapatos',
    price: 50,
    image: '/images/shoes.jpg',
    stock: 8,
  },
];
</script>
