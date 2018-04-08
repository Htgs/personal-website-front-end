import Vue from 'vue';
import Router from 'vue-router';

import App from '../App.vue';
import Home from '@/views/home';
import Login from '@/views/login';
import NotFound from '@/views/notfound';

import Index from '@/components/index';
import Model from '@/components/model';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			redirect: '/home',
			component: Home,
			children: [
				{
					path: '/home',
					name: 'Index',
					component: Index
				},
				{
					path: '/home/:model',
					name: 'Model',
					component: Model
				},
			],
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
