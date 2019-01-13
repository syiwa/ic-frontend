const state = {
	show: false,
}

const mutations = {
	setShow(state, show){
		state.show = show;
	}
}

const actions = {
	show({state, commit}) {
		commit('setShow', true);
	},
	hide({state, commit}) {
		commit('setShow', false);
	}
}

const getters = {
	getState: (state, getters) => {
		return state.show
	}
}

export default{
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}