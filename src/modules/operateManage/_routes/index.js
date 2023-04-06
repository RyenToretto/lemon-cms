import MAPS from '@/maps'

export default {
  path: '/operate',
  name: 'OperateManage',
  meta: {
    title: '运营管理',
    permission: MAPS.permission.LEMON_OP_MANAGE,
    isNavTab: true
  },
  redirect: '/operate/cate/top',
  component: () => import('@/components/layouts/doTopLeftLayout/index.vue'),
  children: [
    {
      path: '/operate/cate/top',
      name: 'TopCateManage',
      meta: {
        title: '一级分类',
        permission: MAPS.permission.LEMON_TOP_CATE_R,
        group: [MAPS.aside.treeGroupKey.categoryManage]
      },
      component: () => import(/* webpackChunkName: "topCateManage" */ '../TopCateManage.vue')
    },
    {
      path: '/operate/cate/sub',
      name: 'SubCateManage',
      meta: {
        title: '二级分类',
        permission: MAPS.permission.LEMON_SUB_CATE_R,
        group: [MAPS.aside.treeGroupKey.categoryManage]
      },
      component: () => import(/* webpackChunkName: "subCateManage" */ '../SubCateManage.vue')
    },
    {
      path: '/operate/collection',
      name: 'CollectionManage',
      meta: {
        title: '合集管理',
        iconClass: 'el-icon-receiving',
        permission: MAPS.permission.LEMON_COLLECTION_R
      },
      component: () => import(/* webpackChunkName: "collectionManage" */ '../CollectionManage.vue')
    }
  ]
}
