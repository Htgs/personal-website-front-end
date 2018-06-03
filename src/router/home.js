// 前端页面路由

import Index from '@/views/home/index';

module.exports = [
	{
		path: '/',
		// redirect: '/home',
		name: 'Index',
		component: Index,
	},
];
