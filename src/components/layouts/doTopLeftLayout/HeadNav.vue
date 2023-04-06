<template>
  <nav class="head-nav">
    <div
      class="nav-bottom-line"
      :style="{ left: indexOfPaths * 114 + 'px', display: indexOfPaths === -1 ? 'none' : 'block' }"
    ></div>

    <template v-for="eachRoute in topNavRoutes">
      <RouterLink
        :key="eachRoute.path"
        :class="{ active: currentPaths.includes(eachRoute.path) }"
        :to="eachRoute.path"
      >
        <span v-if="eachRoute.meta && eachRoute.meta.title">{{ eachRoute.meta.title }}</span>
        <span v-else-if="eachRoute.name">{{ eachRoute.name }}</span>
        <span v-else>{{ eachRoute.path }}</span>
      </RouterLink>
    </template>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeadNav',
  computed: {
    ...mapState({
      currentPaths: (state) => state.currentPaths,
      topNavRoutes: (state) => state.topNavRoutes
    }),
    indexOfPaths() {
      if (this.currentPaths && this.currentPaths.length) {
        for (const eachPath of this.currentPaths) {
          const result = this.topNavRoutes.findIndex((e) => e.path === eachPath)
          if (result >= 0) {
            return result
          }
        }
      }
      return -1
    }
  }
}
</script>

<style lang="less">
@import (reference) '/src/assets/css/common/index.less';

@each-nav-width: 114px;
.head-nav {
  box-sizing: border-box;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .nav-bottom-line {
    content: '';
    display: block;
    box-sizing: border-box;
    width: @each-nav-width;
    height: 3px;
    border-radius: 2px;
    background-color: @primary-color;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: left 0.3s linear;
  }
  a {
    box-sizing: border-box;
    padding: 8px;
    width: @each-nav-width;
    height: 100%;
    text-underline-offset: 2px;
    font-size: 16px;
    font-weight: 600;
    color: #909399;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.3s linear;
    > span {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: transparent;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.3s linear;
    }
    &:hover,
    &.active {
      color: #333333;
    }
  }
}
</style>
