<!--
@file: ErrorPage.vue
@createBy: lufei
@description: 错误页
 -->
<template>
  <div class="error-page">
    <div class="figure">
      <h2 class="title">权限不足</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  components: {},
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.figure {
  width: 800px;
  height: 600px;
  background: url('../assets/img/not-permission.svg') no-repeat center;
  background-size: contain;
  margin: 50px auto 0;
  .title {
    font-size: 60px;
    text-align: center;
    color: #78c5fd;
    padding-top: 150px;
  }
}
</style>
