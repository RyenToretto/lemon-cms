<!--
@file: ChangePwd.vue
@createBy: sunjiahao
@description:修改密码
 -->
<template>
  <div class="change-pwd">
    <div v-loading="submitting" class="do-card" style="width: 600px; margin: 0 auto">
      <div class="hd bordered">
        <h3 class="title">修改密码</h3>
      </div>
      <div class="bd">
        <el-form ref="form" label-width="120px" :model="form" :rules="formRules">
          <el-form-item prop="originalPassword" label="原密码">
            <el-input v-model="form.originalPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码">
            <el-input v-model="form.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="confirm" label="确认新密码">
            <el-input v-model="form.confirm" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="ft">
        <div class="tc">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changePwd } from '@/api'

export default {
  name: 'ChangePwd',

  data() {
    return {
      submitting: false,
      form: {
        originalPassword: '',
        newPassword: '',
        confirm: ''
      },
      formRules: {
        originalPassword: [{ required: true, message: '请填写原密码' }],
        newPassword: [
          { required: true, message: '请填写新密码' },
          { validator: this.$utils.validator.password }
        ],
        confirm: [{ required: true, message: '请确认新密码' }, { validator: this.confirmPWD }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((result) => {
        if (!result) {
          return
        }
        this.submitting = true
        changePwd(this.form)
          .then((res) => {
            this.$message({
              type: 'success',
              message: '密码修改成功'
            })
            this.$store.dispatch('doLogout').then(() => {
              location.href = '/admin/login'
            })
          })
          .finally((res) => {
            this.submitting = false
          })
      })
    },
    confirmPWD(rule, value, cb) {
      if (value !== this.form.newPassword) {
        cb(new Error('两次输入密码不一致'))
      }
      cb()
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '/src/assets/css/common/index.less';

.change-pwd {
  box-sizing: border-box;
  padding-top: @gap-l;
}
</style>
