<template>
	<el-container class="h100">
		<el-header :style="{backgroundColor: '#545c64'}">
			<h1 class="pull-left h100 fz-18 title">个人网站后台管理</h1>
			<el-dropdown class="pull-right mt-10" split-button @click="handleClick" @command="handleCommand">
				首页
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="my">我的</el-dropdown-item>
					<el-dropdown-item command="password">修改密码</el-dropdown-item>
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
	mounted() {
		this.$store.dispatch('getStaticData', {
			cache: 'ARTICLE_CATEGORY',
			url: urlPrefix('admin/article-category/all'),
		});
	},
	methods: {
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
		password() {
			this.$router.history.push({
				name: 'Model',
				params: {
					model: 'password',
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
