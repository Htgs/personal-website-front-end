<template>
	<div>{{setValue()}}</div>
</template>
<script>
import {transformTime} from '@/utils/utils.js';
export default {
	name: 'TableTime',
	props: {
		row: Object,
		field: String,
		params: Object,
	},
	data() {
		return {
			// 需要转换的字段缓存
			transformTimeFields: ['created_at', 'updated_at', 'deleted_at'],
		};
	},
	methods: {
		setValue() {
			if (this.transformTimeFields.includes(this.field)) {
				return transformTime(this.row[this.field]);
			} else {
				return this.row[this.field];
			}
		},
	},
};
</script>
