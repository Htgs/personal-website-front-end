import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home';
import Login from '@/views/login';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
	]
});
