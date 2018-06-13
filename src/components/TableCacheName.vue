<template>
	<div>
		{{getname()}}
	</div>
</template>
<script>
import {mapState} from 'vuex';
import {isArray, isObject} from '../utils/utils.js';
export default {
	name: 'TableCacheName',
	props: {
		row: Object,
		field: String,
		params: Object,
	},
	computed: {
		cache() {
			return this.$store.state[this.params['cache']];
		}
	},
	methods: {
		getname() {
			if (isArray(this.cache)) {
				// 如果是数组类型的缓存数据
				let temp = this.cache.find(item => item.id === this.row[this.field]);
				if (temp) {
					return temp[this.params['rowName']];
				} else {
					return '';
				}
			} else if (isObject(this.cache)) {
				// 对象类型的缓存数据
				return this.cache[this.row[this.field]];
			}
		},
	},
};
</script>
