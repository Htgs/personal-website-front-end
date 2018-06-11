<template>
	<div>
		<el-upload
			action="/"
			list-type="picture-card"
			accept=".jpg,.jpeg,.png"
			:auto-upload="false"
			:file-list="formItemData.value"
			:on-change="handleChange"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove"
			:on-exceed="handleExceed"
			:limit="formItemData.limit ? formItemData.limit : 1">
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible" :title="formItemData.label" append-to-body>
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'FormElUpload',
	props: {
		formItemData: Object,
	},
	data() {
		return {
			dialogImageUrl: '',
			dialogVisible: false,
		};
	},
	methods: {
		handleChange(file, fileList) {
			this.formItemData.value = fileList;
		},
		handleRemove(file, fileList) {
			this.formItemData.value = [];
		},
		handleExceed(file, fileList) {
			let limit = this.formItemData.limit ? this.formItemData.limit : 1;
			this.$message.warning(`超出文件个数限制，最大文件上限为${limit}`);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		}
	},
};
</script>
