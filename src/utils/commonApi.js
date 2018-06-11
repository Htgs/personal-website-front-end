import { ajax } from './ajax';
import {urlPrefix} from './utils.js';

// api通用接口
module.exports = {
	// 获取列表数据
	index(route, params = {}) {
		return new Promise(resolve => {
			ajax('get', urlPrefix(route), params)
				.then(res => {
					resolve(res.data);
				});
		});
	},

	// 显示数据
	show(route, id) {
		return new Promise(resolve => {
			ajax('get', urlPrefix(`${route}/${id}`))
				.then(res => {
					resolve(res.data);
				});
		});
	},

	// 新增数据
	store(route, params, hasFile = false) {
		return new Promise(resolve => {
			ajax('post', urlPrefix(route), params, hasFile)
				.then(res => {
					resolve(res.data);
				});
		});
	},

	// 获取编辑数据
	edit(route, id) {
		return new Promise(resolve => {
			ajax('get', urlPrefix(`${route}/${id}/edit`))
				.then(res => {
					resolve(res.data);
				});
		});
	},

	// 保存编辑数据
	update(route, id, params, hasFile = false) {
		return new Promise(resolve => {
			ajax('put', urlPrefix(`${route}/${id}`), params, hasFile)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					resolve(err);
				});
		});
	},

	// 删除数据
	destroy(route, id) {
		return new Promise(resolve => {
			ajax('delete', urlPrefix(`${route}/${id}`))
				.then(res => {
					resolve(res.data);
				});
		});
	},

	// 验证数据
	check(route, params) {
		return new Promise(resolve => {
			ajax('post', urlPrefix(`${route}/check`), params)
				.then(res => {
					resolve(res.data);
				});
		});
	},

	// 批量删除
	batchDestroy(route, params) {
		return new Promise(resolve => {
			ajax('post', urlPrefix(`${route}/batch-delete`), params)
				.then(res => {
					resolve(res.data);
				});
		});
	},
};
