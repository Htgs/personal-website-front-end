<template>
	<div class="h100 ovh home-view">
		<el-scrollbar ref="elscrollbar" :style="{'height': 'calc(100% + 17px)'}">
			<div class="w100 mt-10" style="height: 60px; border-bottom: 1px solid rgb(230, 230, 230);">
				<h4>{{article.title}}</h4>
				<p style="color: #6f6f6f;" class="fz-12 mt-10">文章类型：{{article['articles_category.name']}} 发表时间：{{transformTime(article.created_at)}}</p>
			</div>
			<div class="mt-10 fz-14" style="line-height: 2;" v-html="article.render_content" />
			<!-- 评论区 -->
			<div class="comment">
				<div class="comment-show" v-loading="loading" element-loading-text="加载中">
					<div
						v-if="comments.length === 0 && loading === false"
						class="txt-c fz-24 no-comment">
						暂时还没有评论哦
					</div>
					<div v-else>
						<p class="p-10 txt-c fz-24">留言板</p>
						<el-card class="mb-10" v-for="comment in comments" :key="comment.id" shadow="hover">
							<el-card class="mb-10" v-if="comment['reply']">
								<h4>{{comment['reply'].user_name}}说：</h4>
								<div class="w100 multi-ellipsis mt-10 mb-10" style="line-height: 2;">{{comment['reply'].content}}</div>
								<span style="color: #6f6f6f;" class="pull-left fz-12">发表时间：{{transformTime(comment['reply'].created_at)}}</span>
							</el-card>
							<h4>{{comment.user_name}}{{comment['reply'] ? `回复${comment['reply'].user_name}` : ''}}说：</h4>
							<div class="w100 multi-ellipsis mt-10 mb-10" style="line-height: 2;">{{comment.content}}</div>
							<span style="color: #6f6f6f;" class="pull-left fz-12">发表时间：{{transformTime(comment.created_at)}}</span>
							<el-button class="pull-right" type="text" @click="quote(comment)">回复</el-button>
						</el-card>
					</div>
				</div>
				<div class="comment-post">
					<p class="w100 fz-18 mb-10" style=" border-bottom: 1px solid rgb(230, 230, 230);">我也来说两句</p>
					<el-card class="mb-10 quote" v-if="Object.keys(reply).length > 0" shadow="hover">
						<el-button class="pull-right" type="text" @click="closeQuote()">关闭</el-button>
						<p class="fz-24" style="width: 80%;">回复<strong>{{reply.user_name}}</strong>的话：<strong>{{reply.content}}</strong></p>
					</el-card>
					<Form
						class="comment-form"
						ref="commentForm"
						:FormSetting="{'label-width': '150px'}"
						:FormData="commentForm"
						route="comment"
					/>
					<div class="txt-c">
						<el-button type="primary" @click="submitComment">提交</el-button>
					</div>
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>
<script>
import { mavonEditor } from 'mavon-editor';
import Form from '@/components/common/Form.vue';
import {ajax} from '../../utils/ajax.js';
import {transformTime} from '../../utils/utils.js';
export default {
	name: 'Article',
	components: {
		Form,
	},
	data() {
		return {
			article: {},

			// 评论
			loading: true,
			comments: [],

			filter: {},

			reply: {},
			commentForm: {
				// user_id: '用户id'暂不处理直接留空
				formField: [
					{
						component: 'ElInput',
						label: '名称',
						field: 'user_name',
						value: null,
					},
					{
						component: 'ElInput',
						label: '邮箱(不公开)',
						field: 'user_email',
						rules: [
							{
								method: 'patternValid',
								params: {
									pattern: 'email',
								},
							},
						],
						value: null,
					},
					{
						component: 'ElInput',
						field: 'user_website',
						label: '个人网站',
						rules: [
							{
								method: 'patternValid',
								params: {
									pattern: 'website',
								},
							},
						],
						value: null,
					},
					{
						component: 'ElInput',
						inputType: 'textarea',
						field: 'content',
						label: '评论',
						rules: [
							{
								method: 'lengthValid',
								params: {
									length: [5, 200],
								},
							},
						],
						autosize: {
							minRows: 6,
							maxRows: 8,
						},
						value: null,
					},
				]
			},
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
					if (data === '') {
						this.$router.push('/NotFound');
					} else {
						this.article = data;
						mavonEditor.mixins[0].methods.$render(data.content, (render) => {
							this.article['render_content'] = render;
						});
					}
				});
		},
		getComment() {
			this.loading = true;
			ajax('get', `/home/article/${this.$route.params.id}/comment`)
				.then(({data}) => {
					this.loading = false;
					this.comments = data.map(item => {
						if (item.pid) {
							item['reply'] = data.find(d => d.id === item.pid);
							return item;
						} else {
							return item;
						}
					});
				});
		},
		// 提交评论
		submitComment() {
			this.$refs['commentForm'].validate()
				.then(({FormData, params}) => {
					if (Object.keys(this.reply).length > 0) {
						params['pid'] = this.reply.id;
					}
					params['article_id'] = this.$route.params.id;
					ajax('post', `/home/article/${this.$route.params.id}/comment`, params)
						.then(({data}) => {
							if (Object.keys(data).includes('id')) {
								this.$message.success('提交成功');
								this.getComment({page: 1});
								this.closeQuote();
								this.$refs['commentForm'].reset();
							} else {
								this.$message.success('提交失败');
							}
						});
				});
		},
		// 回复
		quote(comment) {
			const $wrap = this.$refs['elscrollbar'].$refs['wrap'];
			$wrap.scrollTop = $wrap.scrollHeight - $wrap.clientHeight;
			this.reply = comment;
		},
		closeQuote() {
			this.reply = {};
		},
	},
};
</script>
<style lang="scss" scoped>
	.comment {
		margin-top: 30px;
		border-top: 1px dashed rgb(230, 230, 230);
		.comment-show {
			min-height: 250px;
			padding-bottom: 10px;
			.no-comment {
				line-height: 250px;
			}
		}
		.comment-form {
			width: 650px;
		}
	}
</style>
