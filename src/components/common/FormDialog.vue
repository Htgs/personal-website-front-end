<template>
	<el-dialog class="components-dialogs" :visible="commonFormVisible" :close-on-click-modal="false" :show-close="false">
		<div slot="title" class="clearfix p-10">
			<h1 class="dialogs-title pull-left">{{commonFormData.title}}</h1>
			<i class="dialogs-close el-icon-close pull-right" @click="close" />
		</div>
		<div class="h100 relative ovh">
			<el-scrollbar :style="{'height': 'calc(100% + 18px)'}">
				<!-- <el-form label-width="100px" :model="commonFormData" ref="formDialogData">
					<commonFormItem
						:commonFormData="commonFormData"
						:route="route"
					/>
				</el-form> -->
				<Form
					ref="formDialogData"
					:FormSetting="{'label-width': '100px'}"
					:FormData="commonFormData"
				/>
			</el-scrollbar>
		</div>
		<div slot="footer" class="dialog-opt">
			<commonElButton
				:params="saveSetting"
				v-on:save="save"
			/>
			<commonElButton
				:params="resetSetting"
				v-on:reset="reset"
			/>
		</div>
	</el-dialog>
</template>
<script>
import Form from './Form.vue';
import commonElButton from './ElButton.vue';
export default {
	name: 'commonFormDialog',
	props: {
		commonFormVisible: Boolean,
		commonFormData: Object,
		// 用于check验证路径
		route: String,
	},
	components: {
		Form,
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
			this.$refs['formDialogData'].validate()
				.then(({FormData, params}) => {
					this.saveSetting.loading = true;
					this.$emit('save', FormData);
				})
				.catch(_ => {
					// console.log(_);
				});
		},
		reset() {
			this.$refs['formDialogData'].reset();
		},
	},
};
</script>
