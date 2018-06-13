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
	transformTime: function(time) {
		if (!time) return time; // null直接返回null
		let date = new Date();
		if (time) {
			date = new Date(time);
		}
		let M = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
		let d = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
		let h = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
		let m = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
		let s = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
		return `${date.getFullYear()}-${M}-${d} ${h}:${m}:${s}`;
	},
	// 图片压缩
	resizeImg: function(file) {
		return new Promise((resolve) => {
			let reader = new FileReader(),
				image = new Image(),
				canvas = document.createElement('canvas');
			let context = canvas.getContext('2d');
			image.onload = function() {
				// 获取图片尺寸
				let originWidth = this.width,
					originHeight = this.height;
				// // 超过这个值base64无法生成，在IOS上
				// if (originWidth >= 3264 || originHeight >= 2448) {
				// 	originWidth *= 0.8;
				// 	originHeight *= 0.8;
				// }
				canvas.width = originWidth;
				canvas.height = originHeight;
				// 清除画布
				context.clearRect(0, 0, originWidth, originHeight);
				// 图片压缩
				context.drawImage(this, 0, 0, originWidth, originHeight);
				// let img = canvas.toDataURL('image/jpeg', 0.1);
				// canvas.toBlob(function(blob) {
				// 	console.log(blob);
				// }, 'image/jpeg', 0.1);
				let imgbase64 = canvas.toDataURL('image/jpeg', 0.9);
				// 把dataURL转换成文件
				function dataURLtoFile(dataurl, filename) {
					var arr = dataurl.split(','),
						mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					return new File([u8arr], filename, {type: mime});
				}
				let f = dataURLtoFile(imgbase64, file.name);
				resolve(f);
			};
			reader.onload = (function(img) {
				return function(e) {
					img.src = e.target.result;
				};
			})(image);
			reader.readAsDataURL(file);
		});
	},
};
