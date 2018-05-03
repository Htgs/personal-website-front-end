<template>
	<el-dialog class="components-dialogs" :visible="commonFormVisible" v-loading.body="commonFormLoading" :close-on-click-modal="false" :show-close="false">
		<div slot="title" class="clearfix p-10">
			<h1 class="dialogs-title pull-left">{{commonFormData.title}}</h1>
			<i class="dialogs-close el-icon-close pull-right" @click="close" />
		</div>
		<div class="h100 relative ovh">
			<el-scrollbar :style="{'height': 'calc(100% + 18px)'}">
				<el-form label-width="100px" :model="commonFormData" ref="formDialogData">
					<FormItem
						:commonFormData="commonFormData"
						:route="route"
					/>
				</el-form>
			</el-scrollbar>
		</div>
		<div slot="footer" class="dialog-opt">
			<ElButton
				:params="saveSetting"
				v-on:save="save"
			/>
			<ElButton
				:params="resetSetting"
				v-on:reset="reset"
			/>
		</div>
	</el-dialog>
</template>
<script>
import FormItem from './FormItem.vue';
import ElButton from './ElButton.vue';
export default {
	name: 'FormDialog',
	props: {
		commonFormVisible: Boolean,
		commonFormData: Object,
		commonFormLoading: {
			type: Boolean,
			default: false,
		},
		// 用于check验证路径
		route: String,
	},
	components: {
		commonFormItem,
		commonElButton,
	},
	data() {
		return {
			saveSetting: {
				type: 'primary',
				loading: false,
				disabled: false,
				className: 'btn white',
				display_name: '保存',
				clickFn: (vm) => {
					vm.$emit('save');
				}
			},
			resetSetting: {
				type: 'primary',
				loading: false,
				disabled: false,
				className: 'btn mr-20',
				display_name: '重置',
				clickFn: (vm) => {
					vm.$emit('reset');
				}
			},
		};
	},
	methods: {
		close() {
			this.$emit('closeDialog', 'form');
		},
		save() {
			this.$refs['formDialogData'].validate((valid) => {
				if (valid) {
					this.saveSetting.loading = true;
					this.$emit('save', this.commonFormData);
				} else {
					return false;
				}
			});
		},
		reset() {
			this.$refs['formDialogData'].resetFields();
		},
	},
};
</script>
