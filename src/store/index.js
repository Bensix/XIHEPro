/**
 * @Author     : zhanjingming@jomoo.cn
 * @Date       : 2020/6/30 8:10
 * @Copyright  : Copyright (c) 2019, JOMOO
 * @Version    : v1.0
 * @Description: Vuex 状态缓存
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    // showPop: false,
    // registerId: ''
    count: 0
  },
  getters: {},
  mutations: {
    mutationAddCount(state, n = 0) {
      return (state.count += n)
    },
    mutationReduceCount(state, n = 0) {
      return (state.count -= n)
    }
    // changePopState (state, data) {
    //   state.showPop = data
    // },
    // changeRegisterId (state, data) {
    //   console.log('changeRegisterId')
    //   state.registerId = data
    // }
  },
  actions: {
    actionAddCount(context, n = 0) {
      return context.commit('mutationAddCount',n)
    },
    actionReduceCount({ commit }, n = 0) {
      return commit('mutationReduceCount',n)
    }
  },

  getters: {
    getterCount(state, n = 0) {
      
    }
  }

})
