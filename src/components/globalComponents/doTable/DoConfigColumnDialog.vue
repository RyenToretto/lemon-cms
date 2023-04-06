<!--
@file: DoConfigColumnDialog.vue
@createBy: koujianfeng
@description: 自定义列弹框
 -->
<template>
  <el-dialog
    :visible.sync="dialogConfigColumnVisible"
    title="自定义列"
    custom-class="do-config-column-dialog"
    :append-to-body="true"
    width="800px"
    @close="cancelColumnConfig"
  >
    <template slot="title">
      <span class="el-dialog__title">
        自定义列
        <span
          class="tips"
          :class="[`${newConfigName === crud.noNameLabel ? 'status-warning' : 'status-success'}`]"
        >
          ({{ newConfigName }})
        </span>
      </span>
    </template>

    <div class="do-config-column-dialog-content">
      <div class="do-config-column-list-box">
        <el-tree
          class="do-config-column-list"
          :data="leftColumnTree"
          node-key="property"
          :expand-on-click-node="false"
          default-expand-all
          :draggable="false"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <el-checkbox
              v-if="data && data.property"
              :key="node.label"
              v-model="data.visible"
              class="do-table-control-checkbox"
              :disabled="unableToControl(data)"
              @change="toggleColumnCheck($event, data.property || data.label)"
            >
              {{ node.label }}
            </el-checkbox>

            <span v-else class="do-table-tree-group"
              >{{ node.label }}
              <a
                class="do-table-tree-choose-all"
                href="javascript:"
                target="_self"
                @click="groupColumnAllSelect(data.label)"
                >全选</a
              >
              <a
                class="do-table-tree-choose-reverse"
                href="javascript:"
                target="_self"
                @click="groupColumnReverseSelect(data.label)"
                >反选</a
              >
            </span>
          </span>
        </el-tree>
      </div>
      <div class="do-config-column-drag-box">
        <div class="do-config-column-drag-content">
          <el-tree
            class="do-config-column-list"
            :data="emitColumnConfig"
            node-key="property"
            :expand-on-click-node="false"
            default-expand-all
            :draggable="true"
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @node-drop="nodeDrop"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span :class="{ disable: unableToControl(data) }">{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <div class="left-btn-group">
        <el-popover
          v-model="popperSaveToLocal"
          placement="top"
          popper-class="save-to-local-popper"
          trigger="manual"
        >
          <div class="save-to-local-popper-content">
            <el-input
              ref="inputConfigName"
              v-model="newConfigName"
              class="storage-key-will-save"
              autofocus
              placeholder="请输入配置名称"
            ></el-input>
            <el-button class="save-to-local-confirm" plain size="small" @click="cancelSaveToLocal"
              >取消</el-button
            >
            <el-button class="save-to-local-confirm" plain size="small" @click="doSaveToLocal"
              >保存</el-button
            >
          </div>

          <el-button slot="reference" class="save-to-local-btn" @click="toSaveToLocal"
            >存到本地</el-button
          >
        </el-popover>

        <el-popover
          v-model="popperReadFromLocal"
          placement="top"
          popper-class="read-from-local-popper"
          trigger="click"
        >
          <do-read-column-config
            ref="doReadColumnConfig"
            @confirm="useReadConfig"
            @remove="removeChooseConfig"
            @cancel="cancelChooseConfig"
          ></do-read-column-config>
          <el-button slot="reference" @click="toReadFromLocal">读取本地</el-button>
        </el-popover>

        <el-button @click="allSelectColumnConfig">全选</el-button>
        <el-button @click="reverseSelectColumnConfig">反选</el-button>
      </div>

      <div class="right-btn-group">
        <el-button @click="cancelColumnConfig">取 消</el-button>
        <el-button type="primary" @click="confirmColumnConfig">完 成</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import DoReadColumnConfig from './DoReadColumnConfig.vue'

export default {
  name: 'DoConfigColumnDialog',
  components: {
    DoReadColumnConfig
  },
  inject: ['crud'],
  data() {
    return {
      crud: this.crud,
      popperSaveToLocal: false,
      popperReadFromLocal: false,
      dialogConfigColumnVisible: false,

      columnList: [],
      emitColumnConfig: [],
      newConfigName: this.crud.noNameLabel
    }
  },
  computed: {
    leftColumnTree() {
      const groupExistMap = {}
      return this.columnList.reduce((treeColumnList, item) => {
        if (groupExistMap[item.group]) {
          const index = treeColumnList.findIndex((i) => i.label === item.group)
          treeColumnList[index].children.push(item)
        } else {
          groupExistMap[item.group] = true
          treeColumnList = [
            ...treeColumnList,
            {
              label: item.group,
              children: [item]
            }
          ]
        }
        return treeColumnList
      }, [])
    }
  },
  methods: {
    cancelColumnConfig() {
      this.popperSaveToLocal = false
      this.popperReadFromLocal = false
      this.dialogConfigColumnVisible = false
    },
    confirmColumnConfig() {
      this.popperSaveToLocal = false
      this.popperReadFromLocal = false
      this.dialogConfigColumnVisible = false
      this.$emit('confirm', {
        label: this.newConfigName || this.crud.noNameLabel,
        columns: this.emitColumnConfig.map((config) => config.property)
      })
    },
    showConfigColumnDialog(currentConfig) {
      let firstVisibleColumns = []
      const columnConfig = currentConfig || this.crud.getDefaultConfig()
      if (columnConfig) {
        this.newConfigName = columnConfig.label
        firstVisibleColumns = this.crud.tableColumns.reduce((newArr, item) => {
          item.visible = columnConfig.columns.includes(item.property)
          return [...newArr, { ...item }]
        }, [])
      }
      this.useColumnConfig(firstVisibleColumns)
      this.dialogConfigColumnVisible = true
    },
    useColumnConfig(columnConfig) {
      this.columnList = columnConfig
      this.emitColumnConfig = columnConfig.reduce((newArr, item) => {
        if (item.visible) {
          return [...newArr, item]
        } else {
          return newArr
        }
      }, [])
      return columnConfig
    },
    unableToControl(col) {
      return col.type === 'selection' || col.fixed || col.label === '操作'
    },
    allowDrop(draggingNode, dropNode, type) {
      // return !this.unableToControl(dropNode.data) && type !== 'inner'
      return false // TODO: 暂时不匀速拖动列
    },
    allowDrag(draggingNode) {
      // return !this.unableToControl(draggingNode.data)
      return false // TODO: 暂时不匀速拖动列
    },
    nodeDrop(draggingNode, lastOverNode, position, e) {
      this.columnList = this.columnList.reduce(
        (newArr, item) => {
          const iProp = item.property || item.label
          const isExist = this.emitColumnConfig.some((eItem) => {
            const eProp = eItem.property || eItem.label
            return eProp === iProp
          })
          if (isExist) {
            return newArr
          } else {
            return [...newArr, item]
          }
        },
        [...this.emitColumnConfig]
      )
    },
    updateEmitColumnConfig() {
      this.emitColumnConfig = this.columnList.reduce((newArr, item) => {
        if (item.visible) {
          return [...newArr, item]
        }
        return newArr
      }, [])
      this.updateNewConfigName()
    },
    updateNewConfigName() {
      const cacheColumnConfig = this.crud.readCacheConfig()
      if (!cacheColumnConfig) {
        return
      }
      const tempConfig = this.emitColumnConfig.map((item) => item.property)
      let found = false
      cacheColumnConfig.columnConfig.forEach((config) => {
        if (JSON.stringify(config.columns) === JSON.stringify(tempConfig)) {
          found = true
          this.newConfigName = config.label
        }
      })
      if (!found) {
        this.newConfigName = this.crud.noNameLabel
      }
    },
    toggleColumnCheck() {
      this.updateEmitColumnConfig()
    },
    groupColumnAllSelect(group) {
      this.columnList.forEach((item) => {
        if (!this.unableToControl(item)) {
          if (item.group === group) {
            item.visible = true
          }
        }
      })
      this.updateEmitColumnConfig()
    },
    groupColumnReverseSelect(group) {
      this.columnList.forEach((item) => {
        if (!this.unableToControl(item)) {
          if (item.group === group) {
            item.visible = !item.visible
          }
        }
      })
      this.updateEmitColumnConfig()
    },
    allSelectColumnConfig() {
      this.popperSaveToLocal = false
      this.popperReadFromLocal = false
      this.columnList.forEach((item) => {
        if (!this.unableToControl(item)) {
          item.visible = true
        }
      })
      this.updateEmitColumnConfig()
    },
    reverseSelectColumnConfig() {
      this.popperSaveToLocal = false
      this.popperReadFromLocal = false
      this.columnList.forEach((item) => {
        if (!this.unableToControl(item)) {
          item.visible = !item.visible
        }
      })
      this.updateEmitColumnConfig()
    },
    toReadFromLocal() {
      this.popperSaveToLocal = false
      if (this.$refs.doReadColumnConfig) {
        this.$refs.doReadColumnConfig.getColumnConfigFromLocal()
      }
    },
    cancelChooseConfig() {
      this.popperReadFromLocal = false
    },
    removeChooseConfig(label) {
      this.crud.removeConfigFromLocal(label)
    },
    useReadConfig(config) {
      if (!config || !config.label || !this.columnList.length) {
        return
      }
      if (!config.columns || !config.columns.length || config.columns.includes('ALL')) {
        return this.useReadConfig({
          label: config.label,
          columns: this.crud.tableColumns.map((each) => each.property)
        })
      }
      this.popperReadFromLocal = false
      this.newConfigName = config.label
      this.columnList.forEach((item) => {
        if (!item.visible && config.columns.includes(item.property)) {
          item.visible = true
        } else if (item.visible && !config.columns.includes(item.property)) {
          item.visible = false
        }
      })
      this.updateEmitColumnConfig()
    },
    toSaveToLocal() {
      this.newConfigName = ''
      this.popperSaveToLocal = true
      this.popperReadFromLocal = false
      this.$nextTick(() => {
        const { inputConfigName } = this.$refs
        if (inputConfigName && inputConfigName.focus) {
          inputConfigName.focus()
        }
      })
    },
    doSaveToLocal() {
      if (!this.newConfigName || !this.newConfigName.trim()) {
        this.$message.warning('请输入配置名称')
        return
      }
      this.crud.saveConfigToLocal(
        this.newConfigName,
        this.emitColumnConfig.map((config) => config.property)
      )
      this.popperSaveToLocal = false
    },
    cancelSaveToLocal() {
      this.updateNewConfigName()
      this.popperSaveToLocal = false
    }
  }
}
</script>

<style lang="less" scoped>
@drag-box-width: 400px;

.do-config-column-dialog {
  .do-config-column-dialog-content {
    padding-right: @drag-box-width;
    position: relative;
    .do-config-column-list-box {
      padding: 16px 16px 32px;
      border: 1px solid #f1f1f1;
      box-sizing: border-box;
      width: 100%;
      height: 50vh;
      overflow: auto;
      position: relative;
      /deep/.do-config-column-list {
        > .el-tree-node {
          padding-top: 12px;
          &:first-child {
            padding-top: 0;
          }
          > .el-tree-node__children {
            padding-top: 12px;
          }
        }
      }
    }
    .do-config-column-drag-box {
      padding: 0 12px;
      box-sizing: border-box;
      width: @drag-box-width;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      .do-config-column-drag-content {
        border: 1px solid #f1f1f1;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
    .do-config-column-list-box,
    .do-config-column-drag-content {
      &::-webkit-scrollbar {
        width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /* 滚动条里面小方块 */
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #c1c1c1;
      }
      /* 滚动条里面轨道 */
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: #f1f1f1;
      }
    }
    .do-config-column-list {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;
      .do-table-control-checkbox {
        display: block;
        box-sizing: border-box;
      }
      .do-table-tree-group {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .do-table-tree-choose-all,
        .do-table-tree-choose-reverse {
          font-size: 12px;
          text-decoration: underline;
          display: none;
        }
        .do-table-tree-choose-all {
          margin-left: 18px;
          margin-right: 8px;
        }
      }
    }
    /deep/.do-config-column-list {
      .el-tree-node__content {
        .custom-tree-node {
          flex: 1;
          .disable {
            color: #c0c4cc;
            cursor: not-allowed;
          }
        }
        &:hover {
          .do-table-tree-group {
            .do-table-tree-choose-all,
            .do-table-tree-choose-reverse {
              display: block;
            }
          }
        }
      }
    }
  }

  .dialog-footer {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/.left-btn-group {
      > span {
        margin-right: 10px;
      }
      > button {
        margin-left: 0;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

<style lang="less">
.save-to-local-popper {
  .save-to-local-popper-content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .storage-key-will-save {
      box-sizing: border-box;
      width: 400px;
    }
    .save-to-local-confirm {
      margin-left: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
