<template>
	<div class="uploader">
		<div v-if="formItemData.value" class="uploader-img mb-10">
			<img :src="formItemData.url">
		</div>
		<label v-else class="uploader-opt" :for="'uploader-' + formItemData.field">
			<i class="el-icon-plus"></i>
		</label>
		<input class="uploader-inp" hidden="hidden" type="file" @change="filechange" :id="'uploader-' + formItemData.field">
		<el-button type="danger" v-if="formItemData.value" @click="clearFile">删除</el-button>
		<div class="uploader-tip" :id="'tip-' + formItemData.field">只能上传jpg/png文件，且不超过200kb</div>
	</div>
</template>

<script>
export default {
	name: 'uploader',
	props: {
		formItemData: Object,
	},
	mounted() {
		this.formItemData['url'] = this.formItemData.value ? this.formItemData.value : null;
		this.$forceUpdate();
	},
	methods: {
		filechange() {
			let file = document.querySelector('#uploader-' + this.formItemData.field).files[0];
			if (!file) return;
			let tip = document.querySelector('#tip-' + this.formItemData.field);
			if (file.type != 'image/jpg' && file.type != 'image/png' && file.type != 'image/jpeg') {
				tip.innerText = '请选择正确的文件格式';
				tip.classList.add('err');
				return;
			} else if (file.size / 1024 > 200) {
				tip.innerText = '文件太大';
				tip.classList.add('err');
				return;
			} else {
				tip.innerText = '只能上传jpg/png文件，且不超过200kb';
				tip.classList.remove('err');
			}
			let fr = new FileReader();
			fr.onload = (e) => {
				this.formItemData.url = e.target.result;
				this.formItemData.value = file;
			};
			fr.readAsDataURL(file);
		},
		clearFile() {
			this.formItemData.value = '';
			this.formItemData.url = null;
		}
	}
};
</script>

<style lang="less" scoped>
.uploader {
	position: relative;
	.uploader-img {
		height: 120px;
		img {
			height: 100%;
		}
	}
	.uploader-opt {
		display: block;
		width: 120px;
		height: 120px;
		line-height: 120px;
		text-align: center;
		border: 1px dashed #d9d9d9;
		.uploader-btn {
			color: #8c939d;
			font-size: 28px;
		}
	}
	.uploader-opt:hover {
		border-color: #20a0ff;
	}
	.uploader-inp {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.uploader-tip {
		font-size: 12px;
		padding-top: 4px;
	}
	.uploader-tip.err {
		color: #ff4949;
	}
}
</style>
