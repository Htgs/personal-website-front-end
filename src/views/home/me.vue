<template>
	<div class="h100 home-view">
		<ul class="w100 h100 about-me">
			<li class="item w100">
				<h4>关于我</h4>
				<div class="mt-10" v-html="me.about"></div>
			</li>
			<li class="item w100">
				<h4>技能</h4>
				<div class="mt-10">
					<div class="clearfix" v-for="(skill, ky) in me.skills" :key="ky">
						<span class="pull-left">{{skill.name}}</span>
						<el-progress :percentage="skill.progress"></el-progress>
					</div>
				</div>
			</li>
			<li class="item w100">
				<h4>项目</h4>
				<div class="mt-10" v-html="me.project"></div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'Me',
	data() {
		return {
			me: {
				about: '',
				skills: [],
				project: '',
			},
		};
	},
};
</script>
<style lang="scss" scoped>
	.about-me {
		.item {}
	}
</style>
