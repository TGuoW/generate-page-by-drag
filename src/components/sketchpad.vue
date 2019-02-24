<script>
  /*
  页面组件，构造一个独一无二的key，以及各种value，点击后触发事件，将组件信息传到详细组件，响应式设置组件
  todo：一个页面组件容纳各种element组件
  vuex：接收详情组件的key以及各类设置的值，更新到画板
  画板：维护组件数组，
  */
  import viewComponent from './viewComponent.vue'
  import formItemTitle from './editText.vue'
  let pre = 0
  const throttle = (func, wait) => {
    return function(e){
      const context = this;
      let now = Date.now();
      if (now - pre >= wait){
        func.call(context, e);
        pre = Date.now();
      }
    }
  }
  export default {
    components: {
      viewComponent,
      formItemTitle
    },
    data() {
      return {
        title: ''
      }
    },
    computed: {
      pos () {
        return this.$store.state.pos
      },
      componentList () {
        return this.$store.state.componentList
      },
      currentComponentIndex () {
        return this.$store.state.currentComponentIndex
      },
      titleList () {
        return this.$store.state.titleList
      }
    },
    watch: {
      pos: {
        handler (val) {
          throttle(this.updatePos, 100)()
        }
      }
    },
    methods: {
      updatePos () {
        const [x, y] = this.pos
        let index = Math.floor((y - 132) / 62)
        let targetRef = this.$refs['row' + index]
        while (!targetRef && index >= 0) {
          index--
          targetRef = this.$refs['row' + index]
        }
        if (index < 0) {
          return
        }
        let { offsetHeight, offsetTop, offsetLeft, offsetWidth } = targetRef.$el
        let i = 0
        while ((y > offsetHeight + offsetTop || y < offsetTop) && i < 20) {
          i++
          if (y > offsetHeight + offsetTop) {
            index++
          }
          if (y < offsetTop) {
            index--
          }
          targetRef = this.$refs['row' + index]
          if (!targetRef) {
            return
          }
          ({ offsetHeight, offsetTop, offsetLeft, offsetWidth } = targetRef.$el)
        }
        if (i === 20) {
          return
        }
        if (
          x > offsetLeft &&
          x < offsetLeft + offsetWidth &&
          y > offsetTop &&
          y < offsetTop + offsetHeight
        ) {
          this.setCurrentIndex(index)
        }
      },
      setCurrentIndex (index) {
        this.$store.commit({
          type: 'updateCurrentComponentIndex',
          index: index
        })
      }
    },
    render(h) {
      return h('el-form', {
        props: {
          'label-width': '100px'
        }
      }, this.componentList.map((item, index) => h('el-form-item', {
        attrs: {
          index: index + 1
        },
        class: {
          row: this.currentComponentIndex === index
        },
        ref: 'row' + index,
        style: {
          minHeight: '40px'
        }
      }, [
        (<template slot="label">
          {h('formItemTitle', {
            on: {
              input: (e) => {
                this.$store.commit({
                  type: 'updateTitleList',
                  index: index,
                  title: e
                })
              }
            },
            props: {
              value: this.titleList[index]
            }
          })}
        </template>),
        ...item.map(ele => h('view-component', {
          props: {
            index: index,
            componentInfo: ele
          }
        }))
      ])))
    },
  }
</script>

<style lang="scss" scoped>
  .row {
    box-shadow: 0 0 6px rgb(39, 185, 243);
  }
</style>
