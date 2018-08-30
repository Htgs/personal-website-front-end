<template>
	<div class="h100 home-view">
		<ul class="w100 h100 about-me">
			<li class="item w100">
				<h4>关于我</h4>
			</li>
			<li class="item w100">
				<h4>技能</h4>
			</li>
			<li class="item w100">
				<h4>项目</h4>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'Me',
};
</script>
<style lang="scss" scoped>
	.about-me {
		.item {
			height: 33.333%;
		}
	}
</style>
