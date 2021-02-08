import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'

Vue.use(VueRouter)

  const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
  })

  router.beforeEach((to, from, next) => {

    const public_pages = ['/login','', '/user_profile']
    const auth_required = !public_pages.includes(to.path);
    const auth_off = public_pages.includes(to.path);

    let token = $cookies.get('token');

    if(auth_required && !token) {
      return next('/login');
    }

    if (auth_off && token) {
      $cookies.remove('token')
    }

    next();

  });

 
export default router

