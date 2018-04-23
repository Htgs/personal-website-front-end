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

import Navmenu from '../components/navmenu.vue';

import {mapState} from 'vuex';
import {ajax} from '../utils/ajax.js';
import {urlPrefix} from '../utils/utils.js';
export default {
	name: 'Home',
	components: {
		Navmenu
	},
	computed: {
		...mapState(['userinfo']),
	},
	methods: {
		handleClick() {
			this.$router.history.push('/home');
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
			ajax('get', '/logout')
				.then(res => {
					if (res.status === 200) {
						this.$store.commit('CLEAR_USERINFO');
						this.$router.push('/login');
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
