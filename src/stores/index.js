import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import loader from './modules/loader'
import notification from './modules/notification'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    loader,
    notification,
    user
  },
  strict: debug,
})