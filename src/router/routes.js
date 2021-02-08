const routes = [

    { path: '', alias: '/login', name: 'Login', component: () => import('../layouts/Login.vue') },  
    { path: '/home', name: 'Home', component: () => import('../layouts/Main_Layout.vue'), 
        children: [ 
            { path: '', name: 'Posts', component: () => import('../views/Home.vue') },  
            { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue') },
            { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue') },
            { path: '/account', name: 'Account', component: () => import('../views/Account.vue') },
        ]},
    { path: '/user_profile', name: 'UserProfile', component: () => import ('../layouts/Main_Profile.vue'), query:{id:''}},
    { path: '*', component: () => import('../views/Error404.vue') },
    {
      path: '/about', name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
]



// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
      path: '*',
      component: () => import('../views/Error404.vue')
    })
}

export default routes