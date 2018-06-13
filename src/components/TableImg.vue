<template>
	<div>
		<el-button v-if="row[field]" @click="visible = true" type="text">查看</el-button>
		<el-dialog :title="`${row[params['name']]}的头像`" :visible.sync="visible" append-to-body>
			<img class="block w100 h100" :src="`/${row[field]}`" alt="`@${row[params['name']]}`">
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'TableImg',
	props: {
		row: Object,
		field: String,
		params: Object,
	},
	data() {
		return {
			visible: false,
		};
	},
};
</script>
