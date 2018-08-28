<template>
	<div>
		<el-button type="text" @click="showEdit">查看</el-button>
		<el-dialog
			title="文章内容"
			:visible.sync="editVisible"
			:fullscreen="true"
			append-to-body
			center>
			<editor @full-screen="fullScreen" @change="change" />
		</el-dialog>
	</div>
</template>
<script>
import editor from './editor.vue';
export default {
	name: 'FormMDEditor',
	components: {
		editor,
	},
	props: {
		route: String,
		formItemData: Object,
	},
	data() {
		return {
			editVisible: false,
		};
	},
	methods: {
		showEdit() {
			this.editVisible = true;
		},
		change(a, b, c) {
			console.log(a);
			console.log(b);
			console.log(c);
		},
		fullScreen(c, ds, s) {
			console.log(c);
			console.log(ds);
			console.log(s);
		}
	}
};
</script>
