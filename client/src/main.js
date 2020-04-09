import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/router'
import GAuth from 'vue-google-oauth2'

Vue.config.productionTip = false

const gauthOption = {
  clientId: `${process.env.VUE_APP_G_CLIENT_ID}`,
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
