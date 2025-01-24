// src/components/ChampionDetails.vue
<template>
  <div v-if="champion">
    <h2>{{ champion.name }}</h2>
    <p>Rol: {{ champion.role }}</p>
    <p>Vida: {{ champion.stats.health }}</p>
    <p>Daño: {{ champion.stats.damage }}</p>
    <p>Velocidad: {{ champion.stats.speed }}</p>
    <p><strong>Nivel de Poder: {{ powerLevel }}</strong></p>

    <!-- Botón para aumentar la experiencia -->
    <button @click="increaseExperience(10)">Aumentar Experiencia</button>
  </div>
  <div v-else>
    <p>Selecciona un campeón para ver los detalles.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type {PropType} from 'vue';
import { useChampionStore } from '@/stores/useChampionStore';
import type { Champion } from '@/stores/useChampionStore';

export default defineComponent({
  props: {
    champion: {
      type: Object as PropType<Champion>,
      required: true,
    },
  },
  setup(props) {
    const championStore = useChampionStore();

    // Propiedad computada para calcular el nivel de poder
    const powerLevel = computed(() => {
      if (props.champion) {
        return props.champion.experience * props.champion.stats.damage;
      }
      return 0;
    });

    // Función para aumentar la experiencia del campeón
    const increaseExperience = (amount: number) => {
      championStore.increaseExperience(amount);
    };

    return {
      powerLevel,
      increaseExperience,
    };
  },
});
</script>
