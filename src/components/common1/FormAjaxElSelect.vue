<template>
	<el-select 
		clearable
		:placeholder="formItemData.placeholder ? formItemData.placeholder : '请选择' + formItemData.label"
		:disabled="formItemData.disabled"
		v-model="formItemData.value"
		v-loading="loading"
		@change="selectChange">
		<el-option
			v-for="item in selectList"
			:label="item.name"
			:value="item.id"
			:key="item.id">
		</el-option>
	</el-select>
</template>
<script>
	import { isFunction } from '../utils/utils.js'
	export default {
		name: 'commonFormAjaxElSelect',
		props: {
			route: String,
			formItemData: Object,
		},
		data () {
			return {
				loading: true,
				selectList: [],
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
						this.selectList = data
					})
			},
			selectChange (value) {
				this.formItemData.value = value
			},
		},
	}
</script>
