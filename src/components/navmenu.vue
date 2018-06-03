<template>
	<el-menu
		:default-active="$router.path"
		:router="true"
		@open="handleOpen"
		@close="handleClose">
		<!-- <el-menu-item index="/admin/user">
			<i class="el-icon-menu"></i>
			<span slot="title">用户管理</span>
		</el-menu-item>
		<el-submenu index="/admin/article">
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
		</el-submenu> -->
		<div v-for="menu in menus" :key="menu.resource">
			<el-submenu
				v-if="menu.children"
				:index="menu.resource">
				<template slot="title">
					<i :class="menu.icon"></i>
					<span slot="title">{{menu.display_name}}</span>
				</template>
				<el-menu-item
					v-for="item in menu.children"
					:key="item.resource"
					:index="item.resource">
					{{item.display_name}}
				</el-menu-item>
			</el-submenu>
			<el-menu-item
				v-else
				:index="menu.resource">
				<i :class="menu.icon"></i>
				<span slot="title">{{menu.display_name}}</span>
			</el-menu-item>
		</div>
	</el-menu>
</template>

<script>
export default {
	name: 'Navmenu',
	data() {
		return {
			menus: [
				{
					display_name: '用户管理',
					resource: '/admin/user',
					icon: 'el-icon-menu',
				},
				{
					display_name: '文章管理',
					resource: '/admin/article',
					icon: 'el-icon-document',
					children: [
						{
							display_name: '文章分类',
							resource: '/admin/article/article-category',
						},
						{
							display_name: '文章列表',
							resource: '/admin/article/article',
						},
					],
				},
				{
					display_name: '简历管理',
					resource: '/admin/resume',
					icon: 'el-icon-edit',
				},
				{
					display_name: '系统管理',
					resource: '/admin/system',
					icon: 'el-icon-setting',
					children: [
						{
							display_name: '日志管理',
							resource: '/admin/system/logs',
						},
						{
							display_name: '权限设置',
							resource: '/admin/system/permission',
						},
					],
				},
			]
		};
	},
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
