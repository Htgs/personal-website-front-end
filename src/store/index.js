import Vue from 'vue';
import Vuex from 'vuex';
import * as mt from './mutations_types';
import staticState from './staticState.js';

Vue.use(Vuex);

// initial state
const state = {
	...staticState,
	userinfo: {},

	ARTICLE_CATEGORY: [],
};

// getters
const getters = {
	// userinfo: state => state.userinfo,
};

// actions
const actions = {
	/**
	 * [getStaticData 异步获取下拉框数据(数组类型)]
	 * @Author              bwx
	 * @DateTime 2017-08-17
	 * @param    {[vuex]}        options.state  [vuex内部参数]
	 * @param    {[vuex]}        options.commit [vuex内部参数]
	 * @param    {[component]}   options.vm     [vue组件]
	 * @param    {[String]}      options.arr    [要保持数据的数组名称]
	 * @param    {[String]}      options.url    [ajax请求地址]
	 * @param    {Object}        options.params [ajax请求所需参数，默认{}]
	 * @return   {[Promise]}                    [返回一个promise函数]
	 */
	getStaticData({ state, commit }, { arr, url, params = {} }) {
		return new Promise(resolve => {
			if (state[arr].length > 0) {
				resolve(state[arr])
			} else {
				ajax.call('get', url, params, data => {
					commit(arr, data)
					resolve(data)
				})
			}
		})
	},
};

// mutations
const mutations = {
	[mt.SET_USERINFO](state, user) {
		Object.keys(user).forEach(v => {
			state.userinfo[v] = user[v];
		});
		if (user.token) {
			// 如果有user.token则保存新的用户token
			localStorage.setItem('b-token', `Bearer ${user.token}`);
		}
	},
	[mt.CLEAR_USERINFO](state) {
		state.userinfo = {};
		if (localStorage.getItem('b-token')) {
			localStorage.removeItem('b-token');
		}
	},
	[mt.SET_ARTICLE_CATEGORY](state, article_category) {
		state.ARTICLE_CATEGORY = article_category;
	},
};

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});

export default store;
