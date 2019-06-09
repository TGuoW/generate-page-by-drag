<script>
  /*
  页面组件，构造一个独一无二的key，以及各种value，点击后触发事件，将组件信息传到详细组件，响应式设置组件
  todo：一个页面组件容纳各种element组件
  vuex：接收详情组件的key以及各类设置的值，更新到画板
  画板：维护组件数组，
  */
  import viewComponent from './viewComponent.vue'
  import formItemTitle from './editText.vue'
  import formItem from './formItem.vue'
  import deepClone from '../assets/js/deepClone'
  let pre = 0
  const throttle = (func, wait) => {
    return function(e){
      const context = this;
      let now = Date.now();
      if (now - pre >= wait) {
        func.call(context, e);
        pre = Date.now();
      }
    }
  }
  export default {
    components: {
      viewComponent,
      formItemTitle,
      formItem
    },
    data() {
      return {
        title: '',
        dialogVisible: false,
        activeTab: '',
        currentRule: [],
        currentSettingIndex: 0,
        rules: {},
        formValue: {
          type: '',
          method: '',
          required: false,
          min: '',
          max: '',
          length: '',
          trigger: 'change'
        },
        formConfig: [{
          $type: 'select', // 类型，element-ui 提供的所有表单类型，即 el-xxx
          $id: 'type', // 每一个原子都存在id，用于存储该原子的值，注意不能重复
          label: 'type',
          $options: [{
            label: 'string',
            value: 'string'
          }, {
            label: 'number',
            value: 'number'
          }, {
            label: 'boolean',
            value: 'boolean'
          }, {
            label: 'method',
            value: 'method'
          }, {
            label: 'regexp',
            value: 'regexp'
          }, {
            label: 'integer',
            value: 'integer'
          }, {
            label: 'float',
            value: 'float'
          }, {
            label: 'array',
            value: 'array'
          }, {
            label: 'object',
            value: 'object'
          }, {
            label: 'enum',
            value: 'enum'
          }, {
            label: 'date',
            value: 'date'
          }, {
            label: 'url',
            value: 'url'
          }, {
            label: 'hex',
            value: 'hex'
          }, {
            label: 'email',
            value: 'email'
          }],
        }, {
          $type: 'switch',
          $id: 'required',
          label: 'required'
        }, {
          $type: 'input',
          $id: 'min',
          label: 'min'
        }, {
          $type: 'input',
          $id: 'max',
          label: 'max'
        }, {
          $type: 'input',
          $id: 'message',
          label: 'message'
        }]
      }
    },
    computed: {
      pos () {
        return this.$store.state.pos
      },
      componentList () {
        return this.$store.state.componentList
      },
      currentComponentIndex () {
        return this.$store.state.currentComponentIndex
      },
      titleList () {
        return this.$store.state.titleList
      },
      settings () {
        return this.$store.state.settings
      }
    },
    watch: {
      pos: {
        handler () {
          throttle(this.updatePos, 100)()
        }
      }
    },
    methods: {
      updatePos () {
        let { offsetHeight, offsetTop, offsetLeft, offsetWidth } = document.getElementsByClassName('stage__sketchpad')[0]
        const [x, y] = this.pos
        if (!(
          x > offsetLeft &&
          x < offsetLeft + offsetWidth &&
          y > offsetTop &&
          y < offsetTop + offsetHeight
        )) {
          return
        }
        let index = Math.floor((y - 132) / 62)
        let targetRef = this.$refs['row' + index]
        while (!targetRef && index >= 0) {
          index--
          targetRef = this.$refs['row' + index]
        }
        if (index < 0) {
          return
        }
        ({ offsetHeight, offsetTop, offsetLeft, offsetWidth } = targetRef.$el)
        let i = 0
        while ((y > offsetHeight + offsetTop || y < offsetTop) && i < 20) {
          i++
          if (y > offsetHeight + offsetTop) {
            index++
          }
          if (y < offsetTop) {
            index--
          }
          targetRef = this.$refs['row' + index]
          if (!targetRef) {
            break
          }
          ({ offsetHeight, offsetTop, offsetLeft, offsetWidth } = targetRef.$el)
        }
        if (i === 20) {
          return
        }
        if (
          x > offsetLeft &&
          x < offsetLeft + offsetWidth &&
          y > offsetTop &&
          y < offsetTop + offsetHeight
        ) {
          this.setCurrentIndex(index)
        }
        if (y > offsetTop + offsetHeight) {
          this.setCurrentIndex(index + 1)
        }
      },
      setCurrentIndex (index) {
        this.$store.commit({
          type: 'updateCurrentComponentIndex',
          index: index
        })
      },
      showRuleSetting (index) {
        this.currentSettingIndex = index
        this.dialogVisible = true
        const component = this.componentList[index][0]
        this.currentRule = component.rules.map(item => {
          const newRuleConfig = deepClone(this.formConfig)
          newRuleConfig.forEach(ele => {
            if (item[ele.$id]) {
              ele.default = item[ele.$id]
            }
          })
          return newRuleConfig
        })
      },
      checkForm () {
        const component = this.componentList[this.currentSettingIndex][0]
        const rules = this.currentRule.map((item, index) => {
          const res = this.$refs['form' + index].getFormValue()
          Object.keys(res).forEach(item => {
            if (!res[item]) delete res[item]
          })
          return res
        })
        component.rules = rules
        this.rules[component.viewName] = deepClone(rules)
        this.dialogVisible = false
      },
      addRule () {
        this.currentRule.push(deepClone(this.formConfig))
      }
    },
    render(h) {
      const {formConfig, titleList, currentRule, rules} = this
      const ruleSetting = (name) => {
        return (
          <div
            class="setting"
            onClick={() => this.showRuleSetting(name)}>
            <i class="el-icon-setting"></i>
          </div>
        )
      }
      return h('div', {
        ref: 'sketchpad'
      }, [h('el-form', {
        props: {
          'label-width': this.settings.labelWidth,
          inline: this.settings.inline,
          rules
        }
      }, this.componentList.map((item, index) => h('form-item', {
        ref: 'row' + index,
        props: {
          index
        }
      }, [h('el-form-item', {
        props: {
          prop: item[0].viewName
        },
        attrs: {
          index: index + 1
        },
        class: {
          'row-highlight': this.currentComponentIndex === index,
          row: true
        },
        style: {
          minHeight: '40px'
        }
      }, [
        (<template slot="label">
          <form-item-title
            onInput={(e) => {
              this.$store.commit({
                type: 'updateTitleList',
                index: index,
                title: e
              })
            }}
            value={titleList[index]}
          ></form-item-title>
        </template>),
        ...item.map(ele => h('view-component', {
          // key: Math.random(),
          key: ele.uid,
          props: {
            index: index,
            componentInfo: ele
          }
        })),
        ruleSetting(index)
      ])]))),
      <el-dialog
        class="dialog"
        title="校验规则设置"
        visible={this.dialogVisible}
        {...{on:{'update:visible': () => this.dialogVisible = false}}}>
        <el-button onClick={this.addRule}>添加规则</el-button>
        <el-collapse
          value={this.activeTab}
          onInput={(e) => this.activeTab = e}>
          {currentRule.map((item, index) =>
            <el-collapse-item
              title={`第${index + 1}组`}
              name={index}>
              <el-form-renderer
                labelWidth="100px"
                content={item}
                ref={`form${index}`}
                style="text-align: left">
              </el-form-renderer>
            </el-collapse-item>
          )}
        </el-collapse>
        <div slot="footer" class="dialog-footer">
          <el-button onClick={() => this.dialogVisible = false}>取 消</el-button>
          <el-button type="primary" onClick={this.checkForm}>确 定</el-button>
        </div>
      </el-dialog>])
    },
  }
</script>

<style lang="scss" scoped>
  .row {
    padding-right: 20px;
  }
  .row-highlight {
    box-shadow: 0 0 6px rgb(39, 185, 243);
  }
  .setting {
    position: absolute;
    top: 0;
    right: -18px;
    cursor: pointer;
  }
  .setting:hover {
    color: rgb(185, 185, 185);
  }
</style>
