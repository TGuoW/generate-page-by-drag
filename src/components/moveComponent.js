export default {
  props: ['info'],
  data () {
    return {
      isMove: false,
      pos: [0, 0],
      initialStyle: {
        position: 'absolute',
        opacity: '0',
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
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    handleMouseDown ({pageX, pageY}) {
      event.stopPropagation()
      this.isMove = true
      this.pos = [pageX, pageY]
    },
    handleMouseMove (e) {
      console.log(e.target)
      if (this.isMove) {
        if (e.target.__vue__) {
          let index = e.target.__vue__.$attrs.index

          // while (e.target.parent && )
          if (index !== undefined) {
            this.$store.commit({
              type: 'updateCurrentComponentIndex',
              index: index
            })
          }
        }
        this.pos = [e.pageX, e.pageY]
      }
    },
    handleMouseUp () {
      if (this.isMove) {
        this.isMove = false
        this.$store.commit({
          type: 'addComponent',
          componentInfo: this.info,
          // index: 0
        })
      }
    }
  },
}