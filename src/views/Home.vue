<template>
  <div style="height: 100%">
    <!-- <button @click="aaa">
      asdad
    </button> -->
    <div class="container">
      <cTransition :is-show="ss">
        <el-header>
          <c-header class="header" />
        </el-header>
      </cTransition>
      <el-container class="main">
        <el-aside
          :style="{width: mode === 'edit' ? '0' : '240px'}"
          class="stage__aside"
        >
          <aside-menu />
        </el-aside>
        <el-main class="main__stage">
          <div class="stage__sketchpad">
            <operate />
            <sketchpad />
          </div>
          <div class="stage__code">
            <code-view />
          </div>
          <div :class="['stage__detail', mode === 'edit' ? 'width-0' : '']">
            <component-detail />
          </div>
        </el-main>
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
import cTransition from '@/components/cTransition/cTransition'
export default {
  components: {
    cTransition,
    asideMenu,
    'c-header': header,
    operate,
    sketchpad,
    codeView,
    componentDetail
  },
  data () {
    return {
      ss: true
    }
  },
  computed: {
    mode () {
      return this.$store.state.mode
    }
  },
  methods: {
    aaa () {
      this.ss = !this.ss
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

  .main {
    padding: 10px;
    background: #e7e7e7;
    .stage__aside {
      width: 240px;
      transition: all 300ms;
    }
    .main__stage {
      margin-left: 10px;
      text-align: left;
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
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
      .stage__detail {
        background: #fff;
        margin-left: 10px;
        width: 400px;
        overflow-y: scroll;
        transition: all 300ms;
        opacity: 1;
      }
      .width-0 {
        width: 0;
        margin-left: 0;
        opacity: 0;
      }
    }
  }
</style>
