# lemon-cms

### 集成:

- ⚡️ [Vite](https://github.com/vitejs/vite)
- 🚦 [Vue-Router](https://github.com/vuejs/vue-router)
- 😃 [Use icons from any icon sets, with no compromise](https://github.com/antfu/unplugin-icons)
- 🧰 [VueUse](https://github.com/vueuse/vueuse) - Collection of essential Vue Composition Utilities

### [图标库](https://icones.js.org/collection/all?s=lemon), 使用示范:

```vue
<template>
  <div class="text-com">
    <icon-account-box style="font-size: 32px; color: red" />
  </div>
</template>

<script>
import IconAccountBox from '~icons/mdi/account-box'
export default {
  name: 'TextCom',
  components: {
    IconAccountBox
  }
}
</script>
```

### 使用 commitlint 可以对 message 进行规范

- commitlint 推荐结合 config-conventional 配置使用。

正确的提交格式是：

```text
  <type>(<scope>): <subject>
  <body>
  <footer>
```

例如:

```text
  feat(eslint): 集成 eslint

  1. Vscode 可以安装 Eslint 插件即可在保存时自动格式化
  2. 运行 pnpm lint 可全局进行代码格式化

  可以浏览 .eslintrc.js 文件了解详情。
```

- type 说明代码提交的类型。
- scope 影响的范围, 比如: \*（全局），route, component, utils, build，readme，css 等，
- subject 描述提交的主要内容。
- body 具体修改内容，描述为什么修改, 做了什么样的修改, 以及开发的思路等等，可以分为多行, 建议符合 50/72 formatting
- footer 一些备注, 通常是 Breaking Changes（重要改动） 或 Closed Issues（修复 Bug 的链接）

- 常见的 type 类型
  - feat：新功能
  - fix：Bug 修复
  - style：代码样式更改，例如空格、格式、缺少分号等
  - chore：构建相关的代码或工具库，如文档生成等
  - perf：性能优化
  - test：添加缺失或修正测试代码
  - refactor：重构代码
  - docs：文档更新

### 插槽新的语法

- 废弃语法：

```vue
<el-dropdown-menu slot="dropdown" class="account-popper">
</el-dropdown-menu>
```

- 应该使用下面这样，新的语法：

```vue
<template #dropdown>
  <el-dropdown-menu> </el-dropdown-menu>
</template>
```

### 在 Vue2.7 中，改变了以往样式穿透的语法

- 如果继续使用 ::v-deep、/deep/、>>> 等语法的话，会出现一个警告
- 下面是新的语法：

```css
/* 深度选择器 */
:deep(selector) {
  /* ... */
}

/* 插槽选择器 */
:slotted(selector) {
  /* ... */
}

/* 全局选择器 */
:global(selector) {
  /* ... */
}
```

### 全局状态管理 [Pinia](https://pinia.vuejs.org/)

- Vue3 官方文档中，已经将 Pinia 放入官方推荐的核心库位置中了。

- 接下来看一段官方的说明：

> Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法。最终，我们意识到 Pinia 已经实现了我们在 Vuex 5 中想要的大部分内容，并决定实现它 取而代之的是新的建议。
>
> 与 Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的规范，提供了 Composition-API 风格的 API，最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持。

### Tag

```bash

# 查看本地tag:
git tag -l

# 查看远程tag:
git show-ref  --tag

# 本地删除tag:
git tag -d v1.0.0

# 删除远程tag:
git push origin :refs/tags/v1.0.0
```

## 开发

```bash
npm run start
```

### 打包

```bash
npm run build
```
