<script>
export default {
  props: {
    componentInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      newComponentInfo: {},
      isFromVuex: false,
      isShow: true
    }
  },
  watch: {
    newComponentInfo: {
      handler () {
        if (this.isFromVuex) {
          this.isFromVuex = false
          return
        }
        this.handleClick()
      },
      deep: true
    },
    componentInfo: {
      handler () {
        this.isFromVuex = true
        // 监听特殊属性
        const watchArr = ['width', 'height', 'is-range', 'type', 'expand-trigger']
        watchArr.forEach(item => {
          if (this.componentInfo[item] !== undefined) {
            if (this.componentInfo[item] !== this.newComponentInfo[item]) {
              this.isShow = false
              this.$nextTick(() => {
                this.isShow = true
              })
            }
          }
        })
        this.newComponentInfo = {...this.componentInfo}
      }
    }
  },
  methods: {
    handleClick (e) {
      // if (e) {
      //   e.stopPropagation()
      // }
      this.$store.commit({
        type:'updateCurrentComponent',
        componentInfo: {...this.componentInfo, ...this.newComponentInfo},
        index: this.index
      })
    },
    sync (prop, value) {
      this.$set(this.newComponentInfo, prop, value)
    }
  },
  render (h) {
    return this.isShow ? h('div', {
      on: {
        '!click': this.handleClick
      }
    }, [h(this.componentInfo.componentName, {
        props: {...this.componentInfo, ...this.newComponentInfo},
        // attrs: this.componentInfo,
        on: {
          input: (e) => this.sync('value', e)
        }
    }, this.componentInfo.childComponentName
      ? this.componentInfo.childComponentArr.map(item => h(this.componentInfo.childComponentName, {
        props: item
      }))
      : this.componentInfo.innerText)]) : ''
  }
}
</script>
