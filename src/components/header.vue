<template>
  <el-header class="header">
    <div>
      <img
        src="../../public/logo.svg"
        alt=""
      >
    </div>
    <div class="header__p">
      <el-button
        class="btn"
        type="primary"
        @click="showList"
      >
        模板列表
      </el-button>
      <theme-picker />
      <div>HELLO, USERNAME</div>
    </div>
  </el-header>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import CTransition from '@/components/cTransition'
export default {
  components: {
    ThemePicker
  },
  data () {
    return {
      instance: null
    }
  },
  computed: {
    templateList () {
      return this.$store.state.templateList
    }
  },
  methods: {
    selectMenu (name) {
      this.$store.commit({
        type: 'checkoutTemplate',
        name
      })
    },
    showList () {
      if (this.instance && this.instance.isShow) {
        this.instance.close()
        this.instance = null
      } else {
        this.instance = CTransition({
          needBg: true,
          target: '.main-container',
          position: ['right', 'top'],
          mainStyle: {
            height: '100%',
            width: '240px',
            background: '#545c64'
          },
          render: <el-menu
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    on-select={this.selectMenu}>
                    {this.templateList.map(({name}) =>
                      <el-menu-item index={String(name)} key={name}>
                        <span slot="title">{name}</span>
                      </el-menu-item>
                    )}
                  </el-menu>
        })
      }
    }
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
      align-items: center;
    }
    .header__p>* {
      margin-right: 20px;
    }
  }
</style>

