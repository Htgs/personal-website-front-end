<template>
	<el-input-number
		v-model="formItemData.value"
		@change="handleChange"
		controls-position="right"
		:min="formItemData.min ? formItemData.min : 0"
		:max="formItemData.max"
		:label="formItemData.label"
	/>
</template>
<script>
	export default {
		name: 'commonFormElInputNumber',
		props: {
			formItemData: Object,
		},
		methods: {
			handleChange (value) {
				this.formItemData.value = value
			},
		}
	}
</script>
