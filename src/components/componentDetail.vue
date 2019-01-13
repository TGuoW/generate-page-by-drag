<script>
export default {
  data () {
    return {
      t: '',
      type: '',
      typeSelectArr: [
        {value: '', label: '默认按钮'},
        {value: 'primary', label: '主要按钮'},
        {value: 'success', label: '成功按钮'},
        {value: 'info', label: '信息按钮'},
        {value: 'warning', label: '警告按钮'},
        {value: 'danger', label: '危险按钮'},
        {value: 'text', label: '文字按钮'}
      ]
    }
  },
  computed: {
    currentComponent () {
      return {
        name: 'Button',
        desc: '按钮',
        componentName: 'el-button'
      }
    }
  },
  methods: {
    sync (prop, value) {
      console.log(value)
      this[prop] = value
    }
  },
  template:'<div>1</div>'
  // render (h) {
  //   const currentComponent = () => {
  //     return [
  //       h('el-button', {
  //         props: {
  //           type: this.type
  //         }
  //       }, 'test'),
  //       h('div', {
  //         style: {
  //           lineHeight: '40px'
  //         }
  //       }, this.currentComponent.desc + ' ' + this.currentComponent.name)
  //     ]
  //   }
  //   return (
  //     <div>
  //       <div class="title">
  //         当前组件
  //       </div>
  //       <div class="currentComponent">
  //         {currentComponent()}
  //       </div>
  //       <div class="title">
  //         配置
  //       </div>
  //       <el-form label-width="80px" label-position="right">
  //         <el-form-item label="按钮类型">
  //           <el-select on-input={(e) => this.sync('type', e)} value={this.type} placeholder="请选择">
  //             { this.typeSelectArr.map(item =>
  //                 <el-option
  //                   key={item.value}
  //                   label={item.label}
  //                   value={item.value}>
  //                 </el-option>
  //               )
  //             }
  //           </el-select>
  //         </el-form-item>
  //       </el-form>
  //     </div>
  //   )
  // }
}
</script>

<style lang="scss" scoped>
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    width: 100%;
    padding-left: 20px;
  }
  .currentComponent {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
  }
</style>