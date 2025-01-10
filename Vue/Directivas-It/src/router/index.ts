import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Globos from '../views/Globos.vue'
import Events from '../views/Events.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/globos',
      name: 'globos',
      component: Globos,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    },
  ],
})

export default router
