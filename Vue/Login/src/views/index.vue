<template>
  <div class="container">
    <h1 class="mt-4">Perfil de Usuario</h1>

    <div v-if="userEmail && userToken">
      <Shop />
    </div>

    <div v-else>
      <p>No se encuentra información del usuario. Asegúrese de estar logueado.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import Shop from '@/components/Shop.vue';

const userEmail = ref<string | null>(null);
const userToken = ref<string | null>(null);
const user = ref<object | null>(null);

onMounted(() => {
  userEmail.value = localStorage.getItem('email');
  userToken.value = localStorage.getItem('token');
  user.value = JSON.parse(localStorage.getItem('user') || '{}');
});

provide('user', user);
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
}

button {
  width: 100%;
}
</style>
