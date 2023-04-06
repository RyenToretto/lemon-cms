<!--
@file: DoColorPicker.vue
@createBy: koujianfeng
@description: 颜色选择器
 -->
<template>
  <div class="do-dialog-wrapper do-color-picker">
    <el-tooltip :disabled="true" content="" placement="top">
      <div slot="content" class="do-dialog-tooltip"></div>

      <div class="do-dialog-ctl click-do-color-picker" @click="showDialogDoColorPicker">
        <slot></slot>
        <div class="color-card" :style="{ backgroundColor: value }"></div>
        <div class="color-value" :class="{ empty: !value }" @click.stop="doNothing">
          {{ value || $attrs['placeholder'] || '请选择颜色' }}
        </div>
      </div>
    </el-tooltip>

    <el-dialog
      ref="refDialogDoColorPicker"
      :visible.sync="dialogDoColorPicker"
      class="do-dialog-box dialog-do-color-picker hide"
      width="560px"
      :append-to-body="appendToBody"
      @closed="resetDoColorPicker"
    >
      <template slot="title">
        <span class="el-dialog__title">
          {{ $attrs['title'] || '颜色选择器' }}
        </span>
      </template>

      <section v-loading="requesting" class="do-dialog-content-box">
        <photoshop-picker
          v-if="theme === 'photoshop'"
          v-model="currentColor"
          :disabled="isPreview"
          @ok="pickOk"
          @cancel="cancelDoColorPicker"
        ></photoshop-picker>
        <sketch-picker
          v-if="theme === 'sketch'"
          v-model="currentColor"
          :preset-colors="$attrs['preset-colors'] || []"
          :disabled="isPreview"
          @ok="pickOk"
          @cancel="cancelDoColorPicker"
        ></sketch-picker>
      </section>
      <div>
        <el-button v-if="theme === 'sketch'" size="small" class="button" @click="pickOk"
          >确定</el-button
        >
      </div>
      <div class="do-dialog-footer">
        <div class="do-dialog-bottom-btn">
          <el-button size="small" @click="cancelDoColorPicker">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Photoshop, Sketch } from 'vue-color'

export default {
  name: 'DoColorPicker',
  components: {
    'photoshop-picker': Photoshop,
    'sketch-picker': Sketch
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default: ''
    },
    theme: {
      default: 'sketch'
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
      dialogDoColorPicker: false,
      requesting: false,
      confirming: false,
      currentColor: {
        hex: '#194d33'
      }
    }
  },
  methods: {
    showDialogDoColorPicker() {
      this.currentColor.hex = this.value
      this.$emit('open')
      this.dialogDoColorPicker = true
    },
    cancelDoColorPicker() {
      this.dialogDoColorPicker = false
    },
    resetDoColorPicker() {
      this.$emit('close')
    },
    confirmDoColorPicker(value) {
      if (this.confirming) {
        return
      }
      this.confirming = true
      this.$emit('ok', value)
      this.$emit('change', value)
      this.dialogDoColorPicker = false
      this.confirming = false
    },
    pickOk() {
      this.confirmDoColorPicker(this.currentColor.hex)
    },
    doNothing() {}
  }
}
</script>

<style lang="less" scoped>
/deep/ .vc-sketch {
  margin-left: 57px;
}
.button {
  position: relative;
  top: -33px;
  left: 297px;
}
.do-color-picker {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .click-do-color-picker {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  .color-card {
    width: 120px;
    height: 40px;
    border: 1px solid #dddddd;
  }
  .color-value {
    box-sizing: border-box;
    margin-left: 10px;
    cursor: text;
    &.empty {
      color: #c1c1c1;
    }
  }
}
</style>

<style lang="less">
.dialog-do-color-picker {
  .el-dialog__body {
    .el-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .el-form-item {
      box-sizing: border-box;
      min-width: 30%;
    }
  }
}
</style>
