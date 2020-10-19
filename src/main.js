import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueCurrencyFilter from 'vue-currency-filter'

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
