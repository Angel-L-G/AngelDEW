import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Proyectos from '../views/Proyectos.vue'
import Contacto from '../views/Contacto.vue'
import Habilidades from '../views/Habilidades.vue'
import Experiencia from '../views/Experiencia.vue'
import Login from '../views/Login.vue'
import Register from '../views/RegisterView.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'
import BlogForm from '../views/BlogForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: Proyectos,
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto,
    },
    {
      path: '/habilidades',
      name: 'habilidades',
      component: Habilidades,
    },
    {
      path: '/experiencia',
      name: 'experiencia',
      component: Experiencia,
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      component: BlogPost,
    },
    {
      path: '/blog/add',
      name: 'add-post',
      component: BlogForm,
    },
  ],
})

export default router
