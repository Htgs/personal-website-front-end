// 后台管理路由

import Login from '@/views/admin/login';
import Index from '@/views/admin/index';
import NotFound from '@/views/admin/notfound';

import Person from '@/views/admin/home/user/person.vue';
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
				path: '/admin/person',
				name: 'Person',
				component: Person
			},
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
