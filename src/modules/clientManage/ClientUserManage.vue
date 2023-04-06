<!--
@file: ClientUserManage.vue
@createBy: koujianfeng
 -->
<template>
  <client-user-list></client-user-list>
</template>

<script>
import ClientUserList from './_components/ClientUserList.vue'

export default {
  name: 'ClientUserManage',
  components: {
    ClientUserList
  }
}
</script>
