<!--
@file: AccountPhoto.vue
@createBy: koujianfeng
 -->
<template>
  <a class="account-photo-box">
    <el-image
      v-if="value"
      class="account-photo"
      :src="value"
      fit="contain"
      :preview-src-list="preUrl || [value]"
      style="width: 60px; height: 80px"
    >
    </el-image>
    <div v-else class="account-empty-photo"></div>
    <div v-if="isLogoff" class="tips-logoff">{{ labelLogoff }}</div>
    <div v-if="report === 1 || report === true || report === 'true'" class="tips-logoff">
      被举报
    </div>
  </a>
</template>

<script>
export default {
  name: 'AccountPhoto',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
    preUrl: Array,
    logoff: {
      type: [Number, String],
      default() {
        return 0
      }
    },
    report: {
      type: [Number, String, Boolean],
      default() {
        return 0
      }
    }
  },
  computed: {
    isLogoff() {
      return +this.logoff === 1
    },
    labelLogoff() {
      return this.$MAPS.client.account.AUTHOR_ACCOUNT_LOGOFF_LABEL
    }
  }
}
</script>

<style lang="less" scoped>
.account-photo-box {
  box-sizing: border-box;
  position: relative;
  .account-photo {
    width: 60px;
    height: 80px;
  }
  .account-empty-photo {
    width: 60px;
    height: 60px;
    margin: auto;
    background-color: #f0f0f5;
  }
  .tips-logoff {
    width: 100%;
    background-color: rgba(255, 64, 64, 0.8);
    color: #ffffff;
    font-size: 12px;
    line-height: 1.5;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
