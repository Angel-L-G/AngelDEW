<script setup lang="ts">
import ChampionList from "@/components/ChampionList.vue";
import {mockCampions} from '@/components/types/Champion.ts';
</script>

<template>
  <ChampionList :champions="mockCampions" />
</template>
