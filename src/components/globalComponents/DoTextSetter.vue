<!--
@file: DoTextSetter.vue
@createBy: koujianfeng
@description: 文本修改器
 -->
<template>
  <span class="do-text-setter">
    <el-popover
      v-if="!isDisabled"
      v-model="popoverShow"
      trigger="click"
      placement="right-end"
      @show="showDoTextSetterPopover"
      @after-leave="resetDoTextForm"
    >
      <div class="do-text-setter-popover">
        <el-form
          ref="refFormDoTextSetter"
          class="do-text-setter-form"
          :model="formDoTextSetter"
          :rules="formDoTextSetter.rules"
          @submit.native.prevent
        >
          <el-form-item prop="newValue">
            <el-input
              ref="refDoTextInput"
              v-model.trim="formDoTextSetter.newValue"
              type="text"
              autocomplete="off"
              :placeholder="placeholder"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="do-text-setter-footer">
          <div class="do-text-setter-btn-box">
            <el-button size="small" @click="closeDoTextSetter">取 消</el-button>

            <el-button type="primary" size="small" @click="confirmDoTextSetter">确 认</el-button>
          </div>
        </div>
      </div>

      <div slot="reference" class="do-text-setter-control">
        <slot></slot>
      </div>
    </el-popover>
  </span>
</template>

<script>
export default {
  name: 'DoTextSetter',
  props: {
    text: {
      type: [Number, String],
      default() {
        return ''
      }
    },
    placeholder: {
      type: String,
      default() {
        return '请输入名称'
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
      formDoTextSetter: {
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
    closeDoTextSetter() {
      this.popoverShow = false
    },
    resetDoTextForm() {
      this.formDoTextSetter.newValue = undefined

      this.$refs.refFormDoTextSetter && this.$refs.refFormDoTextSetter.resetFields()
      this.$emit('close')
    },
    showDoTextSetterPopover() {
      this.formDoTextSetter.newValue = this.text
      this.$nextTick(() => {
        this.$refs.refDoTextInput.$refs.input.focus()
        this.$refs.refFormDoTextSetter && this.$refs.refFormDoTextSetter.clearValidate()
      })
    },
    confirmDoTextSetter() {
      this.$refs.refFormDoTextSetter &&
        this.$refs.refFormDoTextSetter.validate((isOk) => {
          if (isOk) {
            if (this.formDoTextSetter.newValue !== this.text) {
              this.$emit('ok', this.formDoTextSetter.newValue)
            }
            this.popoverShow = false
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.do-text-setter {
  box-sizing: border-box;
  .do-text-setter-control {
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>

<style lang="less">
.do-text-setter-popover {
  padding: 6px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .do-text-setter-form {
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
  .do-text-setter-footer {
    box-sizing: border-box;
    padding-left: 10px;
    position: relative;
  }
}
</style>
