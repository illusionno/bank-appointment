import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: '11'
	},
	mutations: {
setUserInfo(state,data){
	state.userInfo = data
}
	}
})
export default store
