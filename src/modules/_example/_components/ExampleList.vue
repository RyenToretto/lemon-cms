<!--
@file: ExampleList.vue
@createBy: koujianfeng
@description: 账号管理
 -->
<template>
  <div class="example-list">
    <h2>{{ $route.meta.title }}</h2>

    <div class="wrapper">
      <icon-account-box style="font-size: 32px; color: red" />
    </div>
  </div>
</template>

<script>
import IconAccountBox from '~icons/mdi/account-box'

export default {
  name: 'ExampleList',
  components: {
    IconAccountBox
  },
  provide() {
    return {
      mainCtx: this
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.example-list {
  box-sizing: border-box;
}
</style>
