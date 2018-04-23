<template>
	<el-select clearable v-model="params.value" :class="className" :placeholder="`请选择${title}`" @change="select(params)">
		<el-option
			v-for="item in lists"
			:label="item.label"
			:value="item.value"
			:key="item.label">
		</el-option>
	</el-select>
</template>
<script>
export default {
	name: 'commonElSelect',
	props: {
		params: {
			type: Object,
			default() {
				return {
					field: 'cstatus',
					value: undefined,
					title: '状态',
					lists: [
						{
							label: '启动',
							value: 1
						},
						{
							label: '关闭',
							value: 0
						},
					],
					className: 'mr-10',
				};
			},
		},
	},
	computed: {
		field() {
			if (this.params.field) {
				return this.params.field;
			} else {
				return 'cstatus';
			}
		},
		title() {
			if (this.params.title) {
				return this.params.title;
			} else {
				return '状态';
			}
		},
		lists() {
			if (this.params.lists) {
				return this.params.lists;
			} else {
				return [
					{
						label: '启动',
						value: 1
					},
					{
						label: '关闭',
						value: 0
					},
				];
			}
		},
		className() {
			if (this.params.className) {
				return this.params.className;
			} else {
				return '';
			}
		},
	},
	methods: {
		select({ field, value }) {
			this.$emit('selectChange', { [field]: value });
		}
	},
};
</script>
