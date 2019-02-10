import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    componentList: [[]],
    titleList: ['默认标题'],
    currentComponentIndex: 0,
    currentComponent: {}
  },
  mutations: {
    addFormItem (state) {
      state.componentList.push([])
      state.titleList.push('默认标题')
      state.currentComponentIndex = state.componentList.length - 1
    },
    addComponent (state, payload) {
      // state.componentList[payload.index].push({...payload.componentInfo, id: state.componentList[payload.index].length})
      if (payload.componentInfo.childComponentArr) {
        payload.componentInfo.childComponentArr = [
          { label: '备选项1' },
          { label: '备选项2' }
        ]
      }
      state.componentList[state.currentComponentIndex].push({...payload.componentInfo, id: state.componentList[state.currentComponentIndex].length})
      console.log(state.componentList)
    },
    updateCurrentComponentIndex (state, payload) {
      state.currentComponentIndex = payload.index
    },
    updateCurrentComponent (state, payload) {
      // state.componentList[payload.index].splice(payload.componentInfo.id, 1, payload.componentInfo)
      state.currentComponentIndex = payload.index !== undefined ? payload.index : state.currentComponentIndex
      const index = payload.index !== undefined ? payload.index : state.currentComponentIndex
      state.componentList[index].splice(payload.componentInfo.id, 1, payload.componentInfo)
      state.currentComponent = payload.componentInfo
    },
    updateTitleList (state, payload) {
      state.titleList.splice(payload.index, 1, payload.title)
    }
  },
  actions: {
  }
})
