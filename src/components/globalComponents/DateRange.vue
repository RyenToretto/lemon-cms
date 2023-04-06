<!--
@file: dateRange.vue
@createBy: lufei
@description: 日期范围组件
 -->
<template>
  <div class="date-range">
    <el-date-picker
      ref="refDate"
      :value="value"
      value-format="yyyy-MM-dd"
      :picker-options="$attrs['picker-options'] || pickOption"
      v-bind="$attrs"
      :clearable="$attrs.clearable || false"
      :type="$attrs.type || 'daterange'"
      v-on="$listeners"
    >
    </el-date-picker>
  </div>
</template>

<script>
import utils from '@/utils'
export default {
  name: 'DateRange',
  inheritAttrs: false,
  model: {
    prop: 'value'
    // event: 'change'
  },
  props: {
    value: {}
  },
  data() {
    return {
      pickOption: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const today = new Date()
              const start = utils.transferDate(today)
              const end = utils.transferDate(today)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const today = new Date()
              const end = utils.transferDate(today - 1 * MS_PER_DAY)
              const start = utils.transferDate(today - 1 * MS_PER_DAY)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const today = new Date()
              const end = utils.transferDate(today)
              const start = utils.transferDate(today - 6 * MS_PER_DAY)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const today = new Date()
              const end = utils.transferDate(today)
              const start = utils.transferDate(today - 29 * MS_PER_DAY)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本周',
            onClick(picker) {
              const today = new Date()
              const dayIndex = today.getDay()
              const end = utils.transferDate(today)
              const start = utils.transferDate(today - (dayIndex - 1) * MS_PER_DAY)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本月',
            onClick(picker) {
              const today = new Date()
              const todayIndex = today.getDate()
              const end = utils.transferDate(today)
              const start = utils.transferDate(today - (todayIndex - 1) * MS_PER_DAY)
              picker.$emit('pick', [start, end])
            }
          }
        ],
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {},
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    },
    toggleMenu() {
      this.$refs.refDate.focus()
    }
  }
}
</script>

<style lang="less" scoped></style>
