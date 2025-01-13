import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Champion } from '@/components/types/Champion.ts';

export const useCounterStore = defineStore('champion', () => {
  const champion = ref({} as Champion)
  function increment() {
    champion.value.level++
  }
  function decrement() {
    champion.value.level--
  }

  return { champion, increment, decrement }
})
