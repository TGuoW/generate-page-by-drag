<script>
  /*
  页面组件，构造一个独一无二的key，以及各种value，点击后触发事件，将组件信息传到详细组件，响应式设置组件
  todo：一个页面组件容纳各种element组件
  vuex：接收详情组件的key以及各类设置的值，更新到画板
  画板：维护组件数组，
  */
  import viewComponent from './viewComponent.vue'
  import formItemTitle from './FormItemTitle.vue'
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
    methods: {
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
        nativeOn: {
          click: () => this.setCurrentIndex(index)
        },
        attrs: {
          index: index + 1
        },
        class: {
          row: this.currentComponentIndex === index
        },
        style: {
          minHeight: '40px'
        }
      }, [(<template slot="label">
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
