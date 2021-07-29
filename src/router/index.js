/**
 * @Author: Caven
 * @Date: 2020-03-19 22:24:00
 */

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
