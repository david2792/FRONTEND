import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
  ]
}

Vue.use(VueHtmlToPaper, options);
Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:3000/api/'
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
