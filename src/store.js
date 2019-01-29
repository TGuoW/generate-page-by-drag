import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    componentList: [[]],
    currentComponentIndex: [0, 0],
    currentComponent: {}
  },
  mutations: {
    addComponent (state, payload) {
      state.componentList[payload.index].push({...payload.componentInfo, id: state.componentList[payload.index].length})
    },
    updateCurrentComponentIndex (state, index) {
      state.currentComponentIndex = index
    },
    updateCurrentComponent (state, payload) {
      state.componentList[payload.index].splice(payload.componentInfo.id, 1, payload.componentInfo)
      state.currentComponent = payload.componentInfo
    }
  },
  actions: {
  }
})
