import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'board',
    component: () => import(/* webpackChunkName: "about" */ '../components/Board.vue'),
  },
  {
    path: '/app',
    name: 'board_app',
    component: () => import(/* webpackChunkName: "about" */ '../components/Board.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router