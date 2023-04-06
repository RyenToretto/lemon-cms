<!--
@file: DoUpload.vue
@createBy: koujianfeng
@description: 二次封装 el-upload
 -->
<template>
  <section
    class="do-upload-box"
    :class="{
      'only-btn': $attrs['only-btn'],
      'hide-btn': $attrs['hide-btn'],
      disabled: $attrs.disabled
    }"
  >
    <el-upload
      ref="doElUpload"
      class="do-el-upload"
      :data="{
        ...payload
      }"
      :action="$attrs['action']"
      v-bind="$attrs"
      :headers="headers"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :limit="$attrs.limit || 1"
    >
      <slot name="trigger">
        <el-button size="small" type="primary">点击上传</el-button>
      </slot>
    </el-upload>
  </section>
</template>

<script>
export default {
  name: 'DoUpload',
  components: {},
  inheritAttrs: true,
  props: {
    mustPhoto: {
      type: Boolean,
      default() {
        return false
      }
    },
    tips: {
      type: String
    },
    editable: {
      type: Boolean,
      default: true
    },
    payload: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    const token = localStorage.getItem('token')
    return {
      headers: {
        Authorization: token
      }
    }
  },
  methods: {
    // files, fileList
    handleExceed() {
      this.$message.warning(
        `最多上传 ${this.$attrs.limit || 1} ${this.mustPhoto ? '张图片' : '个文件'}`
      )
    },
    // files, fileList
    handleError(err) {
      this.$message({
        message: `上传异常, CODE:${err.status}`,
        type: 'error'
      })
      /* this.$utils.analysis([
        'upload',
        'error',
        `${file.name}`
      ]) */
    },
    handleRemove(file, fileList) {
      this.$emit('update', { file, fileList })
    },
    handleSuccess(res, file, fileList) {
      if (+res.ret === 200 && res.result) {
        this.$emit('update', { data: res.result, file, fileList })
        this.$nextTick(() => {
          this.$message.closeAll()
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        })
      } else {
        this.$message({
          message: `上传失败${res.extra ? '：' + res.extra : ''}`,
          type: 'error'
        })
        /* this.$utils.analysis([
          'upload',
          'failed',
          `${res.ret}:${file.name}`
        ]) */
        this.$emit('update', { fail: true })
      }
    },
    clearFiles() {
      this.$refs.doElUpload.clearFiles()
    }
  }
}
</script>

<style lang="less" scoped>
@uploading-tips-size: 40px;
.do-upload-box {
  width: 100%;
  /deep/.do-el-upload {
    width: 100%;
    .el-upload {
      box-sizing: border-box;
      .el-upload-dragger {
        box-sizing: border-box;
        width: 146px;
        height: 146px;
        &::after {
          content: '拖曳文件上传';
          display: block;
          box-sizing: border-box;
          margin-top: 16px;
          width: 100%;
          color: #ccc;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
        > .el-button {
          box-sizing: border-box;
          margin-top: -16px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
    }
  }
  /deep/.image-error-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f7fa;
    color: #909399;
    font-size: 30px;
  }
  /deep/.el-upload-list {
    > .el-upload-list__item {
      display: flex;
      align-items: center;
      > img {
        display: none;
      }
      > .el-upload-list__item-name {
        display: none;
      }
      .el-icon-close-tip {
        display: none;
      }
    }
    &.el-upload-list--text {
      > .el-upload-list__item {
        &.is-success {
          display: none;
        }
        &.is-uploading {
          min-width: calc(148px - @uploading-tips-size);
          height: 20px;
          .el-upload-list__item-name {
            display: none;
          }
          .el-icon-close {
            display: block;
            top: 2px;
            right: 0;
            z-index: 1;
          }
          .el-progress-bar {
            width: calc(77% - 18px);
          }
          .el-progress.el-progress--line {
            top: 50%;
            transform: translateY(-50%);
            > .el-progress__text {
              top: 0;
              right: 18px;
            }
          }
          &:hover {
            background-color: transparent;
            .el-progress.el-progress--line {
              > .el-progress__text {
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
  &.hide-btn {
    width: auto !important;
    /deep/.do-el-upload {
      .el-upload,
      .el-upload--picture-card {
        display: none;
      }
    }
  }
  &.disabled {
    /deep/.do-el-upload {
      .el-upload {
        .el-upload-dragger {
          border-color: #d9d9d9;
          cursor: not-allowed;
          &::after {
            display: none;
          }
          > .el-button {
            display: none;
          }
        }
      }
    }
  }
  &.only-btn {
    width: auto !important;
    line-height: 1;
    /deep/.do-el-upload {
      .el-upload {
        .el-upload-dragger {
          display: block;
          width: auto;
          height: auto;
          line-height: 1;
          border: 0 none;
          &::after {
            display: none;
          }
          > .el-button {
            margin: 0;
            border: 0 none;
            position: static;
            transform: none;
          }
        }
      }
      .el-upload-list {
        &.el-upload-list--text {
          > .el-upload-list__item {
            &.is-uploading {
              min-width: calc(78px - @uploading-tips-size);
              .el-progress-bar {
                width: calc(57% - 18px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
