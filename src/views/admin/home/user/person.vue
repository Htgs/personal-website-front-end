<template>
	<div>
		<Form
			ref="personForm"
			:FormSetting="{'label-width': '100px'}"
			:FormData="personForm"
			route="person"
			v-on:submitForm="submitForm('personForm')"
		/>
		<div class="txt-c">
			<el-button type="primary" @click="submit('personForm')">保存</el-button>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import {ajax} from '@/utils/ajax.js';
import {store, show} from '@/utils/commonApi.js';
import {setFormField} from '@/utils/utils.js';
import Form from '@/components/common/Form.vue';
import FormJSONInput from './components/FormJSONInput.vue';
export default {
	name: 'person',
	components: {
		Form,
	},
	computed: {
		...mapState(['userinfo'])
	},
	data() {
		return {
			personForm: {
				id: null,
				formField: [
					{
						component: 'ElInput',
						inputType: 'textarea',
						field: 'about',
						label: '个人介绍',
						rules: [
							{
								method: 'lengthValid',
								params: {
									length: [5, 255],
								},
							},
						],
						autosize: {
							minRows: 6,
							maxRows: 8,
						},
						value: null,
					},
					{
						component: FormJSONInput,
						field: 'skill',
						label: '技能',
						value: null,
						JSONFields: [
							{
								label: '技能',
								field: 'skill',
								component: 'ElInput',
							},
							{
								label: '掌握度',
								field: 'percent',
								component: 'ElSlider',
							}
						],
					},
					{
						component: FormJSONInput,
						field: 'project',
						label: '项目',
						value: null,
						JSONFields: [
							{
								label: '名称',
								field: 'name',
								component: 'ElInput',
							},
							{
								label: '项目地址',
								field: 'url',
								component: 'ElInput',
								rules: [
									{
										method: 'patternValid',
										params: {
											pattern: 'website',
										},
									},
								],
							}
						],
					},
				]
			},
		};
	},
	mounted() {
		ajax('get', '/admin/auth')
			.then(({data}) => {
				this.$store.commit('SET_USERINFO', data);
				this.getData();
			});
	},
	methods: {
		getData() {
			show('/admin/me', this.userinfo.id)
				.then(data => {
					if (data) {
						this.personForm.id = data.id;
						this.personForm.formField = setFormField(this.personForm.formField, data);
					}
				});
		},
		submit(formName) {
			this.$refs[formName].validate()
				.then(({FormData, params}) => {
					console.log(params);
					if (this.personForm.id) {
						params['id'] = this.personForm.id;
					}
					params['user_id'] = this.userinfo.id;
					store('/admin/me', params)
						.then(data => {
							this.$message({
								message: '保存成功',
								type: 'success',
							});
						});
				})
				.catch(_ => {});
		},
	}
};
</script>
