module.exports = {
	/**
	 * axios简单封装
	 * @Author   szh
	 * @DateTime 2018-04-03
	 * @param    {String}   type    [请求的方法]
	 * @param    {String}   url     [请求的路径]
	 * @param    {Object}   data    [数据]
	 * @param    {Boolean}  hasFile [是否有文件]
	 * @return   {Promise}          [返回一个Promise对象]
	 */
	ajax: function(type, url, data = {}, hasFile = false) {
		let config = {}, datas;
		if (type === 'get') {
			datas = {
				params: data
			};
		} else {
			if (hasFile) {
				// 当有文件的情况
				// 当前提交是update时，后台方法为put 但是put方法是不能获取到formdata的数据
				if (type === 'put') {
					type = 'post';
					Object.assign(data, {_method: 'PUT'}); // laravel的伪方法
				}
				config = {
					headers: {
						'Content-Type': 'multiple/form-data'
					}
				};
				let fd = new FormData();
				for (let i in data) {
					if (data[i] === null) continue;
					fd.append(i, data[i]);
				}
				datas = fd;
			} else {
				datas = data;
			}
		}
		return axios[type](url, datas, config);
	},
};
