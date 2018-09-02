<template>
	<el-form :inline="FormInline" :label-width="FormLabelWidth" :model="FormData" ref="FormData">
		<el-form-item
			v-for="(item, ky) in FormData.formField"
			:key="ky"
			:class="item.className"
			:label="item.label"
			:required="item.required === false ? false : true"
			:prop="`formField.${ky}.value`"
			:rules="_setRules(item)">
			<el-input
				v-if="item.component === 'ElInput'"
				:placeholder="item.placeholder ? item.placeholder : '请输入内容'"
				:type="item.inputType ? item.inputType : 'text'"
				:disabled="item.disabled ? item.disabled : false"
				:autosize="item.autosize ? item.autosize : false"
				v-model="item.value"
				@keyup.enter.native="submitForm()"
			/>
			<el-select
				v-else-if="item.component === 'ElSelect'"
				:placeholder="item.placeholder ? item.placeholder : '请选择' + item.label"
				:disabled="item.disabled ? item.disabled : false"
				v-model="item.value">
				<el-option
					v-for="sitem in item.selectList"
					:label="sitem.name"
					:value="sitem.id"
					:key="sitem.id"
				/>
			</el-select>
			<el-radio-group
				v-else-if="item.component === 'ElRadio'"
				v-model="item.value">
				<el-radio
					v-for="ritem in item.radioList"
					:label="ritem.id"
					:key="ritem.id">
					{{ritem.name}}
				</el-radio>
			</el-radio-group>
			<el-date-picker
				v-else-if="item.component === 'ElDate'"
				:type="item.DateType ? item.DateType : 'date'"
				:placeholder="'请选择' + item.label"
				:format="item.format ? item.format : 'yyyy-MM-dd'"
				:value-format="item['value-format'] ? item['value-format'] : null"
				:picker-options="item.pickerOptions"
				v-model="item.value"
			/>
			<el-date-picker
				v-else-if="item.component === 'ElDateRange'"
				type="daterange"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				:format="item.format ? item.format : 'yyyy-MM-dd'"
				:value-format="item['value-format'] ? item['value-format'] : null"
				v-model="item.value"
			/>
			<el-input-number
				v-else-if="item.component === 'ElInputNumber'"
				controls-position="right"
				:min="item.min ? item.min : 0"
				:label="item.label"
				v-model="item.value"
			/>
			<el-checkbox
				v-else-if="item.component === 'ElCheckbox'"
				v-model="item.value">
				{{item.placeholder}}
			</el-checkbox>
			<el-slider
				style="width: 185px;"
				v-else-if="item.component === 'ElSlider'"
				v-model="item.value"
			/>
			<!-- item.cascade级联。表单中有相互影响时使用，传入的值包含了整个表单的作用域 -->
			<component
				v-else-if="item.cascade === true"
				:is="item.component"
				:route="route"
				:formItemData="item"
				:cascadeData="(() => {
					if (isArray(item.cascadeField)) {
						return FormData.formField.filter(f => item.cascadeField.includes(f.field))
					} else {
						return FormData.formField.find(f => f.field === item.cascadeField)
					}
				})()"
			/>
			<component
				v-else
				:is="item.component"
				:route="route"
				:formItemData="item"
			/>
		</el-form-item>
	</el-form>
</template>
<script>
import ElValidation from '../../utils/ElValidation.js';
import {isArray} from '../../utils/utils.js';
export default {
	name: 'Form',
	props: {
		// 表单设置
		FormSetting: Object,
		// 表单数据
		FormData: Object,
		// 用于check验证路径
		route: String,
	},
	computed: {
		// 表单标签长度
		FormLabelWidth() {
			if (this.FormSetting['label-width']) {
				return this.FormSetting['label-width'];
			} else {
				return '100px';
			}
		},
		// 是否是行内表单
		FormInline() {
			if (this.FormSetting['inline']) {
				return this.FormSetting['inline'];
			} else {
				return false;
			}
		}
	},
	methods: {
		/**
		 * 表单验证
		 * @return Promise
		 * resolve: 返回表单数据和格式化后的表单数据
		 */
		validate() {
			return new Promise((resolve, reject) => {
				this.$refs['FormData'].validate((valid) => {
					if (valid) {
						const params = {
							...this._serializeData(this.FormData.formField),
						};
						resolve({
							FormData: this.FormData,
							params,
						});
					} else {
						reject(valid);
					}
				});
			});
		},
		reset() {
			this.$refs['FormData'].resetFields();
		},
		// 回车键提交表单
		submitForm() {
			this.$emit('submitForm');
		},
		isArray,
		// 动态设置验证规则
		_setRules(item) {
			let rules = [];
			// 表单每项默认是必须的
			if (item.required !== false) {
				rules.push({
					required: true,
					message: `${item.label}不能为空`
				});
			}
			if (item.rules) {
				item.rules.forEach(valid => {
					rules.push({
						// elementUI必须
						validator: ElValidation[valid.method],
						label: item.label,
						trigger: valid.trigger ? valid.trigger : ['blur', 'change'],
						required: item.required,
						// check接口参数
						vm: this,
						route: this.route,
						id: this.FormData.id,
						// 自定义验证的参数， 参数属性名不能使用rule内置同名属性名
						...valid['params'],
					});
				});
			}
			return rules;
		},
		_serializeData: function(data) {
			let params = {};
			data.forEach(v => {
				// 自定义序列化处理表单数据
				if (v.customSerializeFn) {
					params = Object.assign(params, v.customSerializeFn(v));
				} else {
					params[v.field] = v.value;
				}
			});
			return params;
		},
	},
};
</script>
