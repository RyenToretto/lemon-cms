<template>
  <div
    class="base-aside do-scrollbar"
    :style="{
      width: `${asideWidth}px`,
      height: `calc(100vh - ${layoutInfo.headerHeight}px)`,
      top: `${layoutInfo.headerHeight}px`
    }"
  >
    <div class="aside-body">
      <el-menu
        v-if="$store.state.token"
        ref="refMenu"
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        :router="true"
      >
        <menu-item
          v-for="menuItem in asideTree"
          :key="menuItem.title"
          :menu-item="menuItem"
        ></menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import MenuItem from './MenuItem.vue'

export default {
  name: 'BaseAside',
  components: {
    MenuItem
  },
  computed: {
    ...mapState(['layoutInfo', 'asideTree']),
    ...mapGetters(['asideWidth'])
  }
}
</script>

<style lang="less" scoped>
@import (reference) '/src/assets/css/common/index.less';

.base-aside {
  box-sizing: border-box;
  width: 200px;
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
  border-right: 1px solid var(--color-border);
  transition: width 0.3s linear;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .aside-body {
    box-sizing: border-box;
    width: 100%;
    flex: 1;
  }
}
</style>
