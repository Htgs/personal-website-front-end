// Add a request interceptor
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	// config.headers = Object.assign(config.headers, {'X-CSRF-TOKEN': Laravel.csrfToken})
	return config
}, function (error) {
	// Do something with request error
	return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	// Do something with response data
	return response
}, function (error) {
	// Do something with response error
	return Promise.reject(error)
})
