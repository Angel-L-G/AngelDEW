<template>
  <div class="container">
    <h1 class="mt-4">La Maldición de Derry</h1>

    <div class="mb-4 d-flex align-items-center">
      <label for="eventFilter" class="me-3">Filtrar eventos:</label>
      <select id="eventFilter" v-model="selectedFilter" class="form-select w-auto me-3">
        <option value="TODOS">Todos</option>
        <option value="DESAPARICIONES">Desapariciones</option>
        <option value="AVISTAMIENTOS">Avistamientos</option>
        <option value="FENOMENOS">Fenómenos Paranormales</option>
      </select>
      <button @click="resetFilter" class="btn btn-primary">Reiniciar Filtro</button>
    </div>

    <div v-if="!selectedEvent">
      <h2>Eventos:</h2>
      <ul class="list-group">
        <li
          v-for="event in filteredEvents"
          :key="event.title"
          class="list-group-item"
          @click="selectedEvent = event"
        >
          <strong>{{ event.title }}</strong> - {{ event.description }}
        </li>
      </ul>
    </div>

    <div v-show="selectedEvent">
      <h2>Detalles del evento</h2>
      <EventDetail :event="selectedEvent">
        <template #extra>
          <p><strong>Fecha:</strong> {{ selectedEvent?.date.toLocaleDateString() }}</p>
          <p><strong>Victimas:</strong> {{ selectedEvent?.victimas }}</p>
        </template>
      </EventDetail>
      <button @click="resetView" class="btn btn-secondary mt-3">Volver a la vista general</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Event } from '@/types/EventType';
import { EventType } from '@/types/EventType';
import EventDetail from '@/components/EventDetail.vue';

const events = ref<Event[]>([
  { title: 'Desaparición de Georgie', type: EventType.DESAPARICIONES, date: new Date('1988-10-15'), description: 'Un niño desapareció mientras jugaba con su barco de papel.', victimas: 3 },
  { title: 'Avistamiento de Pennywise', type: EventType.AVISTAMIENTOS, date: new Date('1989-09-02'), description: 'Un payaso fue visto en las alcantarillas.', victimas: 0 },
  { title: 'Luces extrañas en los bosques', type: EventType.FENOMENOS, date: new Date('1990-06-17'), description: 'Fenómenos inexplicables ocurrieron en el bosque cercano.', victimas: 3 },
  { title: 'Desaparición de un grupo de adolescentes', type: EventType.DESAPARICIONES, date: new Date('1991-04-12'), description: 'Cinco adolescentes desaparecieron mientras exploraban la fábrica abandonada.', victimas: 2 },
]);

const selectedFilter = ref<string>('TODOS');

const selectedEvent = ref<Event | null>(null);

const filteredEvents = computed(() => {
  if (selectedFilter.value === 'TODOS') return events.value;
  return events.value.filter((event) => EventType[event.type] === selectedFilter.value);
});

function resetFilter() {
  selectedFilter.value = 'TODOS';
}

function resetView() {
  selectedFilter.value = 'TODOS';
  selectedEvent.value = null;
}
</script>

<style>
.list-group-item {
  cursor: pointer;
  transition: background-color 0.3s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
