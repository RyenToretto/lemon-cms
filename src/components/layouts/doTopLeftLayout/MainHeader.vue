<template>
  <header class="main-header" :style="{ height: `${layoutInfo.headerHeight}px` }">
    <div class="head-logo">
      <div class="logo">
        <fxemoji-lemon></fxemoji-lemon>
      </div>

      <h1>{{ projectName }}</h1>
    </div>

    <head-nav></head-nav>

    <div class="head-right">
      <el-dropdown placement="" trigger="hover" @command="handleMenuLink">
        <a href="javascript:"><i class="el-icon-user-solid mr-5"></i>{{ $store.state.username }}</a>
        <el-dropdown-menu slot="dropdown" class="account-popper">
          <!-- <el-dropdown-item icon="el-icon-user"
                            :command="{type: 'link', path: '/account/info'}">修改个人信息</el-dropdown-item> -->
          <el-dropdown-item icon="el-icon-key" :command="{ type: 'link', path: '/system/password' }"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" :command="{ type: 'logout' }"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import HeadNav from './HeadNav.vue'
import FxemojiLemon from '~icons/fxemoji/lemon'

export default {
  name: 'MainHeader',
  components: {
    HeadNav,
    FxemojiLemon
  },
  data() {
    return {
      projectName: this.$utils.getDoEnv().VITE_GLOB_APP_TITLE
    }
  },
  computed: {
    ...mapState(['layoutInfo'])
  },
  methods: {
    handleMenuLink(command) {
      if (command.type === 'logout') {
        this.$store.dispatch('doLogout').then(() => {
          location.href = '/admin/login'
        })
      } else if (command.type === 'link') {
        if (this.$route.path === command.path) {
          return
        }
        this.$router.push(command)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '/src/assets/css/common/index.less';

.main-header {
  box-sizing: border-box;
  padding: 0 16px 0 0;
  width: 100vw;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .head-logo {
    box-sizing: border-box;
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      margin-right: 5px;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      > img {
        display: block;
        height: 100%;
      }
    }
    h1 {
      background-size: auto 30px;
      text-align: left;
      .ellipsis();
      font-size: 22px;
      color: #333;
      position: relative;
    }
  }
  .head-right {
    box-sizing: border-box;
    padding: 0 @gap-xs 0 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > .el-dropdown {
      > a {
        display: block;
        padding: 0 12px;
        text-align: center;
        line-height: @footer-height;
        &:hover {
          background: #ecf5ff;
        }
      }
    }
  }
}
</style>
