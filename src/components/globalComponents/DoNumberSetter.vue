<!--
@file: DoNumberSetter.vue
@createBy: koujianfeng
@description: 数字修改器
 -->
<template>
  <span class="do-number-setter">
    <span class="do-number-setter-label">
      <slot></slot>
    </span>

    <el-popover
      v-if="!isDisabled"
      v-model="popoverShow"
      trigger="click"
      placement="right-end"
      @show="showDoNumberSetterPopover"
      @after-leave="resetNumberSetterForm"
    >
      <div class="do-number-setter-popover">
        <el-form
          ref="refFormDoNumberSetter"
          class="do-number-setter-form"
          :model="formDoNumberSetter"
          :rules="formDoNumberSetter.rules"
          @submit.native.prevent
        >
          <el-form-item prop="newValue">
            <el-input-number
              v-model="formDoNumberSetter.newValue"
              :min="+minNum"
              :max="Number.MAX_SAFE_INTEGER"
              placeholder=""
            ></el-input-number>
          </el-form-item>
        </el-form>

        <div class="do-number-setter-footer">
          <div class="do-number-setter-btn-box">
            <el-button size="small" @click="closeDoNumberSetter">取 消</el-button>

            <el-button type="primary" size="small" @click="confirmDoNumberSetter">确 认</el-button>
          </div>
        </div>
      </div>

      <i
        slot="reference"
        class="do-number-setter-control"
        :class="changing ? 'el-icon-loading' : 'el-icon-edit'"
      ></i>
    </el-popover>
  </span>
</template>

<script>
export default {
  name: 'DoNumberSetter',
  props: {
    num: {
      type: [Number, String],
      default() {
        return undefined
      }
    },
    minNum: {
      type: [Number, String],
      default() {
        return 1
      }
    },
    changing: {
      type: Boolean,
      default() {
        return false
      }
    },
    placeholder: {
      type: String,
      default() {
        return '请输入序号'
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      popoverShow: false,
      formDoNumberSetter: {
        newValue: undefined,

        rules: {
          newValue: [{ validator: this.validation }]
        }
      }
    }
  },
  computed: {
    isDisabled() {
      return this.$utils.booleanPropComputed(this.disabled)
    }
  },
  methods: {
    validation(rule, value, callback) {
      if (!value && value !== 0) {
        callback(new Error(this.placeholder))
      }
      callback()
    },
    closeDoNumberSetter() {
      this.popoverShow = false
    },
    resetNumberSetterForm() {
      this.formDoNumberSetter.newValue = undefined

      this.$refs.refFormDoNumberSetter && this.$refs.refFormDoNumberSetter.resetFields()
      this.$emit('close')
    },
    showDoNumberSetterPopover() {
      this.formDoNumberSetter.newValue = this.num
    },
    confirmDoNumberSetter() {
      this.$refs.refFormDoNumberSetter &&
        this.$refs.refFormDoNumberSetter.validate((isOk) => {
          if (isOk) {
            if (this.changing) {
              return
            }
            if (this.formDoNumberSetter.newValue !== this.num) {
              this.$emit('ok', this.formDoNumberSetter.newValue)
            }
            this.popoverShow = false
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.do-number-setter {
  box-sizing: border-box;
  .do-number-setter-label {
    box-sizing: border-box;
  }
  .do-number-setter-control {
    box-sizing: border-box;
    margin-left: 5px;
    padding: 0 5px;
    color: #3376de;
    cursor: pointer;
  }
}
</style>

<style lang="less">
.do-number-setter-popover {
  padding: 6px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .do-number-setter-form {
    box-sizing: border-box;
    > .el-form-item {
      &:first-child {
        margin-bottom: 0;
      }
      .el-form-item__content {
        > .el-form-item__error {
          position: absolute;
        }
      }
    }
  }
  .do-number-setter-footer {
    box-sizing: border-box;
    padding-left: 10px;
    position: relative;
  }
}
</style>
