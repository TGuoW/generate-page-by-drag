import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    componentList: [[]],
    titleList: ['默认标题'],
    currentComponentIndex: 1,
    currentComponent: {}
  },
  mutations: {
    addComponent (state, payload) {
      state.componentList[payload.index].push({...payload.componentInfo, id: state.componentList[payload.index].length})
    },
    updateCurrentComponentIndex (state, payload) {
      state.currentComponentIndex = payload.index
    },
    updateCurrentComponent (state, payload) {
      state.componentList[payload.index].splice(payload.componentInfo.id, 1, payload.componentInfo)
      state.currentComponent = payload.componentInfo
    },
    updateTitleList (state, payload) {
      state.titleList.splice(payload.index, 1, payload.title)
    }
  },
  actions: {
  }
})
