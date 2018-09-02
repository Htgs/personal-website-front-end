import ElButton from '@/components/common/ElButton.vue';
import FormAjaxElSelect from '@/components/common/FormAjaxElSelect.vue';
import TableTime from '@/components/TableTime.vue';
import TableDetail from '@/components/TableDetail.vue';

import {show} from '@/utils/commonApi.js';

const comment = {
	// 是否显示设置
	hasTitleBack: false,
	hasTabs: false,
	hasConditionSearch: true,
	hasConditionAdd: false,
	hasConditionRefresh: true,
	hasTableSelection: false,
	hasTableIndex: true,
	hasTableOperation: true,
	hasTableOperationEdit: false,
	hasTableOperationDelete: true,
	hasTableOperationRecovery: true,
	hasPaginationBatchDestroy: false,
	// 标题*
	commonTitle: '评论管理',
	// 每个标签页的数据
	panelData: {
		'comment': {
			// 表格列
			commonTableField: [
				{
					label: '回复评论',
					field: 'pid',
					component: TableDetail,
					props: {
						model: 'COMMENT',
						// 缓存中获取的数据
						// caches: [
						// 	{
						// 		field: 'category_id',
						// 		props: {
						// 			cache: 'ARTICLE_CATEGORY',
						// 			rowName: 'name',
						// 		},
						// 	},
						// ],
					},
				},
				{
					label: '用户',
					field: 'user_id',
					component: TableDetail,
					props: {
						model: 'USER',
						// 缓存中获取的数据
						// caches: [
						// 	{
						// 		field: 'category_id',
						// 		props: {
						// 			cache: 'ARTICLE_CATEGORY',
						// 			rowName: 'name',
						// 		},
						// 	},
						// ],
					},
				},
				{
					label: '评论文章',
					field: 'article_id',
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
					label: '评论人',
					field: 'user_name',
				},
				{
					label: '评论人邮箱',
					field: 'user_email',
				},
				{
					label: '评论人网站',
					field: 'user_website',
				},
				{
					label: '评论',
					field: 'content',
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
						label: '上级评论',
						value: undefined,
						getDataFn(vm) {
							return new Promise((resolve) => {
							});
						},
					},
					{
						component: FormAjaxElSelect,
						field: 'article_id',
						label: '评论文章',
						value: undefined,
						getDataFn(vm) {
							return new Promise((resolve) => {
							});
						},
					},
					{
						component: FormAjaxElSelect,
						field: 'user_id',
						label: '用户',
						value: undefined,
						required: false,
						getDataFn(vm) {
							return new Promise((resolve) => {
							});
						},
					},
					{
						component: 'ElInput',
						field: 'user_name',
						label: '评论人',
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
						field: 'user_email',
						label: '评论人邮箱',
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
						field: 'user_website',
						label: '评论人网站',
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
				];
			},
		},
	},
};

module.exports = comment;
