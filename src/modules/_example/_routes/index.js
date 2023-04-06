import MAPS from '@/maps'

export default {
  path: '/example',
  name: 'ExampleManage',
  meta: {
    title: '例子管理',
    permission: MAPS.permission.LEMON_OP_MANAGE
  },
  component: () => import('@/components/layouts/doTopLeftLayout/index.vue'),
  redirect: '/example/simple',
  children: [
    {
      path: '/example/simple',
      name: 'ExamplePage',
      meta: {
        title: '栗子管理',
        permission: MAPS.permission.LEMON_TOP_CATE_R
      },
      component: () => import(/* webpackChunkName: "exampleManage" */ '../ExamplePage.vue')
    }
  ]
}
