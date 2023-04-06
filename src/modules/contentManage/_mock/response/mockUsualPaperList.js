import { generateSuccess } from '@/mock/utils'

export default generateSuccess({
  curPage: 1,
  pageSize: 10,
  totalSize: 56,
  'data|10': [
    {
      'id|+1': 8436,
      type: 'static', // 壁纸类型
      // 原图
      imageUrl:
        '@pick("", "https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/079f1014cbfc46109450a18abbb36f6b.jpeg", "https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png", "https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg", "https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/33c0e9c2175540b1994cd644787851bf.png", "https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/b00c2501fde44cfcbc713a80693fb52b.png")',
      preUrl: '@imageUrl', // 缩略图
      userId: '@integer(9528,9532)', // 作者ID
      userName: '@cword(2,4)', // 作者
      collectionId: '@integer(91,95)', // 合集ID
      collectionName: '@cword(2,4)', // 合集名称
      categoryId: '@integer(1,6)', // 一级分类ID
      categoryName: '@cword(2,4)', // 一级分类名称
      subcategories: [
        // 二级分类
        {
          id: 652,
          status: 'enable',
          name: '侏罗纪'
        },
        {
          id: 653,
          status: 'enable',
          name: '白垩纪'
        },
        {
          id: 654,
          status: 'enable',
          name: '欧美'
        }
      ],
      isVip: '@pick([true,false])', // 是否会员
      isAd: '@pick([true,false])', // 是否广告
      isRecommend: '@pick([true,false])', // 精选
      source: '@pick([0,1])', // 来源
      status: '@pick(["enable","disabled"])', // 状态
      enableTime: 1640847507646, // 发布时间
      updateTime: '@integer(1616570591186, 1699256991186)' // 更新时间
    }
  ]
})
