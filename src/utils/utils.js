module.exports = {
	// 通用公共方法 -----------------------------------------------
	isString: function(StringToCheck) {
		return Object.prototype.toString.call(StringToCheck) === '[object String]';
	},
	isBoolean: function(BooleanToCheck) {
		return Object.prototype.toString.call(BooleanToCheck) === '[object Boolean]';
	},
	isNumber: function(NumberToCheck) {
		return Object.prototype.toString.call(NumberToCheck) === '[object Number]';
	},
	isObject: function(objectToCheck) {
		return Object.prototype.toString.call(objectToCheck) === '[object Object]';
	},
	isArray: function(ArrayToCheck) {
		return Object.prototype.toString.call(ArrayToCheck) === '[object Array]';
	},
	isFunction: function(FunctionToCheck) {
		return Object.prototype.toString.call(FunctionToCheck) === '[object Function]';
	},
	// 错误抛出
	throwErr: function(model, msg) {
		throw Error(`${model}: ${msg}`);
	},

	// 项目特有工具方法---------------------------------------------
	// 序列化数据
	serializeData: function(data) {
		let params = {};
		data.forEach(v => {
			// 自定义序列化处理表单数据
			if (v.customSerializeFn) {
				params = Object.assign(params, v.customSerializeFn(v));
			} else {
				params[v.field] = v.value;
			}
		});
		return params;
	},
	// 设置表单域的数据
	setFormField: function(data, row) {
		data.forEach((item, idx, arr) => {
			// 在打开对话框同时赋值
			if (Object.keys(row).includes(item['field'])) {
				if (item.customEditFn) {
					// 编辑数据时，自定义设置表单域的值
					arr[idx] = item.customEditFn(item, row);
				} else {
					item['value'] = row[item['field']];
				}
			}
		});
		return data;
	},
	/**
	 * [findPropertyInObject 在对象中查找属性]
	 * @Author   szh
	 * @DateTime 2018-03-01
	 * @param    {String}   prop [属性]
	 * @param    {Object}   obj  [查找属性的对象]
	 * @return   {Boolean}       [是否存在对象中]
	 */
	// findPropertyInObject: function (prop, obj) {
	// 	return Object.keys(obj).includes(prop);
	// },
	/**
	 * [urlPrefix 自定义请求路径方法]
	 * @Author   szh
	 * @DateTime 2018-04-03
	 * @param    {String}   url    [请求路径]
	 * @param    {String}   prefix [请求前缀]
	 * @return   {String}          [新的请求路径]
	 */
	urlPrefix: function(url, prefix = 'api') {
		let regx = /^\/{1,}/g;
		url = url.replace(regx, '');
		return `/${prefix}/${url}`;
	},

};
