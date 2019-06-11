import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import elementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import Hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import VueClipboard from 'vue-clipboard2'
import ElFormRenderer from '@femessage/el-form-renderer'

Vue.use(VueClipboard)
Vue.component('el-form-renderer', ElFormRenderer)
let Highlight = {};
Highlight.install = function (Vue) {
  // 先绑定，后面会有数据更新，调用highlight
  Vue.directive('highlight', {
    update: function(el, binding) {
      let blocks = el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        let item = blocks[i]
        item.innerText = binding.value
        Hljs.highlightBlock(item)
      }
    }
  })
}
Vue.use(Highlight)
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
