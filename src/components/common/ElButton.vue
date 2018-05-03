<template>
	<el-button
		:type="type"
		:loading="loading"
		:disabled="disabled"
		:class="params.className"
		@click="click">
		{{display_name}}
	</el-button>
</template>
<script>
import { isFunction } from '../../utils/utils';
export default {
	name: 'ElButton',
	props: {
		params: {
			type: Object,
			default() {
				return {
					type: 'primary',
					loading: false,
					disabled: false,
					className: '',
					display_name: '新增',
					clickFn: (vm, scope) => {
						vm.$emit('add', { type: 'add', ...scope });
					},
				};
			},
		},
		scope: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	computed: {
		type() {
			if (this.params.type) {
				return this.params.type;
			} else {
				return 'primary';
			}
		},
		loading() {
			if (this.params.loading) {
				return this.params.loading;
			} else {
				return false;
			}
		},
		disabled() {
			if (this.params.disabled) {
				return this.params.disabled;
			} else {
				return false;
			}
		},
		className() {
			if (this.params.className) {
				return this.params.className;
			} else {
				return '';
			}
		},
		display_name() {
			if (this.params.display_name) {
				return this.params.display_name;
			} else {
				return '新增';
			}
		},
	},
	methods: {
		click() {
			if (isFunction(this.params.clickFn)) {
				this.params.clickFn(this, this.scope);
			}
		},
	},
};
</script>
