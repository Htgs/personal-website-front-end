<template>
	<div class="h100 clearfix home-view">
		<div class="pull-left" style="width: 200px; margin-right: 40px;">
			<el-card shadow="never">
				<ul>
					<li class="mb-10" @click="category()"><span :class="['category', `${!filter.category_id ? 'cur' : ''}`]">全部</span></li>
					<li
						class="mb-10"
						v-for="cate in categories"
						:key="cate.id">
						<div v-if="cate.children">
							<span>{{cate.name}}</span>
							<ul style="margin: 5px 0px 0px 20px;">
								<li v-for="child in cate.children" :key="child.id">
									<span :class="['category', `${filter.category_id === child.id ? 'cur' : ''}`]" @click="category(child.id)">{{child.name}}</span>
								</li>
							</ul>
						</div>
						<span v-else :class="['category', `${filter.category_id === cate.id ? 'cur' : ''}`]" @click="category(cate.id)">{{cate.name}}</span>
					</li>
				</ul>
			</el-card>
		</div>
		<div class="pull-left h100"  style="width: 860px;">
			<div class="relative ovh" style="height: calc(100% - 40px);" v-loading="loading" element-loading-text="加载中">
				<div
					v-if="articles.length === 0 && loading === false"
					class="txt-c fz-24 mt-10">
					暂时还没有文章哦
				</div>
				<el-scrollbar v-else :style="{'height': 'calc(100% + 18px)'}">
					<el-card class="mb-10" v-for="article in articles" :key="article.title" shadow="hover">
						<div slot="header" class="clearfix">
							<h4>{{article.title}}</h4>
							<p style="color: #6f6f6f;" class="fz-12 mt-10">文章类型：{{article['articles_category.name']}} 发表时间：{{transformTime(article.created_at)}}</p>
						</div>
						<div class="w100 multi-ellipsis" style="height: 100px; line-height: 2;">{{article.content}}</div>
						<el-button class="pull-right" type="text" @click="detail(article.id)">阅读全文</el-button>
					</el-card>
				</el-scrollbar>
			</div>
			<el-pagination
				class="txt-c"
				style="margin-top: 8px;"
				@current-change="pageChange"
				:current-page="page"
				layout="prev, pager, next"
				:total="total"
			/>
		</div>
	</div>
</template>
<script>
import {ajax} from '../../utils/ajax.js';
import {transformTime} from '../../utils/utils.js';
export default {
	name: 'Articles',
	data() {
		return {
			categories: [],

			loading: true,
			articles: [],
			page: 0,
			total: 0,

			filter: {},
		};
	},
	mounted() {
		// 获取分类信息
		this.getCategories();
		// 获取文章数据
		this.getArticles();
	},
	methods: {
		transformTime,
		getArticles(params = {}) {
			this.articles = [];
			this.loading = true;
			ajax('get', '/home/article', params)
				.then(({data}) => {
					this.loading = false;
					this.articles = data.data;
					this.page = data.page;
					this.total = data.total;
				});
		},
		getCategories() {
			ajax('get', '/home/articles-categories')
				.then(({data}) => {
					let temp = data.filter(d => d.pid === null);
					temp.forEach(t => {
						if (data.find(d => d.pid === t.id)) {
							t['children'] = data.filter(d => d.pid === t.id);
						}
					});
					console.log(temp);
					this.categories = temp;
				});
		},
		detail(id) {
			this.$router.push(`/article/${id}`);
		},
		category(category_id) {
			this.filter = {
				...this.filter,
				category_id,
				page: 1,
			};
			this.getArticles(this.filter);
		},
		pageChange(page) {
			this.filter = {
				...this.filter,
				page,
			};
			this.getArticles(this.filter);
		},
	},
};
</script>

<style lang="scss" scoped>
	.category {
		color: #303133;
		cursor: pointer;
		&:hover, &.cur {
			color: #409EFF;
		}
	}
</style>
