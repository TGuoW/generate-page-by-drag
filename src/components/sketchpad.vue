<script>
  export default {
    data() {
      return {
        rowNum: 10
      }
    },
    computed: {
      componentList () {
        return this.$store.state.componentList
      },
      currentComponentIndex () {
        return this.$store.state.currentComponentIndex
      }
    },
    render(h) {
      return h('div', [
        h('el-row', {
          attrs: {
            index: 1
          },
          class: {
            row: this.currentComponentIndex === 1
          }
        }, this.componentList.map((item) => h(item.componentName, item.innerText))),
        h('el-row')
      ])
    },
  }
</script>

<style lang="scss" scoped>
  .row {
    box-shadow: 0 0 6px rgb(39, 185, 243);
  }
</style>
