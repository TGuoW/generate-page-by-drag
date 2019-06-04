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
      currentPos: [],
      isFromVuex: false,
      isShow: true,
      isMove: false,
      canMove: false,
      initialStyle: {
        position: 'relative',
        left: '0',
        top: '0'
      },
      hasDelete: false
    }
  },
  computed: {
    pos () {
      return this.$store.state.pos
    },
    moveStyle () {
      return {
        position: 'fixed',
        opacity: '1',
        zIndex: 1000,
        left: this.pos[0] + 'px',
        top: this.pos[1] + 'px',
        transform: 'translateX(-50%) translateY(-50%)'
      }
    },
    mode () {
      return this.$store.state.mode
    }
  },
  watch: {
    pos () {
      if (this.isMove && !this.canMove && (Math.abs(this.pos[0] - this.currentPos[0]) > 20 || Math.abs(this.pos[1] - this.currentPos[1]) > 20)) {
        this.canMove = true
      }
    },
    newComponentInfo: {
      handler () {
        if (this.isFromVuex) {
          this.isFromVuex = false
          return
        }
        this.$store.commit({
          type:'updateCurrentComponent',
          componentInfo: {...this.componentInfo, ...this.newComponentInfo},
          index: this.index
        })
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
    handleClick () {
      // if (e) {
      //   e.stopPropagation()
      // }
      if (this.mode === 'delete' && !this.hasDelete) {
        this.hasDelete = true
        this.$store.commit({
          type: 'deleteComponent',
          index: this.index,
          tid: this.componentInfo.tid
        })
      }
      if (!this.hasDelete) {
        this.$store.commit({
          type:'updateCurrentComponent',
          componentInfo: {...this.componentInfo, ...this.newComponentInfo},
          index: this.index
        })
      }
    },
    handleMousedown ({pageX, pageY}) {
      if (event.target.className.includes('el-slider__button')) { // 对Slider特殊处理
        return
      }
      event.stopPropagation()
      this.isMove = true
      this.currentPos = [pageX, pageY]
    },
    // handleMousemove ({pageX, pageY}) {

    // },
    handleMouseup () {
      this.canMove = false
      this.isMove = false
      if (this.index === this.$store.state.currentComponentIndex) {
        return
      }
      this.$store.commit({
        type: 'spliceComponent',
        prevIndex: this.index,
        tid: this.componentInfo.tid
      })
    },
    sync (prop, value) {
      this.$set(this.newComponentInfo, prop, value)
    },
  },
  render (h) {
    const vnode = h(this.componentInfo.componentName, {
      props: {...this.componentInfo, ...this.newComponentInfo},
      attrs: this.componentInfo,
      on: {
        input: (e) => this.sync('value', e)
      }
    }, this.componentInfo.childComponentName
      ? this.componentInfo.childComponentArr.map(item => h(this.componentInfo.childComponentName, {
        props: item
      }))
      : this.componentInfo.innerText)

    return this.isShow ? h('div', {
      style: this.canMove ? this.moveStyle : this.initialStyle,
      class: 'view',
      on: {
        '!click': this.handleClick,
        'mousedown': this.handleMousedown,
        // 'mousemove': this.handleMousemove,
        'mouseup': this.handleMouseup
      }
    }, [vnode]) : ''
  }
}
</script>
