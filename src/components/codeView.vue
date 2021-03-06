<template>
  <div class="code-view">
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form
        ref="form"
        :model="templateForm"
        :rules="templateFormRules"
      >
        <el-form-item
          prop="name"
          label="模板名称"
        >
          <el-input
            v-model="templateForm.name"
            placeholder="请输入模板名称"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="checkSaveCode"
        >
          保存
        </el-button>
      </span>
    </el-dialog>
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
        @click="changeMode"
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
      <el-button
        type="primary"
        size="mini"
        @click="saveCode"
      >
        保存
      </el-button>
    </div>

    <codemirror
      ref="myCm"
      v-model="code"
      class="codemirror"
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
  'value',
  'viewName',
  'rules'
]
export default {
  data () {
    return {
      code: '',
      templateCode: '',
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
        },
        readOnly: 'nocursor'
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      templateForm: {
        name: ''
      },
      templateFormRules: {
        name: [
          {required: true, message: '请输入模板名称', trigger: 'blur'},
          {validator: (rule, value, callback) => {
            if (this.$store.state.templateList.some(item => item.name === value)) {
              callback(new Error('此名称已存在'))
            } else {
              callback()
            }
          }, trigger: 'blur'}
        ]
      },
      centerDialogVisible: false
    }
  },
  computed: {
    componentList () {
      return this.$store.state.componentList
    },
    titleList () {
      let titleList = this.$store.state.titleList
      // this.renderCode(titleList, this.componentList)
      return titleList
    },
    formName () {
      return this.$store.state.settings.formName
    },
    currentCode () {
      return this.$store.state.currentCode
    }
  },
  watch: {
    componentList () {
      this.renderCode(this.componentList)
    },
    currentCode (val) {
      this.$nextTick(() => {
        this.code = val
        if (this.mode === 'preview') {
          this.changeMode()
        } else {
          this.mountCode()
        }
      })
    }
  },
  mounted () {
    this.renderCode(this.componentList)
  },
  methods: {
    saveCode () {
      this.centerDialogVisible = true
    },
    checkSaveCode () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const content = {
            componentList: this.$store.state.componentList,
            titleList: this.$store.state.titleList,
            code: this.code
          }
          this.$store.commit({
            type: 'editTemplateList',
            action: 'push',
            params: [{
              ...this.templateForm,
              content
            }]
          })
          this.centerDialogVisible = false
        } else {
          return false
        }
      })
    },
    changeMode () {
      const { mode } = this
      if (mode === 'preview') {
        this.mode = 'edit'
        this.cmOptions.readOnly = false
        this.mountCode()
      } else {
        this.$confirm('是否舍弃已编辑代码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit({
            type: 'changeMode',
            mode: 'move'
          })
          this.mode = 'preview'
          this.cmOptions.readOnly = 'nocursor'
        }).catch(() => {
        })
      }
    },
    onCmCodeChange(newCode) {
      this.code = newCode
    },
    mountCode () {
      const { code } = this
      const template = `<div id="sketchpad">${code.match(/<template>([\s\S]*)<\/template>/)[1]}</div>`
      const script = code.match(/<script>([\s\S]*)<\/script>/)[0]
      const vueObj = eval(`(${script.slice(script.indexOf('{'), script.lastIndexOf('}') + 1)})`)
      const res = Vue.compile(template)
      this.$nextTick(() => {
        this.$nextTick(() => {
            this.instance = new Vue({
              ...vueObj,
              render: res.render
            }).$mount('#sketchpad')
        })
      })
      if (this.$store.state.mode !== 'edit') {
        this.$store.commit({
          type: 'changeMode',
          mode: 'edit'
        })
      }
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
      this.templateCode = code
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
  .code-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #23241f;
  }
  .btn {
    margin: 12px 0 0 12px;
  }
  .codemirror {
    flex: 1;
  }
  .codemirror /deep/ .CodeMirror {
    width: 100%;
    height: 100%;
  }
  .codemirror /deep/ .CodeMirror-scroll::-webkit-scrollbar {
    background: #fff;
  }
</style>
