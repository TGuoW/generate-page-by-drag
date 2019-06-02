import Vue from 'vue'
import Vuex from 'vuex'
import deepClone from './assets/js/deepClone'
Vue.use(Vuex)
export function createStore () {
  return new Vuex.Store({
    state: {
      mode: 'move',
      componentList: [[]],
      pos: [0, 0],
      titleList: ['默认标题'],
      formName: 'formValue',
      currentComponentIndex: 0,
      currentComponent: {}
    },
    mutations: {
      updateConfig (state, payload) {
        state.formName = payload.formName
      },
      clearForm (state) {
        state.componentList = [[]]
        state.titleList = ['默认标题']
      },
      changeMode (state, payload) {
        state.mode = payload.mode
      },
      updatePos (state, payload) {
        state.pos = payload.pos
      },
      updateComponentList (state, payload) {
        state.componentList = payload.componentList
        state.titleList = payload.titleList
      },
      addFormItem (state) {
        state.componentList.push([])
        state.titleList.push('默认标题')
        state.currentComponentIndex = state.componentList.length - 1
      },
      addComponent (state, payload) {
        // state.componentList[payload.index].push({...payload.componentInfo, id: state.componentList[payload.index].length})
        if (payload.componentInfo.childComponentArr) {
          payload.componentInfo.childComponentArr = deepClone(payload.componentInfo.childComponentArr)
        }
        if (payload.componentInfo.options) {
          payload.componentInfo.options = deepClone(payload.componentInfo.options)
        }
        state.componentList[state.currentComponentIndex].push({...payload.componentInfo, tid: state.componentList[state.currentComponentIndex].length, uid: Math.random()})
        state.currentComponent = payload.componentInfo
      },
      spliceComponent (state, payload) {
        const component = state.componentList[payload.prevIndex].splice(payload.tid, 1)[0]
        for (let i = payload.tid; i < state.componentList[payload.prevIndex].length; i++) {
          state.componentList[payload.prevIndex][i].tid--
        }
        component.tid = state.componentList[state.currentComponentIndex].length
        state.componentList[state.currentComponentIndex].splice(component.tid, 0, component)
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
      },
      deleteComponent (state, payload) {
        state.componentList[payload.index].splice(payload.tid, 1)
        for (let i = payload.tid; i < state.componentList[payload.index].length; i++) {
          state.componentList[payload.index][i].tid--
        }
      }
    },
    actions: {
    }
  })
}
