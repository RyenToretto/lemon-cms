<!--
@file: MenuItem.vue
@author: koujianfeng
 -->

<template>
  <el-menu-item v-if="!menuItem.children" :index="menuItem.route">
    <i v-if="menuItem.iconClass" :class="menuItem.iconClass"></i>
    <span>{{ menuItem.title }}</span>
  </el-menu-item>

  <el-submenu v-else-if="menuItem.children" :index="menuItem.index">
    <template slot="title">
      <i v-if="menuItem.iconClass" :class="menuItem.iconClass"></i>
      <span>{{ menuItem.title }}</span>
    </template>

    <template v-for="child in menuItem.children">
      <menu-item
        v-if="child.children && child.children.length > 0"
        :key="child.title"
        :menu-item="child"
      ></menu-item>

      <el-menu-item
        v-if="(!child.children || !child.children.length) && !child.tip"
        :key="child.title"
        :index="child.route"
      >
        <i v-if="child.iconClass" :class="child.iconClass"></i>
        <span>{{ child.title }}</span>
      </el-menu-item>
    </template>

    <template v-if="menuItem.tips">
      <el-menu-item-group v-for="tipChild in menuItem.tips" :key="tipChild">
        <template slot="title">{{ tipChild }}</template>

        <template v-for="child in menuItem.children">
          <el-menu-item
            v-if="(!child.children || !child.children.length) && child.tip === tipChild"
            :key="child.title"
            :index="child.route"
          >
            <i v-if="child.iconClass" :class="child.iconClass"></i>
            <span>{{ child.title }}</span>
          </el-menu-item>
        </template>
      </el-menu-item-group>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object,
      required: true
    }
  }
}
</script>
