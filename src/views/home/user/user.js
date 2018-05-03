import tablePopover from '../../../components/common/TablePopover.vue';
import FormELUpload from '../../../components/common/FormELUpload.vue';
// import validtor from '../../../../public/utils/validator.js'
// import { ajax } from '../../../../public/utils/ajax.js'
import {isArray, isObject} from '../../../utils/utils.js';
import {FormELUpload as avatarSerialize} from '../../../utils/customSerializeFn.js';
import {FormELUpload as avatarEdit} from '../../../utils/customEditFn.js';

const user = {
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
	hasPaginationBatchDestroy: false,
	// 标题*
	commonTitle: '用户管理',
	// 每个标签页的数据
	panelData: {
		user: {
			// 条件刷选
			commonConditionComponents: [],
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
					component: tablePopover,
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
				},
				{
					label: '真实姓名',
					field: 'realname',
				},
				{
					label: '性别',
					field: 'gender',
					sortable: 'custom',
				},
				{
					label: '出生日期',
					field: 'birth_date',
					sortable: 'custom',
				},
				{
					label: '手机号码',
					field: 'phone',
					sortable: 'custom',
				},
			],
			// 表格列特殊值处理
			tableFieldFn: function(data) {
				const g = function(gender) {
					return gender === 1 ? '女' : '男';
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
			commonFormFieldsFn() {
				return [
					{
						component: 'ElInput',
						field: 'name',
						label: '用户名',
						// required 默认为true
						// 根据rules传入的方法数据动态设置验证方法
						// rules: [
						// 	{
						// 		method: 'lngValid',
						// 		params: {
						// 			lng: 255
						// 		}
						// 	},
						// 	{
						// 		method: 'checkValid',
						// 		trigger: 'blur',
						// 		params: {
						// 			cfield: 'name',
						// 		}
						// 	}
						// ],
						value: null,
					},
					{
						component: 'ElInput',
						field: 'email',
						label: '邮箱',
						// rules: [
						// 	{
						// 		method: 'fixedLngValid',
						// 		params: {
						// 			lng: 4
						// 		}
						// 	}
						// ],
						value: null,
					},
					{
						component: 'ElInput',
						inputType: 'password',
						field: 'password',
						label: '密码',
						// rules: [
						// 	{
						// 		method: 'fixedLngValid',
						// 		params: {
						// 			lng: 4
						// 		}
						// 	}
						// ],
						value: null,
					},
					{
						component: 'ElInput',
						field: 'niname',
						label: '昵称',
						value: null,
					},
					{
						component: FormELUpload,
						field: 'avatar',
						label: '头像',
						required: false,
						value: [],
						customSerializeFn: avatarSerialize,
						customEditFn: avatarEdit,
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
								name: '男',
								id: 0
							},
							{
								name: '女',
								id: 1
							},
						],
						value: null,
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
						field: 'phone',
						label: '手机号码',
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
