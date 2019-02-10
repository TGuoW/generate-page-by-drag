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
  },
  mounted () {
  },
  methods: {
    deepClone (obj) {
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = this.deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
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

