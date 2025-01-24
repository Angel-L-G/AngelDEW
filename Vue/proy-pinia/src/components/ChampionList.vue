<template>
  <div>
    <h2>Selecciona un Campeón</h2>
    <ul>
      <li
        v-for="champion in champions"
        :key="champion.name"
        @click="selectChampion(champion)"
      >
        {{ champion.name }} - {{ champion.role }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Champion } from '@/stores/useChampionStore';

export default defineComponent({
  emits: ['selectChampion'],
  setup(_, { emit }) {
    const champions: Champion[] = [
      { name: 'Ahri', role: 'Mago', stats: { health: 500, damage: 60, speed: 340 }, experience: 0 },
      { name: 'Garen', role: 'Luchador', stats: { health: 800, damage: 70, speed: 340 }, experience: 0 },
      { name: 'Lee Sin', role: 'Luchador', stats: { health: 600, damage: 80, speed: 350 }, experience: 0 },
    ];

    const selectChampion = (champion: Champion) => {
      emit('selectChampion', champion);
    };

    return {
      champions,
      selectChampion,
    };
  },
});
</script>
