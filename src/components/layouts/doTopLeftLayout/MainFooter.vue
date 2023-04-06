<template>
  <div class="main-footer">{{ projectName }} &copy; {{ new Date().getFullYear() }}</div>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {
      projectName: this.$utils.getDoEnv().VITE_GLOB_APP_TITLE
    }
  }
}
</script>

<style lang="less" scoped>
.main-footer {
  box-sizing: border-box;
  padding: 6px 12px;
  opacity: 0.6;
  text-align: center;
}
</style>
