<template>
  <div>
    <pre v-highlight>
      <code class="html">{{ code }}</code>
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
      return this.$store.state.componentList
    },
    titleList () {
      return this.$store.state.titleList
    }
  },
  watch: {
    componentList: {
      handler () {
        let code = '<el-form label-width="100px">\n'
        this.componentList.forEach((item, index) => {
          code += '  <el-form-item label="' + this.titleList[index] + '">\n'
          item.forEach(ele => {
            code += ele.componentName ? '    <' + ele.componentName + '/>\n' : ''
          })
          code += '  </el-form-item>\n'
        })
        code += '</el-form>'
        this.code = code
      }
    }
  },
  mounted () {

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

