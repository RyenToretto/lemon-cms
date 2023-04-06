<template>
  <el-dialog
    v-if="!removeNow"
    ref="refDialogDoPreview"
    :visible.sync="showPreview"
    class="dialog-do-preview"
    :class="{ single: previewImages && previewImages.length <= 1 }"
    :append-to-body="appendToBody"
    @closed="resetDoPreview"
  >
    <div class="do-preview">
      <div class="do-preview-prev-btn" @click="toPrevPhoto"><i class="el-icon-back"></i></div>
      <div class="do-preview-board">
        <!-- <img :src="previewImages[viewIndex]" alt="" />-->
        <el-image :src="previewImages[viewIndex]" fit="contain" />
      </div>
      <div class="do-preview-next-btn" @click="toNextPhoto"><i class="el-icon-right"></i></div>
    </div>

    <div class="do-preview-footer">
      <div class="do-preview-footer-content">
        <div class="do-preview-gallery">
          <ul ref="doPreviewNav" class="do-preview-nav">
            <template v-for="(each, index) in previewImages">
              <li
                :key="index"
                class="do-preview-each"
                :class="{ active: viewIndex === index }"
                @click="viewIndex = index"
              >
                <a href="javascript:" target="_self">
                  <!-- <img :src="each" alt="" />-->
                  <el-image :src="each" fit="contain"></el-image>
                </a>
              </li>
            </template>
          </ul>
        </div>

        <!-- <div class="do-preview-btn">
          <el-button type="primary"
                     :loading="requesting"
                     @click="cancelDoPreview"
                     size="small">关 闭</el-button>
        </div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false,
      removeNow: false,
      appendToBody: true,
      requesting: false,
      previewImages: [],
      viewIndex: 0
    }
  },
  watch: {
    viewIndex: {
      handler(newIndex) {
        if (this.$refs.doPreviewNav) {
          const curEle = this.$refs.doPreviewNav.querySelector(
            `.do-preview-each:nth-child(${newIndex + 1})`
          )
          curEle &&
            curEle.scrollIntoView({
              behavior: 'smooth'
            })
        }
      },
      immediate: true
    }
  },
  methods: {
    resetDoPreview() {
      this.previewImages = []
      this.$nextTick(() => {
        this.removeNow = true
      })
    },
    toPrevPhoto() {
      this.viewIndex--
      if (this.viewIndex < 0) {
        this.viewIndex = this.previewImages.length - 1
      }
    },
    toNextPhoto() {
      this.viewIndex++
      if (this.viewIndex >= this.previewImages.length) {
        this.viewIndex = 0
      }
    },
    cancelDoPreview() {
      this.showPreview = false
    }
  }
}
</script>

<style lang="less">
@do-preview-single-bottom: 30px;
@do-preview-header-height: 50px;
@do-preview-footer-height: 100px;
@do-preview-gap: 5px;

.dialog-do-preview {
  .el-dialog {
    width: 90vw;
    overflow: hidden;
    background-color: #0e0e0e;
    .el-dialog__header {
      box-sizing: border-box;
      padding: 0 15px;
      width: 100%;
      height: @do-preview-header-height;
      min-height: @do-preview-header-height;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-dialog__title {
      }
      .el-dialog__headerbtn {
        position: static;
        font-size: 24px;
        &:hover {
          color: #fff;
          .el-icon {
            color: #fff;
          }
        }
      }
    }
    .el-dialog__body {
      box-sizing: border-box;
      padding: 0 @do-preview-gap @do-preview-gap @do-preview-gap;
      width: 100%;
      .do-preview {
        box-sizing: border-box;
        padding: 0 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .do-preview-board {
          box-sizing: border-box;
          overflow: hidden;
          > .el-image,
          > img {
            display: block;
            height: calc(
              100vh - 30vh - @do-preview-header-height - @do-preview-footer-height - @do-preview-gap
            );
            min-height: 200px;
            background-color: hsl(0, 0%, 90%);
            -webkit-user-drag: none;
            img {
              -webkit-user-drag: none;
            }
          }
        }
        .do-preview-prev-btn,
        .do-preview-next-btn {
          box-sizing: border-box;
          width: 42px;
          height: 42px;
          font-size: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
        .do-preview-prev-btn {
          left: 0;
        }
        .do-preview-next-btn {
          right: 0;
        }
      }
      .do-preview-footer {
        padding: @do-preview-gap 0 0;
        box-sizing: border-box;
        width: 100%;
        height: @do-preview-footer-height;
        .do-preview-footer-content {
          box-sizing: border-box;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .do-preview-gallery {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            overflow: hidden;
            overflow-x: auto;
            &::-webkit-scrollbar {
              width: 7px;
              height: 8px;
            }
            &::-webkit-scrollbar-track {
              background-color: rgba(255, 255, 255, 1);
            }
            &::-webkit-scrollbar-thumb {
              background-color: rgba(40, 40, 40, 0.3);
              border-radius: 2px;
              box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
              &::-webkit-scrollbar-thumb:hover {
                background-color: rgba(40, 40, 40, 0.1);
              }
            }
            .do-preview-nav {
              list-style: none;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .do-preview-each {
                list-style: none;
                box-sizing: border-box;
                min-width: 46px;
                padding: 5px;
                transition: transform 300ms linear;
                > a {
                  box-sizing: border-box;
                  height: 76px;
                  border: 2px solid #f0f0f0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  -webkit-user-drag: none;
                  > .el-image,
                  > img {
                    display: block;
                    height: 100%;
                    background-color: hsl(0, 0%, 90%);
                    -webkit-user-drag: none;
                    img {
                      -webkit-user-drag: none;
                    }
                  }
                }
                &.active {
                  > a {
                    border-color: #a90707;
                  }
                }
                &:hover {
                  transform: translateY(-5px);
                }
              }
            }
          }
          .do-preview-btn {
            box-sizing: border-box;
            padding: 0 @do-preview-gap;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  &.single {
    .el-dialog__body {
      .do-preview {
        padding-bottom: @do-preview-single-bottom;
        .do-preview-board {
          > img {
            height: calc(
              100vh - 30vh - @do-preview-header-height - @do-preview-single-bottom - @do-preview-gap
            );
          }
        }
        .do-preview-prev-btn,
        .do-preview-next-btn {
          display: none;
        }
      }
      .do-preview-footer {
        display: none;
      }
    }
  }
}
</style>
