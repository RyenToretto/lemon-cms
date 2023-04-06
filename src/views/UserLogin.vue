<!--
@file: UserLogin.vue
@createBy: lufei
@description: 登陆
 -->
<template>
  <div class="user-login">
    <div class="login-panel">
      <el-form ref="form" label-width="100px" :model="form" :rules="formRules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder=""
            @keyup.enter="toLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserLogin',
  components: {},
  props: {},

  data() {
    return {
      form: {
        username: this.$store.state.username || '',
        password: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  computed: {
    ...mapState(['token', 'username'])
  },
  methods: {
    toLogin() {
      this.$refs.form.validate((result) => {
        if (result) {
          this.submitting = true
          this.$store
            .dispatch('doLogin', this.form)
            .then(() => {
              window.location.reload() // 重新加载，不走路由了
            })
            .catch(() => {})
            .finally(() => {
              this.submitting = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  & > .el-form {
    width: 500px;
  }
}
</style>
