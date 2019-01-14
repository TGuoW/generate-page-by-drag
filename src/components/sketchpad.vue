<script>
  /*
  页面组件，构造一个独一无二的key，以及各种value，点击后触发事件，将组件信息传到详细组件，响应式设置组件
  todo：一个页面组件容纳各种element组件
  vuex：接收详情组件的key以及各类设置的值，更新到画板
  画板：维护组件数组，
  */
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
