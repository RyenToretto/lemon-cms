import MAPS from '@/maps'

export default {
  path: '/client',
  name: 'ClientManage',
  meta: {
    title: '客户端管理'
  },
  component: () => import('@/components/layouts/doTopLeftLayout/index.vue'),
  redirect: '/client/user',
  children: [
    {
      path: '/client/user',
      name: 'ClientUserManage',
      meta: {
        title: '用户管理',
        permission: MAPS.permission.LEMON_CLIENT_USER_R,
        isNavTab: true
      },
      component: () => import(/* webpackChunkName: "clientUserManage" */ '../ClientUserManage.vue')
    }
  ]
}
