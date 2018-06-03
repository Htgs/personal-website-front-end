module.exports = {
	// unique: function() {
	// },
	// email: function(value) {
	// 	return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
	// },
	/**
	 * 唯一性验证
	 * @Author   szh
	 * @DateTime 2018-03-02
	 * 参数：cfield(String)
	 */
	checkValid: (rule, value, callback) => {
		// let params = {
		// 	id: rule['id'],
		// 	field: rule['cfield'],
		// 	value: value,
		// }
		// check(rule['vm'], rule['route'], params)
		// 	.then(data => {
		// 		if (data.res === 'true') {
		// 			callback()
		// 		} else {
		// 			callback(new Error(rule['label'] + '已存在'))
		// 		}
		// 	})
	},
	/**
	 * accountValid 登录验证
	 */
	// accountValid: function(rule, value, callback) {
	// 	if (pattern['isEmail'](value) || pattern['isPhone'](value)) {
	// 		callback();
	// 	} else {
	// 		callback(new Error(`账号只能是邮箱或者手机号码`));
	// 	}
	// }
};
