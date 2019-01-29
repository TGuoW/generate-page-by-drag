<script>
export default {
  props: {
    componentInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleClick (e) {
      e.stopPropagation()
      this.$store.commit({
        type:'updateCurrentComponent',
        componentInfo: this.componentInfo,
        index: 0
      })
    },
    sync (prop, value) {
      this.$set(this.componentInfo, prop, value)
    }
  },
  render (h) {
    return h('div', {
      on: {
        '!click': this.handleClick
      }
    }, [h(this.componentInfo.componentName, {
      props: this.componentInfo,
      attrs: this.componentInfo,
      on: {
        input: (e) => this.sync('value', e)
      }
    }, this.componentInfo.innerText)])
  }
}
</script>
