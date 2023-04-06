<!--
@file: ClientUserSelect.vue
@createBy: koujianfeng
@description: 作者选择器
 -->
<template>
  <el-select
    ref="refClientUserSelect"
    class="client-user-select"
    popper-class="custom_dropdown_popper"
    :value="value"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请选择作者'"
    clearable
    filterable
    @change="clientUserSelectChange"
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
  name: 'ClientUserSelect',
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
      allClientUser: (state) => state.sClient.allClientUser || [],
      insideAllClientUser: (state) => state.sClient.inDialog.allClientUser || []
    }),
    optionArr() {
      const arr =
        this.insideAllClientUser && this.insideAllClientUser.length
          ? this.insideAllClientUser
          : this.allClientUser
      return this.inDialog ? arr : this.allClientUser
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
        await this.$store.dispatch('sClient/getAllClientUser', { inDialog })
      } catch (err) {
        console.log(err)
      }
    },
    clientUserSelectChange(newValue) {
      if (this.inDialog) {
        this.$store.dispatch('sClient/setInDialogClientUser', { valueKey: this.valueKey, newValue })
      } else {
        this.$store.dispatch('sClient/setClientUser', {
          valueKey: this.valueKey,
          newValue,
          syncToStore: this.syncToStore
        })
      }
      this.$emit('ok')
      this.$emit('change', newValue)
      this.$emit(
        'select-change',
        this.allClientUser.find((item) => item[this.valueKey] === newValue)
      )
    },
    toggleMenu() {
      this.$refs.refClientUserSelect.toggleMenu()
    }
  }
}
</script>
