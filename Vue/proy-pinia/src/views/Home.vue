<template>
  <div>
    <ChampionList @selectChampion="selectChampion" />
    <ChampionDetails :champion="selectedChampion" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useChampionStore } from '@/stores/useChampionStore';
import ChampionList from '@/components/ChampionList.vue';
import ChampionDetails from '@/components/ChampionDetails.vue';
import type { Champion } from '@/stores/useChampionStore';

export default defineComponent({
  components: { ChampionList, ChampionDetails },
  setup() {
    const championStore = useChampionStore();

    // Datos reactivos
    const selectedChampion = ref<Champion | null>(championStore.selectedChampion);
    const championStats = ref(championStore.selectedChampion?.stats);

    // Propiedad computada para calcular el nivel de poder
    const powerLevel = computed(() => {
      if (selectedChampion.value) {
        return selectedChampion.value.experience * selectedChampion.value.stats.damage;
      }
      return 0;
    });

    // Observador para la experiencia
    watch(
      () => championStore.experience,
      (newExperience) => {
        if (newExperience % 100 === 0) { // Subir de nivel cada 100 puntos de experiencia
          console.log('¡El campeón ha subido de nivel!');
        }
      }
    );

    // Función para seleccionar un campeón
    const selectChampion = (champion: Champion) => {
      championStore.selectChampion(champion);
      selectedChampion.value = champion;
      championStats.value = champion.stats;
    };

    return {
      selectedChampion,
      championStats,
      selectChampion,
      powerLevel,
    };
  },
});
</script>
