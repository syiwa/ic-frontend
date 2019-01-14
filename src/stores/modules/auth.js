import axios from 'axios';
import store from '@/stores';
import router from '@/router'

const state = {
	user: {},
	roles: [],
	isAuth: false,
	authReadyForCheck: !localStorage.hasOwnProperty('userToken') /* Prevent auth passed before logged in and prevent auth blocked after login because of load time difference */
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
	},
	setAuthReadyForCheck(state, status){
		state.authReadyForCheck = status;
	}
}

const actions = {
	login({state, commit}, params) {
		store.dispatch('loader/show');
		axios.post('v1/auth/login', {
			email: params.email,
			password: params.password
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
				if(params.callback){
					params.callback({
						status: "success"
					})
				}
			}else{
				if(params.callback){
					params.callback({
						status: "failed",
						data: data
					});
				}
			}
		});
	},
	logout({state, commit}, callback){
		store.dispatch('loader/show');
		axios.post('v1/auth/logout').then(function(response){
			store.dispatch('loader/hide');
			commit('setAuth', false);
			commit('setRoles', []);
			commit('setUser', {});
			localStorage.removeItem('userToken');

			if(callback){
				callback();
			}
		});
	},
	tokenExistPreparation({state, commit}, callback){
		store.dispatch('loader/show');
		axios.defaults.headers.Authorization = "Bearer " + localStorage.getItem('userToken');
		axios.get('v1/users/self').then(function(response){
			store.dispatch('loader/hide');
			var data = response.data;
			if(data._meta.code == 200){
				var roles = _.clone(data.roles);
				delete data.roles;

				commit('setAuth', true);
				commit('setRoles', roles);
				commit('setUser', data);
				commit('setAuthReadyForCheck', true);
			}else if(data._meta.code == 401){
				router.push('/')
			}
		});
	},
	authReadyForCheck({state, commit}){
		commit('setAuthReadyForCheck', true);
	},
	setUser({state, commit}, user){
		commit('setUser', user);
	}
}

const getters = {
	hasRole: (state, getters) => {
		return role => {
			return _.where(state.roles, {
				name: role
			}).length > 0
		}
	},
	myRole: (state, getters) => {
		return _.pluck(state.roles, 'name').join(", ")
	}
}

export default{
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}