import { defineStore } from 'pinia';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref } from 'vue'

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

export const useBlogStore = defineStore('blog',() => {
    const samplePosts: Post[] = [
        { id: '1', title: 'Vue 3 Basics', content: 'Introduction to Vue 3...', author: 'Alice@gmail.com' },
        { id: '2', title: 'Pinia for State Management', content: 'Using Pinia in Vue...', author: 'Bob@gmail.com' },
        { id: '3', title: 'Vue Router Explained', content: 'Navigating in Vue...', author: 'Charlie@gmail.com' }
    ];

    const posts = ref<Array<Post>>(samplePosts);

    function getPosts() {
        return posts.value
    }

    const addPost = (post: Post) => {
        posts.value.push(post.value);
    };

    const editPost = (post: Post) => {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
            this.posts[index] = post;
        }
    };

    return {posts, getPosts, addPost, editPost, samplePosts}
});