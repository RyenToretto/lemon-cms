<!--
@file: DialogBatchRecommend.vue
@createBy: koujianfeng
@description: 批量精选 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-batch-recommend">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogBatchRecommend">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogBatchRecommend"
      class="do-dialog-box"
      width="420px"
      :visible.sync="dialogBatchRecommend"
      :append-to-body="appendToBody"
      @closed="resetBatchRecommend"
    >
      <template slot="title">
        <span class="el-dialog__title"> {{ isMultilpe ? '批量' : '' }}设置精选 </span>
      </template>

      <section class="do-dialog-content-box">
        <el-form
          ref="refFormBatchRecommend"
          :model="formBatchRecommend"
          :label-width="formBatchRecommend.labelWidth"
          :rules="formBatchRecommend.rules"
          @submit.native.prevent
        >
          <el-alert v-if="isMultilpe" :closable="false" type="warning">
            <span>为勾选的「{{ selectedLines.length }}」个{{ oName }}批量设置精选</span>
          </el-alert>
          <info-paper v-else :lines="selectedLines"></info-paper>

          <el-form-item class="pl-gap-xl" prop="isRecommend">
            <el-radio-group v-model="formBatchRecommend.isRecommend" size="small">
              <el-radio key="1" :label="true">精选</el-radio>
              <el-radio key="0" :label="false">取消精选</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelBatchRecommend">取 消</el-button>

          <el-button
            type="primary"
            :loading="confirming"
            size="small"
            @click="confirmBatchRecommend"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestBatchRecommend } from '../_api'
import InfoPaper from './InfoPaper.vue'

export default {
  name: 'DialogBatchRecommend',
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
      dialogBatchRecommend: false,
      formBatchRecommend: {
        labelWidth: '0',

        ids: '',
        isRecommend: undefined,

        rules: {
          isRecommend: [{ required: true, message: '请选择 精选/取消精选' }]
        }
      },
      confirming: false
    }
  },
  computed: {
    isMultilpe() {
      return this.selectedLines && this.selectedLines.length > 1
    }
  },
  methods: {
    confirmBatchRecommend() {
      this.$refs.refFormBatchRecommend &&
        this.$refs.refFormBatchRecommend.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            requestBatchRecommend(this.formBatchRecommend)
              .then(() => {
                this.$message({
                  message: `${this.isMultilpe ? '批量' : ''}设置精选成功`,
                  type: 'success'
                })
                this.dialogBatchRecommend = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    resetBatchRecommend() {
      this.formBatchRecommend.ids = []
      this.formBatchRecommend.isRecommend = undefined

      this.$nextTick(() => {
        this.$refs.refFormBatchRecommend && this.$refs.refFormBatchRecommend.clearValidate()
        this.$emit('close')
      })
    },
    cancelBatchRecommend() {
      this.dialogBatchRecommend = false
    },
    reRender() {
      this.formBatchRecommend.ids = (this.selectedLines || []).map((line) => line.id)

      const lineInfo = (this.selectedLines && this.selectedLines[0]) || {}
      this.formBatchRecommend.isRecommend = this.isMultilpe
        ? undefined
        : [1, 'true', true].includes(lineInfo.isRecommend)
    },
    showDialogBatchRecommend() {
      this.dialogBatchRecommend = true
      this.$emit('open')
      this.reRender()
    }
  }
}
</script>
