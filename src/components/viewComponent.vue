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
  computed: {
    componentInfoFormVuex () {
      return this.$store.state.currentComponent
    }
  },
  render (h) {
    console.log({...this.componentInfoFormVuex, ...this.componentInfo})
    return h('div', {
      on: {
        '!click': this.handleClick
      }
    }, [h(this.componentInfo.componentName, {
      props: {...this.componentInfoFormVuex, ...this.componentInfo}
    }, this.componentInfoFormVuex.innerText || this.componentInfo.innerText)])
  },
  methods: {
    handleClick (e) {
      e.stopPropagation()
      this.$store.commit('updateCurrentComponent', this.componentInfo)
    }
  }
}
</script>
