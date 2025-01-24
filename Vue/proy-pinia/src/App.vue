// src/App.vue
<template>
  <div id="app">
    <h1>League of Legends - Campeones</h1>
    <Home />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './views/Home.vue';

export default defineComponent({
  components: {
    Home,
  },
});
</script>
