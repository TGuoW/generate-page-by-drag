import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
let Highlight = {};
Highlight.install = function (Vue) {
  // 先绑定，后面会有数据更新，调用highlight
  Vue.directive('highlight', {
    componentUpdated: function(el) {
      let blocks = el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i]
        Hljs.highlightBlock(item)
      }
    }
  })
}
Vue.use(Highlight)
Vue.use(elementUI)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
