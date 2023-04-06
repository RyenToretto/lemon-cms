<!--
@file: BasePage.vue
@createBy: lufei
@description: 页码组件
 -->
<template>
  <div class="do-pagination">
    <el-pagination
      v-bind="$attrs"
      :layout="layout"
      :background="background"
      v-on="$listeners"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  components: {},
  inheritAttrs: false,
  props: {
    background: {
      default: true
    },
    layout: {
      default: 'total, prev, pager, next,jumper, sizes'
    }
  },

  data() {
    return {}
  },
  computed: {},
  watch: {},

  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    handlePnChange(pn) {
      this.$emit('current-change', pn)
    },
    handleSizeChange(pn) {
      this.$emit('size-change', pn)
    }
  }
}
</script>
