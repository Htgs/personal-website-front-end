<template>
	<el-container class="h100">
		<el-header style="border: 1px solid #e6e6e6;">
			<h1 class="pull-left h100 fz-18 title">个人网站后台管理</h1>
			<div class="pull-right mt-10">
				<el-dropdown size="medium" @command="handleCommand">
					<div class="el-dropdown-link">
						您好，<el-button type="text">{{userinfo.niname}}</el-button>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="personal" >个人介绍</el-dropdown-item>
						<el-dropdown-item command="logout" divided>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- <el-button type="text" @click="logout">退出</el-button> -->
			</div>
		</el-header>
		<el-container>
			<el-aside width="201px">
				<Navmenu class="h100" :menus="menus" :defaultOpeneds="defaultOpeneds"/>
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
	data() {
		return {
			menus: [],
			defaultOpeneds: [],
		};
	},
	beforeRouteEnter(to, from, next) {
		Promise.all([
			ajax('get', '/admin/auth'),
			ajax('get', '/api/admin/menu')
		])
			.then(([Auth, Menus]) => {
				let menus = [], defaultOpeneds = [];
				Menus.data.forEach(m => {
					let item = {
						name: m.name.split('-')[1].toLowerCase(),
						display_name: m.display_name,
					};
					if (m.menus.length > 0) {
						item['resource'] = m.name.split('-')[1].toLowerCase();
						item['children'] = [];
						m.menus.forEach(cm => {
							item['children'].push({
								display_name: cm.display_name,
								resource: cm.resource,
							});
						});
						if (to.path.indexOf(item['resource']) > -1) {
							defaultOpeneds.push(item['resource']);
						}
					} else {
						item['resource'] = m.resource;
					}
					menus.push(item);
				});
				next(vm => {
					vm.$store.commit('SET_USERINFO', Auth.data);
					if (vm.$route.path.indexOf('login') > -1) {
						vm.$router.push('/admin');
					}
					vm.defaultOpeneds = defaultOpeneds;
					vm.menus = menus;
					// console.log(menus);
				});
			})
			.catch(err => {
				// console.dir(err);
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
		handleCommand(command) {
			this[command]();
		},
		personal() {
			this.$router.push('/admin/person');
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
