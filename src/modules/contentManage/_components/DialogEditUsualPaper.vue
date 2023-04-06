<!--
@file: DialogEditUsualPaper.vue
@createBy: koujianfeng
@description: 添加/编辑 内容 弹框
 -->
<template>
  <div class="do-dialog-wrapper dialog-edit-usual-paper">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl" @click="showDialogEditUsualPaper">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogEditUsualPaper"
      class="do-dialog-box"
      width="800px"
      :visible.sync="dialogEditUsualPaper"
      :append-to-body="appendToBody"
      @closed="resetEditUsualPaper"
    >
      <template slot="title">
        <span class="el-dialog__title">
          {{ isEdit ? '编辑内容' : '添加内容' }}
          <span v-if="isEdit" class="tips">(ID: {{ usualPaperLine.id }})</span>
        </span>
      </template>

      <section v-loading="requesting" class="do-dialog-content-box">
        <el-form
          ref="refFormEditUsualPaper"
          :model="formEditUsualPaper"
          :label-width="formEditUsualPaper.labelWidth"
          :rules="formEditUsualPaper.rules"
          @submit.native.prevent
        >
          <el-form-item v-if="isEdit" label="图片" prop="imageUrl">
            <single-file-upload
              v-model="formEditUsualPaper.imageUrl"
              :is-photo="true"
              accept=".gif,.svg,.jpg,.jpeg,.png,.bmp,.webp"
              :uploading="uploadingImageUrl"
              @change="uploadUsualPaper"
              @remove="formEditUsualPaper.imageUrl = ''"
            ></single-file-upload>
          </el-form-item>

          <el-form-item v-else label="图片" prop="imageUrls">
            <do-file-upload
              v-if="dialogEditUsualPaper"
              ref="refUsualPaperUpload"
              v-model="formEditUsualPaper.imageUrls"
              multiple
              drag
              photo-drag
              :must-photo="true"
              :limit="999"
              @update="$refs.refFormEditUsualPaper.validateField('imageUrls')"
            ></do-file-upload>
          </el-form-item>

          <div class="do-form-section">
            <div class="do-form-left">
              <el-form-item label="来源" prop="source">
                <el-radio-group v-model="formEditUsualPaper.source" size="small" :disabled="isEdit">
                  <el-radio
                    v-for="(label, value) in $MAPS.paper.source.labelMap"
                    :key="+value"
                    :label="+value"
                    >{{ label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>

              <el-form-item label="会员" prop="isVip">
                <el-switch
                  v-model="formEditUsualPaper.isVip"
                  :active-value="true"
                  :inactive-value="false"
                >
                </el-switch>
              </el-form-item>

              <el-form-item label="广告" prop="isAd">
                <el-switch
                  v-model="formEditUsualPaper.isAd"
                  :active-value="true"
                  :inactive-value="false"
                >
                </el-switch>
              </el-form-item>

              <el-form-item label="精选" prop="isRecommend">
                <el-switch
                  v-model="formEditUsualPaper.isRecommend"
                  :active-value="true"
                  :inactive-value="false"
                >
                </el-switch>
              </el-form-item>
            </div>

            <div class="do-form-right">
              <el-form-item label="作者" prop="userId">
                <client-user-select
                  ref="refClientUserSelect"
                  v-model="formEditUsualPaper.userId"
                  :disabled="cannotSetAuthor"
                  :in-dialog="true"
                ></client-user-select>
              </el-form-item>

              <el-form-item label="合集" prop="collectionId">
                <collection-select
                  ref="refCollectionSelect"
                  v-model="formEditUsualPaper.collectionId"
                  :user-id="formEditUsualPaper.userId"
                  :donot-clear="requesting"
                  :is-limit="true"
                  :in-dialog="true"
                  @clear="formEditUsualPaper.collectionId = ''"
                ></collection-select>
              </el-form-item>

              <el-form-item label="一级分类" prop="categoryId">
                <top-cate-select
                  ref="refTopCateSelect"
                  v-model="formEditUsualPaper.categoryId"
                  :in-dialog="true"
                ></top-cate-select>
              </el-form-item>

              <el-form-item label="二级分类" prop="subcategoryIds">
                <sub-cate-select
                  ref="refSubCateSelect"
                  v-model="formEditUsualPaper.subcategoryIds"
                  :category-id="formEditUsualPaper.categoryId"
                  :donot-clear="requesting"
                  placeholder="不限"
                  multiple
                  :collapse-tags="true"
                  :in-dialog="true"
                  @clear="formEditUsualPaper.subcategoryIds = []"
                ></sub-cate-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </section>

      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelEditUsualPaper">取 消</el-button>

          <el-button
            type="primary"
            :loading="confirming"
            size="small"
            @click="confirmEditUsualPaper"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAddUsualPaper, requestUpdateUsualPaper } from '../_api'
import { requestImageUpload } from '@/api'

export default {
  name: 'DialogEditUsualPaper',
  components: {},
  props: {
    usualPaperLine: {
      type: Object,
      default() {
        return null
      }
    },
    paperType: {
      type: String,
      default() {
        return ''
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
      dialogEditUsualPaper: false,
      uploadingImageUrl: false,
      formEditUsualPaper: {
        labelWidth: '130px',

        id: '',
        type: '',
        imageUrl: '',
        imageUrls: [],
        source: undefined,
        userId: '',
        collectionId: '',
        categoryId: '',
        subcategoryIds: [],
        isVip: false,
        isAd: false,
        isRecommend: false,

        rules: {
          imageUrl: [{ required: true, message: '请上传头像' }],
          imageUrls: [{ required: true, message: '请上传图片' }],
          source: [{ required: true, message: '请选择来源' }]
        }
      },
      cannotSetAuthor: false,
      requesting: false,
      confirming: false
    }
  },
  computed: {
    isEdit() {
      return this.usualPaperLine && !!this.usualPaperLine.id
    }
  },
  watch: {
    'formEditUsualPaper.isVip': function (newValue) {
      if (!this.formEditUsualPaper.isVip && this.formEditUsualPaper.isAd) {
        this.formEditUsualPaper.isAd = false
      }
    },
    'formEditUsualPaper.isAd': function (newValue) {
      if (this.formEditUsualPaper.isAd && !this.formEditUsualPaper.isVip) {
        this.formEditUsualPaper.isVip = true
      }
    }
  },
  methods: {
    confirmEditUsualPaper() {
      this.$refs.refFormEditUsualPaper &&
        this.$refs.refFormEditUsualPaper.validate((isOk) => {
          if (isOk) {
            if (this.confirming) {
              return
            }
            this.confirming = true
            let response
            if (this.isEdit) {
              response = requestUpdateUsualPaper(this.formEditUsualPaper)
            } else {
              response = requestAddUsualPaper(this.formEditUsualPaper)
            }
            response
              .then(() => {
                this.$message({
                  message: `${this.isEdit ? '编辑' : '添加'}内容成功`,
                  type: 'success'
                })
                this.dialogEditUsualPaper = false
                this.$emit('ok')
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    uploadUsualPaper(e) {
      this.uploadingImageUrl = true
      const formData = new FormData()
      formData.append('file', e?.raw)

      requestImageUpload(formData)
        .then((res) => {
          this.formEditUsualPaper.imageUrl = (res && res.url) || ''
          this.$refs.refFormEditUsualPaper.validateField('imageUrl')
          this.$message.success('上传成功！')
        })
        .catch(() => {
          this.formEditUsualPaper.imageUrl = ''
          this.$message.warning('上传失败，请重试')
        })
        .finally(() => {
          this.uploadingImageUrl = false
        })
    },
    resetEditUsualPaper() {
      this.formEditUsualPaper.id = ''
      this.formEditUsualPaper.type = ''
      this.formEditUsualPaper.imageUrl = ''
      this.formEditUsualPaper.imageUrls = []
      this.formEditUsualPaper.source = undefined
      this.formEditUsualPaper.userId = ''
      this.cannotSetAuthor = false
      this.formEditUsualPaper.collectionId = ''
      this.formEditUsualPaper.categoryId = ''
      this.formEditUsualPaper.subcategoryIds = []
      this.formEditUsualPaper.isVip = false
      this.formEditUsualPaper.isAd = false
      this.formEditUsualPaper.isRecommend = false

      this.$nextTick(() => {
        this.$refs.refFormEditUsualPaper && this.$refs.refFormEditUsualPaper.clearValidate()
        this.$emit('close')
      })
    },
    cancelEditUsualPaper() {
      this.dialogEditUsualPaper = false
    },
    reRender() {
      this.formEditUsualPaper.type = this.paperType
      if (!this.usualPaperLine || !this.usualPaperLine.id) {
        return
      }
      this.formEditUsualPaper.id = this.usualPaperLine.id
      this.formEditUsualPaper.imageUrl = this.usualPaperLine.imageUrl || ''
      this.formEditUsualPaper.imageUrls = ''
      this.formEditUsualPaper.source =
        this.usualPaperLine.source || this.usualPaperLine.source === 0
          ? this.usualPaperLine.source
          : undefined
      this.formEditUsualPaper.userId = this.usualPaperLine.userId
        ? this.usualPaperLine.userId + ''
        : ''
      this.formEditUsualPaper.collectionId = this.usualPaperLine.collectionId
        ? this.usualPaperLine.collectionId + ''
        : ''
      this.formEditUsualPaper.categoryId = this.usualPaperLine.categoryId
        ? this.usualPaperLine.categoryId + ''
        : ''
      this.formEditUsualPaper.subcategoryIds =
        this.usualPaperLine.subcategories && this.usualPaperLine.subcategories.length
          ? this.usualPaperLine.subcategories.map((e) => e.id + '')
          : []
      this.formEditUsualPaper.isVip = [true, 1, 'true'].includes(this.usualPaperLine.isVip)
      this.formEditUsualPaper.isAd = [true, 1, 'true'].includes(this.usualPaperLine.isAd)
      this.formEditUsualPaper.isRecommend = [true, 1, 'true'].includes(
        this.usualPaperLine.isRecommend
      )
    },
    showDialogEditUsualPaper() {
      this.dialogEditUsualPaper = true
      this.$emit('open')
      this.requesting = true
      this.reRender()
      this.$nextTick(async () => {
        if (this.formEditUsualPaper.userId) {
          this.cannotSetAuthor = true
        }
        if (this.$refs.refCollectionSelect) {
          await this.$refs.refCollectionSelect.getOptions(this.formEditUsualPaper.userId, true)
        }
        if (this.$refs.refClientUserSelect) {
          await this.$refs.refClientUserSelect.getOptions(true)
        }
        if (this.$refs.refTopCateSelect) {
          await this.$refs.refTopCateSelect.getOptions(true)
        }
        if (this.$refs.refSubCateSelect) {
          await this.$refs.refSubCateSelect.getOptions(this.formEditUsualPaper.categoryId, true)
        }
        this.requesting = false
      })
    }
  }
}
</script>
