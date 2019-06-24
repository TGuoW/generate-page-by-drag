<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    target: {
      type: String,
      default () {
        return 'body'
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  render (h) {
    const target = document.querySelector(this.target)
    if (getComputedStyle(target, null).getPropertyValue('position') === 'static') {
      target.style.position = 'relative'
    }

    return (
      <div></div>
    )
  }
}
</script>
