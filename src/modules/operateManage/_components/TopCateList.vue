<!--
@file: TopCateList.vue
@createBy: koujianfeng
@description: 一级分类
 -->
<template>
  <div class="top-cate-list">
    <div v-if="!$route.meta.isNavTab" class="main-title">
      <h2>{{ $route.meta.title }}</h2>
    </div>

    <div class="wrapper">
      <!-- 搜索区域 -->
      <do-filter-panel @search="search(true)">
        <el-form inline label-width="100px" @submit.native.prevent>
          <el-form-item label="分类名称">
            <el-input
              v-model="query.name"
              clearable
              placeholder="请输入分类名称"
              @keyup.enter.native="search(true)"
            ></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="query.status" size="small" @change="search(true)">
              <el-radio-button key="all" label="">不限</el-radio-button>
              <el-radio-button
                v-for="(label, value) in $MAPS.topCate.status.labelMap"
                :key="value"
                :label="value"
                >{{ label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>

          <el-form-item label="客户端展示">
            <el-radio-group v-model="query.visible" size="small" @change="search(true)">
              <el-radio-button key="all" label="">不限</el-radio-button>
              <el-radio-button key="1" :label="true">展示</el-radio-button>
              <el-radio-button key="0" :label="false">不展示</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </do-filter-panel>

      <table-wrap v-loading="tableLoading">
        <template #hd>
          <!-- 批量操作区域 -->
          <el-collapse-transition>
            <div v-show="selectedTopCate.length" class="hd bordered">
              <span>批量操作：</span>

              <el-popconfirm
                class="online-top-cate-wrapper"
                :title="`确定要发布${selectedTopCate.length}个一级分类吗？`"
                @confirm="batchTopCate($MAPS.topCate.status.TOP_CATE_STATUS_ONLINE)"
              >
                <el-button
                  slot="reference"
                  type="success"
                  plain
                  :disabled="!selectedTopCate.length"
                  size="mini"
                >
                  <i v-if="batchingUp" class="el-icon-loading"></i>
                  <i v-else class="el-icon-s-promotion"></i>批量发布
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                class="offline-top-cate-wrapper ml-10"
                :title="`确定下线这${selectedTopCate.length}个一级分类吗？`"
                @confirm="batchTopCate($MAPS.topCate.status.TOP_CATE_STATUS_WAIT)"
              >
                <el-button
                  slot="reference"
                  type="warning"
                  plain
                  :disabled="!selectedTopCate.length"
                  size="mini"
                >
                  <i v-if="batchingDown" class="el-icon-loading"></i>
                  <i v-else class="el-icon-sold-out"></i>批量下线
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                :title="`确定要批量删除所选 ${selectedTopCate.length} 个一级分类？`"
                @confirm="batchDeleteTopCate"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  class="ml-10"
                  >批量删除</el-button
                >
              </el-popconfirm>
            </div>
          </el-collapse-transition>
        </template>

        <!-- 表格区 -->
        <el-table
          ref="refTopCateTable"
          :data="tableData"
          border
          stripe
          :default-sort="{
            order: 'ascending',
            prop: 'sort'
          }"
          class="hide-border"
          @sort-change="handleSortChange"
          @selection-change="changeSelectionTopCate"
          @row-click="changeSelectionTopCate"
        >
          <el-table-column type="selection" width="55">
            <template v-if="enableSelector" #default="{ row }">
              <el-checkbox
                v-show="value[valueKey] + '' === row[valueKey] + ''"
                class="show-normal-checkbox"
                checked
                disabled
              ></el-checkbox>
              <el-checkbox
                v-show="!(value[valueKey] + '' === row[valueKey] + '')"
                class="show-normal-checkbox"
                disabled
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column
            label="分类名称"
            min-width="140"
            class-name="name-slot-cell"
            :show-overflow-tooltip="true"
            sortable="custom"
            prop="id"
          >
            <template #default="{ row, column }">
              <div class="name">{{ row.name | emptyReplace }}</div>
              <div class="id">ID: {{ row[column.property] | emptyReplace }}</div>
            </template>
          </el-table-column>

          <el-table-column label="客户端展示" min-width="120" align="center" prop="visible">
            <template #default="{ row, column }">
              <template v-if="$MAPS.topCate.shown.labelMap[row[column.property]]">
                <span
                  :class="['fs-12', `status-${$MAPS.topCate.shown.classMap(row[column.property])}`]"
                  >{{ row[column.property] | labelTopCateShown }}</span
                >
              </template>

              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" min-width="70" align="center" prop="status">
            <template #default="{ row, column }">
              <template v-if="$MAPS.topCate.status.labelMap[row[column.property]]">
                <span
                  :class="[
                    'fs-12',
                    `status-${$MAPS.topCate.status.classMap(row[column.property])}`
                  ]"
                  >{{ row[column.property] | labelTopCateStatus }}</span
                >
              </template>

              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column label="排序" min-width="80" align="center" sortable="custom" prop="sort">
            <template #default="{ row, column }">
              <do-number-setter
                :num="row[column.property]"
                min-num="0"
                :changing="row.__sortChanging"
                :disabled="enableSelector"
                class="money"
                @ok="setTopCateSort($event, row, '__sortChanging')"
                >{{ row[column.property] }}</do-number-setter
              >
            </template>
          </el-table-column>

          <el-table-column
            v-if="!enableSelector"
            class-name="ctrl-td"
            width="160px"
            align="left"
            label="操作"
          >
            <template v-if="writeable" #header>
              <dialog-edit-top-cate @ok="search(true)">
                <div class="btn-add-top-cate">
                  <el-button size="mini" icon="el-icon-plus" type="success">添加一级分类</el-button>
                </div>
              </dialog-edit-top-cate>
            </template>

            <template #default="{ row }">
              <dialog-edit-top-cate :top-cate-line="row" @ok="search(false)">
                <el-button class="edit-top-cate-btn" plain type="primary" size="mini">
                  <i class="el-icon-edit"></i>
                </el-button>
              </dialog-edit-top-cate>

              <el-popconfirm
                class="delete-top-cate-wrapper"
                title="确定要删除该一级分类？"
                @confirm="deleteTopCate(row)"
              >
                <el-button
                  slot="reference"
                  class="delete-top-cate-btn"
                  plain
                  type="danger"
                  size="mini"
                >
                  <i v-if="row.__deleting" class="el-icon-loading"></i>
                  <i v-else class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                v-if="row.status === $MAPS.topCate.status.TOP_CATE_STATUS_WAIT"
                title="确定上线吗？"
                @confirm="
                  toSwitchTopCate(row, $MAPS.topCate.status.TOP_CATE_STATUS_ONLINE, '__publishing')
                "
              >
                <el-button slot="reference" type="success" plain size="mini">
                  <el-tooltip content="上线">
                    <i :class="row.__publishing ? 'el-icon-loading' : 'el-icon-s-promotion'"></i>
                  </el-tooltip>
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                v-if="row.status === $MAPS.topCate.status.TOP_CATE_STATUS_ONLINE"
                title="确定下线吗？"
                @confirm="
                  toSwitchTopCate(row, $MAPS.topCate.status.TOP_CATE_STATUS_WAIT, '__revoking')
                "
              >
                <el-button slot="reference" type="warning" plain size="mini">
                  <el-tooltip content="下线">
                    <i :class="row.__revoking ? 'el-icon-loading' : 'el-icon-sold-out'"></i>
                  </el-tooltip>
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </table-wrap>

      <base-pagination
        :current-page="query.curPage"
        :page-size="query.pageSize"
        :total="total"
        @current-change="handlePnChange"
        @size-change="handleSizeChange"
      ></base-pagination>
    </div>
  </div>
</template>

<script>
import {
  requestTopCateList,
  requestDeleteTopCate,
  requestSetTopCateSort,
  requestSwitchTopCate
} from '../_api'
import { labelTopCateShown, labelTopCateStatus } from '../_filters'
import DialogEditTopCate from './DialogEditTopCate.vue'

import generalCRUD from '@/mixins/generalCRUD'

export default {
  name: 'TopCateList',
  components: {
    DialogEditTopCate
  },
  filters: {
    labelTopCateShown,
    labelTopCateStatus
  },
  mixins: [generalCRUD],
  provide() {
    return {
      mainCtx: this
    }
  },
  props: {
    isListPage: {
      type: Boolean,
      default() {
        return true
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    enableSelector: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    const defaultSort = { prop: 'sort', order: 'asc' }

    return {
      defaultSort,
      query: {
        name: '',
        status: '',
        visible: '',

        orderBy: defaultSort.prop,
        seq: defaultSort.order
      },
      batchingUp: false,
      batchingDown: false,
      selectedTopCate: []
    }
  },
  computed: {
    writeable() {
      return true
    }
  },
  async created() {
    this.tableLoading = true
    this.search(true)
  },
  methods: {
    search(toFirstPage = false) {
      if (toFirstPage) {
        this.query.curPage = 1
      }

      this.tableLoading = true
      requestTopCateList(this.query)
        .then((res) => {
          if (res) {
            this.total = res.totalSize
            this.tableData = res.data || []
            if (!this.tableData.length && this.query.curPage > 1) {
              this.query.curPage = this.query.curPage - 1
              this.search()
            }
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    setTopCateSort(sort, topCateLine, loadingAttr) {
      this.$set(topCateLine, loadingAttr, true)
      requestSetTopCateSort(topCateLine.id, sort)
        .then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.$set(topCateLine, loadingAttr, false)
        })
    },
    batchDeleteTopCate() {
      this.tableLoading = true
      const ids = this.selectedTopCate.map((v) => v.id)
      requestDeleteTopCate(ids)
        .then(() => {
          this.$message({
            type: 'success',
            message: '批量删除一级分类成功！'
          })
          this.$refs.refTopCateTable.clearSelection()
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoading = false
        })
    },
    deleteTopCate(topCateLine) {
      this.$set(topCateLine, '__deleting', true)
      requestDeleteTopCate([topCateLine.id])
        .then(() => {
          if (this.tableData.length === 1) {
            this.query.curPage = this.query.curPage - 1 || 1
          }
          this.$message({
            message: '一级分类删除成功',
            type: 'success'
          })
          this.search()
        })
        .finally(() => {
          this.$set(topCateLine, '__deleting', false)
        })
    },
    toSwitchTopCate(topCateLine, newStatus, loadingAttr) {
      const isPublish = newStatus === this.$MAPS.topCate.status.TOP_CATE_STATUS_ONLINE
      this.$set(topCateLine, loadingAttr, true)
      requestSwitchTopCate([topCateLine.id], newStatus)
        .then(() => {
          this.$message({
            message: `一级分类${isPublish ? '上线' : '下线'}成功`,
            type: 'success'
          })
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.$set(topCateLine, loadingAttr, false)
        })
    },
    // 批量发布/批量下线
    batchTopCate(action) {
      if (action === this.$MAPS.topCate.status.TOP_CATE_STATUS_WAIT) {
        this.batchingDown = true
      } else {
        this.batchingUp = true
      }
      requestSwitchTopCate(
        this.selectedTopCate.map((item) => item.id),
        action
      )
        .then((res) => {
          this.$message({
            type: 'success',
            message: `批量${this.batchingDown ? '下线' : '发布'}成功`
          })
          this.$refs.refTopCateTable.clearSelection()
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.batchingDown = false
          this.batchingUp = false
        })
    },

    changeSelectionTopCate(selectedTopCate) {
      if (!this.enableSelector && this.$utils.getRealType(selectedTopCate) === 'array') {
        this.selectedTopCate = selectedTopCate
      } else {
        const result = this.$utils.deepClone(
          this.$utils.getRealType(selectedTopCate) === 'array'
            ? selectedTopCate[0]
            : selectedTopCate || {}
        )
        this.$emit('input', result)
        this.$emit('on-change', result)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top-cate-list {
  box-sizing: border-box;
}
</style>
