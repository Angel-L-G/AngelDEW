<script setup lang="ts">
import {ref, nextTick} from "vue"
import { useRouter } from 'vue-router';
import {login} from "@/services/firebase/auth"

const router = useRouter();
let email = ref("");
let psswd = ref("");
const errorMessage = ref('');

async function submitForm() {
  if (psswd.value.length >= 8 && !(/\d/.test(psswd.value)) && !(/[!@#$%^&*(),.?":{}|<>]/.test(psswd.value)))
    errorMessage.value = 'El texto debe tener más de 8 caracteres un numero y un simbolo.';

  try {
    await login(email.value, psswd.value);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }

  router.push('/index');
}
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
      <h2 class="card-title text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="nombre@ejemplo.com"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            v-model="psswd"
            type="password"
            class="form-control"
            id="password"
            placeholder="Contraseña"
            required
          />
          <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Entrar</button>
        </div>

        <p class="mt-3 text-center">
          ¿No tienes una cuenta? <router-link to="/register">Registrate aquí</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #f8f9fa;
}

a {
  text-decoration: none;
  color: #0d6efd;
}

a:hover {
  text-decoration: underline;
}
</style>

