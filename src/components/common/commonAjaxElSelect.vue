<template>
	<el-select 
		clearable
		:placeholder="'请选择' + params.title"
		v-model="params.value"
		v-loading="loading"
		@change="selectChange(params)">
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
		name: 'commonAjaxElSelect',
		props: {
			params: Object,
		},
		data () {
			return {
				loading: false,
				selectList: [],
			}
		},
		mounted () {
			this.getAjaxData()
		},
		methods: {
			getAjaxData () {
				if (!isFunction(this.params.getDataFn)) {
					console.error(`${this.route}模块中表单域:'${this.params.label}'缺少getDataFn方法`)
					return
				}
				this.loading = true
				this.params.getDataFn(this)
					.then(data => {
						this.loading = false
						this.selectList = data
					})
			},
			selectChange ({ field, value }) {
				this.$emit('selectChange', { [field]: value })
			},
		},
	}
</script>
