import Vue from 'vue';
import Vuex from 'vuex';

import {isArray, isObject} from '../utils/utils.js';
import {ajax} from '../utils/ajax.js';

import * as mt from './mutations_types';
import staticState from './staticState.js';

Vue.use(Vuex);

function hasCache(cache) {
	let temp;
	if (isArray(cache)) {
		temp = cache;
	} else if (isObject(cache)) {
		temp = Object.keys(cache);
	}
	return temp.length > 0 ? true : false;
}

// initial state
const state = {
	...staticState,

	// 用户信息缓存
	userinfo: {},

	// 全部文章分类缓存
	ARTICLE_CATEGORY: [],
};

// getters
const getters = {
	// userinfo: state => state.userinfo,
};

// actions
const actions = {
	/**
	 * [getStaticData 异步获取数据]
	 * @Author              bwx
	 * @DateTime 2017-08-17
	 */
	getStaticData({ state, commit }, { cache, url, params = {} }) {
		return new Promise(resolve => {
			if (hasCache(state[cache])) {
				resolve(state[cache]);
			} else {
				ajax('get', url, params)
					.then(res => {
						commit('SET_CACHE_DATA', {cache, data: res.data});
						resolve(res.data);
					})
					.catch(err => {
						console.dir(err);
					});
			}
		});
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
	[mt.SET_CACHE_DATA](state, {cache, data}) {
		state[cache] = data;
	},
};

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});

export default store;
