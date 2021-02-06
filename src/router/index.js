import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

  { path: '/login', name: 'Login', component: () => import('../layouts/Login.vue') },  
  { path: '/home', name: 'Home', component: () => import('../layouts/Main_Layout.vue'), 
      children: [ 
        { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue') },
        { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue') },
        { path: '/account', name: 'Account', component: () => import('../views/Account.vue') },
      ]},
  { path: '/user_profile', name: 'UserProfile', component: () => import ('../layouts/Main_Profile.vue'), 
      query: { id: '' }},  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layouts/Main_Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
