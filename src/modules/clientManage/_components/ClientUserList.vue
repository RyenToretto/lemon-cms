<!--
@file: ClientUserList.vue
@createBy: koujianfeng
@description: 用户管理
 -->
<template>
  <div class="client-user-list">
    <div v-if="!$route.meta.isNavTab" class="main-title">
      <h2>{{ $route.meta.title }}</h2>
    </div>

    <div class="wrapper">
      <!-- 搜索区域 -->
      <do-filter-panel @search="search(true)">
        <el-form inline label-width="90px" @submit.native.prevent>
          <el-form-item label="用户昵称">
            <el-input
              v-model="query.nickname"
              clearable
              placeholder="请输入用户昵称"
              @keyup.enter.native="search(true)"
            ></el-input>
          </el-form-item>
        </el-form>
      </do-filter-panel>

      <table-wrap v-loading="tableLoading">
        <template #hd>
          <!-- 批量操作区域 -->
          <el-collapse-transition>
            <div v-show="selectedClientUser.length" class="hd bordered">
              <span>批量操作：</span>

              <el-popconfirm
                :title="`确定要批量删除所选 ${selectedClientUser.length} 个用户？`"
                @confirm="batchDeleteClientUser"
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
          ref="refClientUserTable"
          :data="tableData"
          border
          stripe
          :default-sort="{
            order: '',
            prop: ''
          }"
          class="hide-border"
          @sort-change="handleSortChange"
          @selection-change="changeSelectionClientUser"
          @row-click="changeSelectionClientUser"
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
            label="头像"
            class-name="img-td"
            width="120"
            align="center"
            prop="avatar"
          >
            <template #default="{ row, column }">
              <account-photo v-model="row[column.property]" :logoff="row.isLogoff"></account-photo>
            </template>
          </el-table-column>

          <el-table-column
            label="用户昵称"
            min-width="140"
            class-name="name-slot-cell"
            :show-overflow-tooltip="true"
            sortable="custom"
            prop="id"
          >
            <template #default="{ row, column }">
              <div class="name">{{ row.nickname | emptyReplace }}</div>
              <div class="id">ID: {{ row[column.property] | emptyReplace }}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="作品数"
            min-width="130"
            align="center"
            class-name="name-slot-cell"
            :show-overflow-tooltip="true"
            sortable="custom"
            prop="worksCount"
          >
            <template #default="{ row, column }">
              <div v-if="+row[column.property] > 0" class="link" @click="toUsualPaperPage(row)">
                {{ row[column.property] | thousandSeparator }}
              </div>
              <div v-else class="name">-</div>
            </template>
          </el-table-column>

          <el-table-column
            label="合集数"
            min-width="130"
            align="center"
            class-name="name-slot-cell"
            :show-overflow-tooltip="true"
            sortable="custom"
            prop="collectionCount"
          >
            <template #default="{ row, column }">
              <div v-if="+row[column.property] > 0" class="link" @click="toCollectionPage(row)">
                {{ row[column.property] | thousandSeparator }}
              </div>
              <div v-else class="name">-</div>
            </template>
          </el-table-column>

          <el-table-column
            v-if="!enableSelector"
            class-name="ctrl-td"
            width="124px"
            align="left"
            label="操作"
          >
            <template v-if="writeable" #header>
              <dialog-edit-client-user @ok="search(true)">
                <div class="btn-add-client-user">
                  <el-button size="mini" icon="el-icon-plus" type="success">添加用户</el-button>
                </div>
              </dialog-edit-client-user>
            </template>

            <template #default="{ row }">
              <dialog-edit-client-user :client-user-line="row" @ok="search(false)">
                <el-button class="edit-client-user-btn" plain type="primary" size="mini">
                  <i class="el-icon-edit"></i>
                </el-button>
              </dialog-edit-client-user>

              <el-popconfirm
                class="delete-client-user-wrapper"
                title="确定要删除该用户？"
                @confirm="deleteClientUser(row)"
              >
                <el-button
                  slot="reference"
                  class="delete-client-user-btn"
                  plain
                  type="danger"
                  size="mini"
                >
                  <i v-if="row.__deleting" class="el-icon-loading"></i>
                  <i v-else class="el-icon-delete"></i>
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
import { requestClientUserList, requestDeleteClientUser } from '../_api'

import DialogEditClientUser from './DialogEditClientUser.vue'
import generalCRUD from '@/mixins/generalCRUD'

export default {
  name: 'ClientUserList',
  components: {
    DialogEditClientUser
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
        nickname: '',

        orderBy: defaultSort.prop,
        seq: defaultSort.order
      },
      selectedClientUser: []
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
      requestClientUserList(this.query)
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
    batchDeleteClientUser() {
      this.tableLoading = true
      const ids = this.selectedClientUser.map((v) => v.id)
      requestDeleteClientUser(ids)
        .then(() => {
          this.$message({
            type: 'success',
            message: '批量删除用户成功！'
          })
          this.$refs.refClientUserTable.clearSelection()
          this.search()
        })
        .catch(() => {})
        .finally(() => {
          this.tableLoading = false
        })
    },
    deleteClientUser(clientUserLine) {
      this.$set(clientUserLine, '__deleting', true)
      requestDeleteClientUser([clientUserLine.id])
        .then(() => {
          if (this.tableData.length === 1) {
            this.query.curPage = this.query.curPage - 1 || 1
          }
          this.$message({
            message: '用户删除成功',
            type: 'success'
          })
          this.search()
        })
        .finally(() => {
          this.$set(clientUserLine, '__deleting', false)
        })
    },
    toUsualPaperPage(clientUserLine) {
      this.$router.push({ path: '/content/paper/static', query: { userId: clientUserLine.id } })
    },
    toCollectionPage(clientUserLine) {
      this.$router.push({ path: '/operate/collection', query: { userId: clientUserLine.id } })
    },

    changeSelectionClientUser(selectedClientUser) {
      if (!this.enableSelector && this.$utils.getRealType(selectedClientUser) === 'array') {
        this.selectedClientUser = selectedClientUser
      } else {
        const result = this.$utils.deepClone(
          this.$utils.getRealType(selectedClientUser) === 'array'
            ? selectedClientUser[0]
            : selectedClientUser || {}
        )
        this.$emit('input', result)
        this.$emit('on-change', result)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.client-user-list {
  box-sizing: border-box;
}
</style>
