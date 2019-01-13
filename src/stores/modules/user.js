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
			if(data._meta.code = 200){
				delete data._meta;
				if(params.callback){
					params.callback(data);
				}
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