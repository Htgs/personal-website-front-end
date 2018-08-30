<template>
	<div>
		<el-button type="text" class="mr-10" @click="showEdit">查看</el-button>
		<el-button v-if="formItemData.value.length > 0" type="text" @click="showContent">预览</el-button>
		<el-dialog
			title="文章内容"
			:visible.sync="editVisible"
			:fullscreen="true"
			append-to-body
			center>
			<p class="mb-10">编辑完成后记得点保存或者使用Ctrl + s</p>
			<div id="editor">
				<mavon-editor
					ref="md"
					style="height: 100%"
					v-model="content"
					:imageFilter="imageFilter"
					@save="$save"
					@change="$change"
				/>
					<!-- @imgAdd="$imgAdd"
					@imgDel="$imgDel" -->
			</div>
		</el-dialog>
		<el-dialog
			title="内容预览"
			:visible.sync="contentVisible"
			append-to-body
			center>
			<div v-html="render_content"></div>
		</el-dialog>
	</div>
</template>
<script>
// https://github.com/hinesboy/mavonEditor
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import {ajax} from '@/utils/ajax.js';
export default {
	name: 'FormMDEditor',
	components: {
		mavonEditor,
	},
	props: {
		route: String,
		formItemData: Object,
	},
	data() {
		return {
			editVisible: false,
			contentVisible: false,

			content: '',
			render_content: '',
			// 记录已经上传的图片
			images: [],
			// 自动缓存计时
			timer: null,
		};
	},
	mounted() {
		const {type, value} = this.formItemData;
		if (type === 'edit') {
			this.content = value;
			mavonEditor.mixins[0].methods.$render(value, (render) => {
				this.render_content = render;
			});
		}
	},
	methods: {
		showEdit() {
			this.editVisible = true;
		},
		showContent() {
			this.contentVisible = true;
		},
		imageFilter(file) {
			const type = ['png', 'jpg', 'jpeg'];
			if (!type.includes(file.type.split('/')[1])) {
				this.$message({
					message: '只支持png、jpg、jpeg类型的图片',
					type: 'warning',
				});
				return false;
			}
			if (file.size > 1024 * 100) {
				this.$message({
					message: '图片大小不能超过100kb',
					type: 'warning',
				});
				return false;
			}
			return true;
		},
		// // 绑定@imgAdd event
		// $imgAdd(pos, $file) {
		// 	// 如果是连续单个图片多次上传。最后一个图片的地址不会在编辑器中更新
		// 	this.images.push({
		// 		pos,
		// 		file: $file,
		// 	});
		// },
		// $imgDel([file, pos]) {
		// 	this.images = this.images.filter(image => image.pos !== pos);
		// 	// let params = {
		// 	// 	images: image.url,
		// 	// };
		// 	// ajax('post', `/api/admin/article/image/delete`, params)
		// 	// 	.then(({data}) => {
		// 	// 		console.log(data);
		// 	// 	});
		// },
		$save(value, render) {
			this.render_content = render;
			this.formItemData.value = value;
			// new Promise((resolve, reject) => {
			// 	if (this.images.length > 0) {
			// 		let params = {};
			// 		this.images.forEach(image => {
			// 			params[`image${image.pos}`] = image.file;
			// 		});
			// 		// 把多个文件同时上传到服务器
			// 		ajax('post', '/api/admin/article/image', params, true)
			// 			.then(({data}) => {
			// 				Object.keys(data).forEach(field => {
			// 					const pos = field.split('image')[1];
			// 					this.$refs.md.$img2Url(pos, `/${data[field]}`);
			// 				});
			// 				// 直接返回更新后的mdValue
			// 				resolve(this.$refs.md.d_value);
			// 			});
			// 	} else {
			// 		resolve(value);
			// 	}
			// })
			// 	.then(mdValue => {
			// 		this.render_content = this.$refs.md.d_render;
			// 		this.formItemData.value = mdValue;
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 	});
		},
		$change(value, render) {
			this.render_content = render;
		},
	},
};
</script>
<style>
#editor {
	margin: auto;
	width: 100%;
	height: 530px;
}
</style>
