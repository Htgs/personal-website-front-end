<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>当前{{formItemData.label}}的值：</span>
			<span>{{formItemData.value}}</span>
		</div>
		<el-row v-if="datas.length > 0" class="list-item mb-10" :gutter="10" v-for="(formData, ky) in datas" :key="ky">
			<el-col :span="22">
				<Form
					:ref="`itemForm-${ky}`"
					:FormSetting="{'label-width': '80px', inline: true}"
					:FormData="formData"
				/>
			</el-col>
			<el-col :span="2" class="txt-c">
				<el-button type="text" @click="del(ky)">删除</el-button>
			</el-col>
		</el-row>
		<div v-if="datas.length === 0" class="txt-c fz-18">暂时还没有添加{{formItemData.label}}数据</div>
		<div class="txt-c">
			<el-button type="primary" @click="add">新增</el-button>
			<el-button v-if="datas.length > 0" type="primary" @click="save">保存</el-button>
		</div>
	</el-card>
</template>
<script>
import {setFormField} from '@/utils/utils.js';
import Form from '@/components/common/Form.vue';
export default {
	name: 'FormJSONInput',
	components: {
		Form,
	},
	props: {
		route: String,
		formItemData: Object,
	},
	data() {
		return {
			datas: [],
		};
	},
	methods: {
		setFormData(data = {}) {
			let obj = {};
			obj['formField'] = this.formItemData.JSONFields.map(item => {
				return {
					...item,
					value: null,
				};
			});
			obj['formField'] = setFormField(obj['formField'], data);
			return obj;
		},
		add() {
			this.datas.push(this.setFormData());
		},
		del(idx) {
			this.datas.splice(idx, 1);
		},
		save() {
			let all = [];
			Object.keys(this.$refs).forEach(field => {
				if (this.$refs[field][0]) { // 删除datas中的表单数据之后会存在空数组
					all.push(this.$refs[field][0].validate());
				}
			});
			Promise.all(all)
				.then(res => {
					let result = [];
					res.forEach(({FormData, params}) => {
						result.push(params);
					});
					this.formItemData.value = JSON.stringify(result);
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	watch: {
		'formItemData.value': function(nv, v) {
			if (this.datas.length === 0 && JSON.parse(nv).length > 0) {
				// 如果当前数据为0而且表单值的长度大于0时，是页面初始化
				const data = JSON.parse(nv);
				data.forEach(d => {
					this.datas.push(this.setFormData(d));
				});
			}
		},
	},
};
</script>
<style lang="scss" scoped>
	.list-item {
		padding-top: 5px;
		padding-bottom: 20px;
		border-bottom: 1px dashed rgb(230, 230, 230);
		.list-item-label {
			display: inline-block;
			width: 50px;
		}
		.list-item-input {
			width: calc(100% - 60px);
		}
	}
</style>
