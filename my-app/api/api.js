let requestApi = function(url, method,) {
	let baseUrl = 'http://localhost:8082'
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method
		}).then(res => {
			// 请求成功时，将结果返出去
			resolve(res)
		}).catch(err => {
			// 请求失败时，将结果返出去
			reject(err)
			uni.showToast({
				title: '请求失败',
				duration: 3000,
				icon: 'error'
			});
		})
	})
}
export {
	requestApi
}
