<script setup lang="ts">
import { ref } from "vue";
import { register, login } from '@/services/firebase/auth';

let email = ref("");
let psswd = ref("");
let confirmPassword = ref("");
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';

  if (psswd.value.length < 8)
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.';
  else if (psswd.value !== confirmPassword.value)
    errorMessage.value = 'Las contraseñas no coinciden.';

  let response = await register(email.value, psswd.value)
  if (response)
    login(email.value, psswd.value);
}
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
      <h2 class="card-title text-center mb-4">Registro</h2>
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
        </div>

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Confirmar Contraseña"
            required
          />
        </div>

        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Registrarse</button>
        </div>

        <p class="mt-3 text-center">
          ¿Ya tienes una cuenta? <router-link to="/">Inicia sesión aquí</router-link>
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
