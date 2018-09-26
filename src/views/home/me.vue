<template>
	<div class="h100 home-view">
		<!-- <ul class="w100 h100 about-me">
			<li class="item w100 mb-10">
				<h4>关于我</h4>
				<div class="mt-10" v-html="me.about"></div>
			</li>
			<li class="item w100">
				<h4>技能</h4>
				<div class="mt-10">
					<el-row :gutter="20" class="mb-10" v-for="(skill, ky) in me.skills" :key="ky">
						<el-col :span="6">a</el-col>
						<el-col :span="3">{{skill.skill}}</el-col>
						<el-col :span="10"><el-progress :percentage="skill.percent"></el-progress></el-col>
					</el-row>
				</div>
			</li>
			<li class="item w100">
				<h4>项目</h4>
				<div class="mb-10" v-for="(project, ky) in me.project" :key="ky">
				</div>
			</li>
		</ul> -->
	</div>
</template>
<script>
import {ajax} from '@/utils/ajax.js';
export default {
	name: 'Me',
	data() {
		return {
			me: {
				about: '',
				skills: [],
				project: [],
			},
		};
	},
	mounted() {
		ajax('get', `/home/me/1`)
			.then(({data}) => {
				if (data) {
					this.me.about = data.about;
					this.me.skills = JSON.parse(data.skill);
					this.me.project = JSON.parse(data.project);
				}
			});
	},
};
</script>
<style lang="scss" scoped>
	.about-me {
		.item {}
	}
</style>
