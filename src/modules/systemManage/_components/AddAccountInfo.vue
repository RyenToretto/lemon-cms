<!--
@file: AddAccountInfo.vue
@createBy: sunjiahao
@description: 账号管理 添加账号
 -->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="`${mode === 'create' ? '添加' : '修改'}账号`"
    width="480px"
    @closed="resetPanel"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="formRules">
      <el-form-item prop="username" label="账号名">
        <el-input
          v-model="form.username"
          style="width: 230px"
          :disabled="mode === 'edit'"
          placeholder="请填写用户名(邮箱前缀)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="realName" label="所属人员姓名">
        <el-input v-model="form.realName" style="width: 230px" placeholder="请填写姓名"> </el-input>
      </el-form-item>
      <el-form-item prop="role" label="角色">
        <el-select v-model="form.role" placeholder="请选择角色" style="width: 230px">
          <el-option :value="'admin'" label="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限" prop="permission">
        <template v-for="(eachKey, index) in form.permission">
          <el-tag
            v-if="$MAPS.permission.labelMap[eachKey]"
            :key="index"
            style="margin: 3px"
            size="mini"
            type="primary"
            disable-transitions
            >{{ eachKey | labelPermission }}</el-tag
          >
        </template>

        <dialog-edit-auth v-model="form.permission" :append-to-body="true">
          <el-button size="mini" plain type="success">添加权限</el-button>
        </dialog-edit-auth>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel">取 消</el-button>
      <el-button size="small" type="primary" :loading="submitting" @click="handleOk"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { labelPermission } from '../_filters'
import { addAccountInfo, updateAccountInfo } from '../_api'

import DialogEditAuth from './DialogEditAuth.vue'

const DEFAULT_FORM_DATA = {
  id: null,
  username: '',
  realName: '',
  role: '',
  permission: []
}
export default {
  name: 'AddAccountInfo',
  components: {
    DialogEditAuth
  },
  filters: {
    labelPermission
  },
  props: {},
  data() {
    return {
      dialogVisible: false,
      submitting: false,
      form: {
        id: null,
        username: '',
        realName: '',
        role: '',
        permission: []
      },
      formRules: {
        username: [{ required: true, message: '请填写账号名' }],
        role: [{ required: true, message: '请选择角色' }]
      }
    }
  },
  computed: {
    mode() {
      return this.form.id ? 'edit' : 'create'
    }
  },
  watch: {
    // visible: {
    //   handler (newVal) {
    //     this.dialogVisible = newVal
    //   },
    //   immediate: true
    // },
    // dialogVisible (newVal) {
    //   this.$emit('update:visible', newVal)
    // }
  },

  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // 重置
    resetPanel() {
      Object.keys(this.form).forEach((v) => {
        this.form[v] = DEFAULT_FORM_DATA[v]
      })
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 点击取消按钮
    handleCancel() {
      this.dialogVisible = false
    },
    // 点击确认按钮
    handleOk() {
      this.$refs.form.validate((result) => {
        if (result) {
          this.submitting = true
          let response
          if (this.mode === 'edit') {
            response = updateAccountInfo(this.form)
          } else {
            response = addAccountInfo(this.form)
          }
          response
            .then((res) => {
              this.$emit('ok', Boolean(this.mode === 'create'))
              this.$message({
                type: 'success',
                message: `${this.mode === 'create' ? '添加' : '修改'}成功`
              })
              this.dialogVisible = false
            })
            .finally(() => {
              this.submitting = false
            })
        }
      })
    },
    fillData(data) {
      if (!data) {
        return
      }
      Object.keys(this.form).forEach((v) => {
        if (v in data && data[v] !== undefined) {
          switch (v) {
            case 'permission': {
              if (data[v] && data[v].length) {
                this.form[v] = data[v].map((item) => item.key)
              }
              break
            }
            default:
              this.form[v] = data[v]
          }
        }
      })
    },
    show(data) {
      this.fillData(data)
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped></style>
