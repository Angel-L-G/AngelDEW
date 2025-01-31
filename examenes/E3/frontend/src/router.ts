// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import index from './views/Index.vue'


const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
  },
  {
    path: '/home',
    name: 'index',
    component: index,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
