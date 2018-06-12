import TablePopover from '@/components/common/TablePopover.vue';

const article = {
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
	hasPaginationBatchDestroy: false,
	// 标题*
	commonTitle: '文章分类管理',
	// 每个标签页的数据
	panelData: {
		'article': {
			// 表格列
			commonTableField: [
				{
					label: '父分类',
					field: 'parent_name',
				},
				{
					label: '分类名称',
					field: 'name',
					// width: '80',
					// component: DetailLink,
					// props: {
					// 	className: 'block lightHigh miaosu',
					// 	detailUrl: 'detailModel',
					// 	current: 'user',
					// }
				},
				{
					label: '备注',
					field: 'memo',
					component: TablePopover,
					props: {
						className: 'block miaosu',
					},
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
						component: 'ElSelect',
						field: 'pid',
						label: '父分类',
						value: null,
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

module.exports = article;
