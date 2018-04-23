<template>
	<el-switch
		v-model="status"
		active-color="#13ce66"
		inactive-color="#ff4949"
		@change="statusChange(row)">
	</el-switch>
</template>
<script>
	export default {
		name: 'status',
		props: {
			row: Object,
		},
		data () {
			let status = this.row['status'] === 0 ? false : true
			return {
				status: status
			}
		},
		methods: {
			statusChange () {
				this.$emit('status', this.row)
			}
		},
		watch: {
			'row.status': function (nv) {
				if (nv === 1) {
					this.status = true
				} else {
					this.status = false
				}
			}
		}
	}
</script>
