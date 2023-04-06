<!--
@file: DialogEditClientUser.vue
@createBy: koujianfeng
@description: 添加/编辑 用户 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-edit-client-user">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogEditClientUser">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogEditClientUser"
      class="do-dialog-box"
      width="520px"
      :visible.sync="dialogEditClientUser"
      :append-to-body="appendToBody"
      @closed="resetEditClientUser"
    >
      <template slot="title">
        <span class="el-dialog__title">
          {{ isEdit ? '编辑用户' : '添加用户' }}
          <span v-if="isEdit" class="tips">(ID: {{ clientUserLine.id }})</span>
        </span>
      </template>

      <section class="do-dialog-content-box">
        <el-form
          ref="refFormEditClientUser"
          :model="formEditClientUser"
          :label-width="formEditClientUser.labelWidth"
          :rules="formEditClientUser.rules"
          @submit.native.prevent
        >
          <el-form-item label="用户昵称" prop="nickname">
            <el-input
              v-model.trim="formEditClientUser.nickname"
              type="text"
              autocomplete="off"
              placeholder="请输入用户昵称"
            ></el-input>
          </el-form-item>

          <el-form-item label="头像" prop="avatar">
            <single-file-upload
              v-model="formEditClientUser.avatar"
              :is-photo="true"
              accept=".gif,.svg,.jpg,.jpeg,.png,.bmp,.webp"
              :uploading="uploadingAvatar"
              @change="uploadClientUserAvatar"
              @remove="formEditClientUser.avatar = ''"
            ></single-file-upload>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelEditClientUser">取 消</el-button>

          <el-button
            type="primary"
            :loading="confirming"
            size="small"
            @click="confirmEditClientUser"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAddClientUser, requestUpdateClientUser } from '../_api'
import { requestImageUpload } from '@/api'

export default {
  name: 'DialogEditClientUser',
  components: {},
  props: {
    clientUserLine: {
      type: Object,
      default() {
        return null
      }
    },
    appendToBody: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      dialogEditClientUser: false,
      uploadingAvatar: false,
      formEditClientUser: {
        labelWidth: '130px',

        id: '',
        nickname: '',
        avatar: '',

        rules: {
          nickname: [{ required: true, message: '请输入用户昵称' }],
          avatar: [{ required: true, message: '请上传头像' }]
        }
      },
      confirming: false
    }
  },
  computed: {
    isEdit() {
      return this.clientUserLine && !!this.clientUserLine.id
    }
  },
  methods: {
    confirmEditClientUser() {
      this.$refs.refFormEditClientUser &&
        this.$refs.refFormEditClientUser.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            let response
            if (this.isEdit) {
              response = requestUpdateClientUser(this.formEditClientUser)
            } else {
              response = requestAddClientUser(this.formEditClientUser)
            }
            response
              .then(() => {
                this.$message({
                  message: `${this.isEdit ? '编辑' : '添加'}用户成功`,
                  type: 'success'
                })
                this.dialogEditClientUser = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    uploadClientUserAvatar(e) {
      this.uploadingAvatar = true
      const formData = new FormData()
      formData.append('file', e?.raw)

      requestImageUpload(formData)
        .then((res) => {
          this.formEditClientUser.avatar = (res && res.url) || ''
          this.$refs.refFormEditClientUser.validateField('avatar')
          this.$message.success('上传成功！')
        })
        .catch(() => {
          this.formEditClientUser.avatar = ''
          this.$message.warning('上传失败，请重试')
        })
        .finally(() => {
          this.uploadingAvatar = false
        })
    },

    resetEditClientUser() {
      this.formEditClientUser.id = ''
      this.formEditClientUser.nickname = ''
      this.formEditClientUser.avatar = ''

      this.$nextTick(() => {
        this.$refs.refFormEditClientUser && this.$refs.refFormEditClientUser.clearValidate()
        this.$emit('close')
      })
    },
    cancelEditClientUser() {
      this.dialogEditClientUser = false
    },
    reRender() {
      if (!this.clientUserLine || !this.clientUserLine.id) {
        return
      }
      this.formEditClientUser.id = this.clientUserLine.id
      this.formEditClientUser.nickname = this.clientUserLine.nickname || ''
      this.formEditClientUser.avatar = this.clientUserLine.avatar || ''
    },
    showDialogEditClientUser() {
      this.dialogEditClientUser = true
      this.$emit('open')
      this.reRender()
    }
  }
}
</script>
