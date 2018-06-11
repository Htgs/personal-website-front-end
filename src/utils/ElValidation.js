import {check} from './commonApi.js';
import {pattern} from './validator.js';
module.exports = {
	/**
	 * 唯一性验证
	 * @Author   szh
	 * @DateTime 2018-03-02
	 * 参数：cfield(String) 需要验证的字段
	 */
	checkValid: (rule, value, callback) => {
		let params = {
			id: rule['id'],
			field: rule['cfield'],
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
	/**
	 * 长度验证
	 * @Author   szh
	 * @DateTime 2018-06-11
	 * 参数：length(Array) length: [2, 10]
	 */
	lengthValid: (rule, value, callback) => {
		if (value.length < rule['length'][0] || value.length > rule['length'][1]) {
			callback(new Error(`${rule['label']}的长度范围为${rule['length'][0]}至${rule['length'][1]}！`));
		} else {
			callback();
		}
	},
	/**
	 * 特殊类型验证
	 * @Author   szh
	 * @DateTime 2018-06-11
	 * 参数：pattern(String) email、phone
	 */
	patternValid: (rule, value, callback) => {
		if (!rule['required'] && !value) { // 如果是非必须字段 并且值不存在直接通过
			callback();
		}
		if (value && pattern[rule['pattern']](value)) {
			callback();
		} else {
			callback(new Error(`${rule['label']}的格式不正确！`));
		}
	},
	// /**
	//  * 登录验证
	//  * @Author   szh
	//  * @DateTime 2018-06-11
	//  */
	// accountValid: function(rule, value, callback) {
	// 	console.log(pattern['email'](value));
	// 	console.log(pattern['phone'](value));
	// 	console.log(value.length >= 2 && value.length <= 10);
	// 	if (
	// 		pattern['email'](value) ||
	// 		pattern['phone'](value) ||
	// 		(value.length >= 2 && value.length <= 10)
	// 	) {
	// 		callback();
	// 	} else {
	// 		callback(new Error(`账号必须是用户名或者邮箱或者手机号码`));
	// 	}
	// }
};
