import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    // mode: 'history',
    routes: [
      {
        path: '/',
        name: 'login',
        component: Login
        // () =>           import(/* webpackChunkName: "home" */ './views/Home.vue')
      },
      {
        path: '/home',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ './views/Home.vue')
      }
    ]
  })
  return router
}
