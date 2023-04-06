<!--
@file: TopCateSelect.vue
@createBy: koujianfeng
@description: 一级分类选择器
 -->
<template>
  <el-select
    ref="refTopCateSelect"
    class="top-cate-select"
    popper-class="custom_dropdown_popper"
    :value="value"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请选择一级分类'"
    clearable
    filterable
    @change="topCateSelectChange"
    @visible-change="handleVisibleChange"
  >
    <slot></slot>

    <el-option v-if="requesting" value="" disabled>
      <div class="el-select-dropdown__item tc color-gray">
        <i class="el-icon-loading"></i> 加载中...
      </div>
    </el-option>

    <el-option-group v-else label="">
      <el-option
        v-for="eachOne in optionArr"
        :key="eachOne[valueKey]"
        :label="eachOne[labelKey]"
        :value="eachOne[valueKey] + ''"
        >{{ eachOne[labelKey] }}</el-option
      >
    </el-option-group>
  </el-select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TopCateSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default: ''
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    syncToStore: {
      // 同步到store
      type: Boolean,
      default: false
    },
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      requesting: false
    }
  },
  computed: {
    ...mapState({
      allTopCate: (state) => state.sCate.allTopCate || [],
      insideAllTopCate: (state) => state.sCate.inDialog.allTopCate || []
    }),
    optionArr() {
      const arr =
        this.insideAllTopCate && this.insideAllTopCate.length
          ? this.insideAllTopCate
          : this.allTopCate
      return this.inDialog ? arr : this.allTopCate
    }
  },
  methods: {
    handleVisibleChange(isShow) {
      if (isShow && (!this.optionArr || !this.optionArr.length)) {
        this.requesting = true
        this.getOptions(this.inDialog).finally(() => {
          this.requesting = false
        })
      }
    },
    async getOptions(inDialog) {
      try {
        await this.$store.dispatch('sCate/getAllTopCate', { inDialog })
      } catch (err) {
        console.log(err)
      }
    },
    topCateSelectChange(newValue) {
      if (this.inDialog) {
        this.$store.dispatch('sCate/setInDialogTopCate', { valueKey: this.valueKey, newValue })
      } else {
        this.$store.dispatch('sCate/setTopCate', {
          valueKey: this.valueKey,
          newValue,
          syncToStore: this.syncToStore
        })
      }
      this.$emit('ok')
      this.$emit('change', newValue)
      this.$emit(
        'select-change',
        this.allTopCate.find((item) => item[this.valueKey] === newValue)
      )
    },
    toggleMenu() {
      this.$refs.refTopCateSelect.toggleMenu()
    }
  }
}
</script>
