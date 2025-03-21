import { createRouter, createWebHistory } from 'vue-router'

import { Home, Auth } from 'frontend/src/pages'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Auth,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
  ],
})
