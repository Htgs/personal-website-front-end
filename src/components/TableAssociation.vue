<template>
	<div>
		{{getname()}}
	</div>
</template>
<script>
export default {
	name: 'TableAssociation',
	props: {
		row: Object,
		field: String,
		params: Object,
	},
	methods: {
		getname() {
			return this.row[this.params['association']][this.field];
		},
	},
};
</script>
