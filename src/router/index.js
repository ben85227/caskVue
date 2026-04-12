import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',                name: 'home',            component: () => import('../views/Home.vue') },
  { path: '/News',            name: 'news',            component: () => import('../views/News.vue') },
  { path: '/EventDetailPage', name: 'eventDetail',     component: () => import('../views/EventDetailPage.vue') },
  { path: '/Illustrations',   name: 'illustrations',   component: () => import('../views/Illustrations.vue') },
  { path: '/Bar',             name: 'bar',             component: () => import('../views/Bar.vue') },
  { path: '/bar/:id',         name: 'barInner',        component: () => import('../views/BarInnerPage.vue') },
  { path: '/BarRoute',         name: 'barRoute',        component: () => import('../views/BarRoute.vue') },
  { path: '/BarRoute/:id',    name: 'barRouteId',      component: () => import('../views/BarRoute.vue') },
  { path: '/About',           name: 'about',           component: () => import('../views/About.vue') },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
