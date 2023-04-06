<!--
@file: UsualPaperList.vue
@createBy: koujianfeng
@description: 内容管理
 -->
<template>
  <div class="usual-paper-list">
    <div v-if="!$route.meta.isNavTab" class="main-title">
      <h2>{{ $route.meta.title }}</h2>
    </div>

    <div class="wrapper">
      <!-- 搜索区域 -->
      <do-filter-panel @search="search(true)">
        <el-form inline label-width="90px" @submit.native.prevent>
          <el-form-item label="作者">
            <client-user-select
              v-model="query.userId"
              placeholder="不限"
              @change="search(true)"
            ></client-user-select>
          </el-form-item>

          <el-form-item label="二级分类">
            <sub-cate-select
              v-model="query.subcategoryIds"
              multiple
              :collapse-tags="true"
              placeholder="不限"
              @change="search(true)"
            ></sub-cate-select>
          </el-form-item>

          <el-form-item label="属性">
            <el-select v-model="query.downloadType" @change="search(true)">
              <el-option-group>
                <el-option value="" label="不限"></el-option>
              </el-option-group>

              <el-option-group>
                <el-option
                  v-for="(label, code) in $MAPS.paper.downType.labelMap"
                  :key="code"
                  :value="code"
                  :label="label"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="query.status" size="small" @change="search(true)">
              <el-radio-button key="all" label="">不限</el-radio-button>
              <el-radio-button
                v-for="(label, value) in $MAPS.paper.status.labelMap"
                :key="value"
                :label="value"
                >{{ label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>

          <el-form-item label="来源">
            <el-radio-group v-model="query.source" size="small" @change="search(true)">
              <el-radio-button key="all" label="">不限</el-radio-button>
              <el-radio-button
                v-for="(label, value) in $MAPS.paper.source.labelMap"
                :key="+value"
                :label="+value"
                >{{ label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>

          <el-form-item label="精选">
            <el-radio-group v-model="query.isRecommend" size="small" @change="search(true)">
              <el-radio-button key="all" label="">不限</el-radio-button>
              <el-radio-button :key="true" :label="true">精选</el-radio-button>
              <el-radio-button :key="false" :label="false">非精选</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </do-filter-panel>

      <table-wrap v-loading="tableLoading">
        <template #hd>
          <!-- 批量操作区域 -->
          <el-collapse-transition>
            <div v-show="selectedUsualPaper.length" class="hd bordered">
              <span>批量操作：</span>

              <dialog-batch-recommend
                :selected-lines="selectedUsualPaper"
                @ok="clearTableSelection()"
              >
                <el-button size="mini" type="" plain class="ml-10" icon="el-icon-star-off"
                  >批量精选</el-button
                >
              </dialog-batch-recommend>

              <dialog-batch-client-user
                :selected-lines="selectedUsualPaper"
                @ok="clearTableSelection()"
              >
                <el-button size="mini" type="" plain class="ml-10" icon="el-icon-thumb"
                  >批量设置作者</el-button
                >
              </dialog-batch-client-user>

              <dialog-batch-collection
                :disabled="!canSetCollection"
                :selected-lines="selectedUsualPaper"
                @ok="clearTableSelection()"
              >
                <el-button size="mini" type="" plain class="ml-10" icon="el-icon-box"
                  >批量设置合集</el-button
                >
              </dialog-batch-collection>

              <dialog-batch-cate :selected-lines="selectedUsualPaper" @ok="clearTableSelection()">
                <el-button size="mini" type="" plain class="ml-10" icon="el-icon-magic-stick"
                  >批量设置分类</el-button
                >
              </dialog-batch-cate>

              <el-popconfirm
                class="online-usual-paper-wrapper ml-10"
                :title="`确定要发布${selectedUsualPaper.length}个内容吗？`"
                @confirm="batchUsualPaper($MAPS.paper.status.USUAL_PAPER_STATUS_ONLINE)"
              >
                <el-button
                  slot="reference"
                  type="success"
                  plain
                  :disabled="!selectedUsualPaper.length"
                  size="mini"
                >
                  <i v-if="batchingUp" class="el-icon-loading"></i>
                  <i v-else class="el-icon-s-promotion"></i>批量发布
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                class="offline-usual-paper-wrapper ml-10"
                :title="`确定下线这${selectedUsualPaper.length}个内容吗？`"
                @confirm="batchUsualPaper($MAPS.paper.status.USUAL_PAPER_STATUS_WAIT)"
              >
                <el-button
                  slot="reference"
                  type="warning"
                  plain
                  :disabled="!selectedUsualPaper.length"
                  size="mini"
                >
                  <i v-if="batchingDown" class="el-icon-loading"></i>
                  <i v-else class="el-icon-sold-out"></i>批量下线
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                :title="`确定要批量删除所选 ${selectedUsualPaper.length} 个内容？`"
                @confirm="batchDeleteUsualPaper"
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
          ref="refUsualPaperTable"
          :data="tableData"
          border
          stripe
          :default-sort="{
            order: '',
            prop: ''
          }"
          class="hide-border"
          @sort-change="handleSortChange"
          @selection-change="changeSelectionUsualPaper"
          @row-click="changeSelectionUsualPaper"
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
            width="90"
            class-name="img-td"
            fixed="left"
            align="center"
            prop="imageUrl"
          >
            <template #default="{ row, column }">
              <account-photo
                v-model="row.preUrl"
                :pre-url="[row[column.property]]"
                :logoff="row.isLogoff"
                :report="row.isReport"
              ></account-photo>
            </template>
          </el-table-column>

          <el-table-column label="" width="90" class-name="cell-with-config" fixed="left" prop="id">
            <template #default="{ row, column }">
              <dialog-batch-recommend
                class="cell-config-box"
                :selected-lines="[row]"
                @ok="clearTableSelection()"
              >
                <i class="el-icon-setting"></i>
              </dialog-batch-recommend>

              <div class="fs-12">ID: {{ row[column.property] }}</div>
              <div
                v-if="$MAPS.paper.status.labelMap[row.status]"
                :class="['fs-12', `status-${$MAPS.paper.status.classMap(row.status)}`]"
              >
                {{ row.status | labelPaperStatus }}
              </div>
              <el-tag
                v-if="[1, true, 'true'].includes(row.isRecommend)"
                size="mini"
                effect="dark"
                type="danger"
                disable-transitions
                >精选</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column
            label="作者"
            min-width="100"
            class-name="name-slot-cell cell-with-config"
            :show-overflow-tooltip="true"
            prop="userId"
          >
            <template #default="{ row, column }">
              <dialog-batch-client-user
                v-if="!row.userId"
                class="cell-config-box"
                :selected-lines="[row]"
                @ok="clearTableSelection()"
              >
                <i class="el-icon-setting"></i>
              </dialog-batch-client-user>

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

          <el-table-column
            label="合集名称"
            min-width="100"
            class-name="name-slot-cell cell-with-config"
            :show-overflow-tooltip="true"
            prop="collectionId"
          >
            <template #default="{ row, column }">
              <dialog-batch-collection
                class="cell-config-box"
                :selected-lines="[row]"
                @ok="clearTableSelection()"
              >
                <i class="el-icon-setting"></i>
              </dialog-batch-collection>

              <template v-if="row.collectionName || row[column.property]">
                <div class="name">
                  <span>{{ row.collectionName }}</span>
                </div>
                <div class="id">ID: {{ row[column.property] }}</div>
              </template>

              <template v-else>
                <div class="name">-</div>
              </template>
            </template>
          </el-table-column>

          <el-table-column
            label="一级分类"
            min-width="100"
            class-name="name-slot-cell cell-with-config"
            :show-overflow-tooltip="true"
            prop="categoryId"
          >
            <template #default="{ row, column }">
              <dialog-batch-cate
                class="cell-config-box"
                :selected-lines="[row]"
                @ok="clearTableSelection()"
              >
                <i class="el-icon-setting"></i>
              </dialog-batch-cate>

              <template v-if="row.categoryName || row[column.property]">
                <div class="name">
                  <span>{{ row.categoryName }}</span>
                </div>
                <div class="id">ID: {{ row[column.property] }}</div>
              </template>

              <template v-else>
                <div class="name">-</div>
              </template>
            </template>
          </el-table-column>

          <el-table-column
            label="二级分类"
            class-name="cell-with-config"
            align="center"
            min-width="220"
            prop="subcategories"
          >
            <template #default="{ row, column }">
              <dialog-batch-cate
                class="cell-config-box"
                :selected-lines="[row]"
                @ok="clearTableSelection()"
              >
                <i class="el-icon-setting"></i>
              </dialog-batch-cate>

              <div
                v-if="row[column.property] && row[column.property].length"
                class="do-tag-list do-scrollbar"
              >
                <el-tag
                  v-for="(eachLabel, indexLabel) in row[column.property]"
                  :key="indexLabel"
                  size="mini"
                  type="info"
                  disable-transitions
                  >{{ eachLabel.name }}</el-tag
                >
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>

          <el-table-column label="来源" min-width="70" align="center" prop="source">
            <template #default="{ row, column }">
              <template v-if="$MAPS.paper.source.labelMap[row[column.property]]">
                <span
                  :class="['fs-12', `status-${$MAPS.paper.source.classMap(row[column.property])}`]"
                  >{{ row[column.property] | labelPaperSource }}</span
                >
              </template>

              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column label="属性" min-width="90" prop="isVip">
            <template #default="{ row }">
              <div class="double-switch-box">
                <el-switch
                  v-model="row.isVip"
                  size="small"
                  :disabled="!writeable || row.__blockLoading"
                  :active-value="true"
                  :inactive-value="false"
                  @change="toChangeUsualPaperProperty(row, 'isVip')"
                ></el-switch>
                <span class="fs-12 color-gray pl-gap-xs">
                  <span>会员</span>
                </span>

                <div v-if="row.__blockLoading" class="double-switch-ing">
                  <i class="el-icon-loading"></i>
                </div>

                <el-switch
                  v-model="row.isAd"
                  size="small"
                  :disabled="!writeable || row.__blockLoading"
                  :active-value="true"
                  :inactive-value="false"
                  @change="toChangeUsualPaperProperty(row, 'isAd')"
                ></el-switch>
                <span class="fs-12 color-gray pl-gap-xs">广告</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="发布时间"
            align="right"
            width="154"
            class-name="name-slot-cell"
            prop="enableTime"
          >
            <template #default="{ row, column }">
              <div class="name">
                {{ row[column.property] | dateFormat('YYYY-MM-dd hh:mm') | emptyReplace }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="修改时间"
            align="right"
            width="154"
            class-name="name-slot-cell"
            prop="updateTime"
          >
            <template #default="{ row, column }">
              <div class="name">
                {{ row[column.property] | dateFormat('YYYY-MM-dd hh:mm') | emptyReplace }}
              </div>
              <div v-if="row.operator" class="id">{{ row.operator }}</div>
            </template>
          </el-table-column>

          <el-table-column
            v-if="!enableSelector"
            class-name="ctrl-td"
            width="156px"
            align="left"
            fixed="right"
            label="操作"
          >
            <template v-if="writeable" #header>
              <dialog-edit-usual-paper :paper-type="paperType" @ok="search(true)">
                <div class="btn-add-usual-paper">
                  <el-button size="mini" icon="el-icon-plus" type="success">添加内容</el-button>
                </div>
              </dialog-edit-usual-paper>
            </template>

            <template #default="{ row }">
              <dialog-edit-usual-paper
                :usual-paper-line="row"
                :paper-type="paperType"
                @ok="search(false)"
              >
                <el-button class="edit-usual-paper-btn" plain type="primary" size="mini">
                  <i class="el-icon-edit"></i>
                </el-button>
              </dialog-edit-usual-paper>

              <el-popconfirm
                class="delete-usual-paper-wrapper"
                title="确定要删除该内容？"
                @confirm="deleteUsualPaper(row)"
              >
                <el-button
                  slot="reference"
                  class="delete-usual-paper-btn"
                  plain
                  type="danger"
                  size="mini"
                >
                  <i v-if="row.__deleting" class="el-icon-loading"></i>
                  <i v-else class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>

              <el-popconfirm
                v-if="row.status === $MAPS.paper.status.USUAL_PAPER_STATUS_WAIT"
                title="确定上线吗？"
                @confirm="
                  toSwitchUsualPaper(
                    row,
                    $MAPS.paper.status.USUAL_PAPER_STATUS_ONLINE,
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
                v-if="row.status === $MAPS.paper.status.USUAL_PAPER_STATUS_ONLINE"
                title="确定下线吗？"
                @confirm="
                  toSwitchUsualPaper(row, $MAPS.paper.status.USUAL_PAPER_STATUS_WAIT, '__revoking')
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
import { labelPaperSource, labelPaperStatus } from '../_filters'
import {
  requestUsualPaperList,
  requestDeleteUsualPaper,
  requestSwitchUsualPaper,
  requestChangeUsualPaperProperty
} from '../_api'

import DialogEditUsualPaper from './DialogEditUsualPaper.vue'
import DialogBatchRecommend from './DialogBatchRecommend.vue'
import DialogBatchClientUser from './DialogBatchClientUser.vue'
import DialogBatchCollection from './DialogBatchCollection.vue'
import DialogBatchCate from './DialogBatchCate.vue'
import generalCRUD from '@/mixins/generalCRUD'

export default {
  name: 'UsualPaperList',
  components: {
    DialogEditUsualPaper,
    DialogBatchRecommend,
    DialogBatchClientUser,
    DialogBatchCollection,
    DialogBatchCate
  },
  filters: {
    labelPaperSource,
    labelPaperStatus
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
        type: '',
        userId: this.$route.query.userId || '',
        downloadType: '',
        subcategoryIds: '',
        status: '',
        source: '',
        isRecommend: '',

        orderBy: defaultSort.prop,
        seq: defaultSort.order
      },
      batchingUp: false,
      batchingDown: false,
      selectedUsualPaper: []
    }
  },
  computed: {
    writeable() {
      return true
    },
    paperType() {
      return this.$route.params.type || 'static'
    },
    canSetCollection() {
      if (!this.selectedUsualPaper.length) {
        return false
      }
      if (this.selectedUsualPaper.length === 1) {
        return true // 选了一个的话, 肯定可以设置
      }
      const existInfo = this.selectedUsualPaper.find((e) => e.userId)
      if (existInfo) {
        // 要么没绑定作者，要么都绑定一样作者
        const theUserId = existInfo.userId
        return this.selectedUsualPaper.every((e) => !e.userId || e.userId === theUserId)
      }
      return true // 都没有绑定作者
    }
  },
  watch: {
    paperType() {
      this.doInit()
    }
  },
  created() {
    this.doInit()
  },
  methods: {
    doInit() {
      this.query.type = this.paperType
      this.search(true)
    },
    search(toFirstPage = false) {
      if (toFirstPage) {
        this.query.curPage = 1
      }

      this.tableLoading = true
      requestUsualPaperList(this.query)
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
    batchDeleteUsualPaper() {
      this.tableLoading = true
      const ids = this.selectedUsualPaper.map((v) => v.id)
      requestDeleteUsualPaper(ids)
        .then(() => {
          this.$message({
            type: 'success',
            message: '批量删除内容成功！'
          })
          this.clearTableSelection(true)
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoading = false
        })
    },
    deleteUsualPaper(usualPaperLine) {
      this.$set(usualPaperLine, '__deleting', true)
      requestDeleteUsualPaper([usualPaperLine.id])
        .then(() => {
          if (this.tableData.length === 1) {
            this.query.curPage = this.query.curPage - 1 || 1
          }
          this.$message({
            message: '内容删除成功',
            type: 'success'
          })
          this.search()
        })
        .finally(() => {
          this.$set(usualPaperLine, '__deleting', false)
        })
    },
    toSwitchUsualPaper(usualPaperLine, newStatus, loadingAttr) {
      const isPublish = newStatus === this.$MAPS.paper.status.USUAL_PAPER_STATUS_ONLINE
      this.$set(usualPaperLine, loadingAttr, true)
      requestSwitchUsualPaper([usualPaperLine.id], newStatus)
        .then(() => {
          this.$message({
            message: `内容${isPublish ? '上线' : '下线'}成功`,
            type: 'success'
          })
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.$set(usualPaperLine, loadingAttr, false)
        })
    },
    // 批量发布/批量下线
    batchUsualPaper(action) {
      if (action === this.$MAPS.paper.status.USUAL_PAPER_STATUS_WAIT) {
        this.batchingDown = true
      } else {
        this.batchingUp = true
      }
      requestSwitchUsualPaper(
        this.selectedUsualPaper.map((item) => item.id),
        action
      )
        .then((res) => {
          this.$message({
            type: 'success',
            message: `批量${this.batchingDown ? '下线' : '发布'}成功`
          })
          this.clearTableSelection()
        })
        .catch(() => {})
        .finally(() => {
          this.batchingDown = false
          this.batchingUp = false
        })
    },
    toChangeUsualPaperProperty(row, prop) {
      // 广告开启前提，会员必须开启，否则自动开启会员。
      if (prop === 'isAd' && row.isAd && !row.isVip) {
        row.isVip = true
      } else if (prop === 'isVip' && !row.isVip && row.isAd) {
        row.isAd = false
      }
      const { isVip, isAd } = row
      this.$set(row, '__blockLoading', true)
      requestChangeUsualPaperProperty({
        ids: [row.id],
        isVip,
        isAd
      })
        .then(() => {})
        .catch(() => {
          this.search()
        })
        .finally(() => {
          this.$set(row, '__blockLoading', false)
        })
    },

    changeSelectionUsualPaper(selectedUsualPaper) {
      if (!this.enableSelector && this.$utils.getRealType(selectedUsualPaper) === 'array') {
        this.selectedUsualPaper = selectedUsualPaper
      } else {
        const result = this.$utils.deepClone(
          this.$utils.getRealType(selectedUsualPaper) === 'array'
            ? selectedUsualPaper[0]
            : selectedUsualPaper || {}
        )
        this.$emit('input', result)
        this.$emit('on-change', result)
      }
    },
    clearTableSelection(toFirstPage = false) {
      this.$refs.refUsualPaperTable && this.$refs.refUsualPaperTable.clearSelection()
      this.search(toFirstPage)
    }
  }
}
</script>

<style lang="less" scoped>
.usual-paper-list {
  box-sizing: border-box;
}
</style>
