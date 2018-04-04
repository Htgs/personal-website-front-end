import Vue from 'vue';
import Router from 'vue-router';

import App from '../App.vue';
import Home from '@/views/home';
import Login from '@/views/login';
import NotFound from '@/views/notfound';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/*',
			name: 'NotFound',
			component: NotFound
		},
	]
});
