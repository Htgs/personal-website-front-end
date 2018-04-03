const utils = {
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

export default utils;
