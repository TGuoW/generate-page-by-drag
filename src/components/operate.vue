<script>

export default {
  data () {
    const formValue = {...this.$store.state.settings}
    formValue.labelWidth = parseInt(formValue.labelWidth).toString()
    return {
      dialogVisible: false,
      formValue,
      rules: {
        formName: [
          {min: 1, required: true, message: '请输入', trigger: 'blur'}
        ],
        labelWidth: [
          {min: 1, required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    mode () {
      return this.$store.state.mode
    },
    btnDisabled () {
      return !(this.mode === 'move')
    }
  },
  methods: {
    addFormItem () {
      this.$store.commit('addFormItem')
    },
    deleteComponent () {
      if (this.mode === 'delete') {
        this.$store.commit({
          type: 'changeMode',
          mode: 'move'
        })
      } else {
        this.$store.commit({
          type: 'changeMode',
          mode: 'delete'
        })
      }
    },
    clearForm () {
      this.$store.commit('clearForm')
    },
    showConfig () {
      this.dialogVisible = true
    },
    checkForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.commit({
            type: 'updateSettings',
            formName: this.formValue.formName,
            labelWidth: this.formValue.labelWidth + 'px',
            inline: this.formValue.inline
          })
          this.dialogVisible = false
        } else {
          return false;
        }
      })
    }
  },
  render () {
    const { deleteComponent, clearForm, showConfig, checkForm } = this
    const { formValue, rules, btnDisabled } = this
    const createButton = (type, disabled, content, onClick) => (
      <el-button
        class="btn"
        type={type}
        size="small"
        disabled={disabled}
        onClick={onClick}>
        {content}
      </el-button>
    )
    return (
      <div class="main1">
        {createButton('danger', btnDisabled && this.mode !== 'delete', this.mode === 'delete' ? '取消' : '删除', deleteComponent)}
        {createButton('danger', btnDisabled, '清空', clearForm)}
        {createButton('primary', btnDisabled, '全局配置', showConfig)}
        <el-dialog
          class="dialog"
          title="全局配置"
          visible={this.dialogVisible}
          {...{on:{'update:visible': () => this.dialogVisible = false}}}>
          <el-form
            onInput={() => {}}
            rules={rules}
            ref="ruleForm"
            labelWidth="140px"
            {...{props:{model: formValue}}}>
            <el-form-item
              label="表单对象名称"
              prop="formName">
              <el-input
                value={formValue.formName}
                onInput={(e) => formValue.formName = e}>
              </el-input>
            </el-form-item>
            <el-form-item
              label="标题宽度"
              prop="labelWidth">
              <el-input
                value={formValue.labelWidth}
                onInput={(e) => formValue.labelWidth = e}>
                <template slot="append">px</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button onClick={() => this.dialogVisible = false}>取 消</el-button>
            <el-button type="primary" onClick={checkForm}>确 定</el-button>
          </div>
        </el-dialog>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  .main1 {
    height: 40px;
    margin-bottom: 12px;
  }
  .dialog {

  }
  .btn {
    float: right;
    margin-left: 10px;
  }
</style>
