<script>
export default {
  data () {
    return {
      dialogVisible: false,
      formValue: {
        formName: 'formValue',
        labelWidth: '80',
        inline: false
      },
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
              type: 'updateConfig',
              formName: this.formValue.formName,
              labelWidth: this.formValue.labelWidth + 'px',
              inline: this.formValue.inline
            })
            this.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    }
  },
  render () {
    const { addFormItem, deleteComponent, clearForm, showConfig, checkForm } = this
    const { formValue, rules } = this

    return (
      <div class="main1">
        <el-button
          class="btn"
          type="primary"
          icon="el-icon-plus"
          onClick={addFormItem}>
        </el-button>
        <el-button
          class="btn"
          type="danger"
          onClick={deleteComponent}>
          {this.mode === 'delete' ? '取消' : '删除'}
        </el-button>
        <el-button
          class="btn"
          type="danger"
          onClick={clearForm}>
          清空
        </el-button>
        <el-button
          class="btn"
          type="primary"
          onClick={showConfig}>
          全局配置
        </el-button>
        <el-dialog
          class="dialog"
          title="全局配置"
          visible={this.dialogVisible}
          {...{on:{'update:visible': () => this.dialogVisible = false}}}>
          <el-form
            onInput={console.log}
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
