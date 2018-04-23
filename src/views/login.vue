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
							{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change,blur' }
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
import {ajax} from '../utils/ajax.js';
import {urlPrefix} from '../utils/utils.js';
import {email} from '../utils/validation.js';
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
	// beforeRouteEnter(to, from, next) {
	// 	// 在渲染该组件的对应路由被 confirm 前调用
	// 	// 不！能！获取组件实例 `this`
	// 	// 因为当守卫执行前，组件实例还没被创建
	// 	ajax('get', urlPrefix('auth'))
	// 		.then(res => {
	// 			next(vm => {
	// 				vm.$store.commit('SET_USERINFO', res.data);
	// 				vm.$router.push('/home');
	// 			});
	// 		})
	// 		.catch(err => {
	// 			if (err.response.status === 401) {
	// 				next();
	// 			}
	// 		});
	// },
	// beforeRouteUpdate(to, from, next) {
	// 	// 在当前路由改变，但是该组件被复用时调用
	// 	// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	// 	// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	// 	// 可以访问组件实例 `this`
	// },
	// beforeRouteLeave(to, from, next) {
	// 	// 导航离开该组件的对应路由时调用
	// 	// 可以访问组件实例 `this`
	// 	next();
	// },
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data = {
						email: this.loginForm.email,
						password: this.loginForm.password,
					};
					if (this.loginForm.remember) {
						data['remember'] = true;
					}
					ajax('post', `/login`, data)
						.then(res => {
							this.$store.commit('SET_USERINFO', res.data);
							this.$router.push('/');
						})
						.catch(err => {
							console.dir(err);
						});
				} else {
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// emailCheck: function(rule, value, callback) {
		// 	if (!email(value)) {
		// 		return callback(new Error('请输入正确的邮箱地址'));
		// 	} else {
		// 		return callback();
		// 	}
		// }
	}
};
</script>

<style scoped>
	.login-btn {
		width: 80%;
		margin: 0 auto;
	}
</style>
