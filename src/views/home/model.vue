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
		console.log(theModel);
		next(vm => {
			vm.initCurrentModel(to);
		});
	},
	methods: {
		initCurrentModel($route) {
			if (theModel[$route.params.model] && theModel[$route.params.model]._hasCustomComponent) {
				this.hasCustomComponent = true;
				this.currentModel = theModel[$route.params.model];
			} else {
				this.hasCustomComponent = false;
				this.set($route);
			}
			console.log(this.currentModel);
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
			// 不是详情页：
			// 存在current和没有current的情况
			// 详情页
			// 存在current和没有current的情况
			if (routeObj.params.id) {
				if (!routeObj.query.current) {
					console.error(`${routeObj.params.model}中的detailLink组件缺少了current参数`);
				}
				this.routePath = `${routeObj.params.model}/${routeObj.params.id}/${routeObj.query.current}`;
				this.mixCurrentModel(`${routeObj.params.model}Detail`, routeObj.query.current);
			} else {
				if (routeObj.query.current) {
					this.routePath = routeObj.query.current;
					this.mixCurrentModel(routeObj.params.model, routeObj.query.current);
				} else {
					if (theModel[routeObj.params.model].hasTabs) {
						this.routePath = theModel[routeObj.params.model].commonTabs.lists[0].name;
						this.mixCurrentModel(routeObj.params.model, this.routePath);
					} else {
						this.routePath = routeObj.params.model;
						this.mixCurrentModel(routeObj.params.model, routeObj.params.model);
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
