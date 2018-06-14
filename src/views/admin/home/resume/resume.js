// import FormAjaxElSelect from '@/components/common/FormAjaxElSelect.vue';
// import TableCacheName from '@/components/TableCacheName.vue';
import TableTime from '@/components/TableTime.vue';
// import TableDetail from '@/components/TableDetail.vue';

// import {urlPrefix} from '@/utils/utils.js';

const resume = {
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
	commonTitle: '简历管理',
	// 每个标签页的数据
	panelData: {
		'resume': {
			// 表格列
			commonTableField: [
				// {
				// 	label: '文章分类',
				// 	field: 'category_id',
				// 	component: TableCacheName,
				// 	props: {
				// 		cache: 'ARTICLE_CATEGORY',
				// 		rowName: 'name',
				// 	},
				// },
				{
					label: '文章标题',
					field: 'title',
				},
				// {
				// 	label: '是否公开',
				// 	field: 'is_public',
				// 	component: TableCacheName,
				// 	props: {
				// 		cache: 'IS_PUBLIC',
				// 	},
				// },
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
									length: [5, 50],
								},
							},
						],
						value: null,
					},
					{
						component: 'ElInput',
						inputType: 'textarea',
						field: 'content',
						label: '内容',
						rules: [
							{
								method: 'lengthValid',
								params: {
									length: [5, 50],
								},
							},
						],
						value: null,
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

module.exports = resume;
