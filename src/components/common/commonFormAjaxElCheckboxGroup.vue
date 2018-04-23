<template>
	<el-checkbox-group 
		v-model="formItemData.value"
		v-loading.body="loading">
		<el-checkbox 
			v-for="item in checkboxList"
			:label="item.id"
			:key="item.id">
			{{item.name}}
		</el-checkbox>
	</el-checkbox-group>
</template>
<script>
	import { isFunction } from '../utils/utils.js'
	export default {
		name: 'commonFormAjaxElCheckboxGroup',
		props: {
			route: String,
			formItemData: Object,
		},
		data () {
			return {
				loading: true,
				checkboxList: [],
			}
		},
		mounted () {
			this.getAjaxData()
		},
		methods: {
			getAjaxData () {
				if (!isFunction(this.formItemData.getDataFn)) {
					console.error(`${this.route}模块中表单域:'${this.formItemData.label}'缺少getDataFn方法`)
					return
				}
				this.loading = true
				this.formItemData.getDataFn(this)
					.then(data => {
						this.loading = false
						this.checkboxList = data
					})
			},
		},
	}
</script>
