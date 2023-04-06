<!--
@file: DialogEditCollection.vue
@createBy: koujianfeng
@description: 添加/编辑 合集 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-edit-collection" :class="{ 'do-disabled': $attrs.disabled }">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogEditCollection">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogEditCollection"
      class="do-dialog-box"
      width="520px"
      :visible.sync="dialogEditCollection"
      :append-to-body="appendToBody"
      @closed="resetEditCollection"
    >
      <template slot="title">
        <span class="el-dialog__title">
          {{ isEdit ? '编辑合集' : '添加合集' }}
          <span v-if="isEdit" class="tips">(ID: {{ collectionLine.id }})</span>
        </span>
      </template>

      <section v-loading="requesting" class="do-dialog-content-box">
        <el-form
          ref="refFormEditCollection"
          :model="formEditCollection"
          :label-width="formEditCollection.labelWidth"
          :rules="formEditCollection.rules"
          @submit.native.prevent
        >
          <el-form-item label="合集名称" prop="name">
            <el-input
              v-model.trim="formEditCollection.name"
              type="text"
              autocomplete="off"
              placeholder="请输入合集名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="作者" prop="userId">
            <client-user-select
              ref="refClientUserSelect"
              v-model="formEditCollection.userId"
              :disabled="cannotSetAuthor"
              :in-dialog="true"
            ></client-user-select>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="formEditCollection.sort" :min="1"></el-input-number>
          </el-form-item>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelEditCollection">取 消</el-button>

          <el-button
            type="primary"
            :loading="confirming"
            size="small"
            @click="confirmEditCollection"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAddCollection, requestUpdateCollection } from '../_api'

export default {
  name: 'DialogEditCollection',
  components: {},
  props: {
    collectionLine: {
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
      dialogEditCollection: false,
      formEditCollection: {
        labelWidth: '130px',

        id: '',
        name: '',
        userId: '',
        sort: undefined,

        rules: {
          name: [{ required: true, message: '请输入合集名称' }],
          userId: [{ required: true, message: '请选择作者' }],
          sort: [{ required: true, message: '请输入序号' }]
        }
      },
      cannotSetAuthor: false,
      requesting: false,
      confirming: false
    }
  },
  computed: {
    isEdit() {
      return this.collectionLine && !!this.collectionLine.id
    }
  },
  methods: {
    confirmEditCollection() {
      this.$refs.refFormEditCollection &&
        this.$refs.refFormEditCollection.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            let response
            if (this.isEdit) {
              response = requestUpdateCollection(this.formEditCollection)
            } else {
              response = requestAddCollection(this.formEditCollection)
            }
            response
              .then(() => {
                this.$message({
                  message: `${this.isEdit ? '编辑' : '添加'}合集成功`,
                  type: 'success'
                })
                this.dialogEditCollection = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },

    resetEditCollection() {
      this.formEditCollection.id = ''
      this.formEditCollection.name = ''
      this.formEditCollection.userId = ''
      this.cannotSetAuthor = false
      this.formEditCollection.sort = undefined

      this.$nextTick(() => {
        this.$refs.refFormEditCollection && this.$refs.refFormEditCollection.clearValidate()
        this.$emit('close')
      })
    },
    cancelEditCollection() {
      this.dialogEditCollection = false
    },
    reRender() {
      if (!this.collectionLine || !this.collectionLine.id) {
        return
      }
      this.formEditCollection.id = this.collectionLine.id
      this.formEditCollection.name = this.collectionLine.name || ''
      this.formEditCollection.userId = this.collectionLine.userId
        ? this.collectionLine.userId + ''
        : ''
      this.formEditCollection.sort = this.collectionLine.sort || undefined
    },
    showDialogEditCollection() {
      if (this.$attrs.disabled) {
        return
      }
      this.dialogEditCollection = true
      this.$emit('open')
      this.requesting = true
      this.reRender()
      this.$nextTick(async () => {
        if (this.formEditCollection.userId) {
          this.cannotSetAuthor = true
        }
        if (this.$refs.refClientUserSelect) {
          await this.$refs.refClientUserSelect.getOptions(true)
        }
        this.requesting = false
      })
    }
  }
}
</script>
