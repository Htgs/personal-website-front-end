module.exports = {
	// 表单上传
	FormElUpload: function(value) {
		if (value) {
			return [{
				url: `/uploads/${value}`,
			}];
		} else {
			return [];
		}
	},
};
