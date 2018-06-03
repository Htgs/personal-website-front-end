// 后台管理路由

import Login from '@/views/admin/login';
import Index from '@/views/admin/index';
import NotFound from '@/views/admin/notfound';

import Home from '@/views/admin/home/index.vue';
import Model from '@/views/admin/home/model.vue';

module.exports = [
	{
		path: '/admin/login',
		name: 'AdminLogin',
		component: Login
	},
	{
		path: '/admin',
		name: 'AdminIndex',
		redirect: '/admin/home',
		component: Index,
		children: [
			{
				path: '/admin/home',
				name: 'AdminHome',
				component: Home
			},
			{
				path: '/admin/:model',
				name: 'Model',
				component: Model
			},
			{
				path: '/admin/:model/:id',
				name: 'ModelDetail',
				component: Model
			},
			{
				path: '/admin/404',
				name: 'AdminNotFound',
				component: NotFound
			},
		],
	},
];
