<template>
	<el-menu
		:default-active="$route.path"
		:default-openeds="defaultOpeneds"
		:unique-opened="true"
		:router="true">
		<div v-for="(menu, ky) in menus" :key="ky">
			<el-submenu
				v-if="menu.children"
				:index="menu.resource">
				<template slot="title">
					<i :class="menu.name"></i>
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
				<i :class="menu.name"></i>
				<span slot="title">{{menu.display_name}}</span>
			</el-menu-item>
		</div>
	</el-menu>
</template>

<script>
export default {
	name: 'Navmenu',
	props: {
		defaultOpeneds: Array,
		menus: Array,
	},
};
</script>
