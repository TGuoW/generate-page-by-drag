<script>
export default {
  props: {
    componentInfo: {
      type: Object,
      default () {
        return ''
      }
    }
  },
  render (h) {
    return h('div', {
      on: {
        '!click': this.handleClick
      }
    }, [h(this.componentInfo.componentName, {
      props: this.componentInfo
    }, this.componentInfo.innerText)])
  },
  methods: {
    handleClick (e) {
      e.stopPropagation()
      this.$store.commit('updateCurrentComponent', this.componentInfo)
    }
  }
}
</script>
