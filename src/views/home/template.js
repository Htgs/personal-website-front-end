// 模板数据

// import ElSelect from '../../../../public/components/commonElSelect.vue'
import ElButton from '../../../../public/components/commonElButton.vue'
import DetailLink from '../../../../public/components/commonDetailLink.vue'
import ElSwitch from '../../../../public/components/commonElSwitch.vue'
import Uploader from '../../../../public/components/commonUploader.vue'

import validtor from '../../../../public/utils/validator.js'
import { ajax } from '../../../../public/utils/ajax.js'

import selfPowerDialog from './components/selfPowerDialog.vue'

/**
 * [customSerializeFn 自定义表单序列化对象]
 * @Author   szh
 * @DateTime 2018-04-09
 * @param    {Object}   item [传递给后台的数据]
 * @return   {Object}        [序列化后的新对象]
 */
function customSerializeFn (item) {
	let obj = {}
	if (item.value instanceof Blob) {
		obj['_hasfile'] = true
	}
	obj[item['field']] = item['value']
	return obj
}

function getAllPermissionCategory (vm) {
	return vm.$store.dispatch('getStaticData', {
		vm: vm,
		arr: 'OPERATION_PERMISSIONCATEGORY',
		url: '/api/common/permission-category/all-permission-categories'
	})
}

const template = {
	// 是否显示设置
	hasTitleBack: false,
	hasTabs: false,
	hasConditionStatusSelect: true,
	hasConditionSearch: true,
	hasConditionAdd: true,
	hasConditionRefresh: true,
	hasTableSelection: true,
	hasTableIndex: true,
	hasTableOperation: true,
	hasTableOperationEdit: true,
	hasTableOperationDelete: true,
	hasPaginationBatchDestroy: true,
	// 标题*
	commonTitle: '入驻公司管理',
	// 标签页
	// commonTabs: {
	// 	// type: 'card',
	// 	lists: [
	// 		{
	// 			display_name: '测试赛',
	// 			name: 'tes',
	// 			disabled: false,
	// 		},
	// 		{
	// 			display_name: 'ddd',
	// 			name: 'ddd',
	// 		},
	// 	]
	// },
	// 添加自定义组件插槽
	// commonTitleBeforeComponent: '',
	// commonTabsBeforeComponent: '',
	// 每个标签页的数据
	panelData: {
		template: {
			// 条件刷选
			commonConditionComponents: [
				// {
				// 	component: ElRangeDatePicker,
				// 	props: {
				// 		reset: false,
				// 	},
				// },
				// {
				// 	component: ElSelect,
				// 	props: {
				// 		field: 'ggg',
				// 		value: undefined,
				// 		title: '请选择类型',
				// 		lists: [
				// 			{
				// 				label: '1',
				// 				value: 1
				// 			},
				// 			{
				// 				label: '2',
				// 				value: 0
				// 			},
				// 		]
				// 	}
				// },
			],
			// 条件操作按钮
			commonOperationComponents: [
				{
					component: ElButton,
					props: {
						type: 'primary',
						loading: false,
						disabled: false,
						className: '',
						display_name: '自定义操作按钮',
						clickFn: (vm, scope) => {
							vm.$emit('customEv', { type: 'customOperation', ...scope })
						}
					}
				},
			],
			// 表格列
			commonTableField: [
				{
					label: '公司名',
					field: 'name',
					sortable: 'custom',
					// width: '80',
					component: DetailLink,
					props: {
						className: 'block lightHigh miaosu',
						detailUrl: 'detailModel',
						current: 'user',
					}
				},
				{
					label: '公司编码',
					field: 'coding',
					sortable: 'custom',
					// width: '80',
					// component: DetailLink,
					// props: {
					// 	className: 'block lightHigh miaosu',
					// 	detailUrl: 'detail',
					// }
				},
				{
					label: '负责人/法人',
					field: 'legal_person',
					sortable: 'custom',
				},
				{
					label: '电话',
					field: 'phone',
					sortable: 'custom',
				},
				{
					label: '状态',
					field: 'cstatus',
					sortable: 'custom',
					component: ElSwitch,
				},
			],
			// 表格列特殊值处理
			// tableFieldFn: function (data) {
			// 	const g = function (gender) {
			// 		return gender === 1 ? '女' : '男'
			// 	}
			// 	if (isArray(data)) {
			// 		data.forEach(v => {
			// 			v.gender = g(v.gender)
			// 		})
			// 	}
			// 	if (isObject(data)) {
			// 		data.gender = g(data.gender)
			// 	}
			// 	return data
			// },
			// 表格的操作
			commonTableOperationComponents: [
				{
					component: ElButton,
					props: {
						type: 'text',
						loading: false,
						disabled: false,
						className: '',
						display_name: '权限',
						clickFn: (vm, scope) => {
							vm.$emit('customEv', { type: 'power', ...scope })
						}
					}
				},
			],
			// 分页操作组件
			commonPaginationOperationComponents: [
				// {
				// 	component: ElButton,
				// 	props: {
				// 		type: 'primary',
				// 		loading: false,
				// 		disabled: false,
				// 		className: '',
				// 		display_name: '删除',
				// 		clickFn: (vm, scope) => {
				// 			vm.$emit('customEv', { type: 'batchdelete', ...scope })
				// 		}
				// 	}
				// },
			],
			// 分页设定
			commonPaginationSetting: {
				className: '',
				layout: 'total, prev, pager, next, jumper',
			},
			// 自定义操作按钮父组件回调 包含
			// commonOperationComponents
			// commonTableOperationComponents
			// commonPaginationOperationComponents
			customOperationFn: {
				// customOperation (vm, scope) {
				// 	console.log(vm)
				// 	console.log(scope)
				// },
				power (vm, scope) {
					vm.$refs['powerDialog'].powerData = {}
					ajax.call(vm, 'get', `/api/common/company/${scope.row.id}/permissions`, data => {
						let arr = []
						data.forEach(v => {
							arr.push(v.id)
						})
						vm.$refs['powerDialog'].powerData = {
							title: scope.row.name,
							id: scope.row.id,
							field: 'ids',
							value: arr,
						}
						vm.$refs['powerDialog'].visible = true
					})
				},
			},
			// 默认表单域
			commonFormFieldsFn () {
				return [
					{
						component: 'ElInput',
						field: 'name',
						label: '公司名',
						// required 默认为true
						// 根据rules传入的方法数据动态设置验证方法
						rules: [
							{
								method: 'lngValid',
								params: {
									lng: 255
								}
							},
							{
								method: 'checkValid',
								trigger: 'blur',
								params: {
									cfield: 'name',
								}
							}
						],
						value: null,
					},
					{
						component: 'ElInput',
						field: 'coding',
						label: '公司编码',
						rules: [
							{
								method: 'fixedLngValid',
								params: {
									lng: 4
								}
							}
						],
						value: null,
					},
					{
						component: Uploader,
						field: 'watermark',
						label: '水印',
						required: false,
						value: null,
						customSerializeFn: customSerializeFn
					},
					{
						component: ajaxElSelect,
						field: 'pid',
						label: '父分类',
						required: false,
						value: null,
						getDataFn: getAllPermissionCategory,
					},
					{
						component: 'ElSelect',
						field: 'method',
						label: 'Http方法',
						selectList: [
							{
								name: 'GET',
								id: 'GET'
							},
							{
								name: 'POST',
								id: 'POST'
							},
							{
								name: 'PUT',
								id: 'PUT'
							},
							{
								name: 'DELETE',
								id: 'DELETE'
							}
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
					{
						component: selfAdapterSelect,
						field: 'adapter_id',
						label: '适配器',
						value: undefined,
					},
					{
						cascade: true, // 存在受表单其他值影响时使用，
						cascadeField: 'adapter_id',// 受该字段的值影响
						component: selfParamsValue,
						field: 'params_value',
						label: '适配器参数',
						value: [],
						customSerializeFn: customSerializeParamsValue,
						customEditFn: customEditParamsValue
					},
				]
			},
			// 添加自定义组件插槽
			// commonConditionBeforeComponent: '',
			// commonTableBeforeComponent: '',
			// commonPaginationBeforeComponent: '',
			commonCustomDialog: {
				ref: 'powerDialog',
				component: selfPowerDialog
			},
		},
		// tes: {},
		// ddd: {},
	},
}

module.exports = {
	template: template
}
