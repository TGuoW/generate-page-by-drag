<script>
export default {
  methods: {
    addFormItem () {
      this.$store.commit('addFormItem')
    },
    deleteComponent () {
      // document.body.style.cursor = 'no-drop'
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
          icon="el-icon-delete"
          onClick={this.deleteComponent}>
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
