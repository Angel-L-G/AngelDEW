<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required autocomplete="email" />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        autocomplete="current-password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import useRouter from "vue-router"

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  await authStore.login({ email: email.value, password: password.value })
  router.push("/home")
}
</script>

<style scoped>
/* Add styles here */
</style>
