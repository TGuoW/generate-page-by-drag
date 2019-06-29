<template>
  <el-header class="header">
    <div>
      <img
        src="../../public/logo.svg"
        alt=""
      >
    </div>
    <div class="header__p">
      <theme-picker style="line-height: 76px" />
      <div>HELLO, USERNAME</div>
    </div>
  </el-header>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
export default {
  components: {
    ThemePicker
  }
}
</script>

<style lang="scss" scoped>
  .header {
    height: 60px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header__p {
      color: #888;
      display: flex;
      align-content: center;
    }
    .header__p>* {
      height: 60px;
      line-height: 60px;
    }
    // .header__p /deep/ .el-color-picker {
    //   height: 30px;
    // }
  }
</style>

