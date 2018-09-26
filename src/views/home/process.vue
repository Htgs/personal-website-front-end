<template>
	<div class="h100 home-view">
		<el-collapse accordion>
			<el-collapse-item
				v-for="year in Year"
				:key="year"
				:title="year"
				:name="year">
				<el-collapse accordion>
					<el-collapse-item
						v-for="yearmonth in YearMonth"
						:key="yearmonth"
						:title="yearmonth"
						:name="yearmonth">
						<el-collapse accordion>
							<el-collapse-item
								v-for="(ymd, field) in YearMonthDate"
								:key="field"
								:title="field"
								:name="field">
								<div class="clearfix" v-for="(article, datetime) in ymd" :key="datetime">
									<el-button class="pull-left" type="text" @click="$route.push(`/article/${article.id}`)">{{article.title}}</el-button>
									<span class="pull-right" style="line-height: 40px;">{{datetime}}</span>
								</div>
							</el-collapse-item>
						</el-collapse>
					</el-collapse-item>
				</el-collapse>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
import {transformTime} from '../../utils/utils.js';
import {ajax} from '../../utils/ajax.js';
export default {
	name: 'Process',
	data() {
		return {
			Year: [],
			YearMonth: [],
			YearMonthDate: {},
		};
	},
	mounted() {
		this.getReference();
	},
	methods: {
		getReference() {
			ajax('get', '/home/reference')
				.then(({data}) => {
					let Year = new Set(),
						YearMonth = new Set(),
						YearMonthDate = {};
					data.forEach(item => {
						const time = transformTime(item.created_at);
						const year = time.split('-')[0],
							ym = `${time.split('-')[0]}-${time.split('-')[1]}`,
							ymd = time.split(' ')[0];
						Year.add(year);
						YearMonth.add(ym);
						if (YearMonthDate[ymd]) {
							YearMonthDate[ymd] = {
								...YearMonthDate[ymd],
								[time]: item,
							};
						} else {
							YearMonthDate[ymd] = {};
							YearMonthDate[ymd][time] = item;
						}
					});
					this.Year = Array.from(Year);
					this.YearMonth = Array.from(YearMonth);
					this.YearMonthDate = YearMonthDate;
				});
		},
	},
};
</script>
