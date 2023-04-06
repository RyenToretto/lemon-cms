<!--
@file: CollectionList.vue
@createBy: koujianfeng
@description: 合集管理
 -->
<template>
  <div class="collection-list">
    <div v-if="!$route.meta.isNavTab" class="main-title">
      <h2>{{ $route.meta.title }}</h2>
    </div>

    <div class="wrapper">
      <!-- 搜索区域 -->
      <do-filter-panel @search="search(true)">
        <el-form inline label-width="90px" @submit.native.prevent>
          <el-form-item label="合集名称">
            <el-input
              v-model="query.name"
              clearable
              placeholder="请输入合集名称"
              @keyup.enter.native="search(true)"
            ></el-input>
          </el-form-item>

          <el-form-item label="作者">
            <client-user-select
              v-model="query.userId"
              placeholder="不限"
              @change="search(true)"
            ></client-user-select>
          </el-form-item>

          <el-form-item label="来源">
            <el-radio-group v-model="query.source" size="small" @change="search(true)">
              <el-radio-button key="all" label="">不限</el-radio-button>
              <el-radio-button
                v-for="(label, value) in $MAPS.collection.source.labelMap"
                :key="+value"
                :label="+value"
                >{{ label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
        </el-form>
      </do-filter-panel>

      <table-wrap v-loading="tableLoading">
        <template #hd>
          <!-- 批量操作区域 -->
          <el-collapse-transition>
            <div v-show="selectedCollection.length" class="hd bordered">
              <span>批量操作：</span>

              <el-popconfirm
                class="online-collection-wrapper"
                :title="`确定要发布${selectedCollection.length}个合集吗？`"
                @confirm="batchCollection($MAPS.collection.status.COLLECTION_STATUS_ONLINE)"
              >
                <el-button
                  slot="reference"
                  type="success"
                  plain
                  :disabled="!selectedCollection.length"
                  size="mini"
                >
                  <i v-if="batchingUp" class="el-icon-loading"></i>
                  <i v-else class="el-icon-s-promotion"></i>批量发布
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                class="offline-collection-wrapper ml-10"
                :title="`确定下线这${selectedCollection.length}个合集吗？`"
                @confirm="batchCollection($MAPS.collection.status.COLLECTION_STATUS_WAIT)"
              >
                <el-button
                  slot="reference"
                  type="warning"
                  plain
                  :disabled="!selectedCollection.length"
                  size="mini"
                >
                  <i v-if="batchingDown" class="el-icon-loading"></i>
                  <i v-else class="el-icon-sold-out"></i>批量下线
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                :title="`确定要批量删除所选 ${selectedCollection.length} 个合集？`"
                @confirm="batchDeleteCollection"
              >
                <el-button
                  slot="reference"
                  class="ml-10"
                  size="mini"
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  >批量删除</el-button
                >
              </el-popconfirm>
            </div>
          </el-collapse-transition>
        </template>

        <!-- 表格区 -->
        <el-table
          ref="refCollectionTable"
          :data="tableData"
          border
          stripe
          :default-sort="{
            order: 'ascending',
            prop: 'sort'
          }"
          class="hide-border"
          @sort-change="handleSortChange"
          @selection-change="changeSelectionCollection"
          @row-click="changeSelectionCollection"
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
            label="合集名称"
            min-width="130"
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
            label="作者"
            min-width="100"
            class-name="name-slot-cell"
            :show-overflow-tooltip="true"
            prop="userId"
          >
            <template #default="{ row, column }">
              <template v-if="row.userName || row[column.property]">
                <div class="name">
                  <span>{{ row.userName }}</span>
                </div>
                <div class="id">ID: {{ row[column.property] }}</div>
              </template>

              <template v-else>
                <div class="name">-</div>
              </template>
            </template>
          </el-table-column>

          <el-table-column label="来源" min-width="70" align="center" prop="source">
            <template #default="{ row, column }">
              <template v-if="$MAPS.collection.source.labelMap[row[column.property]]">
                <span
                  :class="[
                    'fs-12',
                    `status-${$MAPS.collection.source.classMap(row[column.property])}`
                  ]"
                  >{{ row[column.property] | labelCollectionSource }}</span
                >
              </template>

              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column
            label="图片数"
            min-width="90"
            align="center"
            class-name="name-slot-cell"
            :show-overflow-tooltip="true"
            sortable="custom"
            prop="imageCount"
          >
            <template #default="{ row, column }">
              <div>{{ row[column.property] | thousandSeparator | emptyReplace }}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="图片"
            min-width="300"
            class-name="name-slot-cell"
            align="left"
            prop="imageUrls"
          >
            <template #default="{ row, column }">
              <template v-if="row[column.property] && row[column.property].length">
                <template v-for="(photo, index) in row[column.property]">
                  <el-image
                    v-if="index <= 3"
                    :key="index"
                    class="link ml-5"
                    :src="photo"
                    style="width: 60px; height: 80px"
                    fit="contain"
                    @click="$doPreview(row[column.property], index)"
                  ></el-image>
                </template>
                <div
                  v-if="row[column.property] && row[column.property].length > 4"
                  class="view-all link"
                  @click="$doPreview(row[column.property], 0)"
                >
                  更多
                </div>
              </template>
              <div v-else class="name">-</div>
            </template>
          </el-table-column>

          <el-table-column label="状态" min-width="70" align="center" prop="status">
            <template #default="{ row, column }">
              <template v-if="$MAPS.collection.status.labelMap[row[column.property]]">
                <span
                  :class="[
                    'fs-12',
                    `status-${$MAPS.collection.status.classMap(row[column.property])}`
                  ]"
                  >{{ row[column.property] | labelCollectionStatus }}</span
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
                @ok="setCollectionSort($event, row, '__sortChanging')"
                >{{ row[column.property] }}</do-number-setter
              >
            </template>
          </el-table-column>

          <el-table-column
            v-if="!enableSelector"
            class-name="ctrl-td"
            width="156"
            align="left"
            label="操作"
          >
            <template v-if="writeable" #header>
              <dialog-edit-collection @ok="search(true)">
                <div class="btn-add-collection">
                  <el-button size="mini" icon="el-icon-plus" type="success">添加合集</el-button>
                </div>
              </dialog-edit-collection>
            </template>

            <template #default="{ row }">
              <dialog-edit-collection
                :collection-line="row"
                :disabled="+row.source !== +$MAPS.collection.source.COLLECTION_SOURCE_PLATFORM"
                @ok="search(false)"
              >
                <el-button class="edit-collection-btn" plain type="primary" size="mini">
                  <i class="el-icon-edit"></i>
                </el-button>
              </dialog-edit-collection>

              <el-popconfirm
                class="delete-collection-wrapper"
                title="确定要删除该合集？"
                @confirm="deleteCollection(row)"
              >
                <el-button
                  slot="reference"
                  class="delete-collection-btn"
                  plain
                  type="danger"
                  size="mini"
                >
                  <i v-if="row.__deleting" class="el-icon-loading"></i>
                  <i v-else class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                v-if="row.status === $MAPS.collection.status.COLLECTION_STATUS_WAIT"
                title="确定上线吗？"
                @confirm="
                  toSwitchCollection(
                    row,
                    $MAPS.collection.status.COLLECTION_STATUS_ONLINE,
                    '__publishing'
                  )
                "
              >
                <el-button slot="reference" type="success" plain size="mini">
                  <el-tooltip content="上线">
                    <i :class="row.__publishing ? 'el-icon-loading' : 'el-icon-s-promotion'"></i>
                  </el-tooltip>
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                v-if="row.status === $MAPS.collection.status.COLLECTION_STATUS_ONLINE"
                title="确定下线吗？"
                @confirm="
                  toSwitchCollection(
                    row,
                    $MAPS.collection.status.COLLECTION_STATUS_WAIT,
                    '__revoking'
                  )
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
import { labelCollectionSource, labelCollectionStatus } from '../_filters'
import {
  requestCollectionList,
  requestDeleteCollection,
  requestSetCollectionSort,
  requestSwitchCollection
} from '../_api'

import DialogEditCollection from './DialogEditCollection.vue'
import generalCRUD from '@/mixins/generalCRUD'

export default {
  name: 'CollectionList',
  components: {
    DialogEditCollection
  },
  filters: {
    labelCollectionSource,
    labelCollectionStatus
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
    const defaultSort = { prop: 'sort', order: 'asc' }

    return {
      defaultSort,
      query: {
        name: '',
        userId: this.$route.query.userId || '',
        source: '',

        orderBy: defaultSort.prop,
        seq: defaultSort.order
      },
      batchingUp: false,
      batchingDown: false,
      selectedCollection: []
    }
  },
  computed: {
    writeable() {
      return true
    }
  },
  created() {
    this.search(true)
  },
  methods: {
    search(toFirstPage = false) {
      if (toFirstPage) {
        this.query.curPage = 1
      }

      this.tableLoading = true
      requestCollectionList(this.query)
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
    setCollectionSort(sort, collectionLine, loadingAttr) {
      this.$set(collectionLine, loadingAttr, true)
      requestSetCollectionSort(collectionLine.id, sort)
        .then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.$set(collectionLine, loadingAttr, false)
        })
    },
    batchDeleteCollection() {
      this.tableLoading = true
      const ids = this.selectedCollection.map((v) => v.id)
      requestDeleteCollection(ids)
        .then(() => {
          this.$message({
            type: 'success',
            message: '批量删除合集成功！'
          })
          this.$refs.refCollectionTable.clearSelection()
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoading = false
        })
    },
    deleteCollection(collectionLine) {
      this.$set(collectionLine, '__deleting', true)
      requestDeleteCollection([collectionLine.id])
        .then(() => {
          if (this.tableData.length === 1) {
            this.query.curPage = this.query.curPage - 1 || 1
          }
          this.$message({
            message: '合集删除成功',
            type: 'success'
          })
          this.search()
        })
        .finally(() => {
          this.$set(collectionLine, '__deleting', false)
        })
    },
    toSwitchCollection(collectionLine, newStatus, loadingAttr) {
      const isPublish = newStatus === this.$MAPS.collection.status.COLLECTION_STATUS_ONLINE
      this.$set(collectionLine, loadingAttr, true)
      requestSwitchCollection([collectionLine.id], newStatus)
        .then(() => {
          this.$message({
            message: `合集${isPublish ? '上线' : '下线'}成功`,
            type: 'success'
          })
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.$set(collectionLine, loadingAttr, false)
        })
    },
    // 批量发布/批量下线
    batchCollection(action) {
      if (action === this.$MAPS.collection.status.COLLECTION_STATUS_WAIT) {
        this.batchingDown = true
      } else {
        this.batchingUp = true
      }
      requestSwitchCollection(
        this.selectedCollection.map((item) => item.id),
        action
      )
        .then((res) => {
          this.$message({
            type: 'success',
            message: `批量${this.batchingDown ? '下线' : '发布'}成功`
          })
          this.$refs.refCollectionTable.clearSelection()
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.batchingDown = false
          this.batchingUp = false
        })
    },

    changeSelectionCollection(selectedCollection) {
      if (!this.enableSelector && this.$utils.getRealType(selectedCollection) === 'array') {
        this.selectedCollection = selectedCollection
      } else {
        const result = this.$utils.deepClone(
          this.$utils.getRealType(selectedCollection) === 'array'
            ? selectedCollection[0]
            : selectedCollection || {}
        )
        this.$emit('input', result)
        this.$emit('on-change', result)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collection-list {
  box-sizing: border-box;
}
</style>
