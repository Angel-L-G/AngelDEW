<template>
  <ul>
    <slot v-for="clue in sortedClues" :clue="clue" :key="clue.name"></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

interface Clue {
  name: string;
  importance: number;
}

export default defineComponent({
  name: 'ClueList',
  props: {
    clues: {
      type: Array<Clue>,
      required: true,
    },
  },
  setup(props) {
    const sortedClues = computed(() => {
      return props.clues.sort((a, b) => b.importance - a.importance);
    });

    return { sortedClues };
  },
});
</script>
