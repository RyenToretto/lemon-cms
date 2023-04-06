<!--
@file: DialogBatchCate.vue
@createBy: koujianfeng
@description: 批量设置分类 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-batch-cate">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogBatchCate">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogBatchCate"
      class="do-dialog-box"
      width="420px"
      :visible.sync="dialogBatchCate"
      :append-to-body="appendToBody"
      @closed="resetBatchCate"
    >
      <template slot="title">
        <span class="el-dialog__title"> {{ isMultilpe ? '批量' : '' }}设置分类 </span>
      </template>

      <section v-loading="requesting" class="do-dialog-content-box">
        <el-form
          ref="refFormBatchCate"
          :model="formBatchCate"
          :label-width="formBatchCate.labelWidth"
          :rules="formBatchCate.rules"
          @submit.native.prevent
        >
          <el-alert v-if="isMultilpe" :closable="false" type="warning">
            <span>为勾选的「{{ selectedLines.length }}」个{{ oName }}批量设置分类</span>
          </el-alert>
          <info-paper v-else :lines="selectedLines"></info-paper>

          <el-form-item label="一级分类" class="mt-gap-s" prop="categoryId">
            <top-cate-select
              ref="refTopCateSelect"
              v-model="formBatchCate.categoryId"
              :in-dialog="true"
            ></top-cate-select>
          </el-form-item>

          <el-form-item label="二级分类" class="mt-gap-s" prop="subcategoryIds">
            <sub-cate-select
              ref="refSubCateSelect"
              v-model="formBatchCate.subcategoryIds"
              :category-id="formBatchCate.categoryId"
              :donot-clear="requesting"
              multiple
              :collapse-tags="true"
              :in-dialog="true"
              @clear="formBatchCate.subcategoryIds = []"
            ></sub-cate-select>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelBatchCate">取 消</el-button>

          <el-button type="primary" :loading="confirming" size="small" @click="confirmBatchCate"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestBatchCate } from '../_api'
import InfoPaper from './InfoPaper.vue'

export default {
  name: 'DialogBatchCate',
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
      dialogBatchCate: false,
      formBatchCate: {
        labelWidth: '90px',

        ids: '',
        categoryId: '',
        subcategoryIds: [],

        rules: {
          categoryId: [{ required: true, message: '请选择一级分类' }],
          subcategoryIds: [{ required: true, message: '请选择二级分类' }]
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
    confirmBatchCate() {
      this.$refs.refFormBatchCate &&
        this.$refs.refFormBatchCate.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            requestBatchCate(this.formBatchCate)
              .then(() => {
                this.$message({
                  message: `${this.isMultilpe ? '批量' : ''}设置分类成功`,
                  type: 'success'
                })
                this.dialogBatchCate = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    resetBatchCate() {
      this.formBatchCate.ids = []
      this.formBatchCate.categoryId = ''
      this.formBatchCate.subcategoryIds = []

      this.$nextTick(() => {
        this.$refs.refFormBatchCate && this.$refs.refFormBatchCate.clearValidate()
        this.$emit('close')
      })
    },
    cancelBatchCate() {
      this.dialogBatchCate = false
    },
    reRender() {
      this.formBatchCate.ids = (this.selectedLines || []).map((line) => line.id)

      const lineInfo = (this.selectedLines && this.selectedLines[0]) || {}
      this.formBatchCate.categoryId = this.isMultilpe
        ? ''
        : lineInfo.categoryId
        ? lineInfo.categoryId + ''
        : ''

      const subCateList = lineInfo.subcategories || []
      this.formBatchCate.subcategoryIds = this.isMultilpe
        ? []
        : subCateList.length
        ? subCateList.map((e) => e.id + '')
        : []
    },
    showDialogBatchCate() {
      this.dialogBatchCate = true
      this.$emit('open')
      this.requesting = true
      this.reRender()
      this.$nextTick(async () => {
        if (this.$refs.refTopCateSelect) {
          await this.$refs.refTopCateSelect.getOptions(true)
        }
        if (this.$refs.refSubCateSelect) {
          await this.$refs.refSubCateSelect.getOptions(this.formBatchCate.categoryId, true)
        }
        this.requesting = false
      })
    }
  }
}
</script>
