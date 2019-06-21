import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import elementUI from 'element-ui'

import VueClipboard from 'vue-clipboard2'
import ElFormRenderer from '@femessage/el-form-renderer'

Vue.use(VueClipboard)
Vue.component('el-form-renderer', ElFormRenderer)

Vue.use(elementUI)
Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router }
}
