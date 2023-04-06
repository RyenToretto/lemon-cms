import MAPS from '@/maps'

export default {
  path: '/content',
  name: 'ContentManage',
  meta: {
    title: '内容管理'
  },
  component: () => import('@/components/layouts/doTopLeftLayout/index.vue'),
  redirect: '/content/paper/static',
  children: [
    {
      path: '/content/paper/:type',
      name: 'UsualPaperManage',
      props: true,
      meta: {
        title: '内容管理',
        permission: MAPS.permission.LEMON_STATIC_PAPER_R,
        isNavTab: true
      },
      component: () => import(/* webpackChunkName: "usualPaperManage" */ '../UsualPaperManage.vue')
    }
  ]
}
