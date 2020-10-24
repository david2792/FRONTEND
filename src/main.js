import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import axios from 'axios'

import VueHtmlToPaper from 'vue-html-to-paper';
import VueCurrencyFilter from 'vue-currency-filter'

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
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
})
axios.defaults.baseURL='http://localhost:3000/api/'
//axios.defaults.baseURL='http://192.168.0.106:3000/api/'
new Vue({
  router,
  store,
  VueCurrencyFilter,
  vuetify,
  render: h => h(App),
  
}).$mount('#app')
