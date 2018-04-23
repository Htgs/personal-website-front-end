<template>
	<div :class="params.className" @click="detail(row)" :title="row[field]">
		{{row[field]}}
	</div>
</template>
<script>
	export default {
		props: {
			row: Object,
			field: String,
			params: Object,
		},
		methods: {
			detail () {
				this.$router.push({
					name: this.params.detailUrl,
					params: { id: this.row.id },
					query: { current: this.params.current }
				})
			}
		}
	}
</script>
