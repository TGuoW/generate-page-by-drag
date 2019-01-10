export default {
  props: ['info'],
  data () {
    return {
      isMove: false,
      pos: [0, 0]
    }
  },
  render(h) {
    return h('div', {
      style: {
        position: 'relative',
        zIndex: '1000',
        transform: 'translateX(400px)'
      },
      on: {
        mousedown: this.handleMouseDown
      },
    }, this.info.name + ' ' + this.info.desc)
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    handleMouseDown () {
      this.isMove = true
      console.log(1)
    },
    handleMouseMove () {

    },
    handleMouseUp () {
      this.isMove = false
    }
  },
}