<!--
@file: DialogEditAuth.vue
@createBy: koujianfeng
@description: 添加权限 弹框
 -->
<template>
  <div class="dialog-edit-auth">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="edit-auth-tooltip"></div>

      <div class="click-edit-auth" @click="showDialogEditAuth">
        <slot></slot>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogEditAuth"
      :visible.sync="dialogEditAuth"
      class="dialog-edit-auth-box"
      :append-to-body="appendToBody"
      @closed="resetEditAuth"
    >
      <template slot="title">
        <span class="el-dialog__title">
          添加权限
          <span v-if="formEditAuth.id" class="tips"
            ><span v-if="accountLine.name">{{ accountLine.name }}</span> (ID: {{ formEditAuth.id }})
          </span>
        </span>
      </template>

      <section v-loading="requesting" class="edit-auth-box">
        <el-form
          ref="refFormEditAuth"
          :model="formEditAuth"
          :rules="formEditAuth.rules"
          @submit.native.prevent
        >
          <el-form-item prop="permission">
            <el-checkbox-group v-model="formEditAuth.permission">
              <!-- 权限列表 -->
              <div v-for="(authModule, index) in authConfig" :key="index" class="auth-module-box">
                <div v-if="authModule.name" class="auth-module-title">
                  <span
                    class="module-ctl"
                    :class="{
                      'half-active': halfActive(authModule),
                      active: beActive(authModule)
                    }"
                    @click="toggleAuthModule(authModule)"
                  >
                  </span>
                  <span>{{ authModule.name }}</span>
                </div>
                <div v-if="authModule.subModule" class="auth-module-content">
                  <div
                    v-for="authItem in authModule.subModule"
                    :key="authItem.name"
                    class="auth-list-box"
                  >
                    <div v-if="authItem.name" class="auth-list-title">
                      <span>{{ authItem.name }}</span>
                    </div>
                    <div class="auth-list-content">
                      <template v-if="authItem.children && authItem.children.length">
                        <el-checkbox
                          v-for="each in authItem.children"
                          :key="each.key"
                          class="auth-item"
                          :label="each.key"
                          >{{ each.name }}<span class="tips">{{ each.remark }}</span></el-checkbox
                        >
                      </template>
                    </div>
                  </div>
                </div>
                <div v-else class="auth-module-content">
                  <div
                    v-if="authModule.children && authModule.children.length"
                    class="auth-list-content top-auth"
                  >
                    <el-checkbox
                      v-for="each in authModule.children"
                      :key="each.key"
                      class="auth-item"
                      :label="each.key"
                      >{{ each.name }}<span class="tips">{{ each.remark }}</span></el-checkbox
                    >
                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </section>

      <div class="edit-auth-footer">
        <div class="edit-auth-btn">
          <el-button size="small" @click="cancelEditAuth">取 消</el-button>

          <el-button type="primary" :loading="confirming" size="small" @click="confirmEditAuth"
            >完 成</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateAccountInfo } from '../_api'

export default {
  name: 'DialogEditAuth',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    accountLine: {
      type: Object,
      default() {
        return {}
      }
    },
    isPreview: {
      type: Boolean,
      default() {
        return false
      }
    },
    appendToBody: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      dialogEditAuth: false,
      requesting: false,
      formEditAuth: {
        labelWidth: '90px',

        id: '',

        realName: '',
        permission: [],

        rules: {
          permission: [{ required: true, message: '请分配权限' }]
        }
      },
      authConfig: this.$MAPS.permission.authPanel || [],
      confirming: false
    }
  },
  computed: {
    inFormControl() {
      return !this.accountLine || JSON.stringify(this.accountLine) === '{}'
    }
  },
  methods: {
    halfActive(authModule) {
      if (authModule.subModule) {
        return authModule.subModule.some(
          (a) => a.children && a.children.some((e) => this.formEditAuth.permission.includes(e.key))
        )
      }
      if (authModule.children) {
        return authModule.children.some((e) => this.formEditAuth.permission.includes(e.key))
      }
    },
    beActive(authModule) {
      if (authModule.subModule) {
        return authModule.subModule.every(
          (a) => a.children && a.children.every((e) => this.formEditAuth.permission.includes(e.key))
        )
      }
      if (authModule.children) {
        return authModule.children.every((e) => this.formEditAuth.permission.includes(e.key))
      }
    },
    async reRender() {
      this.requesting = true
      this.formEditAuth.permission = this.$utils.deepClone(this.value)
      try {
        if (this.inFormControl) {
          this.requesting = false
          return
        }
        this.formEditAuth.id = this.accountLine.id
        this.formEditAuth.realName = this.accountLine.realName || ''
        this.formEditAuth.permission = this.accountLine.permission
          ? this.accountLine.permission.map((e) => e.key)
          : []
      } catch (e) {}
      this.requesting = false
    },
    showDialogEditAuth() {
      if (this.$attrs.disabled) {
        return
      }
      this.$emit('open')
      this.dialogEditAuth = true
      this.reRender()
    },
    cancelEditAuth() {
      this.dialogEditAuth = false
    },
    resetEditAuth() {
      this.formEditAuth.id = ''
      this.formEditAuth.realName = ''
      this.formEditAuth.permission = []

      this.$refs.refFormEditAuth && this.$refs.refFormEditAuth.resetFields()
      this.$emit('close')
    },
    confirmEditAuth() {
      this.$refs.refFormEditAuth &&
        this.$refs.refFormEditAuth.validate((isOk) => {
          if (isOk) {
            this.formEditAuth.permission = this.formEditAuth.permission.reduce(
              (newArr, eachKey) => {
                const authModule = this.$MAPS.permission.authModuleMap[eachKey]
                if (authModule && !newArr.includes(authModule)) {
                  return [...newArr, authModule, eachKey]
                }
                const subModule = this.$MAPS.permission.subModuleMap[eachKey]
                if (
                  !subModule ||
                  (subModule &&
                    !newArr.includes(eachKey) &&
                    newArr.some((k) => subModule.includes(k)))
                ) {
                  return [...newArr, eachKey]
                }
                return newArr
              },
              []
            )
            if (this.inFormControl) {
              this.$emit('input', this.formEditAuth.permission)
              this.$emit('change', this.formEditAuth.permission)
              this.$emit('ok', this.formEditAuth.permission)
              this.dialogEditAuth = false
              return
            }
            if (this.confirming) {
              return
            }
            this.confirming = true
            updateAccountInfo(this.formEditAuth)
              .then(() => {
                this.$emit('ok')
                this.$message({
                  message: '权限修改成功',
                  type: 'success'
                })
                this.dialogEditAuth = false
              })
              .catch(() => {})
              .finally(() => {
                this.confirming = false
              })
          }
        })
    },
    toggleAuthModule(topModule) {
      const authModule = topModule.subModule
      if (!authModule) {
        if (!topModule.children) {
          return
        }
        if (topModule.children.every((e) => this.formEditAuth.permission.includes(e.key))) {
          topModule.children.forEach((eachInfo) => {
            const fIndex = this.formEditAuth.permission.findIndex((k) => k === eachInfo.key)
            if (fIndex >= 0) {
              this.formEditAuth.permission.splice(fIndex, 1)
            }
          })
        } else {
          topModule.children.forEach((eachInfo) => {
            const fIndex = this.formEditAuth.permission.findIndex((k) => k === eachInfo.key)
            if (fIndex === -1) {
              this.formEditAuth.permission.push(eachInfo.key)
            }
          })
        }
        return
      }
      if (
        authModule.some(
          (a) =>
            a.children && a.children.every((e) => !this.formEditAuth.permission.includes(e.key))
        )
      ) {
        authModule.forEach((eachSub) => {
          eachSub.children &&
            eachSub.children.forEach((eachInfo) => {
              const fIndex = this.formEditAuth.permission.findIndex((k) => k === eachInfo.key)
              if (fIndex === -1) {
                this.formEditAuth.permission.push(eachInfo.key)
              }
            })
        })
      } else {
        authModule.forEach((eachSub) => {
          eachSub.children &&
            eachSub.children.forEach((eachInfo) => {
              const fIndex = this.formEditAuth.permission.findIndex((k) => k === eachInfo.key)
              if (fIndex >= 0) {
                this.formEditAuth.permission.splice(fIndex, 1)
              }
            })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-edit-auth {
  box-sizing: border-box;
}
</style>

<style lang="less">
.dialog-edit-auth-box {
  .el-dialog {
    width: 760px;
    text-align: left;
    .el-dialog__body {
      padding: 5px;
      .goods-select {
        line-height: 1;
        .choice-goods-btn {
          margin: 5px 0 0 0;
        }
      }
      .el-row {
        > .el-col:first-child {
          padding-right: 0 !important;
        }
      }
      .el-form-item {
        .single-file-upload {
          .el-upload {
            display: flex;
            > .el-button {
              margin-left: 8px;
            }
          }
        }
      }
      .edit-auth-box {
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        position: relative;
        .auth-module-box {
          box-sizing: border-box;
          margin-top: 10px;
          padding: 4px 8px;
          border: 1px dashed #ddd;
          border-radius: 4px;
          font-size: 14px;
          line-height: 30px;
          font-weight: 400;
          &:first-child {
            margin-top: 0;
          }
          /*
          &:nth-child(even) {
            background-color: #fafafa;
          }
          &:hover {
            background-color: #f5f7fa;
          }
          */
          .auth-module-title {
            font-size: 16px;
            line-height: 1.5;
            font-weight: 600;
            color: rgba(96, 98, 102, 0.4);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .module-ctl {
              box-sizing: border-box;
              margin-right: 10px;
              width: 14px;
              height: 14px;
              border-radius: 2px;
              border: 1px solid #dcdfe6;
              background-color: #fff;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              position: relative;
              transition: all 0.15s ease-in 0.05s;
              cursor: pointer;
              &::before {
                display: block;
                content: '';
                box-sizing: border-box;
                height: 2px;
                background-color: #fff;
                position: absolute;
                top: 5px;
                left: 0;
                right: 0;
                transform: scale(0.5);
                opacity: 0;
                transition: opacity 0.15s ease-in 0.05s;
              }
              &::after {
                content: '';
                box-sizing: content-box;
                width: 3px;
                border: 1px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 7px;
                left: 4px;
                position: absolute;
                top: 1px;
                transform: rotate(45deg) scaleY(0);
                transition: transform 0.15s ease-in 0.05s;
                transform-origin: center;
              }
              &.half-active {
                background-color: #409eff;
                border-color: #409eff;
                &::before {
                  opacity: 1;
                }
              }
              &.active {
                background-color: #409eff;
                border-color: #409eff;
                &::before {
                  opacity: 0;
                }
                &::after {
                  transform: rotate(45deg) scaleY(1);
                }
              }
            }
          }
          .auth-module-content {
            box-sizing: border-box;
            .auth-list-box {
              box-sizing: border-box;
              padding-left: 32px;
              &:last-child {
                .auth-list-content {
                  margin-bottom: 0;
                  padding-bottom: 0;
                  border: 0 none;
                }
              }
              .auth-list-title {
                box-sizing: border-box;
                font-weight: 600;
              }
            }
            .auth-list-content {
              box-sizing: border-box;
              margin-bottom: 10px;
              padding-bottom: 10px;
              padding-left: 32px;
              border-bottom: 1px solid #ddd;
              .auth-item {
                &.el-checkbox {
                  .el-checkbox__label {
                    font-size: 13px;
                    font-weight: 400;
                    color: rgba(96, 98, 102, 0.7);
                  }
                }
              }
              &.top-auth {
                padding-top: 10px;
                padding-bottom: 0;
                border-bottom: 0 none;
              }
            }
          }
        }
      }
      .edit-auth-footer {
        padding: 16px;
        margin-top: 12px;
        box-sizing: border-box;
        min-height: 48px;
        background: #f0f0f0;
        position: relative;
        .edit-auth-btn {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
