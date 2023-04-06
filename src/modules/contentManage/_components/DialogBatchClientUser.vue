<!--
@file: DialogBatchClientUser.vue
@createBy: koujianfeng
@description: 批量设置作者 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-batch-client-user">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogBatchClientUser">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogBatchClientUser"
      class="do-dialog-box"
      width="420px"
      :visible.sync="dialogBatchClientUser"
      :append-to-body="appendToBody"
      @closed="resetBatchClientUser"
    >
      <template slot="title">
        <span class="el-dialog__title"> {{ isMultilpe ? '批量' : '' }}设置作者 </span>
      </template>

      <section v-loading="requesting" class="do-dialog-content-box">
        <el-form
          ref="refFormBatchClientUser"
          :model="formBatchClientUser"
          :label-width="formBatchClientUser.labelWidth"
          :rules="formBatchClientUser.rules"
          @submit.native.prevent
        >
          <el-alert v-if="isMultilpe" :closable="false" type="warning">
            <span>为勾选的「{{ selectedLines.length }}」个{{ oName }}批量设置作者</span>
          </el-alert>
          <info-paper v-else :lines="selectedLines"></info-paper>

          <el-form-item label="作者" class="mt-gap-s" prop="userId">
            <client-user-select
              ref="refClientUserSelect"
              v-model="formBatchClientUser.userId"
              :in-dialog="true"
            ></client-user-select>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelBatchClientUser">取 消</el-button>

          <el-button
            type="primary"
            :loading="confirming"
            size="small"
            @click="confirmBatchClientUser"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestBatchClientUser } from '../_api'
import InfoPaper from './InfoPaper.vue'

export default {
  name: 'DialogBatchClientUser',
  components: {
    InfoPaper
  },
  props: {
    selectedLines: {
      type: Array,
      default() {
        return []
      }
    },
    oName: {
      type: String,
      default() {
        return '内容'
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
      dialogBatchClientUser: false,
      formBatchClientUser: {
        labelWidth: '90px',

        ids: '',
        userId: '',

        rules: {
          userId: [{ required: true, message: '请选择作者' }]
        }
      },
      requesting: false,
      confirming: false
    }
  },
  computed: {
    isMultilpe() {
      return this.selectedLines && this.selectedLines.length > 1
    }
  },
  methods: {
    confirmBatchClientUser() {
      this.$refs.refFormBatchClientUser &&
        this.$refs.refFormBatchClientUser.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            requestBatchClientUser(this.formBatchClientUser)
              .then(() => {
                this.$message({
                  message: `${this.isMultilpe ? '批量' : ''}设置作者成功`,
                  type: 'success'
                })
                this.dialogBatchClientUser = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    resetBatchClientUser() {
      this.formBatchClientUser.ids = []
      this.formBatchClientUser.userId = ''

      this.$nextTick(() => {
        this.$refs.refFormBatchClientUser && this.$refs.refFormBatchClientUser.clearValidate()
        this.$emit('close')
      })
    },
    cancelBatchClientUser() {
      this.dialogBatchClientUser = false
    },
    reRender() {
      this.formBatchClientUser.ids = (this.selectedLines || []).map((line) => line.id)

      const lineInfo = (this.selectedLines && this.selectedLines[0]) || {}
      this.formBatchClientUser.userId = this.isMultilpe
        ? ''
        : lineInfo.userId
        ? lineInfo.userId + ''
        : ''
    },
    showDialogBatchClientUser() {
      this.dialogBatchClientUser = true
      this.$emit('open')
      this.requesting = true
      this.reRender()
      this.$nextTick(async () => {
        if (this.$refs.refClientUserSelect) {
          await this.$refs.refClientUserSelect.getOptions(true)
        }
        this.requesting = false
      })
    }
  }
}
</script>
