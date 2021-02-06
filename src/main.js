import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import axios from 'axios'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'

Vue.use(VueCookies)
Vue.use(Notifications)
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'md'
})

// set default config
Vue.$cookies.config('1d')

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
