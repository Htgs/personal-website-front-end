<template>
	<div>
		<el-form-item
			v-for="(item, ky) in commonFormData.formField"
			:key="ky"
			:class="item.className"
			:label="item.label"
			:required="item.required === false ? false : true"
			:prop="`formField.${ky}.value`"
			:rules="setRules(item)">
			<el-input
				v-if="item.component === 'ElInput'"
				:placeholder="item.placeholder ? item.placeholder : '请输入内容'"
				:type="item.inputType ? item.inputType : 'text'"
				:disabled="item.disabled ? item.disabled : false"
				v-model="item.value"
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
				type="date"
				:placeholder="'请选择' + item.label"
				v-model="item.value"
			/>
			<!-- item.cascade级联。表单中有相互影响时使用，传入的值包含了整个表单的作用域 -->
			<component
				v-else-if="item.cascade === true"
				:is="item.component"
				:route="route"
				:formItemData="item"
				:cascadeData="commonFormData.formField.find(f => f.field === item.cascadeField)"
			/>
			<component
				v-else
				:is="item.component"
				:route="route"
				:formItemData="item"
			/>
		</el-form-item>
	</div>
</template>
<script>
import validator from '../../utils/validation.js';
export default {
	name: 'FormItem',
	props: {
		commonFormData: Object,
		// 用于check验证路径
		route: String,
	},
	methods: {
		setRules(item) {
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
						validator: validator[valid.method],
						label: item.label,
						trigger: valid.trigger ? valid.trigger : 'change blur',
						// check接口参数
						vm: this,
						route: this.route,
						id: this.commonFormData.id,
						// 自定义验证的参数， 参数属性名不能使用rule内置同名属性名
						...valid['params'],
					});
				});
			}
			return rules;
		},
	},
	watch: {
		// 'commonFormData.formField': {
		// 	deep: true,
		// 	handler: function (nv, v) {
		// 		if (nv.commonTitle !== v.commonTitle) {
		// 			index(this, this.filter)
		// 		}
		// 	}
		// }
	}
};
</script>
