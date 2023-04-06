<!--
@file: SubCateSelect.vue
@createBy: koujianfeng
@description: 二级分类选择器
 -->
<template>
  <el-select
    ref="refSubCateSelect"
    class="sub-cate-select"
    popper-class="custom_dropdown_popper"
    :value="value"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请选择二级分类'"
    clearable
    filterable
    @change="subCateSelectChange"
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
  name: 'SubCateSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default: ''
    },
    categoryId: {
      type: [Number, String],
      default: ''
    },
    donotClear: {
      type: Boolean,
      default() {
        return false
      }
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
      canClear: false,
      requesting: false,
      cacheQueryString: '-1' // 查询条件缓存
    }
  },
  computed: {
    ...mapState({
      allSubCate: (state) => state.sCate.allSubCate || [],
      insideAllSubCate: (state) => state.sCate.inDialog.allSubCate || []
    }),
    optionArr() {
      const arr =
        this.insideAllSubCate && this.insideAllSubCate.length
          ? this.insideAllSubCate
          : this.allSubCate
      return this.inDialog ? arr : this.allSubCate
    }
  },
  watch: {
    donotClear: {
      immediate: true,
      handler(newValue) {
        this.canClear = !newValue
      }
    },
    categoryId: {
      immediate: true,
      handler() {
        if (this.canClear) {
          this.$emit('clear')
        }
      }
    }
  },
  methods: {
    handleVisibleChange(isShow) {
      const currentQueryString = this.generateCondition()
      if (isShow && currentQueryString !== this.cacheQueryString) {
        this.requesting = true
        this.getOptions(this.categoryId, this.inDialog).finally(() => {
          this.requesting = false
        })
      }
    },
    async getOptions(categoryId = '', inDialog) {
      try {
        this.cacheQueryString = this.generateCondition()
        await this.$store.dispatch('sCate/getAllSubCate', { categoryId, inDialog })
      } catch (err) {
        console.log(err)
      }
    },
    subCateSelectChange(newValue) {
      if (this.inDialog) {
        this.$store.dispatch('sCate/setInDialogSubCate', { valueKey: this.valueKey, newValue })
      } else {
        this.$store.dispatch('sCate/setSubCate', {
          valueKey: this.valueKey,
          newValue,
          syncToStore: this.syncToStore
        })
      }
      this.$emit('ok')
      this.$emit('change', newValue)
      this.$emit(
        'select-change',
        this.allSubCate.find((item) => item[this.valueKey] === newValue)
      )
    },
    toggleMenu() {
      this.$refs.refSubCateSelect.toggleMenu()
    },
    generateCondition() {
      return this.$utils.transferToJson({ categoryId: this.categoryId })
    }
  }
}
</script>
