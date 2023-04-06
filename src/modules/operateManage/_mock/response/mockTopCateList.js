import { generateSuccess } from '@/mock/utils'

export default generateSuccess({
  curPage: 1,
  pageSize: 10,
  totalSize: 6,
  data: [
    {
      id: 1,
      name: '古朴', // 分类名称
      visible: true, // 客户端展示
      status: 'enable', // 状态
      sort: 1 // 排序
    },
    {
      id: 2,
      name: '外国风情', // 分类名称
      visible: true, // 客户端展示
      status: 'enable', // 状态
      sort: 2 // 排序
    },
    {
      id: 3,
      name: '纯色', // 分类名称
      visible: true, // 客户端展示
      status: 'enable', // 状态
      sort: 3 // 排序
    },
    {
      id: 4,
      name: '银河系', // 分类名称
      visible: true, // 客户端展示
      status: 'disabled', // 状态
      sort: 4 // 排序
    },
    {
      id: 5,
      name: '玛雅风', // 分类名称
      visible: false, // 客户端展示
      status: 'disabled', // 状态
      sort: 5 // 排序
    },
    {
      id: 6,
      name: '惊悚', // 分类名称
      visible: false, // 客户端展示
      status: 'enable', // 状态
      sort: 6 // 排序
    }
  ]
})
