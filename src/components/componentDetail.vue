<script>
import config from '@/assets/config/index'
export default {
  data () {
    return {
      config: {},
      formValue: {}
    }
  },
  computed: {
    currentComponent () {
      let getCurrentComponent = this.$store.state.currentComponent
      return getCurrentComponent
    }
  },
  mounted () {
    this.config = config['Button'].baseConfig
    this.formValue = config['Button'].formValue
  },
  methods: {
    sync (prop, value) {
      this.formValue[prop] = value
    }
  },
  watch: {
    formValue: {
      handler (val) {
        console.log({...this.currentComponent, ...this.formValue})
        this.$store.commit('updateCurrentComponent', {...this.currentComponent, ...this.formValue})
      },
      deep: true
    }
  },
  render (h) {
    const currentComponent = () => {
      return [
        h('el-button', {
          props: this.formValue
        }, this.formValue.innerText),
        h('div', {
          style: {
            lineHeight: '40px'
          }
        }, this.currentComponent.desc + ' ' + this.currentComponent.name)
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
        <el-form label-width="80px" label-position="right">
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
                      on-input={(e) => this.sync(item.name, e)}
                      value={this.formValue[item.name]}/>
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
</style>