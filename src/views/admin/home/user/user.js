import FormElUpload from '@/components/common/FormElUpload.vue';

import TableImg from '@/components/TableImg.vue';
import TableCacheName from '@/components/TableCacheName.vue';
import TableTime from '@/components/TableTime.vue';
import TableDetail from '@/components/TableDetail.vue';

import {isArray, isObject} from '@/utils/utils.js';
import customSerializeFn from '@/utils/customSerializeFn.js';
import customEditFn from '@/utils/customEditFn.js';

// import {GENDER} from '@/store/staticState.js';

const user = {
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
	commonTitle: '用户管理',
	// 每个标签页的数据
	panelData: {
		user: {
			// 表格列
			commonTableField: [
				{
					label: '用户名',
					field: 'name',
					component: TableDetail,
					props: {
						model: 'USER',
					},
					// width: '80',
					// props: {
					// 	className: 'block lightHigh miaosu',
					// 	detailUrl: 'detailModel',
					// 	current: 'user',
					// }
				},
				{
					label: '邮箱',
					field: 'email',
				},
				{
					label: '昵称',
					field: 'niname',
				},
				{
					label: '头像',
					field: 'avatar',
					component: TableImg,
					props: {
						name: 'name',
					},
				},
				{
					label: '手机号码',
					field: 'phone',
				},
				{
					label: '真实姓名',
					field: 'realname',
				},
				{
					label: '性别',
					field: 'gender',
					component: TableCacheName,
					props: {
						cache: 'GENDER',
						// rowName: 'name',
					},
				},
				{
					label: '出生日期',
					field: 'birth_date',
					sortable: 'custom',
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
			// 表格列特殊值处理
			// tableFieldFn: function(data) {
			// 	const g = function(gender) {
			// 		return GENDER[gender];
			// 	};
			// 	if (isArray(data)) {
			// 		data.forEach(v => {
			// 			v.gender = g(v.gender);
			// 		});
			// 	}
			// 	if (isObject(data)) {
			// 		data.gender = g(data.gender);
			// 	}
			// 	return data;
			// },
			// 分页设定
			commonPaginationSetting: {
				className: '',
				layout: 'total, prev, pager, next, jumper',
			},
			// 默认表单域
			commonFormFieldsFn(type) {
				return [
					{
						component: 'ElInput',
						field: 'name',
						label: '用户名',
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
						field: 'email',
						label: '邮箱',
						rules: [
							{
								method: 'patternValid',
								params: {
									pattern: 'email',
								},
							},
							{
								method: 'checkValid',
								trigger: 'blur',
								params: {
									cfield: 'email',
								}
							},
						],
						value: null,
					},
					{
						component: 'ElInput',
						field: 'phone',
						label: '手机号码',
						rules: [
							{
								method: 'patternValid',
								params: {
									pattern: 'phone',
								},
							},
							{
								method: 'checkValid',
								trigger: 'blur',
								params: {
									cfield: 'phone',
								}
							},
						],
						value: null,
					},
					{
						component: 'ElInput',
						field: 'niname',
						label: '昵称',
						rules: [
							{
								method: 'lengthValid',
								params: {
									length: [2, 6],
								},
							},
						],
						value: null,
					},
					{
						component: FormElUpload,
						field: 'avatar',
						label: '头像',
						required: false,
						value: [],
						customSerializeFn: customSerializeFn.FormElUpload,
						customEditFn: customEditFn.FormElUpload,
					},
					{
						component: 'ElInput',
						field: 'realname',
						label: '真实姓名',
						required: false,
						value: null,
					},
					{
						component: 'ElRadio',
						field: 'gender',
						label: '性别',
						radioList: [
							{
								name: '保密',
								id: '0'
							},
							{
								name: '男',
								id: '1'
							},
							{
								name: '女',
								id: '2'
							},
						],
						value: '0',
					},
					{
						component: 'ElDate',
						field: 'birth_date',
						label: '出生日期',
						required: false,
						pickerOptions: {
							disabledDate(time) {
								return time.getTime() > Date.now();
							},
						},
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

module.exports = user;
