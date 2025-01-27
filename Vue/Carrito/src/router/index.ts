import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue';
import Cart from '@/components/Cart.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ProductList,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductList,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
  ],
})

export default router
