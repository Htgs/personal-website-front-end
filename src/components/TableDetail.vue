<template>
	<div>
		<el-button type='text' @click="detail">{{row[field]}}</el-button>
		<el-dialog :visible="visible" width="80%" append-to-body :before-close="close">
			<div slot="title">
				<h5>{{row[field]}}详情</h5>
				<ul class="clearfix pt-10 fz-12">
					<li
						v-for="(value, key) in SQLTIME"
						class="pull-left mr-10"
						:key="key">
						{{value}}：{{transformTime(current[key])}}
					</li>
				</ul>
			</div>
			<div class="h100 relative ovh">
				<el-scrollbar style="height: calc(100% + 18px)">
					<div class="w100">
						<el-row
							v-for="(value, key) in $store.state[params['model']]"
							:key="key"
							class="w100 mb-10"
							:gutter="20">
							<el-col :span="6">{{value}}：</el-col>
							<el-col :span="18">
								<div v-if="key === 'avatar'">
									<img v-if="current[key]" class="inline" width="200" height="200" :src="`/${current[key]}`" :alt="current[key]" />
									<div v-else>暂无上传头像</div>
								</div>
								<TableCacheName
									v-else-if="params['caches'] && params['caches'].find(cache => cache.field === key)"
									:row="current"
									:field="params['caches'].find(cache => cache.field === key).field"
									:params="params['caches'].find(cache => cache.field === key).props"
								/>
								<div v-else>{{current[key] ? current[key] : '无'}}</div>
							</el-col>
						</el-row>
					</div>
				</el-scrollbar>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import {show} from '../utils/commonApi.js';
import {transformTime} from '@/utils/utils.js';

import TableCacheName from './TableCacheName.vue';
export default {
	name: 'TableDetail',
	components: {
		TableCacheName,
	},
	props: {
		row: Object,
		field: String,
		params: Object,
	},
	computed: {
		...mapState([
			'SQLTIME',
			'GENDER',
			'IS_PUBLIC',
			'USER',
			'ARTICLE',
		]),
	},
	data() {
		return {
			visible: false,
			current: {},
		};
	},
	methods: {
		transformTime,
		detail() {
			show(`/admin/${this.params['model'].toLowerCase()}`, this.row.id)
				.then(data => {
					this.current = data;
					Object.keys(data).forEach(key => {
						if (this[key.toUpperCase()]) {
							this.current[key] = this[key.toUpperCase()][data[key]];
						}
					});
					this.visible = true;
				});
		},
		close() {
			this.visible = false;
		},
	},
};
</script>
