import Vue from 'vue';
import Router from 'vue-router';

import homeRoutes from './home.js';
import adminRoutes from './admin.js';

Vue.use(Router);

const routes = [].concat(homeRoutes, adminRoutes);

export default new Router({
	routes
});
