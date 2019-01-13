import axios from 'axios';
import store from '@/stores';

const state = {
	user: {},
	roles: [],
	isAuth: false
}

const mutations = {
	setUser(state, user){
		state.user = user;
	},
	setRoles(state, roles){
		state.roles = roles;
	},
	setAuth(state, status){
		state.isAuth = status;
	}
}

const actions = {
	login({state, commit}, params) {
		store.dispatch('loader/show');
		axios.post('v1/auth/login', {
			email: params[0],
			password: params[1]
		}).then(function(response) {
			store.dispatch('loader/hide');
			var data = response.data;
			if(data._meta.code == 200){
				localStorage.setItem('userToken', data.access_token);

				axios.defaults.headers.Authorization = "Bearer " + data.access_token;

				var roles = _.clone(data.user.roles);
				delete data.user.roles;

				commit('setAuth', true);
				commit('setRoles', roles);
				commit('setUser', data.user);
				if(params[2]){
					params[2]({
						status: "success"
					})
				}
			}else{
				if(params[2]){
					params[2]({
						status: "failed",
						data: data
					});
				}
			}
		});
	},
	logout({state, commit}, callback){
		axios.post('v1/auth/logout').then(function(response){
			commit('setAuth', false);
			commit('setRoles', []);
			commit('setUser', {});
			localStorage.removeItem('userToken');

			if(callback){
				callback();
			}
		});
	}
}

const getters = {
	hasRole: (state, getters) => {
		return role => {
			return _.where(state.roles, {
				name: role
			}).length > 0
		}
	}
}

export default{
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}