<script lang="ts">
import { defineComponent } from 'vue';
import type { Champion } from '@/components/types/Champion';

export default defineComponent({
  name: 'ChampionCard',
  props: {
    champion: {
      type: Object as () => Champion,
      required: true,
    },
  },
});
</script>

<template>
  <div class="champion-card">
    <h3>{{ champion.name }}</h3>
    <p>Role: {{ champion.role }}</p>
    <p>Total Stats: {{ champion.stats }}</p>
    <p>Exp: {{ champion.experience }}</p>

    <div>
      <p>Level: {{ champion.level }}</p>
      <div>
        <button> + </button>
        <button> - </button>
      </div>
    </div>
  </div>
</template>
