<script>
export default {
  props: {
    index: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      currentPos: [],
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
    }
  },
  watch: {
    pos () {
      if (this.isMove && !this.canMove && (Math.abs(this.pos[0] - this.currentPos[0]) > 20 || Math.abs(this.pos[1] - this.currentPos[1]) > 20)) {
        this.canMove = true
      }
    }
  },
  methods: {
    handleMousedown ({pageX, pageY}) {
      if (event.target.className.includes('el-slider__button')) { // 对Slider特殊处理
        return
      }
      event.stopPropagation()
      this.isMove = true
      this.currentPos = [pageX, pageY]
    },
    handleMouseup () {
      if (!this.isMove) return
      this.isMove = false
      if (!this.canMove) return
      this.canMove = false
      if (this.index === this.$store.state.currentComponentIndex) return
      this.$store.commit({
        type: 'spliceComponent',
        prevIndex: this.index
      })
    }
  },
  render (h) {
    return this.isShow ? h('div', {
      style: this.canMove ? this.moveStyle : this.initialStyle,
      class: 'view',
      on: {
        'mousedown': this.handleMousedown,
        'mouseup': this.handleMouseup
      }
    }, this.$slots.default) : ''
  }
}
</script>
