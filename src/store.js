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
        if (payload.componentInfo.name === 'Select') {
          payload.componentInfo.childComponentArr = [
            { label: '备选项1', value: 'test1', disabled: false },
            { label: '备选项2', value: 'test2', disabled: false }
          ]
        } else {
          payload.componentInfo.childComponentArr = [
            { label: '备选项1', disabled: false },
            { label: '备选项2', disabled: false }
          ]
        }
      }
      state.componentList[state.currentComponentIndex].push({...payload.componentInfo, tid: state.componentList[state.currentComponentIndex].length})
    },
    updateCurrentComponentIndex (state, payload) {
      state.currentComponentIndex = payload.index
    },
    updateCurrentComponent (state, payload) {
      // state.componentList[payload.index].splice(payload.componentInfo.id, 1, payload.componentInfo)
      state.currentComponentIndex = payload.index !== undefined ? payload.index : state.currentComponentIndex
      const index = payload.index !== undefined ? payload.index : state.currentComponentIndex
      state.componentList[index].splice(payload.componentInfo.tid, 1, payload.componentInfo)
      state.currentComponent = payload.componentInfo
    },
    updateTitleList (state, payload) {
      state.titleList.splice(payload.index, 1, payload.title)
    }
  },
  actions: {
  }
})
