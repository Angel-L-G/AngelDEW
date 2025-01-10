<script setup lang="ts">
import { inject } from 'vue';

const user = inject('user');
</script>

<template>
  <h1>Tienda</h1>
  <ul>
    <li>{{ user.user.uid }}</li>
    <li>{{ user.user.email }}</li>
    <li>{{ user.user.stsTokenManager.accessToken }}</li>
  </ul>
</template>
