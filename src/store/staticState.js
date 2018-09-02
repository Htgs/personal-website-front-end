module.exports = {
	SQLTIME: {
		created_at: '创建时间',
		updated_at: '更新时间',
		deleted_at: '删除时间',
	},
	GENDER: {
		'0': '保密',
		'1': '男',
		'2': '女',
	},
	IS_PUBLIC: {
		'0': '不公开',
		'1': '公开',
	},
	USER: {
		name: '用户名',
		email: '邮箱',
		phone: '手机号码',
		niname: '昵称',
		avatar: '头像',
		realname: '真实姓名',
		gender: '性别',
		birth_date: '出生日期',
		memo: '备注',
	},
	ARTICLE: {
		'user.name': '作者用户名',
		'user.niname': '作者昵称',
		category_id: '分类',
		title: '标题',
		content: '内容',
		is_public: '是否公开',
	},
	COMMENT: {
		pid: '父级评论',
		article_id: '文章id',
		user_id: '用户id',
		user_name: '评论者名称',
		user_email: '评论者邮箱',
		user_website: '评论者网站',
		content: '评论内容',
	},
};
