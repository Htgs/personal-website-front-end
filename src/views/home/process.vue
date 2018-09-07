<template>
	<div class="h100 home-view">
		<ul>
			<li v-for=""></li>
		</ul>
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
					console.log(data);
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
							}
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
