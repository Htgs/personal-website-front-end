import user from './user/user.js';
import userInfo from './user/userInfo.js';
import article from './article/article.js';
import articleCategory from './article/articleCategory.js';
import comment from './article/comment.js';
// import resume from './resume/resume.js';
import logs from './system/logs.js';
import permission from './system/permission.js';

module.exports = {
	user: user,
	'user-info': userInfo,
	article: article,
	'article-category': articleCategory,
	comment: comment,
	// resume: resume,
	logs: logs,
	permission: permission,
};
