<template>
	<div class="h100 nav">
		<!-- 由于使用了:router="true" 所以设置:default-active为"$route.path" -->
		<el-menu
			:router="true"
			:default-active="path"
			:default-openeds="defaultOpeneds"
			:background-color="backgroundColor"
			:text-color="textColor"
			:active-text-color="activeTextColor"
			class="w100 h100 txt-c">
			<div v-for="menu in menus" :key="menu.name">
				<el-menu-item v-if="menu.resource" :index="menu.resource">
					<div :class="[`icon-${menu.name}`]">{{menu.display_name}}</div>
				</el-menu-item>
				<el-submenu v-else :index="menu.name">
					<template slot="title">
						<div :class="[`icon-${menu.name}`]">{{menu.display_name}}</div>
					</template>
					<el-menu-item :index="item.resource" v-for="item in menu.lists" :key="item.name">
						<div>{{item.display_name}}</div>
					</el-menu-item>
				</el-submenu>
			</div>
		</el-menu>
	</div>
</template>
<script>
	export default {
		name: 'commonNav',
		props: {
			menus: Array,
			defaultOpeneds: Array,
			backgroundColor: {
				type: String,
				default: '#48576a',
			},
			textColor: {
				type: String,
				default: '#fff',
			},
			activeTextColor: {
				type: String,
				default: '#40a9ff',
			},
		},
		data () {
			return {
				path: ''
			}
		},
		mounted () {
			if (this.$route.params.id) {
				this.path = this.$route.path.substr(0, this.$route.path.indexOf(this.$route.params.id) - 1)
			} else {
				this.path = this.$route.path
			}
		},
		watch: {
			'$route' (to, from) {
				if (to.params.id) {
					this.path = to.path.substr(0, to.path.indexOf(to.params.id) - 1)
				} else {
					this.path = to.path
				}
			}
		}
	}
</script>
