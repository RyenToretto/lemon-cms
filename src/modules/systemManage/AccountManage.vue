<!--
@file: AccountManage.vue
@createBy: sunjiahao
@description: 账号管理
 -->
<template>
  <div class="manager-page">
    <div v-if="!$route.meta.isNavTab" class="main-title">
      <h2>{{ $route.meta.title }}</h2>
    </div>

    <div class="wrapper">
      <!-- 搜索区域 -->
      <do-filter-panel @search="search(true)">
        <el-form inline label-width="100px" @submit.native.prevent>
          <el-form-item label="账号名">
            <el-input
              v-model="query.username"
              style="width: 190px"
              @keyup.enter.native="search(true)"
            ></el-input>
          </el-form-item>

          <el-form-item label="角色">
            <el-select v-model="query.role" :filterable="true" @change="search(true)">
              <el-option value="" label="不限"></el-option>
              <el-option
                v-for="(item, index) in $MAPS.system.account.role"
                :key="index"
                :value="index"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="权限">
            <el-select v-model="query.permission" :filterable="true" @change="search(true)">
              <el-option value="" label="不限"></el-option>
              <el-option
                v-for="item in permissionData"
                :key="item.key"
                :label="item.name"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="query.status" @change="search(true)">
              <el-option value="" label="不限"></el-option>
              <el-option
                v-for="(item, index) in $MAPS.system.account.status"
                :key="index"
                :value="index"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </do-filter-panel>

      <!-- 表格区 -->
      <table-wrap v-loading="tableLoading" :disabled-column-config="true">
        <!-- <div class="table-wrap do-card"
           v-loading="tableLoading">
        <div class="bd" v-waterMark> -->
        <el-table
          :data="tableData"
          border
          :default-sort="{
            prop: 'ascending',
            order: 'sort'
          }"
          class="hide-border"
          @sort-change="handleSortChange"
        >
          <el-table-column
            label="ID"
            min-width="100px"
            align="center"
            :show-overflow-tooltip="true"
            prop="id"
          ></el-table-column>

          <el-table-column
            label="账号名"
            min-width="100px"
            align="center"
            :show-overflow-tooltip="true"
            class-name="name-slot-cell"
            prop="username"
          >
            <template #default="{ row, column }">
              <div class="name">{{ row[column.property] }}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="姓名"
            min-width="100px"
            align="center"
            :show-overflow-tooltip="true"
            prop="realName"
          ></el-table-column>

          <el-table-column
            label="角色"
            min-width="100px"
            align="center"
            :show-overflow-tooltip="true"
            prop="role"
          >
            <template #default="{ row, column }">
              {{ $MAPS.system.account.role[row[column.property]] }}
            </template>
          </el-table-column>

          <el-table-column label="权限" align="center" min-width="220px" prop="permission">
            <template #default="{ row, column }">
              <div
                v-if="row[column.property] && row[column.property].length"
                class="tag-list do-scrollbar"
              >
                <template v-for="(eachKey, index) in row[column.property].map((e) => e.key)">
                  <el-tag
                    v-if="$MAPS.permission.labelMap[eachKey]"
                    :key="index"
                    style="margin: 3px"
                    size="mini"
                    type="info"
                    disable-transitions
                    >{{ eachKey | labelPermission }}</el-tag
                  >
                </template>
              </div>

              <dialog-edit-auth
                v-if="$store.state.role === 'superadmin' && row.role !== 'superadmin'"
                :account-line="row"
                @ok="search()"
              >
                <span class="tag-entry-btn link"><i class="el-icon-plus"></i> 添加权限</span>
              </dialog-edit-auth>
            </template>
          </el-table-column>

          <el-table-column
            v-if="$store.state.role === 'superadmin'"
            class-name="ctrl-td"
            width="180px"
            align="left"
            label="操作"
          >
            <template slot="header">
              <el-button size="mini" icon="el-icon-plus" type="success" @click="handleAdd"
                >添加账号</el-button
              >
            </template>

            <template #default="{ row }">
              <div>
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  :disabled="row.role === 'superadmin'"
                  icon="el-icon-edit"
                  @click="handleEdit(row)"
                ></el-button>

                <el-popconfirm title="确定删除吗？" @confirm="handleDel(row)">
                  <el-button
                    slot="reference"
                    type="danger"
                    plain
                    size="mini"
                    :disabled="row.role === 'superadmin'"
                    icon="el-icon-delete"
                    :loading="row._deleting"
                  ></el-button>
                </el-popconfirm>

                <el-popconfirm
                  v-if="row.status === 'enable'"
                  title="确定禁用吗？"
                  @confirm="handleStatus(row, 'disabled')"
                >
                  <el-button
                    slot="reference"
                    class="ban-account-btn"
                    type="danger"
                    plain
                    :disabled="row.role === 'superadmin'"
                    size="mini"
                    :loading="row._disabled"
                    >禁用</el-button
                  >
                </el-popconfirm>

                <el-popconfirm v-else title="确定启用吗？" @confirm="handleStatus(row, 'enable')">
                  <el-button
                    slot="reference"
                    type="success"
                    plain
                    size="mini"
                    :disabled="row.role === 'superadmin'"
                    :loading="row._enable"
                    >启用</el-button
                  >
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- </div>
      </div> -->
      </table-wrap>

      <base-pagination
        :current-page="query.pageNum"
        :page-size="query.pageSize"
        :total="total"
        @current-change="handlePnChange"
        @size-change="handleSizeChange"
      ></base-pagination>
    </div>

    <add-account-info ref="addAccountInfo" @ok="search"></add-account-info>
  </div>
</template>

<script>
import { labelPermission } from './_filters'
import { getAccountList, delAccountInfo, accountStatus } from './_api'

import AddAccountInfo from './_components/AddAccountInfo.vue'
import DialogEditAuth from './_components/DialogEditAuth.vue'
import generalCRUD from '@/mixins/generalCRUD'

export default {
  name: 'AccountManage',
  components: {
    AddAccountInfo,
    DialogEditAuth
  },
  filters: {
    labelPermission
  },
  mixins: [generalCRUD],
  props: {},
  data() {
    return {
      showPopup: false,
      userName: [],
      permissionData: [],
      query: {
        username: '',
        role: '',
        permission: '',
        status: ''
      }
    }
  },
  computed: {},
  watch: {},

  created() {
    this.search(true)
    this.AllPermissionData()
  },
  mounted() {},
  unmounted() {},
  methods: {
    search(flag) {
      if (flag) {
        this.query.pageNum = 1
      }
      this.tableLoading = true
      getAccountList(this.query)
        .then((res) => {
          this.total = res.totalSize
          this.tableData = res.data
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    handleAdd() {
      this.$refs.addAccountInfo.show()
    },
    handleEdit(data) {
      this.$refs.addAccountInfo.show(data)
    },
    handleDel(data) {
      this.$set(data, '_deleting', true)
      delAccountInfo({ ids: [data.id] })
        .then((res) => {
          const newPageNum = this.query.pageNum
          if (this.tableData.length === 1) {
            this.query.pageNum = newPageNum - 1 || 1
          }
          this.$message({ type: 'success', message: '删除成功' })
          this.search()
        })
        .finally(() => {
          this.$set(data, '_deleting', false)
        })
    },
    handleStatus(data, status) {
      this.$set(data, `_${status}`, true)
      accountStatus({ ids: [data.id], status })
        .then((res) => {
          const message = status === 'enable' ? '启用成功' : '禁用成功'
          this.$message({ type: 'success', message })
          this.search()
        })
        .finally(() => {
          this.$set(data, `_${status}`, false)
        })
    },
    async AllPermissionData() {
      const judgeAuth = (authInfo) => {
        if (authInfo.children && authInfo.children.length) {
          if (authInfo.children.length > 1) {
            authInfo.children.forEach((item) => {
              this.permissionData.push({
                key: item.key,
                name: `${authInfo.name}[${item.name}]`
              })
            })
          } else {
            this.permissionData.push({
              key: authInfo.children[0].key,
              name: authInfo.name
            })
          }
        }
      }
      this.$MAPS.permission.authPanel.forEach((eachAuth) => {
        judgeAuth(eachAuth)
        if (eachAuth.subModule) {
          eachAuth.subModule.forEach((eachSub) => {
            judgeAuth(eachSub)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '/src/assets/css/common/index.less';

.dialog-edit-auth {
  display: inline-block;
}

.tag-list {
  max-height: 3.6em;
  overflow-y: auto;
  .el-tag {
    margin: 2px;
  }
}
.tag-entry-btn {
  display: inline-block;
  padding: 5px;
  font-size: 12px;
  line-height: 16px;
  background: #f5f5f5;
  color: #999;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 2px;
  &.link {
    color: #2691ff;
    text-decoration: none;
    cursor: pointer;
  }
}
.ban-account-btn {
  min-width: 64px;
}
</style>
