<script>

// eslint-disable-next-line no-useless-escape
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

const getStyle = (element, styleName) => {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}

const addStyle = (options, instance) => {
  let maskStyle = {};
  instance.originalPosition = getStyle(document.body, 'position');
  ['top', 'left'].forEach(property => {
    let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
    maskStyle[property] = options.target.getBoundingClientRect()[property] +
      document.body[scroll] +
      document.documentElement[scroll] +
      'px';
  });
  ['height', 'width'].forEach(property => {
    maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
  });
  Object.keys(maskStyle).forEach(property => {
    instance.style[property] = maskStyle[property];
  });
};

export default {
  name: 'CTransition',
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
        return ''
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  render () {
    this.$nextTick(() => {
      const { target } = this
      const $el = this.$refs.bg
      const targetElm = target ? document.querySelector(target) : $el.parentElement
      if (getComputedStyle(targetElm, null).getPropertyValue('position') === 'static') {
        targetElm.style.position = 'relative'
      }
      const sourceElm = this.$scopedSlots.default()[0].elm
      addStyle({target: sourceElm}, $el)
    })
    const bgClass = ['c-transition-bg']
    const mainClass = ['c-transition-main']
    if (this.isShow) {
      bgClass.push('c-transition-block')
      mainClass.push('c-transition-block')
    }
    return (
      <div ref="bg" class={bgClass}>
        <div class="c-transition-main">
          {this.$scopedSlots.default()}
        </div>
      </div>
    )
  }
}
</script>

<style scoped>
  .c-transition-bg {
    /* position: absolute; */
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: none;
    transition: all 500ms;
  }
  .c-transition-main {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .c-transition-block {
    display: block;
  }
</style>

