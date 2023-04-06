<!--
@file: TableWrap.vue
@createBy: lufei
@description: 表格容器
 -->
<template>
  <div class="table-wrap do-card">
    <do-table-header v-if="enableDoHeader" :disabled-column-config="disabledColumnConfig">
      <template #batch>
        <slot name="batch"> </slot>
      </template>

      <template #control>
        <slot name="control"> </slot>
      </template>
    </do-table-header>

    <slot name="hd"> </slot>

    <div ref="bd" v-waterMark class="bd">
      <slot></slot>
    </div>
    <slot ref="ft" name="ft"></slot>
  </div>
</template>

<script>
export default {
  name: 'TableWrap',
  components: {},
  props: {
    top: {
      type: [String, Number],
      default() {
        return this.$UI_HEADER_HEIGHT || 60
      }
    },
    scrollElement: {
      type: [Object, Window],
      validator(v) {
        const constructorName = v.constructor.name
        return /(HTML(.*)Element)|(Window)/i.test(constructorName)
      },
      default: () => window
    },
    scrollElementSelector: {
      type: Function,
      default() {
        return null
      }
    },
    disabledColumnConfig: {
      type: Boolean,
      default() {
        return false
      }
    },
    enableDoHeader: {
      type: Boolean,
      default() {
        return false
      }
    }
  },

  data() {
    return {
      sticky: false
    }
  },
  computed: {},
  watch: {
    sticky: {
      handler(val) {
        const action = val ? 'add' : 'remove'
        this.table.classList[action]('table-sticky')
      }
    }
  },

  created() {},
  mounted() {
    this.attachScroll()
  },
  unmounted() {},
  methods: {
    stickyHeader(flag = false) {
      const $table = this.table
      if (this.sticky === flag) {
        return
      }
      if (!$table) {
        return
      }
      const tableBoundingClientRect = $table.getBoundingClientRect()
      const $headerWrapper = $table.querySelector('.el-table__header-wrapper')
      const $tableFixedHeader = $table.querySelector(
        '.el-table__fixed .el-table__fixed-header-wrapper'
      )
      const $tableFixedRightHeader = $table.querySelector(
        '.el-table__fixed-right .el-table__fixed-header-wrapper'
      )
      let fixedHeaderWidth = 0

      const $tableBody = $table.querySelector('.el-table__body-wrapper')
      const $tableWidth = tableBoundingClientRect.width
      const $tableLeft = tableBoundingClientRect.left
      const headerHeight = $headerWrapper.clientHeight
      if ($tableFixedHeader) {
        fixedHeaderWidth = $tableFixedHeader.parentElement.clientWidth
      }
      this.sticky = flag
      if (flag) {
        $tableBody.style.marginTop = headerHeight + 'px'
        this.setStyles($headerWrapper, {
          left: $tableLeft + 'px',
          width: $tableWidth + 'px',
          top: this.top + 'px',
          zIndex: 3,
          position: 'fixed'
        })
        if ($tableFixedHeader) {
          this.setStyles($tableFixedHeader, {
            left: $tableLeft + 'px',
            width: fixedHeaderWidth + 'px',
            overflow: 'hidden',
            top: this.top + 'px',
            zIndex: 4,
            position: 'fixed'
          })
        }
        if ($tableFixedRightHeader) {
          const $parent = $tableFixedRightHeader.parentElement
          if (!$parent) {
            return
          }
          const fixRightRect = $parent.getBoundingClientRect()
          this.setStyles($tableFixedRightHeader, {
            left: fixRightRect.left + 'px',
            width: fixRightRect.width + 'px',
            height: headerHeight + 'px',
            overflow: 'hidden',
            top: this.top + 'px',
            zIndex: 4,
            position: 'fixed'
          })
        }
      } else {
        this.setStyles($headerWrapper, {
          left: null,
          width: null,
          top: null,
          zIndex: null,
          position: null
        })
        if ($tableFixedHeader) {
          this.setStyles($tableFixedHeader, {
            left: null,
            width: null,
            top: null,
            zIndex: null,
            position: null
          })
        }
        if ($tableFixedRightHeader) {
          $tableFixedRightHeader.style = {}
        }
        $tableBody.style.marginTop = ''
      }
    },
    setStyles(ele, styleObj) {
      for (const prop in styleObj) {
        ele.style[prop] = styleObj[prop]
      }
    },
    scrollHandler() {
      const $table = this.$el.querySelector('.el-table')
      if (!$table) {
        return
      }
      const clientRect = $table.getBoundingClientRect()
      // table不可见时，取消对table的操作
      if (!(clientRect.width && clientRect.height)) {
        return false
      }
      if ($table) {
        this.table = $table
      } else {
        return false
      }
      if (clientRect.top <= this.top) {
        const outOfScreen = clientRect.bottom < 0
        const sticky = !outOfScreen
        this.stickyHeader(sticky)
      } else if (clientRect.top > 0) {
        this.stickyHeader(false)
      }
    },
    attachScroll() {
      let scrollEle = window
      if (this.scrollElementSelector) {
        scrollEle = this.scrollElementSelector() || window
      }
      const handler = this.$utils.throttled(this.scrollHandler, 100)
      this.scrollHandler()
      if (!('addEventListener' in scrollEle)) {
        return
      }
      scrollEle.addEventListener('scroll', handler)
      this.$once('hook:beforeDestroy', () => {
        scrollEle.removeEventListener('scroll', handler)
      })
    }
  }
}
</script>
<style lang="less">
.table-sticky {
  .el-table__fixed-right {
    .el-table__fixed-header-wrapper {
      table {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
.do-table-header {
  box-sizing: border-box;
  padding: 10px 10px 12px 10px;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding 0.3s linear;
  > .table-batch {
    box-sizing: border-box;
  }
  > .table-control {
    box-sizing: border-box;
    padding-top: 1px;
    min-height: 32.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > span > span > .el-button,
    > .el-button {
      box-sizing: border-box;
      margin-right: -1px;
      border-radius: 3px 0 0 3px;
      &:active {
        color: #fff;
        border-color: #3a8ee6;
        background-color: #3a8ee6;
      }
      &.mr-10 {
        margin-right: 10px;
      }
      &.all-radius {
        border-radius: 3px;
      }
    }
    > span:last-child > span > .el-button,
    > .el-button:last-child {
      margin-right: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
  &.hide-batch {
    padding: 0;
    border-bottom: 0 none;
  }
}
</style>
