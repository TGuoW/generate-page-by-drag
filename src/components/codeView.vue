<template>
  <div>
    <pre v-highlight="code">
      <code class="html" />
    </pre>
  </div>
</template>

<script>
// import hljs from 'highlight.js'
const filterAttr = [
  'name',
  'desc',
  'componentName',
  'componentNumber',
  'childComponentName',
  'childComponentArr',
  'innerText',
  'tid',
  'value'
]
export default {
  data () {
    return {
      code: ''
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
    }
  },
  watch: {
    componentList: {
      handler () {

      },
      deep: true
    }
  },
  methods: {
    renderCode (componentList) {
      const formValueObj = {}
      const dataOther = {}
      let dataIndex = 1
      let code = '<template>\n<el-form label-width="100px">\n'
      componentList.forEach((item, index) => {
        code += '  <el-form-item label="' + this.titleList[index] + '">\n'
        item.forEach(ele => {
          let name = ele.name + dataIndex++
          formValueObj[name] = ele.value
          if (ele.childComponentArr || ele.data || ele.options) {
            dataOther[name] = ele.childComponentArr || ele.data || ele.options
          }
          if (ele.childComponentName) {
            code += '    <' + ele.componentName + '\n      v-model=formValue."' + name + '"' + this.objToString(ele, '    ', name) + '>\n'
            // ele.childComponentArr.forEach(child => {
            //   code += '      <' + ele.childComponentName + this.objToString(child, '      ') + '/>\n'
            // })
            code += '      <' + ele.childComponentName + '\n        v-for="(item, index) in options"\n        :key="index"' + this.objToStringChild(ele.childComponentArr[0], '      ') + '/>\n'
            code += '    </' + ele.componentName + '>\n'
          } else {
            code += ele.componentName ? '    <' + ele.componentName + '\n      v-model="formValue.' + name + '"' + this.objToString(ele, '    ', name) + '/>\n' : ''
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
      code += this.renderOther(dataOther, '      ')
      code += '\n    }\n'
      code += '  }\n'
      code += '}\n'
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
      if (typeof(tmp) === 'object') {
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
        return typeof(tmp) === 'string' ? '"' + tmp + '",\n' : tmp + ',\n'
      }
    },
    renderData (dataObj) {
      const space = '      '
      const space1 = '        '
      let code = space + 'formValue: {\n'
      Object.keys(dataObj).forEach(item => {
        code += '' + space1 + item + ':' + this.renderDataCode(dataObj[item], space1)
      })
      code += space + '},\n'
      return code
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
    height: 100%;
    background: #23241f;
  }
</style>

