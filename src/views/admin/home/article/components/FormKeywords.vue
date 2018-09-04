<template>
	<div>
		<el-tag
			:key="tag"
			v-for="tag in tags"
			closable
			:disable-transitions="false"
			@close="handleClose(tag)">
			{{tag}}
		</el-tag>
		<el-input
			class="input-new-tag"
			v-if="inputVisible"
			v-model="inputValue"
			ref="saveTagInput"
			size="small"
			@keyup.enter.native="handleInputConfirm"
			@blur="handleInputConfirm"
		/>
		<el-button v-else size="small" class="tag-item" @click="showInput">增加标签</el-button>
	</div>
</template>
<script>
export default {
	name: 'FormKeywords',
	props: {
		route: String,
		formItemData: Object,
	},
	data() {
		return {
			tags: [],

			inputVisible: false,
			inputValue: '',
		};
	},
	mounted() {
		const {type, value} = this.formItemData;
		if (type === 'edit') {
			this.tags = value.split(',');
		}
	},
	methods: {
		showInput() {
			this.inputVisible = true;
		},
		handleInputConfirm() {
			if (this.inputValue.length > 0) {
				this.tags.push(this.inputValue);
				this.formItemData.value = this.tags.join(',');
				this.inputValue = '';
				this.inputVisible = false;
			} else {
				this.$message.warning('请输入内容');
			}
		},
		handleClose(tag) {
			this.tags = this.tags.filter(item => item === tag);
			this.formItemData.value = this.tags.join(',');
		},
	},
};
</script>
<style lang="scss">
	.el-tag + .el-tag {
		margin-left: 10px;
	}
	.button-new-tag {
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.input-new-tag {
		width: 90px;
		vertical-align: bottom;
	}
</style>
