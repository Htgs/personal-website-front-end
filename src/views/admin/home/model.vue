<template>
	<div class="common-model views">
		<component
			v-if="hasCustomComponent"
			:is="currentModel.CustomComponent"
		/>
		<commonMain v-else :model="currentModel" :route="routePath" />
	</div>
</template>
<script>
import theModel from './model.js';
import commonMain from '@/components/common/commonMain.vue';
export default {
	name: 'Model',
	components: {
		commonMain,
	},
	data() {
		return {
			routePath: '',
			currentModel: {},

			hasCustomComponent: false,
		};
	},
	beforeRouteEnter(to, from, next) {
		// console.log(theModel);
		next(vm => {
			vm.initCurrentModel(to);
		});
	},
	methods: {
		initCurrentModel($route) {
			const {model} = $route.params;
			if (theModel[model] && theModel[model]._hasCustomComponent) {
				this.hasCustomComponent = true;
				this.currentModel = theModel[model];
			} else {
				this.hasCustomComponent = false;
				this.set($route);
			}
			// console.log(this.currentModel);
		},
		/**
		 * [mixCurrentModel 把panelData中的当前数据是混合到当前模块数据中]
		 * @Author   szh
		 * @DateTime 2018-03-01
		 * @param    {String}   model   [管理模块下的子模块]
		 * @param    {String}   mixType [当前tabs的类型的数据]
		 */
		mixCurrentModel(model, mixType) {
			this.currentModel = Object.assign({}, theModel[model], theModel[model]['panelData'][mixType]);
		},
		/**
		 * [set 设置routePath和currentModel]
		 * @Author   szh
		 * @DateTime 2018-03-02
		 * @param    {Object}   routeObj [当前的路由对象]
		 */
		set(routeObj) {
			const {id, model} = routeObj.params,
				{current} = routeObj.query;
			// console.log(routeObj);
			// 不是详情页：
			// 存在current和没有current的情况
			// 详情页
			// 存在current和没有current的情况
			if (id) {
				if (!current) {
					console.error(`${model}中的detailLink组件缺少了current参数`);
				}
				this.routePath = `/admin/${model}/${id}/${current}`;
				this.mixCurrentModel(`${model}Detail`, current);
			} else {
				if (current) {
					this.routePath = `/admin/${current}`;
					this.mixCurrentModel(model, current);
				} else {
					if (theModel[model].hasTabs) {
						this.routePath = `/admin/${theModel[model].commonTabs.lists[0].name}`;
						this.mixCurrentModel(model, this.routePath);
					} else {
						this.routePath = `/admin/${model}`;
						this.mixCurrentModel(model, model);
					}
				}
			}
		},
	},
	watch: {
		'$route': {
			deep: true,
			handler: function(nv) {
				this.initCurrentModel(nv);
			}
		}
	}
};
</script>
