<template>
  <el-scrollbar class="list">
    <el-menu
      class="main__el-menu"
    >
      <el-submenu
        v-for="(menu) in menuConfig"
        :key="menu.name"
        :index="menu.name"
      >
        <span slot="title">
          {{ menu.desc }}
        </span>
        <el-menu-item
          v-for="(item) in menu.children"
          :key="item.name"
          :index="item.name"
        >
          <move-component
            slot="title"
            :info="item"
          />
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import menuConfig from '@/assets/config/menu'
import moveComponent from '@/components/moveComponent'
export default {
  components: {
    moveComponent
  },
  data () {
    return {
      menuConfig,
      pos: [0, 0],
      isMove: false
    }
  }
}
</script>


<style lang="scss" scoped>
  .main__el-menu {
    text-align: left;
    /deep/ * {
      user-select: none;
    }
  }
  .list {
    // overflow: hidden;
    height: 100%;
    background: #fff;
  }
  .list /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>

