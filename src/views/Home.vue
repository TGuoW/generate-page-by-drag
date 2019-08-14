<template>
  <div style="height: 100%">
    <div class="container">
      <el-header>
        <c-header class="header" />
      </el-header>
      <el-container class="main-container">
        <el-aside
          :style="{width: mode === 'edit' ? '0' : '250px'}"
          class="stage__aside"
        >
          <aside-menu />
        </el-aside>
        <el-main
          class="main__stage"
          :style="mode === 'edit' ? {margin: 0} : {}"
        >
          <div class="stage__sketchpad">
            <operate />
            <sketchpad />
          </div>
          <div class="stage__code">
            <code-view />
          </div>
        </el-main>
        <div
          class="stage__detail"
          :style="{width: mode === 'edit' ? '0' : '400px'}"
        >
          <component-detail />
        </div>
      </el-container>
    </div>
  </div>
</template>

<script>
import header from '@/components/header'
import asideMenu from '@/components/asideMenu'
import operate from '@/components/operate'
import sketchpad from '@/components/sketchpad'
import codeView from '@/components/codeView'
import componentDetail from '@/components/componentDetail'
export default {
  components: {
    asideMenu,
    'c-header': header,
    operate,
    sketchpad,
    codeView,
    componentDetail
  },
  computed: {
    mode () {
      return this.$store.state.mode
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/index.scss";
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .main-container {
    padding: 10px;
    background: #e7e7e7;
    position: relative;
    .stage__aside {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: auto;
      margin: 10px;
      transition: width 300ms;
    }
    .main__stage {
      margin: 0 410px 0 260px;
      text-align: left;
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
      transition: margin 300ms;
      .stage__sketchpad {
        padding: 10px;
        min-width: 360px;
        background: #fff;
        flex: 1;
        overflow-y: scroll;
      }
      .stage__code {
        min-width: 360px;
        margin-left: 4px;
        background: #23241f;
        flex: 1;
        overflow-y: scroll;
      }
    }
    .stage__detail {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      width: 400px;
      overflow-y: scroll;
      margin: 10px;
      transition: width 300ms;
      opacity: 1;
      text-align: left;
    }
  }
  .width-0 {
    width: 0;
    margin-left: 0;
    opacity: 0;
  }
</style>
