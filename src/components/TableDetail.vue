<script>
import {mapState} from 'vuex';
import {show} from '../utils/commonApi.js';
import {transformTime} from '@/utils/utils.js';

import TableCacheName from './TableCacheName.vue';
export default {
	name: 'TableDetail',
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
	render(h) {
		const Content = (key) => {
			let cache;
			if (this.params['caches']) {
				cache = this.params['caches'].find(cache => cache.field === key);
			}
			if (key === 'avatar') {
				if (this.current[key]) {
					return (<img class="inline" width="200" height="200" src={`/${this.current[key]}`} alt={this.current[key]} />);
				} else {
					return (<div>暂无上传头像</div>);
				}
			} else if (cache) {
				return (<TableCacheName row={this.current} field={cache.field} params={cache.props}/>);
			} else {
				return (<div>{this.current[key] ? this.current[key] : '无'}</div>);
			}
		};
		return (
			<div>
				<el-button type='text' onClick={this.detail}>{this.row[this.field]}</el-button>
				<el-dialog visible={this.visible} append-to-body before-close={this.close}>
					<el-card body-style={{'height': '450px'}}>
						<div slot="header">
							<span>{this.row[this.field]}详情</span>
							<ul class="clearfix pt-10 fz-12">
								{
									Object.keys(this.SQLTIME).map(key => (
										<li
											class="pull-left mr-10"
											key={key}>
											{this.SQLTIME[key]}：{this.transformTime(this.current[key])}
										</li>
									))
								}
							</ul>
						</div>
						<div class="h100 relative ovh">
							<el-scrollbar style={{'height': 'calc(100% + 18px)'}}>
								<div class="w100">
									{
										Object.keys(this[this.params['model']]).map(key => (
											<el-row
												class="w100 mb-10"
												key={key}
												gutter={20}>
												<el-col span={6}>{this[this.params['model']][key]}：</el-col>
												<el-col span={18}>
													{Content(key)}
												</el-col>
											</el-row>
										))
									}
								</div>
							</el-scrollbar>
						</div>
					</el-card>
				</el-dialog>
			</div>
		);
	},
};
</script>
