// Add a request interceptor
axios.interceptors.request.use(function(config) {
	// Do something before request is sent
	// config.headers = Object.assign(config.headers, {'X-CSRF-TOKEN': Laravel.csrfToken})
	return config;
}, function(error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response) {
	// Do something with response data
	return response;
}, function(error) {
	// Do something with response error
	// if (error.response && error.response.status === 401) {
	//     if (error.config.url !== '/user/auth') {
	//         message.error('未登录或者权限不足')
	//     }
	// } else if (error.response && error.response.status === 404) {
	//     message.error('接口不存在')
	// } else if (error.response && error.response.status === 500) {
	//     message.error('服务器错误')
	// } else if (error.response && error.response.status === 504) {
	//     message.error('请求超时')
	// } else {
	//     message.error('请求错误')
	// }
	return Promise.reject(error);
});
