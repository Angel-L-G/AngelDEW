<template>
  <CrimeScene>
    <template #default>
      <h1>Escena del Crimen</h1>
      <ClueList :clues="clues">
        <template #default="{ clue }">
          <li>{{ clue.name }} - Importancia: {{ clue.importance }}</li>
        </template>
      </ClueList>
      <DialogueBox>
        <template #header>
          <h3>Testigo</h3>
        </template>
        <template #content>
          <p>"Vi algo sospechoso cerca de la ventana..."</p>
        </template>
        <template #footer>
          <button @click="resolveCase">Resolver el caso</button>
        </template>
      </DialogueBox>
    </template>
  </CrimeScene>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CrimeScene from '@/components/CrimeScene.vue';
import ClueList from '@/components/ClueList.vue';
import DialogueBox from '@/components/DialogueBox.vue';

export default defineComponent({
  components: { CrimeScene, ClueList, DialogueBox },
  setup() {
    const clues = ref([
      { name: 'Huellas', importance: 3 },
      { name: 'Vaso roto', importance: 2 },
      { name: 'Sobre sospechoso', importance: 5 },
    ]);

    const resolveCase = () => {
      const importantClues = clues.value.filter(clue => clue.importance >= 3);
      const caseSolved = (importantClues.length / clues.value.length) >= 0.6;

      if (caseSolved) {
        alert('¡Enhorabuena! Has resuelto el caso');
      } else {
        alert('No has acertado, inténtalo de nuevo');
        clues.value = [
          { name: 'Huellas', importance: 3 },
          { name: 'Vaso roto', importance: 2 },
          { name: 'Sobre sospechoso', importance: 5 },
        ];
      }
    };

    return { clues, resolveCase };
  }
});
</script>
