<!--
@file: DialogEditSubCate.vue
@createBy: koujianfeng
@description: 添加/编辑 二级分类 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-edit-sub-cate">
    <el-tooltip :disabled="true" content="" placement="sub">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogEditSubCate">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogEditSubCate"
      class="do-dialog-box"
      width="520px"
      :visible.sync="dialogEditSubCate"
      :append-to-body="appendToBody"
      @closed="resetEditSubCate"
    >
      <template slot="title">
        <span class="el-dialog__title">
          {{ isEdit ? '编辑二级分类' : '添加二级分类' }}
          <span v-if="isEdit" class="tips">(ID: {{ subCateLine.id }})</span>
        </span>
      </template>

      <section v-loading="requesting" class="do-dialog-content-box">
        <el-form
          ref="refFormEditSubCate"
          :model="formEditSubCate"
          :label-width="formEditSubCate.labelWidth"
          :rules="formEditSubCate.rules"
          @submit.native.prevent
        >
          <el-form-item label="分类名称" prop="name">
            <el-input
              v-model.trim="formEditSubCate.name"
              type="text"
              autocomplete="off"
              placeholder="请输入分类名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="缩略图" prop="preUrl">
            <single-file-upload
              v-model="formEditSubCate.preUrl"
              :is-photo="true"
              accept=".gif,.svg,.jpg,.jpeg,.png,.bmp,.webp"
              :uploading="uploadingPreUrl"
              @change="uploadClientUserPreUrl"
              @remove="formEditSubCate.preUrl = ''"
            ></single-file-upload>
          </el-form-item>

          <el-form-item label="一级分类" prop="categoryId">
            <top-cate-select
              ref="refTopCateSelect"
              v-model="formEditSubCate.categoryId"
              :in-dialog="true"
            ></top-cate-select>
          </el-form-item>

          <el-form-item label="客户端展示" prop="visible">
            <el-switch
              v-model="formEditSubCate.visible"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="formEditSubCate.sort" :min="1"></el-input-number>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelEditSubCate">取 消</el-button>

          <el-button type="primary" :loading="confirming" size="small" @click="confirmEditSubCate"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAddSubCate, requestUpdateSubCate } from '../_api'
import { requestImageUpload } from '@/api'

export default {
  name: 'DialogEditSubCate',
  components: {},
  props: {
    subCateLine: {
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
      dialogEditSubCate: false,
      uploadingPreUrl: false,
      formEditSubCate: {
        labelWidth: '130px',

        id: '',
        name: '',
        preUrl: '',
        categoryId: '',
        visible: true,
        sort: undefined,

        rules: {
          name: [{ required: true, message: '请输入分类名称' }],
          preUrl: [{ required: true, message: '请上传缩略图' }],
          categoryId: [{ required: true, message: '请选择一级分类' }],
          visible: [{ required: true, message: '请配置客户端展示' }],
          sort: [{ required: true, message: '请输入序号' }]
        }
      },
      requesting: false,
      confirming: false
    }
  },
  computed: {
    isEdit() {
      return this.subCateLine && !!this.subCateLine.id
    }
  },
  methods: {
    confirmEditSubCate() {
      this.$refs.refFormEditSubCate &&
        this.$refs.refFormEditSubCate.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            let response
            if (this.isEdit) {
              response = requestUpdateSubCate(this.formEditSubCate)
            } else {
              response = requestAddSubCate(this.formEditSubCate)
            }
            response
              .then(() => {
                this.$message({
                  message: `${this.isEdit ? '编辑' : '添加'}二级分类成功`,
                  type: 'success'
                })
                this.dialogEditSubCate = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    uploadClientUserPreUrl(e) {
      this.uploadingPreUrl = true
      const formData = new FormData()
      formData.append('file', e?.raw)

      requestImageUpload(formData)
        .then((res) => {
          this.formEditSubCate.preUrl = (res && res.url) || ''
          this.$refs.refFormEditSubCate.validateField('preUrl')
          this.$message.success('上传成功！')
        })
        .catch(() => {
          this.formEditSubCate.preUrl = ''
          this.$message.warning('上传失败，请重试')
        })
        .finally(() => {
          this.uploadingPreUrl = false
        })
    },

    resetEditSubCate() {
      this.formEditSubCate.id = ''
      this.formEditSubCate.name = ''
      this.formEditSubCate.preUrl = ''
      this.formEditSubCate.categoryId = ''
      this.formEditSubCate.visible = true
      this.formEditSubCate.sort = undefined

      this.$nextTick(() => {
        this.$refs.refFormEditSubCate && this.$refs.refFormEditSubCate.clearValidate()
        this.$emit('close')
      })
    },
    cancelEditSubCate() {
      this.dialogEditSubCate = false
    },
    reRender() {
      if (!this.subCateLine || !this.subCateLine.id) {
        return
      }
      this.formEditSubCate.id = this.subCateLine.id
      this.formEditSubCate.name = this.subCateLine.name || ''
      this.formEditSubCate.preUrl = this.subCateLine.preUrl || ''
      this.formEditSubCate.categoryId = this.subCateLine.categoryId
        ? this.subCateLine.categoryId + ''
        : ''
      this.formEditSubCate.visible = [true, 1, 'true'].includes(this.subCateLine.visible)
      this.formEditSubCate.sort = this.subCateLine.sort || undefined
    },
    showDialogEditSubCate() {
      this.dialogEditSubCate = true
      this.$emit('open')
      this.requesting = true
      this.reRender()
      this.$nextTick(async () => {
        if (this.$refs.refTopCateSelect) {
          await this.$refs.refTopCateSelect.getOptions(true)
        }
        this.requesting = false
      })
    }
  }
}
</script>
