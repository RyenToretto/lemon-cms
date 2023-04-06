<!--
@file: DoReadColumnConfig.vue
@createBy: koujianfeng
@description: 读取 localStorage 的列配置
 -->
<template>
  <div class="do-read-column-config">
    <template v-for="(item, key) in configList">
      <div :key="key" class="read-from-local-line">
        <el-button
          class="read-from-local-config"
          :class="{ active: item.label === currentConfigLabel }"
          plain
          size="mini"
          @click="chooseColumnConfig(item)"
          >{{ item.label }}</el-button
        >
        <span
          v-if="!disabledDelete && !crud.existAlreadyWithSystem(item.label)"
          class="read-from-local-delete el-icon-close"
          @click="removeConfigFromLocal(item.label)"
        ></span>
      </div>
    </template>

    <div v-if="!disabledCancelButton" class="read-from-local-line">
      <el-button
        class="read-from-local-config active"
        plain
        size="mini"
        @click="cancelChooseColumnConfig"
        >取消</el-button
      >
    </div>
    <div v-if="showCustomConfigButton" class="read-from-local-line">
      <el-button class="read-from-local-config custom" plain size="mini" @click="clickCustomConfig"
        >自定义配置</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoReadColumnConfig',
  inject: ['crud'],
  props: {
    disabledDelete: {
      type: Boolean,
      default() {
        return false
      }
    },
    disabledCancelButton: {
      type: Boolean,
      default() {
        return true
      }
    },
    showCustomConfigButton: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      crud: this.crud,
      currentConfigLabel: '',
      configList: []
    }
  },
  methods: {
    getColumnConfigFromLocal() {
      const cacheColumnConfig = this.crud.readCacheConfig()
      if (!cacheColumnConfig) {
        return
      }
      const { activeColumnConfigLabel, columnConfig } = cacheColumnConfig
      this.currentConfigLabel = activeColumnConfigLabel || ''
      this.configList = columnConfig || []
    },
    removeConfigFromLocal(label) {
      const deleteIndex = this.configList.findIndex((item) => item.label === label)
      if (!deleteIndex) {
        this.$emit('remove', label)
        this.$emit('cancel')
        return
      }
      this.configList.splice(deleteIndex, 1)
      this.$emit('remove', label)
      this.$emit('cancel')
    },
    chooseColumnConfig(config) {
      this.currentConfigLabel = config.label
      this.$emit('confirm', config)
      this.$emit('cancel')
    },
    cancelChooseColumnConfig() {
      this.$emit('cancel')
    },
    clickCustomConfig() {
      this.$emit(
        'custom',
        this.configList.find((config) => config.label === this.currentConfigLabel)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.do-read-column-config {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .read-from-local-line {
    margin: 10px 0 0;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    .read-from-local-delete {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      display: none;
      &:hover {
        color: #f00;
      }
    }
    &:hover {
      .read-from-local-delete {
        display: block;
      }
    }
    .read-from-local-config {
      box-sizing: border-box;
      width: 100%;
      opacity: 0.5;
      &:first-child {
        margin-top: 0;
      }
      &.active,
      &:hover {
        background-color: #fff;
        border-color: #409eff;
        color: #409eff;
      }
      &.active {
        opacity: 1;
      }
      &.custom {
        opacity: 0.5;
      }
    }
  }
}
</style>
