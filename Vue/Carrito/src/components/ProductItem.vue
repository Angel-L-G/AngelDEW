<template>
  <div class="card mb-3">
    <img :src="product.image" class="card-img-top" alt="Product Image" />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">\${{ product.price }}</p>
      <div class="d-flex align-items-center mb-3">
        <input
          type="number"
          class="form-control me-2"
          v-model.number="quantity"
          min="1"
          :max="stock"
          @input="validateQuantity"
        />
        <button
          class="btn btn-primary"
          @click="handleAddToCart"
          :disabled="!isValidQuantity"
        >
          Agregar al carrito
        </button>
      </div>
      <p v-if="!isValidQuantity" class="text-danger small">
        Cantidad no válida o fuera de stock
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCart } from '@/composables/useCart';

const props = defineProps<{
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  stock: number;
}>();

const quantity = ref(1);
const { addToCart } = useCart();

const isValidQuantity = computed(() =>
  quantity.value > 0 && quantity.value <= props.stock
);

const validateQuantity = () => {
  if (quantity.value < 1) quantity.value = 1;
  if (quantity.value > props.stock) quantity.value = props.stock;
};

const handleAddToCart = () => {
  if (isValidQuantity.value) {
    addToCart(props.product, quantity.value);
  }
};
</script>
