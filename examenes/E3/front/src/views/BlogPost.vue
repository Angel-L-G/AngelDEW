<template>
  <div v-if="post">
    <div>
        <h1>{{ post.title }}</h1>
        <h3>{{ post.author }}</h3>
        <p>{{ post.content }}</p>
    </div>
    <div>
        <h1>Editar Post</h1>
        <form @submit.prevent="updatePost">
            <label for="title">Título:</label>
            <input id="title" v-model="post.title" type="text" required />
            
            <label for="content">Contenido:</label>
            <textarea id="content" v-model="post.content" required></textarea>
            
            <button type="submit">Guardar</button>
            <button type="button" @click="$router.push(`/blog/${post.id}`)">Cancelar</button>
        </form>
    </div>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useBlogStore } from '../stores/blog.ts';
    import type Post from '../stores/blog.ts';

    const route = useRoute();
    const router = useRouter();
    const store = useBlogStore();
    const post = ref<Post | null>(null);

    onMounted(() => {
        post.value = store.posts.find(p => p.id === route.params.id) || null;
        console.log(post.value);
    });

    const updatePost = () => {
        let user = localStorage.getItem('user')
        let parsedUser = JSON.parse(user!);
        let author = parsedUser.user.email;

        if (post.value && (post.value.author == author)) {
            store.updatePost(post.value);
            router.push(`/blog/${post.value.id}`);
        }else {
            alert("No puedes editar un post que no es tuyo")
            window.location.reload();
        }
    };
</script>