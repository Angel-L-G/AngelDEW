<script setup lang="ts">
import { defineProps } from 'vue';
import type { Event } from '@/types/EventType';

defineProps<{ event: Event | null }>();
</script>

<template>
  <div>
    <h3>{{ event?.title }}</h3>
    <p>{{ event?.description }}</p>
    <slot name="extra"></slot>
  </div>
</template>

<style scoped>
div {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fdfdfd;
}
</style>
