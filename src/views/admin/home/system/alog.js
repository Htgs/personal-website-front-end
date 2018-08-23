// import FormAjaxElSelect from '@/components/common/FormAjaxElSelect.vue';
// import TableCacheName from '@/components/TableCacheName.vue';
import TableTime from '@/components/TableTime.vue';
// import TableDetail from '@/components/TableDetail.vue';

// import {urlPrefix} from '@/utils/utils.js';

const alog = {
	// 是否显示设置
	hasTitleBack: false,
	hasTabs: false,
	hasConditionSearch: true,
	hasConditionAdd: false,
	hasConditionRefresh: true,
	hasTableSelection: false,
	hasTableIndex: true,
	hasTableOperation: false,
	hasTableOperationEdit: false,
	hasTableOperationDelete: false,
	hasTableOperationRecovery: false,
	hasPaginationBatchDestroy: false,
	// 标题*
	commonTitle: '日志管理',
	// 每个标签页的数据
	panelData: {
		'alog': {
			// 表格列
			commonTableField: [
				{
					label: '用户名',
					field: 'user.name', // 关联数据的字段
				},
				{
					label: '模块',
					field: 'model',
				},
				{
					label: '操作类型',
					field: 'type', // 1为登录，2为登出，3为新增，4为更新，5为删除
				},
				{
					label: '内容',
					field: 'content',
				},
				{
					label: 'ip',
					field: 'ip地址',
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
			],
			// 分页设定
			commonPaginationSetting: {
				className: '',
				layout: 'total, prev, pager, next, jumper',
			},
			// 默认表单域
			commonFormFieldsFn(type) {
				return [];
			},
		},
	},
};

module.exports = alog;
