<script>
import config from '@/assets/config/index'
export default {
  data () {
    return {
      config: {},
      formValue: {},
      isFromVuex: false
    }
  },
  computed: {
    currentComponent () {
      return this.$store.state.currentComponent
    }
  },
  watch: {
    currentComponent: {
      handler (val) {
        if (val.name) {
          this.isFromVuex = true
          this.config = config[val.name].baseConfig
          this.formValue = Object.assign({}, config[val.name].formValue, val)
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
        this.formValue.childComponentArr.length = Number(this.formValue.componentNumber)
        for (let i = 0; i < this.formValue.childComponentArr.length; i++) {
          if (this.formValue.childComponentArr[i] === undefined) {
            this.formValue.childComponentArr[i] = {...this.formValue.childComponentArr[0]}
            this.formValue.childComponentArr[i].label = '备选项' + (i + 1)
            if (this.formValue.childComponentArr[0].disabled !== undefined) {
              this.formValue.childComponentArr[i].disabled = false
            }
            if (this.formValue.childComponentArr[0].value !== undefined) {
              this.formValue.childComponentArr[i].value = 'test' + (i + 1)
            }
          }
        }
        for (let j = 0; j < this.config.options.length; j++) {
          let name = this.config.options[j].name
          if (name === 'childComponentArr') {
            this.config.options[j].inputArr = [...this.formValue.childComponentArr]
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
        this.$set(this.formValue, prop, value)
      }

    }
  },
  render (h) {
    const currentComponent = () => {
      return [
        // h(this.currentComponent.componentName, {
        //   on: {
        //     input: (e) => this.sync('value', e)
        //   },
        //   props: this.formValue,
        //   attrs: this.formValue,
        //   style: {
        //     width: '180px'
        //   }
        // }),
        // }, [this.currentComponent.childComponentName
        //   ? h(this.currentComponent.childComponentName, {
        //     props: {...this.formValue, ...this.currentComponent.childComponentArr[0]}
        //   })
        //   : this.formValue.innerText]),
        h('div', this.currentComponent.desc + ' ' + this.currentComponent.name)
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