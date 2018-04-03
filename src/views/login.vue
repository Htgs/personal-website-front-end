<template>
	<el-row type="flex" justify="center" align="middle" class="h100">
		<el-col :xs="24" :sm="18" :md="12" :lg="8" :xl="6">
			<el-card :body-style="{ padding: '30px' }">
				<div slot="header" class="clearfix">
					<h2>登录</h2>
				</div>
				<el-form :model="loginForm" ref="loginForm" label-width="80px">
					<el-form-item
						prop="email"
						label="邮箱"
						:rules="[
							{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
							{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change, blur' }
						]"
					>
						<el-input v-model="loginForm.email"></el-input>
					</el-form-item>
					<el-form-item
						prop="password"
						label="密码"
						:rules="[
							{ required: true, message: '请输入密码', trigger: 'blur' },
						]"
					>
						<el-input type="password" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item
						prop="remember"
						label="记住我"
					>
						<el-checkbox v-model="loginForm.remember" />
					</el-form-item>
					<el-button class="block login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
				</el-form>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import ajaxApis from '../utils/ajax.js';
const {ajax} = ajaxApis;
export default {
	name: 'Login',
	data() {
		return {
			loginForm: {
				email: null,
				password: null,
				remember: false,
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.loginForm);
					let data = {
						email: this.loginForm.email,
						password: this.loginForm.password,
					}
					if (this.loginForm.remember) {
						data['remember'] = true
					}
					ajax('post', `/login`, data)
						.then(res => {
							console.dir(res);
						})
						.catch(err => {
							console.dir(err);
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style scoped>
	.login-btn {
		width: 80%;
		margin: 0 auto;
	}
</style>
