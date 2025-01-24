// src/stores/champion.ts
import { defineStore } from 'pinia';

export interface ChampionStats {
  health: number;
  damage: number;
  speed: number;
}

export interface Champion {
  name: string;
  role: string;
  stats: ChampionStats;
  experience: number;
}

export const useChampionStore = defineStore('champion', {
  state: () => ({
    selectedChampion: null as Champion | null,
    experience: 0,
  }),
  actions: {
    selectChampion(champion: Champion) {
      this.selectedChampion = champion;
      this.experience = champion.experience;
    },
    increaseExperience(amount: number) {
      if (this.selectedChampion) {
        this.selectedChampion.experience += amount;
      }
    },
  },
  getters: {
    powerLevel: (state): number => {
      if (!state.selectedChampion) return 0;
      return state.selectedChampion.experience * state.selectedChampion.stats.damage;
    },
  },
});
