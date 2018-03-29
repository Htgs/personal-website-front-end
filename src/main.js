// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// 引入elementui
import ElementComponents from './assets/elementui.js';
Object.keys(ElementComponents).forEach(elCOmponent => {
	Vue.use(elCOmponent);
});

router.beforeEach((to, from, next) => {
	axios.get('/api/token')
		.then(res => {
			console.log(res)
		})
});

router.afterEach((to, from) => {
	// ...
});

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
});
