import { generateSuccess } from '@/mock/utils'

export default generateSuccess({
  curPage: 1,
  pageSize: 10,
  totalSize: 20,
  data: [
    {
      id: 1,
      username: 'Admin',
      realName: 'Admin',
      role: 'superadmin',
      status: 'enable',
      permission: [
        {
          key: 'content_paper_static_r',
          name: '内容管理'
        },
        {
          key: 'operate_manage',
          name: '运营管理'
        },
        {
          key: 'operate_top_cate_r',
          name: '一级分类'
        },
        {
          key: 'operate_sub_cate_r',
          name: '二级分类'
        },
        {
          key: 'operate_collection_r',
          name: '合集管理'
        },
        {
          key: 'client_user_r',
          name: '用户管理'
        },
        {
          key: 'system_account_r',
          name: '账号管理'
        }
      ]
    },
    {
      id: 17,
      username: 'zhaoying',
      realName: '赵颖',
      role: 'admin',
      status: 'enable',
      permission: [
        {
          key: 'content_paper_static_r',
          name: '内容管理'
        }
      ]
    },
    {
      id: 11,
      username: 'yangyitong',
      realName: '杨懿彤',
      role: 'admin',
      status: 'enable',
      permission: [
        {
          key: 'content_paper_static_r',
          name: '内容管理'
        },
        {
          key: 'operate_manage',
          name: '运营管理'
        },
        {
          key: 'operate_top_cate_r',
          name: '一级分类'
        },
        {
          key: 'operate_sub_cate_r',
          name: '二级分类'
        },
        {
          key: 'operate_collection_r',
          name: '合集管理'
        },
        {
          key: 'client_user_r',
          name: '用户管理'
        },
        {
          key: 'system_account_r',
          name: '账号管理'
        }
      ]
    }
  ]
})
