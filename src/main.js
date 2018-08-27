// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// 引入elementui语言
import lang from 'element-ui/lib/locale/lang/zh-CN';
import locale from 'element-ui/lib/locale';
// 引入elementui
import ElementComponents from './assets/elementui.js';

import {ajax} from './utils/ajax.js';
import {urlPrefix} from './utils/utils.js';

import { Message } from 'element-ui';

// 引入样式
require('../static/style/index.scss');

// 设置语言
locale.use(lang);
// Vue调用elementui
Object.keys(ElementComponents).forEach(elComponent => {
	let special = ['Loading', 'MessageBox', 'Notification', 'Message'];
	if (special.includes(elComponent)) {
		// 特殊处理
		switch (elComponent) {
		case 'Loading':
			Vue.use(ElementComponents[elComponent].directive);
			Vue.prototype.$loading = ElementComponents[elComponent].service;
			break;
		case 'MessageBox':
			Vue.prototype.$msgbox = ElementComponents[elComponent];
			Vue.prototype.$alert = ElementComponents[elComponent].alert;
			Vue.prototype.$confirm = ElementComponents[elComponent].confirm;
			Vue.prototype.$prompt = ElementComponents[elComponent].prompt;
			break;
		case 'Message':
			Vue.prototype.$message = ElementComponents[elComponent];
			break;
		case 'Notification':
			Vue.prototype.$notify = ElementComponents[elComponent];
			break;
		};
	} else {
		Vue.use(ElementComponents[elComponent]);
	}
});

// router.beforeEach((to, from, next) => {
// 	// console.log(to);
// 	// console.log(from);
// 	// if (to.path === from.path) {
// 	// 	ajax('get', urlPrefix('auth'))
// 	// 		.then(res => {
// 	// 			console.log(res);
// 	// 			next();
// 	// 		})
// 	// 		.catch(err => {
// 	// 			// 未登录直接跳转到登录页面
// 	// 			if (err.response.status === 401) {
// 	// 				next('/login');
// 	// 			}
// 	// 		});
// 	// } else {
// 	// 	next();
// 	// }
// 	next();
// });

// router.afterEach((to, from) => {
// 	// ...
// });

// Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
// 	el: '#app',
// 	router,
// 	store,
// 	components: { App },
// 	template: '<App/>'
// });

// Add a request interceptor
axios.interceptors.request.use(function(config) {
	if (sessionStorage.getItem('b-token')) {
		config.headers = Object.assign(config.headers, {'Authorization': sessionStorage.getItem('b-token'), 'sign': sessionStorage.getItem('b-sign')});
	}
	// Do something before request is sent
	return config;
}, function(error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response) {
	// Do something with response data
	return response;
}, function(error) {
	console.dir(error);
	if (error.response && error.response.status === 401) {
		Message({
			message: '未通过授权',
			type: 'error',
		});
	} else if (error.response && error.response.status === 404) {
		Message({
			message: '请求接口不存在',
			type: 'error',
		});
	} else if (error.response && error.response.status === 422) {
		Message({
			message: error.response.data,
			type: 'error',
		});
	} else {
		if (error.response && error.response.data) {
			Message({
				message: error.response.data,
				type: 'error',
			});
		} else {
			Message({
				message: '服务器错误',
				type: 'error',
			});
		}
	}
	// Do something with response error
	return Promise.reject(error);
});

// ajax('get', urlPrefix('token'))
// 	.then(res => {
// 		// Add a request interceptor
// 		axios.interceptors.request.use(function(config) {
// 			// Do something before request is sent
// 			config.headers = Object.assign(config.headers, {'X-CSRF-TOKEN': res.data});
// 			return config;
// 		}, function(error) {
// 			// Do something with request error
// 			return Promise.reject(error);
// 		});
// 		new Vue({
// 			el: '#app',
// 			router,
// 			store,
// 			components: { App },
// 			template: '<App/>'
// 		});
// 	})
// 	.catch(err => {
// 		console.dir(err);
// 	});

new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
});
