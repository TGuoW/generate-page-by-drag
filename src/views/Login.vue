<template>
  <div class="home">
    <el-form class="form">
      <el-form-item>
        <el-input
          value="admin"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          value="123456"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          @click="login"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgb(16, 39, 87);
  }
  .form {
    width: 400px;
    height: 200px;
    background: #fff;
    transform: translateY(-160px);
    border-radius: 6px;
    box-shadow: 0 0 6px rgb(170, 170, 170);
    padding: 24px;
  }
</style>

