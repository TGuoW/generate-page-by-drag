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
      pos: [],
      isFromVuex: false,
      isShow: true,
      isMove: false,
      canMove: false,
      initialStyle: {
        position: 'relative',
        left: '0',
        top: '0'
      }
    }
  },
  computed: {
    moveStyle () {
      return {
        position: 'fixed',
        opacity: '1',
        left: this.pos[0] + 'px',
        top: this.pos[1] + 'px',
        transform: 'translateX(-50%) translateY(-50%)'
      }
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
  created () {

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
    handleMousedown ({pageX, pageY}) {
      event.stopPropagation()
      this.isMove = true
      this.pos = [pageX, pageY]
    },
    handleMousemove ({pageX, pageY}) {
      if (this.isMove && !this.canMove && (Math.abs(this.pos[0] - pageX) > 20 || Math.abs(this.pos[1] - pageY) > 20)) {
        this.canMove = true
      }
      if (this.isMove && this.canMove) {
        this.pos = [pageX, pageY]
      }
    },
    handleMouseup () {
      this.isMove = false
      this.canMove = false
    },
    sync (prop, value) {
      this.$set(this.newComponentInfo, prop, value)
    }
  },
  render (h) {
    return this.isShow ? h('div', {
      style: this.canMove ? this.moveStyle : this.initialStyle,
      on: {
        '!click': this.handleClick,
        'mousedown': this.handleMousedown,
        'mousemove': this.handleMousemove,
        'mouseup': this.handleMouseup
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
