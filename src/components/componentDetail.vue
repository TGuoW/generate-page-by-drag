<script>
import config from '@/assets/config/index'
import editText from './editText'
import deepClone from '@/assets/js/deepClone'
export default {
  components: {
    editText
  },
  data () {
    return {
      config: {},
      formValue: {},
      isFromVuex: true,
      isShowTree: true,
      currentComponentIndex: 0
    }
  },
  computed: {
    // currentComponentIndex () {
    //   return this.$store.state.currentComponentIndex
    // },
    currentComponent () {
      return this.$store.state.currentComponent
    }
  },
  watch: {
    currentComponent: {
      handler (val) {
        if (val.name) {
          if (this.currentComponentIndex !== this.$store.state.currentComponentIndex || this.formValue.tid !== val.tid) {
            this.isShowTree = false
            this.$nextTick(() => {
              this.isShowTree = true
            })
          }
          this.isFromVuex = true
          this.config = config[val.name].baseConfig
          this.formValue = Object.assign({}, deepClone(config[val.name].formValue), deepClone(val))
          this.dealChildComponentArr()
        }
      }
    },
    formValue: {
      handler () {
        if (this.isFromVuex) {
          this.isFromVuex = false
          return
        }
        this.dealChildComponentArr()
        this.$store.commit({
          type: 'updateCurrentComponent',
          componentInfo: {...this.currentComponent, ...this.formValue},
          // index: 0
        })
      },
      deep: true
    }
  },
  methods: {
    dealChildComponentArr () {
      if (this.formValue.componentNumber && this.formValue.componentNumber > 0) {
        let source = this.formValue.childComponentArr ? 'childComponentArr' : 'data'
        this.formValue[source].length = Number(this.formValue.componentNumber)
        for (let i = 0; i < this.formValue[source].length; i++) {
          if (this.formValue[source][i] === undefined) {
            this.formValue[source][i] = {...this.formValue[source][0]}
            this.formValue[source][i].label = '备选项' + (i + 1)
            if (this.formValue[source][0].key !== undefined) {
              this.formValue[source][i].key = i
            }
            if (this.formValue[source][0].disabled !== undefined) {
              this.formValue[source][i].disabled = false
            }
            if (this.formValue[source][0].value !== undefined) {
              this.formValue[source][i].value = 'test' + (i + 1)
            }
          }
        }
        for (let j = 0; j < this.config.options.length; j++) {
          let name = this.config.options[j].name
          if (name === 'childComponentArr') {
            this.config.options[j].inputArr = [...this.formValue.childComponentArr]
          } else if (name === 'data') {
            this.config.options[j].inputArr = [...this.formValue.data]
          }
        }
      }
    },
    sync (prop, value, ele, index) {
      if (index !== undefined) {
        let arr = this.formValue[prop]
        arr[index][ele] = value
        this.$set(this.formValue, prop, arr)
      } else {
        if (prop === 'is-range') {
          this.$set(this.formValue, 'value', value ? [new Date(), new Date()] : '')
        }
        this.$set(this.formValue, prop, value)
      }
    },
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <span>
            <editText
              key={data.value}
              value={data}
              on-input={(e) => this.changeTreeNode(node, data, e)}
              height={19}
              >
            </editText>
          </span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
            <el-button size="mini" type="text" on-click={ () => this.removeTreeNode(node, data) }>Delete</el-button>
          </span>
        </span>
      )
    },
    removeTreeNode (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.value === data.value)
      children.splice(index, 1)
    },
    changeTreeNode (node, data, e) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.value === data.value)
      children.splice(index, 1, e)
    }
  },
  render (h) {
    const currentComponent = () => {
      return [
        h('div', this.currentComponent.name ? this.currentComponent.desc + ' ' + this.currentComponent.name : '')
      ]
    }
    return (
      <div>
        <div class="title">
          当前组件
        </div>
        <div class="currentComponent">
          {currentComponent()}
        </div>
        <div class="title">
          配置
        </div>
        <el-form label-width="100px" label-position="right">
          { this.config.options ? this.config.options.map(item => {
              let node
              if (item.type === 'select') {
                node = (
                  <el-form-item label={item.desc}>
                    <el-select on-input={(e) => this.sync(item.name, e)} value={this.formValue[item.name]} placeholder="请选择">
                      { item.selectArr.map(ele => (
                          <el-option
                            key={ele.value}
                            label={ele.label}
                            value={ele.value}>
                          </el-option>
                        ))
                      }
                    </el-select>
                  </el-form-item>
                )
              }
              if (item.type === 'switch') {
                node = (
                  <el-form-item label={item.desc}>
                    <el-switch
                      on-input={(e) => this.sync(item.name, e)}
                      value={this.formValue[item.name]}
                      active-text="是"
                      inactive-text="否">>
                    </el-switch>
                  </el-form-item>
                )
              }
              if (item.type === 'input') {
                node = (
                  <el-form-item label={item.desc}>
                    <el-input
                      on-input={(e) => this.sync(item.name, item.nativeType === 'Number' ? Number(e) : e)}
                      value={this.formValue[item.name]}/>
                  </el-form-item>
                )
              }
              if (item.type === 'color') {
                node = (
                  <el-form-item label={item.desc}>
                    <el-color-picker
                      on-input={(e) => this.sync(item.name, e)}
                      value={this.formValue[item.name]} />
                  </el-form-item>
                )
              }
              if (item.type === 'tree') {
                node = this.isShowTree ? (
                  <el-form-item label={item.desc}>
                    <el-tree
                      data={this.formValue[item.name]}
                      node-key="id"
                      default-expand-all
                      expand-on-click-node={false}
                      render-content={this.renderContent}>
                    </el-tree>
                  </el-form-item>
                ) : ''
              }
              if (item.type === 'inputArr') {
                node = (
                  <el-form-item label={item.desc}>
                    { item.inputArr.map((ele, index) => (
                      <el-form inline={true} class="inline-form">
                        {Object.keys(ele).map(child =>
                          child !== 'disabled' ?
                          (<el-input
                            class="input"
                            on-input={(e) => this.sync(item.name, e, child, index)}
                            value={this.formValue[item.name][index][child]} />
                          ) :
                          (<el-switch
                            on-input={(e) => this.sync(item.name, e, child, index)}
                            value={this.formValue[item.name][index][child]} />
                        ))}
                      </el-form>
                    ))}
                  </el-form-item>
                )
              }
              return node
            }) : ''
          }
        </el-form>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    // width: 100%;
    padding-left: 20px;
  }
  .currentComponent {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
  }
  .inline-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input {
      min-width: 80px;
      max-width: 120px;
    }
  }
</style>