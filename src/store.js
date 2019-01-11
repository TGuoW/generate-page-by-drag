import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    componentList: [],
    currentComponentIndex: [0, 0]
  },
  mutations: {
    addComponent (state, component) {
      state.componentList.push(component)
    },
    updateCurrentComponentIndex (state, index) {
      state.currentComponentIndex = index
    }
  },
  actions: {
  }
})
