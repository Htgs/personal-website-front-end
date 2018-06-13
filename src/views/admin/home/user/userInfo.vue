<template>
	<div>
		<!-- <Form
			ref="userForm"
			:FormSetting="{'label-width': '100px'}"
			:FormData="userForm"
			v-on:submitForm="submitForm('userForm')"
		/> -->
	</div>
</template>

<script>
// import Form from '@/components/common/Form.vue';
// import FormElUpload from '@/components/common/FormElUpload.vue';
// import {FormElUpload as avatarSerialize} from '@/utils/customSerializeFn.js';
// import {FormElUpload as avatarEdit} from '@/utils/customEditFn.js';
export default {
	name: 'userInfo',
	// components: {
	// 	Form,
	// },
	// data() {
	// 	return {
	// 		userForm: {
	// 			formField: [
	// 				{
	// 					component: 'ElInput',
	// 					label: '昵称',
	// 					field: 'niname',
	// 					required: false,
	// 					value: null,
	// 				},
	// 				{
	// 					component: FormElUpload,
	// 					field: 'avatar',
	// 					label: '头像',
	// 					required: false,
	// 					value: [],
	// 					customSerializeFn: avatarSerialize,
	// 					customEditFn: avatarEdit,
	// 				},
	// 				{
	// 					component: 'ElInput',
	// 					label: '真实姓名',
	// 					field: 'realname',
	// 					required: false,
	// 					value: null,
	// 				},
	// 				{
	// 					component: 'ElInput',
	// 					label: '性别',
	// 					field: 'gender',
	// 					value: null,
	// 				},
	// 				{
	// 					component: 'ElInput',
	// 					label: '出生日期',
	// 					field: 'birth_date',
	// 					required: false,
	// 					value: null,
	// 				},
	// 				{
	// 					component: 'ElInput',
	// 					label: '手机电话',
	// 					field: 'phone',
	// 					required: false,
	// 					value: null,
	// 				},
	// 			]
	// 		},
	// 	};
	// },
	// methods: {
	// 	submitForm(formName) {
	// 		this.$refs[formName].validate()
	// 			.then(({FormData, params}) => {
	// 				let data = {
	// 					password: params['password'],
	// 					week: params['week'],
	// 				};
	// 				if (pattern['isEmail'](params['account'])) {
	// 					data['email'] = params['account'];
	// 				} else if (pattern['isPhone'](params['account'])) {
	// 					data['phone'] = params['account'];
	// 				} else {
	// 					data['name'] = params['account'];
	// 				}
	// 				ajax('post', `/admin/login`, data)
	// 					.then(res => {
	// 						console.log(res.data);
	// 						this.$store.commit('SET_USERINFO', res.data);
	// 						this.$router.push('/admin');
	// 					});
	// 			})
	// 			.catch(_ => {});
	// 	},
	// }
};
</script>
