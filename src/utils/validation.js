const pattern = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const validation = {
	unique: function() {
	},
	email: function(value) {
		return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
	},
};

export default validation;
