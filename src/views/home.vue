<template>
	<el-container class="h100">
		<el-header :style="{backgroundColor: '#545c64'}">
			<h1 class="pull-left h100 fz-18 title">b</h1>
			<el-dropdown class="pull-right mt-10" split-button @click="handleClick" @command="handleCommand">
				我的
				<el-dropdown-menu slot="dropdown">
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
import ajaxApis from '../utils/ajax.js';
import utils from '../utils/utils.js';
const {ajax} = ajaxApis;
const {urlPrefix} = utils;
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
		};
	},
	mounted() {
		console.log(this.userinfo);
	},
	methods: {
		handleClick() {
			console.log(1);
		},
		handleCommand(command) {
			this[command]();
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
