<template>
	<div id="app" class="h100">
		<router-view/>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import {ajax} from './utils/ajax.js';
import {urlPrefix} from './utils/utils.js';
export default {
	name: 'App',
	// beforeRouteEnter(to, from, next) {
	// 	// 在渲染该组件的对应路由被 confirm 前调用
	// 	// 不！能！获取组件实例 `this`
	// 	// 因为当守卫执行前，组件实例还没被创建
	// 	ajax('get', urlPrefix('auth'))
	// 		.then(res => {
	// 			next(vm => {
	// 				vm.$store.commit('SET_USERINFO', res.data);
	// 				vm.$router.push('/home');
	// 			});
	// 		})
	// 		.catch(err => {
	// 			if (err.response.status === 401) {
	// 				next();
	// 			}
	// 		});
	// },
	// beforeRouteUpdate(to, from, next) {
	// 	// 在当前路由改变，但是该组件被复用时调用
	// 	// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	// 	// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	// 	// 可以访问组件实例 `this`
	// },
	// beforeRouteLeave(to, from, next) {
	// 	// 导航离开该组件的对应路由时调用
	// 	// 可以访问组件实例 `this`
	// 	next();
	// },
	beforeMount() {
		// this.auth();
		// let mins = this.ddd(['170m', '19h', '24h', '6h', '12h', '18h', '1d', '1d', '6h', '9d', '9d']);
		// mins *= 2;
		// mins += this.ddd(['2d', '6d', '18d']);
		// console.log(mins);
	},
	computed: {
		...mapState(['userinfo'])
	},
	methods: {
		auth() {
			ajax('get', urlPrefix('auth'))
				.then(res => {
					this.$store.commit('SET_USERINFO', res.data);
					if (this.$route.path.indexOf('login') > -1) {
						this.$router.push('/');
					}
				})
				.catch(err => {
					if (err.response.status === 401) {
						this.$router.push('/login');
					}
				});
		},
		ddd(times) { // 迷宫时间计算
			let mins = 0;
			times.forEach(time => {
				if (time.indexOf('d') > -1) {
					mins += (parseInt(time) * 24 * 60);
				} else if (time.indexOf('h')) {
					mins += (parseInt(time)) * 60;
				} else {
					mins += parseInt(time);
				}
			});
			return mins;
		},
	},
	watch: {
		// '$route'(to, from) {
		// 	// 路径为home
		// 	if (to.path.indexOf('/home') > -1) {
		// 		this.auth();
		// 	}
		// }
	}
};
</script>
