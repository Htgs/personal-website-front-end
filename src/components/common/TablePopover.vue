<template>
	<div :class="params.className" v-popover:popover>
		{{row[field]}}
		<el-popover
			ref="popover"
			:placement="placement"
			:width="width"
			:trigger="trigger">
			<div class="popBox">{{row[field]}}</div>
		</el-popover>
	</div>
</template>
<script>
export default {
	name: 'TablePopover',
	props: {
		row: Object,
		field: String,
		params: Object,
	},
	computed: {
		placement() {
			if (this.params.popoverPlacement) {
				return this.params.popoverPlacement;
			} else {
				return 'top-start';
			}
		},
		width() {
			if (this.params.popoverWidth) {
				return this.params.popoverWidth;
			} else {
				return '300';
			}
		},
		trigger() {
			if (this.params.popoverTrigger) {
				return this.params.popoverTrigger;
			} else {
				return 'hover';
			}
		},
	},
};
</script>
<style scoped>
	.popBox {
		max-width: 300px;
		max-height: 300px;
		overflow-y: auto;
	}
</style>
