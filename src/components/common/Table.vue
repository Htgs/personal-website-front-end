<template>
	<el-table
		size="mini"
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
			:show-overflow-tooltip="true"
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
				<div v-else class="ellipsis">{{scope.row[tf.field]}}</div>
			</template>
		</el-table-column>
		<el-table-column
			v-if="hasTableOperation"
			label="操作"
			:resizable="false"
			align="center"
			min-width="92">
			<template slot-scope="scope">
				<!-- 表格编辑 -->
				<commonElButton
					v-if="hasTableOperationEdit && !scope.row['deleted_at']"
					:params="tableEditSetting"
					:scope="scope"
					v-on:edit="tableEdit"
				/>
				<!-- 表格删除 -->
				<commonElButton
					v-if="hasTableOperationDelete && !scope.row['deleted_at']"
					:params="tableDeleteSetting"
					:scope="scope"
					v-on:delete="tableDelete"
				/>
				<!-- 表格恢复 -->
				<commonElButton
					v-if="hasTableOperationRecovery && scope.row['deleted_at']"
					:params="tableRecoverySetting"
					:scope="scope"
					v-on:recovery="tableRecovery"
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
import commonElButton from './ElButton.vue';
export default {
	name: 'commonTable',
	components: {
		commonElButton,
	},
	props: {
		// 设置是否需要
		hasTableSelection: Boolean,
		hasTableIndex: Boolean,
		hasTableOperation: Boolean,
		hasTableOperationEdit: Boolean,
		hasTableOperationDelete: Boolean,
		hasTableOperationRecovery: Boolean,

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
				className: 'p-0',
				display_name: '编辑',
				clickFn: (vm, scope) => {
					vm.$emit('edit', { type: 'edit', ...scope });
				}
			},
			tableDeleteSetting: {
				type: 'text',
				loading: false,
				disabled: false,
				className: 'p-0',
				display_name: '删除',
				clickFn: (vm, scope) => {
					vm.$emit('delete', { type: 'delete', ...scope });
				}
			},
			tableRecoverySetting: {
				type: 'text',
				loading: false,
				disabled: false,
				className: '',
				display_name: '恢复',
				clickFn: (vm, scope) => {
					vm.$emit('recovery', { type: 'recovery', ...scope });
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
		tableRecovery(msg) {
			console.log('tableRecovery', msg);
			this.$emit('tableRecovery', msg);
		},
		emitOperationBtn(msg) {
			this.$emit('emitOperationBtn', msg);
		}
	}
};
</script>
