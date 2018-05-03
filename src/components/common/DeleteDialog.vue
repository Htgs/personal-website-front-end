<template>
	<el-dialog class="common-delete-dialog" title="提示信息" :visible="commonDeleteVisible" :show-close="false" :close-on-click-modal="false">
		<i class="inline-block vam mr-20 icon icon-help"></i>
		<span>您确定要删除该信息吗？</span>
		<span slot="footer" class="dialog-footer">
			<el-button type="danger" @click="submit">确 定</el-button>
			<el-button @click="cancel">取 消</el-button>
		</span>
	</el-dialog>
</template>
<script>
export default {
	name: 'Deletedialog',
	props: {
		commonDeleteVisible: {
			type: Boolean,
			default: false
		},
		commonDeleteData: Object,
	},
	methods: {
		// 确定删除
		submit() {
			this.$emit('destroy', this.commonDeleteData);
		},
		// 取消
		cancel() {
			this.$emit('closeDialog', 'delete');
		},
	},
};
</script>
