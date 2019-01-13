const state = {
	notification: null,
}

const mutations = {
	pushNotification(state, notification){
		state.notification = notification;
	}
}

const actions = {
	show({state, commit}, text) {
		commit('pushNotification', text);
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