<script>
export default {
  methods: {
    addFormItem () {
      this.$store.commit('addFormItem')
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
  }
</style>
