<template>
	<div class="h100 clearfix home-view">
		<div class="pull-left" style="width: 200px; margin-right: 40px;">
			<!-- 分类start -->
			<el-card shadow="never" v-loading="categories_loading" element-loading-text="加载中">
				<ul>
					<li class="mb-10" @click="category()"><span :class="['category', `${!filter.category_id ? 'cur' : ''}`]">全部 <i class="num">({{article_count}})</i></span></li>
					<li
						class="mb-10"
						v-for="cate in categories"
						:key="cate.id">
						<div v-if="cate.children">
							<span>{{cate.name}}</span>
							<ul style="margin: 5px 0px 0px 20px;">
								<li v-for="child in cate.children" :key="child.id">
									<span :class="['category', `${filter.category_id === `${child.id}` ? 'cur' : ''}`]" @click="category(child.id)">{{child.name}} <i class="num">({{child.article_count}})</i></span>
								</li>
							</ul>
						</div>
						<span v-else :class="['category', `${filter.category_id === `${cate.id}` ? 'cur' : ''}`]" @click="category(cate.id)">{{cate.name}} <i class="num">({{cate.article_count}})</i></span>
					</li>
				</ul>
			</el-card>
			<!-- 分类end -->
			<!-- 词云start -->
			<!-- <el-card class="mt-10" shadow="never" :body-style="{height: '250px', padding: 0}">
				<TagCloud class="w100 h100" :tagsData="keywords" />
			</el-card> -->
			<!-- 词云end -->
			<!-- 个人简介start -->
			<el-card class="mt-10" shadow="never">
				<div slot="header" class="clearfix">
					<span>关于我</span>
					<!-- <a class="pull-right" href="https://github.com/Htgs" target="_blank">github</a> -->
				</div>
				<p class="fz-14 mt-10" style="text-indent: 2em;">一个前端渣渣，会一点后台，搞过一下数据库。</p>
			</el-card>
			<!-- 个人简介end -->
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
							<p style="color: #6f6f6f;" class="fz-12 mt-10">文章类型：{{article['articles_category.name']}} 标签：{{article['keywords']}} 发表时间：{{transformTime(article.created_at)}}</p>
						</div>
						<div class="w100 multi-ellipsis" style="height: 100px; line-height: 2;" v-html="article.render_content" />
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
import { mavonEditor } from 'mavon-editor';
import {ajax} from '../../utils/ajax.js';
import {transformTime} from '../../utils/utils.js';
import TagCloud from '../../components/TagCloud/index.vue';
export default {
	name: 'Articles',
	components: {
		TagCloud,
	},
	data() {
		return {
			// 文章分类
			categories_loading: true,
			categories: [],
			article_count: 0,

			// 文章
			loading: true,
			articles: [],
			page: 0,
			total: 0,

			// 词云
			keywords: {},

			// 过滤条件
			filter: {
				category_id: 0,
			},
		};
	},
	mounted() {
		// 获取分类信息
		this.getCategories();
		// 获取文章数据
		this.getArticles();
		// 获取文章的数量
		// this.getKeywords();
	},
	methods: {
		transformTime,
		renderContent(data) {
			return data.map(item => {
				mavonEditor.mixins[0].methods.$render(item.content, (render) => {
					item.render_content = render;
				});
				return item;
			});
		},
		getArticles(params = {}) {
			this.articles = [];
			this.loading = true;
			if (Object.keys(params).length === 0) {
				this.filter = {
					...this.$route.query,
				};
				params = {
					...this.$route.query,
				};
			}
			ajax('get', '/home/article', params)
				.then(({data}) => {
					this.$router.replace({
						name: 'articles',
						query: {
							...params,
						},
					});
					this.loading = false;
					this.page = data.page;
					this.total = data.total;
					this.articles = this.renderContent(data.data);
				});
		},
		// 获取文章分类以及每个分类包含的文章数 获取全部文章数量
		getCategories() {
			this.categories_loading = true;
			ajax('get', '/home/articles-categories/articles-count')
				.then(({data}) => {
					const {article_count, articles_categories} = data;
					this.article_count = article_count;
					let temp = articles_categories.filter(d => d.pid === null);
					temp.forEach(t => {
						if (articles_categories.find(d => d.pid === t.id)) {
							t['children'] = articles_categories.filter(d => d.pid === t.id);
						}
					});
					this.categories = temp;
					this.categories_loading = false;
				});
		},
		// getKeywords() {
		// 	ajax('get', '/home/keywords')
		// 		.then(({data}) => {
		// 			// let map = new Map();
		// 			// data.forEach((item) => {
		// 			// 	let keywords = item.keywords.split(',');
		// 			// 	keywords.forEach(keyword => {
		// 			// 		if (map.has(keyword)) {
		// 			// 			let num = map.get(keyword);
		// 			// 			map.set(keyword, ++num);
		// 			// 		} else {
		// 			// 			map.set(keyword, 1);
		// 			// 		}
		// 			// 	});
		// 			// });
		// 			// this.keywords = map;
		// 			// for (let item of map.entries()) {
		// 			// 	console.log(`key: ${item[0]}, value: ${item[1]}`);
		// 			// }
		// 			this.keywords = {};
		// 			data.forEach((item) => {
		// 				let keywords = item.keywords.split(',');
		// 				keywords.forEach(keyword => {
		// 					if (this.keywords[keyword]) {
		// 						this.keywords[keyword] += 1;
		// 					} else {
		// 						this.keywords[keyword] = 1;
		// 					}
		// 				});
		// 			});
		// 		});
		// },
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
		.num {
			color: #c6c6c6;
		}
	}
</style>
