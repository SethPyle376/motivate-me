import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/board',
    name: 'board',
    component: () => import(/* webpackChunkName: "about" */ '../components/Board.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router