import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'swiper/dist/css/swiper.css'
import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;
// axios.default.baseUrl = 'http://192.168.124.18:3000/'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
