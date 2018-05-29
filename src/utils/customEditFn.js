module.exports = {
	// 表单上传
	FormElUpload: function(value) {
		if (value) {
			return [{
				url: `/${value}`,
			}];
		} else {
			return [];
		}
	},
};
