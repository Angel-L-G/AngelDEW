<script lang="ts">
import { defineComponent } from 'vue';
import type { Champion } from '@/components/types/Champion.ts';
import ChampionCard from '@/components/ChampionCard.vue';

export default defineComponent({
  name: 'ChampionList',
  components: {
    ChampionCard,
  },
  props: {
    champions: {
      type: Array<Champion>,
      required: true,
    },
  },
});
</script>

<template>
  <div>
    <h1>Champions: </h1>
    <ChampionCard
      v-for="champion in champions"
      :key="champion.name"
      :champion="champion"
    />
  </div>
</template>
