const pattern = {
	email: (email) => {
		// return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/.test(email)
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	},
	phone: (phone) => {
		return (phone.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone)) || (phone.length === 12 && /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(phone));
	},
	website: (website) => {
		const strRegex = `^((https|http|ftp|rtsp|mms)?://)` +
			`?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?` + // ftp的user@
			`(([0-9]{1,3}\.){3}[0-9]{1,3}` + // IP形式的URL- 199.194.52.184
			`|` + // 允许IP和DOMAIN（域名）
			`([0-9a-z_!~*'()-]+\.)*` + // 域名- www.
			`([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.` + // 二级域名
			`[a-z]{2,6})` + // first level domain- .com or .museum
			`(:[0-9]{1,4})?` + // 端口- :80
			`((/?)|` + // a slash isn't required if there is no file name
			`(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$`;
		const re = new RegExp(strRegex);
		if (re.test(website)) {
			return true;
		} else {
			return false;
		}
	},
};

module.exports = {
	pattern,
};
