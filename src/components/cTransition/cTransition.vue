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
  // ['top', 'left'].forEach(property => {
  //   let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
  //   maskStyle[property] = options.target.getBoundingClientRect()[property] +
  //     document.body[scroll] +
  //     document.documentElement[scroll] +
  //     'px';
  // });
  ['height', 'width'].forEach(property => {
    maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
  });
  const filterProperty = ['top', 'right', 'bottom', 'left']
  Object.keys(maskStyle).forEach(property => {
    !filterProperty.includes(property) && (instance.style[property] = maskStyle[property])
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
    needBg: {
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
      const {bgElm, mainElm} = this.$refs
      const targetElm = target ? document.querySelector(target) : bgElm.parentElement
      if (getComputedStyle(targetElm, null).getPropertyValue('position') === 'static') {
        targetElm.style.position = 'relative'
      }
      const sourceElm = this.$scopedSlots.default()[0].elm
      addStyle({target: sourceElm}, mainElm)
    })
    const bgClass = ['c-transition-bg']
    const mainClass = ['c-transition-main']
    if (this.isShow) {
      bgClass.push('c-transition-block')
      mainClass.push('c-transition-block')
    }
    return (
      <div ref="bgElm" class={bgClass}>
        <div ref="mainElm" class="c-transition-main">
          {this.$scopedSlots.default()}
        </div>
      </div>
    )
  }
}
</script>

<style scoped>
  @keyframes slide-in {
    0%{
        transform: translateX(-100%)
    }
    100%{
        transform: translateX(0)
    }
  }
  @keyframes fade-in {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  .c-transition-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: none;
    transition: all 500ms;
    overflow: hidden;
    animation: fade-in 0.5s;
  }
  .c-transition-main {
    animation:slide-in 0.5s;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .c-transition-block {
    display: block;
  }
</style>

