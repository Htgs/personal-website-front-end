<template>
	<el-container class="h100">
		<el-header :style="{backgroundColor: '#545c64'}">
			<h1 class="pull-left h100 fz-18 title">个人网站后台管理</h1>
			<el-dropdown class="pull-right mt-10" split-button @click="handleClick" @command="handleCommand">
				首页
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="my">我的</el-dropdown-item>
					<el-dropdown-item command="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>
		<el-container>
			<el-aside width="201px">
				<Navmenu class="h100"/>
			</el-aside>
			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>

import Navmenu from '@/components/navmenu.vue';

import {mapState} from 'vuex';
import {ajax} from '@/utils/ajax.js';
import {urlPrefix} from '@/utils/utils.js';
export default {
	name: 'Home',
	components: {
		Navmenu
	},
	computed: {
		...mapState(['userinfo']),
	},
	// beforeMount() {
	// 	this.auth();
	// },
	beforeRouteEnter(to, from, next) {
		ajax('get', '/admin/auth')
			.then(res => {
				next(vm => {
					vm.$store.commit('SET_USERINFO', res.data);
					if (vm.$route.path.indexOf('login') > -1) {
						vm.$router.push('/admin');
					}
				});
			})
			.catch(err => {
				console.dir(err);
				if (err.response.status === 401) {
					// this.$router.push('/admin/login');
					next('/admin/login');
				}
			});
	},
	// beforeRouteUpdate(to, from, next) {
	// 	// 在当前路由改变，但是该组件被复用时调用
	// 	// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	// 	// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	// 	// 可以访问组件实例 `this`
	// },
	methods: {
		auth() {
			ajax('get', '/admin/auth')
				.then(res => {
					this.$store.commit('SET_USERINFO', res.data);
					if (this.$route.path.indexOf('login') > -1) {
						this.$router.push('/admin');
					}
				})
				.catch(err => {
					console.dir(err);
					if (err.response.status === 401) {
						this.$router.push('/admin/login');
					}
				});
		},
		handleClick() {
			this.$router.history.push('/admin');
		},
		handleCommand(command) {
			this[command]();
		},
		my() {
			this.$router.history.push({
				name: 'Model',
				params: {
					model: 'user-info',
				},
			});
		},
		logout() {
			ajax('get', '/admin/logout')
				.then(res => {
					if (res.status === 200) {
						this.$store.commit('CLEAR_USERINFO');
						this.$router.push('/admin/login');
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
	.title {
		line-height: 60px;
	}
</style>
