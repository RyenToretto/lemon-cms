<!--
@file: ErrorPage.vue
@createBy: lufei
@description: 错误页
 -->
<template>
  <div class="error-page">
    <div class="figure"></div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.figure {
  width: 700px;
  height: 300px;
  background: url('../assets/img/error-icon.svg') no-repeat center;
  background-size: contain;
  margin: 150px auto 0;
}
</style>
