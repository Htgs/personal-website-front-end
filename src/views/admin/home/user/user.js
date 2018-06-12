import TablePopover from '@/components/common/TablePopover.vue';
import TableImg from '@/components/TableImg.vue';
import FormElUpload from '@/components/common/FormElUpload.vue';
// import validtor from '../../../../public/utils/validator.js'
// import { ajax } from '../../../../public/utils/ajax.js'
import {isArray, isObject} from '@/utils/utils.js';
import customSerializeFn from '@/utils/customSerializeFn.js';
import customEditFn from '@/utils/customEditFn.js';

import {GENDER} from '@/store/staticState.js'

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
					// width: '80',
					// component: DetailLink,
					// props: {
					// 	className: 'block lightHigh miaosu',
					// 	detailUrl: 'detailModel',
					// 	current: 'user',
					// }
				},
				{
					label: '邮箱',
					field: 'email',
					component: TablePopover,
					props: {
						className: 'block miaosu',
					},
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
					label: '真实姓名',
					field: 'realname',
				},
				{
					label: '性别',
					field: 'gender',
				},
				{
					label: '出生日期',
					field: 'birth_date',
					sortable: 'custom',
				},
				{
					label: '手机号码',
					field: 'phone',
				},
			],
			// 表格列特殊值处理
			tableFieldFn: function(data) {
				const g = function(gender) {
					return GENDER[gender];
				};
				if (isArray(data)) {
					data.forEach(v => {
						v.gender = g(v.gender);
					});
				}
				if (isObject(data)) {
					data.gender = g(data.gender);
				}
				return data;
			},
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
