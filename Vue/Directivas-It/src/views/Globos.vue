<script setup lang="ts">
import { ref } from 'vue';
import Balloon from '@/components/balloon.vue';
import Message from '@/components/Mensaje.vue';

const balloonCount = ref(0);

function seeMsg() {
  if(balloonCount.value > 10){
    const a = document.querySelector('#messageBody');
    a?.classList.add('showed');
    a?.classList.remove('hidden');
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>La Casa Flotante de los Globos Rojos</h1>

        <label for="balloonCount">Globos: {{ balloonCount }}</label>
        <input
          id="balloonCount"
          type="range"
          v-model.number="balloonCount"
          min="0"
          max="300"
          step="1"
          class="form-range"
        />
      </div>
    </div>

    <div class="row">
      <Balloon v-for="index in balloonCount" :key="index" />
    </div>

    <div class="row">
      <button id="msg" @click="seeMsg"> Ver Mensaje</button>
      <div id="messageBody" class="hidden">
        <Message>
          <template v-slot:default>
            <p>Todos flotan aquí...</p>
          </template>
        </Message>
      </div>
    </div>
  </div>
</template>

<style>
.hidden {
  display: none;
}

.showed {
  display: block;
}
</style>
