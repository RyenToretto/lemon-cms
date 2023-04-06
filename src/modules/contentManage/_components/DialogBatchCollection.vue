<!--
@file: DialogBatchCollection.vue
@createBy: koujianfeng
@description: 批量设置合集 弹框
 -->
<template>
  <div
    class="do-dialog-wrapper dialog-batch-collection"
    :class="{ 'do-disabled': $attrs.disabled }"
  >
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogBatchCollection">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogBatchCollection"
      class="do-dialog-box"
      width="420px"
      :visible.sync="dialogBatchCollection"
      :append-to-body="appendToBody"
      @closed="resetBatchCollection"
    >
      <template slot="title">
        <span class="el-dialog__title"> {{ isMultilpe ? '批量' : '' }}设置合集 </span>
      </template>

      <section v-loading="requesting" class="do-dialog-content-box">
        <el-form
          ref="refFormBatchCollection"
          :model="formBatchCollection"
          :label-width="formBatchCollection.labelWidth"
          :rules="formBatchCollection.rules"
          @submit.native.prevent
        >
          <el-alert v-if="isMultilpe" :closable="false" type="warning">
            <span>为勾选的「{{ selectedLines.length }}」个{{ oName }}批量设置合集</span>
          </el-alert>
          <info-paper v-else :lines="selectedLines"></info-paper>

          <el-form-item label="合集" class="mt-gap-s" prop="collectionId">
            <collection-select
              ref="refCollectionSelect"
              v-model="formBatchCollection.collectionId"
              :user-id="formBatchCollection.userId"
              :is-limit="true"
              :in-dialog="true"
            ></collection-select>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelBatchCollection">取 消</el-button>

          <el-button
            type="primary"
            :loading="confirming"
            size="small"
            @click="confirmBatchCollection"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestBatchCollection } from '../_api'
import InfoPaper from './InfoPaper.vue'

export default {
  name: 'DialogBatchCollection',
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
      dialogBatchCollection: false,
      formBatchCollection: {
        labelWidth: '90px',

        ids: '',
        userId: '',
        collectionId: '',

        rules: {
          collectionId: [{ required: true, message: '请选择合集' }]
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
    confirmBatchCollection() {
      this.$refs.refFormBatchCollection &&
        this.$refs.refFormBatchCollection.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            requestBatchCollection(this.formBatchCollection)
              .then(() => {
                this.$message({
                  message: `${this.isMultilpe ? '批量' : ''}设置合集成功`,
                  type: 'success'
                })
                this.dialogBatchCollection = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    resetBatchCollection() {
      this.formBatchCollection.ids = []
      this.formBatchCollection.userId = ''
      this.formBatchCollection.collectionId = ''

      this.$nextTick(() => {
        this.$refs.refFormBatchCollection && this.$refs.refFormBatchCollection.clearValidate()
        this.$emit('close')
      })
    },
    cancelBatchCollection() {
      this.dialogBatchCollection = false
    },
    reRender() {
      this.formBatchCollection.ids = (this.selectedLines || []).map((line) => line.id)

      const existInfo = this.selectedLines.find((e) => e.userId)
      if (existInfo) {
        this.formBatchCollection.userId = existInfo.userId || ''
      }
      if (this.isMultilpe) {
        this.formBatchCollection.collectionId = ''
      } else {
        const lineInfo = (this.selectedLines && this.selectedLines[0]) || {}
        this.formBatchCollection.collectionId = lineInfo.collectionId
          ? lineInfo.collectionId + ''
          : ''
      }
    },
    showDialogBatchCollection() {
      if (this.$attrs.disabled) {
        return
      }
      this.dialogBatchCollection = true
      this.$emit('open')
      this.requesting = true
      this.reRender()
      this.$nextTick(async () => {
        if (this.$refs.refCollectionSelect) {
          await this.$refs.refCollectionSelect.getOptions(this.formBatchCollection.userId, true)
        }
        this.requesting = false
      })
    }
  }
}
</script>
