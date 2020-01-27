import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    received:[]
  },
  mutations: {
    SET_RECEIVED_DAYS(state, days){
      state.received=days
    }
  },
  actions: {
    receive({commit},days){
      commit("SET_RECEIVED_DAYS", days)
    }
  },
  getters:{
    received:state=>state.received
  },
  modules: {
  }
})
