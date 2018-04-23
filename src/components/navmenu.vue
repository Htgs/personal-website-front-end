<template>
	<el-menu
		:default-active="$router.path"
		:router="true"
		@open="handleOpen"
		@close="handleClose">
		<el-menu-item index="/user">
			<i class="el-icon-menu"></i>
			<span slot="title">用户管理</span>
		</el-menu-item>
		<el-submenu index="/article">
			<template slot="title">
				<i class="el-icon-document"></i>
			<span slot="title">文章管理</span>
			</template>
			<el-menu-item index="/article-category">文章分类</el-menu-item>
			<el-menu-item index="/article">文章列表</el-menu-item>
		</el-submenu>
		<el-menu-item index="/resume">
			<i class="el-icon-edit"></i>
			<span slot="title">简历管理</span>
		</el-menu-item>
		<el-submenu index="/system">
			<template slot="title">
				<i class="el-icon-setting"></i>
				<span slot="title">系统管理</span>
			</template>
			<el-menu-item index="/logs">日志管理</el-menu-item>
			<el-menu-item index="/permission">权限设置</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
export default {
	name: 'Navmenu',
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
	}
};
</script>
