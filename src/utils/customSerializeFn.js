module.exports = {
	// 表单上传
	FormElUpload: function(item) {
		let obj = {};
		if (item.value.length > 0) {
			if (item.value[0].raw instanceof Blob) {
				obj['_hasfile'] = true;
				obj[item['field']] = item.value[0].raw;
			} else if (isString(item.value[0].url)) {
				obj[item['field']] = item.value[0].url.substr(1);
			}
		} else {
			obj[item['field']] = null;
		}
		return obj;
	},
};
