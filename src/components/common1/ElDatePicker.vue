<template>
	<el-date-picker
		v-model="params.value"
		:class="className"
		:type="type"
		:placeholder="`请选择${title}`"
		start-placeholder="开始日期"
		end-placeholder="结束日期"
		:format="params.format ? params.format : 'yyyy-MM-dd'"
		:value-format="params['value-format'] ? params['value-format'] : null"
		:picker-options="params.pickerOptions"
		:default-time="['00:00:00', '23:59:59']"
		@change="dateChange">
	</el-date-picker>
</template>
<script>
	export default {
		name: 'commonElDatePicker',
		props: {
			params: {
				type: Object,
				default () {
					return {
						field: 'date',
						value: undefined,
						title: '日期范围',
						type: 'daterange',
						className: 'mr-10',
					}
				}
			}
		},
		computed: {
			field () {
				if (this.params.field) {
					return this.params.field
				} else {
					return 'date'
				}
			},
			title () {
				if (this.params.title) {
					return this.params.title
				} else {
					return '日期范围'
				}
			},
			type () {
				if (this.params.type) {
					return this.params.type
				} else {
					return 'daterange'
				}
			},
			className () {
				if (this.params.className) {
					return this.params.className
				} else {
					return ''
				}
			},
		},
		methods: {
			dateChange (value) {
				this.$emit('selectChange', { date: value })
			},
			clear () {
				this.params.value = null
			},
		}
	}
</script>
