<!--
@file: CollectionSelect.vue
@createBy: koujianfeng
@description: 合集选择器
 -->
<template>
  <el-select
    ref="refCollectionSelect"
    class="collection-select"
    popper-class="custom_dropdown_popper"
    :value="value"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请选择合集'"
    clearable
    filterable
    @change="collectionSelectChange"
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
        :disabled="isLimit && eachOne.imageCount >= 9"
        :label="eachOne[labelKey]"
        :value="eachOne[valueKey] + ''"
      >
        <span>{{ eachOne[labelKey] }}</span>
        <span class="fs-12 fr">
          <span
            :class="{
              'color-green': eachOne.status === 'enable',
              'color-warning': eachOne.status === 'disabled'
            }"
            >{{ eachOne.status | labelCollectionStatus }}</span
          >
          <span
            v-if="eachOne.imageCount || eachOne.imageCount === 0"
            style="display: inline-block; min-width: 28px; text-align: right"
            :class="{ 'color-red': eachOne.imageCount >= 9 }"
            class="pure-number"
            >({{ eachOne.imageCount }})</span
          >
        </span>
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { mapState } from 'vuex'
import { labelCollectionStatus } from '@/modules/operateManage/_filters'

export default {
  name: 'CollectionSelect',
  filters: {
    labelCollectionStatus
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default: ''
    },
    userId: {
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
    isLimit: {
      type: Boolean,
      default() {
        return false
      }
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
      allCollection: (state) => state.sCollection.allCollection || [],
      insideAllCollection: (state) => state.sCollection.inDialog.allCollection || []
    }),
    optionArr() {
      const arr =
        this.insideAllCollection && this.insideAllCollection.length
          ? this.insideAllCollection
          : this.allCollection
      return this.inDialog ? arr : this.allCollection
    }
  },
  watch: {
    donotClear: {
      immediate: true,
      handler(newValue) {
        this.canClear = !newValue
      }
    },
    userId: {
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
        this.getOptions(this.userId, this.inDialog).finally(() => {
          this.requesting = false
        })
      }
    },
    async getOptions(userId = '', inDialog) {
      try {
        this.cacheQueryString = this.generateCondition()
        await this.$store.dispatch('sCollection/getAllCollection', { userId, inDialog })
      } catch (err) {
        console.log(err)
      }
    },
    collectionSelectChange(newValue) {
      if (this.inDialog) {
        this.$store.dispatch('sCollection/setInDialogCollection', {
          valueKey: this.valueKey,
          newValue
        })
      } else {
        this.$store.dispatch('sCollection/setCollection', {
          valueKey: this.valueKey,
          newValue,
          syncToStore: this.syncToStore
        })
      }
      this.$emit('ok')
      this.$emit('change', newValue)
      this.$emit(
        'select-change',
        this.allCollection.find((item) => item[this.valueKey] === newValue)
      )
    },
    toggleMenu() {
      this.$refs.refCollectionSelect.toggleMenu()
    },
    generateCondition() {
      return this.$utils.transferToJson({ userId: this.userId })
    }
  }
}
</script>
