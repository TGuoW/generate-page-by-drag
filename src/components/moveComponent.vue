<script>
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isMove: false,
      initialStyle: {
        position: 'absolute',
        opacity: '0',
        left: '0',
        top: '0'
      }
    }
  },
  computed: {
    mode () {
      return this.$store.state.mode
    },
    pos () {
      return this.$store.state.pos
    },
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
  mounted() {
    window.addEventListener('mouseup', this.handleMouseUp)
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    handleMouseDown () {
      event.stopPropagation()
      this.isMove = true
    },
    handleMouseUp () {
      if (this.isMove) {
        this.isMove = false
        if (this.mode !== 'move') {
          this.$message({
            type: 'warning',
            message: '请切换为预览模式'
          })
          return
        }
        this.$store.commit({
          type: 'addComponent',
          componentInfo: this.info
        })
      }
    }
  },
  render(h) {
    return h('div', {
        style: {
          position: 'relative'
        }
      }, [
        h('div', {
          on: {
            mousedown: this.handleMouseDown
          },
        }, this.info.name + ' ' + this.info.desc),
        this.isMove ?
        h('div', {
            style: this.isMove ? this.moveStyle : this.initialStyle,
            on: {
              mousedown: this.handleMouseDown
            },
          },
          [h(this.info.componentName, {
            props: this.info
          }, this.info.childComponentName
            ? this.info.childComponentArr.map(item => h(this.info.childComponentName, {
              props: item
            }))
            : this.info.innerText)]) : ''
      ])
  }
}
</script>
