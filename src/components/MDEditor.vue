<template>
	<div id="editor">
		<mavon-editor
			style="height: 100%"
			v-model="content"
			:imageFilter="imageFilter"
			@imgAdd="$imgAdd"
			@imgDel="$imgDel"
			@save="$save"
			@change="$change"
		/>
	</div>
</template>
<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
	name: 'MDEditor',
	components: {
		mavonEditor,
	},
	data() {
		return {
			content: '',
			// 自动缓存计时
			timer: null,
		};
	},
	methods: {
		imageFilter(a, b, c) {
			console.log(a);
			console.log(b);
			console.log(c);
		},
		// 绑定@imgAdd event
		$imgAdd(pos, $file) {
			console.log(pos);
			console.log($file);
			// // 第一步.将图片上传到服务器.
			// var formdata = new FormData();
			// 	formdata.append('image', $file);
			// axios({
			// 	url: 'server url',
			// 	method: 'post',
			// 	data: formdata,
			// 	headers: { 'Content-Type': 'multipart/form-data' },
			// }).then((url) => {
			// 	// 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
			// 	/**
			// 	* $vm 指为mavonEditor实例，可以通过如下两种方式获取
			// 	* 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
			// 	* 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
			// 	*/
			// 	$vm.$img2Url(pos, url);
			// });
		},
		$imgDel(filename) {
			console.log(filename);
		},
		$save(value, render) {
			this.formItemData.value = render;
		},
		$change(value, render) {
			console.log(value);
			console.log(render);
		},
	}
};
</script>
<style>
#editor {
	margin: auto;
	width: 100%;
	height: 530px;
}
</style>
