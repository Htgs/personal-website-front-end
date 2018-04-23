<template>
	<!--
	标题                 返回（其他按钮）
	次级标题

	详细情况 （部分）

	tabs（部分）

	条件筛选

	表格

	分页
	-->
	<div class="common-main">
		<!-- 标题上方插口 -->
		<!-- <slot name="common-title-before" /> -->

		<!-- 自定义标题 -->
		<div class="common-title clearfix">
			<div class="pull-left">
				<h1 class="mt-10 mb-10">{{commonTitle}}</h1>
			</div>
			<el-button v-if="hasTitleBack" class="pull-right" type="text" @click="handleTitleBack">返回上级</el-button>
		</div>

		<!-- tabs上方插口 -->
		<!-- <slot name="common-tabs-before" /> -->
		<component
			v-if="model.commonTabsBefore"
			:ref="model.commonTabsBefore.ref"
			:is="model.commonTabsBefore.component"
			:params="model.commonTabsBefore.props"
			:route="route"
		/>

		<!-- 切换栏 -->
		<el-tabs class="common-tabs" v-if="hasTabs" :type="commonTabs.type" v-model="tabsActive" @tab-click="handleTabsClick">
			<el-tab-pane
				v-for="tab in commonTabs.lists"
				:label="tab.display_name"
				:name="tab.name"
				:disabled="tab.disabled"
				:key="tab.name"
			/>
		</el-tabs>

		<!-- 条件筛选上方插口 -->
		<!-- <slot name="common-condition-before" /> -->

		<!-- 条件筛选 -->
		<div class="common-condition clearfix">
			<div class="pull-left mr-10">
				<!-- 自定义筛选条件 -->
				<component
					v-for="(conditionItem, idx) in commonConditionComponents"
					:is="conditionItem.component"
					:params="conditionItem.props"
					:key="`conditionItem-${idx}`"
					v-on:selectChange="handleFilter"
				/>
			</div>
			<!-- 默认搜索 -->
			<div class="pull-left" v-if="hasConditionSearch">
				<el-input
					placeholder="搜索"
					v-model.trim="conditionSearch"
					@keyup.enter="handleConditionSearch">
					<el-button slot="append" icon="el-icon-search" @click="handleConditionSearch"></el-button>
				</el-input>
			</div>
			<div class="pull-right ml-10">
				<!-- 自定义操作按钮 -->
				<component
					class="mr-10"
					v-for="(operationItem, idx) in commonOperationComponents"
					:is="operationItem.component"
					:params="operationItem.props"
					:key="`operationItem-${idx}`"
					v-on:customEv="emitOperationBtn"
				/>
				<!-- 新增按钮 -->
				<commonElButton
					v-if="hasConditionAdd"
					v-on:add="add"
				/>
				<!-- 刷新按钮 -->
				<commonElButton
					v-if="hasConditionRefresh"
					:params="conditionRefreshSetting"
					v-on:refresh="refresh"
				/>
			</div>
		</div>

		<!-- 主体表格上方插口 -->
		<!-- <slot name="common-table-before" /> -->

		<!-- 主体表格 -->
		<!-- <div class="common-table mt-10">
			<el-table
				v-loading.body="tableLoading"
				:data="tableData"
				@sort-change="handleTableSort"
				@selection-change="handleTableSelection"
				style="width: 100%">
				<el-table-column
					v-if="hasTableSelection"
					align="center"
					:resizable="false"
					type="selection">
				</el-table-column>
				<el-table-column
					v-if="hasTableIndex"
					align="center"
					:resizable="false"
					type="index"
					label="序号"
					width="70">
				</el-table-column>
				<el-table-column
					v-for="(tf, ky) in commonTableField"
					align="center"
					:resizable="false"
					:label="tf.label"
					:prop="tf.field"
					:sortable="tf.sortable"
					:width="tf.width"
					:key="ky">
					<template slot-scope="scope">
						<component
							v-if="tf.component"
							:is="tf.component"
							:row="scope.row"
							:field="tf.field"
							:params="tf.props"
							:ky="ky"
							v-on:status="emitTableStatus"
						/>
						<div v-else>
							{{scope.row[tf.field]}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					v-if="hasTableOperation"
					label="操作"
					:resizable="false"
					align="center">
					<template slot-scope="scope">
						表格编辑
						<commonElButton
							v-if="hasTableOperationEdit"
							:params="tableEditSetting"
							:scope="scope"
							v-on:edit="tableEdit"
						/>
						表格删除
						<commonElButton
							v-if="hasTableOperationDelete"
							:params="tableDeleteSetting"
							:scope="scope"
							v-on:delete="tableDelete"
						/>
						自定义表格操作按钮
						<component
							v-for="(tableOperationItem, idx) in commonTableOperationComponents"
							:is="tableOperationItem.component"
							:params="tableOperationItem.props"
							:scope="scope"
							:key="`tableOperationItem-${idx}`"
							v-on:customEv="emitOperationBtn"
						/>
					</template>
				</el-table-column>
			</el-table>
		</div> -->
		<!-- 独立出主体表格组件 -->
		<div class="common-table mt-10">
			<commonTable
				v-loading.body="tableLoading"
				:hasTableSelection="hasTableSelection"
				:hasTableIndex="hasTableIndex"
				:hasTableOperation="hasTableOperation"
				:hasTableOperationEdit="hasTableOperationEdit"
				:hasTableOperationDelete="hasTableOperationDelete"
				:tableData="tableData"
				:commonTableField="commonTableField"
				:commonTableOperationComponents="commonTableOperationComponents"
				v-on:handleTableSort="handleTableSort"
				v-on:handleTableSelection="handleTableSelection"
				v-on:tableEdit="tableEdit"
				v-on:tableDelete="tableDelete"
				v-on:emitOperationBtn="emitOperationBtn"
			/>
		</div>

		<!-- 主体分页上方插口 -->
		<!-- <slot name="common-pagination-before" /> -->

		<!-- 主体分页 -->
		<div class="common-pagination p-10">
			<div class="pagination-opt pull-left">
				<!-- 分页批量删除按钮 -->
				<commonElButton
					v-if="hasPaginationBatchDestroy"
					:params="paginationBatchDestroySetting"
					v-on:batchDestroy="batchDestroy"
				/>
				<!-- 自定义分页批量删除按钮 -->
				<component
					v-for="(paginationOperationItem, idx) in commonPaginationOperationComponents"
					:is="paginationOperationItem.component"
					:params="paginationOperationItem.props"
					:key="`paginationOperationItem-${idx}`"
					v-on:customEv="emitOperationBtn"
				/>
			</div>
			<el-pagination
				:class="commonPaginationSetting.className"
				:layout="commonPaginationSetting.layout"
				@current-change="handlePaginationCurrent"
				:current-page="paginationTablePager['current_page']"
				:page-size="paginationTablePager['per_page']"
				:total="paginationTablePager['total']">
			</el-pagination>
		</div>

		<!-- 表单对话框 -->
		<commonFormDialog
			ref="commonFormDialog"
			:commonFormVisible="formVisible"
			:commonFormData="formData"
			:commonFormLoading="formLoading"
			:route="route"
			v-on:save="emitDialogSave"
			v-on:closeDialog="emitCloseDialog"
		/>
		<!-- 删除对话框 -->
		<commonDeleteDialog
			:commonDeleteVisible="deleteVisible"
			:commonDeleteData="deleteData"
			v-on:destroy="emitDialogDestroy"
			v-on:closeDialog="emitCloseDialog"
		/>
		<!-- 自定义对话框 -->
		<!-- <slot name="common-custom-dialog" /> -->
		<component
			v-if="model.commonCustomDialog"
			:ref="model.commonCustomDialog.ref"
			:is="model.commonCustomDialog.component"
			:params="model.commonCustomDialog.props"
			:route="route"
			v-on:refresh="refresh"
		/>
	</div>
</template>

<script>
// serializeData 为ajax提交数据之前序列化方法
import { isFunction, serializeData } from '../utils/utils.js';
import { index, show, store, edit, update, destroy, batchDestroy, status } from '../utils/commonApi.js';

// import ajax from '../../utils/commonApi.js'

import commonElSelect from './commonElSelect.vue';
import commonElButton from './commonElButton.vue';
import commonFormDialog from './commonFormDialog.vue';
import commonDeleteDialog from './commonDeleteDialog.vue';
import commonTable from './commonTable.vue';

export default {
	name: 'commonMain',
	components: {
		commonElSelect,
		commonElButton,
		commonFormDialog,
		commonDeleteDialog,
		commonTable,
	},
	props: {
		model: Object,
		route: String, // 路由请求路径
	},
	computed: {
		// has开头的参数类型为boolean，为true时表示启用
		// common开头的参数表示设置各类型的数据
		hasTitleBack() {
			if (this.model.hasTitleBack) {
				return this.model.hasTitleBack;
			} else {
				return false;
			}
		},
		hasTabs() {
			if (this.model.hasTabs) {
				return this.model.hasTabs;
			} else {
				return false;
			}
		},
		hasConditionSearch() {
			if (this.model.hasConditionSearch) {
				return this.model.hasConditionSearch;
			} else {
				return false;
			}
		},
		hasConditionAdd() {
			if (this.model.hasConditionAdd) {
				return this.model.hasConditionAdd;
			} else {
				return false;
			}
		},
		hasConditionRefresh() {
			if (this.model.hasConditionRefresh) {
				return this.model.hasConditionRefresh;
			} else {
				return false;
			}
		},
		hasTableSelection() {
			if (this.model.hasTableSelection) {
				return this.model.hasTableSelection;
			} else {
				return false;
			}
		},
		hasTableIndex() {
			if (this.model.hasTableIndex) {
				return this.model.hasTableIndex;
			} else {
				return false;
			}
		},
		hasTableOperation() {
			if (this.model.hasTableOperation) {
				return this.model.hasTableOperation;
			} else {
				return false;
			}
		},
		hasTableOperationEdit() {
			if (this.model.hasTableOperationEdit) {
				return this.model.hasTableOperationEdit;
			} else {
				return false;
			}
		},
		hasTableOperationDelete() {
			if (this.model.hasTableOperationDelete) {
				return this.model.hasTableOperationDelete;
			} else {
				return false;
			}
		},
		hasPaginationBatchDestroy() {
			if (this.model.hasPaginationBatchDestroy) {
				return this.model.hasPaginationBatchDestroy;
			} else {
				return false;
			}
		},
		// 标题
		commonTitle() {
			return this.model.commonTitle;
		},
		// tab页
		commonTabs() {
			if (this.model.commonTabs) {
				return this.model.commonTabs;
			} else {
				return {
					type: '',
					lists: []
				};
			}
		},
		// 条件栏的自定义筛选组件
		commonConditionComponents() {
			if (this.model.commonConditionComponents) {
				return this.model.commonConditionComponents;
			} else {
				return [];
			}
		},
		// 条件栏的操作组件
		commonOperationComponents() {
			if (this.model.commonOperationComponents) {
				return this.model.commonOperationComponents;
			} else {
				return [];
			}
		},
		// 表格域
		commonTableField() {
			return this.model.commonTableField;
		},
		// 表格操作组件
		commonTableOperationComponents() {
			if (this.model.commonTableOperationComponents) {
				return this.model.commonTableOperationComponents;
			} else {
				return [];
			}
		},
		// 分页操作组件
		commonPaginationOperationComponents() {
			if (this.model.commonPaginationOperationComponents) {
				return this.model.commonPaginationOperationComponents;
			} else {
				return [];
			}
		},
		// 分页设置
		commonPaginationSetting() {
			if (this.model.commonPaginationSetting) {
				return {
					className: `pull-right ${this.model.commonPaginationSetting.className}`,
					layout: this.model.commonPaginationSetting.layout
				};
			} else {
				return {
					className: 'pull-right',
					layout: 'total, prev, pager, next, jumper'
				};
			}
		},
	},
	data() {
		return {
			tabsActive: '',

			conditionSearch: '',
			conditionRefreshSetting: {
				type: 'primary',
				loading: false,
				disabled: false,
				className: 'icon icon-refresh refresh_rotate',
				display_name: '刷新',
				clickFn: (vm, scope) => {
					vm.$emit('refresh', { type: 'refresh', ...scope });
				}
			},

			// 表格
			tableLoading: false,
			tableData: [],
			tableEditSetting: {
				type: 'text',
				loading: false,
				disabled: false,
				className: '',
				display_name: '编辑',
				clickFn: (vm, scope) => {
					vm.$emit('edit', { type: 'edit', ...scope });
				}
			},
			tableDeleteSetting: {
				type: 'text',
				loading: false,
				disabled: false,
				className: '',
				display_name: '删除',
				clickFn: (vm, scope) => {
					vm.$emit('delete', { type: 'delete', ...scope });
				}
			},
			tableSelection: [],

			paginationBatchDestroySetting: {
				type: 'primary',
				loading: false,
				disabled: false,
				className: '',
				display_name: '删除',
				clickFn: (vm, scope) => {
					vm.$emit('batchDestroy', { type: 'batchDestroy', ...scope });
				}
			},
			// 分页数据
			paginationTablePager: {
				current_page: 1,
				from: 0,
				last_page: 0,
				per_page: 0,
				to: 0,
				total: 0,
				next_page_url: '',
				prev_page_url: ''
			},

			filter: {},

			deleteVisible: false,
			deleteData: {},

			formVisible: false,
			formData: {},
			formLoading: false,
		};
	},
	mounted() {
		if (this.hasTabs) {
			this.tabsActive = this.$route.query.current ? this.$route.query.current : this.$route.params.model;
		}
		// 避免了在与自定义的commonMain组件切换时出现/api/common的请求
		if (this.route && this.route !== '') {
			this.ajaxIndex();
		}
	},
	methods: {
		// 头部返回上级
		handleTitleBack() {
			this.$router.push(this.$route.path.substr(0, this.$route.path.indexOf(this.$route.params.id) - 1));
		},
		// 切换tabs页
		handleTabsClick(tab) {
			this.$router.replace({
				query: {
					...this.$route.query,
					current: tab.name
				}
			});
			this.filter = {}; // tabs页切换时，需要把条件过滤状态清除
			this.$emit('toggleTabsPanel', tab.name);
		},
		// 条件过滤
		handleConditionSearch(e) {
			this.handleFilter({ query_text: this.conditionSearch });
		},
		// 表格排序过滤
		handleTableSort(sort) {
			if (sort.order === null) return;
			let order = '';
			if (sort.order === 'ascending') {
				order = 'asc';
			} else if (sort.order === 'descending') {
				order = 'desc';
			}
			this.handleFilter({ _order: order, _sort: sort.prop });
		},
		// 表格多选
		handleTableSelection(selects) {
			let selection = [];
			selects.forEach(s => {
				selection.push(s.id);
			});
			this.tableSelection = selection;
		},
		// 表格翻页
		handlePaginationCurrent(page) {
			this.handleFilter({ page: page });
		},
		// 自定义的表格操作通讯方法
		emitOperationBtn(msg) {
			if (this.model.customOperationFn && isFunction(this.model.customOperationFn[msg.type])) {
				this.model.customOperationFn[msg.type](this, msg);
			} else {
				console.error('请在model中customOperationFn对象添加对应按钮type的回调方法');
			}
		},
		// 表单对话框通讯方法
		emitDialogSave(msg) {
			this[`${msg.type}Save`](msg);
		},
		// 删除对话框通讯方法
		emitDialogDestroy(msg) {
			destroy(this.route, msg.id)
				.then(data => {
					this.$mg(this, '删除成功', 'success', 1000);
					this.emitCloseDialog('delete');
					this.ajaxIndex();
				});
		},
		// 关闭对话框
		emitCloseDialog(msg) {
			this[`${msg}Visible`] = false;
			this[`${msg}Data`] = {};
		},

		// 设置表单对话框数据
		setFormData(type, row = {}) {
			let data = {
				id: row.id,
				type: type,
				title: type === 'add' ? `${this.model.commonTitle}-新增` : `${this.model.commonTitle}-编辑`,
				formField: this.model.commonFormFieldsFn(type),
			};
			data['formField'].forEach(item => {
				// 在打开对话框同时赋值
				if (Object.keys(row).includes(item['field'])) {
					if (item.customEditFn) {
						item['value'] = item.customEditFn(row[item['field']]);
					} else {
						item['value'] = row[item['field']];
					}
				}
			});
			return data;
		},
		// 动态方法
		// 新增
		add(scope) {
			this.formData = this.setFormData(scope.type);
			this.formVisible = true;
		},
		// 刷新
		refresh(scope) {
			this.filter = {};
			this.conditionSearch = '';
			this.ajaxIndex();
		},
		// 表格编辑
		tableEdit(scope) {
			this.formVisible = true;
			this.formLoading = true;
			edit(this.route, scope.row.id)
				.then(data => {
					this.formLoading = false;
					this.formData = this.setFormData(scope.type, data);
				});
		},
		// 表格删除
		tableDelete(scope) {
			this.deleteData = scope.row;
			this.deleteVisible = true;
		},
		// 批量删除
		batchDestroy(scope) {
			if (this.tableSelection.length === 0) {
				this.$mg(this, '未选择删除项', 'warning', 2000);
				return;
			};
			this.$confirm(`是否要删除这${this.tableSelection.length}条数据`)
				.then(_ => {
					let params = {
						ids: this.tableSelection
					};
					batchDestroy(this.route, params)
						.then(data => {
							if (data.res === 'true') {
								this.$mg(this, '删除成功', 'success', 1000);
							} else {
								this.$mg(this, '删除失败', 'error', 1000);
							}
							this.ajaxIndex();
						});
				})
				.catch(_ => {});
		},
		// 新增保存
		addSave(formData) {
			let params = {
				_type: formData.type,
				...serializeData(formData.formField)
			};
			store(this.route, params)
				.then(data => {
					this.$mg(this, '保存成功', 'success', 2000);
					this.$refs['commonFormDialog'].saveSetting.loading = false;
					this.emitCloseDialog('form');
					this.ajaxIndex();
				});
		},
		// 编辑保存
		editSave(formData) {
			let params = {
				_type: formData.type,
				...serializeData(formData.formField)
			};
			update(this.route, formData.id, params)
				.then(data => {
					this.$mg(this, '保存成功', 'success', 2000);
					this.$refs['commonFormDialog'].saveSetting.loading = false;
					this.emitCloseDialog('form');
					this.edit_option_tableData(data);
				});
		},
		// 处理条件过滤
		handleFilter(data) {
			for (let i in data) {
				this.filter[i] = data[i];
			}
			this.ajaxIndex();
		},
		// // condition范围选择处理方法
		// rangeDate (dates) {
		// 	dates.forEach(date => {
		// 		this.filter[date.field] = date.val
		// 	})
		// 	ajax.index(this, this.filter)
		// },
		// keypairDialog (row) {
		// 	this.$emit('keypairDialog', row)
		// },

		// 数据处理方法
		set_tableData(data) {
			for (let i in data) {
				if (i === 'data') {
					this.tableData = this.model.tableFieldFn ? this.model.tableFieldFn(data.data, this) : data.data;
				} else {
					this.paginationTablePager[i] = data[i];
				}
			}
		},
		// reset_tableData () {
		// 	this.tableData = []
		// },
		// add_option_tableData (data) {
		// 	data = this.model.tableFieldFn ? this.model.tableFieldFn(data) : data
		// 	if (this.tableData.length >= 15) {
		// 		this.tableData.pop()
		// 	}
		// 	this.tableData.unshift(data)
		// },
		edit_option_tableData(data) {
			data = this.model.tableFieldFn ? this.model.tableFieldFn(data) : data;
			this.tableData.forEach(v => {
				if (v.id === data.id) {
					for (let i in v) {
						v[i] = data[i];
					}
				}
			});
		},
		// delete_option_tableData (data) {
		// 	let arr = []
		// 	this.tableData.forEach(v => {
		// 		if (v.id !== data.id) {
		// 			arr.push(v)
		// 		}
		// 	})
		// 	this.tableData = arr
		// },
		swtich_option_tableData({data, id}) {
			this.tableData.forEach(v => {
				if (v.id === id) {
					v.status = data.res;
				}
			});
		},
		ajaxIndex() {
			this.tableLoading = true;
			index(this.route, this.filter)
				.then(data => {
					this.set_tableData(data);
					this.tableLoading = false;
				});
		},
	},
	watch: {
		route: function(nv, v) {
			if (nv.indexOf('undefined') > -1) return; // 由于是动态生成route，可能会存在undefined的情况
			if (nv !== v) {
				this.tableData = [];
				if (this.hasTabs) {
					// 存在tabs标签时，当前激活的标签由地址vue路由中的query.current决定
					// 如果query.current不存在时，默认激活标签页中的第一个
					this.tabsActive = this.$route.query.current ? this.$route.query.current : this.model.commonTabs.lists[0].name;
				}
				this.ajaxIndex();
			}
		},
	}
};
</script>
