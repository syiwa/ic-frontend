import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import store from './stores'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(
	BootstrapVue, 
	axios, 
)

Vue.config.productionTip = false

document.title = 'ICSG Test'

window._ = require('underscore');

axios.defaults.baseURL = 'http://localhost:8000/api';

axios.interceptors.response.use(function (response) {
	switch(response.data._meta.code){
		case 401: {
	  		store.dispatch('notification/show', `You must login to access the page.`)
			router.push('/')
		}break;

		case 403: {
	  		store.dispatch('notification/show', `You are not authorized to access the page.`)
			router.push('/dashboard')
		}break;

		default:{
			return response;
		}
	}
}, function (error) {
	return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')