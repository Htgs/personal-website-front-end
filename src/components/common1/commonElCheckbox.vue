<template>
	<el-checkbox 
		v-model="check"
		:name="formItemData.field"
		@change="checkboxChange"> 
	</el-checkbox>
</template>

<script>
	export default {
		name: 'commonElCheckbox',
		props: {
			formItemData: Object,
		},
		data () {
			return {
				check: false
			}
		},
		methods: {
			checkboxChange (e) {
				this.formItemData.value = this.check
			},
		}
	}
</script>
