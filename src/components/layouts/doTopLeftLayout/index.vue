<template>
  <div
    class="do-top-left-layout"
    :style="{
      paddingLeft: `${asideWidth}px`,
      paddingTop: `${layoutInfo.headerHeight}px`
    }"
  >
    <main-header />
    <base-aside />

    <div class="main-body">
      <router-view></router-view>
    </div>

    <main-footer />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import BaseAside from './BaseAside.vue'
import MainFooter from './MainFooter.vue'
import MainHeader from './MainHeader.vue'

export default {
  name: 'DoTopLeftLayout',
  components: {
    BaseAside,
    MainFooter,
    MainHeader
  },
  computed: {
    ...mapState(['layoutInfo']),
    ...mapGetters(['asideWidth'])
  }
}
</script>

<style lang="less" scoped>
.do-top-left-layout {
  box-sizing: border-box;
  padding-left: 0;
  min-height: 100vh;
  transition: padding 0.3s linear;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .main-body {
    box-sizing: border-box;
    flex: 1;
  }
}
</style>
