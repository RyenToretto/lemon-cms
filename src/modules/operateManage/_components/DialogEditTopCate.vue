<!--
@file: DialogEditTopCate.vue
@createBy: koujianfeng
@description: 添加/编辑 一级分类 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-edit-top-cate">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogEditTopCate">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogEditTopCate"
      class="do-dialog-box"
      width="520px"
      :visible.sync="dialogEditTopCate"
      :append-to-body="appendToBody"
      @closed="resetEditTopCate"
    >
      <template slot="title">
        <span class="el-dialog__title">
          {{ isEdit ? '编辑一级分类' : '添加一级分类' }}
          <span v-if="isEdit" class="tips">(ID: {{ topCateLine.id }})</span>
        </span>
      </template>

      <section class="do-dialog-content-box">
        <el-form
          ref="refFormEditTopCate"
          :model="formEditTopCate"
          :label-width="formEditTopCate.labelWidth"
          :rules="formEditTopCate.rules"
          @submit.native.prevent
        >
          <el-form-item label="分类名称" prop="name">
            <el-input
              v-model.trim="formEditTopCate.name"
              type="text"
              autocomplete="off"
              placeholder="请输入分类名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="客户端展示" prop="visible">
            <el-switch
              v-model="formEditTopCate.visible"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="formEditTopCate.sort" :min="1"></el-input-number>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelEditTopCate">取 消</el-button>

          <el-button type="primary" :loading="confirming" size="small" @click="confirmEditTopCate"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAddTopCate, requestUpdateTopCate } from '../_api'

export default {
  name: 'DialogEditTopCate',
  components: {},
  props: {
    topCateLine: {
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
      dialogEditTopCate: false,
      formEditTopCate: {
        labelWidth: '130px',

        id: '',
        name: '',
        visible: true,
        sort: undefined,

        rules: {
          name: [{ required: true, message: '请输入分类名称' }],
          visible: [{ required: true, message: '请配置客户端展示' }],
          sort: [{ required: true, message: '请输入序号' }]
        }
      },
      confirming: false
    }
  },
  computed: {
    isEdit() {
      return this.topCateLine && !!this.topCateLine.id
    }
  },
  methods: {
    confirmEditTopCate() {
      this.$refs.refFormEditTopCate &&
        this.$refs.refFormEditTopCate.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            let response
            if (this.isEdit) {
              response = requestUpdateTopCate(this.formEditTopCate)
            } else {
              response = requestAddTopCate(this.formEditTopCate)
            }
            response
              .then(() => {
                this.$message({
                  message: `${this.isEdit ? '编辑' : '添加'}一级分类成功`,
                  type: 'success'
                })
                this.dialogEditTopCate = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },

    resetEditTopCate() {
      this.formEditTopCate.id = ''
      this.formEditTopCate.name = ''
      this.formEditTopCate.visible = true
      this.formEditTopCate.sort = undefined

      this.$nextTick(() => {
        this.$refs.refFormEditTopCate && this.$refs.refFormEditTopCate.clearValidate()
        this.$emit('close')
      })
    },
    cancelEditTopCate() {
      this.dialogEditTopCate = false
    },
    reRender() {
      if (!this.topCateLine || !this.topCateLine.id) {
        return
      }
      this.formEditTopCate.id = this.topCateLine.id
      this.formEditTopCate.name = this.topCateLine.name || ''
      this.formEditTopCate.visible = [true, 1, 'true'].includes(this.topCateLine.visible)
      this.formEditTopCate.sort = this.topCateLine.sort || undefined
    },
    showDialogEditTopCate() {
      this.dialogEditTopCate = true
      this.$emit('open')
      this.reRender()
    }
  }
}
</script>
