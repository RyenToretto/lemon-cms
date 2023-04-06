<!--
@file: RegionSelect.vue
@createBy: koujianfeng
@description: 国家选择
 -->
<template>
  <el-select
    v-bind="$attrs"
    ref="refRegionSelect"
    class="region-select"
    :value="value"
    :placeholder="$attrs.placeholder || '请选择国家'"
    clearable
    filterable
    @change="regionSelectChange"
  >
    <slot name="prepend"></slot>
    <el-option-group v-if="!disableEmptyLabel" label="">
      <el-option key="all" :value="''" label="不限"></el-option>
    </el-option-group>

    <el-option-group label="">
      <el-option
        v-for="region in allRegion"
        :key="region[valueKey]"
        :label="region[labelKey]"
        :value="region[valueKey] + ''"
      ></el-option>

      <el-option :key="$MAPS.region.other" :value="$MAPS.region.other" label="其他国家"></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RegionSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    disableEmptyLabel: {
      type: Boolean,
      default: false
    },
    value: {
      default: ''
    },
    inDialog: {
      type: Boolean,
      default: false
    },
    // 同步到store
    syncToStore: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    regionType: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      allRegion: (state) => state.sRegion.allRegion
    })
  },
  methods: {
    regionSelectChange(value) {
      if (this.inDialog) {
        this.$store.dispatch('sRegion/setInDialogRegion', {
          value,
          valueKey: this.valueKey
        })
      } else {
        this.$store.dispatch('sRegion/setRegion', {
          value,
          valueKey: this.valueKey,
          syncToStore: this.syncToStore
        })
      }
      this.$emit('change', value)
    },
    toggleMenu() {
      this.$refs.refRegionSelect.toggleMenu()
    }
  }
}
</script>

<style lang="less" scoped>
.region-select {
  box-sizing: border-box;
}
</style>
