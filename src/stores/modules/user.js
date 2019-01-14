import axios from 'axios'

const state = {
}

const mutations = {
}

const actions = {
	loadUsers({state, commit}, params) {
		axios.get('v1/users',{
			params: params.params
		}).then(function(response){
			var data = response.data;
			if(data._meta.code == 200){
				delete data._meta;
				if(params.callback){
					params.callback(data);
				}
			}
		});
	},
	deleteUser({state, commit}, params){
		axios.delete(`v1/users/${params.id}`).then(function(response){
			var data = response.data;

			if(data._meta.code == 200){
				params.callback({
					status: "success"
				})
			}else{
				params.callback({
					status: "failed"
				})
			}
		});
	},
	loadUser({state, commit}, params){
		axios.get(`v1/users/${params.id}`).then(function(response){
			var data = response.data;
			if(data._meta.code == 200){
				params.callback({
					status: "success",
					data: data
				})
			}else{
				params.callback({
					status: "failed",
					data: data
				})
			}
		});
	},
	updateUser({state, commit}, params){
		axios.post(`v1/users/${params.id}`, params.data).then(function(response){
			var data = response.data;
			if(data._meta.code == 200){
				params.callback({
					status: "success",
					data: data
				})
			}else{
				params.callback({
					status: "failed",
					data: data
				})
			}
		});
	},
	addUser({state, commit}, params){
		axios.post(`v1/users`, params.data).then(function(response){
			var data = response.data;
			if(data._meta.code == 200){
				params.callback({
					status: "success",
					data: data
				})
			}else{
				params.callback({
					status: "failed",
					data: data
				})
			}
		});
	}
}

const getters = {
}

export default{
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}