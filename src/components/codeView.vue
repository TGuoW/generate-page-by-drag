<template>
  <div>
    <pre v-highlight="code">
      <code class="html" />
    </pre>
  </div>
</template>

<script>
// import hljs from 'highlight.js'
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
      let code = '<template>\n<el-form label-width="100px">\n'
      componentList.forEach((item, index) => {
        code += '  <el-form-item label="' + this.titleList[index] + '">\n'
        item.forEach(ele => {
          if (ele.childComponentName) {
            code += '    <' + ele.componentName + '>\n'
            ele.childComponentArr.forEach(child => {
              code += '      <' + ele.childComponentName + this.objToString(child) + '/>\n'
            })
            code += '    </' + ele.componentName + '>\n'
          } else {
            code += ele.componentName ? '    <' + ele.componentName + this.objToString(ele) + '/>\n' : ''
          }
        })
        code += '  </el-form-item>\n'
      })
      code += '</el-form>\n</template>\n\n'
      code += '<script>\n'
      code += 'export defalut {\n'
      code += '}\n'
      this.code = code
    },
    objToString (obj) {
      return Object.keys(obj).reduce((a, b) => {
        return a + ' ' + b + '="' + obj[b] + '"'
      }, '')
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

