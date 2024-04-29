import { createRouter, createWebHistory } from 'vue-router'
import GameView from './views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('./views/OrdersView.vue')
    },
    {
      path: '/fire',
      name: 'fire',
      component: () => import('./views/FireView.vue')
    },
    {
      path: '/losses',
      name: 'losses',
      component: () => import('./views/LossesView.vue')
    }
  ]
})

export default router
