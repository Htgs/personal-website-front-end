<template>
	<div class="h100 ovh home-view">
		<div class="w100 mt-10" style="height: 60px; border-bottom: 1px solid rgb(230, 230, 230)">
			<h4>{{article.title}}</h4>
			<p style="color: #6f6f6f;" class="fz-12 mt-10">文章类型：{{article['articles_category.name']}} 发表时间：{{transformTime(article.created_at)}}</p>
		</div>
		<div class="mt-10 fz-14" style="line-height: 2;">{{article.content}}</div>
	</div>
</template>

<script>
import {ajax} from '../../utils/ajax.js';
import {transformTime} from '../../utils/utils.js';
export default {
	name: 'Article',
	data() {
		return {
			article: {},

			// 评论
			loading: true,
			comment: [],
			page: 0,
			total: 0,

			filter: {},
		};
	},
	mounted() {
		this.getArticle();
		this.getComment();
	},
	methods: {
		transformTime,
		getArticle() {
			ajax('get', `/home/article/${this.$route.params.id}`)
				.then(({data}) => {
					this.article = data;
				});
		},
		getComment() {
			ajax('get', `/home/article/${this.$route.params.id}/comment`)
				.then(({data}) => {
					this.comment = data.data;
					this.page = data.page;
					this.total = data.total;
				});
		},
		submitComment() {
			// ajax('post', `/home/article/${this.$route.params.id}/comment`)
			// 	.then(({data}) => {
			// 		console.log(data);
			// 	});
		},
	},
};
</script>
