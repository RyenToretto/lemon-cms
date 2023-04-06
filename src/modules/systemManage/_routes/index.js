import MAPS from '@/maps'

export default {
  path: '/system',
  name: 'SystemManage',
  meta: {
    title: '系统管理'
  },
  component: () => import('@/components/layouts/doTopLeftLayout/index.vue'),
  redirect: '/system/account',
  children: [
    {
      path: '/system/password',
      name: 'ChangePassword',
      meta: {
        title: '修改密码'
      },
      component: () => import(/* webpackChunkName: "changePassword" */ '../ChangePassword.vue')
    },
    {
      path: '/system/account',
      name: 'AccountManage',
      meta: {
        title: '账号管理',
        permission: MAPS.permission.LEMON_SYS_ACCOUNT_R,
        isNavTab: true
      },
      component: () => import(/* webpackChunkName: "accountManage" */ '../AccountManage.vue')
    }
  ]
}
