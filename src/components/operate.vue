<script>
export default {
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
    }
  },
  render () {
    return (
      <div>
        <el-button
          class="btn"
          type="primary"
          icon="el-icon-plus"
          onClick={this.addFormItem}>
        </el-button>
        <el-button
          class="btn"
          type="danger"
          onClick={this.deleteComponent}>
          {this.mode === 'delete' ? '取消' : '删除'}
        </el-button>
        <el-button
          class="btn"
          type="danger"
          onClick={this.clearForm}>
          清空
        </el-button>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  div {
    height: 40px;
    margin-bottom: 12px;
  }
  .btn {
    float: right;
    margin-left: 10px;
  }
</style>
