<script setup lang="ts">
import { ref } from 'vue';
import it1 from '../assets/it_1.jpg';
import it2 from '../assets/it_2.jpg';
import it3 from '../assets/it_3.jpg';
import it4 from '../assets/it_4.jpg';

const images = [it1, it2, it3, it4];

const selectedImage = ref(0);

const alias = ref("");

const resetSelection = () => {
  selectedImage.value = 0;
  alias.value = "";
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Elige, Payaso!</h1>
        <ul class="d-flex">
          <li v-for="image, index in images" :key="image">
            <img
              :src="image"
              alt="imagen"
              width="200"
              height="200"
              @click="selectedImage = index + 1"
              :style="{ border: selectedImage === index + 1 ? '2px solid red' : '' }"
            />
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <h2>Imagen Selecionada</h2>
      <p v-if="selectedImage == 1"> It_1</p>
      <p v-else-if="selectedImage == 2">It_2</p>
      <p v-else-if="selectedImage == 3">It_3</p>
      <p v-else-if="selectedImage == 4">It_4</p>
      <p v-else>Ninguna</p>
    </div>

    <div class="row">
      <form action="">
        <input v-model="alias">
      </form>
      <p>Alias: {{ alias }}</p>
    </div>

    <div class="row">
      <button @click="resetSelection">Reset</button>
    </div>
  </div>
</template>
