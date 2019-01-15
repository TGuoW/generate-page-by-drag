import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    componentList: [],
    currentComponentIndex: [0, 0],
    currentComponent: {}
  },
  mutations: {
    addComponent (state, component) {
      state.componentList.push(component)
    },
    updateCurrentComponentIndex (state, index) {
      state.currentComponentIndex = index
    },
    updateCurrentComponent (state, componentInfo) {
      state.currentComponent = componentInfo
    }
  },
  actions: {
  }
})
