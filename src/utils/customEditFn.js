module.exports = {
	// 表单上传
	FormElUpload: function(item, row) {
		let value = row[item['field']];
		if (value) {
			return {
				...item,
				value: [{
					url: `/uploads/${value}`,
				}]
			};
		} else {
			return item;
		}
	},
};
