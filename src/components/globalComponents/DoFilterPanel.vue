<!--
@file: DoFilterPanel.vue
@createBy: koujianfeng
 -->
<template>
  <section
    ref="refFilterPannel"
    class="do-filter-panel"
    :class="{
      active: !isFold,
      'can-fold': canFold
    }"
  >
    <div class="search-wrap do-card">
      <div class="bd">
        <div
          ref="refFilterContent"
          class="do-filter-content"
          :style="{
            height: `${(canFold && isFold ? line : lineCount) * eachLineHeight - 18}px`,
            minHeight: `${minLines * eachLineHeight - 18}px`
          }"
        >
          <slot></slot>

          <div v-if="!hideSearch" class="ctrl tr">
            <el-button type="primary" @click="emitSearch(true)">搜索</el-button>

            <slot name="ctl"></slot>
          </div>
        </div>

        <a v-if="canFold" class="more-filter-option" href="javascript:" @click="toggleFilterFold">
          <i v-if="isFold" class="el-icon-arrow-down"></i>
          <i v-else class="el-icon-arrow-up"></i>
          <span>{{ isFold ? '更多' : '收起' }}筛选</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DoFilterPanel',
  props: {
    line: {
      type: [String, Number],
      default() {
        return 3
      }
    },
    eachLineHeight: {
      type: [String, Number],
      default() {
        return 60
      }
    },
    minLines: {
      type: [String, Number],
      default() {
        return 1
      }
    },
    hideSearch: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      lineCount: 1,
      isFold: true,
      timer: null
    }
  },
  computed: {
    canFold() {
      return this.lineCount > this.line
    }
  },
  mounted() {
    this.computedContent()
    window.addEventListener('resize', this.computedContent)
  },
  methods: {
    emitSearch(toFirstPage) {
      this.$emit('search', toFirstPage)
    },
    toggleFilterFold() {
      this.isFold = !this.isFold
    },
    computedContent() {
      window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        this.$nextTick(() => {
          if (!this.$refs.refFilterContent) {
            return
          }
          this.lineCount = +(
            this.$refs.refFilterContent.children[0].clientHeight / this.eachLineHeight
          ).toFixed()
        })
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) url('/src/assets/css/common/index.less');

@ctrl-width: 100px;

.do-filter-panel {
  box-sizing: border-box;
  width: 100%;
  > .search-wrap {
    > .bd {
      position: relative;
      .more-filter-option {
        box-sizing: border-box;
        padding: 2px 6px;
        border-bottom-color: transparent;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        font-size: 12px;
        color: #afafaf;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: #ededff;
        > i {
          margin-right: 6px;
        }
      }
      /deep/.do-filter-content {
        box-sizing: border-box;
        overflow: hidden;
        transition: height 300ms linear;
        .el-form {
          padding-right: @ctrl-width;
          margin-top: -10px;
          margin-bottom: -10px;
        }
        > .ctrl {
          .el-button.is-plain:hover,
          .el-button.is-plain:active,
          .el-button.is-plain:focus {
            background: #fff;
            border: 1px solid #dcdfe6;
            color: #606266;
          }
        }
      }
    }
  }
}
</style>
