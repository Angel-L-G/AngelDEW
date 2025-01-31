<template>
    <form @submit.prevent="savePost">
      <input v-model="post.title" placeholder="{{ $t('title') }}" required />
      <textarea v-model="post.content" placeholder="{{ $t('content') }}" required></textarea>
      <button type="submit">{{ $t('save') }}</button>
    </form>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useBlogStore } from '../stores/blog.ts';

  const store = useBlogStore();
  const route = useRoute();
  const router = useRouter();
  const post = ref({id: '', title: '', content: '', author: '' });

  const savePost = () => {
    let user = localStorage.getItem('user')
    let parsedUser = JSON.parse(user!);
    post.value.author = parsedUser.user.email;
    
    post.value.id = ''+(store.posts.length+1)
    store.addPost(post);
  };
</script>