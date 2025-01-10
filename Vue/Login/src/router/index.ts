import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import index from '@/views/index.vue'
import { loginWithToken, logoutUser } from '@/services/firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: login,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      beforeEnter: (to, from, next) => {
        setTimeout(() => {
          const user = localStorage.getItem('user');
          if (!user) {
            next({ name: 'login' });
          } else {
            next();
          }
        }, 0);
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: {},
      beforeEnter: (to, from, next) => {
        logoutUser();
        next({ name: 'login' });
      }
    },
  ],
})

export default router
