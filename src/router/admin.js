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
		redirect: '/admin/user',
		component: Index,
		children: [
			{
				path: '/admin/:model',
				name: 'Model',
				component: Model
			},
			{
				path: '/admin/*',
				name: 'AdminNotFound',
				component: NotFound
			},
		],
	},
];
