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

// Add a response interceptor
axios.interceptors.response.use(function(response) {
	// Do something with response data
	return response;
}, function(error) {
	// Do something with response error
	// let msg = '';
	// if (error.response && error.response.status === 401) {
	// 	msg = '未登录或者权限不足';
	// } else if (error.response && error.response.status === 404) {
	// 	msg = '请求接口不存在';
	// } else if (error.response && error.response.status === 500) {
	// 	msg = '服务器错误';
	// } else if (error.response && error.response.status === 504) {
	// 	msg = '请求超时';
	// } else {
	// 	msg = '请求错误';
	// }
	// error = Object.assign(error, {msg: msg});
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
