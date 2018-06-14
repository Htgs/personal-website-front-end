import TablePopover from '@/components/common/TablePopover.vue';
import FormAjaxElSelect from '@/components/common/FormAjaxElSelect.vue';
import TableCacheName from '@/components/TableCacheName.vue';
import TableTime from '@/components/TableTime.vue';

import {ajax} from '@/utils/ajax.js';
import {urlPrefix} from '@/utils/utils.js';

const articleCategory = {
	// 是否显示设置
	hasTitleBack: false,
	hasTabs: false,
	hasConditionSearch: true,
	hasConditionAdd: true,
	hasConditionRefresh: true,
	hasTableSelection: false,
	hasTableIndex: true,
	hasTableOperation: true,
	hasTableOperationEdit: true,
	hasTableOperationDelete: true,
	hasTableOperationRecovery: true,
	hasPaginationBatchDestroy: false,
	// 标题*
	commonTitle: '文章分类管理',
	// 每个标签页的数据
	panelData: {
		'article-category': {
			vuxcache(vm) {
				ajax('get', urlPrefix(`${vm.route}/all`))
					.then(res => {
						vm.$store.commit('SET_CACHE_DATA', {
							cache: 'ARTICLE_CATEGORY',
							data: res.data,
						});
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 表格列
			commonTableField: [
				{
					label: '父分类',
					field: 'pid',
					component: TableCacheName,
					props: {
						cache: 'ARTICLE_CATEGORY',
						rowName: 'name',
					},
				},
				{
					label: '分类名称',
					field: 'name',
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
						field: 'pid',
						label: '父分类',
						required: false,
						value: undefined,
						getDataFn(vm) {
							// return vm.$store.dispatch('getStaticData', {
							// 	cache: 'ARTICLE_CATEGORY',
							// 	url: urlPrefix(`${vm.route}/all`),
							// });
							return new Promise((resolve) => {
								vm.$store.dispatch('getStaticData', {
									cache: 'ARTICLE_CATEGORY',
									url: urlPrefix(`${vm.route}/all`),
								})
									.then(data => {
										// 已经成为了子分类的数据不能再作为父分类
										resolve(data.filter(item => item.pid === null));
									});
							});
						},
					},
					{
						component: 'ElInput',
						field: 'name',
						label: '分类名称',
						// required 默认为true
						// 根据rules传入的方法数据动态设置验证方法
						rules: [
							{
								method: 'lengthValid',
								params: {
									length: [2, 10],
								},
							},
							{
								method: 'checkValid',
								trigger: 'blur',
								params: {
									cfield: 'name',
								}
							},
						],
						value: null,
					},
					{
						component: 'ElInput',
						inputType: 'textarea',
						field: 'memo',
						label: '备注',
						required: false,
						value: null,
					},
				];
			},
		},
	},
};

module.exports = articleCategory;
