<script setup lang="ts">
    import type {Hability} from '@/components/HabilityComp/Hability';

    defineProps<{
        hability: Hability;
    }>();
</script>

<template>
    <div class="card bg-dark">
        <div class="card-body">
            <h5 class="card-title text-light">
                <i :class="hability.icon" :style="{ color: hability.color}"></i> 
                {{ hability.title }}
            </h5>
            <p class="card-text text-light">{{ hability.description }}</p>
        </div>
    </div>
</template>