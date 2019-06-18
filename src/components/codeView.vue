<template>
  <div>
    <el-button
      v-clipboard:copy="code"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="btn"
      size="mini"
    >
      Copy!
    </el-button>
    <el-button
      class="btn"
      size="mini"
      @click="mode = mode === 'preview' ? 'edit' : 'preview'"
    >
      {{ mode === 'preview' ? '编辑' : '预览' }}
    </el-button>
    <el-button
      v-show="mode === 'edit'"
      class="btn"
      size="mini"
      @click="mountCode"
    >
      运行
    </el-button>
    <pre
      v-show="mode === 'preview'"
      v-highlight="code"
    >
      <code
        class="html xml hljs"
        style="height: 100%"
      />
    </pre>
    <codemirror
      v-show="mode === 'edit'"
      ref="myCm"
      class="codemirror"
      :value="code"
      :options="cmOptions"
      @input="onCmCodeChange"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
// language js
import 'codemirror/mode/vue/vue.js'
// theme css
// import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/monokai.css'
import deepClone from '../assets/js/deepClone'

Vue.use(VueCodemirror, {
  options: { theme: 'monokai'},
  events: ['scroll']
})

const filterAttr = [
  'name',
  'desc',
  'componentName',
  'componentNumber',
  'childComponentName',
  'childComponentArr',
  'innerText',
  'tid',
  'uid',
  // 'value',
  'viewName',
  'rules'
]
export default {
  data () {
    return {
      code: '',
      mode: 'preview',
      instance: null,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-vue',
        // theme: 'base16-dark',
        lineNumbers: true,
        line: true,
          styleActiveLine: true,
          foldGutter: true,
          styleSelectedText: true,
          // mode: 'text/javascript',
          // keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          extraKeys: { "Ctrl": "autocomplete" },
          hintOptions:{
            completeSingle: false
          }
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  computed: {
    componentList () {
      let componentList = this.$store.state.componentList
      this.renderCode(componentList)
      return componentList
    },
    titleList () {
      let titleList = this.$store.state.titleList
      // this.renderCode(titleList, this.componentList)
      return titleList
    },
    formName () {
      return this.$store.state.settings.formName
    }
  },
  mounted () {
    setTimeout(() => {
      this.renderCode(this.componentList)
    }, 1000)
  },
  methods: {
    onCmCodeChange(newCode) {
      this.code = newCode
    },
    mountCode () {
      const { code } = this
      const template = `<div>${code.match(/<template>([\s\S]*)<\/template>/)[1]}</div>`
      const script = code.match(/<script>([\s\S]*)<\/script>/)[0]
      const vueObj = eval(`(${script.slice(script.indexOf('{'), script.lastIndexOf('}') + 1)})`)
      const res = Vue.compile(template)
      this.instance = new Vue({
        ...vueObj,
        render: res.render
      }).$mount('#sketchpad')
    },
    onCopy () {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    onError () {
      this.$message('复制失败！')
    },
    renderCode (componentList) {
      /* shi */
      const { formName } = this
      const formValueObj = {}
      const dataOther = {}
      // let code = '<template>\n<el-form :model="' + formName + '" :rules="rules" label-width="100px">\n'
      let code = `<template>
<el-form :model="${formName}" :rules="rules" label-width="100px">
`
      componentList.forEach((item, index) => {
        code += '  <el-form-item label="' + this.titleList[index] + '" prop="' + item[0].viewName + '">\n'
        item.forEach(ele => {
          let name = ele.viewName
          formValueObj[name] = ele.value
          if (ele.childComponentArr || ele.data || ele.options) {
            dataOther[name] = ele.childComponentArr || ele.data || ele.options
          }
          if (ele.childComponentName) {
            code += '    <' + ele.componentName + '\n' +
                    '      v-model="' + formName + '.' + name + '"' +
                    this.objToString(ele, '    ', name) + '>\n'
            code += '      <' + ele.childComponentName + '\n' +
                    '        v-for="(item, index) in ' + name + '"\n' +
                    '        :key="index"' + this.objToStringChild(ele.childComponentArr[0], '      ') + '/>\n'
            code += '    </' + ele.componentName + '>\n'
          } else {
            code += ele.componentName
                    ? '    <' + ele.componentName + '\n' +
                      '      v-model="' + formName + '.' + name + '"' +
                      this.objToString(ele, '    ', name) + '/>\n'
                    : ''
          }
        })
        code += '  </el-form-item>\n'
      })
      code += '</el-form>\n</template>\n\n'
      code += '<script>\n'
      code += 'export defalut {\n'
      code += '  data () {\n'
      code += '    return {\n'
      code += this.renderData(formValueObj)
      code += this.renderRules(componentList)
      code += this.renderOther(dataOther, '      ')
      code = code.substr(0, code.length - 2)
      code += '}\n'
      code += '  }\n'
      code += '}\n'
      code += '</' + 'script>\n'
      this.code = code
    },
    objToStringChild (obj, space) {
      return Object.keys(obj).reduce((a, b) => {
        if (filterAttr.indexOf(b) !== -1 || obj[b] === '') {
          return a
        }
        let _space = space + '  '
        let _key = ':' + b
        let _value = '"item.' + b + '"'
        return a + '\n' + _space + _key + '=' + _value
      }, '')
    },
    objToString (obj, space, name) {
      return Object.keys(obj).reduce((a, b) => {
        if (filterAttr.indexOf(b) !== -1 || obj[b] === '') {
          return a
        }
        let _space = space + '  '
        let _key = (typeof(obj[b]) === 'string' ? '' : ':') + b
        let _value = '"' + (typeof(obj[b]) === 'object' ? name : obj[b]) + '"'
        return a + '\n' + _space + _key + '=' + _value
      }, '')
    },
    renderDataCode (tmp, space) { // 只支持Array
      const type = Object.prototype.toString.call(tmp)
      if (type === '[object Object]' || type === '[object Array]') {
        let res = '['
        tmp.forEach(item => {
          if (typeof(item) !== 'object') {
            res = res + '\n' + space + '  "' + item + '",'
          } else {
            res = res + this.renderOther(item, space + '  ')
          }
        })
        if (typeof(tmp[0]) === 'object') {
          res += '],\n'
        } else {
          res += '\n' + space + '],\n'
        }
        return res
      } else {
        return tmp !== undefined
              ? typeof(tmp) === 'string' || type === '[object Date]' ? '"' + tmp + '",\n' : tmp + ',\n'
              : '"",\n'
      }
    },
    renderData (dataObj) {
      const space = '      '
      const space1 = '        '
      let code = space + this.formName + ': {\n'
      Object.keys(dataObj).forEach(item => {
        code += '' + space1 + item + ':' + this.renderDataCode(dataObj[item], space1)
      })
      code += space + '},\n'
      return code
    },
    renderRules (componentList) {
      const rules = {}
      componentList.forEach(item => {
        item.forEach(ele => {
          if (ele.rules.length) {
            rules[ele.viewName] = deepClone(ele.rules)
          }
        })
      })
      return `      rules: ${this.renderOther(rules, '        ')}\n`
    },
    renderOther (dataObj, space) {
      let code = space === '      ' ? '' : '{\n'
      Object.keys(dataObj).forEach(item => {
        code += space + '' + item + ':' + this.renderDataCode(dataObj[item], space)
      })
      code += space.substr(0, space.length - 2) + '},'
      return code
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    width: 100%;
    // height: 100%;
    background: #23241f;
  }
  .btn {
    margin: 12px 0 0 12px;
  }
  .codemirror {
    
  }
  .codemirror /deep/ .CodeMirror {
    width: 100%;
    height: calc(100% - 52px);
  }
</style>
