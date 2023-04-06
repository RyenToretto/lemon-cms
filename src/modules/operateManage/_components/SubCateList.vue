<!--
@file: SubCateList.vue
@createBy: koujianfeng
@description: 二级分类
 -->
<template>
  <div class="sub-cate-list">
    <div v-if="!$route.meta.isNavTab" class="main-title">
      <h2>{{ $route.meta.title }}</h2>
    </div>

    <div class="wrapper">
      <!-- 搜索区域 -->
      <do-filter-panel @search="search(true)">
        <el-form inline label-width="90px" @submit.native.prevent>
          <el-form-item label="分类名称">
            <el-input
              v-model="query.name"
              clearable
              placeholder="请输入分类名称"
              @keyup.enter.native="search(true)"
            ></el-input>
          </el-form-item>

          <el-form-item label="一级分类">
            <top-cate-select
              v-model="query.categoryId"
              placeholder="不限"
              @change="judgeSortColumn"
            ></top-cate-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="query.status" size="small" @change="search(true)">
              <el-radio-button key="all" label="">不限</el-radio-button>
              <el-radio-button
                v-for="(label, value) in $MAPS.subCate.status.labelMap"
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
            <div v-show="selectedSubCate.length" class="hd bordered">
              <span>批量操作：</span>

              <el-popconfirm
                class="online-sub-cate-wrapper"
                :title="`确定要发布${selectedSubCate.length}个二级分类吗？`"
                @confirm="batchSubCate($MAPS.subCate.status.SUB_CATE_STATUS_ONLINE)"
              >
                <el-button
                  slot="reference"
                  type="success"
                  plain
                  :disabled="!selectedSubCate.length"
                  size="mini"
                >
                  <i v-if="batchingUp" class="el-icon-loading"></i>
                  <i v-else class="el-icon-s-promotion"></i>批量发布
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                class="offline-sub-cate-wrapper ml-10"
                :title="`确定下线这${selectedSubCate.length}个二级分类吗？`"
                @confirm="batchSubCate($MAPS.subCate.status.SUB_CATE_STATUS_WAIT)"
              >
                <el-button
                  slot="reference"
                  type="warning"
                  plain
                  :disabled="!selectedSubCate.length"
                  size="mini"
                >
                  <i v-if="batchingDown" class="el-icon-loading"></i>
                  <i v-else class="el-icon-sold-out"></i>批量下线
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                :title="`确定要批量删除所选 ${selectedSubCate.length} 个二级分类？`"
                @confirm="batchDeleteSubCate"
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
          ref="refSubCateTable"
          :data="tableData"
          border
          stripe
          :default-sort="{
            order: 'ascending',
            prop: 'sort'
          }"
          class="hide-border"
          @sort-change="handleSortChange"
          @selection-change="changeSelectionSubCate"
          @row-click="changeSelectionSubCate"
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
            label="缩略图"
            class-name="img-td"
            width="120"
            align="center"
            prop="preUrl"
          >
            <template #default="{ row, column }">
              <account-photo v-model="row[column.property]" :logoff="row.isLogoff"></account-photo>
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

          <el-table-column
            label="一级分类"
            min-width="140"
            class-name="name-slot-cell"
            :show-overflow-tooltip="true"
            sortable="custom"
            prop="categoryId"
          >
            <template #default="{ row, column }">
              <template v-if="row.categoryName || row[column.property]">
                <div v-if="row.categoryName" class="name">
                  <span>{{ row.categoryName | emptyReplace }}</span>
                </div>
                <div v-if="row[column.property]" class="id">
                  ID: {{ row[column.property] | emptyReplace }}
                </div>
              </template>

              <div v-else class="name">-</div>
            </template>
          </el-table-column>

          <el-table-column label="客户端展示" min-width="120" align="center" prop="visible">
            <template #default="{ row, column }">
              <template v-if="$MAPS.subCate.shown.labelMap[row[column.property]]">
                <span
                  :class="['fs-12', `status-${$MAPS.subCate.shown.classMap(row[column.property])}`]"
                  >{{ row[column.property] | labelSubCateShown }}</span
                >
              </template>

              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" min-width="70" align="center" prop="status">
            <template #default="{ row, column }">
              <template v-if="$MAPS.subCate.status.labelMap[row[column.property]]">
                <span
                  :class="[
                    'fs-12',
                    `status-${$MAPS.subCate.status.classMap(row[column.property])}`
                  ]"
                  >{{ row[column.property] | labelSubCateStatus }}</span
                >
              </template>

              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="enableCateSort"
            label="排序"
            min-width="100"
            align="center"
            :sortable="enableCateSort ? 'custom' : false"
            prop="sort"
          >
            <template #default="{ row, column }">
              <template v-if="row[column.property] || row[column.property] === 0">
                <do-number-setter
                  :num="row[column.property]"
                  min-num="0"
                  :changing="row.__sortChanging"
                  :disabled="enableSelector"
                  class="money"
                  @ok="setSubCateSort($event, row, '__sortChanging')"
                  >{{ row[column.property] }}</do-number-setter
                >
              </template>
              <div v-else class="name">-</div>
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
              <dialog-edit-sub-cate @ok="search(true)">
                <div class="btn-add-sub-cate">
                  <el-button size="mini" icon="el-icon-plus" type="success">添加二级分类</el-button>
                </div>
              </dialog-edit-sub-cate>
            </template>

            <template #default="{ row }">
              <dialog-edit-sub-cate :sub-cate-line="row" @ok="search(false)">
                <el-button class="edit-sub-cate-btn" plain type="primary" size="mini">
                  <i class="el-icon-edit"></i>
                </el-button>
              </dialog-edit-sub-cate>

              <el-popconfirm
                class="delete-sub-cate-wrapper"
                title="确定要删除该二级分类？"
                @confirm="deleteSubCate(row)"
              >
                <el-button
                  slot="reference"
                  class="delete-sub-cate-btn"
                  plain
                  type="danger"
                  size="mini"
                >
                  <i v-if="row.__deleting" class="el-icon-loading"></i>
                  <i v-else class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                v-if="row.status === $MAPS.subCate.status.SUB_CATE_STATUS_WAIT"
                title="确定上线吗？"
                @confirm="
                  toSwitchSubCate(row, $MAPS.subCate.status.SUB_CATE_STATUS_ONLINE, '__publishing')
                "
              >
                <el-button slot="reference" type="success" plain size="mini">
                  <el-tooltip content="上线">
                    <i :class="row.__publishing ? 'el-icon-loading' : 'el-icon-s-promotion'"></i>
                  </el-tooltip>
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                v-if="row.status === $MAPS.subCate.status.SUB_CATE_STATUS_ONLINE"
                title="确定下线吗？"
                @confirm="
                  toSwitchSubCate(row, $MAPS.subCate.status.SUB_CATE_STATUS_WAIT, '__revoking')
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
import { labelSubCateShown, labelSubCateStatus } from '../_filters'
import {
  requestSubCateList,
  requestDeleteSubCate,
  requestSetSubCateSort,
  requestSwitchSubCate
} from '../_api'

import DialogEditSubCate from './DialogEditSubCate.vue'
import generalCRUD from '@/mixins/generalCRUD'

import debounce from '@/utils/module/debounce'

export default {
  name: 'SubCateList',
  components: {
    DialogEditSubCate
  },
  filters: {
    labelSubCateShown,
    labelSubCateStatus
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
      default: 'id'
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
    const defaultSort = { prop: '', order: '' }

    return {
      defaultSort,
      query: {
        name: '',
        categoryId: '',
        status: '',
        visible: '',

        orderBy: defaultSort.prop,
        seq: defaultSort.order
      },
      batchingUp: false,
      batchingDown: false,
      selectedSubCate: []
    }
  },
  computed: {
    writeable() {
      return true
    },
    enableCateSort() {
      // 选择了一级分类, 则显示「排序」列
      return !['', -1, '-1'].includes(this.query.categoryId) // 单选
    }
  },
  async created() {
    this.tableLoading = true
    await this.$store.dispatch('sCate/getAllTopCate')
    this.search(true)
  },
  methods: {
    judgeSortColumn(e, field = 'sort') {
      if (this.enableCateSort) {
        this.query.orderBy = this.query.orderBy ? this.query.orderBy : field
        this.query.seq = this.query.seq === 'asc' || !this.query.seq ? 'asc' : 'desc'
        this.$refs.refSubCateTable.sort(
          this.query.orderBy ? this.query.orderBy : field,
          this.query.seq === 'asc' ? 'ascending' : 'descending'
        )
      } else {
        if (field === this.query.orderBy) {
          this.query.orderBy = ''
          this.query.seq = ''
          this.$refs.refSubCateTable.clearSort()
        }
      }
      this.search(true)
    },
    search: debounce(function (toFirstPage = false) {
      if (toFirstPage) {
        this.query.curPage = 1
      }

      this.tableLoading = true
      requestSubCateList(this.query)
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
    }),
    setSubCateSort(sort, subCateLine, loadingAttr) {
      this.$set(subCateLine, loadingAttr, true)
      requestSetSubCateSort(subCateLine.id, sort)
        .then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.$set(subCateLine, loadingAttr, false)
        })
    },
    batchDeleteSubCate() {
      this.tableLoading = true
      const ids = this.selectedSubCate.map((v) => v.id)
      requestDeleteSubCate(ids)
        .then(() => {
          this.$message({
            type: 'success',
            message: '批量删除二级分类成功！'
          })
          this.$refs.refSubCateTable.clearSelection()
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoading = false
        })
    },
    deleteSubCate(subCateLine) {
      this.$set(subCateLine, '__deleting', true)
      requestDeleteSubCate([subCateLine.id])
        .then(() => {
          if (this.tableData.length === 1) {
            this.query.curPage = this.query.curPage - 1 || 1
          }
          this.$message({
            message: '二级分类删除成功',
            type: 'success'
          })
          this.search()
        })
        .finally(() => {
          this.$set(subCateLine, '__deleting', false)
        })
    },
    toSwitchSubCate(subCateLine, newStatus, loadingAttr) {
      const isPublish = newStatus === this.$MAPS.subCate.status.SUB_CATE_STATUS_ONLINE
      this.$set(subCateLine, loadingAttr, true)
      requestSwitchSubCate([subCateLine.id], newStatus)
        .then(() => {
          this.$message({
            message: `二级分类${isPublish ? '上线' : '下线'}成功`,
            type: 'success'
          })
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.$set(subCateLine, loadingAttr, false)
        })
    },
    // 批量发布/批量下线
    batchSubCate(action) {
      if (action === this.$MAPS.subCate.status.SUB_CATE_STATUS_WAIT) {
        this.batchingDown = true
      } else {
        this.batchingUp = true
      }
      requestSwitchSubCate(
        this.selectedSubCate.map((item) => item.id),
        action
      )
        .then((res) => {
          this.$message({
            type: 'success',
            message: `批量${this.batchingDown ? '下线' : '发布'}成功`
          })
          this.$refs.refSubCateTable.clearSelection()
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.batchingDown = false
          this.batchingUp = false
        })
    },

    changeSelectionSubCate(selectedSubCate) {
      if (!this.enableSelector && this.$utils.getRealType(selectedSubCate) === 'array') {
        this.selectedSubCate = selectedSubCate
      } else {
        const result = this.$utils.deepClone(
          this.$utils.getRealType(selectedSubCate) === 'array'
            ? selectedSubCate[0]
            : selectedSubCate || {}
        )
        this.$emit('input', result)
        this.$emit('on-change', result)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sub-cate-list {
  box-sizing: border-box;
}
</style>
