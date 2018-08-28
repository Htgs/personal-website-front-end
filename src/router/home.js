// 前端页面路由

import Index from '@/views/home/index';
import Articles from '@/views/home/articles';
import Article from '@/views/home/article';
import Me from '@/views/home/me';
import NotFound from '@/views/home/NotFound';

module.exports = [
	{
		path: '/',
		name: 'Index',
		component: Index,
		// redirect: '/article',
		children: [
			{
				path: '/article',
				name: 'articles',
				alias: '/',
				component: Articles,
			},
			{
				path: '/article/:id',
				name: 'article',
				component: Article,
			},
			{
				path: '/about-me',
				name: 'me',
				component: Me,
			},
			{
				path: '/NotFound',
				name: 'NotFound',
				component: NotFound
			},
		],
	},
];
