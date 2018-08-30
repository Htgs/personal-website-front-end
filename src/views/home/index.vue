<template>
	<el-container class="w100 h100">
		<el-header class="clearfix" style="border-bottom: solid 1px #e6e6e6;">
			<h1 class="pull-left h100" style="line-height: 60px;">这里是被窝的被窝</h1>
			<el-menu class="pull-right h100" default-active="/article" mode="horizontal" @select="nav">
				<el-menu-item index="/article">文章</el-menu-item>
				<el-menu-item index="/about-me">关于我</el-menu-item>
			</el-menu>
		</el-header>
		<el-main class="h100" style="padding: 10px 20px;">
			<router-view/>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'Index',
	methods: {
		nav(index) {
			this.$router.push(index);
		}
	},
};
</script>

<style lang="scss">
	.el-menu--horizontal {
		border-bottom: 0;
	}
	.el-card__body {
		&::after {
			display: block;
			content: "\20";
			height: 0;
			clear: both;
			overflow: hidden;
			visibility: hidden;
		}
	}
</style>
