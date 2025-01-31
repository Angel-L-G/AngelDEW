<template>
    <div>
      <slot></slot>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
        </li>
      </ul>
      <button @click="$router.push(`/blog/add/`)">add</button>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useBlogStore } from '../stores/blog.ts';
    import type Post from '../stores/blog.ts'

    const store = useBlogStore();

    const posts = ref(null);

    onMounted(() => {
        posts.value = store.posts;
        console.log(posts.value)
    });
</script>