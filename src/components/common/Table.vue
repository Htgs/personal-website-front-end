<template>
	<el-table
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
				<!-- 表格编辑 -->
				<ElButton
					v-if="hasTableOperationEdit"
					:params="tableEditSetting"
					:scope="scope"
					v-on:edit="tableEdit"
				/>
				<!-- 表格删除 -->
				<ElButton
					v-if="hasTableOperationDelete"
					:params="tableDeleteSetting"
					:scope="scope"
					v-on:delete="tableDelete"
				/>
				<!-- 自定义表格操作按钮 -->
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
</template>
<script>
import ElButton from './ElButton.vue';
export default {
	name: 'Table',
	components: {
		ElButton,
	},
	props: {
		// 设置是否需要
		hasTableSelection: Boolean,
		hasTableIndex: Boolean,
		hasTableOperation: Boolean,
		hasTableOperationEdit: Boolean,
		hasTableOperationDelete: Boolean,

		// 数据
		tableData: Array, // 表格数据
		commonTableField: Array, // 表格域
		commonTableOperationComponents: Array, // 自定义操作按钮
	},
	data() {
		return {
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
		};
	},
	methods: {
		handleTableSort(sort) {
			if (sort.order === null) return;
			let order = '';
			if (sort.order === 'ascending') {
				order = 'asc';
			} else if (sort.order === 'descending') {
				order = 'desc';
			}
			this.$emit('handleTableSort', { _order: order, _sort: sort.prop });
		},
		handleTableSelection(selects) {
			this.$emit('handleTableSelection', selects);
		},
		tableEdit(msg) {
			this.$emit('tableEdit', msg);
		},
		tableDelete(msg) {
			this.$emit('tableDelete', msg);
		},
		emitOperationBtn(msg) {
			this.$emit('emitOperationBtn', msg);
		}
	}
};
</script>
