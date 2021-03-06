import ElButton from '@/components/common/ElButton.vue';
import FormAjaxElSelect from '@/components/common/FormAjaxElSelect.vue';
import TableCacheName from '@/components/TableCacheName.vue';
import TableTime from '@/components/TableTime.vue';
import TableDetail from '@/components/TableDetail.vue';

import {urlPrefix} from '@/utils/utils.js';

import FormMDEditor from './components/FormMDEditor.vue';
import FormKeywords from './components/FormKeywords.vue';

/**
 * getAllChildren 获取全部分类
 * @Author   szh
 * @DateTime 2018-06-13
 * @param    {Array}   data      分类数据
 * @param    {Array}   parentArr 上一级递归传递的分类数据
 * @return   {Array}             最底层的分类信息
 */
function getAllChildren(data, parentArr = []) {
	let allChildren = [];
	if (parentArr.length === 0) {
		// 如果是最开始的递归，则把传入的分类数据设置为父级数据
		parentArr = data;
	}
	data.forEach((item, idx, arr) => {
		// 判断是否是父分类
		if (parentArr.find(f => f.pid === item.id)) {
			// // 获取全部当前父分类的子分类
			let children = parentArr.filter(f => f.pid === item.id);
			allChildren = allChildren.concat(getAllChildren(children, parentArr));
		} else {
			allChildren.push(item);
		}
	});
	// 使用Set去重
	let res = new Set();
	allChildren.forEach(item => {
		res.add(item);
	});
	return Array.from(res);
}

const article = {
	// 是否显示设置
	hasTitleBack: false,
	hasTabs: false,
	hasConditionSearch: true,
	hasConditionAdd: true,
	hasConditionRefresh: true,
	hasTableSelection: true,
	hasTableIndex: true,
	hasTableOperation: true,
	hasTableOperationEdit: true,
	hasTableOperationDelete: true,
	hasTableOperationRecovery: true,
	hasPaginationBatchDestroy: true,
	// 标题*
	commonTitle: '文章管理',
	// 每个标签页的数据
	panelData: {
		'article': {
			// commonOperationComponents: [
			// 	{
			// 		component: ElButton,
			// 		props: {
			// 			type: 'primary',
			// 			display_name: '新增',
			// 			clickFn: (vm, scope) => {
			// 				vm.$router.push('/admin/article/detail');
			// 			},
			// 		},
			// 	},
			// ],
			// 表格列
			commonTableField: [
				{
					label: '作者用户名',
					field: 'user.name', // 关联数据的字段
				},
				{
					label: '作者昵称',
					field: 'user.niname', // 关联数据的字段
				},
				{
					label: '文章分类',
					field: 'category_id',
					component: TableCacheName,
					props: {
						cache: 'ARTICLE_CATEGORY',
						rowName: 'name',
					},
				},
				{
					label: '文章标题',
					field: 'title',
					component: TableDetail,
					props: {
						model: 'ARTICLE',
						// 缓存中获取的数据
						caches: [
							{
								field: 'category_id',
								props: {
									cache: 'ARTICLE_CATEGORY',
									rowName: 'name',
								},
							},
						],
					},
				},
				{
					label: '关键词',
					field: 'keywords',
				},
				{
					label: '是否公开',
					field: 'is_public',
					component: TableCacheName,
					props: {
						cache: 'IS_PUBLIC',
					},
				},
				{
					label: '创建时间',
					field: 'created_at',
					component: TableTime,
				},
				{
					label: '更新时间',
					field: 'updated_at',
					component: TableTime,
				},
				{
					label: '删除时间',
					field: 'deleted_at',
					component: TableTime,
				},
			],
			// commonTableOperationComponents: [
			// 	{
			// 		component: ElButton,
			// 		props: {
			// 			type: 'text',
			// 			display_name: '详情',
			// 			clickFn: (vm, scope) => {
			// 				vm.$router.push(`/admin/article/detail?id=${scope.row.id}`);
			// 			},
			// 		},
			// 	},
			// ],
			// 分页设定
			commonPaginationSetting: {
				className: '',
				layout: 'total, prev, pager, next, jumper',
			},
			// 默认表单域
			commonFormFieldsFn(type) {
				return [
					{
						component: FormAjaxElSelect,
						field: 'category_id',
						label: '文章分类',
						value: undefined,
						getDataFn(vm) {
							return new Promise((resolve) => {
								vm.$store.dispatch('getStaticData', {
									cache: 'ARTICLE_CATEGORY',
									url: urlPrefix(`/admin/article-category/all`),
								})
									.then(data => {
										resolve(getAllChildren(data));
									});
							});
						},
					},
					{
						component: 'ElInput',
						field: 'title',
						label: '文章标题',
						rules: [
							{
								method: 'lengthValid',
								params: {
									length: [2, 50],
								},
							},
						],
						value: null,
					},
					{
						type,
						component: FormKeywords,
						field: 'keywords',
						label: '关键词',
						value: null,
					},
					{
						type,
						component: FormMDEditor,
						field: 'content',
						label: '内容',
						value: '',
					},
					{
						component: 'ElRadio',
						field: 'is_public',
						label: '是否公开',
						radioList: [
							{
								id: '0',
								name: '不公开',
							},
							{
								id: '1',
								name: '公开',
							},
						],
						value: '1',
					},
				];
			},
		},
	},
};

module.exports = article;
