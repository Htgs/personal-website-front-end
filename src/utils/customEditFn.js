module.exports = {
	FormELUpload: function(value) {
		if (value) {
			return [{
				url: `/${value}`,
			}];
		} else {
			return [];
		}
	},
};
