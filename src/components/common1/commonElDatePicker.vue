<template>
	<el-date-picker
		v-model="params.value"
		:class="className"
		:type="type"
		:placeholder="`请选择${title}`"
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
				console.log(value)
				this.$emit('selectChange', { date: value })
			},
		}
	}
</script>
