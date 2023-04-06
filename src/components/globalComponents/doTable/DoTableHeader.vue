<template>
  <div class="do-table-header">
    <do-config-column-dialog
      ref="refConfigColumnDialog"
      @confirm="crud.applpyColumnConfig"
    ></do-config-column-dialog>

    <div class="table-batch">
      <slot name="batch"></slot>
    </div>

    <div class="table-control">
      <slot name="control"></slot>

      <el-popover
        v-if="!disabledColumnConfig"
        v-model="visibleDoTableControlBtn"
        placement="bottom"
        popper-class="do-table-config-popper"
        trigger="hover"
        @show="$refs.refDoReadColumnConfig.getColumnConfigFromLocal()"
      >
        <do-read-column-config
          ref="refDoReadColumnConfig"
          disabled-delete
          show-custom-config-button
          @custom="toCustomColumn"
          @remove="crud.removeConfigFromLocal"
          @cancel="visibleDoTableControlBtn = false"
          @confirm="crud.applpyColumnConfig"
        ></do-read-column-config>
        <el-button slot="reference" class="do-table-control-btn" plain size="mini"
          >自定义列</el-button
        >
      </el-popover>
    </div>
  </div>
</template>

<script>
import DoReadColumnConfig from './DoReadColumnConfig.vue'
import DoConfigColumnDialog from './DoConfigColumnDialog.vue'

export default {
  components: {
    DoReadColumnConfig,
    DoConfigColumnDialog
  },
  inject: ['crud'],
  props: {
    disabledColumnConfig: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      crud: this.crud,
      visibleDoTableControlBtn: false
    }
  },
  methods: {
    toCustomColumn(currentConfig) {
      if (!this.$refs.refConfigColumnDialog) {
        return
      }
      this.$refs.refConfigColumnDialog.showConfigColumnDialog(currentConfig)
    }
  }
}
</script>

<style lang="less">
.clear-btn-span-margin {
  &.el-button [class*='el-icon-'] + span {
    margin: 0;
  }
}
.table-config-pop {
  box-sizing: border-box;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  .table-config-content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    > .el-button {
      margin: 6px 0 0;
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
