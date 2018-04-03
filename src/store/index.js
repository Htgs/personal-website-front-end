import Vue from 'vue';
import Vuex from 'vuex';
import * as mt from './mutations_types';

Vue.use(Vuex);

// initial state
const state = {
	userinfo: {},
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
	getStaticData({ state, commit }, { vm, arr, url, params = {} }) {
		// return new Promise(resolve => {
		// 	if (state[arr].length > 0) {
		// 		resolve(state[arr])
		// 	} else {
		// 		ajax.call(vm, 'get', url, params, data => {
		// 			commit(arr, data)
		// 			resolve(data)
		// 		})
		// 	}
		// })
	},
};

// mutations
const mutations = {
	[mt.SET_USERINFO](state, user) {
		Object.keys(user).forEach(v => {
			state.userInfo[v] = user[v];
		});
	},
};

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});

export default store;
