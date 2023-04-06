import { generateSuccess } from '@/mock/utils'

export default generateSuccess({
  curPage: 1,
  pageSize: 10,
  totalSize: 6,
  data: [
    {
      id: 652,
      name: '侏罗纪', // 分类名称
      // 缩略图
      preUrl:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/079f1014cbfc46109450a18abbb36f6b.jpeg',
      categoryId: 1, // 一级分类ID
      categoryName: '古朴', // 一级分类名称
      visible: true, // 客户端展示
      status: 'enable', // 状态
      sort: 1 // 排序
    },
    {
      id: 653,
      name: '白垩纪', // 分类名称
      // 缩略图
      preUrl:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png',
      categoryId: 1, // 一级分类ID
      categoryName: '古朴', // 一级分类名称
      visible: true, // 客户端展示
      status: 'enable', // 状态
      sort: 2 // 排序
    },
    {
      id: 654,
      name: '欧美', // 分类名称
      // 缩略图
      preUrl:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg',
      categoryId: 2, // 一级分类ID
      categoryName: '外国风情', // 一级分类名称
      visible: true, // 客户端展示
      status: 'enable', // 状态
      sort: 3 // 排序
    },
    {
      id: 655,
      name: '意式', // 分类名称
      preUrl:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/33c0e9c2175540b1994cd644787851bf.png', // 缩略图
      categoryId: 2, // 一级分类ID
      categoryName: '外国风情', // 一级分类名称
      visible: false, // 客户端展示
      status: 'enable', // 状态
      sort: 4 // 排序
    },
    {
      id: 656,
      name: '红色', // 分类名称
      // 缩略图
      preUrl:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/b00c2501fde44cfcbc713a80693fb52b.png',
      categoryId: 3, // 一级分类ID
      categoryName: '纯色', // 一级分类名称
      visible: false, // 客户端展示
      status: 'disabled', // 状态
      sort: 5 // 排序
    },
    {
      id: 657,
      name: '灰色', // 分类名称
      preUrl: '', // 缩略图
      categoryId: 3, // 一级分类ID
      categoryName: '纯色', // 一级分类名称
      visible: true, // 客户端展示
      status: 'disabled', // 状态
      sort: 6 // 排序
    }
  ]
})
