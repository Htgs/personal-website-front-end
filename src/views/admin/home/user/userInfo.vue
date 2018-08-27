<template>
	<div>
		<Form
			ref="userForm"
			:FormSetting="{'label-width': '100px'}"
			:FormData="userForm"
			route="user"
			v-on:submitForm="submitForm('userForm')"
		/>
		<div class="txt-c">
			<el-button type="primary" @click="submit('userForm')">修改</el-button>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import {ajax} from '@/utils/ajax.js';
import {setFormField, urlPrefix} from '@/utils/utils.js';
import Form from '@/components/common/Form.vue';
import FormElUpload from '@/components/common/FormElUpload.vue';
import customSerializeFn from '@/utils/customSerializeFn.js';
import customEditFn from '@/utils/customEditFn.js';
export default {
	name: 'userInfo',
	components: {
		Form,
	},
	computed: {
		...mapState(['userinfo']),
	},
	data() {
		return {
			userForm: {
				id: null,
				formField: [
					{
						component: 'ElInput',
						label: '昵称',
						field: 'niname',
						required: false,
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
						label: '真实姓名',
						field: 'realname',
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
				]
			},
		};
	},
	mounted() {
		console.log(this.userinfo);
		this.userForm.id = this.userinfo.id;
		this.userForm.formField = setFormField(this.userForm.formField, this.userinfo);
	},
	methods: {
		submit(formName) {
			this.$refs[formName].validate()
				.then(({FormData, params}) => {
					ajax('post', urlPrefix('/admin/user/user-info'), params, params._hasfile)
						.then(({data}) => {
							this.$message({
								message: '保存成功',
								type: 'success',
							})
							this.$store.commit('SET_USERINFO', data);
						});
				})
				.catch(_ => {});
		},
	}
};
</script>
