import {check} from './commonApi.js';
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
		let params = {
			id: rule['id'],
			field: rule['field'],
			value: value,
		};
		check(rule['route'], params)
			.then(data => {
				if (data.res === true) {
					callback();
				} else {
					callback(new Error(`${rule['label']}已存在`));
				}
			});
	},
	lengthValid: (rule, value, callback) => {
		if (value.length < rule['length'][0] || value.length > rule['length'][1]) {
			callback(new Error(`${rule['label']}的长度范围为${rule['length'][0]}至${rule['length'][1]}！`));
		} else {
			callback();
		}
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
