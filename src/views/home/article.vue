<template>
	<div class="h100 ovh home-view">

		{{JSON.stringify(article)}}
	</div>
</template>

<script>
import {ajax} from '../../utils/ajax.js';
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
