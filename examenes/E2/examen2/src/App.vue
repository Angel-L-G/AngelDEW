<script setup lang="ts">
import { ref, computed } from 'vue';
// Valor inicial del contador
const counter = ref(0);

// Mensaje dinámico basado en el valor del contador

const message = computed(() => {
  if (counter.value == 0) {
    return "El contador está en su valor inicial.";
  } else if (counter.value > 0 && counter.value <= 10) {
    return "Contador en rango bajo.";
  } else {
    return "Contador alto. ¡Atención!";
  }
});

// Botón de disminuir deshabilitado si el contador es 0
const isDecrementDisabled = ref(true)

// Función para incrementar el contador
const increment = () => {
  counter.value++;

  if(counter.value == 0) isDecrementDisabled.value = true;
  else isDecrementDisabled.value = false;
};

// Función para disminuir el contador
const decrement = () => {
  if (counter.value > 0) counter.value--;
  if(counter.value == 0) isDecrementDisabled.value = true;
};

// Función para reiniciar el contador
const reset = () => {
  counter.value = 0;
  isDecrementDisabled.value = true;
};
</script>

<template>
  <div id="app">
    <h1>Contador Vue.js</h1>

    <!-- Mostrar el contador -->
    <p>Valor del contador: {{ counter }}</p>

    <!-- Mensaje dinámico -->
    <p>{{ message }}</p>

    <!-- Botones -->
    <button @click="increment">Incrementar</button>
    <button v-on:click="decrement" :disabled="isDecrementDisabled">Disminuir</button>
    <button @click="reset">Reiniciar</button>
  </div>
</template>

<style>
button {
  margin: 5px;
  padding: 10px;
}
</style>
