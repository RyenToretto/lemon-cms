<!--
@file: InfoPaper.vue
@createBy: koujianfeng
@description: 壁纸信息 [缩略图] + [壁纸ID]
 -->
<template>
  <div class="info-paper">
    <div class="line-card">
      <account-photo
        v-model="chosenLine.preUrl"
        :pre-url="[chosenLine.imageUrl]"
        :logoff="chosenLine.isLogoff"
        :report="chosenLine.isReport"
      ></account-photo>
      <div class="line-info">
        <div class="fs-12">ID: {{ chosenLine.id }}</div>
        <div
          v-if="$MAPS.paper.status.labelMap[chosenLine.status]"
          :class="['fs-12', `status-${$MAPS.paper.status.classMap(chosenLine.status)}`]"
        >
          {{ chosenLine.status | labelPaperStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { labelPaperStatus } from '../_filters'

export default {
  name: 'InfoPaper',
  filters: {
    labelPaperStatus
  },
  props: {
    lines: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    chosenLine() {
      return (this.lines && this.lines[0]) || {}
    }
  }
}
</script>

<style lang="less">
.info-paper {
  padding-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  .line-card {
    box-sizing: border-box;
    padding: 5px 16px;
    background-color: #fdf6ec;
    color: #e6a23c;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    .line-info {
      padding-left: 12px;
    }
  }
}
</style>
